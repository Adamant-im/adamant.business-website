import { readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { isMainModule, mapLimit, notesDir, rootDir, writeIfChanged } from './lib/content-utils.mjs';
import { optimizePublicImage } from './lib/optimize-image.mjs';

const discussionsImageDir = path.join(
  rootDir,
  'public/images/engineering-notes/github/discussions',
);

async function listPngFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listPngFiles(fullPath)));
    } else if (entry.name.toLowerCase().endsWith('.png')) {
      files.push(fullPath);
    }
  }
  return files;
}

async function convertFile(pngPath) {
  const webpPath = pngPath.replace(/\.png$/i, '.webp');
  const input = await readFile(pngPath);
  const output = await optimizePublicImage(input);
  await writeFile(webpPath, output);
  await rm(pngPath);
  return { pngPath, webpPath, before: input.length, after: output.length };
}

async function updateMarkdownReferences() {
  const enDir = path.join(notesDir, 'en');
  const files = await readdir(enDir);
  let changed = 0;
  for (const file of files.filter((name) => name.endsWith('.md'))) {
    const filePath = path.join(enDir, file);
    const content = await readFile(filePath, 'utf8');
    const updated = content.replace(
      /(\/images\/engineering-notes\/github\/discussions\/[^)\s"]+)\.png/g,
      '$1.webp',
    );
    if (updated !== content) {
      changed += Number(await writeIfChanged(filePath, updated));
    }
  }
  return changed;
}

export async function convertDiscussionImagesWebp() {
  const pngFiles = await listPngFiles(discussionsImageDir);
  console.log(`Converting ${pngFiles.length} discussion PNG files to WebP`);

  const results = await mapLimit(pngFiles, 4, convertFile);
  const before = results.reduce((sum, item) => sum + item.before, 0);
  const after = results.reduce((sum, item) => sum + item.after, 0);
  const markdownChanged = await updateMarkdownReferences();

  console.log(
    `Converted ${results.length} images: ${(before / 1024 / 1024).toFixed(1)} MB → ${(after / 1024 / 1024).toFixed(1)} MB (${Math.round((1 - after / before) * 100)}% smaller)`,
  );
  console.log(`Updated ${markdownChanged} markdown files`);
  return { converted: results.length, markdownChanged };
}

if (isMainModule(import.meta.url)) {
  await convertDiscussionImagesWebp();
}
