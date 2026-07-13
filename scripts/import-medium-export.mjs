import { readdir, readFile, rm } from 'node:fs/promises';
import path from 'node:path';

import * as cheerio from 'cheerio';
import sharp from 'sharp';
import TurndownService from 'turndown';

import {
  isMainModule,
  mapLimit,
  markdownExcerpt,
  notesDir,
  originalsDir,
  rootDir,
  sanitizeImportedMarkdown,
  slugify,
  updateSyncState,
  writeBufferIfChanged,
  writeIfChanged,
  writeOriginalAndLocaleNotes,
} from './lib/content-utils.mjs';
import { siteConfig } from '../config/site.ts';

const archivesDir = path.join(rootDir, '.ai-ignored/medium-posts');
const publicImagesDir = path.join(rootDir, 'public/images/engineering-notes/medium');
const publicationCachePath = path.join(archivesDir, 'news-adamant-publications.json');
let imageRequestQueue = Promise.resolve();
let nextImageRequestAt = 0;
let publicationCache = {};

const turndown = new TurndownService({
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
  emDelimiter: '*',
  headingStyle: 'atx',
  strongDelimiter: '**',
});

turndown.addRule('mediumFencedCode', {
  filter: 'pre',
  replacement(_content, node) {
    const language = node.getAttribute('data-code-block-lang') || '';
    const pre = cheerio.load(node.outerHTML, null, false);
    pre('br').replaceWith('\n');
    const code = pre.root().text().replace(/^\n+|\n+$/g, '');
    return `\n\n\`\`\`${language}\n${code}\n\`\`\`\n\n`;
  },
});
turndown.keep(['sub', 'sup']);

function contentTypeExtension(contentType) {
  const normalized = contentType.split(';')[0].trim().toLowerCase();
  return {
    'image/avif': '.avif',
    'image/gif': '.gif',
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/svg+xml': '.svg',
    'image/webp': '.webp',
  }[normalized];
}

async function optimizePublicImage(buffer) {
  return sharp(buffer, { animated: true })
    .rotate()
    .resize({ width: 1600, height: 1200, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82, effort: 4 })
    .toBuffer();
}

function urlExtension(url) {
  const match = new URL(url).pathname.match(/\.(avif|gif|jpe?g|png|svg|webp)$/i);
  if (!match) return undefined;
  return `.${match[1].toLowerCase().replace('jpeg', 'jpg')}`;
}

function preferredMediumImageUrl(url) {
  const parsed = new URL(url);
  if (!parsed.hostname.endsWith('medium.com')) return url;
  const imageName = parsed.pathname.split('/').filter(Boolean).at(-1);
  return imageName ? `https://miro.medium.com/v2/resize:fit:1400/${imageName}` : url;
}

async function findCachedImage(cacheDir, index) {
  try {
    const prefix = `${String(index + 1).padStart(3, '0')}-`;
    const files = await readdir(cacheDir);
    return files.find((name) => name.startsWith(prefix));
  } catch (error) {
    if (error.code === 'ENOENT') return undefined;
    throw error;
  }
}

async function downloadImage(url, cacheDir, index, imageId) {
  const cachedName = await findCachedImage(cacheDir, index);
  if (cachedName) {
    return { fileName: cachedName, buffer: await readFile(path.join(cacheDir, cachedName)) };
  }

  let lastError;
  const downloadUrl = preferredMediumImageUrl(url);
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    try {
      imageRequestQueue = imageRequestQueue.then(async () => {
        const delay = Math.max(0, nextImageRequestAt - Date.now());
        if (delay > 0) await new Promise((resolve) => setTimeout(resolve, delay));
        nextImageRequestAt = Date.now() + 250;
      });
      await imageRequestQueue;
      const response = await fetch(downloadUrl, {
        headers: {
          Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
          'User-Agent':
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/138 Safari/537.36',
        },
      });
      if (!response.ok) {
        const error = new Error(`HTTP ${response.status}`);
        error.retryAfter = Number(response.headers.get('retry-after')) || undefined;
        throw error;
      }
      const buffer = Buffer.from(await response.arrayBuffer());
      const extension = urlExtension(url) || contentTypeExtension(response.headers.get('content-type') || '') || '.jpg';
      const safeImageId = slugify(imageId || `image-${index + 1}`).slice(0, 60);
      const fileName = `${String(index + 1).padStart(3, '0')}-${safeImageId}${extension}`;
      await writeBufferIfChanged(path.join(cacheDir, fileName), buffer);
      return { fileName, buffer };
    } catch (error) {
      lastError = error;
      if (attempt < 5) {
        const retrySeconds = lastError.retryAfter || Math.min(20, 2 ** attempt);
        await new Promise((resolve) => setTimeout(resolve, retrySeconds * 1000));
      }
    }
  }

  throw new Error(`Unable to download ${url}: ${lastError.message}`);
}

