import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { load } from 'cheerio';

import { siteConfig } from '../config/site.ts';

const rootDir = fileURLToPath(new URL('..', import.meta.url));
const distDir = path.join(rootDir, 'dist');
const expectedHreflangCount =
  siteConfig.locales.reduce((count, locale) => count + locale.codes.length, 0) + 1;
const errors = [];

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await listFiles(entryPath)));
    else files.push(entryPath);
  }
  return files;
}

function addError(file, message) {
  errors.push(`${path.relative(rootDir, file)}: ${message}`);
}

function localeForPath(pathname) {
  return (
    siteConfig.locales.find(
      (locale) => locale.path && (pathname === `/${locale.path}/` || pathname.startsWith(`/${locale.path}/`)),
    ) ?? siteConfig.locales.find((locale) => locale.id === siteConfig.defaultLocale)
  );
}

function pathWithoutLocale(pathname, locale) {
  if (!locale.path) return pathname;
  if (pathname === `/${locale.path}/`) return '/';
  return pathname.slice(locale.path.length + 1) || '/';
}

function localizedUrl(locale, pathname) {
  const localizedPath = locale.path
    ? pathname === '/'
      ? `/${locale.path}/`
      : `/${locale.path}${pathname}`
    : pathname;
  return new URL(localizedPath, siteConfig.site.url).href;
}

function findGraphNode(graph, type) {
  return graph.find((node) => node?.['@type'] === type);
}

function isEngineeringNoteDetail(pathname) {
  const segments = pathname.split('/').filter(Boolean);
  const notesIndex = segments.indexOf('engineering-notes');
  if (notesIndex === -1) return false;
  const nextSegment = segments[notesIndex + 1];
  return Boolean(nextSegment && nextSegment !== 'page');
}

function isServicePage(pathname) {
  const segments = pathname.split('/').filter(Boolean);
  const lastSegment = segments.at(-1);
  return siteConfig.services.some((service) => service.slug === lastSegment);
}

const htmlFiles = (await listFiles(distDir)).filter((file) => file.endsWith('.html')).sort();
const canonicalUrls = new Set();

