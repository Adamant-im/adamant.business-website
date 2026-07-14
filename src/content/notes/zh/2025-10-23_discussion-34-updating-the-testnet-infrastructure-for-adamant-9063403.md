---
title: "更新 ADAMANT 的测试网基础设施"
slug: "discussion-34-updating-the-testnet-infrastructure-for-adamant-9063403"
description: "ADAMANT 已确定一项基础设施改进任务（Issue 148），旨在更新并稳定其测试网环境。健康的测试网对可靠的区块链开发至关重要。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/34"
publishedAt: "2025-10-23T15:40:31Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:9063403"
locale: "zh"
placeholder: false
---

ADAMANT 已确定一项基础设施改进任务（Issue #148），旨在更新并稳定其测试网环境。一个健康的测试网对于可靠的区块链开发至关重要，能够支持真实场景的测试和贡献者快速上手。

## 当前可用资源

测试网数据库的 **引导快照** 现已提供下载，地址为 `https://testnet.adamant.im/db_test_backup.sql.gz`。开发者可通过该快照快速搭建测试网节点，无需从头同步数据。

测试网 ADM 币（3500 ADM）可通过与主网相同的水龙头申请，地址为 `https://adamant.im/free-adm-tokens/`。运行开发分支的测试网消息应用可通过 `https://dev-adamant-testnet.surge.sh/` 访问，测试网区块浏览器位于 `https://testnet.adamant.im/`。

公共测试网节点列表已维护在 GitHub 上的默认配置文件中：`https://github.com/Adamant-im/adamant/blob/dev/test/config.default.json`。

如需了解完整实现细节，请参阅原文：`https://news.adamant.im/updating-the-testnet-infrastructure-for-adamant-aac36fea2a56`。
