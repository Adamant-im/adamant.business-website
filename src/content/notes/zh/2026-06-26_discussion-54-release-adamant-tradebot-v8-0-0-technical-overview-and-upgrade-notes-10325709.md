---
title: "发布：adamant-tradebot v8.0.0 — 技术概览与升级说明"
slug: "discussion-54-release-adamant-tradebot-v8-0-0-technical-overview-and-upgrade-notes-10325709"
description: "ADAMANT 开源做市机器人 v8.0.0 已发布，带来架构优化、数据库迁移、可选 WebUI API 及交换连接器更新，提升稳定性与可维护性。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/54"
publishedAt: "2026-06-26T16:06:12Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10325709"
locale: "zh"
placeholder: false
---

## 摘要

ADAMANT Tradebot v8.0.0 现已发布至 `dev` 分支，并标记为 v8.0.0。此次开源（基础版）做市机器人的重大升级，将 OSS 代码库与当前 Premium 版工程基线对齐，同时保持开源范围不变：以 REST 优先、专注现货交易，且未重新引入仅限 Premium 的模块。如果您正在为已上线代币运行该机器人，实际效果是运行更可靠，启动更清晰，现有数据库升级更安全，交易所连接器更新，并可选用于外部客户端的私有 WebUI API。

## 架构

`app.js` 中的启动流程现在更加明确且有序。它会等待 MongoDB 连接和 `db.ready`，运行已注册的数据库迁移，初始化服务（如 ADM 套接字/轮询和可选的 WebUI API），预热连接器元数据，最后启动活跃的 `mm_*` 交易模块。这减少了冷启动时的竞争条件，使升级更安全。

原先单一的 `modules/commandTxs.js` 已拆分为 `modules/commands/` 下的专用处理器（account、orders、trade、info、features），并共享底层逻辑。命令仍通过 ADAMANT Messenger 和（如已配置的）Telegram 到达，但代码路径更易于维护。旧版 ADM 输入模块已被 `adamantApi.js`、`admTxChecker.js` 和 `admTxParser.js` 取代，使命令接收机制与 `adamant-api` 3.x 及当前的套接字/轮询模式保持一致。

数据库迁移通过 `modules/dbMigrations.js` 在启动时一次性运行。首个包含的迁移会安全地将旧订单字段 `type` 重命名为 `side`。现有部署应在首次 v8 启动前备份 MongoDB，迁移后验证未完成订单和统计数据。

## 可选 WebUI API（Bot API v1）

v8.0 随附一个位于 `api/` 目录的私有 HTTP API。它使用 Fastify HTTP 服务器，支持 JWT 认证、Zod 请求验证和 Socket.IO 传输钩子。`/api/v1` 下的核心路由包括 capabilities bootstrap、market、account、params、commands 和 messages。该 API 为可选功能，默认关闭，专为自托管图形客户端设计，同时确保机器人仍是唯一与交易所通信的组件。可通过配置中的 `private_webui` 设置启用。请设置强 `private_webui_secret_key`，限制 `private_webui_allowed_ips`，除非您明确知道自己在做什么，否则不要将 API 暴露在公共互联网上。

## 交易所连接器

基础版支持的连接器包括 Azbit、P2PB2B、StakeCube、Coinstore、FameEX（通过新的 FameEXnet 连接器）和 NonKYC。操作者请注意以下不兼容变更：FameEX API 需要切换配置至 FameEXnet，XeggeX 已从 OSS 中移除。做市模块与交易适配器一同进行了更新。

## 依赖项与升级指南

值得注意的运行时更新包括 `adamant-api` 3.x、`mongodb` 7，以及新增的 `zod`、`fast-jwt` 和 `json-parse-bigint`。WebUI 路径中已移除 Express。从 v7.x 升级时，请停止机器人，拉取最新代码并安装依赖项：

```bash
pm2 stop tradebot
cd adamant-tradebot
git pull
npm i
```

确保已安装 Node.js 22.2+。将 `config.default.jsonc` 中的新字段合并到您的 `config.jsonc` 中，确认 FameEXnet 连接器设置，并备份 MongoDB 数据库以便在首次启动时运行迁移。如果启用了 WebUI API，请检查其安全设置。最后，使用您的进程管理器重启机器人。命名配置仍可正常工作。

## OSS 范围边界

v8.0 将 Premium 版级别的工程品质带入了 OSS 代码树，而未重新引入仅限 Premium 的假设。现货、REST 优先的基线得以保留，不强制使用 WebSocket 交易所连接器，无永续/期货栈，也未扩展交易所目录。