for (const file of htmlFiles) {
  const $ = load(await readFile(file, 'utf8'));
  const title = $('title').text().trim();
  const description = $('meta[name="description"]').attr('content')?.trim();
  const robots = $('meta[name="robots"]').attr('content')?.toLowerCase();
  const canonical = $('link[rel="canonical"]').attr('href');

  if (!title) addError(file, 'missing title');
  if (!description) addError(file, 'missing meta description');
  if (!robots?.includes('index') || !robots.includes('follow')) addError(file, 'robots meta must allow indexing');
  if (robots?.includes('noindex') || robots?.includes('nofollow')) addError(file, 'robots meta blocks indexing');
  if (!canonical) {
    addError(file, 'missing canonical URL');
    continue;
  }

  const canonicalUrl = new URL(canonical);
  const locale = localeForPath(canonicalUrl.pathname);
  const basePath = pathWithoutLocale(canonicalUrl.pathname, locale);
  canonicalUrls.add(canonical);

  if (canonicalUrl.origin !== siteConfig.site.url) addError(file, `unexpected canonical origin: ${canonical}`);
  if (!canonicalUrl.pathname.endsWith('/')) addError(file, `canonical URL needs a trailing slash: ${canonical}`);
  if ($('html').attr('lang') !== locale.codes[0]) {
    addError(file, `expected html lang ${locale.codes[0]}, found ${$('html').attr('lang')}`);
  }

  const alternates = new Map();
  $('link[rel="alternate"][hreflang]').each((_, element) => {
    alternates.set($(element).attr('hreflang'), $(element).attr('href'));
  });
  if (alternates.size !== expectedHreflangCount) {
    addError(file, `expected ${expectedHreflangCount} hreflang links, found ${alternates.size}`);
  }
  for (const alternateLocale of siteConfig.locales) {
    const expectedUrl = localizedUrl(alternateLocale, basePath);
    for (const code of alternateLocale.codes) {
      if (alternates.get(code) !== expectedUrl) {
        addError(file, `incorrect hreflang ${code}: ${alternates.get(code) ?? 'missing'}`);
      }
    }
  }
  if (alternates.get('x-default') !== localizedUrl(siteConfig.locales[0], basePath)) {
    addError(file, `incorrect x-default hreflang: ${alternates.get('x-default') ?? 'missing'}`);
  }

  const socialMeta = [
    ['meta[property="og:title"]', title],
    ['meta[property="og:description"]', description],
    ['meta[property="og:url"]', canonical],
    ['meta[property="og:image:alt"]', title],
    ['meta[name="twitter:title"]', title],
    ['meta[name="twitter:description"]', description],
    ['meta[name="twitter:image:alt"]', title],
  ];
  for (const [selector, expected] of socialMeta) {
    if ($(selector).attr('content') !== expected) addError(file, `${selector} does not match page metadata`);
  }
  for (const selector of ['meta[property="og:image"]', 'meta[name="twitter:image"]']) {
    const value = $(selector).attr('content');
    if (!value || !value.startsWith(`${siteConfig.site.url}/`)) addError(file, `${selector} is missing an absolute image URL`);
  }

  const structuredDataScripts = $('script[type="application/ld+json"]');
  if (structuredDataScripts.length !== 1) {
    addError(file, `expected one JSON-LD script, found ${structuredDataScripts.length}`);
    continue;
  }

  let structuredData;
  try {
    structuredData = JSON.parse(structuredDataScripts.text());
  } catch (error) {
    addError(file, `invalid JSON-LD: ${error.message}`);
    continue;
  }
  const graph = structuredData['@graph'];
  if (structuredData['@context'] !== 'https://schema.org' || !Array.isArray(graph)) {
    addError(file, 'JSON-LD must use a schema.org @graph');
    continue;
  }

  const organization = findGraphNode(graph, 'Organization');
  const website = findGraphNode(graph, 'WebSite');
  const webpage = findGraphNode(graph, 'WebPage') ?? findGraphNode(graph, 'CollectionPage');
  if (!organization?.['@id']) addError(file, 'missing Organization entity');
  if (organization?.sameAs) addError(file, 'Organization must not conflate cryptofoundry with related projects');
  if (website?.inLanguage !== locale.codes[0]) addError(file, 'WebSite language does not match the page locale');
  if (webpage?.inLanguage !== locale.codes[0] || webpage?.url !== canonical) {
    addError(file, 'WebPage entity does not match the canonical page and locale');
  }

  if (isEngineeringNoteDetail(canonicalUrl.pathname)) {
    const article = findGraphNode(graph, 'Article') ?? findGraphNode(graph, 'BlogPosting');
    if (!article || article.inLanguage !== locale.codes[0] || article.url !== canonical) {
      addError(file, 'engineering note is missing matching Article structured data');
    }
  }
  if (canonicalUrl.pathname.includes('/engineering-notes/') && !isEngineeringNoteDetail(canonicalUrl.pathname)) {
    if (!findGraphNode(graph, 'CollectionPage') || !findGraphNode(graph, 'ItemList')) {
      addError(file, 'engineering notes index is missing CollectionPage or ItemList structured data');
    }
  }
  if (isServicePage(canonicalUrl.pathname) && !findGraphNode(graph, 'Service')) {
    addError(file, 'service page is missing Service structured data');
  }
  if (canonicalUrl.pathname === '/' || canonicalUrl.pathname === `/${locale.path}/`) {
    const faq = findGraphNode(graph, 'FAQPage');
    const visibleFaq = $('[data-faq-list] > div')
      .map((_, element) => ({
        question: $(element).find('dt').first().text().trim(),
        answer: $(element).find('dd').first().text().trim(),
      }))
      .get();
    const structuredFaq = Array.isArray(faq?.mainEntity)
      ? faq.mainEntity.map((item) => ({
          question: item?.name,
          answer: item?.acceptedAnswer?.text,
        }))
      : [];
    if (
      !faq ||
      visibleFaq.length === 0 ||
      visibleFaq.length !== structuredFaq.length ||
      visibleFaq.some(
        (item, index) =>
          item.question !== structuredFaq[index]?.question || item.answer !== structuredFaq[index]?.answer,
      )
    ) {
      addError(file, 'home page FAQ structured data does not match the visible FAQ');
    }
  }
}

if (canonicalUrls.size !== htmlFiles.length) {
  errors.push(`Canonical URLs are not unique: ${canonicalUrls.size} URLs for ${htmlFiles.length} HTML pages`);
}

const sitemap = load(await readFile(path.join(distDir, 'sitemap-0.xml'), 'utf8'), { xmlMode: true });
const sitemapUrls = new Set(sitemap('url > loc').map((_, element) => sitemap(element).text()).get());
for (const canonical of canonicalUrls) {
  if (!sitemapUrls.has(canonical)) errors.push(`Sitemap is missing canonical URL: ${canonical}`);
}
if (sitemapUrls.size !== canonicalUrls.size) {
  errors.push(`Sitemap has ${sitemapUrls.size} URLs for ${canonicalUrls.size} canonical pages`);
}

const llmsText = await readFile(path.join(distDir, 'llms.txt'), 'utf8');
for (const locale of siteConfig.locales) {
  const paths = [
    '/',
    '/engineering-notes/',
    ...siteConfig.services.map((service) => `/${service.slug}/`),
  ];
  for (const pathname of paths) {
    const expectedUrl = localizedUrl(locale, pathname);
    if (!llmsText.includes(expectedUrl)) errors.push(`llms.txt is missing ${expectedUrl}`);
  }
}

if (errors.length) {
  console.error(errors.slice(0, 100).join('\n'));
  if (errors.length > 100) console.error(`...and ${errors.length - 100} more SEO validation errors`);
  process.exit(1);
}

console.log(
  `SEO validation passed: ${htmlFiles.length} HTML pages, ${expectedHreflangCount} hreflang targets per page, ${sitemapUrls.size} sitemap URLs, ${siteConfig.locales.length} llms.txt language editions`,
);
