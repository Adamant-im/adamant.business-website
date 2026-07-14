---
title: "ADAMANT Console v1.4.2"
slug: "release-adamant-console-v1-4-2-14527383"
description: "This release of ADAMANT Console introduces a new get blocks command and adds several JSON RPC methods: getBlocks, getTransactionsInBlockByHeight, and getTransactionsInBlockById.…"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-console/releases/tag/v1.4.2"
publishedAt: "2018-12-13T22:26:43Z"
author: "zyuhel"
authorUrl: "https://github.com/zyuhel"
repo: "adamant-console"
tag: "v1.4.2"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-console:14527383"
locale: "en"
placeholder: false
---

This release of ADAMANT Console introduces a new `get blocks` command and adds several JSON-RPC methods: `getBlocks`, `getTransactionsInBlockByHeight`, and `getTransactionsInBlockById`.

Several fixes are included. The release corrects improper extending of `~` in environment variables on some Ubuntu versions. It resolves an issue where default parameters were not being overridden in custom config files. Additionally, it fixes a problem with `getTransactionsReceivedByAddress` that caused it to skip transactions received with comments.
