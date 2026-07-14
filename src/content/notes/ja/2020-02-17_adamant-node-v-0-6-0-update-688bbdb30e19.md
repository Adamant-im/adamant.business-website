---
title: "ADAMANT Node v0.6.0 アップデート"
slug: "adamant-node-v-0-6-0-update-688bbdb30e19"
description: "分散型メッセージングアプリの基盤となるADAMANT Nodeのv0.6.0リリース。ソケット接続とトランザクションAPIの改善を実装。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-node-v-0-6-0-update-688bbdb30e19"
publishedAt: "2020-02-17T09:23:50.372Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/688bbdb30e19/001-1-fmo2vlyn2yehfv84inqtmq-png.webp"
cardSpan: "full"
originalId: "medium:688bbdb30e19"
locale: "ja"
placeholder: false
---

分散型メッセージングアプリは、ブロックチェーンシステムとクライアントアプリケーションの2つのコンポーネントに依存しています。ブロックチェーンは、アプリケーションにデータを提供し、着信リクエストを処理するネットワークノードによって維持されています。ADAMANTは、プロジェクトのGitHubリリースページで利用可能なノードソフトウェアのバージョン0.6.0をリリースしました。

このリリースでは、ソケット接続とトランザクションAPIが改善されています。ソケット接続では、`recipientPublicKey`が返されるようになり、トランザクションAPIエンドポイント（KVSおよびChatsを含む）のレスポンスに`block_timestamp`フィールドが含まれるようになりました。`/states/get/`エンドポイントは拡張され、`SenderIds`および`keyIds`パラメーターに加えて、POSTリクエストもサポートするようになりました。このリリースには、マイグレーションの修正および更新されたドキュメントセットも含まれています。

この更新はすべてのノード運用者にとって必須ではありません。ただし、メッセージングアプリケーションと接続する必要があるノードは、最新バージョンにアップグレードする必要があります。
