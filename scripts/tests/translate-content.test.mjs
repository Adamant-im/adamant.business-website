import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildCodePlaceholderRequirements,
  translateNoteToLocale,
} from '../lib/translate-content.mjs';

const frontmatter = {
  title: 'English title',
  description: 'English description',
  slug: 'translation-fallback-test',
  category: 'discussion',
  publishedAt: '2026-07-20T00:00:00.000Z',
  author: 'cryptofoundry',
  sourceUrl: 'https://example.com/source',
  originalId: 'test:translation-fallback',
};

const englishBody = 'First English paragraph.\n\nSecond English paragraph.';

function validRussianTranslation(body = 'Первый абзац.\n\nВторой абзац.') {
  return {
    title: 'Русский заголовок',
    description: 'Русское описание',
    body,
  };
}

test('does not mention code placeholder tokens when the source has no code blocks', async () => {
  const calls = [];
  const requestOpenRouter = async (prompt, options) => {
    calls.push({ prompt, options });
    return { data: validRussianTranslation(), model: options.models[0] };
  };

  const translated = await translateNoteToLocale(frontmatter, englishBody, 'ru', {
    requestOpenRouter,
  });

  assert.equal(calls.length, 1);
  assert.deepEqual(calls[0].options.models, ['google/gemini-3.1-flash-lite']);
  assert.equal(calls[0].options.temperature, 0.4);
  assert.doesNotMatch(calls[0].prompt, /@@CODEBLOCK/);
  assert.doesNotMatch(calls[0].options.system, /@@CODEBLOCK/);
  assert.match(calls[0].prompt, /Translation and editorial workflow:/);
  assert.match(calls[0].prompt, /sounds translated, unnatural, ambiguous, or grammatically awkward/);
  assert.match(calls[0].prompt, /Preserve every fact, number, link, limitation, recommendation, and degree of certainty/);
  assert.doesNotMatch(calls[0].prompt, /Title translation example:/);
  assert.match(calls[0].options.system, /native technical writer, professional translator, and senior editor/);
  assert.match(calls[0].options.system, /does not read like a translation/);
  assert.match(translated, /Русский заголовок/);
  assert.match(translated, /Первый абзац/);
});

test('uses the next configured model after a semantic placeholder failure', async () => {
  const calls = [];
  const requestOpenRouter = async (prompt, options) => {
    calls.push({ prompt, options });
    const data = calls.length === 1
      ? validRussianTranslation('Русский текст.\n\n@@CODEBLOCK0@@')
      : validRussianTranslation();
    return { data, model: options.models[0] };
  };

  const translated = await translateNoteToLocale(frontmatter, englishBody, 'ru', {
    requestOpenRouter,
  });

  assert.equal(calls.length, 2);
  assert.deepEqual(calls[0].options.models, ['google/gemini-3.1-flash-lite']);
  assert.deepEqual(calls[1].options.models, ['qwen/qwen3.7-plus']);
  assert.match(calls[1].prompt, /Previous output failed validation: Code placeholder mismatch: unknown 0/);
  assert.doesNotMatch(translated, /@@CODEBLOCK/);
});

test('preserves the semantic retry reason across an intermediate transport failure', async () => {
  const calls = [];
  const requestOpenRouter = async (prompt, options) => {
    calls.push({ prompt, options });
    if (calls.length === 1) {
      return {
        data: validRussianTranslation('Русский текст.\n\n@@CODEBLOCK0@@'),
        model: options.models[0],
      };
    }
    if (calls.length === 2) {
      throw new Error('OpenRouter failed after 2 attempts: timeout');
    }
    return { data: validRussianTranslation(), model: options.models[0] };
  };

  const translated = await translateNoteToLocale(frontmatter, englishBody, 'ru', {
    requestOpenRouter,
  });

  assert.equal(calls.length, 3);
  assert.deepEqual(calls[2].options.models, ['deepseek/deepseek-v4-pro']);
  assert.match(calls[2].prompt, /Previous output failed validation: Code placeholder mismatch: unknown 0/);
  assert.match(translated, /Первый абзац/);
});

test('rejects internal placeholders in translated frontmatter fields', async () => {
  const calls = [];
  const requestOpenRouter = async (_prompt, options) => {
    calls.push(options.models[0]);
    const data = calls.length === 1
      ? { ...validRussianTranslation(), title: 'Заголовок @@codeblock_0@@' }
      : validRussianTranslation();
    return { data, model: options.models[0] };
  };

  const translated = await translateNoteToLocale(frontmatter, englishBody, 'ru', {
    requestOpenRouter,
  });

  assert.deepEqual(calls, ['google/gemini-3.1-flash-lite', 'qwen/qwen3.7-plus']);
  assert.doesNotMatch(translated, /@@codeblock/i);
});

test('lists exact placeholders and restores protected code blocks unchanged', async () => {
  const source = 'Before the example.\n\n```js\nconst value = 1;\n```\n\nAfter the example.';
  let capturedPrompt = '';
  const requestOpenRouter = async (prompt, options) => {
    capturedPrompt = prompt;
    return {
      data: validRussianTranslation('До примера.\n\n@@CODEBLOCK0@@\n\nПосле примера.'),
      model: options.models[0],
    };
  };

  const translated = await translateNoteToLocale(frontmatter, source, 'ru', {
    requestOpenRouter,
  });

  assert.match(capturedPrompt, /Preserve each of these protected code block placeholders exactly once: @@CODEBLOCK0@@/);
  assert.match(translated, /```js\nconst value = 1;\n```/);
  assert.doesNotMatch(translated, /@@CODEBLOCK/);
});

test('reports every attempted model when all translations fail validation', async () => {
  const models = [];
  const requestOpenRouter = async (_prompt, options) => {
    models.push(options.models[0]);
    return {
      data: { title: 42, description: 'Description', body: 'Переведённый текст.' },
      model: options.models[0],
    };
  };

  await assert.rejects(
    translateNoteToLocale(frontmatter, englishBody, 'ru', { requestOpenRouter }),
    /Translation failed for translation-fallback-test → ru after google\/gemini-3\.1-flash-lite, qwen\/qwen3\.7-plus, deepseek\/deepseek-v4-pro: response title must be a non-empty string/,
  );
  assert.deepEqual(models, [
    'google/gemini-3.1-flash-lite',
    'qwen/qwen3.7-plus',
    'deepseek/deepseek-v4-pro',
  ]);
});

test('does not try another model after an OpenRouter account error', async () => {
  let callCount = 0;
  const requestOpenRouter = async () => {
    callCount += 1;
    throw new Error('OpenRouter account error (402: insufficient balance)');
  };

  await assert.rejects(
    translateNoteToLocale(frontmatter, englishBody, 'ru', { requestOpenRouter }),
    /OpenRouter account error/,
  );
  assert.equal(callCount, 1);
});

test('builds a precise placeholder rule for every protected block', () => {
  assert.doesNotMatch(buildCodePlaceholderRequirements(0), /@@CODEBLOCK/);
  assert.match(
    buildCodePlaceholderRequirements(2),
    /@@CODEBLOCK0@@, @@CODEBLOCK1@@/,
  );
});
