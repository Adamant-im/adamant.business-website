---
title: "ADAMANT Explorer 安全与可靠性审查"
slug: "discussion-69-adamant-explorer-security-and-reliability-review-by-cryptofoundry-10464221"
description: "ADAMANT Explorer 已完成对其公共 HTTP 接口、ADAMANT Node 边界、Redis 缓存行为、Socket.IO 生命周期、反向代理信任及浏览器渲染的专项安全与可靠性审查。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/69"
publishedAt: "2026-07-20T20:32:14Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10464221"
locale: "zh"
placeholder: false
---

ADAMANT Explorer 已完成对其公共 HTTP 接口、ADAMANT Node 边界、Redis 缓存行为、Socket.IO 生命周期、反向代理信任及浏览器渲染的专项安全与可靠性审查。相关加固工作已合并至 [adamant-explorer#37](https://github.com/Adamant-im/adamant-explorer/pull/37)，并关闭了问题 [#23](https://github.com/Adamant-im/adamant-explorer/issues/23)、[#25](https://github.com/Adamant-im/adamant-explorer/issues/25) 和 [#33](https://github.com/Adamant-im/adamant-explorer/issues/33)。本次审查涵盖 Express 中间件顺序、公共 API 暴露、参数校验、速率限制、反向代理信任、将 ADAMANT Node 响应视为不可信数据边界、Redis 缓存正确性与故障行为、Socket.IO 轮询与重连、浏览器对 Node 及节点控制值的渲染、可选依赖故障、汇率连续性、运行健康状态上报以及仓库威胁建模。

## 公共 HTTP 与 API 边界

Explorer 现在仅暴露其 UI 所需的 12 条同源 API 路由，外加 `GET /api/networkHealth`。已移除 16 条旧版路由注册及通配符 CORS。请求在进入 Redis 查询或 ADAMANT 就绪检查之前，会先与精确的 API 接口进行比对，从而防止已移除的端点因陈旧的缓存条目而被重新激活。公共查询参数现在采用严格校验与有界分页。应用对每个客户端实施感知代理的进程内固定窗口速率限制，每分钟最多 300 次 API 请求，并配有有界的身份存储与溢出时拒绝服务的溢出桶。反向代理信任为显式配置并经过校验。安全响应头、受限的内容安全策略、稳定的错误响应、HTTP 超时以及数据最小化的请求日志，进一步缩小了暴露的攻击面。

## 可用性与状态正确性

`GET /api/networkHealth` 会报告一致的 `live`、`degraded`、`critical` 或 `unavailable` 状态，仅在无法生成一致的 Node 快照时才返回 HTTP `503`。Redis 及可选外部服务的故障不再影响核心 HTTP 与静态资源服务。缓存身份在需要时按区块敏感处理，汇率刷新路径保留可用的最近已知值，同时避免重叠刷新。Socket.IO 轮询被串行化、感知生命周期，并在上游故障时进行有界处理。生成追踪、显式的定时器所有权以及过期回调抑制，可防止已断开或已重启的命名空间继续执行过时的工作。

## 不可信数据与浏览器安全

ADAMANT Node 及节点负载在归一化或校验之前始终视为不可信。Network Monitor 的值以文本形式渲染，而路由目标、CSS 派生值及坐标在使用前均受到约束。前端与后端 API 路径现在共享单一事实来源，以防止契约漂移。

## 兼容性与集成影响

保留的 Explorer API 是 Web UI 的实现细节，并非通用集成 API。外部应用应使用 [adamant-api-jsclient](https://github.com/Adamant-im/adamant-api-jsclient) 进行直接的 ADAMANT Node 集成。运维人员可使用 `GET /api/networkHealth` 监控 Explorer。现有的前端路由与深度链接保持兼容。部署在反向代理后的实例必须配置 `trustedProxies` 以匹配实际拓扑。优先使用 HTTPS Node；为兼容性保留了一条旧版明文 HTTP 回退路径。

## 范围与后续工作

本次是对 Explorer 及其运行时信任边界的仓库代码与架构审计，而非密码学协议或区块链共识审计。速率限制器有意按进程实施，因此多副本部署还应在边缘层实施聚合限制。可查阅[仓库威胁模型](https://github.com/Adamant-im/adamant-explorer/blob/dev/adamant-explorer-threat-model.md)及完整的[安全与可靠性审查报告](https://github.com/Adamant-im/adamant-explorer/blob/dev/security_best_practices_report.md)。待跟进的开放事项包括[可选的节点 IP 隐私控制](https://github.com/Adamant-im/adamant-explorer/issues/20)、[前端主要依赖升级](https://github.com/Adamant-im/adamant-explorer/issues/34)、[ADAMANT Node 响应模式校验](https://github.com/Adamant-im/adamant-explorer/issues/35)以及[故障重试与日志合并](https://github.com/Adamant-im/adamant-explorer/issues/36)。
