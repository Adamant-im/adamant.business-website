---
title: "提案：为 ADAMANT TradeBot 开发现代化图形化 WebUI"
slug: "discussion-49-proposal-modern-graphical-webui-for-adamant-tradebot-private-self-host-public-subscription-10255630"
description: "当前 WebUI 以文本为主，本提案提出一种包含图表、订单簿、余额等的现代图形界面，并规定 WebUI 不得直连交易所。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/49"
publishedAt: "2026-06-14T12:09:51Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10255630"
locale: "zh"
placeholder: false
---

## 背景

当前的 WebUI 体验主要是基于文本的，依赖于类似消息应用的命令回复。本提案概述了一种现代化的图形界面，包含图表、订单簿、余额、未平仓订单、交易参数表单以及支持模块感知的控制面板。一个关键的架构规则是：WebUI 从不直接连接交易所；所有数据必须通过机器人 API 传输。

## 部署模式

提出两种部署模式。第一种是作为一次性购买提供的私有自托管 WebUI。在此模式下，运营商通过反向代理以 HTTPS 运行 WebUI。WebUI 维护一个机器人舰队注册表，在运营商登录后使用共享的 `private_webui_secret_key` 签发 JSON Web Token (JWT)，并支持本地用户和双因素身份验证。WebUI 服务器通过直接 HTTP 请求与每个机器人通信，访问 `/api/v1/*` 接口，从而允许单个 WebUI 地址通过标签页管理多个机器人。

第二种模式是公共订阅制 WebUI。用户通过外部支付和身份验证服务进行认证，然后在机器人配置中放置一个许可证令牌。机器人将建立到公共中继服务器的出站连接，从而无需开放入站机器人端口。浏览器请求通过公共 WebUI 和中继，经由一对一 API 隧道转发至机器人。许可证的作用范围限制为每个许可证对应一个交易所和一个交易对。

## 最小可行产品范围

最小可行产品（MVP）优先考虑私有自托管场景。它涉及使用 Vite 和 React 18 构建一个新技术栈，不再支持旧版 WebUI。实现包括一个传输抽象层，初始实现为 `DirectHttpTransport`，后续将加入 `RelayWsTransport`。UI 通过 `GET /bot` 请求启动，机器人的能力决定了可见的 UI 模块。参数通过 WebSocket 的 `params:updated` 事件与 REST 一起管理。市场和账户数据依赖于 REST 轮询，初始轮询间隔约为 10 秒，后续计划从机器人缓存中主动推送数据。

## 非目标

本次讨论明确不包括支付和计费的实现细节，也不涉及机器人 API 设计，后者将在另一场讨论中涵盖。将在 `adamant-tradebot-webui` 仓库中创建一个跟踪议题，引用本提案。
