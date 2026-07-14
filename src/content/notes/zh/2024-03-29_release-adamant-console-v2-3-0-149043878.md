---
title: "ADAMANT Console v2.3.0"
slug: "release-adamant-console-v2-3-0-149043878"
description: "此版本引入了 adm init [path] 命令，允许用户将默认配置文件复制到 /.adm/ 或指定目录路径。无破坏性变更。"
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
locale: "zh"
placeholder: false
---

此版本引入了 `adm init [path]` 命令，允许用户将默认配置文件复制到 `~/.adm/` 或指定目录路径。

```bash
# to copy to ~/.adm/$ADM_CONFIG_FILENAME
$ adm init
# to copy to the specific directory
$ adm init ./my-dir
```

此版本未引入任何破坏性变更。
