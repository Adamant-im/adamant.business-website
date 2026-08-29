---
title: "プライベートWebUI：ADAMANTマーケットメイキングソフトウェア用セルフホスト型フリートコンソール"
slug: "discussion-75-scenario-a-private-webui-self-hosted-fleet-console-live-situation-and-mm-health-10709518"
description: "ADAMANTマーケットメイキングソフトウェアのフリートを管理するセルフホスト型WebUI（シナリオA）の進捗状況報告です。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/75"
publishedAt: "2026-08-29T09:35:34Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10709518"
locale: "ja"
placeholder: false
---

## コンテキスト

本稿は、プライベートなセルフホスト型WebUIの**シナリオA**に関する進捗報告です。これは、ADAMANTマーケットメイキングソフトウェアのインスタンス群を単一のオペレーターコンソールで管理するためのものです。なお、シナリオB（パブリックサブスクリプションWebUI、アウトバウンドリレー、ライセンストークン）については本稿では扱いません。

オペレーター向けの重要なアーキテクチャ上のルールとして、ブラウザおよびWebUIバックエンドは取引所に直接通信を行いません。チャート、オーダーブック、残高、パラメータ、コマンドのすべてが、各ボットの `/api/v1` を経由して流れます。取引所のAPIキーはボット内に保持されます。

## 現在利用可能な機能

ローカルのWebUIプロセス（Vite UI + Fastify BFF）は、`private_webui` が有効で共有HMACシークレットを持つ1つ以上のボットに接続します。各ボットはURLで追加します。フリートのレジストリはWebUI側で保持され、ボット側では保持されません。オペレーターアカウント、2FA、およびロールはWebUI上で管理され、ボット側は `{ login, role }` を含む署名済みJWTを検証するのみです。

![WebUIサインイン](/images/engineering-notes/github/discussions/10709518/001-65a9054569.webp)

*サインイン画面。オペレーターの認証情報はWebUI上に存在します（メールアドレス / ADM / ETH + 必須の2FA）。各ボットは署名済みJWTをチェックするだけで、ボット側にログインエンドポイントは存在しません。*

## フリートタブとマーケットデスク

ヘッダーのタブはそれぞれ1つのボットを表します。ステータスを示すドットは、JWT認証された `GET /api/v1/status` エンドポイントから取得され、`working`（稼働中）、`degraded`（機能低下）、`stopped`（停止中）を報告します。これはパブリックな生存確認プローブとは異なります。パブリックな `GET /api/v1/health` エンドポイントは `{ status, transport }` のみを返すため、到達可能なバインドアドレスからMM（マーケットメイキング）の品質情報が漏洩することはありません。

**Market**ビューでは、ボットの注文がオーバーレイされたローソク足、スプレッド付きのライブオーダーブック、24時間のレンジと出来高、コインおよびUSD建てのペア在庫、そして手動での指値注文配置が可能です。ブックの行をクリックすると、サイド、価格、数量が入力されます。キャンセルを実行すると `{ id, market, side }` が送信され、取引所側ですでに注文が消滅している場合はその行が削除されます。

![マーケットデスク](/images/engineering-notes/github/discussions/10709518/002-04f3b72fdc.webp)

*Market画面。BiFinanceにおける `PENGUIN/USDT` のローソク足、オーダーブック、USD在庫、注文配置機能。マルチボットフリート内の1つのタブの様子です。*

## パラメータとライブ状況

**Parameters**では、完全な `WebUiTradeParams` フォームが公開されます。これには、MMのマスタースイッチに加え、ボットの `capabilities` に従うグループが含まれます（`trade/mm_*.js` モジュールが欠落している場合はロックされます）。流動性、価格監視、ラダー、ボリュームトレーダー、アナログヒントなどの設定は `PUT /params` を通じて編集され、Socket.IOの `params:updated` を介してライブ更新されます。

**Live situation**は、ブラウザ上で12時間のストリップを表示します。これには在庫（ベース通貨 + クォート通貨USD）および目的別のオープンオーダーの想定元本が含まれます。ボットが接続されている間、バーが塗りつぶされます。黄色の時間枠はその時間が `degraded` であったことを示し、グレーはMMが `stopped` であったことを示します。枠はチャート全体の高さではなく、バーに沿って表示されます。

ボット側では、MMの品質は `trade/mm_*.js` の外部でサンプリングされます。`/start`（またはPUT MM on）を呼び出すと、`mm_generalInitTs` と `mm_generalRestartTs` が同じ値でスタンプされます。MMがオンの状態でプロセスが再起動した場合、初期化時刻は維持されますが再起動時刻は更新されるため、クリーンな起動とクラッシュ後の再起動を区別できます。

![パラメータとライブ状況](/images/engineering-notes/github/discussions/10709518/003-5723175f10.webp)

*Parameters画面。MMマスタースイッチ、12時間のLive situation（在庫およびオープンオーダーの$額）、流動性、価格監視、ラダー設定。モジュールがボットビルドに含まれていない場合、グループはロックされます。*

## コマンドと監査証跡

**Commands**は、メッセンジャーやCLIと同じハンドラ（fill、close、make-price、TWAP、transfer、withdraw、queries）をラップしたものです。破壊的なPOST操作には確認が必要です。右側のコンソールには、ボットのマークダウンフィード（残高、キャンセル、エポックリセットなど）が表示されます。

**Events**はSQLiteに保存されるWebUIの監査ログであり、誰が何を変更したか（`admin@…` 対 `bot`）を記録します。パラメータとコマンドの両方をカバーし、検索、フィルタリング、JSONエクスポートが可能です。

![コマンドコンソール](/images/engineering-notes/github/discussions/10709518/004-2adccfacb9.webp)

*Commands画面。Fill / close / make-price フォームとライブコンソール。ADAMANT MessengerやCLIと同じコマンドセットがデスク用に構造化されています。*

![イベント監査](/images/engineering-notes/github/discussions/10709518/005-9665688ad1.webp)

*Events画面。タイムスタンプ付きのパラメータ切り替えとコマンドペイロード。オペレーターまたはボットのいずれかに帰属します。*

## オペレーター向けコントラクトノート

`GET /health` エンドポイントはJWTを必要とせず、`{ status, transport }` のみを返します。これは引き続き `private_webui_bind_host` と許可リストにバインドされています。JWT認証された `GET /status` は、`mmActive`、`mmState`、オプションの初期化および再起動タイムスタンプ、猶予期間、機能低下の理由を返します。`GET /params` は完全なスナップショットを提供し、`PUT /params` は変更されたスライスのみを適用するため、無関係なモジュールが再有効化されることはありません。`POST /commands/cancel` はオプションの `side` フィールド（`buy` または `sell`）を受け入れます。ロールに関して、`read-only` のJWTは書き込みを行えませんが、`role` フィールドのないトークンは従来のフルアクセス権限を保持します。`/status` を持たない古いボットもフリート内に表示されますが、その場合WebUIは肥大化した `/health` ペイロードにフォールバックします。

## 今回のリリースに含まれないもの

シナリオB（リレー、決済セッション、ライセンス範囲）は除外されています。ティッカー、ブック、残高データは、WebSocketプッシュではなく、約10秒間隔のRESTポーリングを引き続き使用します。ブラウザとWebUIは取引所と直接通信を行いません。
