---
title: "Telegram 的匿名性漏洞：如何获取任意用户的电话号码"
slug: "telegram-s-anonymity-hole-how-to-get-any-user-s-phone-number-88062b4fb94b"
description: "Telegram 要求使用电话号码进行消息通信，将所有消息绑定到用户身份。这一机制不仅过时，还带来重大隐私风险。其中一个漏洞允许任何人获取群组中用户的电话号码。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/telegrams-anonymity-hole-how-to-get-any-user-s-phone-number-88062b4fb94b"
publishedAt: "2019-09-02T08:18:08.034Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/88062b4fb94b/001-0-mhckpcqqduw4kpcb.webp"
cardSpan: "full"
originalId: "medium:88062b4fb94b"
locale: "zh"
placeholder: false
---

Telegram 要求用户提供电话号码才能开始发送消息，并将所有消息与其用户身份绑定。这种机制不仅已经过时，还会带来严重的隐私风险。其中一个漏洞是，任何人可以通过利用 Telegram 应用的联系人同步功能，获取群组中任意用户的电话号码。

为了演示这一点，考虑一个公开的群聊，其中目标用户“Sergey Lebedev”可见。

![Telegram 的匿名性漏洞：如何获取任意用户的电话号码](/images/engineering-notes/medium/88062b4fb94b/002-0-fcieyaa3mo5op3nv.webp)

退出应用后，在设备的本地通讯录中添加一个新联系人，并猜测其电话号码，即可测试该号码是否属于某位 Telegram 用户。

![Telegram 的匿名性漏洞：如何获取任意用户的电话号码](/images/engineering-notes/medium/88062b4fb94b/003-0-usc809xtvbg9yqgn.webp)

接下来，确保在 Telegram 的隐私设置中启用了联系人同步功能（设置 — 隐私和安全）。此功能会自动将设备通讯录中的联系人添加到应用中，前提是这些联系人已在 Telegram 上注册。

![Telegram 的匿名性漏洞：如何获取任意用户的电话号码](/images/engineering-notes/medium/88062b4fb94b/004-0-bpxhl6k-bs5uhotz.webp)

如果猜测的电话号码已在 Telegram 上注册，应用就会将该用户添加到其联系人列表中。在此示例中，猜测的号码是正确的。

![Telegram 的匿名性漏洞：如何获取任意用户的电话号码](/images/engineering-notes/medium/88062b4fb94b/005-0-ajrqdbdxby-cjw0f.webp)

随后，Telegram 会使用设备通讯录中设置的名称覆盖该用户的显示名称。返回原始群聊时，“Sergey Lebedev”现在显示为“Testing Phone ID”，从而确认该猜测的电话号码确实属于他。

![Telegram 的匿名性漏洞：如何获取任意用户的电话号码](/images/engineering-notes/medium/88062b4fb94b/006-0-qbjxtb52xz7x-fzs.webp)

尽管从数百万个号码中随机猜测电话号码看似不现实，但攻击者可通过社会工程手段缩小范围，确定目标用户的国家和运营商。此外，一个简单的移动应用即可自动向设备通讯录中批量添加大量电话号码，从而使暴力破解变得可行。此漏洞对用户隐私构成严重威胁，尤其影响公众人物、投资者和活动人士。强制使用电话号码注册的应用通常伴随着隐蔽的隐私代价。
