---
title: "提议：为 TradeBot 提供可选的第三方 HTTP API"
slug: "discussion-48-proposal-optional-third-party-http-api-for-tradebot-webui-and-similar-clients-10255629"
description: "该提议引入可选的 Bot API v1，允许外部客户端（如图形化 WebUI）在无需依赖 ADAMANT Messenger 或 Telegram 的情况下监控和控制交易机器人。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/48"
publishedAt: "2026-06-14T12:09:43Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10255629"
locale: "zh"
placeholder: false
---

该提议引入可选的 Bot API v1，允许外部客户端（例如图形化 WebUI）在无需依赖 ADAMANT Messenger 或 Telegram 的情况下监控和控制交易机器人。在此架构中，WebUI 仅与机器人 API 通信，确保机器人始终是市场数据（ticker、订单簿、交易、OHLC）、账户状态、交易参数和命令执行的唯一真实数据源。

该 API 旨在为机器人提供一个可选的入站 HTTP 和 WebSocket 接口，通过配置中的 `private_webui` 端口实现。认证将通过 JWT 完成，由机器人使用 `private_webui_secret_key` 进行验证，而用户账户将保留在外部客户端中。API 将暴露用于市场、账户和参数数据的结构化 JSON 端点，以及命令封装器。`GET /bot` 端点将作为引导入口，返回已安装的 `mm_*.js` 模块和交易所功能标志等能力信息。对于实时交易参数更改，将提供 WebSocket `params:updated` 事件。传输模式最初将支持用于自托管客户端的 `directHttp`，后续计划增加用于订阅托管的 `relayWs`。

本次讨论不涉及支付、账单或许可证 UI，也不包含具体的 WebUI 实现细节。我们邀请社区就以下问题提供反馈：该 API 是否应作为可选模块纳入开源的 `adamant-tradebot` 仓库；除信使命令外，最小可用客户端还需要哪些端点；在 v1 版本中，市场和账户数据更倾向于使用轮询（polling）还是推送（push）。将在 `adamant-tradebot` 中创建一个跟踪议题以引用本次讨论。目前，高级参考实现正在 `adamant-tradebot-me` 分支 `refactor/new-webui-api` 上进行中。
