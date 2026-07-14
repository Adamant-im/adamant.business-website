---
title: "ADAMANT Messenger v4.1.0：新機能、強化、およびアップデート"
slug: "adamant-messenger-v4-1-0-new-features-enhancements-and-updates-fcf1c7e3f0b2"
description: "ADAMANT Messenger v4.1.0では、AIP 16に従った引用と返信メッセージ、通知の整理用「すべて既読にする」ボタン、マルチラインメッセージ入力の10行制限が導入されました。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-messenger-v4-1-0-new-features-enhancements-and-updates-fcf1c7e3f0b2"
publishedAt: "2023-08-02T03:34:14.492Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/fcf1c7e3f0b2/001-0-fk33rbyfcx7zlva.webp"
cardSpan: "full"
originalId: "medium:fcf1c7e3f0b2"
locale: "ja"
placeholder: false
---

ADAMANT Messenger v4.1.0では、AIP-16に準拠した引用メッセージおよび返信メッセージ機能、通知を整理するための「すべて既読にする」ボタン、チャットインターフェースをコンパクトに保つためのマルチラインメッセージ入力の最大10行制限が導入されました。これらの変更により、会話の追跡が容易になり、視覚的なごちゃつきが軽減されます。

ウォレット側では、adamant-walletsリポジトリの生成スクリプトにより、新しいトークンのサポート追加が簡素化されました。残高の更新にはプルダウンジェスチャーが使用され、読み込み中は三点リーダー（…）のインジケーターが表示されます。サポートされるコインのリストには、ADM、BTC、ETH、Doge、Dash、Liskに加え、Tether（USDT）、USD Coin（USDC）、Daiが追加されました。

![ADAMANT Messenger v4.1.0：新機能、強化、およびアップデート](/images/engineering-notes/medium/fcf1c7e3f0b2/002-0-rgxdqzzrdjk3m7qj.webp)

インターフェースの改良には、QRコード生成中のスピナー表示、およびBuyTokensDialogへのStakeCube取引所の追加が含まれます。デリゲート投票アイコンは、より明確な視覚フィードバックを得られるよう再設計されました。

![ADAMANT Messenger v4.1.0：新機能、強化、およびアップデート](/images/engineering-notes/medium/fcf1c7e3f0b2/003-0-xor1ka7rgr2ppf0e.webp)

本リリースには、安定性と互換性を目的としたバグ修正およびライブラリの更新も含まれています。ADAMANT Messengerは、Web、Tor、Android、Windows、Linux、macOS向けに利用可能なプログレッシブウェブアプリケーションです。リリースの詳細はGitHubリリースページでご確認いただけます：https://github.com/Adamant-im/adamant-im/releases/tag/v4.1.0
