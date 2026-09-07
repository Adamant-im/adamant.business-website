---
title: "场景 A-3：ADAMANT TradeBot 私有 WebUI 的操作员仪表板、安全事件及集群优化"
slug: "discussion-77-progress-scenario-a-3-operator-dashboard-safety-events-config-and-fleet-polish-in-the-priv-10761303"
description: "这是 ADAMANT TradeBot 场景 A（私有自托管 WebUI，directHttp 传输）的进度更新。WebUI 不直接连接交易所；所有市场、账户及参数数据均来自机器人 API。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/77"
publishedAt: "2026-09-06T18:53:34Z"
author: "massivedev0"
authorUrl: "https://github.com/massivedev0"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10761303"
locale: "zh"
placeholder: false
---

这是 ADAMANT TradeBot 场景 A（私有自托管 WebUI，`directHttp` 传输）的进度更新。WebUI 不会直接连接交易所；所有市场、账户和参数数据均通过机器人的 `/api/v1` API 进行传输。

在选择机器人标签页后，每个机器人专属的“仪表板”（Dashboard）现在是主要的落地页面。它通过 `GET /api/v1/status` 提供交易对、交易所和做市状态的概览，并显示 24 小时的价格和成交量。功能版本标识（feature edition badge）根据已安装的机器人功能而非当前启用的模块得出。仪表板包含一个带有实时 K 线形成的价格图表、颜色编码的模块网格、交易参数摘要，以及包含未结订单的结构化余额信息。启动做市（MM）时不再发送策略覆盖指令，从而允许机器人保持其当前策略。

![操作员仪表板：MM 状态、功能版本、模块网格、参数摘要及紧凑图表](/images/engineering-notes/github/discussions/10761303/001-32674fae63.webp)

市场视图得到了优化，包括 OHLC 图表上的实时 K 线形成、订单簿上的机器人订单标记以及未结订单叠加层。取消操作会发送 `{ id, market, side }`，对于操作员而言，已消失的订单将被视为成功处理。

![市场标签页：未结订单、带价差的订单簿、买入/卖出表单、余额](/images/engineering-notes/github/discussions/10761303/002-47dd4a54b7.webp)

“参数”（Parameters）视图现在包含一个 12 小时的实时状态条，以操作员的时区显示库存 USD 组合及按用途分类的未结订单名义价值。本地健康历史记录中的小时帧指示了系统降级或停止运行的时段。当机器人因安全原因自动停止做市或暂停阶梯交易时，WebUI 会根据机器人通知文本弹出对话框，并反映当前的紧急状态。

![参数：主 MM 开关、12 小时实时状态、流动性及价格监控组](/images/engineering-notes/github/discussions/10761303/003-bfb5b261fd.webp)

“事件”（Events）面板提供参数变更审计日志，包含变更时的余额快照、安全标识，并支持直接从安全事件行执行恢复阶梯交易的操作。

![事件：包含安全自动停止和余额上下文的参数审计追踪](/images/engineering-notes/github/discussions/10761303/004-241365a624.webp)

管理员“配置”（Config）视图以等高布局显示运行时健康状况、交易对元数据和实时交易参数树。它提供脱敏后的 `config.json` 摘要和原始 JSON 标签页，且不会泄露任何密钥。

![配置：运行时健康、交易对元数据、实时交易参数树、配置摘要](/images/engineering-notes/github/discussions/10761303/005-271ca78365.webp)

集群 Shell 改进包括“标签”（Label）和“账户”（Account）的可编辑注册表字段，页眉标签页会显示这些信息。保持连接（Keep-alive）面板现在可以在切换机器人标签页时保持存活，通过读取冻结的 Redux 快照而非折叠为空状态。

此次更新将 WebUI 从信使风格的界面转变为包含图表、模块和参数的持久化仪表板。安全事件现在包含余额上下文和恢复操作，取代了此前关于做市停止原因的猜测。支持保持连接面板的多机器人标签页和集群概览，避免了切换机器人时上下文丢失的问题。管理员配置视图展示了运行时健康状况和脱敏后的配置快照。做市质量点（`working`、`degraded`、`stopped`）根据 `/status` 派生，并在启动后有 10 分钟的宽限期。系统保持完全自托管：WebUI 位于反向代理之后，机器人运行在操作员的基础设施上，WebUI 中不存储任何交易所 API 密钥，且强制要求双重身份验证（2FA）。

技术栈包括使用 Vite、React 18、Chakra UI、Fastify BFF 和 SQLite 事件日志构建的 WebUI v0.2.0。机器人暴露了如 `GET /api/v1/bot`、`/status`、`/params` 和 `/account/*` 等端点，以及 `params:updated` WebSocket。传输限制为 `DirectHttpTransport`。场景 A 私有自托管已达到 MVP 范围的功能完整性。后续工作将聚焦于场景 B，即通过出站中继和许可证令牌实现的公共订阅制 WebUI。
