---
title: "ブロックチェーン上で賭けを受け付け、LSK、ETH、ADMで報酬を支払う"
slug: "accepting-bets-on-blockchain-and-paying-rewards-in-lsk-eth-and-adm-8dd6abb45e2d"
description: "ADAMANT Bet Botは、匿名性とブロックチェーンによる検証を保証するベッティングアプリで、賭けを処理し自動で報酬を支払います。典型的な利用例はビットコインなど暗号資産価格への賭けです。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/accepting-bets-on-blockchain-and-paying-rewards-in-lsk-eth-and-adm-8dd6abb45e2d"
publishedAt: "2022-11-20T13:10:11.915Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/8dd6abb45e2d/001-0-l0olsfjrwmjzcc-3.webp"
cardSpan: "full"
originalId: "medium:8dd6abb45e2d"
locale: "ja"
placeholder: false
---

ADAMANT Bet Botは、匿名性が保たれ、ブロックチェーンによって検証可能なベッティングアプリケーションであり、賭けの処理と報酬の自動支払いを行います。典型的な利用方法は、ビットコインなどの暗号資産価格に賭けることです。v2.0アップデートにより、ADMやイーサリアム（ETH）に加えて、リスク（LSK）での賭けと報酬支払いがサポートされるようになりました。

このボットは、ADAMANT Messengerのウォレットから直接暗号資産による賭けを受け付け、すべてのベッティングおよび支払いの履歴はブロックチェーン上のトランザクションによって検証可能です。ビットコイン価格（または他の暗号資産価格）を正確に予測したユーザーには報酬が支払われます。ベッティングボットはオープンソースであるため、誰でも独自のインスタンスを展開して、ビットコインに限らず任意の暗号資産価格に対して賭けを受け付けることが可能です。

## ビットコイン価格に賭ける方法

賭けを行うには、ADAMANT上で匿名ウォレットを作成し、残高をチャージした上で、ボットに賭けを送信します。このボットはビットコイン（BTC）の為替レートに対する賭けを受け付けています。新しいラウンドは毎週日曜日10:00 UTCに開始され、現在のラウンドへの賭けは日曜日から木曜日まで受け付けられます。金曜日または土曜日に（ラウンド終了の48時間以内に）送信された賭けは、次のラウンドに繰り延べられます。

許容される予測誤差は±500米ドルです。たとえば、$9,500で賭けを行い、実際のレートが$9,900であった場合でも、当選として認められます。最小賭け金額は0.1米ドルで、最小支払い額も同様に0.1米ドルです。詳細は、ADAMANT内のベットボットに`/help`と送信してください。

賭けを行うには、使用したい暗号資産（ADM、LSK、またはETH）をチャージし、ADAMANTでベットボットのダイアログを開いて`/rates BTC`を送信して現在の為替レートを確認します。その後、予測価格をトランザクションのコメント欄に記載して、希望の賭け額をボットに送信します。たとえば、「11300」というコメントを付けて250 ADMを送信すると、そのラウンド終了時のビットコイン価格が$11,300になると予測した賭けになります。ラウンド終了時に、ボットは実際のレートを報告し、当選者に報酬を支払います。

![ブロックチェーン上で賭けを受け付け、LSK、ETH、ADMで報酬を支払う](/images/engineering-notes/medium/8dd6abb45e2d/002-0-yhlmw4fu3ffrh8-l.webp)

## v2.0.2 リリースノート

v2.0.2のリリースでは、Liskのサポート追加、ソケット接続の有効化、依存関係の更新、リファクタリングおよびバグ修正が含まれています。
