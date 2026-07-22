import path from 'node:path';
import { readFile } from 'node:fs/promises';

import { siteConfig } from '../../config/site.ts';
import { markdownExcerpt, notesDir, serializeMarkdown, writeIfChanged } from './content-utils.mjs';
import {
  codePlaceholderIssue,
  hasUnresolvedCodePlaceholder,
  normalizeMarkdownFences,
} from './markdown-safety.mjs';
import { parseMarkdownFile } from './prepare-english.mjs';
import { callOpenRouter } from './openrouter.mjs';

const LOCALE_NAMES = {
  zh: 'Simplified Chinese (简体中文)',
  es: 'Spanish (Español)',
  ru: 'Russian (Русский)',
  ar: 'Arabic (العربية)',
  fr: 'French (Français)',
  ja: 'Japanese (日本語)',
  de: 'German (Deutsch)',
};

const GLOSSARY = `Glossary — keep exact spelling, do not translate:
- ADAMANT, ADM, cryptofoundry (always lowercase)
- marketmaking.app, adamant-tradebot, ADAMANT Messenger, ADAMANT Tradebot
- npm, Docker, MongoDB, Node.js, GitHub, GHCR, GitHub Actions, Compose
- CLI commands: mm, mm init, mm doctor, mm on, mm off, mm status, mm logs
- Exchanges: Azbit, P2PB2B, StakeCube, Coinstore, FameEX, NonKYC, Bit-Z, CoinDeal, IDCM
- Packages and paths: adamant-tradebot, config.default.jsonc, modules/commands/
- Telegram handle: @adamant_business`;

const EDITORIAL_REQUIREMENTS = `Translation and editorial workflow:
1. First understand the complete source, its technical meaning, factual relationships, scope, and level of certainty.
2. Translate the meaning into the target language without following English syntax or word order mechanically.
3. Edit the translation into publication-ready prose that reads as if it were originally written by a native technical writer in the target language.
4. Silently compare the edited translation with the source and correct any changed, added, weakened, or omitted meaning before responding.

Universal editorial requirements:
- Use natural target-language syntax, idiomatic collocations, established technical terminology, and a consistent professional register.
- Prefer clear verbs and direct sentences over awkward noun chains, excessive passive voice, and source-language constructions.
- Avoid calques, unnecessary transliteration, redundant wording, mixed-language prose, and explanations in parentheses unless the source contains them or the English term is genuinely conventional in the target language.
- Translate technical prose naturally, but preserve product names, API identifiers, code, paths, URLs, Markdown syntax, and glossary terms exactly as required.
- Keep terminology consistent across the title, description, headings, and body.
- Make headings concise and idiomatic in the target language rather than literal copies of English heading structure.
- Preserve every fact, number, link, limitation, recommendation, and degree of certainty. Do not add commentary, interpretation, praise, or new claims.
- Before returning JSON, silently reread the target text once more and rewrite every phrase that sounds translated, unnatural, ambiguous, or grammatically awkward to a native reader.
- Return only the required JSON object and never describe the translation or editing process.`;

const CATEGORY_HINTS = {
  release: (localeLabel) =>
    `Release note: translate the ENTIRE body into ${localeLabel}. Translate all Markdown headings (e.g. "## Install", "## Highlights", "### Breaking changes") and every prose paragraph. The body must not remain in English.`,
  discussion: () =>
    'Discussion post: translate all section headings and narrative text; keep technical identifiers unchanged.',
  article: () =>
    'Article: translate all sections; keep code blocks and paths unchanged.',
};

