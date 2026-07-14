---
title: "ADAMANT Console v2.2.0"
slug: "release-adamant-console-v2-2-0-142293299"
description: "The wiki has been updated to reflect the latest changes. Dependencies have been updated to their current versions. The codebase has been rewritten to use ES modules (.mjs) to su…"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-console/releases/tag/v2.2.0"
publishedAt: "2024-02-16T09:24:56Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-console"
tag: "v2.2.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-console:142293299"
locale: "en"
placeholder: false
---

The wiki has been updated to reflect the latest changes. Dependencies have been updated to their current versions. The codebase has been rewritten to use ES modules (.mjs) to support modern libraries. Prettier has been added for code formatting.

### Breaking changes

The configuration file format has changed. The `passPhrase` key in the config has been renamed to `passphrase`. The configuration files `config.json` and `config.default.json` have been renamed to `config.jsonc` and `config.default.jsonc` respectively. The `account new` command response now returns `passphrase` instead of `passPhrase`. The command-line flag `--passPhrase` has been renamed to `--passphrase`, so `adm --passPhrase=""` should now be `adm --passphrase=""`.