async function listPostFiles() {
  const users = await readdir(archivesDir, { withFileTypes: true });
  const files = [];
  for (const user of users) {
    if (!user.isDirectory()) continue;
    const postsDir = path.join(archivesDir, user.name, 'posts');
    let entries;
    try {
      entries = await readdir(postsDir, { withFileTypes: true });
    } catch (error) {
      if (error.code === 'ENOENT') continue;
      throw error;
    }
    for (const entry of entries) {
      if (!entry.isFile() || !entry.name.endsWith('.html') || entry.name.startsWith('draft_')) continue;
      files.push({ filePath: path.join(postsDir, entry.name), user: user.name });
    }
  }
  return files.sort((a, b) => a.filePath.localeCompare(b.filePath));
}

async function loadPublicationCache() {
  try {
    publicationCache = JSON.parse(await readFile(publicationCachePath, 'utf8'));
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    publicationCache = {};
  }
}

function newsPublicationUrl(sourceUrl) {
  const source = new URL(sourceUrl);
  const postPath = source.pathname.split('/').filter(Boolean).at(-1);
  if (!postPath) throw new Error(`Unable to derive news.adamant.im URL from ${sourceUrl}`);
  return `https://news.adamant.im/${postPath}`;
}

async function isNewsPublication(mediumId, newsUrl) {
  const cached = publicationCache[mediumId];
  if (cached?.url === newsUrl && typeof cached.published === 'boolean') return cached.published;

  let lastError;
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const response = await fetch(newsUrl, {
        method: 'HEAD',
        redirect: 'manual',
        headers: { 'User-Agent': 'cryptofoundry-medium-publication-importer' },
      });
      if (response.status === 200 || response.status === 410) {
        publicationCache[mediumId] = { url: newsUrl, published: true };
        return true;
      }
      if (response.status >= 300 && response.status < 400) {
        publicationCache[mediumId] = { url: newsUrl, published: false };
        return false;
      }
      lastError = new Error(`HTTP ${response.status}`);
    } catch (error) {
      lastError = error;
    }
    if (attempt < 4) await new Promise((resolve) => setTimeout(resolve, 2 ** attempt * 1000));
  }

  throw new Error(`Unable to verify Medium publication ${newsUrl}: ${lastError.message}`);
}

async function pruneExcludedMediumNotes(allowedIds) {
  const englishDir = path.join(notesDir, siteConfig.defaultLocale);
  let files;
  try {
    files = await readdir(englishDir);
  } catch (error) {
    if (error.code === 'ENOENT') return 0;
    throw error;
  }

  let removed = 0;
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    const markdown = await readFile(path.join(englishDir, file), 'utf8');
    const match = markdown.match(/^originalId: "medium:([a-f0-9]+)"$/m);
    if (!match || allowedIds.has(`medium:${match[1]}`)) continue;

    await Promise.all(
      siteConfig.locales.map((locale) => rm(path.join(notesDir, locale.id, file), { force: true })),
    );
    await rm(path.join(originalsDir, 'articles', `${match[1]}.md`), { force: true });
    await rm(path.join(publicImagesDir, match[1]), { force: true, recursive: true });
    removed += 1;
  }
  return removed;
}

