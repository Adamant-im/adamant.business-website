import { readFile } from 'node:fs/promises';

import { syncStatePath, writeIfChanged } from './content-utils.mjs';
import { normalizePublicationUrl, publicationMatches } from './publication-url.mjs';

function normalizeState(state) {
  return {
    ...state,
    version: 2,
    sources: state?.sources && typeof state.sources === 'object' ? state.sources : {},
    exclusions: Array.isArray(state?.exclusions) ? state.exclusions : [],
  };
}

export async function readSyncState(filePath = syncStatePath) {
  try {
    return normalizeState(JSON.parse(await readFile(filePath, 'utf8')));
  } catch (error) {
    if (error.code === 'ENOENT') return normalizeState({});
    throw error;
  }
}

export async function writeSyncState(state, filePath = syncStatePath) {
  const normalized = normalizeState(state);
  for (const key of Object.keys(normalized.sources)) {
    normalized.sources[key] = [...new Set(normalized.sources[key])].sort();
  }
  normalized.exclusions = [...normalized.exclusions].sort((left, right) =>
    JSON.stringify(left).localeCompare(JSON.stringify(right)),
  );
  return writeIfChanged(filePath, `${JSON.stringify(normalized, null, 2)}\n`);
}

export function sourceStateKey(publication) {
  if (publication.category === 'article') return 'medium';
  if (publication.category === 'release') return 'githubReleases';
  if (publication.category === 'discussion') return 'githubDiscussions';
  throw new Error(`Unsupported publication category: ${publication.category}`);
}

export function isKnownPublication(state, publication) {
  if (!publication.originalId) return false;
  return Object.values(state.sources).some((ids) => ids.includes(publication.originalId));
}

export function isExcludedPublication(state, publication) {
  return state.exclusions.some((exclusion) => publicationMatches(exclusion, publication));
}

export async function appendKnownPublication(publication, filePath = syncStatePath) {
  const state = await readSyncState(filePath);
  const key = sourceStateKey(publication);
  state.sources[key] ??= [];
  state.sources[key].push(publication.originalId);
  return writeSyncState(state, filePath);
}

function exclusionEntry(publication) {
  const entry = {
    ...(publication.originalId ? { originalId: publication.originalId } : {}),
    ...(publication.slug ? { slug: publication.slug } : {}),
    ...(publication.sourceUrl
      ? { sourceUrl: normalizePublicationUrl(publication.sourceUrl) }
      : {}),
  };
  if (!entry.originalId && !entry.slug && !entry.sourceUrl) {
    throw new Error('An exclusion requires a source URL, original ID, or slug');
  }
  return entry;
}

export async function excludePublication(publication, filePath = syncStatePath) {
  const state = await readSyncState(filePath);
  const entry = exclusionEntry(publication);
  let removedSourceIds = 0;

  if (entry.originalId) {
    for (const [key, ids] of Object.entries(state.sources)) {
      const filtered = ids.filter((id) => id !== entry.originalId);
      removedSourceIds += ids.length - filtered.length;
      state.sources[key] = filtered;
    }
  }

  const exclusionAdded = !state.exclusions.some((exclusion) =>
    publicationMatches(exclusion, entry),
  );
  if (exclusionAdded) {
    state.exclusions.push(entry);
  }

  const changed = await writeSyncState(state, filePath);
  return { changed, exclusionAdded, removedSourceIds };
}

export async function addPublicationExclusion(publication, filePath = syncStatePath) {
  return (await excludePublication(publication, filePath)).changed;
}
