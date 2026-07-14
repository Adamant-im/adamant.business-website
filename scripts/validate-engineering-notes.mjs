import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

import { siteConfig } from '../config/site.ts';
import { notesDir, rootDir } from './lib/content-utils.mjs';

function parseGeneratedMarkdown(contents, filePath) {
  const match = contents.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error(`Invalid generated Markdown frontmatter: ${filePath}`);
  const data = {};
  for (const line of match[1].split('\n')) {
    const separator = line.indexOf(':');
    if (separator === -1) throw new Error(`Invalid frontmatter line in ${filePath}: ${line}`);
    const key = line.slice(0, separator);
    data[key] = JSON.parse(line.slice(separator + 1).trim());
  }
  return { data, body: match[2].trim() };
}

async function markdownFiles(directory) {
  return (await readdir(directory)).filter((name) => name.endsWith('.md')).sort();
}

const localeFiles = new Map();
const entriesByLocale = new Map();
for (const locale of siteConfig.locales) {
  const localeDirectory = path.join(notesDir, locale.id);
  const files = await markdownFiles(localeDirectory);
  localeFiles.set(locale.id, files);
  const entries = [];
  for (const file of files) {
    const filePath = path.join(localeDirectory, file);
    entries.push({ file, ...(parseGeneratedMarkdown(await readFile(filePath, 'utf8'), filePath)) });
  }
  entriesByLocale.set(locale.id, entries);
}

const englishFiles = localeFiles.get(siteConfig.defaultLocale);
const englishEntries = entriesByLocale.get(siteConfig.defaultLocale);
const englishIds = new Set(englishEntries.map((entry) => entry.data.originalId));
if (englishIds.size !== englishEntries.length) throw new Error('Duplicate originalId values found in English notes');

for (const locale of siteConfig.locales) {
  const files = localeFiles.get(locale.id);
  if (JSON.stringify(files) !== JSON.stringify(englishFiles)) {
    throw new Error(`Locale file set does not match English: ${locale.id}`);
  }
  const entries = entriesByLocale.get(locale.id);
  for (const entry of entries) {
    if (entry.data.locale !== locale.id) throw new Error(`Incorrect locale in ${locale.id}/${entry.file}`);
    if (entry.data.placeholder !== false) {
      throw new Error(`Engineering note is still marked as a placeholder: ${locale.id}/${entry.file}`);
    }
    if (entry.body.includes('Lorem ipsum')) {
      throw new Error(`Engineering note still contains placeholder text: ${locale.id}/${entry.file}`);
    }
    if (!englishIds.has(entry.data.originalId)) {
      throw new Error(`Unexpected originalId in ${locale.id}/${entry.file}`);
    }
  }
}

for (const entry of englishEntries) {
  if (!entry.data.coverImage) continue;
  const imagePath = path.join(rootDir, 'public', entry.data.coverImage.replace(/^\//, ''));
  await access(imagePath);
}

console.log(
  `Engineering notes validation passed: ${englishEntries.length} publications × ${siteConfig.locales.length} locales`,
);
