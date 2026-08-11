---
title: "ADAMANT Messenger v4.12.0：更安全的 PWA，保障私密对话"
slug: "adamant-messenger-v4-12-0-a-safer-pwa-for-private-conversations-3afcd8416678"
description: "ADAMANT Messenger v4.12.0 是针对去中心化通讯、钱包及 PWA 体验的协调安全更新。建议浏览器、移动端、Tor 及桌面端用户立即更新。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-messenger-v4-12-0-a-safer-pwa-for-private-conversations-3afcd8416678"
publishedAt: "2026-08-11T00:19:47.725Z"
author: "ADAMANT Messenger"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:3afcd8416678"
coverImage: "/images/engineering-notes/medium/3afcd8416678/001-e1683c8738.webp"
locale: "zh"
placeholder: false
---

ADAMANT Messenger v4.12.0 是一次针对去中心化通讯、钱包及 PWA 体验的协调安全更新。建议浏览器、移动端、Tor 及桌面端用户立即更新，以获取针对敏感数据的强化保护。

更新后的 PWA 保留了用户熟悉的界面，支持匿名账户创建、聊天管理及多资产钱包控制。一如既往，使用该服务无需手机号、电子邮件地址或中心化运营商。用户的助记词仍是访问匿名地址和自托管钱包的唯一密钥。

在界面之下，v4.12.0 修复了已确认的存储型 XSS 路径，移除了旧版的 v-html 渲染，并使用 SafeHtml 对 Markdown 进行了加固。此外，它还验证了节点提供的公钥与其声称代表的地址是否一致，这对于去中心化应用与公共基础设施交互时的边界安全至关重要。本地密钥存储和密码密钥派生流程已升级为版本化的 scrypt，加密辅助工具也迁移至现代的 @noble 和 @scure 生态系统。严格的内容安全策略 (CSP) 覆盖范围现已扩展至 PWA、Tor、测试网、Android 和 Electron 构建版本。

此版本还提升了系统可靠性。滞后的代币索引器不再被视为健康节点，节点版本检查现已采用真实的语义化版本控制。此外，AIP-6 信号消息已被排除在可见的聊天记录之外。对于 Android 用户，备份和数据提取边界得到了加强，减少了隐含假设，使从登录到消息传递的路径更加安全。

![ADAMANT Messenger v4.12.0：更安全的 PWA，保障私密对话](/images/engineering-notes/medium/3afcd8416678/002-419a41b893.webp)

![ADAMANT Messenger v4.12.0：更安全的 PWA，保障私密对话](/images/engineering-notes/medium/3afcd8416678/003-dc272cf2f1.webp)

![ADAMANT Messenger v4.12.0：更安全的 PWA，保障私密对话](/images/engineering-notes/medium/3afcd8416678/004-c1c599fad0.webp)
