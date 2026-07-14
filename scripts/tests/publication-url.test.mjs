import assert from 'node:assert/strict';
import test from 'node:test';

import {
  classifyPublicationUrl,
  normalizePublicationUrl,
  publicationMatches,
} from '../lib/publication-url.mjs';

const options = {
  githubOrg: 'Adamant-im',
  releaseRepos: ['adamant', 'adamant-im'],
};

test('normalizes protocol, www, query, hash, and trailing slash', () => {
  assert.equal(
    normalizePublicationUrl(
      'http://www.github.com/Adamant-im/adamant/releases/tag/v0.10.0/?utm_source=test#notes',
    ),
    'https://github.com/Adamant-im/adamant/releases/tag/v0.10.0',
  );
});

test('accepts a URL without a scheme', () => {
  assert.equal(
    normalizePublicationUrl('news.adamant.im/example-42fcfb71beb3?source=rss'),
    'https://news.adamant.im/example-42fcfb71beb3',
  );
});

test('canonicalizes repository Discussion URLs to organization URLs', () => {
  assert.equal(
    normalizePublicationUrl('https://github.com/Adamant-im/.github/discussions/64?sort=top'),
    'https://github.com/orgs/Adamant-im/discussions/64',
  );
});

test('classifies configured publication URLs', () => {
  assert.deepEqual(
    classifyPublicationUrl('www.github.com/orgs/Adamant-im/discussions/64?comment=1', options),
    {
      type: 'discussion',
      source: 'github',
      normalizedUrl: 'https://github.com/orgs/Adamant-im/discussions/64',
      org: 'Adamant-im',
      number: 64,
    },
  );
  assert.equal(
    classifyPublicationUrl('medium.com/p/42fcfb71beb3?source=post_page', options).mediumId,
    '42fcfb71beb3',
  );
  assert.equal(
    classifyPublicationUrl('github.com/Adamant-im/adamant/releases/tag/v0.10.0', options).repo,
    'adamant',
  );
});

test('rejects unconfigured repositories and unrelated hosts', () => {
  assert.throws(
    () => classifyPublicationUrl('github.com/Adamant-im/private/releases/tag/v1', options),
    /not configured/,
  );
  assert.throws(() => classifyPublicationUrl('example.com/post', options), /Unsupported/);
});

test('matches Medium aliases through the stable publication ID', () => {
  assert.equal(
    publicationMatches(
      { sourceUrl: 'https://medium.com/@adamant.im/example-42fcfb71beb3' },
      { sourceUrl: 'https://news.adamant.im/example-42fcfb71beb3?source=rss' },
    ),
    true,
  );
});
