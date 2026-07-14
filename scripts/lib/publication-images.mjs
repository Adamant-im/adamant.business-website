import { createHash } from 'node:crypto';
import path from 'node:path';

import { optimizePublicImage } from './optimize-image.mjs';
import { rootDir, slugify, writeBufferIfChanged } from './content-utils.mjs';

const MAX_IMAGE_BYTES = 15 * 1024 * 1024;

function isTrustedImageUrl(value, source) {
  const url = new URL(value);
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return false;
  const host = url.hostname.toLowerCase().replace(/^www\./, '');
  if (source === 'medium') {
    return host === 'medium.com' || host.endsWith('.medium.com');
  }
  return host === 'github.com' || host.endsWith('.githubusercontent.com');
}

function imageStorage(publication) {
  if (publication.category === 'article') {
    const id = publication.originalId.match(/^medium:([a-f\d]+)$/i)?.[1];
    if (!id) throw new Error(`Invalid Medium originalId: ${publication.originalId}`);
    return {
      diskDir: path.join(rootDir, 'public/images/engineering-notes/medium', id),
      publicDir: `/images/engineering-notes/medium/${id}`,
    };
  }

  if (publication.category === 'discussion') {
    const id = publication.originalId.match(/^github-discussion:(\d+)$/)?.[1];
    if (!id) throw new Error(`Invalid Discussion originalId: ${publication.originalId}`);
    return {
      diskDir: path.join(rootDir, 'public/images/engineering-notes/github/discussions', id),
      publicDir: `/images/engineering-notes/github/discussions/${id}`,
    };
  }

  const match = publication.originalId.match(/^github-release:([^:]+):(\d+)$/);
  if (!match) throw new Error(`Invalid Release originalId: ${publication.originalId}`);
  const folder = `${slugify(match[1])}-${match[2]}`;
  return {
    diskDir: path.join(rootDir, 'public/images/engineering-notes/github/releases', folder),
    publicDir: `/images/engineering-notes/github/releases/${folder}`,
  };
}

export function assetDirectoryForPublication(publication) {
  return imageStorage(publication).diskDir;
}

function collectImages(markdown) {
  const images = [];
  let protectedBody = String(markdown ?? '').replace(
    /!\[([^\]]*)\]\((https?:\/\/[^\s)]+)(?:\s+"[^"]*")?\)/gi,
    (match, alt, url) => {
      const token = `@@REMOTEIMAGE${images.length}@@`;
      images.push({ token, match, alt: alt || '', url: url.replaceAll('&amp;', '&'), kind: 'markdown' });
      return token;
    },
  );

  protectedBody = protectedBody.replace(/<img\b[^>]*\bsrc=["'](https?:\/\/[^"']+)["'][^>]*>/gi, (match, url) => {
    const alt = match.match(/\balt=["']([^"']*)["']/i)?.[1] ?? '';
    const token = `@@REMOTEIMAGE${images.length}@@`;
    images.push({ token, match, alt, url: url.replaceAll('&amp;', '&'), kind: 'html' });
    return token;
  });

  return { images, protectedBody };
}

async function downloadImage(image, publication, index) {
  if (!isTrustedImageUrl(image.url, publication.source)) {
    console.warn(`Leaving non-${publication.source} image remote: ${new URL(image.url).hostname}`);
    return { publicPath: null, changed: false };
  }

  const response = await fetch(image.url, {
    headers: {
      Accept: 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8',
      'User-Agent': 'cryptofoundry-engineering-notes-sync',
    },
    signal: AbortSignal.timeout(60_000),
  });
  if (!response.ok) throw new Error(`Image download returned HTTP ${response.status}: ${image.url}`);

  const declaredSize = Number(response.headers.get('content-length'));
  if (declaredSize > MAX_IMAGE_BYTES) throw new Error(`Image exceeds 15 MB: ${image.url}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.length > MAX_IMAGE_BYTES) throw new Error(`Image exceeds 15 MB: ${image.url}`);

  const optimized = await optimizePublicImage(buffer);
  const hash = createHash('sha256').update(image.url).digest('hex').slice(0, 10);
  const fileName = `${String(index + 1).padStart(3, '0')}-${hash}.webp`;
  const storage = imageStorage(publication);
  const publicPath = `${storage.publicDir}/${fileName}`;
  const changed = await writeBufferIfChanged(path.join(storage.diskDir, fileName), optimized);
  return { publicPath, changed };
}

export async function localizePublicationImages(publication) {
  const { images, protectedBody } = collectImages(publication.body);
  if (images.length === 0) return { publication: { ...publication }, changedAssets: 0 };

  let body = protectedBody;
  let coverImage;
  let coverMarkdown;
  let changedAssets = 0;
  for (let index = 0; index < images.length; index += 1) {
    const image = images[index];
    const downloaded = await downloadImage(image, publication, index);
    const { publicPath } = downloaded;
    changedAssets += Number(downloaded.changed);
    const replacement = publicPath
      ? `![${image.alt || publication.title}](${publicPath})`
      : image.match;
    body = body.replace(image.token, replacement);
    if (!coverImage && publicPath) {
      coverImage = publicPath;
      coverMarkdown = replacement;
    }
  }

  if (publication.category === 'article' && coverMarkdown) {
    body = body.replace(coverMarkdown, '').replace(/\n{3,}/g, '\n\n').trim();
  }

  return {
    publication: {
      ...publication,
      body,
      ...(publication.category === 'article' && coverImage ? { coverImage } : {}),
    },
    changedAssets,
  };
}
