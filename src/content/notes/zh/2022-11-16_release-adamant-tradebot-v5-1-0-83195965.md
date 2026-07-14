---
title: "ADAMANT Tradebot v5.1.0"
slug: "release-adamant-tradebot-v5-1-0-83195965"
description: "此版本支持.jsonc配置文件，可添加注释和尾随逗号，便于维护。通知系统可同时发送至多个频道，并新增优先级通知机制。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v5.1.0"
publishedAt: "2022-11-16T03:49:18Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-tradebot"
tag: "v5.1.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:83195965"
locale: "zh"
placeholder: false
---

此版本的 ADAMANT Tradebot 引入了对 `.jsonc` 配置文件的支持，允许在机器人配置中使用注释和尾随逗号，便于维护。通知系统已扩展，可同时向多个频道发送消息，新的优先级通知机制可确保关键警报及时送达操作人员。

现在支持命令别名，用户可为常用命令定义简短名称。`/buy`、`/sell` 和 `/fill` 命令新增了交互式确认功能，有助于防止误操作交易。针对订单簿的逐档交易功能也得到改进，提升了直接对接订单簿时的执行可靠性。
