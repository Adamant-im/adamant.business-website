---
title: "marketmaking.appのアップデート：新言語対応、コンテンツ刷新、価格体系の変更"
slug: "discussion-56-marketmaking-app-update-6-new-languages-content-refresh-and-pricing-changes-10333867"
description: "cryptofoundryがmarketmaking.appのメジャーアップデートを実施。6つの新言語、無料ベーシックボットの新ポジショニング、ドキュメント更新、UX改善を導入。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/56"
publishedAt: "2026-06-28T14:14:24Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10333867"
locale: "ja"
placeholder: false
---

## 概要

cryptofoundryはmarketmaking.appにメジャーアップデートを実施し、6つの新言語の追加、トークン発行体向け無料ベーシックボットに関するポジショニングの刷新、ドキュメントの更新、および複数のUX改善を導入しました。

## 言語

サイトは現在8言語に対応しています。既存の英語とロシア語に加え、中国語（簡体字）、スペイン語、アラビア語（RTL）、フランス語、日本語、ドイツ語が追加されました。すべての主要ページは英語から翻訳され、必要に応じてロシア語を参照として使用しました。ヘッダー、モーダルメニュー、お問い合わせボタン、言語切り替え、ナビゲーションリンク、ロゴはすべて、対応するロケール固有のURLに正しくリンクされるようになりました。

## コンテンツとポジショニング

「マーケットメイキングとは」セクションは、現在のADAMANT tradebotのREADMEのコンセプトに合わせて調整され、トークン発行体向けの無料ベーシック版に加え、プレミアムモジュールおよびサービスを強調する内容となっています。インストール、クイックスタート、無料マーケットメイキングボットの各ページが見直され、更新されました。コマンドリファレンスはボットのコードベースと同期され、新しいコマンドの追加や古くなった説明の修正が行われました。

プレミアム機能については、「ウォッシュトレーディング禁止」のブロックを削除し、「残高ウォッチャー」と「永続的取引」（先物）のブロックを追加しました。ドル建て価格は「Request（問い合わせ）」リンクに置き換えられ、お問い合わせポップアップが開くようになっています。サービスページでは固定価格の記載や取引所APIキーの提供に関する注記が削除され、ホームページの「デモの依頼」セクションから800ドルのデモ価格も削除されました。英語およびロシア語の文字列における文法の修正、リンク切れ、古くなった日付なども一括で修正されました。

## お問い合わせとUX

任意のページから `#contact` アンカー（例：`/cex-mm/free-market-making-bot/#contact`）を使用して、お問い合わせモーダルを開けるようになりました。Telegramも第三の連絡手段として@adamant_business経由で追加されました。

## インフラストラクチャ

サーバーおよびWordPressスタックが更新され、Ubuntuパッケージ、PHP、MySQL、WordPressコア、Polylang、Insert PHP、WP Rocketが含まれます。移行後、Duplicatorは削除されました。アップデート前後でフルバックアップが取得されています。

![Discussion screenshot 1](/images/engineering-notes/github/discussions/10333867/001-007bf37e.webp)
