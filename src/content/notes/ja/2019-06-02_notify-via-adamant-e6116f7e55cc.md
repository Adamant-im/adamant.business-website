---
title: "ADAMANT経由での通知"
slug: "notify-via-adamant-e6116f7e55cc"
description: "ADAMANTは、メッセージ配信がチェーン上で検証され、メッセージとその順序が不変で、保存期間が事実上無制限なため、通知トランスポートとして適しています。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/notify-via-adamant-e6116f7e55cc"
publishedAt: "2019-06-02T14:22:43.887Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/e6116f7e55cc/001-1-8rvans74h-cl-ux-bpeiaw-png.webp"
cardSpan: "full"
originalId: "medium:e6116f7e55cc"
locale: "ja"
placeholder: false
---

ADAMANTは、通知トランスポートとして適したいくつかの特性を備えています：各メッセージの配信はオンチェーンで検証され、メッセージとその順序は不変であり、ストレージ期間は事実上無制限で、アクセスは特定のデバイスに紐付けられていません。このプロジェクトはオープンソースです。実用例として、暗号通貨プールの運営者がADAMANTメッセージを通じてプール運用に関する通知を受信するケースがあります。

開発者は、ADAMANT通知を3つの主要なインターフェースを通じて統合できます。ADAMANT Consoleは`send message`コマンドを提供し、言語に依存しないCLIツールです。JavaScriptアプリケーション向けには、ADAMANT API JSクライアントライブラリで`send`関数が利用可能です。最後に、ネイティブのADAMANTノードは直接統合可能な独自のAPIを公開しています。

メッセージの内容はMarkdownフォーマットとEmojiの両方をサポートしており、構造化された読みやすい通知が可能です。
