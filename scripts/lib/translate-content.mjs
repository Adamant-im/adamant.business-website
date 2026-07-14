import path from 'node:path';
import { readFile } from 'node:fs/promises';

import { siteConfig } from '../../config/site.ts';
import { markdownExcerpt, notesDir, serializeMarkdown, writeIfChanged } from './content-utils.mjs';
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

function buildTranslationPrompt({ localeId, localeLabel, category, frontmatter, body }) {
  return `Translate this engineering note from English to ${localeLabel} (${localeId}).

Quality requirements:
- Natural, fluent, grammatically correct ${localeLabel} for a technical audience
- Preserve meaning; do not add or remove facts
- Keep Markdown structure: headings, paragraphs, bold, links, tables
- Keep fenced code blocks EXACTLY unchanged (bash, diff, json, etc.)
- Keep inline code, URLs, file paths, image paths, and HTML tags unchanged
- Keep brand and product names as-is: ADAMANT, cryptofoundry (always lowercase), marketmaking.app, npm package names, exchange names, GitHub repos
- Translate image alt text and visible prose; you may translate headings
- For Arabic: use clear Modern Standard Arabic suitable for technical documentation

Category: ${category}

Respond with JSON only:
{"title":"...","description":"...","body":"..."}

Constraints:
- description: max 180 characters, one line, no markdown
- body: translated Markdown only, no frontmatter

English title: ${frontmatter.title}
English description: ${frontmatter.description}

English body:
${body}`;
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

export async function translateNoteToLocale(englishFrontmatter, body, localeId) {
  const locale = siteConfig.locales.find((item) => item.id === localeId);
  if (!locale) throw new Error(`Unknown locale: ${localeId}`);
  if (localeId === siteConfig.defaultLocale) {
    throw new Error('Cannot translate to the default English locale');
  }

  const localeLabel = LOCALE_NAMES[localeId] ?? locale.label;
  const prompt = buildTranslationPrompt({
    localeId,
    localeLabel,
    category: englishFrontmatter.category,
    frontmatter: englishFrontmatter,
    body,
  });

  const translated = await callOpenRouter(prompt, {
    temperature: siteConfig.openRouter.translate.temperature,
    system:
      'You are a professional technical translator for a crypto engineering blog. Output strict JSON with title, description, and body fields.',
  });

  if (!translated?.title || !translated?.body) {
    throw new Error(`Invalid translation response for ${englishFrontmatter.slug} → ${localeId}`);
  }

  const localizedFrontmatter = {
    ...englishFrontmatter,
    title: normalizeBrands(translated.title),
    description: normalizeBrands(translated.description ?? markdownExcerpt(translated.body, translated.title)),
    locale: localeId,
    placeholder: false,
  };

  return serializeMarkdown(localizedFrontmatter, normalizeBrands(translated.body));
}

export async function writeTranslatedNote(fileName, localeId, content) {
  const targetPath = path.join(notesDir, localeId, fileName);
  return writeIfChanged(targetPath, content);
}
