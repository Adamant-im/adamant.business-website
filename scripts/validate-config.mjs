import { readFile } from 'node:fs/promises';

import { siteConfig } from '../config/site.ts';

const requiredPaths = [
  'site.url',
  'site.heroTagline',
  'github.starsRepos',
  'github.releaseRepos',
  'github.discussions.repository',
  'openRouter.models',
  'openRouter.translate.models',
  'sync.dedupStateFile',
  'seo.defaultOgImage',
];

function hasPath(path) {
  return path.split('.').reduce((value, key) => {
    if (value && typeof value === 'object' && key in value) {
      return value[key];
    }
    return undefined;
  }, siteConfig);
}

let failed = false;

for (const path of requiredPaths) {
  if (!hasPath(path)) {
    console.error(`Missing config value: ${path}`);
    failed = true;
  }
}

if (!siteConfig.github.starsRepos.length) {
  console.error('github.starsRepos must not be empty');
  failed = true;
}

if (!siteConfig.github.releaseRepos.length) {
  console.error('github.releaseRepos must not be empty');
  failed = true;
}

if (
  !siteConfig.openRouter?.models?.length ||
  !siteConfig.openRouter?.translate?.models?.length
) {
  console.error('OpenRouter summary and translation model lists must not be empty');
  failed = true;
}

try {
  const workflow = await readFile('.github/workflows/sync-content.yml', 'utf8');
  const cronLine = `cron: '${siteConfig.sync.contentCron}'`;
  if (!workflow.includes(cronLine)) {
    console.error(`sync-content.yml must contain ${cronLine}`);
    failed = true;
  }
} catch (error) {
  console.error(`Unable to validate sync-content.yml: ${error.message}`);
  failed = true;
}

if (failed) {
  process.exit(1);
}

console.log('config/site.ts validation passed');
