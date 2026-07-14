---
title: "ADAMANT Forging Pool v3.1.0：奖励与支付修复"
slug: "discussion-58-adamant-forging-pool-v3-1-0-recommended-update-for-reward-and-payout-fixes-10353267"
description: "ADAMANT Forging Pool v3.1.0 建议池运营商升级，修复奖励计算和定时支付处理，并引入多项结构改进。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/58"
publishedAt: "2026-07-01T14:33:27Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "ADM Nodes, Delegates & Pools"
cardSpan: "half"
originalId: "github-discussion:10353267"
locale: "zh"
placeholder: false
---

ADAMANT Forging Pool v3.1.0 是推荐给池运营商的更新版本。本次发布修复并强化了奖励计算和定时支付处理机制，并引入了若干结构性变更，在升级生产环境矿池前值得仔细审阅。

## 为何升级

最重要的变更聚焦于支付安全性、运营商安全性和长期可维护性。现在，在支付记账前会先对未结奖励进行归一化处理，并为每个出块记录每位投票者的奖励进度。重试和崩溃路径在防止重复奖励更新方面更加安全。支付、区块解析和存储行为路径现在拥有更专注的测试，日志和通知对运维故障模式也更加清晰。

## 存储与迁移

矿池存储现基于 MongoDB。该版本包含针对旧版基于 LowDB 的矿池数据的迁移工具，位于 `scripts/migrate-lowdb-mongodb/` 目录下，同时附带迁移测试、MongoDB 索引设置、更新后的配置参考以及 README 中的迁移指南。运营商应在切换至升级后的矿池进行生产支付前，备份现有矿池数据，在副本上测试迁移，并验证待支付和已接收奖励总额。

## 运营商安全

v3.1.0 增加了可选的加密助记词支持。现有的明文助记词配置仍受支持，但运营商现在可以加密代理节点助记词，并仅在需要启用支付时解锁运行中的矿池：

```sh
npm run adm-pool encrypt
npm run adm-pool unlock
npm run adm-pool lock
npm run adm-pool status
```

控制接口使用仅限本地所有者访问的 Unix 套接字。启用加密助记词后，矿池可启动于锁定状态：区块同步、仪表板和公共 API 保持可用，而支付和 ADM 通知将暂停，直至手动解锁。

## 监控与仪表板

本次发布新增了 `/api/health` 接口，用于无需密钥的外部监控，同时仪表板增加了支付锁定状态显示。现在支持按地址或名称过滤投票者和交易，且在信息可用时，地址下方将显示代理节点和投票者名称。数字排序修复、改进的区块链浏览器链接以及仪表板布局优化也一并包含在本次变更中。

## 运行时与升级说明

运行环境基线现为 Node.js 22.13.0+ 和 npm 10+。README、CONTRIBUTING 文件及仓库指南已更新，涵盖设置、迁移、密钥安全和贡献流程的指导。

升级前，请备份配置和奖励历史，审阅 `config.default.jsonc` 中的 MongoDB 设置，并在数据副本上测试 LowDB 到 MongoDB 的迁移。迁移后，验证待支付和已接收奖励总额，检查支付和维护钱包设置，构建并进行仪表板冒烟测试，检查 `/api/health` 接口。仅在确认启动日志和矿池状态正常后，再解锁支付功能。

发布与仓库地址：[github.com/Adamant-im/pool](https://github.com/Adamant-im/pool)
