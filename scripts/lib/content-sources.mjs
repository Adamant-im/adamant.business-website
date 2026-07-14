import * as cheerio from 'cheerio';
import TurndownService from 'turndown';

import { siteConfig } from '../../config/site.ts';
import {
  fetchGithubPages,
  getGithubToken,
  githubHeaders,
  mapLimit,
  markdownExcerpt,
  sanitizeImportedMarkdown,
  slugify,
} from './content-utils.mjs';
import {
  classifyPublicationUrl,
  extractMediumId,
  normalizePublicationUrl,
  publicationMatches,
} from './publication-url.mjs';

const turndown = new TurndownService({
  bulletListMarker: '-',
  codeBlockStyle: 'fenced',
  emDelimiter: '*',
  headingStyle: 'atx',
  strongDelimiter: '**',
});

turndown.addRule('sourceFencedCode', {
  filter: 'pre',
  replacement(_content, node) {
    const language = node.getAttribute('data-code-block-lang') || '';
    const pre = cheerio.load(node.outerHTML, null, false);
    pre('br').replaceWith('\n');
    return `\n\n\`\`\`${language}\n${pre.root().text().trim()}\n\`\`\`\n\n`;
  },
});
turndown.keep(['sub', 'sup']);

function text(element, selector) {
  return element.find(selector).first().text().replace(/\s+/g, ' ').trim();
}

function cleanMediumHtml(html, title) {
  const $ = cheerio.load(html ?? '', null, false);
  $('script, style, iframe, object, embed, form, input, button').remove();
  $('img').each((_, element) => {
    const image = $(element);
    const src = image.attr('src') ?? '';
    if (src.includes('medium.com/_/stat') || image.attr('width') === '1') {
      image.remove();
    }
  });
  $('p').each((_, element) => {
    const paragraph = $(element);
    if (/was originally published in .* on Medium/i.test(paragraph.text())) {
      paragraph.prev('hr').remove();
      paragraph.remove();
    }
  });
  const firstHeading = $('h1, h2, h3').first();
  if (firstHeading.text().replace(/\s+/g, ' ').trim() === title) firstHeading.remove();
  return sanitizeImportedMarkdown(turndown.turndown($.html() ?? ''));
}

function mediumRecord({ title, link, guid, author, publishedAt, html }) {
  const mediumId = extractMediumId(guid) ?? extractMediumId(link);
  if (!mediumId) throw new Error(`Medium publication ID is missing: ${link}`);
  const body = cleanMediumHtml(html, title);
  const sourceUrl = normalizePublicationUrl(link);
  return {
    title,
    slug: `${slugify(title)}-${mediumId}`,
    description: markdownExcerpt(body, title),
    category: 'article',
    source: 'medium',
    sourceUrl,
    publishedAt: new Date(publishedAt).toISOString(),
    author,
    sourceAccount: 'adamant-im',
    cardSpan: 'full',
    originalId: `medium:${mediumId}`,
    originalFileName: mediumId,
    body,
  };
}

export function parseMediumFeed(xml) {
  const $ = cheerio.load(xml, { xmlMode: true });
  const records = [];

  $('item').each((_, node) => {
    const item = $(node);
    const title = text(item, 'title');
    const link = text(item, 'link');
    const guid = text(item, 'guid');
    const author = text(item, 'dc\\:creator') || 'ADAMANT';
    const publishedAt = text(item, 'atom\\:updated') || text(item, 'pubDate');
    const html = item.find('content\\:encoded').first().text();
    const categories = item
      .find('category')
      .toArray()
      .map((category) => $(category).text().trim().toLowerCase());

    if (
      !title ||
      !link ||
      !publishedAt ||
      categories.some((category) => category === 'response' || category === 'responses') ||
      /^response to\b/i.test(title)
    ) {
      return;
    }

    records.push(mediumRecord({ title, link, guid, author, publishedAt, html }));
  });

  return records;
}

