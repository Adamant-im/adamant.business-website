---
title: "ADAMANTチャットでTether、USD Coin、DAI、XCNを交換"
slug: "exchange-tether-usd-coin-dai-and-xcn-in-adamant-chats-b89877c364bf"
description: "ADAMANTエクスチェンジャーボットがERC20トークンに対応。USDT、USDC、DAI、XCNをチャット内で直接交換可能。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/exchange-tether-usd-coin-dai-and-xcn-in-adamant-chats-b89877c364bf"
publishedAt: "2023-09-12T11:44:07.868Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/b89877c364bf/001-1-vosdpbswphxo57go9nrwxa-png.webp"
cardSpan: "full"
originalId: "medium:b89877c364bf"
locale: "ja"
placeholder: false
---

ADAMANTエクスチェンジャーボットが、既存の暗号資産に加えてERC20トークンのサポートを開始しました。ADM、BTC、DASH、DOGE、ETH、LSKに加え、Tether（USDT）、USD Coin（USDC）、DAI、Onyxcoin（XCN）をADAMANTチャット内で直接交換できるようになりました。

![ADAMANTチャットでTether、USD Coin、DAI、XCNを交換](/images/engineering-notes/medium/b89877c364bf/002-0-ewiwfv0ogqnfwi-m.webp)

エクスチェンジャーはオープンソースであるため、誰でも独自のエクスチェンジボットインスタンスを実行できます。ADAMANTアプリに内蔵されたチャット内暗号資産送金機能が統合を処理し、ユーザーはチャットインターフェースを離れることなく対応する暗号資産を交換できます。

エクスチェンジャーを使用するには、チャットリストにすでに登録されているID `U5149447931090026688` のボットと会話を開いてください。`/help` を送信すると、取引手順や手数料の詳細が表示されます。資金を実際に送信せずに交換内容を確認するには、`/test 0.1 ETH to XCN` のようなコマンドを送信してください。条件に満足したら、チャット内で直接交換を実行できます。

すべての取引と通信は、ADAMANTのプライバシーモデル内で機密性が保たれます。新しく追加されたトークンによって、この方針が変更されることはありません。

エクスチェンジボットのリリースv2.6.0では、USDT、USDC、DAI、XCNのサポートに加え、バグ修正と依存関係の更新が行われました。ソースコードは[GitHub](https://github.com/Adamant-im/adamant-exchangebot/releases/tag/v2.6.0)で公開されています。
