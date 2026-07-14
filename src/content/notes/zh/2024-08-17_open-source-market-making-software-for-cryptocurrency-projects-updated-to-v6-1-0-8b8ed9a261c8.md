---
title: "ADAMANT 做市软件更新至 v6.1.0"
slug: "open-source-market-making-software-for-cryptocurrency-projects-updated-to-v6-1-0-8b8ed9a261c8"
description: "ADAMANT 开源做市应用是为加密项目和交易所设计的自托管工具，旨在生成交易量、维持价差和流动性，并构建动态订单簿。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/open-source-market-making-software-for-cryptocurrency-projects-updated-to-v6-1-0-8b8ed9a261c8"
publishedAt: "2024-08-17T10:04:57.129Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/8b8ed9a261c8/001-0-3n-a6wrdfj1fhgin.webp"
cardSpan: "full"
originalId: "medium:8b8ed9a261c8"
locale: "zh"
placeholder: false
---

ADAMANT 的开源做市应用是一款为加密货币项目和交易所设计的自托管工具，旨在生成交易量、维持价差和流动性，并构建动态订单簿。基础版本免费，高级功能以付费模块形式提供。该项目最近发布了 6.1.0 版本，带来了多项功能和稳定性改进。

![加密项目用开源做市软件更新至 v6.1.0](/images/engineering-notes/medium/8b8ed9a261c8/002-0-1vbp44c85yvdelg.webp)

本次发布的一个关键更新是增强了 Price Watcher 模块。该模块现在包含一种机制，用于验证代币价格是否为最新，有助于防止基于过期数据做出做市决策。代码库还经历了重大重构，以提高整体稳定性、性能和可维护性，支持项目规模扩展。

新增了 `dev` 和 `clear_db` 设置。`dev` 设置可简化测试和开发流程，而 `clear_db` 提供了一种快速清除数据库的方法，适用于重置环境。依赖项已更新，以确保与最新库的兼容性，从而提升安全性和性能。

其他改进包括少量错误修复、新集成的手动测试以在部署前验证安装，以及经过全面更新的 README，包含最新的安装和使用指南。发布版本和更新日志可在 ADAMANT GitHub 仓库获取。
