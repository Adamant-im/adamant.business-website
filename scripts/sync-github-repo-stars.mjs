import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { siteConfig } from '../config/site.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const outputPath = join(root, 'src/data/repos.json');

async function fetchStars(org, repo, description) {
  const url = `https://api.github.com/repos/${org}/${repo}`;
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'cryptofoundry-website-sync',
    ...(process.env.GITHUB_TOKEN
      ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
      : {}),
  };

  const response = await fetch(url, { headers });
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

const repos = await Promise.all(
  siteConfig.github.starsRepos.map(({ repo, description }) =>
    fetchStars(siteConfig.github.org, repo, description),
  ),
);

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, `${JSON.stringify(repos, null, 2)}\n`);
console.log(`Wrote ${repos.length} repositories to ${outputPath}`);
