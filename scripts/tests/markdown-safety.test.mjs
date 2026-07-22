import assert from 'node:assert/strict';
import test from 'node:test';

import {
  codePlaceholderIssue,
  hasUnresolvedCodePlaceholder,
  normalizeMarkdownFences,
} from '../lib/markdown-safety.mjs';

test('normalizes malformed literal newline code fences from model output', () => {
  const body = 'Before  \n\n``nnpm run adm-pool status\n``n\n\nAfter';
  assert.equal(
    normalizeMarkdownFences(body),
    'Before\n\n```text\nnpm run adm-pool status\n```\n\nAfter',
  );
});

test('requires each protected code block placeholder exactly once', () => {
  assert.equal(codePlaceholderIssue('@@CODEBLOCK0@@\n@@CODEBLOCK1@@', 2), null);
  assert.match(codePlaceholderIssue('@@CODEBLOCK0@@', 0), /unknown 0/);
  assert.match(codePlaceholderIssue('@@CODEBLOCK1@@', 2), /missing 0/);
  assert.match(codePlaceholderIssue('@@CODEBLOCK0@@\n@@CODEBLOCK2@@', 2), /unknown 2/);
  assert.match(codePlaceholderIssue('@@CODEBLOCK0@@\n@@CODEBLOCK0@@', 1), /duplicated 0/);
});

test('detects unresolved numeric and malformed placeholders', () => {
  assert.equal(hasUnresolvedCodePlaceholder('Clean body'), false);
  assert.equal(hasUnresolvedCodePlaceholder('@@CODEBLOCK3@@'), true);
  assert.equal(hasUnresolvedCodePlaceholder('@@CODEBLOCKn@@'), true);
  assert.equal(hasUnresolvedCodePlaceholder('@@CODEBLOCKN@@'), true);
  assert.equal(hasUnresolvedCodePlaceholder('@@CODEBLOCK_0@@'), true);
  assert.equal(hasUnresolvedCodePlaceholder('@@codeblock0@@'), true);
});
