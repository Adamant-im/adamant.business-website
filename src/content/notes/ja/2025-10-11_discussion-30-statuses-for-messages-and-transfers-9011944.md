---
title: "ADAMANTにおけるメッセージと送金のステータス"
slug: "discussion-30-statuses-for-messages-and-transfers-9011944"
description: "ADAMANTはメッセージの配信ステータスと暗号資産の送金ステータスを区別。メッセージはADAMANTブロックチェーンで追跡され、送金は各トークンのネイティブブロックチェーンで検証される。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/30"
publishedAt: "2025-10-11T18:08:05Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:9011944"
locale: "ja"
placeholder: false
---

ADAMANTはメッセージの配信ステータスと暗号資産の送金ステータスを区別しています。メッセージはADAMANTブロックチェーン内で追跡され、送金は各トークンのネイティブブロックチェーンに対して検証されます。重要なプライバシーの原則として、ADAMANTはメッセージに「既読」ステータスを実装しません。これは受信者のアクティビティを漏らす可能性があるためです。

## メッセージステータス

着信メッセージはブロックチェーンから直接読み取られるため、常に配信済みと見なされ、ステータスは表示されません。送信メッセージは3つの段階を経ます：**送信中**（保留中）、**ノードに配信済み**（ノードがトランザクションを受け入れた）、**ブロックチェーン内**（ブロックが確定した後の追加確認）。UI体験をスムーズにするため、送信中から配信済みへの遷移は迅速に行われる必要があります。ステータスはチャット一覧と個別チャットの両方で更新されます。

ソケットが有効な場合、ノードに到達した未確認のトランザクションが即座に返されます。この時点で、`block_timestamp`、`height`、`blockId`、`confirmations`などのフィールドは`null`です。ソケットはREST APIの応答を複製します。メッセージはソケット経由で即座に到達し、RESTは信頼性のフォールバックとして約10秒ごと（`SOCKET_ENABLED_TIMEOUT`）に更新を提供します。ADAMANTは意図的に「受信者に配信済み」というステータスを実装していません。これはプライバシーの理念に反するためであり、受信者がオフラインの場合は技術的に信頼できないからです。

ノードへの配信に失敗した場合、またはブロックチェーンがトランザクションを拒否した場合、メッセージは**送信失敗**とマークされます。

## 暗号資産送金ステータス

すべての暗号資産送金について、ADAMANTは各トークン独自のブロックチェーンにおけるトランザクションステータスを表示します。これは着信および送信の両方に適用されます。ワークフローは `保留中 → 登録済み → 成功 / 失敗 / 不整合` です。

