import { createHash } from 'node:crypto';
import { access, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { siteConfig } from '../../config/site.ts';
import { markdownExcerpt, rootDir, serializeMarkdown } from './content-utils.mjs';
import { normalizeMarkdownFences } from './markdown-safety.mjs';
import { optimizePublicImage } from './optimize-image.mjs';
import { callOpenRouter as requestOpenRouter } from './openrouter.mjs';

const CTA_SECTION_RE =
  /^#{1,3}\s+.*(get started|links?|follow us|share|related|see also|resources|contact us|questions\?|support|stay updated|join us|subscribe|thank you|thanks for reading)\s*$/im;

const CTA_TRAILING_RE =
  /\n+((?:your listing got you|if you (?:spot|have)|please reply|reply here|reach out|contact us|get in touch|we('re| are) (?:excited|happy|proud)|join (?:our|the)|follow us|stay tuned|for (?:bugs|product questions),).*)$/is;

const SKIP_SECTIONS_RELEASE = new Set([
  'links',
  'link',
  'see also',
  'resources',
  'full changelog',
]);

const REPO_DISPLAY_NAMES = {
  'adamant-tradebot': 'ADAMANT Tradebot',
  adamant: 'ADAMANT Node',
  'adamant-im': 'ADAMANT Messenger',
  'adamant-iOS': 'ADAMANT iOS',
  'adamant-console': 'ADAMANT Console',
  'adamant-explorer': 'ADAMANT Explorer',
  pool: 'ADAMANT Pool',
  'adamant-airdrop': 'ADAMANT Airdrop',
  currencyinfo: 'currencyinfo',
  'ipfs-node': 'IPFS Node',
  'ETH-transactions-storage': 'ETH Transactions Storage',
  'adamant-ns': 'ADAMANT NS',
  'adamant-exchangebot': 'ADAMANT Exchange Bot',
  'adamant-chatgpt': 'ADAMANT ChatGPT',
  'adamant-2fa': 'ADAMANT 2FA',
  'adamant-api-jsclient': 'ADAMANT API JS Client',
};

export function parseMarkdownFile(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error('Missing frontmatter');
  const frontmatter = {};
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    else if (value === 'true') value = true;
    else if (value === 'false') value = false;
    frontmatter[key] = value;
  }
  return { frontmatter, body: match[2].trim() };
}

function protectFencedBlocks(body) {
  const blocks = [];
  const protectedBody = body.replace(/```[\s\S]*?```/g, (block) => {
    const token = `@@CODEBLOCK${blocks.length}@@`;
    blocks.push(block);
    return token;
  });
  return { protectedBody, blocks };
}

function restoreFencedBlocks(body, blocks) {
  return blocks.reduce(
    (text, block, index) => text.replace(`@@CODEBLOCK${index}@@`, block),
    body,
  );
}

function stripInlineMarkdown(text) {
  return text
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    .replace(/^>\s?/gm, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function listItemToSentence(item) {
  let text = stripInlineMarkdown(item.replace(/^[-*+]\s+/, '').replace(/^\d+\.\s+/, ''));
  if (!text) return '';
  if (!/[.!?]$/.test(text)) text += '.';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function listsToProse(text) {
  let normalized = text.replace(/^[0-9]️⃣\s*(.+)$/gm, (_, item) => listItemToSentence(item));
  normalized = normalized.replace(/(?:^|\n)\s*[-*+]\s+/g, '\n- ');

  const lines = normalized.split('\n');
  const output = [];
  let buffer = [];

  const flush = () => {
    if (buffer.length === 0) return;
    const paragraph = buffer.map(listItemToSentence).filter(Boolean).join(' ');
    if (paragraph) output.push(paragraph);
    buffer = [];
  };

  for (const line of lines) {
    if (/^(\s*[-*+]|\s*\d+\.)\s+/.test(line)) {
      buffer.push(line);
      continue;
    }
    flush();
    output.push(line);
  }
  flush();
  return output.join('\n');
}

function removeSectionByHeading(body, headingPattern) {
  const lines = body.split('\n');
  const output = [];
  let skipping = false;
  let skipLevel = 0;

  for (const line of lines) {
    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      const level = heading[1].length;
      const title = heading[2].trim();
      if (headingPattern.test(title)) {
        skipping = true;
        skipLevel = level;
        continue;
      }
      if (skipping && level <= skipLevel) skipping = false;
    }
    if (!skipping) output.push(line);
  }
  return output.join('\n');
}

function removeSeeAlsoBlock(body) {
  const lines = body.split('\n');
  const output = [];
  let skipping = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (/^#{0,3}\s*see also:?\s*$/i.test(line.trim())) {
      skipping = true;
      continue;
    }
    if (skipping) {
      if (/^#{1,3}\s+/.test(line) || (line.trim() === '' && i + 1 < lines.length && /^#{1,3}\s+/.test(lines[i + 1]))) {
        skipping = false;
      } else {
        continue;
      }
    }
    if (/^[-*+]\s+\[.+\]\(.+\)\s*$/.test(line.trim()) && output.length > 0 && /^#{0,3}\s*see also/i.test(output[output.length - 1]?.trim() ?? '')) {
      continue;
    }
    output.push(line);
  }

  let joined = output.join('\n');
  joined = joined.replace(/\nSee also:\s*\n(?:[-*+]\s+\[[^\]]+\]\([^)]+\)\s*\n?)+/gi, '\n');
  return joined;
}

function removeInlineCtas(body) {
  return body
    .replace(/\s*Check it out!\s*/gi, ' ')
    .replace(/\n+To get help with[^\n]*\n(?:[^\n#]+\n?)*/gi, '\n')
    .replace(/\n+(?:More info|Website|Premium mm bot)[^\n]*\n?/gi, '\n')
    .replace(/\n+[^\n]*available now with[^\n]*MarketMaking\.app[^\n]*\n?/gi, '\n')
    .replace(/\n+[^\n]*available in the \[Premium mm bot\][^\n]*\n?/gi, '\n')
    .replace(/\n+Our partner,[^\n]*\n?/gi, '\n')
    .replace(/Follow the \[instructions\][^\n]+\n?/gi, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function removeCtaSections(body) {
  let result = body;
  for (const section of body.split(/(?=^#{1,3}\s)/m)) {
    const heading = section.match(/^#{1,3}\s+(.+)$/m);
    if (heading && CTA_SECTION_RE.test(heading[0])) {
      result = result.replace(section, '');
    }
  }
  return removeInlineCtas(result.replace(CTA_TRAILING_RE, '').trim());
}

function normalizeHeadings(body) {
  return body.replace(/^#\s+(.+)$/m, (_, title) => `### ${title}`);
}

function splitSections(body) {
  const parts = body.split(/(?=^#{1,3}\s)/m).filter(Boolean);
  if (parts.length === 0) return [{ heading: null, content: body }];
  return parts.map((part) => {
    const match = part.match(/^(#{1,3})\s+(.+)\n?([\s\S]*)$/);
    if (!match) return { heading: null, content: part.trim() };
    return { heading: match[2].trim(), level: match[1].length, content: match[3].trim() };
  });
}

function sectionToProse(section) {
  const { protectedBody, blocks } = protectFencedBlocks(section.content ?? section);
  let text = protectedBody;
  text = listsToProse(text);
  text = text.replace(/\n{3,}/g, '\n\n');
  return restoreFencedBlocks(text.trim(), blocks);
}

function improveReleaseTitle(frontmatter) {
  const repo = frontmatter.repo ?? '';
  const tag = frontmatter.tag ?? frontmatter.title ?? '';
  const display = REPO_DISPLAY_NAMES[repo] ?? repo.replace(/-/g, ' ');
  const title = String(frontmatter.title).trim();
  if (
    display &&
    tag &&
    (/^v?\d/.test(title) || /^(release!?|changelog|update)$/i.test(title) || title.length < 12)
  ) {
    return `${display} ${tag}`.trim();
  }
  return frontmatter.title;
}

function improveDiscussionTitle(title) {
  return title
    .replace(/^Discussion:\s*/i, '')
    .replace(/\s*—\s*/g, ': ')
    .replace(/\s+/g, ' ')
    .trim();
}

function transformRelease(body, frontmatter) {
  const { protectedBody, blocks } = protectFencedBlocks(body);
  let text = protectedBody;

  text = removeSeeAlsoBlock(text);
  text = text.replace(CTA_TRAILING_RE, '');
  text = text.replace(/\n(?:You can )?download[^\n]*\nhttps?:\/\/\S+/gi, '');

  if (text.split('\n').filter((line) => line.trim()).length <= 4) {
    const display = REPO_DISPLAY_NAMES[frontmatter.repo] ?? frontmatter.repo;
    const tag = frontmatter.tag ?? '';
    const summary = stripInlineMarkdown(text);
    text = summary
      ? `${display} ${tag} — ${summary.replace(/\s*https?:\/\/\S+/g, '').trim()}`
      : `${display} ${tag} release.`;
  }

  const sections = splitSections(text);
  let breaking = '';
  const kept = [];

  for (const section of sections) {
    const key = (section.heading ?? '').toLowerCase();
    if (SKIP_SECTIONS_RELEASE.has(key) || /^links?$/i.test(key)) continue;
    if (/breaking\s*changes?/i.test(key)) {
      breaking = sectionToProse(section.content);
      continue;
    }
    if (!section.heading) {
      kept.push(sectionToProse(section.content));
      continue;
    }
    const prose = sectionToProse(section.content);
    if (!prose && !section.content.includes('@@CODEBLOCK')) continue;
    const prefix = section.heading.toLowerCase() === 'install' ? '' : `${section.heading}. `;
    const combined =
      section.heading.toLowerCase() === 'install'
        ? prose
        : `${prefix}${prose}`.replace(/\. \./g, '.');
    kept.push(combined.trim());
  }

  let result = restoreFencedBlocks(kept.filter(Boolean).join('\n\n'), blocks);
  if (breaking) {
    const breakingProse = listsToProse(breaking);
    result = `${result.trim()}\n\n### Breaking changes\n\n${breakingProse}`.trim();
  }
  return result.trim();
}

function transformArticleOrDiscussion(body, category) {
  let text = body;
  text = removeSeeAlsoBlock(text);
  text = removeCtaSections(text);
  text = normalizeHeadings(text);

  const sections = splitSections(text);
  const processed = [];
  const deferredImages = [];

  for (const section of sections) {
    if (section.heading && CTA_SECTION_RE.test(`### ${section.heading}`)) continue;
    const key = (section.heading ?? '').toLowerCase();
    if (['links', 'get started', 'follow us', 'share', 'resources'].includes(key)) continue;

    let content = section.content ?? '';
    const images = [...content.matchAll(/!\[[^\]]*\]\([^)]+\)|<img[^>]+>/gi)].map((m) => m[0]);
    let prose = sectionToProse(content);

    if (!prose && images.length > 0) {
      deferredImages.push(...images);
      continue;
    }

    if (section.heading) {
      const heading =
        section.level && section.level <= 3 ? `${'#'.repeat(Math.min(section.level, 3))} ${section.heading}` : `### ${section.heading}`;
      processed.push(`${heading}\n\n${prose}`.trim());
    } else {
      processed.push(prose);
    }
  }

  let result = processed.filter(Boolean).join('\n\n');
  if (deferredImages.length > 0) {
    result = `${result}\n\n${deferredImages.join('\n\n')}`.trim();
  }

  result = result.replace(/(\S)\.\s+[-*+]\s+/g, '$1. ');
  result = listsToProse(result);

  const lineCount = result.split('\n').length;
  if (lineCount > 200) {
    result = shortenLongContent(result, category);
  } else if (lineCount > 170 && category === 'article') {
    result = shortenLongContent(result, category);
  }

  return result.trim();
}

function shortenLongContent(body, category) {
  const dropSectionPatterns = [
    /who this is for/i,
    /why .+ matters/i,
    /conclusion/i,
    /about (the )?team/i,
    /gratitude/i,
    /what's next/i,
    /whats next/i,
    /final thoughts/i,
  ];

  const sections = splitSections(body);
  const kept = [];
  let lines = 0;
  const maxLines = category === 'article' ? 170 : 120;

  for (const section of sections) {
    if (section.heading && dropSectionPatterns.some((re) => re.test(section.heading))) {
      const images = (section.content ?? '').match(/!\[[^\]]*\]\([^)]+\)|<img[^>]+>/gi);
      if (images) kept.push({ heading: null, content: images.join('\n\n'), lines: images.length });
      continue;
    }
    const sectionText = section.heading
      ? `${'#'.repeat(section.level ?? 3)} ${section.heading}\n\n${section.content ?? ''}`
      : (section.content ?? '');
    const sectionLines = sectionText.split('\n').length;
    if (lines + sectionLines > maxLines && section.content?.includes('@@CODEBLOCK') === false) {
      const images = (section.content ?? '').match(/!\[[^\]]*\]\([^)]+\)|<img[^>]+>/gi);
      if (images) kept.push({ heading: null, content: images.join('\n\n'), lines: images.length });
      continue;
    }
    kept.push({ heading: section.heading, content: sectionText, lines: sectionLines });
    lines += sectionLines;
  }

  return kept.map((s) => s.content).join('\n\n').trim();
}

export function transformBody(body, frontmatter) {
  const category = frontmatter.category;
  if (category === 'release') return transformRelease(body, frontmatter);
  return transformArticleOrDiscussion(body, category);
}

export function transformFrontmatter(frontmatter, body) {
  const updated = { ...frontmatter, locale: 'en', placeholder: false };
  if (frontmatter.category === 'release') {
    updated.title = improveReleaseTitle(frontmatter);
  } else if (frontmatter.category === 'discussion') {
    updated.title = improveDiscussionTitle(frontmatter.title);
  }
  updated.description = markdownExcerpt(body, updated.title);
  return updated;
}

const GITHUB_IMG_RE =
  /(?:!\[[^\]]*\]\((https:\/\/github\.com\/user-attachments\/assets\/[a-f0-9-]+)\)|<img[^>]*\ssrc=["'](https:\/\/github\.com\/user-attachments\/assets\/[a-f0-9-]+)["'][^>]*>)/gi;

export async function localizeGithubImages(body, discussionId) {
  const matches = [...body.matchAll(GITHUB_IMG_RE)];
  if (matches.length === 0) return body;

  let result = body;
  const imageDir = path.join(
    rootDir,
    'public/images/engineering-notes/github/discussions',
    discussionId,
  );
  await mkdir(imageDir, { recursive: true });

  let index = 0;
  for (const match of matches) {
    const url = match[1] ?? match[2];
    index += 1;
    const hash = createHash('sha1').update(url).digest('hex').slice(0, 8);
    const filename = `${String(index).padStart(3, '0')}-${hash}.webp`;
    const localPath = `/images/engineering-notes/github/discussions/${discussionId}/${filename}`;
    const diskPath = path.join(imageDir, filename);

    try {
      await access(diskPath);
    } catch {
      const response = await fetch(url);
      if (response.ok) {
        const buffer = Buffer.from(await response.arrayBuffer());
        const optimized = await optimizePublicImage(buffer);
        await writeFile(diskPath, optimized);
      }
    }

    const alt = `Discussion screenshot ${index}`;
    result = result.replace(match[0], `![${alt}](${localPath})`);
  }

  return result;
}

export function extractDiscussionId(frontmatter) {
  const match = String(frontmatter.originalId ?? '').match(/github-discussion:(\d+)/);
  return match?.[1] ?? null;
}

function buildPrompt(category, frontmatter, body) {
  const rules =
    category === 'release'
      ? `Release rules:
- Write a concise release summary in prose paragraphs (NO bullet lists, NO numbered lists)
- Keep significant install/shell code blocks exactly as in the source
- If breaking changes exist, put them under "### Breaking changes" at the end (also prose, no lists)
- Remove link sections, CTAs, and marketing filler
- Improve the title to be descriptive (e.g. "ADAMANT Tradebot v9.0.0" not just "v9.0.0")`
      : `Article/discussion rules:
- Highlight what matters; add brief context if something important is implied but unstated
- If long, shorten to roughly 1-2 pages while keeping technical accuracy
- Minimize lists — convert to prose where possible
- Keep meaningful code blocks; drop trivial or duplicate snippets
- Remove CTAs, link dumps, "we're great" endings, "reply here", "get started" link sections
- Keep images: use the same image markdown paths from the source unless the image no longer fits the text (then move to the end)
- Write in clear technical English`;

  return `You prepare English engineering notes for the cryptofoundry website from imported originals.

${rules}

Respond with JSON only (no markdown fence):
{"title":"...","description":"...","body":"..."}

Constraints:
- description: max 180 characters, one line, no markdown
- body: valid Markdown, no frontmatter
- organization name: cryptofoundry (lowercase) when referring to the business site operator; ADAMANT for the open-source project
- do not invent features or version numbers

Category: ${category}
Source title: ${frontmatter.title}
${frontmatter.repo ? `Repository: ${frontmatter.repo}` : ''}
${frontmatter.tag ? `Tag: ${frontmatter.tag}` : ''}

ORIGINAL BODY:
${body}`;
}

export async function callOpenRouter(prompt) {
  if (!process.env.OPENROUTER_API_KEY) return null;

  const summarize = siteConfig.openRouter.summarize;

  try {
    const { data } = await requestOpenRouter(prompt, {
      models: siteConfig.openRouter.models,
      temperature: summarize.temperature,
      maxTokens: summarize.maxTokens,
      timeoutMs: summarize.timeoutMs,
      maxAttempts: summarize.maxAttempts,
      provider: summarize.provider,
      title: 'cryptofoundry content preparation',
      system:
        'You edit technical publications for a business website. Output strict JSON with title, description, and body fields.',
    });
    if (data?.title && data?.body) return data;
  } catch (error) {
    console.warn(`OpenRouter summarize error: ${error.message}`);
  }

  return null;
}

export async function prepareEnglishNote(frontmatter, body, { useLlm = false } = {}) {
  let title = frontmatter.title;
  let description = frontmatter.description;
  let transformedBody = body;

  if (useLlm) {
    const llm = await callOpenRouter(buildPrompt(frontmatter.category, frontmatter, body));
    if (!llm?.title || !llm?.body) {
      throw new Error(
        `OpenRouter failed for ${frontmatter.slug}. Set OPENROUTER_API_KEY and check ${siteConfig.openRouter.models.join(', ')}.`,
      );
    }
    title = llm.title;
    description = llm.description ?? markdownExcerpt(llm.body, title);
    transformedBody = normalizeMarkdownFences(llm.body);
  } else {
    transformedBody = normalizeMarkdownFences(transformBody(body, frontmatter));
    const fm = transformFrontmatter({ ...frontmatter, title }, transformedBody);
    title = fm.title;
    description = fm.description;
  }

  if (frontmatter.category === 'discussion') {
    const discussionId = extractDiscussionId(frontmatter);
    if (discussionId) {
      transformedBody = await localizeGithubImages(transformedBody, discussionId);
    }
  }

  const updatedFrontmatter = {
    ...frontmatter,
    title,
    description: markdownExcerpt(transformedBody, description || title),
    locale: 'en',
    placeholder: false,
  };

  return serializeMarkdown(updatedFrontmatter, transformedBody);
}
