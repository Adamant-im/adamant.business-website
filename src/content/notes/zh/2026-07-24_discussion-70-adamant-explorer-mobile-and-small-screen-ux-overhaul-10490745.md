---
title: "ADAMANT Explorer：移动端与小屏用户体验优化"
slug: "discussion-70-adamant-explorer-mobile-and-small-screen-ux-overhaul-10490745"
description: "ADAMANT Explorer 对移动端和小屏显示进行了重点优化，确保区块链数据（表格、地址、监控器、节点地图及网络图表）在手机和窄视口下依然保持良好的可读性与可用性。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/70"
publishedAt: "2026-07-24T15:52:32Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10490745"
locale: "zh"
placeholder: false
---

ADAMANT Explorer 对移动端和小屏显示进行了重点优化，确保在 Vue 重构后，区块链数据（表格、地址、监控器、节点地图及网络图表）在手机和窄视口下依然保持良好的可读性与可用性。该工作已合并至 Adamant-im/adamant-explorer#42 的 `dev` 分支，解决了显示/移动端 UX 以及 WebSocket 区块确认冗余信息的问题，并修复了 iOS 聚焦缩放的后续问题。

![首页 — 最新操作](/images/engineering-notes/github/discussions/10490745/001-7b8f5a7ef4.webp)

![交易详情](/images/engineering-notes/github/discussions/10490745/002-95436bddca.webp)

![地址摘要](/images/engineering-notes/github/discussions/10490745/003-7f8d8ca009.webp)

![区块详情](/images/engineering-notes/github/discussions/10490745/004-b4abc82ab8.webp)

![代表监控器](/images/engineering-notes/github/discussions/10490745/005-d25c6a646f.webp)

![网络监控器](/images/engineering-notes/github/discussions/10490745/006-864cc5422f.webp)

## 界面变更概览

全局搜索栏已从折叠菜单移出，置于顶部导航栏（位于 Logo 与菜单切换按钮之间），在小屏上会自动收缩，同时网络状态栏保持舒适的嵌入式显示。在首页，原先拥挤的表格回退方案已被操作卡片取代。区块、交易及地址页面现在在移动端使用紧凑的可滚动交易表格；区块列表增加了 `TXS` 计数列，交易页面隐藏了重复的账本行。代表监控器、网络监控器节点、顶级账户和预留钱包均采用了 `.table-mobile` 卡片回退方案、移动端排序控件并优化了 ARIA 支持。自定义工具提示现支持点击关闭，确保触控设备不会出现工具提示卡死的情况，搜索框也不再触发 Safari 的聚焦缩放与滚动。

## 实现说明

布局由两个结构断点驱动。在宽度 `<=720px` 时，数据表格会折叠为卡片或紧凑的滚动表格；在 `<=420px` 时，这些卡片会垂直重排。`720px` 以上的桌面端和平板布局保持不变。

每个首页行现在都是一个 CSS-grid 卡片。在 `<=720px` 时，路由显示为单行 `发送者 -> 接收者  金额  打开`；在 `<=420px` 时，它会重排为居中的向下箭头，金额显示在侧面，发送者和接收者水平居中。导航和工具提示仅绑定到明确的“打开”控件，而非整个卡片。

区块和地址交易列表在移动端仍保持为真实表格——在容器内可水平滚动，并采用固定的紧凑列集（类型、ID、发送者、接收者、金额；地址页面额外包含日期），且每行不再显示复制按钮。区块列表在移动端取消了排序功能。

此前存在一个影响摘要数值的细微换行错误：即使有剩余空间，地址和交易 ID 也会在末尾多出一个字符时发生断行。根本原因是 `flex` 项目设置了 `min-width: 0` 和 `overflow-wrap: anywhere`，导致其折叠至 1 字符的最小内容贡献，从而被复制按钮的宽度强制换行。现在数值会扩展以填满单元格（`flex: 1`），使地址和交易 ID 保持单行显示，同时公钥仍能正常换行。

单一的全局工具提示仅在可见时支持指针交互，并在 `pointerdown` 事件触发时隐藏，从而确保在自动隐藏计时器不可靠的触控设备上也能正常退出。针对 iOS，Mobile Safari 会对字体小于 16px 的聚焦输入框进行缩放，导致页面滚动；搜索输入框字体现固定为 16px，同时视口 meta 标签保留了用户缩放功能以满足无障碍需求。

## Node WebSocket 区块确认

紧凑的 WebSocket 区块通知通过 Node REST API 进行填充，并针对跨节点 `Block not found` SQL 可见性延迟设置了单次有界重试。高度回退机制仍需确认公告的区块 ID 和高度。首次缺失记录在 `debug` 日志中，仅在确认彻底失败时才会发出 `warn`，因此常规的跨节点时序差异不再产生错误噪声。仅针对 Node 的单元测试涵盖了重试、回退、验证和日志记录路径。

## 验证

`npm run lint`、`npm run format:check` 和 `npm run test:unit`（共 225 项测试，包括 WebSocket 区块填充）均已通过。`git diff --check` 检查无误，`720px` 以上的桌面端和平板布局未受影响，无回归问题。
