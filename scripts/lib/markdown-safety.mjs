const CODE_PLACEHOLDER_RE = /@@CODEBLOCK(\d+)@@/g;

export function normalizeMarkdownFences(body) {
  return String(body)
    .replace(/^`{2,3}n([^\n]+)$/gm, '```text\n$1')
    .replace(/^`{2,3}n[ \t]*$/gm, '```')
    .replace(/[ \t]+$/gm, '');
}

export function codePlaceholderIssue(body, blockCount) {
  const counts = new Map();
  const unknown = [];

  for (const match of String(body).matchAll(CODE_PLACEHOLDER_RE)) {
    const index = Number.parseInt(match[1], 10);
    counts.set(index, (counts.get(index) ?? 0) + 1);
    if (index >= blockCount) unknown.push(index);
  }

  const missing = [];
  const duplicated = [];
  for (let index = 0; index < blockCount; index += 1) {
    const count = counts.get(index) ?? 0;
    if (count === 0) missing.push(index);
    if (count > 1) duplicated.push(index);
  }

  if (missing.length === 0 && duplicated.length === 0 && unknown.length === 0) return null;

  const details = [];
  if (missing.length > 0) details.push(`missing ${missing.join(', ')}`);
  if (duplicated.length > 0) details.push(`duplicated ${duplicated.join(', ')}`);
  if (unknown.length > 0) details.push(`unknown ${[...new Set(unknown)].join(', ')}`);
  return `Code placeholder mismatch: ${details.join('; ')}`;
}

export function hasUnresolvedCodePlaceholder(body) {
  return /@@\s*CODEBLOCK[^@\n]*@@/i.test(String(body));
}
