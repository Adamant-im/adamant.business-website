---
title: "ADAMANT Web App 2.1：QR共享、机器人访问和代币转账改进"
slug: "adamant-introduces-web-app-2-1-get-your-hands-on-the-latest-convenient-functions-4ffbc0ebc656"
description: "ADAMANT Web App 2.1 版本专注于提升消息效率和简化新用户上手流程。新账户现在可立即访问两个机器人——一个交易机器人和一个投注机器人，无需额外设置。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-introduces-web-app-2-1-get-your-hands-on-the-latest-convenient-functions-4ffbc0ebc656"
publishedAt: "2019-10-02T06:50:35.550Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/4ffbc0ebc656/001-1-l-nswrbv8xnsm1omxvshqg-png.webp"
cardSpan: "full"
originalId: "medium:4ffbc0ebc656"
locale: "zh"
placeholder: false
---

ADAMANT Web App 2.1 版本专注于提升消息效率和简化新用户上手流程。新账户现在可立即访问两个机器人——一个交易机器人和一个投注机器人，无需任何额外设置。

点击钱包地址会显示三个选项：复制地址到剪贴板、复制可分享的聊天链接，或显示二维码。分享链接的格式遵循 `https://msg.adamant.im/?address=U14236667426471084862` 模式，使接收方能够立即开始聊天。现在，当你点击联系人的图标时，二维码也会显示在“联系人信息”部分。

![ADAMANT Web App 2.1](/images/engineering-notes/medium/4ffbc0ebc656/002-1-ca218mdchy7u6byjnmqxha-png.webp)

二维码共享对于线下交换联系人非常实用，因为它不会留下可追踪的记录。单个二维码不仅可以编码地址，还可以包含联系人标签、代币金额和问候消息。应用会自动解析剪贴板中的链接，并填充相应字段。例如，以下链接会打开一个带有已标记联系人、预设代币金额和消息的聊天窗口：

```
https://msg.adamant.im/?address=U14236667426471084862&label=John%20Doe&amount=1.01&message=Hi%20there
```

在转账代币时，应用支持快速金额预设，允许你发送全部可用资金或三分之一等分数金额，而无需手动输入。

![ADAMANT Web App 2.1](/images/engineering-notes/medium/4ffbc0ebc656/004-1-dmv7hxalesdxspouol49ka-png.webp)

这些功能由 ADAMANT 改进提案（AIPs）驱动，AIPs 是一组公开的改进建议，托管于 [GitHub 上的 AIPs 仓库](https://github.com/Adamant-im/AIPs)。除了 Web 应用外，Tor、Windows 和 Linux 版本也已同步更新，并可在 [GitHub 的 2.1 版本发布页](https://github.com/Adamant-im/adamant-im/releases/tag/v2.1.0) 获取。

![ADAMANT Web App 2.1](/images/engineering-notes/medium/4ffbc0ebc656/003-1-2hnq5ol3qs8fauymp6vxa-png.webp)
