import { siteConfig } from '../../config/site.ts';

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

export async function callOpenRouter(
  prompt,
  { temperature, maxTokens, system, models, title = 'cryptofoundry content' } = {},
) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error('OPENROUTER_API_KEY is required');

  const modelList = models ?? siteConfig.openRouter.models;
  const resolvedTemperature = temperature ?? siteConfig.openRouter.summarize.temperature;
  const resolvedMaxTokens = maxTokens ?? siteConfig.openRouter.summarize.maxTokens;

  for (const model of modelList) {
    try {
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': siteConfig.site.url,
          'X-Title': title,
        },
        body: JSON.stringify({
          model,
          temperature: resolvedTemperature,
          max_tokens: resolvedMaxTokens,
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
        console.warn(`OpenRouter ${model} failed (${response.status}): ${err.slice(0, 200)}`);
        continue;
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (!content) continue;

      const parsed = parseLlmJson(content);
      const usage = data.usage ?? {};
      console.log(
        `OpenRouter ${model}: ${usage.prompt_tokens ?? '?'} in / ${usage.completion_tokens ?? '?'} out tokens`,
      );

      return {
        data: parsed,
        model,
        usage,
      };
    } catch (error) {
      console.warn(`OpenRouter ${model} error: ${error.message}`);
    }
  }

  throw new Error(`All OpenRouter models failed: ${modelList.join(', ')}`);
}
