import { siteConfig } from '../config/site.ts';

const requiredPaths = ['site.url', 'site.heroTagline', 'github.starsRepos', 'seo.twitterHandle'];

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

if (failed) {
  process.exit(1);
}

console.log('config/site.ts validation passed');
