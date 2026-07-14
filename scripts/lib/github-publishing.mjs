import { spawn } from 'node:child_process';
import { mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

import { rootDir, slugify } from './content-utils.mjs';

const TRACKED_CONTENT_PATHS = [
  'content/.sync-state.json',
  'src/content/notes',
  'public/images/engineering-notes',
];

function commandText(command, args) {
  return [command, ...args].join(' ');
}

async function run(command, args, { capture = false, allowExitCodes = [0] } = {}) {
  if (!capture) console.log(`$ ${commandText(command, args)}`);
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: rootDir,
      env: process.env,
      stdio: capture ? ['ignore', 'pipe', 'pipe'] : 'inherit',
    });
    let stdout = '';
    let stderr = '';
    if (capture) {
      child.stdout.on('data', (chunk) => {
        stdout += chunk;
      });
      child.stderr.on('data', (chunk) => {
        stderr += chunk;
      });
    }
    child.on('error', reject);
    child.on('close', (code) => {
      if (allowExitCodes.includes(code)) resolve({ code, stdout: stdout.trim(), stderr: stderr.trim() });
      else reject(new Error(`${commandText(command, args)} failed with exit code ${code}${stderr ? `: ${stderr}` : ''}`));
    });
  });
}

async function currentBranch() {
  const result = await run('git', ['symbolic-ref', '--quiet', '--short', 'HEAD'], {
    capture: true,
    allowExitCodes: [0, 1],
  });
  return result.code === 0 ? result.stdout : null;
}

async function currentSha() {
  return (await run('git', ['rev-parse', 'HEAD'], { capture: true })).stdout;
}

export async function assertPublishingReady() {
  const status = await run('git', ['status', '--porcelain'], { capture: true });
  if (status.stdout) {
    throw new Error('PR mode requires a clean working tree; use --no-pr for local generation');
  }
  await run('gh', ['auth', 'status', '--hostname', 'github.com'], { capture: true });
  const capability = await run(
    'gh',
    ['repo', 'view', '--json', 'nameWithOwner,viewerPermission,squashMergeAllowed'],
    { capture: true },
  );
  const repository = JSON.parse(capability.stdout);
  if (!['ADMIN', 'MAINTAIN', 'WRITE'].includes(repository.viewerPermission)) {
    throw new Error(`GitHub ${repository.viewerPermission} permission cannot publish content PRs`);
  }
  if (!repository.squashMergeAllowed) throw new Error('Repository does not allow squash merges');
  console.log(
    `GitHub publication access: ${repository.nameWithOwner} (${repository.viewerPermission}, squash merge enabled)`,
  );
}

export async function validateGeneratedContent() {
  for (const script of [
    'test:content',
    'validate:config',
    'validate:notes',
    'lint',
    'build',
    'validate:seo',
  ]) {
    await run('npm', ['run', script]);
  }
}

function temporaryBodyPath(branchName) {
  return path.join(rootDir, '.ai-ignored', `temp.${Date.now()}.${slugify(branchName)}.pr-description.md`);
}

async function restoreStartingPoint(startingBranch, startingSha, branchName, merged) {
  if ((await currentBranch()) === branchName) {
    if (startingBranch) await run('git', ['switch', startingBranch]);
    else await run('git', ['switch', '--detach', startingSha]);
  }
  if (merged && startingBranch === 'master') {
    await run('git', ['fetch', 'origin', 'master']);
    await run('git', ['merge', '--ff-only', 'origin/master']);
  }
  if (merged) {
    await run('git', ['branch', '-d', branchName], { capture: true, allowExitCodes: [0, 1] });
  }
}

