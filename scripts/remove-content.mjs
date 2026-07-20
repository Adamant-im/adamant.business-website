import { siteConfig } from '../config/site.ts';
import { parseRemoveOptions } from './lib/cli-options.mjs';
import { isMainModule } from './lib/content-utils.mjs';
import { removePublication } from './lib/content-removal.mjs';
import {
  assertPublishingReady,
  publishChange,
  removalBranchName,
  removalPrBody,
  validateGeneratedContent,
} from './lib/github-publishing.mjs';
import { classifyPublicationUrl } from './lib/publication-url.mjs';

export async function removeContent(options = parseRemoveOptions(process.argv.slice(2))) {
  const classified = options.url
    ? classifyPublicationUrl(options.url, {
        discussionRepository: siteConfig.github.discussions.repository,
        githubOrg: siteConfig.github.org,
        releaseRepos: siteConfig.github.releaseRepos,
      })
    : null;
  const selector = options.url
    ? { sourceUrl: classified.normalizedUrl }
    : { slug: options.slug };
  const branchSlug =
    options.slug ||
    classified?.mediumId ||
    new URL(selector.sourceUrl).pathname.split('/').filter(Boolean).at(-1);

  if (options.noPr) {
    const result = await removePublication({ slug: options.slug, url: selector.sourceUrl });
    if (result.changed > 0) {
      await validateGeneratedContent({ contentChanged: result.contentChanged > 0 });
    } else {
      console.log('No tracked changes; skipping validation and build');
    }
    return result;
  }

  const publishing = await assertPublishingReady({ requireAdminMerge: !options.noMerge });
  return publishChange({
    branchName: removalBranchName({ category: classified?.type, slug: branchSlug }),
    commitMessage: `Remove engineering note: ${branchSlug}`.slice(0, 200),
    noMerge: options.noMerge,
    publisherPermission: publishing.viewerPermission,
    prTitle: `Remove content: ${branchSlug}`.slice(0, 250),
    prBody: (result) => removalPrBody(result),
    generate: () => removePublication({ slug: options.slug, url: selector.sourceUrl }),
  });
}

if (isMainModule(import.meta.url)) {
  await removeContent();
}
