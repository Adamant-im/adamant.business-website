---
title: "ADAMANT Console v3.1.0"
slug: "release-adamant-console-v3-1-0-346144062"
description: "ADAMANT Console v3.1.0 updates the console for ADAMANT Node v0.10.0 and refreshes the CLI, JSON RPC, JavaScript wrapper, documentation, and validation toolchain. This release ad…"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-console/releases/tag/v3.1.0"
publishedAt: "2026-06-29T08:31:56Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-console"
tag: "v3.1.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-console:346144062"
locale: "en"
placeholder: false
---

ADAMANT Console v3.1.0 updates the console for ADAMANT Node v0.10.0 and refreshes the CLI, JSON-RPC, JavaScript wrapper, documentation, and validation toolchain. This release adds ADAMANT Node v0.10.0 response and query support through `adamant-api` v3. It also introduces node status, chat room/message, chat transaction, transaction `returnUnconfirmed`, delegate lookup, and direct-transfer query handling updates. Package metadata and dependencies have been updated, alongside a new VitePress documentation site, generated TypeDoc API reference, and GitHub Pages deployment on release. Additional improvements include CLI help examples, expanded JSON-RPC coverage, public API JSDoc, syntax highlighting for pretty-printed JSON output, and increased test coverage for API wrappers, CLI help behavior, config/client metadata, prompt history, and logging.

Verification can be performed using the following commands:
shell
npm ci --ignore-scripts
npm run lint
npm run format:check
npm test
npm run docs:build
node bin/adamant.js client version
``n
### Breaking changes
Node.js 22.13.0 or newer is now required to run ADAMANT Console.