async function fetchText(url, label) {
  const response = await fetch(url, {
    headers: {
      Accept: 'text/html,application/xhtml+xml,application/rss+xml,application/xml;q=0.9,*/*;q=0.8',
      'User-Agent': 'cryptofoundry-engineering-notes-sync',
    },
    signal: AbortSignal.timeout(60_000),
  });
  if (!response.ok) throw new Error(`${label} returned HTTP ${response.status}`);
  return { body: await response.text(), finalUrl: response.url };
}

export async function fetchMediumPublications() {
  const { body } = await fetchText(siteConfig.medium.feedUrl, 'Medium feed');
  return parseMediumFeed(body);
}

async function fetchMediumPublicationByUrl(classified) {
  const feed = await fetchMediumPublications();
  const feedMatch = feed.find((publication) =>
    publicationMatches(publication, {
      sourceUrl: classified.normalizedUrl,
      originalId: classified.mediumId ? `medium:${classified.mediumId}` : undefined,
    }),
  );
  if (feedMatch) return feedMatch;

  const { body: html, finalUrl } = await fetchText(classified.normalizedUrl, 'Medium article');
  const $ = cheerio.load(html);
  const canonical = $('link[rel="canonical"]').attr('href') || finalUrl;
  const mediumId = classified.mediumId ?? extractMediumId(canonical) ?? extractMediumId(finalUrl);
  if (!mediumId) throw new Error('Unable to derive a Medium publication ID from the page');
  if (!html.includes('news.adamant.im') && !/publication[^>]*>\s*ADAMANT/i.test(html)) {
    throw new Error('The Medium URL is not verified as a publication from the configured ADAMANT feed');
  }

  const title =
    $('meta[property="og:title"]').attr('content') ||
    $('article h1').first().text().trim() ||
    $('title').text().trim();
  const author =
    $('meta[name="author"]').attr('content') ||
    $('[data-testid="authorName"]').first().text().trim() ||
    'ADAMANT';
  const publishedAt =
    $('meta[property="article:published_time"]').attr('content') ||
    $('article time').first().attr('datetime');
  const article = $('article').first();
  if (!title || !publishedAt || article.length === 0) {
    throw new Error('Medium page does not expose complete publication metadata');
  }

  return mediumRecord({
    title,
    link: normalizePublicationUrl(canonical),
    guid: `https://medium.com/p/${mediumId}`,
    author,
    publishedAt,
    html: article.html(),
  });
}

async function fetchGithubJson(endpoint, token) {
  const response = await fetch(`https://api.github.com${endpoint}`, {
    headers: githubHeaders(token),
    signal: AbortSignal.timeout(60_000),
  });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(`GitHub API ${response.status} for ${endpoint}: ${message.slice(0, 300)}`);
  }
  return response.json();
}

function releaseRecord(repo, release) {
  const title = String(release.name || release.tag_name || `Release ${release.id}`).trim();
  const body = sanitizeImportedMarkdown(release.body || '');
  return {
    title,
    slug: `release-${slugify(repo)}-${slugify(release.tag_name || String(release.id))}-${release.id}`,
    description: markdownExcerpt(body, `${repo} ${title}`),
    category: 'release',
    source: 'github',
    sourceUrl: normalizePublicationUrl(release.html_url),
    publishedAt: release.published_at,
    author: release.author?.login || siteConfig.github.org,
    authorUrl: release.author?.html_url,
    repo,
    tag: release.tag_name,
    prerelease: Boolean(release.prerelease),
    cardSpan: 'half',
    originalId: `github-release:${repo}:${release.id}`,
    originalFileName: `${slugify(repo)}-${release.id}`,
    body,
  };
}

function discussionRecord(discussion) {
  const title = String(discussion.title).trim();
  const body = sanitizeImportedMarkdown(discussion.body || '');
  return {
    title,
    slug: `discussion-${discussion.number}-${slugify(title)}-${discussion.id}`,
    description: markdownExcerpt(body, title),
    category: 'discussion',
    source: 'github',
    sourceUrl: normalizePublicationUrl(discussion.html_url, {
      discussionRepository: siteConfig.github.discussions.repository,
    }),
    publishedAt: discussion.created_at,
    author: discussion.user.login,
    authorUrl: discussion.user.html_url,
    discussionCategory: discussion.category?.name || 'Discussion',
    cardSpan: 'half',
    originalId: `github-discussion:${discussion.id}`,
    originalFileName: String(discussion.id),
    body,
  };
}

