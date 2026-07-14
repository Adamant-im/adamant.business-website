import { parseSyncOptions } from './lib/cli-options.mjs';
import { isMainModule } from './lib/content-utils.mjs';
import { discoverPublications, fetchPublicationByUrl } from './lib/content-sources.mjs';
import {
  additionBranchName,
  additionPrBody,
  additionPrTitle,
  assertPublishingReady,
  publishChange,
  validateGeneratedContent,
} from './lib/github-publishing.mjs';
import { generatePublication, listEnglishPublications } from './lib/publication-pipeline.mjs';
import { publicationMatches } from './lib/publication-url.mjs';
import {
  isExcludedPublication,
  isKnownPublication,
  readSyncState,
} from './lib/sync-state.mjs';

export async function syncContent(options = parseSyncOptions(process.argv.slice(2))) {
  if (!process.env.OPENROUTER_API_KEY) throw new Error('OPENROUTER_API_KEY is required');
  const state = await readSyncState();
  const explicit = Boolean(options.url);
  const discovered = explicit
    ? [await fetchPublicationByUrl(options.url)]
    : await discoverPublications();
  const existingNotes = explicit ? [] : await listEnglishPublications();

  const candidates = [];
  for (const publication of discovered) {
    if (isExcludedPublication(state, publication) && !(explicit && options.force)) {
      console.log(`Skipped excluded ${publication.originalId}: ${publication.sourceUrl}`);
      continue;
    }
    if (!explicit && isKnownPublication(state, publication)) {
      console.log(`Skipped existing ${publication.originalId}`);
      continue;
    }
    if (
      !explicit &&
      existingNotes.some((entry) => publicationMatches(entry.frontmatter, publication))
    ) {
      console.log(`Skipped existing note ${publication.originalId}`);
      continue;
    }
    candidates.push(publication);
  }

  if (candidates.length === 0) {
    console.log(
      `No publications to generate (${discovered.length} checked across ${explicit ? 'the requested URL' : 'Medium, GitHub Releases, and GitHub Discussions'})`,
    );
    return { checked: discovered.length, generated: 0, merged: 0, pullRequests: [] };
  }

  console.log(`Preparing ${candidates.length} publication(s)`);
  const saveOriginalSource = process.env.GITHUB_ACTIONS !== 'true';
  const results = [];

  if (options.noPr) {
    for (const publication of candidates) {
      results.push(await generatePublication(publication, { saveOriginalSource }));
    }
    const changed = results.reduce((total, result) => total + result.changed, 0);
    if (changed > 0) {
      await validateGeneratedContent({
        contentChanged: results.some((result) => result.contentChanged > 0),
      });
    } else {
      console.log('Generated content is unchanged; skipping validation and build');
    }
  } else {
    await assertPublishingReady();
    for (const publication of candidates) {
      results.push(
        await publishChange({
          branchName: additionBranchName(publication),
          commitMessage: `Add ${publication.category}: ${publication.title}`.slice(0, 200),
          noMerge: options.noMerge,
          prBody: additionPrBody(publication),
          prTitle: additionPrTitle(publication),
          generate: () => generatePublication(publication, { saveOriginalSource }),
        }),
      );
    }
  }

  const pullRequests = results.map((result) => result.prUrl).filter(Boolean);
  const merged = results.filter((result) => result.merged).length;
  console.log(
    `Content sync complete: checked=${discovered.length}, generated=${results.length}, PRs=${pullRequests.length}, merged=${merged}`,
  );
  return { checked: discovered.length, generated: results.length, merged, pullRequests };
}

if (isMainModule(import.meta.url)) {
  await syncContent();
}
