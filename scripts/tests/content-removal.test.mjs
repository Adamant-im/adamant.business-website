import assert from 'node:assert/strict';
import { access, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { siteConfig } from '../../config/site.ts';
import { serializeMarkdown } from '../lib/content-utils.mjs';
import { removePublication } from '../lib/content-removal.mjs';

async function isMissing(filePath) {
  try {
    await access(filePath);
    return false;
  } catch {
    return true;
  }
}

test('removes every locale, owned assets, originals, and records an exclusion', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'cryptofoundry-remove-'));
  const notesRoot = path.join(directory, 'notes');
  const originalsRoot = path.join(directory, 'originals');
  const stateFile = path.join(directory, 'state.json');
  const assetDir = path.join(directory, 'assets');
  const fileName = '2026-07-14_engineering-update-abcdef123456.md';
  const frontmatter = {
    title: 'Engineering update',
    slug: 'engineering-update-abcdef123456',
    description: 'Update',
    category: 'article',
    source: 'medium',
    sourceUrl: 'https://news.adamant.im/engineering-update-abcdef123456',
    publishedAt: '2026-07-14T10:00:00.000Z',
    author: 'Alice',
    cardSpan: 'full',
    originalId: 'medium:abcdef123456',
    locale: 'en',
    placeholder: false,
  };

  try {
    for (const locale of siteConfig.locales) {
      const localeDir = path.join(notesRoot, locale.id);
      await mkdir(localeDir, { recursive: true });
      await writeFile(
        path.join(localeDir, fileName),
        serializeMarkdown({ ...frontmatter, locale: locale.id }, 'Body'),
      );
    }
    await mkdir(path.join(originalsRoot, 'articles'), { recursive: true });
    await writeFile(
      path.join(originalsRoot, 'articles', fileName),
      serializeMarkdown(frontmatter, 'Original'),
    );
    await mkdir(assetDir, { recursive: true });
    await writeFile(path.join(assetDir, 'cover.webp'), 'fixture');

    const result = await removePublication(
      { slug: frontmatter.slug },
      { notesRoot, originalsRoot, stateFile, assetDirectory: () => assetDir },
    );
    assert.equal(result.matches.length, 1);
    for (const locale of siteConfig.locales) {
      assert.equal(await isMissing(path.join(notesRoot, locale.id, fileName)), true);
    }
    assert.equal(await isMissing(assetDir), true);
    assert.equal(await isMissing(path.join(originalsRoot, 'articles', fileName)), true);
    const state = JSON.parse(await readFile(stateFile, 'utf8'));
    assert.deepEqual(state.exclusions, [
      {
        originalId: 'medium:abcdef123456',
        slug: 'engineering-update-abcdef123456',
        sourceUrl: 'https://news.adamant.im/engineering-update-abcdef123456',
      },
    ]);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