送金は**保留中**（送信または確認中）から始まります。ノードがトランザクションが存在することを確認すると、**登録済み**になります。その後、ADAMANTは最終ステータス（**成功**（ネットワークで確認済み）、**失敗**（ネットワークにより拒否）、**不整合**（不一致が検出された））に達するまで確認を続けます。コインごとのトランザクション確認ルールは、[`adamant-wallets`](https://github.com/Adamant-im/adamant-wallets/#info-for-updating-in-chat-coin-transfer-tx-statuses)リポジトリの`txFetchInfo`に定義されています。仕様は[AIP-12](https://aips.adamant.im/AIPS/aip-12)に文書化されています。

特にADMのトランザクションについては、ステータスはトランザクションとともに直接提供されます：`confirmations > 0`の場合、送金は成功とマークされます。`confirmations = 0`の場合、保留中または登録済みのままです。

### バックグラウンドでのステータス確認メカニズム

ADM以外のブロックチェーンでは、ステータス確認には追加のノードまたはAPIリクエストが必要です。ADAMANTは、ユーザーに表示されるトランザクションのみを確認し、最終ステータスを受信したら確認を停止するバックグラウンドメカニズムを使用します。確認頻度はトランザクションの経過時間（新規または旧）に依存し、保留中のトランザクションには確認回数の制限があり、登録済みのトランザクションには無制限の確認が可能です。確認はネットワーク接続と関連するコインのノードが利用可能な場合にのみ実行され、オフラインでの無駄な試行を回避します。

アプリからブロードキャストされた直後、またはタイムスタンプが現在時刻から*X*分以内の場合は、トランザクションは**新規**と分類されます。それ以外の場合は**旧**とされます。しきい値は固定定数またはコインごとに計算可能です：

```js
const isNew = (admTransferTimestamp) =>
  Date.now() - admTransferTimestamp < newPendingTxFetchAttempts * newPendingTxFetchInterval;
```

この区別により、新しいトランザクションはより頻繁に確認され、古いトランザクションはより控えめに確認されます。

### 例：ビットコイン送金

`adamant-wallets`からの定数：

```jsonc
"txFetchInfo": {
    "newPendingInterval": 10000,
    "oldPendingInterval": 3000,
    "registeredInterval": 40000,
    "newPendingAttempts": 20,
    "oldPendingAttempts": 3
}
```

**新規保留中**のトランザクションの場合、アプリは10秒ごと（`newPendingInterval`）に最大20回（`newPendingAttempts`）確認し、合計約200秒のウィンドウがあります。ノードがトランザクションを検出すると（確認数が0でも）、**登録済み**になります。すべての試行後も未検出の場合は、**失敗**とマークされます。

**登録済み**のトランザクションについては、アプリは40秒ごと（`registeredInterval`）に確認を続け、トランザクションが確認済み（確認数≥1）になるか、ノードがエラーを返すまで無制限に試行します。

ユーザーはチャット内のステータスアイコンをタップすることで手動で再確認でき、これによりステータスが保留中にリセットされ、新しい検証サイクルがトリガーされます。トランザクションステータスはローカルに保存されず、パスワード、PIN、指紋でのログイン時に初めから再確認されます。

## 不整合検出

ADAMANTメッセージに記録されたデータと、トークンのブロックチェーンから取得されたデータが一致しない場合、送金は**不整合**とマークされます。以下のいずれかが該当する場合、不一致と判定されます：金額が約0.1～0.5%以上異なる、送信アドレスが異なる、受信アドレスが異なる、メッセージのタイムスタンプとブロックチェーンのトランザクションタイムスタンプが3時間以上異なる。

2つの特別なケースがさらに存在します。コインがサポートされていない場合（例：`xrp_transaction`）、アプリは送金を検証できず、暗号資産がサポートされていないことを示すメッセージを表示します。また、重複するトランザクションハッシュが検出された場合（同じTXハッシュが既に読み込まれたトランザクションに出現した場合）、送金は不整合とマークされ、1つのオンチェーントランザクションがチャット内で複数回カウントされるのを防ぎます。

不整合の理由は以下の順序で優先されます：不正なトランザクションハッシュ、重複トランザクション、送信アドレスの不一致、受信アドレスの不一致、金額の誤り、送信アドレスの取得失敗、受信アドレスの取得失敗、大きなタイムスタンプの差、一般的な確認失敗。各理由には、該当する場合、詐欺警告が含まれます。

## UIデモ

以下のスクリーンショットは、ADAMANT PWAおよびiOSクライアントでの送金ステータスの進行を示しています。

**DASH In-Chat PWA-dev v4.9.0 — 2025-03-04**

| 送金確認後（約10秒） | チャットで保留中と表示 | 詳細 — 保留中（約2分） |
|---|---|---|
| ![Discussion screenshot 1](/images/engineering-notes/github/discussions/9011944/001-61b4f6c1.webp) | ![Discussion screenshot 2](/images/engineering-notes/github/discussions/9011944/002-711b6dcc.webp) | ![Discussion screenshot 3](/images/engineering-notes/github/discussions/9011944/003-6eb732d9.webp) |

| 詳細なしで確認済み（約5秒） | 詳細ありで確認済み — 最終 | |
|---|---|---|
| ![Discussion screenshot 4](/images/engineering-notes/github/discussions/9011944/004-fcf2d419.webp) | ![Discussion screenshot 5](/images/engineering-notes/github/discussions/9011944/005-4e0f54a4.webp) | |

**DASH In-Chat iOS v3.11.0 — 2025-03-04**

| 確認後（約3秒） | チャットで保留中と表示 | 詳細 — 保留中（約2分） |
|---|---|---|
| ![Discussion screenshot 6](/images/engineering-notes/github/discussions/9011944/006-ac6db431.webp) | ![Discussion screenshot 7](/images/engineering-notes/github/discussions/9011944/007-a6e778a1.webp) | ![Discussion screenshot 8](/images/engineering-notes/github/discussions/9011944/008-f5034347.webp) |

| 詳細ありで確認済み — 最終 | | |
|---|---|---|
| ![Discussion screenshot 9](/images/engineering-notes/github/discussions/9011944/009-b08299f4.webp) | | |
