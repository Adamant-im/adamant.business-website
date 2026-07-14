const MEDIUM_HOSTS = new Set([
  'medium.com',
  'news.adamant.im',
]);

function withProtocol(value) {
  const trimmed = String(value ?? '').trim();
  if (!trimmed) throw new Error('Publication URL must not be empty');
  return /^[a-z][a-z\d+.-]*:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function normalizePathname(pathname) {
  const normalized = pathname.replace(/\/{2,}/g, '/').replace(/\/$/, '');
  return normalized || '/';
}

export function extractMediumId(value) {
  const text = String(value ?? '');
  const pathMatch = text.match(/(?:\/p\/|-)([a-f\d]{8,16})(?:[/?#]|$)/i);
  return pathMatch?.[1]?.toLowerCase() ?? null;
}

export function normalizePublicationUrl(value, { discussionRepository = '.github' } = {}) {
  const url = new URL(withProtocol(value));
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error(`Unsupported publication URL protocol: ${url.protocol}`);
  }

  url.protocol = 'https:';
  url.hostname = url.hostname.toLowerCase().replace(/^www\./, '');
  url.port = '';
  url.username = '';
  url.password = '';
  url.search = '';
  url.hash = '';
  url.pathname = normalizePathname(url.pathname);

  const discussion = url.pathname.match(/^\/([^/]+)\/([^/]+)\/discussions\/(\d+)$/i);
  const configuredDiscussionRepository = String(discussionRepository ?? '.github').toLowerCase();
  if (
    url.hostname === 'github.com' &&
    discussion &&
    discussion[2].toLowerCase() === configuredDiscussionRepository
  ) {
    url.pathname = `/orgs/${discussion[1]}/discussions/${discussion[3]}`;
  }

  return url.toString().replace(/\/$/, '');
}

export function classifyPublicationUrl(
  value,
  { discussionRepository, githubOrg, releaseRepos } = {},
) {
  const normalizedUrl = normalizePublicationUrl(value, { discussionRepository });
  const url = new URL(normalizedUrl);

  if (MEDIUM_HOSTS.has(url.hostname) || url.hostname.endsWith('.medium.com')) {
    return {
      type: 'article',
      source: 'medium',
      normalizedUrl,
      mediumId: extractMediumId(normalizedUrl),
    };
  }

  if (url.hostname !== 'github.com') {
    throw new Error(`Unsupported publication host: ${url.hostname}`);
  }

  const discussion = url.pathname.match(/^\/orgs\/([^/]+)\/discussions\/(\d+)$/i);
  if (discussion) {
    if (githubOrg && discussion[1].toLowerCase() !== githubOrg.toLowerCase()) {
      throw new Error(`GitHub Discussion must belong to ${githubOrg}`);
    }
    return {
      type: 'discussion',
      source: 'github',
      normalizedUrl,
      org: discussion[1],
      number: Number(discussion[2]),
    };
  }

  const release = url.pathname.match(/^\/([^/]+)\/([^/]+)\/releases\/tag\/(.+)$/i);
  if (release) {
    if (githubOrg && release[1].toLowerCase() !== githubOrg.toLowerCase()) {
      throw new Error(`GitHub Release must belong to ${githubOrg}`);
    }
    const configuredRepo = releaseRepos?.find(
      (repo) => repo.toLowerCase() === release[2].toLowerCase(),
    );
    if (releaseRepos && !configuredRepo) {
      throw new Error(`GitHub Release repository is not configured: ${release[2]}`);
    }
    return {
      type: 'release',
      source: 'github',
      normalizedUrl,
      org: release[1],
      repo: configuredRepo ?? release[2],
      tag: decodeURIComponent(release[3]),
    };
  }

  throw new Error('URL must point to a Medium article, GitHub Discussion, or GitHub Release');
}

export function publicationMatches(left, right) {
  if (!left || !right) return false;
  if (left.originalId && right.originalId && left.originalId === right.originalId) return true;
  if (left.slug && right.slug && left.slug === right.slug) return true;
  if (left.sourceUrl && right.sourceUrl) {
    try {
      if (normalizePublicationUrl(left.sourceUrl) === normalizePublicationUrl(right.sourceUrl)) {
        return true;
      }
    } catch {
      return false;
    }
  }
  const leftMediumId = extractMediumId(left.sourceUrl ?? left.originalId ?? left.slug);
  const rightMediumId = extractMediumId(right.sourceUrl ?? right.originalId ?? right.slug);
  return Boolean(leftMediumId && rightMediumId && leftMediumId === rightMediumId);
}
