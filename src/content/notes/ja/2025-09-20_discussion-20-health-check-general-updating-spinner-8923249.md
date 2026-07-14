---
title: "ヘルスチェック：一般的な更新スピナー"
slug: "discussion-20-health-check-general-updating-spinner-8923249"
description: "ADAMANTヘッダーにローディングスピナーが表示されない場合、ユーザーは最新のチャットとメッセージ一覧を確実に閲覧しています。接続がない場合などにスピナーを表示する必要があります。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/20"
publishedAt: "2025-09-20T16:33:48Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:8923249"
locale: "ja"
placeholder: false
---

![Discussion screenshot 1](/images/engineering-notes/github/discussions/8923249/001-fda0855b.webp)

ADAMANTヘッダーにローディングスピナーが表示されないことは、ユーザーが最新のチャットおよびメッセージ一覧を閲覧していることを保証します。スピナーは、インターネット接続がない場合、アクティブなADMノードがない場合、または有効化されたADMノードがない場合に表示されるべきです。

接続とアクティブなノードが存在する場合、システムはさらに確認を行います。新しいメッセージを受信したとき——つまり、それ以降に新しいメッセージが存在しない状態——`chatActualUntil`というタイムスタンプがストアに保存されます。

```javascript
const chatsActualUntil = adamant.toTimestamp(nodeTimestamp) + INTERVAL + CHAT_ACTUALITY_BUFFER_MS
```

`INTERVAL`は、RESTを通じて新しいチャットをポーリングする間隔を表しており、ソケット接続が利用可能かどうかに応じて変化します。

```javascript
INTERVAL: (state, getters, rootState) => {
  return rootState.options.useSocketConnection ? SOCKET_ENABLED_TIMEOUT : SOCKET_DISABLED_TIMEOUT
},
```

チャット画面およびチャット一覧画面では、`chatActualUntil`を監視し、フック`chatActual = chatActualUntil > currentTime`を購読します。このフックは500ミリ秒ごとに実行され、新しいメッセージがなくても`chatActualUntil`の値が変わっていなくてもスピナーを起動します。最終的に、インターネット接続がない、ノードがオンラインでない、または`!chatActual`がtrueと評価される場合にスピナーが表示されます。

アプリがバックグラウンドから復帰した場合でも、`chatActualUntil`に引き続き依存しているため、特別な調整は必要ありません。デバイスの時刻がチャット有効期間のタイムスタンプを超えると、ユーザーはスピナーを確認できます。最悪の場合、接続が失われたとき、ユーザーはスピナーを見ることができず、最大で`INTERVAL + CHAT_ACTUALITY_BUFFER_MS`秒の間、すべてが最新であると誤って判断する可能性があります。