function looksLikeCodeLine(line) {
  if (/^(`{1,2}n|js|ts|shell|bash|jsonc?|python)$/i.test(line)) return true;
  const trimmed = line.trim();
  if (!trimmed) return false;
  if (/^(import|export|const|let|var|await|return|if|else|for|while|switch|case|default|throw|new|class)\b/.test(trimmed)) {
    return true;
  }
  if (/^\/\//.test(trimmed) || /^\/\*/.test(trimmed) || /^\*\//.test(trimmed)) return true;
  if (/^(api\.|socket\.|npm |node )/.test(trimmed)) return true;
  if (/^[{}];]*$/.test(trimmed)) return true;
  if (/[;{}()]/.test(trimmed) && /^(const|let|var|import|await|api\.|socket\.|\/\/)/.test(trimmed)) {
    return true;
  }
  return false;
}

function proseLines(body) {
  const withoutCode = body
    .replace(/```[\s\S]*?```/g, '')
    .replace(/^(?:js|ts|shell|bash)\n[\s\S]*?\n``n$/gm, '');
  return withoutCode
    .split('\n')
    .map((line) => line.trim())
    .filter(
      (line) =>
        line &&
        !line.startsWith('![') &&
        !line.includes('@@CODEBLOCK') &&
        !/^#{1,6}\s/.test(line) &&
        !looksLikeCodeLine(line),
    );
}

function needsRetranslation(englishBody, translatedBody) {
  const englishProse = proseLines(englishBody);
  if (englishProse.length === 0) return false;
  const unchanged = englishProse.filter((line) => translatedBody.includes(line));
  return unchanged.length / englishProse.length > 0.5;
}

export function buildCodePlaceholderRequirements(blockCount) {
  if (blockCount === 0) {
    return '- The input contains no protected code block placeholders; do not invent or add any placeholder tokens';
  }

  const placeholders = Array.from(
    { length: blockCount },
    (_, index) => `@@CODEBLOCK${index}@@`,
  );

  return [
    `- Preserve each of these protected code block placeholders exactly once: ${placeholders.join(', ')}`,
    '- Do not add, remove, duplicate, rename, or translate the listed placeholders',
  ].join('\n');
}

function buildTranslationPrompt({
  localeId,
  localeLabel,
  category,
  frontmatter,
  body,
  blockCount,
  retryReason = '',
}) {
  const categoryHint = CATEGORY_HINTS[category]?.(localeLabel) ?? '';
  const retryNote = retryReason
    ? `\nIMPORTANT: Previous output failed validation: ${retryReason}. Correct this failure. Translate EVERY sentence and heading into ${localeLabel}. Only glossary terms, protected code blocks, URLs, and inline code stay in English.\n`
    : '';

  return `Translate this engineering note from English to ${localeLabel} (${localeId}).
${retryNote}
Quality requirements:
- Natural, fluent, grammatically correct ${localeLabel} for a technical audience
- Preserve meaning; do not add or remove facts
- The "body" field must be fully translated into ${localeLabel} — not a mix of English and ${localeLabel}
- Keep Markdown structure: headings, paragraphs, bold, links, tables
${buildCodePlaceholderRequirements(blockCount)}
- Keep inline code, URLs, file paths, image paths, and HTML tags unchanged
- Translate image alt text and visible prose; translate ALL headings including ## and ###
- description: max 180 characters, one line, plain text, no markdown

${categoryHint}

${EDITORIAL_REQUIREMENTS}

${GLOSSARY}

Category: ${category}

Respond with JSON only:
{"title":"...","description":"...","body":"..."}

English title: ${frontmatter.title}
English description: ${frontmatter.description}

English body:
${body}`;
}

function protectCodeBlocks(body) {
  const blocks = [];
  const protectedBody = body.replace(/```[\s\S]*?```/g, (block) => {
    const token = `@@CODEBLOCK${blocks.length}@@`;
    blocks.push(block);
    return token;
  });
  return { protectedBody, blocks };
}

function restoreCodeBlocks(body, blocks) {
  return blocks.reduce(
    (text, block, index) => text.replaceAll(`@@CODEBLOCK${index}@@`, block),
    body,
  );
}

export async function listAllEnglishNoteSlugs() {
  const enDir = path.join(notesDir, siteConfig.defaultLocale);
  const { readdir } = await import('node:fs/promises');
  const files = await readdir(enDir);
  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const separator = file.indexOf('_');
      if (separator === -1) return null;
      return file.slice(separator + 1, -3);
    })
    .filter(Boolean)
    .sort();
}

export async function isTranslatedNote(fileName, localeId) {
  const targetPath = path.join(notesDir, localeId, fileName);
  try {
    const content = await readFile(targetPath, 'utf8');
    return /placeholder:\s*false/.test(content);
  } catch {
    return false;
  }
}

export async function findEnglishNoteBySlug(slug) {
  const enDir = path.join(notesDir, siteConfig.defaultLocale);
  const { readdir } = await import('node:fs/promises');
  const files = await readdir(enDir);
  const match = files.find((file) => file.includes(`_${slug}.md`));
  if (!match) throw new Error(`English note not found for slug: ${slug}`);
  const filePath = path.join(enDir, match);
  const content = await readFile(filePath, 'utf8');
  const parsed = parseMarkdownFile(content);
  return { filePath, fileName: match, ...parsed };
}

const BRAND_FIXES = [
  [/cryptofondry/gi, 'cryptofoundry'],
  [/Cryptofoundry/g, 'cryptofoundry'],
];

function normalizeBrands(text) {
  return BRAND_FIXES.reduce((value, [pattern, replacement]) => value.replace(pattern, replacement), text);
}

export async function translateNoteToLocale(
  englishFrontmatter,
  body,
  localeId,
  { requestOpenRouter = callOpenRouter } = {},
) {
  const locale = siteConfig.locales.find((item) => item.id === localeId);
  if (!locale) throw new Error(`Unknown locale: ${localeId}`);
  if (localeId === siteConfig.defaultLocale) {
    throw new Error('Cannot translate to the default English locale');
  }

  const normalizedEnglishBody = normalizeMarkdownFences(body);
  const { protectedBody, blocks } = protectCodeBlocks(normalizedEnglishBody);
  const localeLabel = LOCALE_NAMES[localeId] ?? locale.label;

  async function requestTranslation(configuredModel, retryReason = '') {
    const prompt = buildTranslationPrompt({
      localeId,
      localeLabel,
      category: englishFrontmatter.category,
      frontmatter: englishFrontmatter,
      body: protectedBody,
      blockCount: blocks.length,
      retryReason,
    });

    const translate = siteConfig.openRouter.translate;

    const { data: translated, model } = await requestOpenRouter(prompt, {
      models: [configuredModel],
      temperature: translate.temperature,
      maxTokens: translate.maxTokens,
      timeoutMs: translate.timeoutMs,
      maxAttempts: translate.maxAttempts,
      provider: translate.provider,
      title: 'cryptofoundry content translation',
      system:
        'You are a native technical writer, professional translator, and senior editor in the requested target language. Produce accurate, publication-ready prose that does not read like a translation. Preserve all facts and protected technical content. Output strict JSON with title, description, and body fields only.',
    });

    return { translated, model: model ?? configuredModel };
  }

  function restoreValidatedBody(translatedBody) {
    const issue = codePlaceholderIssue(translatedBody, blocks.length);
    if (issue) throw new Error(issue);
    const restored = normalizeMarkdownFences(restoreCodeBlocks(translatedBody, blocks));
    if (hasUnresolvedCodePlaceholder(restored)) {
      throw new Error('Translation contains an unresolved code placeholder');
    }
    return restored;
  }

  const translate = siteConfig.openRouter.translate;
  const configuredModels = [...translate.models];
  const attemptedModels = [];
  let translated;
  let model;
  let restoredBody;
  let retryReason = '';
  let lastFailureReason = '';

  for (const [index, configuredModel] of configuredModels.entries()) {
    const fallbackModel = configuredModels[index + 1];

    try {
      ({ translated, model } = await requestTranslation(configuredModel, retryReason));
    } catch (error) {
      if (/OpenRouter account error/.test(error.message)) throw error;
      lastFailureReason = `request failed: ${error.message}`;
      attemptedModels.push(configuredModel);
      console.warn(
        `Translation request ${englishFrontmatter.slug} → ${localeId} failed via ${configuredModel}: ${error.message}${fallbackModel ? `; retrying with ${fallbackModel}` : ''}`,
      );
      continue;
    }

    attemptedModels.push(configuredModel);

    try {
      if (typeof translated?.title !== 'string' || translated.title.trim() === '') {
        throw new Error('response title must be a non-empty string');
      }
      if (typeof translated?.body !== 'string' || translated.body.trim() === '') {
        throw new Error('response body must be a non-empty string');
      }
      if (
        translated.description !== undefined &&
        translated.description !== null &&
        typeof translated.description !== 'string'
      ) {
        throw new Error('response description must be a string when provided');
      }
      for (const [field, value] of [
        ['title', translated.title],
        ['description', translated.description ?? ''],
      ]) {
        const issue = codePlaceholderIssue(value, 0);
        if (issue) throw new Error(`response ${field} contains a code placeholder: ${issue}`);
        if (hasUnresolvedCodePlaceholder(value)) {
          throw new Error(`response ${field} contains an unresolved code placeholder`);
        }
      }

      restoredBody = restoreValidatedBody(translated.body);
      if (needsRetranslation(normalizedEnglishBody, restoredBody)) {
        throw new Error('body still contains English prose');
      }
      break;
    } catch (error) {
      retryReason = error.message;
      lastFailureReason = retryReason;
      console.warn(
        `Rejected translation ${englishFrontmatter.slug} → ${localeId} via ${model}: ${retryReason}${fallbackModel ? `; retrying with ${fallbackModel}` : ''}`,
      );
      translated = undefined;
      restoredBody = undefined;
    }
  }

  if (!translated || restoredBody === undefined) {
    throw new Error(
      `Translation failed for ${englishFrontmatter.slug} → ${localeId} after ${attemptedModels.join(', ')}: ${lastFailureReason}`,
    );
  }

  console.log(`Translated ${englishFrontmatter.slug} → ${localeId} via ${model}`);

  const localizedFrontmatter = {
    ...englishFrontmatter,
    title: normalizeBrands(translated.title),
    description: normalizeBrands(
      translated.description?.trim()
        ? translated.description
        : markdownExcerpt(restoredBody, translated.title),
    ),
    locale: localeId,
    placeholder: false,
  };

  return serializeMarkdown(localizedFrontmatter, normalizeBrands(restoredBody));
}

export async function writeTranslatedNote(fileName, localeId, content) {
  const targetPath = path.join(notesDir, localeId, fileName);
  return writeIfChanged(targetPath, content);
}
