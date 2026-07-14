import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { siteConfig } from '../../config/site.ts';

export const rootDir = fileURLToPath(new URL('../..', import.meta.url));
export const notesDir = path.join(rootDir, 'src/content/notes');
export const originalsDir = path.join(rootDir, 'content/original');
export const syncStatePath = path.join(rootDir, siteConfig.sync.dedupStateFile);

export const placeholderBody = `> Translation placeholder

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`;

export function slugify(value) {
  const slug = value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90)
    .replace(/-+$/g, '');

  return slug || 'note';
}

export function markdownExcerpt(markdown, fallback = '') {
  const text = String(markdown ?? '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#>*_~|\-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const result = text || fallback;
  return result.length > 180 ? `${result.slice(0, 177).trimEnd()}…` : result;
}

export function sanitizeImportedMarkdown(markdown) {
  return String(markdown ?? '')
    .replace(/<(script|iframe|object|embed|form|input|button)\b[^>]*>[\s\S]*?<\/\1>/gi, '')
    .replace(/<(script|iframe|object|embed|form|input|button)\b[^>]*\/?\s*>/gi, '')
    .replace(/\s+on[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/(href|src)\s*=\s*(["'])\s*javascript:[\s\S]*?\2/gi, '$1="#"')
    .replace(/\r\n/g, '\n')
    .replace(/\n{4,}/g, '\n\n\n')
    .trim();
}

function yamlValue(value) {
  if (value instanceof Date) return JSON.stringify(value.toISOString());
  return JSON.stringify(value);
}

export function serializeMarkdown(frontmatter, body) {
  const fields = Object.entries(frontmatter)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => `${key}: ${yamlValue(value)}`)
    .join('\n');
  const normalizedBody = String(body ?? '').trim();
  return `---\n${fields}\n---\n${normalizedBody ? `\n${normalizedBody}\n` : ''}`;
}

export async function writeIfChanged(filePath, content) {
  let current;
  try {
    current = await readFile(filePath, 'utf8');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  if (current === content) return false;
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, content, 'utf8');
  return true;
}

export async function writeBufferIfChanged(filePath, buffer) {
  let current;
  try {
    current = await readFile(filePath);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  if (current?.equals(buffer)) return false;
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, buffer);
  return true;
}

export async function writeOriginalAndLocaleNotes(record, body) {
  const sourceFolder =
    record.category === 'article'
      ? 'articles'
      : record.category === 'release'
        ? 'releases'
        : 'discussions';
  const publishedDate = new Date(record.publishedAt);
  if (Number.isNaN(publishedDate.getTime())) {
    throw new Error(`Invalid publication date for ${record.originalId}: ${record.publishedAt}`);
  }
  const datePrefix = publishedDate.toISOString().slice(0, 10);
  const originalName = `${datePrefix}_${record.originalFileName ?? record.slug}.md`;
  const originalFrontmatter = { ...record };
  delete originalFrontmatter.originalFileName;

  let changed = 0;
  changed += Number(
    await writeIfChanged(
      path.join(originalsDir, sourceFolder, originalName),
      serializeMarkdown({ ...originalFrontmatter, locale: 'en', placeholder: false }, body),
    ),
  );

  for (const locale of siteConfig.locales) {
    const isEnglish = locale.id === siteConfig.defaultLocale;
    const localizedFrontmatter = {
      ...originalFrontmatter,
      locale: locale.id,
      placeholder: !isEnglish,
    };
    const notePath = path.join(notesDir, locale.id, `${datePrefix}_${record.slug}.md`);
    changed += Number(
      await writeIfChanged(
        notePath,
        serializeMarkdown(localizedFrontmatter, isEnglish ? body : placeholderBody),
      ),
    );
  }

  return changed;
}

export async function updateSyncState(sourceKey, originalIds) {
  let state = { version: 1, sources: {} };
  try {
    state = JSON.parse(await readFile(syncStatePath, 'utf8'));
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  state.version = 1;
  state.sources ??= {};
  state.sources[sourceKey] = [...new Set(originalIds)].sort();
  const serialized = `${JSON.stringify(state, null, 2)}\n`;
  return writeIfChanged(syncStatePath, serialized);
}

export function getGithubToken() {
  const token = process.env.PAT_GITHUB_TOKEN;
  if (!token) {
    throw new Error('PAT_GITHUB_TOKEN is required for authenticated GitHub imports');
  }
  return token;
}

export function githubHeaders(token) {
  return {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${token}`,
    'User-Agent': 'cryptofoundry-engineering-notes-importer',
    'X-GitHub-Api-Version': '2022-11-28',
  };
}

export async function fetchGithubPages(endpoint, token) {
  const items = [];
  for (let page = 1; ; page += 1) {
    const separator = endpoint.includes('?') ? '&' : '?';
    const url = `https://api.github.com${endpoint}${separator}per_page=100&page=${page}`;
    const response = await fetch(url, { headers: githubHeaders(token) });
    if (!response.ok) {
      const message = await response.text();
      throw new Error(`GitHub API ${response.status} for ${endpoint}: ${message.slice(0, 500)}`);
    }
    const pageItems = await response.json();
    if (!Array.isArray(pageItems)) throw new Error(`Expected an array from GitHub API: ${endpoint}`);
    items.push(...pageItems);
    if (pageItems.length < 100) break;
  }
  return items;
}

export async function mapLimit(items, limit, mapper) {
  const results = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await mapper(items[index], index);
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, () => worker()));
  return results;
}

export function isMainModule(importMetaUrl) {
  return Boolean(process.argv[1]) && fileURLToPath(importMetaUrl) === path.resolve(process.argv[1]);
}
