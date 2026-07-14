---
title: "ADAMANT Console v1.3.0"
slug: "release-adamant-console-v1-3-0-13940917"
description: "此版本引入了两个新命令：account new 和 get transactions，并支持 passPhrase 选项，允许用户在运行命令时直接提供密码短语。"
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
locale: "zh"
placeholder: false
---

此版本引入了两个新命令：`account new` 和 `get transactions`。同时还增加了对 `--passPhrase` 选项的支持，允许用户在运行命令时直接提供密码短语。

此版本包含多项修复。已替换已弃用的 `new Buffer()` 调用，修复了导致配置加载不正确的错误。此外，在 dthree/vorpal#322 合并之前，临时更新了一个依赖项。
