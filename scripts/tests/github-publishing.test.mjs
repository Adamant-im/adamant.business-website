import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import test from 'node:test';

import { contentBranchSwitchArgs } from '../lib/github-publishing.mjs';

const exec = promisify(execFile);

async function git(cwd, ...args) {
  return exec('git', args, { cwd });
}

test('force-recreates a stale local content branch from the requested start point', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'cryptofoundry-content-branch-'));
  const branchName = 'content/retry-publication';

  try {
    await git(directory, 'init', '--initial-branch=master');
    await git(directory, 'config', 'user.email', 'test@example.com');
    await git(directory, 'config', 'user.name', 'Content Pipeline Test');
    await writeFile(path.join(directory, 'publication.txt'), 'base\n');
    await git(directory, 'add', 'publication.txt');
    await git(directory, 'commit', '--message', 'Base content');
    const baseSha = (await git(directory, 'rev-parse', 'master')).stdout.trim();

    await git(directory, 'switch', '--create', branchName);
    await writeFile(path.join(directory, 'publication.txt'), 'stale\n');
    await git(directory, 'commit', '--all', '--message', 'Stale generated content');
    const staleSha = (await git(directory, 'rev-parse', branchName)).stdout.trim();
    await git(directory, 'switch', 'master');

    await git(directory, ...contentBranchSwitchArgs(branchName, 'master'));

    assert.equal((await git(directory, 'branch', '--show-current')).stdout.trim(), branchName);
    assert.equal((await git(directory, 'rev-parse', 'HEAD')).stdout.trim(), baseSha);
    assert.notEqual((await git(directory, 'rev-parse', 'HEAD')).stdout.trim(), staleSha);
    assert.equal(await readFile(path.join(directory, 'publication.txt'), 'utf8'), 'base\n');
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});

test('refuses to force-recreate a branch outside the content namespace', () => {
  assert.throws(
    () => contentBranchSwitchArgs('master'),
    /Refusing to overwrite a non-content branch/,
  );
});
