import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

import {
  isMainModule,
  mapLimit,
  notesDir,
  originalsDir,
  rootDir,
  writeIfChanged,
} from './lib/content-utils.mjs';
import { parseMarkdownFile, prepareEnglishNote } from './lib/prepare-english.mjs';

const CATEGORY_DIRS = {
  article: 'articles',
  release: 'releases',
  discussion: 'discussions',
};

async function listOriginalFiles() {
  const items = [];
  for (const [category, dirName] of Object.entries(CATEGORY_DIRS)) {
    const dir = path.join(originalsDir, dirName);
    const files = await readdir(dir);
    for (const file of files.filter((name) => name.endsWith('.md'))) {
      items.push({ category, file, dir });
    }
  }
  return items.sort((a, b) => a.file.localeCompare(b.file));
}

function enNotePath(frontmatter) {
  const date = new Date(frontmatter.publishedAt).toISOString().slice(0, 10);
  return path.join(notesDir, 'en', `${date}_${frontmatter.slug}.md`);
}

async function isAlreadyEdited(originalPath, enPath) {
  try {
    const [original, edited] = await Promise.all([
      readFile(originalPath, 'utf8'),
      readFile(enPath, 'utf8'),
    ]);
    return original !== edited;
  } catch {
    return false;
  }
}

export async function prepareEnglishContent({
  useLlm = Boolean(process.env.OPENROUTER_API_KEY),
  force = false,
  limit = Infinity,
  slugFilter = null,
} = {}) {
  const files = await listOriginalFiles();
  let processed = 0;
  let changed = 0;
  let skipped = 0;
  let errors = 0;

  const targets = [];
  for (const item of files) {
    const originalPath = path.join(item.dir, item.file);
    const content = await readFile(originalPath, 'utf8');
    const { frontmatter } = parseMarkdownFile(content);
    if (slugFilter && frontmatter.slug !== slugFilter) continue;
    const enPath = enNotePath(frontmatter);
    if (!force && (await isAlreadyEdited(originalPath, enPath))) {
      skipped += 1;
      continue;
    }
    targets.push({ originalPath, enPath, item });
    if (targets.length >= limit) break;
  }

  console.log(
    `Preparing ${targets.length} English notes (llm=${useLlm}, skipped=${skipped} already edited)`,
  );

  const results = await mapLimit(targets, useLlm ? 2 : 8, async ({ originalPath, enPath, item }) => {
    try {
      const content = await readFile(originalPath, 'utf8');
      const { frontmatter, body } = parseMarkdownFile(content);
      const prepared = await prepareEnglishNote(frontmatter, body, { useLlm });
      const didChange = await writeIfChanged(enPath, prepared);
      return { slug: frontmatter.slug, category: item.category, changed: didChange };
    } catch (error) {
      console.error(`Failed ${item.file}: ${error.message}`);
      return { slug: item.file, error: error.message };
    }
  });

  for (const result of results) {
    if (result.error) {
      errors += 1;
      continue;
    }
    processed += 1;
    if (result.changed) changed += 1;
  }

  console.log(`Done: processed=${processed}, changed=${changed}, skipped=${skipped}, errors=${errors}`);
  return { processed, changed, skipped, errors };
}

if (isMainModule(import.meta.url)) {
  const args = new Set(process.argv.slice(2));
  const slugArg = process.argv.find((arg) => arg.startsWith('--slug='));
  await prepareEnglishContent({
    useLlm: args.has('--llm') || Boolean(process.env.OPENROUTER_API_KEY),
    force: args.has('--force'),
    limit: args.has('--all') ? Infinity : Number(process.env.PREPARE_LIMIT ?? Infinity),
    slugFilter: slugArg?.split('=')[1] ?? null,
  });
}
