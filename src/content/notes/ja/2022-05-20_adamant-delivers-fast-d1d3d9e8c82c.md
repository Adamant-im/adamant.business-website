---
title: "ADAMANT iOSがソケット接続に対応し、高速メッセージングを実現"
slug: "adamant-delivers-fast-d1d3d9e8c82c"
description: "ADAMANT for iOSがソケット接続をサポートし、従来のメッセンジャー並みのメッセージ送信速度を実現。デスクトップ版でも既に実装済み"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-delivers-fast-d1d3d9e8c82c"
publishedAt: "2022-05-20T12:48:31.779Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/d1d3d9e8c82c/001-1-djgmlycgrt1rto-ajz7ifw-png.webp"
cardSpan: "full"
originalId: "medium:d1d3d9e8c82c"
locale: "ja"
placeholder: false
---

ADAMANT for iOSが現在ソケット接続をサポートし、メッセージの配信速度が従来のメッセンジャー並みに高速化されました。デスクトップアプリケーションでも以前からソケットが実装されていたため、相手が使用するクライアントに関わらず、プラットフォームを越えた通信が一貫して高速になります。

対応のプライバシーとセキュリティは変更ありません。メッセージは引き続き暗号化され、ブロックチェーン上に保存されることで、ADAMANTの核となる保証が維持されます。

メッセージ送信時、最初は「ノードに配信済み」というステータスで表示され、1つのノードによって検証されます。その後、トランザクションがブロックチェーンネットワーク全体によって確認されると、「ブロックチェーンに保存済み」というステータusに変化します ⚭。

リリース2.4.0では、即時送受信のためのソケットサポートに加え、プッシュ通知から特定のチャットを直接開ける機能も含まれています。

配信フローの短いデモは[YouTube](https://youtube.com/shorts/OSYL9ELVEjE)でご覧いただけます。
