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
    await writeFile(
      stateFile,
      `${JSON.stringify({ version: 2, sources: { medium: [frontmatter.originalId] }, exclusions: [] }, null, 2)}\n`,
    );

    const result = await removePublication(
      { slug: frontmatter.slug },
      {
        notesRoot,
        originalsRoot,
        stateFile,
        assetDirectory: () => assetDir,
        logger: { log() {} },
      },
    );
    assert.equal(result.matches.length, 1);
    assert.equal(result.contentChanged, siteConfig.locales.length + 1);
    assert.equal(result.removedSourceIds, 1);
    for (const locale of siteConfig.locales) {
      assert.equal(await isMissing(path.join(notesRoot, locale.id, fileName)), true);
    }
    assert.equal(await isMissing(assetDir), true);
    assert.equal(await isMissing(path.join(originalsRoot, 'articles', fileName)), true);
    const state = JSON.parse(await readFile(stateFile, 'utf8'));
    assert.deepEqual(state.sources.medium, []);
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

test('reports a missing publication separately from an existing exclusion', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'cryptofoundry-exclude-'));
  const notesRoot = path.join(directory, 'notes');
  const originalsRoot = path.join(directory, 'originals');
  const stateFile = path.join(directory, 'state.json');
  const messages = [];
  const options = {
    notesRoot,
    originalsRoot,
    stateFile,
    logger: { log(message) { messages.push(message); } },
  };
  const url = 'https://news.adamant.im/example-abcdef123456';

  try {
    await mkdir(path.join(notesRoot, siteConfig.defaultLocale), { recursive: true });
    await writeFile(
      stateFile,
      `${JSON.stringify({ version: 2, sources: { medium: ['medium:abcdef123456'] }, exclusions: [] }, null, 2)}\n`,
    );

    const first = await removePublication({ url }, options);
    assert.equal(first.matches.length, 0);
    assert.equal(first.contentChanged, 0);
    assert.equal(first.stateChanged, 1);
    assert.equal(first.removedSourceIds, 1);
    assert.equal(first.changed, 1);
    assert.equal(messages.at(-1), 'Publication not found; adding it to exclusions');

    const second = await removePublication({ url }, options);
    assert.equal(second.matches.length, 0);
    assert.equal(second.stateChanged, 0);
    assert.equal(second.removedSourceIds, 0);
    assert.equal(second.changed, 0);
    assert.equal(messages.at(-1), 'Publication not found; it is already excluded');
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
