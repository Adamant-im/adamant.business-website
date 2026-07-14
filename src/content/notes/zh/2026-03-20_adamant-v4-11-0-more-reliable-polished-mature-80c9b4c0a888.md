---
title: "ADAMANT v4.11.0：更可靠、更精致、更成熟"
slug: "adamant-v4-11-0-more-reliable-polished-mature-80c9b4c0a888"
description: "ADAMANT v4.11.0 整合了 20 个合并的拉取请求和 437 次提交，专注于连接可靠性、界面一致性、钱包流程和整体产品稳定性。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-v4-11-0-more-reliable-polished-mature-80c9b4c0a888"
publishedAt: "2026-03-20T16:23:57.256Z"
author: "Alex Web3"
authorUrl: "https://medium.com/@al.onyxprotocol"
sourceAccount: "al-onyx"
coverImage: "/images/engineering-notes/medium/80c9b4c0a888/001-1-4agtbybzbmpaqqrwpbaz5q-png.webp"
cardSpan: "full"
originalId: "medium:80c9b4c0a888"
locale: "zh"
placeholder: false
---

ADAMANT v4.11.0 整合了 20 个合并的拉取请求和 437 次提交，专注于连接可靠性、界面一致性、钱包流程和整体产品稳定性，而非单一突出功能。

### 节点弹性与网络行为
本次发布的一大改进是节点可靠性。当域名访问不可用时，ADAMANT 现在支持节点的备用 IP 故障转移，同时改进了健康检查生命周期和超时处理机制。设备休眠或离线状态后的恢复能力得到增强，节点状态消息也经过优化，以减少错误的同步信号。这些改进直接针对不稳定网络条件下的故障点，使信使更加稳健。

![ADAMANT v4.11.0：更可靠、更精致、更成熟](/images/engineering-notes/medium/80c9b4c0a888/002-1-bnmyyew25hm84-zwmg0y0w-png.webp)

### 界面现代化
本次发布在聊天、钱包、资金发送流程、设置、对话框和导航等方面进行了广泛的视觉改进。实现了共享设计标记、更紧凑的间距规则、改进的排版、布局基础组件，以及基于 CSS 变量的主题清理。扩展的布局回归测试覆盖范围有助于在未来更新中保持 UI 质量。

### 聊天体验增强
消息功能方面，改进了已打开聊天的布局、消息状态处理、重试指示器、表情选择器行为、回复内容溢出处理、公钥加载和消息分组。修复了快速切换聊天时的陈旧日期刷新行为和空滚动回归问题，确保日常操作更加流畅。

![ADAMANT v4.11.0：更可靠、更精致、更成熟](/images/engineering-notes/medium/80c9b4c0a888/003-1-mmpisulwbp1letrtngejyq-png.webp)

![ADAMANT v4.11.0：更可靠、更精致、更成熟](/images/engineering-notes/medium/80c9b4c0a888/004-1-6kfadiesjlisjwmvg9o4ww-png.webp)

### 钱包与资金发送流程
金融相关界面得到了显著优化，包括改进的钱包卡片、标签页、余额状态和交易列表布局。更新修复了 BTC、DOGE 和 DASH 的自转账金额归一化问题，并在恢复时对持久化钱包符号进行归一化处理，以保持升级状态的一致性。

![ADAMANT v4.11.0：更可靠、更精致、更成熟](/images/engineering-notes/medium/80c9b4c0a888/005-1-ia-qldhd8-vcndnkepcjdw-png.webp)

### 移除 Klayr 支持
一个重要的产品范围决策是全面移除对 Klayr (KLY) 的支持，涵盖钱包、节点、交易、配置、图标、查询、节点客户端、存储路径及相关 UI。清理遗留路径有助于简化代码库并降低用户端的复杂性。

### 工具链与文档
在后台，项目已从 Node.js 20 升级至 22，迁移到 ESLint 9，并更新 Electron 构建以包含通用 macOS 支持。扩展的 Playwright 冒烟测试和回归工作流提升了测试规范性。文档也进行了更新，包括在 `README.md` 中提供更清晰的自托管指南，以及在 `AGENTS.md` 中更新 AI 操作指南。
