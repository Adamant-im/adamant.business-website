---
title: "ADAMANT Node v0.11.1：安全加固、加密锻造与文档整合"
slug: "discussion-84-adamant-node-v0-11-1-security-hardening-encrypted-forging-and-consolidated-docs-11400159"
description: "ADAMANT Node v0.11.1 是针对节点运营商、受托人、矿池运营商、浏览器、信使及其他与 ADAMANT 节点通信的服务所发布的重要安全与可靠性更新。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/84"
publishedAt: "2026-11-25T19:56:21Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "ADM Nodes, Delegates & Pools"
cardSpan: "half"
originalId: "github-discussion:11400159"
locale: "zh"
placeholder: false
---

ADAMANT Node v0.11.1 是针对节点运营商、受托人、矿池运营商、浏览器、信使及其他与 ADAMANT 节点通信的服务所发布的重要安全与可靠性更新。这是 v0.11 系列的第一个标记版本；v0.11.0 已合并至 `master` 分支但未打标签，因此运行 `master` 分支的运营商也应进行升级。

强烈建议进行升级。本次更新不涉及共识分叉，也没有新的 SQL 迁移：序列化、签名、受托人排序、奖励、费用、激活高度以及插槽时序均与 v0.10.2 保持一致。然而，由于 HTTP API 和运行时环境存在破坏性变更，运营商在操作前应阅读升级指南。

## 升级前须知

现在要求使用 Node.js 22.22.2+（22.x 版本）或 24.15.0+。旧版的锻造和 DApp 运行时控制 API 已被完全移除 (GHSA-vjhq-r5fg-85cx)。现在锻造通过 `config.json` 中的 `forging.secret` 进行配置；只读 DApp API 和 DApp 交易类型不受影响。针对状态、聊天和聊天室的过滤器现在更加严格：`and:` 过滤器可按预期工作，而 `or:`、拼写错误以及不支持的参数将被拒绝，不再被静默忽略。`keysIds` 参数已重命名为 `keyIds`。速率限制默认开启；旧版 `config.json` 中的 `max: 0` 限制块会保持禁用限制，请移除它们以采用新的默认设置。

## 安全与加固

服务端 DApp 执行接口和 HTTP 锻造控制已被彻底移除而非修补，从而显著减少了攻击面。

`forging.secret` 中的受托人密码短语现在可选择使用 AES-256-GCM 和 scrypt 密钥派生算法，通过操作员密码进行加密。节点在锁定状态下仍可继续同步和提供 API 服务，锻造功能可通过 `adm-node` CLI 在本地解锁。明文配置仍然有效。更新中包含了用于监控锁定状态和受托人产出的 Zabbix 模板。

针对公共 REST、对等节点 HTTP 和 WebSocket 流量增加了防滥用速率限制，并统一返回 `429` 响应。在混合版本发布过渡期内，不带新速率限制头的 `/peer/*` 请求不会被限流，任何调用者均可省略该头。建议运营商在节点内强制执行机制被追踪并实现之前，在反向代理或防火墙层为 `/peer/*` 添加限制。

安装和修复脚本更加安全：快照校验和已通过验证，PM2 和 systemd 的关闭设置更加平滑，同步中的节点除非强制要求，否则不会重启。依赖项已刷新，CI 中强制执行 7 天的发布期隔离，且不存在中等或更高级别的审计发现。

## 可靠性与网络

节点现在可在数据库重启后恢复 PostgreSQL 连接，而不会陷入卡死状态。对等节点健康检查和响应大小受到限制，并针对不可达节点引入了退避和驱逐机制。修复了对等节点轮换以及 v0.11.0 中导致无法建立出站连接的 WebSocket 回归问题。轮次结算受高度限制，奖励回滚按受托人对齐；重放和恢复在主网和测试网上产生了相同的状态。一个独立的回滚问题仍处于开启状态。更快的内存检查点保护查询和更新后的种子节点进一步提升了可靠性。

## API 与文档

`and:` 过滤器现在可以正确处理 `toHeight` 以及组合的发送者/接收者条件。文档和 OpenAPI 3.2 规范现已移至节点仓库中，确保代码、架构和文档同步更新。API 架构发布在 https://docs.adamant.im/schema/。API 客户端和工具的维护者今后应从节点仓库的 `openapi/` 目录获取 OpenAPI 源文件。

## 如何升级

将 Node.js 更新至支持的版本，然后平滑停止节点并等待出现 `Cleaned up successfully` 字样——切勿使用 `kill -9`。检出 v0.11.1 并运行 `npm ci --omit=dev`。检查 `config.json` 中的速率限制块、`trustProxy` 以及任何调用已移除端点的自动化脚本。启动节点；若使用加密密码短语，请在每次重启后运行 `npm run adm-node -- forging unlock`。验证 `/api/node/status`、同步进度、对等节点连接及锻造状态。

在发布前，v0.11.0 已在运行四个受托人且使用加密密码短语的主网节点上运行超过 16 小时：共锻造 471 个区块，重启后无任何遗漏。发现的唯一一个版本特定问题（出站 WebSocket 回归）已在 v0.11.1 中修复。
