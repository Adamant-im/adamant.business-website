---
title: "MessengerがChatrooms APIにより高速化"
slug: "messenger-becomes-faster-thanks-to-the-chatrooms-api-b7353317e7f8"
description: "ADAMANTはすべてのメッセージをブロックチェーントランザクションとして扱うため、プライバシーとセキュリティが強化される一方で、速度やメッセージ取得に課題がありました。標準的なブロックチェーンAPIでは、対応関係を表示するためにすべてのトランザクションを取得する必要がありました。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/messenger-becomes-faster-thanks-to-the-chatrooms-api-b7353317e7f8"
publishedAt: "2021-11-24T14:07:09.171Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/b7353317e7f8/001-0-tot3wyqtwfswo3kx.webp"
cardSpan: "full"
originalId: "medium:b7353317e7f8"
locale: "ja"
placeholder: false
---

ADAMANTはすべてのメッセージをブロックチェーントランザクションとして扱うため、プライバシーとセキュリティが強化されますが、速度やメッセージの取得には課題がありました。従来のブロックチェーンAPIでは、やり取りを表示するためにすべてのトランザクションを取得する必要がありました。新たに設計されたChatrooms APIは、インスタントメッセンジャー専用に開発され、メッセージの読み込み効率を最大で10倍向上させるとともに、メモリおよびCPU使用量を削減します。

![MessengerがChatrooms APIにより高速化](/images/engineering-notes/medium/b7353317e7f8/002-0-g1gbxwpdnkihcskz.webp)

実際の使用では、以前のバージョンでアカウントを読み込むのに25秒かかり、80MBのメモリを消費していました。新しいバージョンでは、読み込みに3秒、メモリ使用量は28MBにまで短縮され、速度が8倍向上しました。このパフォーマンスの向上は、アカウントが保持するメッセージ数に応じてさらに顕著になります。

Chatroomsは2つのエンドポイントを提供します：`/api/chatrooms/U000000000000` および `/api/chatrooms/U000000000000/U000000000001`。前者は特定のアカウントのチャット一覧を取得し、後者は2つのアカウント間のメッセージを取得します。AIP 14で詳しく説明されているように、データ転送を最小限に抑えるため、ページネーションがサポートされています。これらのエンドポイントは、メッセンジャーやボットなど、任意のアプリケーションから利用可能です。

この機能を実現するため、ノードは新しいアプリケーションリクエストを処理できるように更新されています。オフライン表示のためにすべてのメッセージを一度にダウンロードしていた以前のバージョンとは異なり、Chatrooms APIは必要に応じてメッセージをオンデマンドでダウンロードするため、インターネット接続が必要です。

v3.0.0リリースでは、Chatrooms APIに加え、いくつかの更新も導入されています。HTTPノードの置き換え、Resfinex取引所およびRESトークンの削除、Lisk Serviceの`includePending`バグに対する回避策の実装が含まれます。その他にも、ライト/ダークテーマの`background-color`の修正、ADMトランザクションリストにおける無限更新ループの解消、依存関係の更新などが含まれます。
