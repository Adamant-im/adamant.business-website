import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

import { siteConfig } from '../../config/site.ts';
import {
  mapLimit,
  notesDir,
  originalsDir,
  serializeMarkdown,
  writeIfChanged,
} from './content-utils.mjs';
import { localizePublicationImages } from './publication-images.mjs';
import { normalizePublicationUrl, publicationMatches } from './publication-url.mjs';
import { parseMarkdownFile, prepareEnglishNote } from './prepare-english.mjs';
import { appendKnownPublication } from './sync-state.mjs';
import { translateNoteToLocale } from './translate-content.mjs';

const CATEGORY_DIRS = {
  article: 'articles',
  release: 'releases',
  discussion: 'discussions',
};

function frontmatterFor(publication) {
  const frontmatter = { ...publication };
  delete frontmatter.body;
  delete frontmatter.originalFileName;
  return frontmatter;
}

function noteFileName(publication) {
  return `${new Date(publication.publishedAt).toISOString().slice(0, 10)}_${publication.slug}.md`;
}

export async function listEnglishPublications(
  directory = path.join(notesDir, siteConfig.defaultLocale),
) {
  const files = (await readdir(directory)).filter((file) => file.endsWith('.md')).sort();
  return Promise.all(
    files.map(async (file) => {
      const filePath = path.join(directory, file);
      const parsed = parseMarkdownFile(await readFile(filePath, 'utf8'));
      return { file, filePath, ...parsed };
    }),
  );
}

export async function findExistingPublication(publication) {
  const entries = await listEnglishPublications();
  return entries.find((entry) =>
    publicationMatches(
      {
        originalId: entry.frontmatter.originalId,
        slug: entry.frontmatter.slug,
        sourceUrl: entry.frontmatter.sourceUrl,
      },
      publication,
    ),
  );
}

export async function saveOriginalPublication(publication) {
  const categoryDir = CATEGORY_DIRS[publication.category];
  const originalName = `${new Date(publication.publishedAt).toISOString().slice(0, 10)}_${publication.originalFileName ?? publication.slug}.md`;
  const content = serializeMarkdown(
    { ...frontmatterFor(publication), locale: 'en', placeholder: false },
    publication.body,
  );
  return writeIfChanged(path.join(originalsDir, categoryDir, originalName), content);
}

export async function generatePublication(publication, { saveOriginalSource = true } = {}) {
  if (!process.env.OPENROUTER_API_KEY) throw new Error('OPENROUTER_API_KEY is required');

  const existing = await findExistingPublication(publication);
  const stablePublication = existing
    ? {
        ...publication,
        slug: existing.frontmatter.slug,
        sourceUrl: normalizePublicationUrl(publication.sourceUrl),
      }
    : { ...publication, sourceUrl: normalizePublicationUrl(publication.sourceUrl) };

  console.log(
    `${existing ? 'Overwriting' : 'Generating'} ${stablePublication.category} ${stablePublication.originalId}`,
  );
  if (saveOriginalSource) await saveOriginalPublication(stablePublication);
  const { publication: localized, changedAssets } = await localizePublicationImages(stablePublication);

  const preparedEnglish = await prepareEnglishNote(
    frontmatterFor(localized),
    localized.body,
    { useLlm: true },
  );
  const english = parseMarkdownFile(preparedEnglish);
  const targetFile = existing?.file ?? noteFileName(localized);
  const targetLocales = siteConfig.locales.filter(
    (locale) => locale.id !== siteConfig.defaultLocale,
  );
  const translations = await mapLimit(
    targetLocales,
    Math.min(5, siteConfig.sync.batchSize),
    async (locale) => ({
      locale: locale.id,
      content: await translateNoteToLocale(english.frontmatter, english.body, locale.id),
    }),
  );

  let contentChanged = changedAssets;
  contentChanged += Number(
    await writeIfChanged(
      path.join(notesDir, siteConfig.defaultLocale, targetFile),
      preparedEnglish,
    ),
  );
  for (const translation of translations) {
    contentChanged += Number(
      await writeIfChanged(
        path.join(notesDir, translation.locale, targetFile),
        translation.content,
      ),
    );
  }
  const stateChanged = Number(await appendKnownPublication(localized));
  const changed = contentChanged + stateChanged;

  console.log(
    `Generated ${targetFile} in ${siteConfig.locales.length} locales (${changed} tracked files changed)`,
  );
  return {
    changed,
    contentChanged,
    fileName: targetFile,
    publication: localized,
    stateChanged,
    title: english.frontmatter.title,
  };
}
