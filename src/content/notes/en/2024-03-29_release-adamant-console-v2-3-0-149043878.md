---
title: "ADAMANT Console v2.3.0"
slug: "release-adamant-console-v2-3-0-149043878"
description: "This release introduces the adm init [path] command, which allows users to copy the default configuration file to /.adm/ or to a specified directory path. No breaking changes ar…"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-console/releases/tag/v2.3.0"
publishedAt: "2024-03-29T17:13:09Z"
author: "martiliones"
authorUrl: "https://github.com/martiliones"
repo: "adamant-console"
tag: "v2.3.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-console:149043878"
locale: "en"
placeholder: false
---

This release introduces the `adm init [path]` command, which allows users to copy the default configuration file to `~/.adm/` or to a specified directory path.

```bash
# to copy to ~/.adm/$ADM_CONFIG_FILENAME
$ adm init
# to copy to the specific directory
$ adm init ./my-dir
```

No breaking changes are introduced in this release.
