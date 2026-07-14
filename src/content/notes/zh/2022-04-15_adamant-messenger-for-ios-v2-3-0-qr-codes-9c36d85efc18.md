---
title: "ADAMANT Messenger for iOS v2.3.0：支持二维码扫描"
slug: "adamant-messenger-for-ios-v2-3-0-qr-codes-9c36d85efc18"
description: "ADAMANT Messenger for iOS v2.3.0 增加了对包含地址和 URI 链接的 ADAMANT 二维码的扫描支持，使 iOS 应用与 Android 和桌面客户端功能一致。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-messenger-for-ios-v2-3-0-qr-codes-9c36d85efc18"
publishedAt: "2022-04-15T07:03:22.214Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/9c36d85efc18/001-0-hn93mfg0ezhtedov.webp"
cardSpan: "full"
originalId: "medium:9c36d85efc18"
locale: "zh"
placeholder: false
---

ADAMANT Messenger for iOS v2.3.0 增加了对包含地址和 URI 链接的 ADAMANT 二维码的扫描支持，使 iOS 应用与 Android 和桌面客户端功能一致。该实现遵循三项 ADAMANT 改进提案：AIP-8 和 AIP-9 定义了 ADAMANT 的 URI 格式，AIP-15 规定了 ADM 地址的二维码标准。

要分享您的 ADM 地址，请打开账户标签页，点击地址，然后选择 **生成二维码**。其他用户即可使用任意 ADAMANT 客户端（Android、桌面端或 iOS）扫描生成的二维码，以发起聊天或交易。

此版本还修复了一个聊天名称无法正确更新而保持静态的 bug。
