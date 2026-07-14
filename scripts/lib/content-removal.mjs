import { access, readdir, readFile, rm } from 'node:fs/promises';
import path from 'node:path';

import { siteConfig } from '../../config/site.ts';
import { notesDir, originalsDir } from './content-utils.mjs';
import { assetDirectoryForPublication } from './publication-images.mjs';
import { normalizePublicationUrl, publicationMatches } from './publication-url.mjs';
import { listEnglishPublications } from './publication-pipeline.mjs';
import { parseMarkdownFile } from './prepare-english.mjs';
import { addPublicationExclusion } from './sync-state.mjs';

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function removeOriginals(publication, originalsRoot) {
  let removed = 0;
  for (const directoryName of ['articles', 'releases', 'discussions']) {
    const directory = path.join(originalsRoot, directoryName);
    let files = [];
    try {
      files = await readdir(directory);
    } catch (error) {
      if (error.code === 'ENOENT') continue;
      throw error;
    }
    for (const file of files.filter((name) => name.endsWith('.md'))) {
      const filePath = path.join(directory, file);
      const { frontmatter } = parseMarkdownFile(await readFile(filePath, 'utf8'));
      if (!publicationMatches(frontmatter, publication)) continue;
      await rm(filePath, { force: true });
      removed += 1;
    }
  }
  return removed;
}

export async function removePublication(
  { slug, url },
  {
    notesRoot = notesDir,
    originalsRoot = originalsDir,
    stateFile,
    assetDirectory = assetDirectoryForPublication,
    logger = console,
  } = {},
) {
  const selector = {
    ...(slug ? { slug } : {}),
    ...(url ? { sourceUrl: normalizePublicationUrl(url) } : {}),
  };
  const entries = await listEnglishPublications(path.join(notesRoot, siteConfig.defaultLocale));
  const matches = entries.filter((entry) => publicationMatches(entry.frontmatter, selector));
  let contentChanged = 0;
  let localOriginalsChanged = 0;

  for (const entry of matches) {
    const publication = entry.frontmatter;
    for (const locale of siteConfig.locales) {
      const filePath = path.join(notesRoot, locale.id, entry.file);
      if (await exists(filePath)) {
        await rm(filePath, { force: true });
        contentChanged += 1;
      }
    }
    const assetDir = assetDirectory(publication);
    if (await exists(assetDir)) {
      await rm(assetDir, { recursive: true, force: true });
      contentChanged += 1;
    }
    localOriginalsChanged += await removeOriginals(publication, originalsRoot);
  }

  const exclusion = matches[0]?.frontmatter ?? selector;
  const stateChanged = Number(await addPublicationExclusion(exclusion, stateFile));
  const changed = contentChanged + stateChanged;

  if (matches.length > 0) {
    logger.log(
      `Removed ${matches.length} publication record(s) from every locale; ${stateChanged ? 'added it to exclusions' : 'it was already excluded'}`,
    );
  } else if (stateChanged) {
    logger.log('Publication not found; adding it to exclusions');
  } else {
    logger.log('Publication not found; it is already excluded');
  }

  return {
    changed,
    contentChanged,
    exclusion,
    localOriginalsChanged,
    matches,
    selector,
    stateChanged,
  };
}
