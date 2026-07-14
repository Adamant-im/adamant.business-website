---
title: "ADAMANT Tradebot v5.7.0"
slug: "release-adamant-tradebot-v5-7-0-128569473"
description: "此版本的ADAMANT Tradebot引入了多项改进和维护更新。市价单在下单后将被清除，价格监视器的可靠性也得到提升。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v5.7.0"
publishedAt: "2023-11-08T16:48:40Z"
author: "just-software-dev"
authorUrl: "https://github.com/just-software-dev"
repo: "adamant-tradebot"
tag: "v5.7.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:128569473"
locale: "zh"
placeholder: false
---

此版本的ADAMANT Tradebot引入了多项改进和维护更新。市价单在下单后将被清除，价格监视器的可靠性也得到提升。机器人现在会监控交易配置文件的外部变更，从而实现更动态的配置管理而无需重启。日志功能已增强，以提高运行期间的可观测性。依赖项已更新至最新的兼容版本，添加了代码检查规则以提升代码质量，并应用了若干小的修复。

### 重大变更

如果您仍在使用 `config.json` 文件，请将其重命名为 `config.jsonc`。
