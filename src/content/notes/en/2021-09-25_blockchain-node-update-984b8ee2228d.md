---
title: "ADAMANT Node v0.6.5 Update"
slug: "blockchain-node-update-984b8ee2228d"
description: "ADAMANT Node v0.6.5 is now available. This release focuses on code quality and tooling rather than protocol changes, so updating is optional and does not affect network consensu…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/blockchain-node-update-984b8ee2228d"
publishedAt: "2021-09-25T11:38:15.720Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/984b8ee2228d/001-0-f4qfd6o3timcqsgd.webp"
cardSpan: "full"
originalId: "medium:984b8ee2228d"
locale: "en"
placeholder: false
---

ADAMANT Node v0.6.5 is now available. This release focuses on code quality and tooling rather than protocol changes, so updating is optional and does not affect network consensus.

The default broadcast settings have been changed, and the install bash script has been updated. Development dependencies were refreshed, the codebase was linted, and the test suite was fixed.

Two notable additions are the `-genesis` command-line parameter and a dedicated `portWS` 36665 for the testnet. These make it easier to run genesis and testnet configurations without manual overrides.

Installation instructions for Ubuntu, macOS, and Windows are available in the [ADAMANT Node v0.6.5 release notes](https://github.com/Adamant-im/adamant/releases/tag/v0.6.5).
