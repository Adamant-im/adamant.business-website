import { siteConfig } from '../config/site.ts';
import {
  fetchGithubPages,
  getGithubToken,
  isMainModule,
  mapLimit,
  markdownExcerpt,
  sanitizeImportedMarkdown,
  slugify,
  updateSyncState,
  writeOriginalAndLocaleNotes,
} from './lib/content-utils.mjs';

async function importRepositoryReleases(repo, token) {
  const releases = await fetchGithubPages(
    `/repos/${siteConfig.github.org}/${encodeURIComponent(repo)}/releases`,
    token,
  );
  const published = releases.filter((release) => !release.draft && release.published_at);
  const results = [];

  for (const release of published) {
    const title = String(release.name || release.tag_name || `Release ${release.id}`).trim();
    const body = sanitizeImportedMarkdown(release.body || '');
    const slug = `release-${slugify(repo)}-${slugify(release.tag_name || String(release.id))}-${release.id}`;
    const record = {
      title,
      slug,
      description: markdownExcerpt(body, `${repo} ${title}`),
      category: 'release',
      source: 'github',
      sourceUrl: release.html_url,
      publishedAt: release.published_at,
      author: release.author?.login || siteConfig.github.org,
      authorUrl: release.author?.html_url,
      repo,
      tag: release.tag_name,
      prerelease: Boolean(release.prerelease),
      cardSpan: 'half',
      originalId: `github-release:${repo}:${release.id}`,
      originalFileName: `${slugify(repo)}-${release.id}`,
    };
    const changed = await writeOriginalAndLocaleNotes(record, body);
    results.push({ changed, originalId: record.originalId });
  }

  console.log(`Imported ${results.length} releases from ${repo}`);
  return results;
}

export async function syncGithubReleases() {
  const token = getGithubToken();
  const nestedResults = await mapLimit(siteConfig.github.releaseRepos, 4, (repo) =>
    importRepositoryReleases(repo, token),
  );
  const results = nestedResults.flat();
  const stateChanged = await updateSyncState(
    'githubReleases',
    results.map((result) => result.originalId),
  );
  const changed = results.reduce((sum, result) => sum + result.changed, 0) + Number(stateChanged);
  console.log(`Imported ${results.length} GitHub releases (${changed} files changed)`);
  return { imported: results.length, changed };
}

if (isMainModule(import.meta.url)) {
  await syncGithubReleases();
}
