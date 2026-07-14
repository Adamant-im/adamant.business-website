---
title: "JavaScript API v1.0.0 を使用して ADAMANT ブロックチェーン上でアプリやサービスを開発する"
slug: "develop-apps-and-services-upon-messenger-s-blockchain-adamant-javascript-api-v1-0-0-f00922f5b00d"
description: "ADAMANTは匿名メッセージ用のパブリックブロックチェーンです。特徴はブロックチェーンそのものではなく、その上に構築されたサービスにあります。開発者は誰でもプログラムを作成できます。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/develop-apps-and-services-upon-messengers-blockchain-adamant-javascript-api-v1-0-0-f00922f5b00d"
publishedAt: "2021-05-28T20:22:13.112Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/f00922f5b00d/001-0-fghvl6xn-ahzkh9m.webp"
cardSpan: "full"
originalId: "medium:f00922f5b00d"
locale: "ja"
placeholder: false
---

ADAMANT は匿名メッセージングを目的としたパブリックブロックチェーンです。その特徴はブロックチェーン自体ではなく、その上に構築されたサービスにあります。開発者は匿名メッセージや信号の送信、永続的な暗号化ストレージ、デバイス間のデータアクセス、高速な一時アカウント、高い信頼性といった機能を活用したプログラムを自由に作成できます。

すでにいくつかのアプリケーションが ADAMANT ブロックチェーン上で動作しています。これにはメッセンジャーおよび暗号資産ウォレット、暗号資産交換ボット、ブロックチェーンベースの二要素認証サービス、および報酬配布ボットが含まれます。

![Develop apps and services upon messenger's blockchain — ADAMANT JavaScript API v1.0.0](/images/engineering-notes/medium/f00922f5b00d/002-0-dtmatfmf-pnkc0hj.webp)

![Develop apps and services upon messenger's blockchain — ADAMANT JavaScript API v1.0.0](/images/engineering-notes/medium/f00922f5b00d/003-0-45fiuq9gnu-tgiot.webp)

![Develop apps and services upon messenger's blockchain — ADAMANT JavaScript API v1.0.0](/images/engineering-notes/medium/f00922f5b00d/004-0-oyzmxof2phgcsl2c.webp)

### ADAMANT JavaScript API v1.0.0

ADAMANT JavaScript API は [v1.0.0](https://www.npmjs.com/package/adamant-api) に更新されました。以前のバージョンと比較して、ブロックチェーンへのリクエストがより信頼性が高く、使いやすくなっています。このライブラリは分散化を実践的に実現しており、1つのネットワークノードがリクエストを処理できない場合、自動的に別のノードにリダイレクトし、結果が返るまで複数回リトライします。開発者がノードのフェイルオーバーを手動で処理する必要はありません。

ブロックチェーンをクエリする基本的な例：

```javascript
api.get('blocks').then(response => {
  console.log(response.data)
})
```

このライブラリは、依存関係の更新と整理、内部関数の書き直しを含む全面的な再構築が行われました。v1.0.0 は以前の v0.5.3 と互換性がありませんが、移行は簡単です。完全なドキュメントは [adamant-api-jsclient wiki](https://github.com/Adamant-im/adamant-api-jsclient/wiki) で利用可能です。
