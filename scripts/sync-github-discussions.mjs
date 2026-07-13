import { siteConfig } from '../config/site.ts';
import {
  fetchGithubPages,
  getGithubToken,
  isMainModule,
  markdownExcerpt,
  sanitizeImportedMarkdown,
  slugify,
  updateSyncState,
  writeOriginalAndLocaleNotes,
} from './lib/content-utils.mjs';

export async function syncGithubDiscussions() {
  const token = getGithubToken();
  const { org, repository } = siteConfig.github.discussions;
  const [members, discussions] = await Promise.all([
    fetchGithubPages(`/orgs/${org}/members`, token),
    fetchGithubPages(`/repos/${org}/${encodeURIComponent(repository)}/discussions`, token),
  ]);
  const memberLogins = new Set(members.map((member) => member.login.toLowerCase()));
  const eligible = discussions.filter((discussion) =>
    memberLogins.has(String(discussion.user?.login || '').toLowerCase()),
  );
  const results = [];

  for (const discussion of eligible) {
    const title = String(discussion.title).trim();
    const body = sanitizeImportedMarkdown(discussion.body || '');
    const slug = `discussion-${discussion.number}-${slugify(title)}-${discussion.id}`;
    const record = {
      title,
      slug,
      description: markdownExcerpt(body, title),
      category: 'discussion',
      source: 'github',
      sourceUrl: discussion.html_url,
      publishedAt: discussion.created_at,
      author: discussion.user.login,
      authorUrl: discussion.user.html_url,
      discussionCategory: discussion.category?.name || 'Discussion',
      cardSpan: 'half',
      originalId: `github-discussion:${discussion.id}`,
      originalFileName: String(discussion.id),
    };
    const changed = await writeOriginalAndLocaleNotes(record, body);
    results.push({ changed, originalId: record.originalId });
  }

  const stateChanged = await updateSyncState(
    'githubDiscussions',
    results.map((result) => result.originalId),
  );
  const changed = results.reduce((sum, result) => sum + result.changed, 0) + Number(stateChanged);
  console.log(
    `Imported ${results.length} GitHub Discussions from ${members.length} current organization members; ` +
      `${discussions.length - eligible.length} discussions excluded (${changed} files changed)`,
  );
  return { imported: results.length, changed, members: members.length };
}

if (isMainModule(import.meta.url)) {
  await syncGithubDiscussions();
}
