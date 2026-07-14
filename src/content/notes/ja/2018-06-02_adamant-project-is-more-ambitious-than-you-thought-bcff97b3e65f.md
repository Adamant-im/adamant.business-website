---
title: "ADAMANT：基本的なメッセージングを超えて——マルチトークン送信とプライバシー"
slug: "adamant-project-is-more-ambitious-than-you-thought-bcff97b3e65f"
description: "ADAMANTオープンソースプロジェクトは、インスタントプライベートメッセージとADMトークン送信が可能なメッセンジャーを開発しました。開発チームは現在、プラットフォームを拡張してプライベートチャット内でのマルチトークン送信をサポートする取り組みを進めています。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-project-is-more-ambitious-than-you-thought-bcff97b3e65f"
publishedAt: "2018-06-02T12:39:07.116Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/bcff97b3e65f/001-0-no5snmhgxset6lqg.webp"
cardSpan: "full"
originalId: "medium:bcff97b3e65f"
locale: "ja"
placeholder: false
---

ADAMANTオープンソースプロジェクトは、インスタントプライベートメッセージとADMトークン送信が可能なメッセンジャーを開発しました。開発チームは現在、プラットフォームを拡張してプライベートチャット内でのマルチトークン送信をサポートする取り組みを進めています。これにより、BitcoinやEthereum、Liskなどの暗号資産を、メッセンジャー内から直接送受信できるようになります。

ADMトークンは、プラットフォームの経済を支える基盤です。メッセージ送信や支払いのための手数料として使用され、ネットワークインフラを維持します。5秒という短いブロック生成時間を持つADMは、高速な取引処理を可能にし、チャット画面から直接支払いが行えます。ADMは完全に独立した自己完結型のトークンシステムとして機能しています。

![ADAMANT Project is more ambitious than you thought.](/images/engineering-notes/medium/bcff97b3e65f/002-0-8ofcnhmzjqjcc-p8.webp)

主要な暗号資産を送金エコシステムに統合することで、各コミュニティからのユーザーをADAMANT Messengerプラットフォームへ誘導し、より高い手数料収入とADMに対する需要の増加を目指しています。

## プライバシー構築

ADAMANTは、Liskのコードベースを用いて構築された、データおよびメッセージ送信のための安全なブロックチェーンプラットフォームです。このブロックチェーンにより、ユーザーのチャット履歴を追跡できない匿名性が保証されています。データを第三者サーバーに収集・保存する中央集権型SNSとは異なり、ADAMANTではワンクリックで生成可能な秘密鍵のみでシステムを利用でき、個人情報の入力は不要です。

ユーザーは、名前、メールアドレス、電話番号、デバイス情報などを提供する必要がありません。オープンソースのコードベースにより、誰でもシステムの正当性を検証したり、独自の実装を構築したりできます。

主要なプライバシー機能には、ユーザーのアドレス帳や位置情報へのアクセス不可、ユーザー識別情報の完全非保持、送信者端末で暗号化され受信者側で復号されるエンドツーエンド暗号化が含まれます。クライアントアプリはすべての暗号処理をローカルで実行し、秘密鍵やニーモニックフレーズをネットワーク上に送信することはありません。メッセージ履歴はローカルに保存されるのではなく、ブロックチェーンから直接読み込まれます。P2P型メッセンジャーとは異なり、ユーザーのIPアドレスが取得されることもありません。ADAMANTアカウントは、開発者を含め、誰にも閉鎖・ブロック・制限されることがありません。

ADAMANTは、ブロックチェーンメッセンジャーが持つオープン性、メッセージ保護、分散性、信頼できるインフラの利点を示しており、第三者による介入や規制なしに匿名メッセージングを提供します。
