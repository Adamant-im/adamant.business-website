---
title: "ADAMANT Console v2.2.0"
slug: "release-adamant-console-v2-2-0-142293299"
description: "Wiki 已更新以反映最新更改。依赖项已升级至当前版本。代码库已重写为使用 ES 模块（.mjs）以支持现代库。新增 Prettier 用于代码格式化。"
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
locale: "zh"
placeholder: false
---

Wiki 已更新以反映最新更改。依赖项已升级至当前版本。代码库已重写为使用 ES 模块（.mjs）以支持现代库。新增 Prettier 用于代码格式化。

### 重大变更

配置文件格式已更改。配置中的 `passPhrase` 键已重命名为 `passphrase`。配置文件 `config.json` 和 `config.default.json` 已分别重命名为 `config.jsonc` 和 `config.default.jsonc`。`account new` 命令的返回结果现在输出 `passphrase` 而非 `passPhrase`。命令行参数 `--passPhrase` 已重命名为 `--passphrase`，因此 `adm --passPhrase=""` 现在应写作 `adm --passphrase=""`。
