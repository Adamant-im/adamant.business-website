import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import {
  addPublicationExclusion,
  appendKnownPublication,
  isExcludedPublication,
  isKnownPublication,
  readSyncState,
} from '../lib/sync-state.mjs';

test('persists dedup IDs and normalized exclusions idempotently', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'cryptofoundry-sync-state-'));
  const filePath = path.join(directory, 'state.json');
  const publication = {
    category: 'article',
    originalId: 'medium:abcdef123456',
    slug: 'engineering-update-abcdef123456',
    sourceUrl: 'http://www.news.adamant.im/engineering-update-abcdef123456?source=rss',
  };

  try {
    await appendKnownPublication(publication, filePath);
    await appendKnownPublication(publication, filePath);
    await addPublicationExclusion(publication, filePath);
    await addPublicationExclusion(publication, filePath);
    const state = await readSyncState(filePath);
    assert.equal(isKnownPublication(state, publication), false);
    assert.equal(isExcludedPublication(state, publication), true);
    assert.deepEqual(state.sources.medium, []);
    assert.equal(state.exclusions.length, 1);
    assert.equal(
      state.exclusions[0].sourceUrl,
      'https://news.adamant.im/engineering-update-abcdef123456',
    );
    assert.equal(JSON.parse(await readFile(filePath, 'utf8')).version, 2);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
