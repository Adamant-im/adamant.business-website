---
title: "Currencyinfo 4.2.0：默认无密钥、重构源层以及 2850 倍的历史查询速度提升"
slug: "discussion-78-currencyinfo-4-2-0-keyless-by-default-a-rebuilt-source-layer-and-history-queries-2850-fast-10783310"
description: "Currencyinfo 4.2.0 版本现已发布，引入了默认无密钥配置、重构的源层架构，并大幅优化了历史查询性能，查询速度提升高达 2850 倍。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/78"
publishedAt: "2026-09-09T17:15:27Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "Currencyinfo"
cardSpan: "half"
originalId: "github-discussion:10783310"
locale: "zh"
placeholder: false
---

## 概览

我们非常高兴地宣布 **Currencyinfo 4.2.0** 正式发布。本次更新是该项目的一个重要里程碑，重点在于提升安全性、重构底层架构以及实现性能的飞跃。

## 主要更新内容

### 默认无密钥 (Keyless by default)

为了增强安全性并简化部署流程，Currencyinfo 现在默认采用无密钥模式。这一变更减少了对敏感 API 密钥的依赖，降低了配置复杂性，并进一步符合 cryptofoundry 的安全标准。

### 重构源层 (Rebuilt source layer)

我们对数据源层进行了彻底的重构。此次重构不仅提高了代码的可维护性，还增强了系统在处理多交易所数据时的稳健性。通过优化数据获取逻辑，我们能够更高效地与包括 Azbit、P2PB2B、StakeCube、Coinstore、FameEX、NonKYC、Bit-Z 和 CoinDeal 在内的多个交易所进行交互。

### 历史查询性能提升 2850 倍

通过对数据库查询逻辑和索引结构的深度优化，历史数据查询速度实现了质的飞跃。在基准测试中，查询效率提升了 **2850 倍**。这一改进将显著提升 adamant-tradebot 在回测和历史数据分析场景下的响应速度。

## 升级指南

对于使用 Docker 或 Node.js 部署的现有用户，请按照以下步骤进行升级：

1. 更新您的 `adamant-tradebot` 仓库代码。
2. 检查 `config.default.jsonc` 以了解新的配置项。
3. 使用 `mm doctor` 检查环境配置。
4. 重启您的服务。

## 社区与支持

如果您在升级过程中遇到任何问题，或者对新版本有任何疑问，请通过以下方式联系我们：

* **GitHub**: 在我们的 [GitHub](https://github.com/) 仓库提交 Issue。
* **Telegram**: 联系我们的官方账号 [@adamant_business](https://t.me/adamant_business)。

感谢您一直以来对 ADAMANT 生态系统的支持。
