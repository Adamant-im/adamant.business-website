---
title: "ADAMANT Console v1.3.0"
slug: "release-adamant-console-v1-3-0-13940917"
description: "This release introduces two new commands: account new and get transactions. It also adds support for the passPhrase option, allowing users to provide a passphrase directly when…"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-console/releases/tag/v1.3.0"
publishedAt: "2018-11-11T16:19:44Z"
author: "zyuhel"
authorUrl: "https://github.com/zyuhel"
repo: "adamant-console"
tag: "v1.3.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-console:13940917"
locale: "en"
placeholder: false
---

This release introduces two new commands: `account new` and `get transactions`. It also adds support for the `--passPhrase` option, allowing users to provide a passphrase directly when running a command.

Several fixes are included in this release. Deprecated `new Buffer()` calls have been replaced, and a bug causing incorrect config loading has been resolved. A temporary dependency update has been applied pending the merge of dthree/vorpal#322.
