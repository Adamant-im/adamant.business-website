---
title: "ADAMANT Web App 2.1: QR Sharing, Bot Access, and Token Transfer Improvements"
slug: "adamant-introduces-web-app-2-1-get-your-hands-on-the-latest-convenient-functions-4ffbc0ebc656"
description: "The ADAMANT Web App 2.1 update focuses on messenger efficiency and easier onboarding. New accounts now have immediate access to two bots—an exchanging bot and a betting bot—with…"
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
locale: "en"
placeholder: false
---

The ADAMANT Web App 2.1 update focuses on messenger efficiency and easier onboarding. New accounts now have immediate access to two bots—an exchanging bot and a betting bot—without any additional setup.

Clicking a wallet address reveals three options: copy the address to the clipboard, copy a shareable chat link, or display a QR code. The share link format follows the pattern `https://msg.adamant.im/?address=U14236667426471084862`, which lets recipients start chatting immediately. QR codes are also now shown in the "Partner's info" section when you click a contact's icon.

![ADAMANT Web App 2.1](/images/engineering-notes/medium/4ffbc0ebc656/002-1-ca218mdchy7u6byjnmqxha-png.webp)

QR sharing is useful for in-person contact exchange because it leaves no traceable record. A single QR can encode not only an address but also a contact label, a token amount, and a greeting message. The app parses clipboard links automatically and fills in the relevant fields. For example, this link opens a chat with a labeled contact, a preset token amount, and a message:

```
https://msg.adamant.im/?address=U14236667426471084862&label=John%20Doe&amount=1.01&message=Hi%20there
```

When transferring tokens, the app supports quick amount presets, letting you send all available funds or a fractional portion such as a third without manual entry.

![ADAMANT Web App 2.1](/images/engineering-notes/medium/4ffbc0ebc656/004-1-dmv7hxalesdxspouol49ka-png.webp)

These features are driven by ADAMANT Improvement Proposals (AIPs), an open collection of suggestions for app improvements hosted in the [AIPs repository on GitHub](https://github.com/Adamant-im/AIPs). Alongside the web app, Tor, Windows, and Linux builds were updated and are available in [release 2.1 on GitHub](https://github.com/Adamant-im/adamant-im/releases/tag/v2.1.0).

![ADAMANT Web App 2.1](/images/engineering-notes/medium/4ffbc0ebc656/003-1-2hnq5ol3qs8fauymp6vxa-png.webp)