async function organizationMembers(token) {
  const members = await fetchGithubPages(`/orgs/${siteConfig.github.org}/members`, token);
  return new Set(members.map((member) => member.login.toLowerCase()));
}

export async function fetchGithubReleasePublications(token = getGithubToken()) {
  const nested = await mapLimit(siteConfig.github.releaseRepos, 4, async (repo) => {
    const releases = await fetchGithubJson(
      `/repos/${siteConfig.github.org}/${encodeURIComponent(repo)}/releases?per_page=100`,
      token,
    );
    return releases
      .filter((release) => !release.draft && release.published_at)
      .map((release) => releaseRecord(repo, release));
  });
  return nested.flat();
}

export async function fetchGithubDiscussionPublications(token = getGithubToken()) {
  const { org, repository } = siteConfig.github.discussions;
  const [members, discussions] = await Promise.all([
    organizationMembers(token),
    fetchGithubPages(`/repos/${org}/${encodeURIComponent(repository)}/discussions`, token),
  ]);
  return discussions
    .filter((discussion) => members.has(String(discussion.user?.login || '').toLowerCase()))
    .map(discussionRecord);
}

async function fetchGithubPublicationByUrl(classified, token, { enforceEligibility = true } = {}) {
  if (classified.type === 'release') {
    const release = await fetchGithubJson(
      `/repos/${siteConfig.github.org}/${encodeURIComponent(classified.repo)}/releases/tags/${encodeURIComponent(classified.tag)}`,
      token,
    );
    if (enforceEligibility && (release.draft || !release.published_at)) {
      throw new Error('GitHub Release is not published');
    }
    return releaseRecord(classified.repo, release);
  }

  const discussionPromise = fetchGithubJson(
    `/repos/${siteConfig.github.discussions.org}/${encodeURIComponent(siteConfig.github.discussions.repository)}/discussions/${classified.number}`,
    token,
  );
  const [members, discussion] = enforceEligibility
    ? await Promise.all([organizationMembers(token), discussionPromise])
    : [null, await discussionPromise];
  if (
    enforceEligibility &&
    !members.has(String(discussion.user?.login || '').toLowerCase())
  ) {
    throw new Error(`GitHub Discussion author is not a current ${siteConfig.github.org} member`);
  }
  return discussionRecord(discussion);
}

function classifyConfiguredPublicationUrl(value) {
  return classifyPublicationUrl(value, {
    discussionRepository: siteConfig.github.discussions.repository,
    githubOrg: siteConfig.github.org,
    releaseRepos: siteConfig.github.releaseRepos,
  });
}

export async function fetchPublicationByUrl(value) {
  const classified = classifyConfiguredPublicationUrl(value);
  if (classified.type === 'article') return fetchMediumPublicationByUrl(classified);
  return fetchGithubPublicationByUrl(classified, getGithubToken());
}

export async function fetchPublicationIdentityByUrl(value) {
  const classified = classifyConfiguredPublicationUrl(value);
  if (classified.type === 'article') {
    return {
      originalId: classified.mediumId ? `medium:${classified.mediumId}` : undefined,
      sourceUrl: classified.normalizedUrl,
    };
  }
  return fetchGithubPublicationByUrl(classified, getGithubToken(), {
    enforceEligibility: false,
  });
}

export async function discoverPublications() {
  const token = getGithubToken();
  const [articles, releases, discussions] = await Promise.all([
    fetchMediumPublications(),
    fetchGithubReleasePublications(token),
    fetchGithubDiscussionPublications(token),
  ]);
  return [...articles, ...releases, ...discussions].sort(
    (left, right) => new Date(left.publishedAt) - new Date(right.publishedAt),
  );
}
