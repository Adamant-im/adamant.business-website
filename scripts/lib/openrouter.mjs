import { siteConfig } from '../../config/site.ts';

const DEFAULT_PROVIDER = {
  allow_fallbacks: true,
  preferred_max_latency: { p90: 90 },
};

export function parseLlmJson(content) {
  const trimmed = String(content ?? '').trim();
  const fenced = trimmed.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  const candidate = fenced ? fenced[1].trim() : trimmed;
  const start = candidate.indexOf('{');
  const end = candidate.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) {
    throw new Error('No JSON object found in model response');
  }
  return JSON.parse(candidate.slice(start, end + 1));
}

function isTimeoutError(error) {
  return error?.name === 'TimeoutError' || error?.name === 'AbortError';
}

export async function callOpenRouter(
  prompt,
  {
    temperature,
    maxTokens,
    system,
    models,
    title = 'cryptofoundry content',
    timeoutMs,
    maxAttempts,
    provider,
  } = {},
) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error('OPENROUTER_API_KEY is required');

  const summarize = siteConfig.openRouter.summarize;
  const modelList = models ?? siteConfig.openRouter.models;
  const primaryModel = modelList[0];
  const resolvedTemperature = temperature ?? summarize.temperature;
  const resolvedMaxTokens = maxTokens ?? summarize.maxTokens;
  const resolvedTimeoutMs = timeoutMs ?? summarize.timeoutMs ?? 120_000;
  const resolvedMaxAttempts = maxAttempts ?? summarize.maxAttempts ?? 2;
  const resolvedProvider = provider ?? summarize.provider ?? DEFAULT_PROVIDER;

  let lastError = 'unknown error';

  for (let attempt = 1; attempt <= resolvedMaxAttempts; attempt += 1) {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': siteConfig.site.url,
          'X-Title': title,
        },
        signal: AbortSignal.timeout(resolvedTimeoutMs),
        body: JSON.stringify({
          model: primaryModel,
          models: modelList,
          temperature: resolvedTemperature,
          max_tokens: resolvedMaxTokens,
          provider: resolvedProvider,
          messages: [
            {
              role: 'system',
              content:
                system ??
                'You are a professional technical translator. Output strict JSON only.',
            },
            { role: 'user', content: prompt },
          ],
          response_format: { type: 'json_object' },
        }),
      });

      if (!response.ok) {
        const err = await response.text();
        lastError = `${response.status}: ${err.slice(0, 200)}`;
        console.warn(
          `OpenRouter attempt ${attempt}/${resolvedMaxAttempts} failed (${lastError})`,
        );
        continue;
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (!content) {
        lastError = 'empty model response';
        console.warn(`OpenRouter attempt ${attempt}/${resolvedMaxAttempts}: ${lastError}`);
        continue;
      }

      const parsed = parseLlmJson(content);
      const usage = data.usage ?? {};
      const usedModel = data.model ?? primaryModel;
      console.log(
        `OpenRouter ${usedModel}: ${usage.prompt_tokens ?? '?'} in / ${usage.completion_tokens ?? '?'} out tokens`,
      );

      return {
        data: parsed,
        model: usedModel,
        usage,
      };
    } catch (error) {
      if (isTimeoutError(error)) {
        lastError = `timeout after ${resolvedTimeoutMs}ms`;
        console.warn(`OpenRouter attempt ${attempt}/${resolvedMaxAttempts}: ${lastError}`);
        continue;
      }

      lastError = error.message;
      console.warn(`OpenRouter attempt ${attempt}/${resolvedMaxAttempts} error: ${lastError}`);
    }
  }

  throw new Error(
    `OpenRouter failed after ${resolvedMaxAttempts} attempts (${modelList.join(', ')}): ${lastError}`,
  );
}
