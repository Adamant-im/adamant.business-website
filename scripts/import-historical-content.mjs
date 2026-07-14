import { importMediumExports } from './import-medium-export.mjs';
import { syncGithubDiscussions } from './sync-github-discussions.mjs';
import { syncGithubReleases } from './sync-github-releases.mjs';

await importMediumExports();
await syncGithubReleases();
await syncGithubDiscussions();

console.log('Historical engineering notes import completed without AI processing');
