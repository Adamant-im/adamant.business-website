---
title: "新的 ADM 控制台 — 命令行工具"
slug: "new-adm-console-command-line-tool-23c6e6b7b970"
description: "ADAMANT 控制台 v2.0.0 完全重构，提供命令行与 ADAMANT 区块链交互，支持账户创建、代币转账、消息发送和节点注册。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/new-adm-console-command-line-tool-23c6e6b7b970"
publishedAt: "2022-07-18T11:14:07.081Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/23c6e6b7b970/001-0-c431kvn9ybiqfp7j.webp"
cardSpan: "full"
originalId: "medium:23c6e6b7b970"
locale: "zh"
placeholder: false
---

ADAMANT 控制台是一个用于与 ADAMANT 区块链交互的命令行工具，在版本 2.0.0 中已完全重新设计。除了现有的 JS 和 Node API 外，该控制台还支持用户创建账户、转账代币、发送消息以及注册节点。

该工具既可以作为独立的命令行界面运行，也可以作为 NodeJS 库使用，便于集成到外部脚本和应用程序中。开发者可以利用该控制台构建功能完整的去中心化应用，例如即时通讯工具或基于区块链的双因素身份验证系统，并充分利用其新增的消息解密功能。

2.0.0 版本是对代码库的全面重构，现在使用 `adamant-api` 包。新版本引入了交互模式、内置命令帮助、更新的依赖项以及多项错误修复。
