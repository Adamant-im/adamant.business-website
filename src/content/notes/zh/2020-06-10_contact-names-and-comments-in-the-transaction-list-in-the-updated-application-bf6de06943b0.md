---
title: "在更新后的应用中交易列表显示联系人姓名和备注"
slug: "contact-names-and-comments-in-the-transaction-list-in-the-updated-application-bf6de06943b0"
description: "ADAMANT 网页版信使 v2.6.0 更新使交易列表更直观。转账备注直接显示在列表中，联系人姓名与地址并列展示，并为每条记录提供打开对应聊天的快捷方式。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/contact-names-and-comments-in-the-transaction-list-in-the-updated-application-bf6de06943b0"
publishedAt: "2020-06-10T06:44:48.139Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/bf6de06943b0/001-0-q5zuwj-pur7a9hdb.webp"
cardSpan: "full"
originalId: "medium:bf6de06943b0"
locale: "zh"
placeholder: false
---

ADAMANT 网页版信使 v2.6.0 的更新使交易列表更加直观。现在转账备注直接显示在列表中，联系人姓名与地址并列显示，每条记录都提供了打开对应聊天窗口的快捷方式。交易详情页面也已更新，同样显示备注和联系人姓名，用户自己的地址则标注为“我”以提升清晰度。对于涉及其他加密货币的交易，列表中也会显示 ADM 地址和联系人姓名，并提供相同的聊天快捷方式。

![在更新后的应用中交易列表显示联系人姓名和备注](/images/engineering-notes/medium/bf6de06943b0/002-0-nu76kd5rli905hye.webp)

登录状态保留设置已优化：此前“关闭标签页即退出登录”的行为已被更清晰的“保持登录”选项取代。深色模式现为默认主题。在安全性方面，消息中的链接及用户密码文档链接均在新窗口中打开，并启用 `noopener`，以防止标签页劫持攻击。本版本还修复了推送通知的问题。

完整更新日志请见 [ADAMANT GitHub 发布页面](https://github.com/Adamant-im/adamant-im/releases/tag/v2.6.0)。
