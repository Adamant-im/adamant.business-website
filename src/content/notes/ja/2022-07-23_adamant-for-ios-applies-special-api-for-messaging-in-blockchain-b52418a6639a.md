---
title: "iOS版ADAMANTがチャットルームAPIを採用し、ブロックチェーンメッセージの高速化を実現"
slug: "adamant-for-ios-applies-special-api-for-messaging-in-blockchain-b52418a6639a"
description: "iOS版ADAMANTがチャットルームAPIをサポートし、メッセージ読み込み速度が最大50倍に向上。ADMアカウントへのログイン時にその効果をすぐに体感できます。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-for-ios-applies-special-api-for-messaging-in-blockchain-b52418a6639a"
publishedAt: "2022-07-23T13:24:47.800Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
cardSpan: "full"
originalId: "medium:b52418a6639a"
locale: "ja"
placeholder: false
---

iOS版ADAMANTは、ブロックチェーンメッセージングにチャットルームAPIをサポートし、メッセージの読み込み時間を最大50倍高速化しました。この改善は、ADMアカウントにログインした直後からすぐに体感できます。デスクトップアプリケーションでは、以前から同様のAPIが実装されていました。

チャットルームAPIは、主に2つのエンドポイントを提供しています。1つ目は`/api/chatrooms/U000000000000`で、指定されたアカウントのチャット一覧を取得します。2つ目は`/api/chatrooms/U000000000000/U000000000001`で、2つの特定のアカウント間のメッセージ履歴を取得します。データ転送を最適化するため、APIにはページネーションが含まれています。詳細な技術情報はAIP 14で確認できます。

iOSアプリケーションのバージョン2.5.0では、チャットルームAPIの統合に加え、暗号資産レートの高速取得、全体的なパフォーマンス向上、MacBook M1向けの最適化、および各種バグ修正が含まれています。
