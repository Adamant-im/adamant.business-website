import assert from 'node:assert/strict';
import test from 'node:test';

import { parseRemoveOptions, parseSyncOptions } from '../lib/cli-options.mjs';

test('parses sync URL and control flags', () => {
  assert.deepEqual(parseSyncOptions(['--url', 'example.test/post', '--force', '--no-pr']), {
    force: true,
    noMerge: false,
    noPr: true,
    url: 'example.test/post',
  });
});

test('requires URL for force mode', () => {
  assert.throws(() => parseSyncOptions(['--force']), /requires --url/);
});

test('parses both supported slug spellings', () => {
  assert.equal(parseRemoveOptions(['--slug', 'note-slug']).slug, 'note-slug');
  assert.equal(parseRemoveOptions(['-slug=note-slug']).slug, 'note-slug');
});

test('requires exactly one removal selector', () => {
  assert.throws(() => parseRemoveOptions([]), /exactly one/);
  assert.throws(
    () => parseRemoveOptions(['--url=x', '--slug=y']),
    /exactly one/,
  );
});
