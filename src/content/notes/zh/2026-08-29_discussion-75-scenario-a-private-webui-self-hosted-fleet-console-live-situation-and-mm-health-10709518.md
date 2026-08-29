---
title: "私有 WebUI：ADAMANT 做市软件的自托管集群控制台"
slug: "discussion-75-scenario-a-private-webui-self-hosted-fleet-console-live-situation-and-mm-health-10709518"
description: "本文是私有自托管 WebUI 方案 A 的进度更新，该方案为 ADAMANT 做市软件实例集群提供单一操作控制台。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/75"
publishedAt: "2026-08-29T09:35:34Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10709518"
locale: "zh"
placeholder: false
---

## 背景

本文是**方案 A**（私有自托管 WebUI）的进度更新：为一组 ADAMANT 做市软件实例提供单一操作控制台。方案 B（公共订阅式 WebUI、出站中继、许可证令牌）不在此次讨论范围内。

操作员需遵循的一项核心架构规则是：浏览器和 WebUI 后端绝不直接与交易所通信。图表、订单簿、余额、参数和指令均通过各机器人的 `/api/v1` 接口传输。交易所 API 密钥始终保留在机器人端。

## 当前可用的功能

本地 WebUI 进程（Vite UI + Fastify BFF）可连接到一个或多个启用了 `private_webui` 并共享 HMAC 密钥的机器人。您可以通过 URL 添加每个机器人。集群注册表存储在 WebUI 中，而非机器人中。操作员账户、双重身份验证 (2FA) 和角色管理均在 WebUI 上进行，机器人仅验证包含 `{ login, role }` 的签名 JWT。

![WebUI 登录](/images/engineering-notes/github/discussions/10709518/001-65a9054569.webp)

*登录界面。操作员凭据存储在 WebUI 上（电子邮件 / ADM / ETH + 强制 2FA）。每个机器人仅检查签名 JWT，机器人端不提供登录接口。*

## 集群标签页与市场工作台

顶部标签页代表每个机器人。状态圆点来自经过 JWT 认证的 `GET /api/v1/status` 接口，报告 `working`（运行中）、`degraded`（降级）或 `stopped`（已停止）状态，而非来自公共存活探针。公共 `GET /api/v1/health` 接口仅返回 `{ status, transport }`，以确保可访问的绑定地址不会泄露做市 (MM) 的质量信息。

**市场 (Market)** 视图提供叠加了机器人订单的 K 线图、包含价差的实时订单簿、24 小时波动范围和成交量、以代币和美元计价的配对库存，以及手动限价下单功能。点击订单簿行即可自动填充方向、价格和数量。取消订单时会发送 `{ id, market, side }`，若交易所已处理该订单，则会移除对应行。

![市场工作台](/images/engineering-notes/github/discussions/10709518/002-04f3b72fdc.webp)

*市场界面。BiFinance 上 `PENGUIN/USDT` 的 K 线图、订单簿、美元库存及下单功能，这是多机器人集群中的一个标签页。*

## 参数与实时状态

**参数 (Parameters)** 页面展示完整的 `WebUiTradeParams` 表单：包含一个总做市开关以及跟随机器人 `capabilities` 的分组（缺失 `trade/mm_*.js` 模块的组将保持锁定）。流动性、价格监控、阶梯订单、成交量交易、模拟提示及其他设置均可通过 `PUT /params` 进行编辑，并通过 Socket.IO 的 `params:updated` 事件实时更新。

**实时状态 (Live situation)** 在浏览器中显示 12 小时的时间轴：库存（基础币种 + 计价币种美元价值）以及按用途分类的挂单名义价值。只要机器人保持连接，柱状图就会持续填充。黄色小时框表示该时段处于 `degraded`（降级）状态；灰色表示做市已 `stopped`（停止）。框架紧贴柱状图，而非覆盖整个图表高度。

在机器人端，做市质量采样在 `trade/mm_*.js` 之外进行。调用 `/start`（或 PUT 开启做市）时会标记相等的 `mm_generalInitTs` 和 `mm_generalRestartTs`。若进程在做市开启状态下重启，则初始化时间保持不变，但重启时间会更新，从而区分正常启动与崩溃重启。

![参数与实时状态](/images/engineering-notes/github/discussions/10709518/003-5723175f10.webp)

*参数界面。包含总做市开关、12 小时实时状态（库存和挂单美元价值）、流动性、价格监控和阶梯订单等。当机器人版本中不包含相应模块时，对应分组将锁定。*

## 指令与审计追踪

**指令 (Commands)** 封装了与 Messenger 和 CLI 相同的处理程序：fill（成交）、close（平仓）、make-price（定价）、TWAP、transfer（转账）、withdraw（提现）及查询。具有破坏性的 POST 操作需要确认。右侧控制台显示机器人的 Markdown 动态（余额、取消记录、纪元重置）。

**事件 (Events)** 是存储在 SQLite 中的 WebUI 审计日志，记录了谁进行了何种更改（`admin@…` 与 `bot`），涵盖参数和指令，并支持搜索、过滤和 JSON 导出。

![指令控制台](/images/engineering-notes/github/discussions/10709518/004-2adccfacb9.webp)

*指令界面。包含 fill / close / make-price 表单及实时控制台，指令集与 ADAMANT Messenger 和 CLI 一致，专为工作台设计。*

![事件审计](/images/engineering-notes/github/discussions/10709518/005-9665688ad1.webp)

*事件界面。带有时间戳的参数切换和指令载荷，并归因于操作员或机器人。*

## 给操作员的合约说明

`GET /health` 接口无需 JWT，仅返回 `{ status, transport }`，且仍受 `private_webui_bind_host` 和白名单限制。经过 JWT 认证的 `GET /status` 返回 `mmActive`、`mmState`、可选的初始化和重启时间戳、宽限期及降级原因。`GET /params` 提供完整快照；`PUT /params` 仅应用已更改的切片，以防无关模块被重新启用。`POST /commands/cancel` 接受可选的 `side` 字段（`buy` 或 `sell`）。关于角色，`read-only` JWT 无法执行写入操作，而没有 `role` 字段的令牌保留旧有的完全访问权限。不具备 `/status` 接口的旧版机器人仍会显示在集群中，WebUI 将回退至使用完整的 `/health` 载荷。

## 本次更新未包含的内容

方案 B（中继、支付会话、许可证范围）未包含在内。行情、订单簿和余额数据仍使用约 10 秒间隔的 REST 轮询，而非 WebSocket 推送。浏览器和 WebUI 不直接与交易所通信。
