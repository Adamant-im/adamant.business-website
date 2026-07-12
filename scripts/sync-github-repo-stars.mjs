import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { siteConfig } from '../config/site.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outputPath = join(root, 'src/data/repos.json');

function githubHeaders() {
  return {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'cryptofoundry-website-sync',
    ...(process.env.PAT_GITHUB_TOKEN
      ? { Authorization: `Bearer ${process.env.PAT_GITHUB_TOKEN}` }
      : {}),
  };
}

async function fetchOrgRepoCount(org) {
  const url = `https://api.github.com/orgs/${org}`;
  const response = await fetch(url, { headers: githubHeaders() });

  if (!response.ok) {
    console.warn(`Failed to fetch org ${org}: ${response.status}`);
    return null;
  }

  const data = await response.json();
  return data.public_repos ?? null;
}

async function fetchStars(org, repo, description) {
  const url = `https://api.github.com/repos/${org}/${repo}`;
  const response = await fetch(url, { headers: githubHeaders() });

  if (!response.ok) {
    console.warn(`Failed to fetch ${org}/${repo}: ${response.status}`);
    return {
      name: repo,
      description,
      stars: 0,
      url: `https://github.com/${org}/${repo}`,
    };
  }

  const data = await response.json();
  return {
    name: repo,
    description: data.description || description,
    stars: data.stargazers_count ?? 0,
    url: data.html_url || `https://github.com/${org}/${repo}`,
  };
}

const [orgRepoCount, repos] = await Promise.all([
  fetchOrgRepoCount(siteConfig.github.org),
  Promise.all(
    siteConfig.github.starsRepos.map(({ repo, description }) =>
      fetchStars(siteConfig.github.org, repo, description),
    ),
  ),
]);

const payload = {
  orgRepoCount: orgRepoCount ?? repos.length,
  repos,
};

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`);
console.log(
  `Wrote ${repos.length} repositories (org total: ${payload.orgRepoCount}) to ${outputPath}`,
);
