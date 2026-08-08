---
title: "ADAMANT Notification Service v0.5.0 — .NET 8 现代化升级、可靠性与隐私修复"
slug: "discussion-73-adamant-notification-service-v0-5-0-net-8-modernization-reliability-and-privacy-fixes-10570181"
description: "ADAMANT Notification Service (ANS) 为 ADAMANT iOS 应用提供 Apple 推送通知，且确保 ANS 或 Apple 均无法获知通信双方身份。v0.5.0 是该服务自 2019 年以来的首个正式版本。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/73"
publishedAt: "2026-08-07T14:06:51Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10570181"
locale: "zh"
placeholder: false
---

[ADAMANT Notification Service (ANS)](https://github.com/Adamant-im/adamant-notificationService) 为 ADAMANT iOS 应用提供 Apple 推送通知，且确保 ANS 或 Apple 均无法获知通信双方身份。版本 [v0.5.0](https://github.com/Adamant-im/adamant-notificationService/releases/tag/v0.5.0) 是该项目自 2019 年发布 0.4.1 版本以来的首个标记版本。

本次更新并非重写。鉴于 ANS 未来将由 [adamant-ns](https://github.com/Adamant-im/adamant-ns) 取代，本次工作的目标非常明确：移除已停止支持（EOL）的依赖项，并修复导致生产环境故障的 Bug，同时保持架构和隐私模型不变。

## 运行时环境

该服务已将所有项目从 `netcoreapp3.0`（已于 2020 年停止支持）迁移至 **.NET 8 LTS**。此举解决了在 Ubuntu 22.04+ 上部署时，无需依赖 EOL 库容器即可维持旧运行时环境的问题。

## 套接字泄漏

原 API 客户端在每次请求时都会分配一个新的 `HttpClient` 且从不释放。在生产环境中，这表现为处于 `CLOSE-WAIT` 状态的套接字持续增加——经确认，运行中的实例每分钟约产生 30 多个文件描述符泄漏。当达到一定阈值后，会导致整个进程的 DNS 解析功能失效。目前已改为使用单一的共享复用客户端。

## 故障转移

节点选择逻辑此前仅随机选择一个已配置的节点且从不重试。该节点发生的任何错误（包括瞬时错误）都会导致整个服务崩溃。现在，服务在放弃前会尝试连接其他节点，且当所有已配置节点均发生故障时，系统会选择“跳过当前周期”而非直接崩溃。

## EF Core 提供程序切换

原计划保持 EF Core 不变，仅提升应用的框架目标。对于 ORM 核心而言，此方案可行（EF Core 2.2 目标为 `netstandard2.0`，因此仍可在 .NET 8 下编译），但 MySQL 提供程序 (`MySql.Data.EntityFrameworkCore`) 却无法运行：在执行第一个查询时即抛出 `AmbiguousMatchException`。该问题在进入生产环境前被基于 SQLite 的冒烟测试捕获。目前已替换为 `Pomelo.EntityFrameworkCore.MySql`，这是目前 .NET 生态系统中标准化且维护活跃的提供程序。

## 隐私修复

此前有三处日志记录了敏感数据：每次成功推送时的设备令牌、解析失败时包含设备令牌的*解密后*信号负载，以及加载失败时的 APNs 证书密码。这三处均违反了项目既定的隐私规则，现已全部移除。

## 其他生产环境修复

在上述更新完成后，我们在生产运行中发现并修复了其他问题：一个可能导致两个工作进程在无头服务器上无法启动的 `~` 路径扩展 Bug；一个可能导致网络抖动后向所有已注册设备突发推送旧交易通知的启动边界情况；一个节点选择在高并发下的线程安全问题；缺失的 HTTP 超时设置；以及针对特定格式错误的 APNs 响应产生的空引用异常。

## 优雅停机

由于此前工作进程未处理 `SIGTERM` 信号，常规的 `docker stop` 或 `systemctl restart` 操作在日志中总是显示为崩溃。现在，进程可以正常优雅地关闭。

## 测试与版本追踪

测试覆盖率从最初的寥寥数个增加到 35 个，其中包括上述提到的 EF Core/SQLite 冒烟测试。构建版本现在也具备了真实的版本号——此前无论项目文件如何声明，每个构建版本在发布时均默认为 `1.0.0.0`。

## 安全性

安全性已由 [cryptofoundry](https://adamant.business#contact) 完成审计。

## 相关链接

- [发布说明](https://github.com/Adamant-im/adamant-notificationService/releases/tag/v0.5.0)
- [完整差异对比，0.4.1 → v0.5.0](https://github.com/Adamant-im/adamant-notificationService/compare/0.4.1...v0.5.0)
- [追踪议题](https://github.com/Adamant-im/adamant-notificationService/issues/12)
- [代码仓库](https://github.com/Adamant-im/adamant-notificationService)
