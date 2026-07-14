---
title: "ADAMANTでBinance Coinのチャット内送金がサポート開始"
slug: "in-chat-transfers-for-binance-coin-is-now-supported-3b494b812e62"
description: "ADAMANTは分散型メッセージングプラットフォームであり、ETHに続きBNBのチャット内送金が可能に。ERC20トークン統合への第一歩。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/in-chat-transfers-for-binance-coin-is-now-supported-3b494b812e62"
publishedAt: "2018-09-20T07:18:50.354Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/3b494b812e62/001-0-n7sxgkakooow6ma9.webp"
cardSpan: "full"
originalId: "medium:3b494b812e62"
locale: "ja"
placeholder: false
---

ADAMANTは単なるメッセージアプリではなく、暗号資産の送金機能を統合した分散型メッセージングプラットフォームです。今年早々にチャット内でのイーサリアム（ETH）送金を実現したことに続き、今回、Binance Coin（BNB）のチャット内送金もサポートしました。

Binance Coinは、世界最大の暗号資産取引所であるBinanceが発行したトークンであり、同取引所での取引手数料割引などさまざまな特典を得るために利用できます。ADAMANTにおけるBNBのサポートは、将来的なERC20トークンの広範な統合に向けた第一歩です。また、ADAMANTのADMトークンが複数の取引所へ上場しようとしている現状を踏まえ、取引所の仕組みをより深く理解するためにも、BNBの統合は意義深いものとなっています。

![In-chat transfers for Binance Coin is now supported](/images/engineering-notes/medium/3b494b812e62/002-1-lw2mpy0kvqgsvgs68oubog-png.webp)

### チャット内でのBNB送金の仕組み

BNBをチャット内で送信するには、まずADAMANT Messenger内にあるBNBウォレットに残高をチャージする必要があります。MyEtherWalletなどの外部ウォレットや、Binanceなどの取引所からBNBを送金することで入金できます。BNBウォレットのアドレスは「Wallet」タブから確認でき、コピー用のアイコンをタップすることで簡単にコピーできます。

![In-chat transfers for Binance Coin is now supported](/images/engineering-notes/medium/3b494b812e62/003-1-cktw266pvgmcz6vcdip4g-png.webp)

送金を行うには、送信先の相手とのチャットを開き、メッセージ入力欄の左にあるプラス記号（+）をクリックして「Send BNB」を選択し、送金額を入力してトランザクションを確認します。

重要な技術的な注意点として、BNBはERC20トークンであるため、ネットワーク手数料としてイーサ（ETH）が必要です。BNBの送金を行うには、ADAMANTウォレット内にETHの残高を確保しておく必要があります。

### セキュリティについて

Binance Coinのサポートは、イーサリアムのサポートと同様のセキュリティ設計に基づいて実装されています。ユーザーのウォレットはADAMANTアカウント内に完全にローカルで保持されており、プラットフォーム側が資金を管理することはありません。開発チームは内部セキュリティ監査を完了済みで、セキュリティコンテストも実施しており、次ステップとして独立した外部監査を予定しています。
