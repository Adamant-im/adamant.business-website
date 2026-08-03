---
title: "ADAMANT Explorer v2.0.0：Vue 3、强化 API 边界与弹性实时监控"
slug: "discussion-71-adamant-explorer-v2-0-0-vue-3-hardened-api-boundaries-and-resilient-live-monitoring-10539851"
description: "ADAMANT Explorer v2.0.0 是自 v1.3.0 以来的首个稳定版本，整合了 218 次提交和 491 个文件变更，在前端、后端、实时监控、安全性和运维方面进行了重大更新。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/71"
publishedAt: "2026-08-02T13:46:45Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10539851"
locale: "zh"
placeholder: false
---

ADAMANT Explorer v2.0.0 是自 v1.3.0 以来的首个稳定版本，整合了 218 次提交和 491 个文件变更，在前端、后端、实时监控、安全性和运维方面进行了重大更新，同时保留了现有的公共路由和深度链接。

## 前端架构

原有的 AngularJS、Bootstrap 3 和 Webpack 应用已被替换为 Vue 3 单文件组件、用于共享网络状态的 Pinia、具备 URL 兼容性的 Vue Router 5 以及用于构建的 Vite 8。与框架无关的工具函数位于 `src/lib/` 中，可直接在 Node.js 中进行测试。

所有主要视图均已重构：首页、区块、交易、地址、受托人、账户排名、预留钱包、受托人监控、网络监控和活动图表。UI 现在支持持久化的浅色和深色主题、响应式表格和交易卡片、无障碍控件、确定性交易排序，以及在涉及账本准确性时提供全精度的 ADM 展示。

## ADAMANT 节点与 API 边界

所有与 ADAMANT 节点的交互现在都通过专用请求适配器层中的 `adamant-api` 3.1.0 进行。后端增加了启动就绪检查、节点故障转移、标准化的 SDK 错误处理、边界分页、严格的路由/查询验证，以及独立的请求、标准化和响应组装层。

Explorer 仅暴露 UI 所需的 12 个同源路由以及 `GET /api/networkHealth`。移除了 16 个不受支持的遗留端点、任意交易过滤器透传、通配符 CORS 以及过时的 Market Watcher 路由。此缩减后的接口是 Explorer UI 的实现边界，而非通用公共 API。外部应用应使用 `adamant-api-jsclient`。运维监控可使用 `GET /api/networkHealth`，它会报告 `live`（正常）、`degraded`（降级）、`critical`（严重）或 `unavailable`（不可用）状态。

## 实时监控与缓存一致性

四个公共 Socket.IO 命名空间（Header、受托人监控、网络监控和活动图表）现在使用序列化轮询、生命周期生成、边界重试和陈旧回调保护机制。开放的首页和区块视图采用了基于区块触发的刷新，取代了固定的刷新延迟。REST 数据填充和边界确认机制补充了 WebSocket 的区块通知。受托人计划、锻造状态、奖励、费用和轮次边界计算现已趋于稳定，并支持连贯的滚动区块和节点统计信息以及可选的 Redis 持久化。缓存标识可正确处理新区块和相同高度的分叉替换。

GeoJS 节点地理位置信息通过缓存标准化和仅主机名降级进行限制。经过验证、缓存、超时限制且按 IP 限流的 OpenStreetMap 切片代理支持 clearnet 和 Tor 部署。Redis 依然是响应缓存和持久化统计信息的推荐方案，但 Redis 故障不再导致核心 HTTP 或静态服务中断。

## 安全与隐私加固

公共请求和浏览器边界现在包括在缓存和 ADAMANT 就绪检查之前的精确 API 表面强制执行、针对地址、uint64 标识符、分页、路由、方法和过滤器的严格验证，以及带有代理感知客户端标识和故障关闭溢出桶的进程内固定窗口 API 限流器。应用了安全标头、受限的内容安全策略 (CSP)、稳定的公共错误提示、明确的 HTTP 超时以及最小化查询字符串的访问日志。来自节点和对等节点的网络监控值仅以文本形式渲染并经过验证。针对 Redis、Node、汇率、地理位置和切片提供商的故障实现了优雅降级。

该存储库包含版本化的威胁模型以及安全性和可靠性审查。安全性已由 cryptofoundry 审计。

## 运行时与部署变更

从 v1.3.0 升级的运维人员请注意，系统要求 Node.js `^22.18.0 || >=24.11.0`，且配置的 ADAMANT 节点必须运行 v0.10.2 或更高版本。应根据 `config.default.jsonc` 准备新的 `config.jsonc`，并注意 `nodes_adm`、`trustedProxies`、`redis`、`geoLocation`、`exchangeRates` 和 `log_level` 等配置项。Freegeoip 已被可选的 GeoJS 集成所取代；禁用地理位置功能将保留对等节点和主机名数据，但不再使用提供商提供的地图数据。反向代理和防火墙必须允许同源的 `/osm-tiles/` 路径。生成的 `public/` 资源不会被提交，必须在部署期间使用 `npm run build` 进行构建。`npm run dev` 同时启动后端和 Vite；`npm run dev:frontend` 仅启动 Vite。

## 验证

发布的源代码树通过了 ESLint 和 Prettier 检查、包含 6,337 个转换模块的生产环境构建、226 个仅限 Node.js 的单元测试、41 个实时 ADAMANT 测试网 API 测试，以及完整和仅生产环境的依赖审计，未报告任何漏洞。在桌面、平板电脑和移动设备分辨率下对 13 条路由进行的浏览器冒烟测试未产生任何控制台错误或水平溢出。

完整版本可在 [GitHub Releases](https://github.com/Adamant-im/adamant-explorer/releases/tag/2.0.0) 获取。
