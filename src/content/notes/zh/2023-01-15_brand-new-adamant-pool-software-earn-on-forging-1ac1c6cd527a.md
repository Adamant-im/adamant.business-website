---
title: "ADAMANT Pool v3.0.0 — 锻造池软件更新"
slug: "brand-new-adamant-pool-software-earn-on-forging-1ac1c6cd527a"
description: "锻造池允许用户合并投票权重，在ADAMANT区块链上锻造区块并自动分享ADM奖励。该程序自动处理奖励计算和分配。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/brand-new-adamant-pool-software-earn-on-forging-1ac1c6cd527a"
publishedAt: "2023-01-15T15:59:48.033Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/1ac1c6cd527a/001-0-rvpkdxtavqcrrn3p.webp"
cardSpan: "full"
originalId: "medium:1ac1c6cd527a"
locale: "zh"
placeholder: false
---

一个锻造池允许用户合并其投票权重，以在 ADAMANT 区块链上共同锻造区块，并自动共享 ADM 奖励。该池程序自动处理奖励的计算与分配，无需人工干预。

ADAMANT 锻造池的 3.0.0 版本现已作为[开源项目](https://github.com/Adamant-im/pool)发布。代码库已在新的仓库中完全重构，旧仓库已被弃用。此次重写更新了所有库依赖，提升了性能，并降低了资源占用。配置格式保持不变，升级的运营者可使用提供的迁移脚本。

对于投票者而言，最显著的变化是使用 `svelte` 框架构建的新 Web 界面，可在桌面和移动设备上提供响应式体验。

![ADAMANT Pool Web UI](/images/engineering-notes/medium/1ac1c6cd527a/002-0-eus0ye-v8djitrru.webp)

![ADAMANT Pool Web UI mobile](/images/engineering-notes/medium/1ac1c6cd527a/003-0-cdfhik804ra3jq2w.webp)

v3.0.0 版本更新了所有依赖项，使用 `svelte` 重写了仪表盘，并对整个代码库进行了重构和优化，同时修复了已知问题。

有两个重大变更需要注意。第一，现在需要 Node.js 18.12.1 或更高版本（当前 LTS），不再支持旧版本。第二，池现在使用 `lowdb` 作为数据库。从 v2 升级的运营者应查阅 README 文件中的迁移说明。

为池投票可支持 ADAMANT 去中心化网络，并获得作为锻造奖励的被动收入。活跃的 ADAMANT 池列表可在[ADAMANT 文档](https://medium.com/adamant-im/hodl-list-of-adamant-pools-join-in-and-get-rewards-491a98610f4b)中找到。