export async function publishChange({
  branchName,
  commitMessage,
  noMerge,
  prBody,
  prTitle,
  generate,
}) {
  const startingBranch = await currentBranch();
  const startingSha = await currentSha();
  let committed = false;
  let merged = false;
  let prUrl = null;

  await run('git', ['fetch', 'origin', 'master']);
  const remoteBranch = await run('git', ['ls-remote', '--exit-code', '--heads', 'origin', branchName], {
    capture: true,
    allowExitCodes: [0, 2],
  });
  if (remoteBranch.code === 0) throw new Error(`Remote branch already exists: ${branchName}`);
  await run('git', ['switch', '--create', branchName, 'origin/master']);

  try {
    const result = await generate();
    const resolvedPrBody = typeof prBody === 'function' ? prBody(result) : prBody;
    const resolvedPrTitle = typeof prTitle === 'function' ? prTitle(result) : prTitle;
    await validateGeneratedContent();
    await run('git', ['add', '--', ...TRACKED_CONTENT_PATHS]);
    const staged = await run('git', ['diff', '--cached', '--quiet'], {
      capture: true,
      allowExitCodes: [0, 1],
    });
    if (staged.code === 0) {
      console.log('No tracked content changes were generated; no PR created');
      await restoreStartingPoint(startingBranch, startingSha, branchName, false);
      await run('git', ['branch', '-d', branchName], { capture: true });
      return { ...result, prUrl: null, merged: false };
    }

    await run('git', ['commit', '--message', commitMessage]);
    committed = true;
    await run('git', ['push', '--set-upstream', 'origin', branchName]);

    const bodyPath = temporaryBodyPath(branchName);
    await mkdir(path.dirname(bodyPath), { recursive: true });
    await writeFile(bodyPath, resolvedPrBody, 'utf8');
    try {
      prUrl = (
        await run(
          'gh',
          [
            'pr',
            'create',
            '--base',
            'master',
            '--head',
            branchName,
            '--title',
            resolvedPrTitle,
            '--body-file',
            bodyPath,
          ],
          { capture: true },
        )
      ).stdout;
    } finally {
      await rm(bodyPath, { force: true });
    }
    console.log(`Created ${prUrl}`);

    if (!noMerge) {
      try {
        await run('gh', ['pr', 'merge', prUrl, '--squash', '--delete-branch']);
      } catch (error) {
        throw new Error(
          `${error.message}. Direct squash merge is available with WRITE access because master currently has no approval rule; if repository rules changed, use --no-merge or an ADMIN token.`,
        );
      }
      merged = true;
      console.log(`Merged ${prUrl}`);
    }

    await restoreStartingPoint(startingBranch, startingSha, branchName, merged);
    return { ...result, prUrl, merged };
  } catch (error) {
    if (committed) await restoreStartingPoint(startingBranch, startingSha, branchName, merged);
    else console.error(`Generated work remains on ${branchName} for inspection`);
    throw error;
  }
}

function displayCategory(category) {
  return category.charAt(0).toUpperCase() + category.slice(1);
}

export function additionBranchName(publication) {
  const date = new Date(publication.publishedAt).toISOString().slice(0, 10);
  return `content/${date}-add-${publication.category}-${publication.slug}`;
}

export function additionPrTitle(publication) {
  const date = new Date(publication.publishedAt).toISOString().slice(0, 10);
  return `Add content: ${date} ${displayCategory(publication.category)} — ${publication.title}`.slice(0, 250);
}

export function additionPrBody(publication) {
  const properties = [
    `- Original title: ${publication.title}`,
    `- Published: ${new Date(publication.publishedAt).toISOString()}`,
    `- Author: ${publication.author}`,
    `- Type: ${displayCategory(publication.category)}`,
    `- Source: ${publication.source}`,
    `- Source ID: ${publication.originalId}`,
    `- Source URL: ${publication.sourceUrl}`,
    ...(publication.repo ? [`- Repository: ${publication.repo}`] : []),
    ...(publication.tag ? [`- Release tag: ${publication.tag}`] : []),
    ...(publication.discussionCategory
      ? [`- Discussion category: ${publication.discussionCategory}`]
      : []),
    '- Locales: English, Simplified Chinese, Spanish, Russian, Arabic, French, Japanese, German',
  ];
  return `## Description\n\nGenerate and publish a localized Engineering note from an upstream publication.\n\n## Publication properties\n\n${properties.join('\n')}\n\n## How to test\n\n- Run \`npm run test:content\`\n- Run \`npm run validate:notes\`\n- Run \`npm run lint\`\n- Run \`npm run build\`\n- Run \`npm run validate:seo\`\n\n## Checklist\n\n- [x] Source content sanitized\n- [x] Remote source images localized as WebP\n- [x] English note generated with the configured summary models\n- [x] Seven localized translations generated with the configured translation models\n- [x] Source metadata and canonical original link preserved\n\n## Risk review\n\nThe generated copy can contain model errors. The source link and metadata are retained for review. No secrets or private configuration are included.\n`;
}

export function removalBranchName({ category = 'publication', slug = 'excluded-publication' }) {
  return `content/${new Date().toISOString().slice(0, 10)}-remove-${category}-${slugify(slug)}`;
}

export function removalPrBody({ selector, matches }) {
  const target = selector.sourceUrl ? `Source URL: ${selector.sourceUrl}` : `Slug: ${selector.slug}`;
  const removed = matches.length
    ? matches.map((entry) => `- ${entry.frontmatter.title} (${entry.frontmatter.originalId})`).join('\n')
    : '- No current note matched; only the exclusion state changed';
  return `## Description\n\nRemove an Engineering note from every locale and exclude it from future source synchronization.\n\n## Target\n\n${target}\n\n## Removed content\n\n${removed}\n\n## How to test\n\n- Run \`npm run test:content\`\n- Run \`npm run validate:notes\`\n- Run \`npm run lint\`\n- Run \`npm run build\`\n- Run \`npm run validate:seo\`\n\n## Checklist\n\n- [x] All localized note files removed when present\n- [x] Publication-owned images removed when present\n- [x] Publication added to the committed exclusions list\n`;
}