async function importPost({ filePath, user }) {
  const html = await readFile(filePath, 'utf8');
  const $ = cheerio.load(html);
  const fileName = path.basename(filePath, '.html');
  const idMatch = fileName.match(/-([a-f0-9]{8,16})$/i);
  if (!idMatch) throw new Error(`Medium post ID is missing from ${filePath}`);

  const mediumId = idMatch[1].toLowerCase();
  const title = $('.p-name').first().text().replace(/\s+/g, ' ').trim();
  const publishedAt = $('time.dt-published').first().attr('datetime');
  const sourceUrl = $('a.p-canonical').first().attr('href');
  const authorElement = $('a.p-author').first();
  const author = authorElement.text().replace(/\s+/g, ' ').trim();
  const authorUrl = authorElement.attr('href');
  const subtitle = $('section.p-summary').first().text().replace(/\s+/g, ' ').trim();
  if (!title || !publishedAt || !sourceUrl || !author) {
    throw new Error(`Published Medium metadata is incomplete in ${filePath}`);
  }

  const publicationUrl = newsPublicationUrl(sourceUrl);
  if (!(await isNewsPublication(mediumId, publicationUrl))) {
    return { excluded: true, originalId: `medium:${mediumId}` };
  }

  const content = $('section.e-content').first().clone();
  content.find('script, style, iframe, object, embed, form, input, button, .section-divider').remove();
  const firstHeading = content.find('h1, h2, h3').first();
  if (firstHeading.text().replace(/\s+/g, ' ').trim() === title) firstHeading.remove();

  const imageElements = content.find('img').toArray();
  let coverImage;
  for (let index = 0; index < imageElements.length; index += 1) {
    const element = imageElements[index];
    const image = $(element);
    const source = image.attr('src');
    if (!source?.startsWith('http://') && !source?.startsWith('https://')) continue;
    const cacheDir = path.join(archivesDir, user, 'images', fileName);
    const downloaded = await downloadImage(source, cacheDir, index, image.attr('data-image-id'));
    const publicFileName = `${path.parse(downloaded.fileName).name}.webp`;
    const publicPath = `/images/engineering-notes/medium/${mediumId}/${publicFileName}`;
    const optimized = await optimizePublicImage(downloaded.buffer);
    await writeBufferIfChanged(path.join(publicImagesDir, mediumId, publicFileName), optimized);
    image.attr('src', publicPath);
    image.attr('alt', image.attr('alt') || title);
    image.removeAttr('class data-image-id data-width data-height onerror onload');
    coverImage ??= publicPath;
  }

  if (coverImage) content.find('img').first().closest('figure').remove();
  content.find('*').each((_, element) => {
    const node = $(element);
    for (const attribute of Object.keys(element.attribs ?? {})) {
      if (!['href', 'src', 'alt', 'title', 'data-code-block-lang'].includes(attribute)) {
        node.removeAttr(attribute);
      }
    }
  });

  const body = sanitizeImportedMarkdown(turndown.turndown(content.html() || ''));
  const slug = `${slugify(title)}-${mediumId}`;
  const record = {
    title,
    slug,
    description: markdownExcerpt(subtitle || body, title),
    category: 'article',
    source: 'medium',
    sourceUrl: publicationUrl,
    publishedAt,
    author,
    authorUrl,
    sourceAccount: user,
    coverImage,
    cardSpan: 'full',
    originalId: `medium:${mediumId}`,
    originalFileName: mediumId,
  };
  const changed = await writeOriginalAndLocaleNotes(record, body);
  return { changed, originalId: record.originalId };
}

export async function importMediumExports() {
  await loadPublicationCache();
  const files = await listPostFiles();
  const results = await mapLimit(files, 2, importPost);
  await writeIfChanged(publicationCachePath, `${JSON.stringify(publicationCache, null, 2)}\n`);
  const imported = results.filter((result) => !result.excluded);
  const originalIds = imported.map((result) => result.originalId);
  const removed = await pruneExcludedMediumNotes(new Set(originalIds));
  const stateChanged = await updateSyncState('medium', originalIds);
  const changed = imported.reduce((sum, result) => sum + result.changed, 0) + Number(stateChanged) + removed;
  const excluded = results.length - imported.length;
  console.log(
    `Imported ${imported.length} news.adamant.im posts; ${excluded} personal posts or responses excluded (${changed} files changed)`,
  );
  return { imported: imported.length, excluded, changed };
}

if (isMainModule(import.meta.url)) {
  await importMediumExports();
}
