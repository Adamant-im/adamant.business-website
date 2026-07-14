---
title: "ADAMANT Bounty Bot：自動暗号通貨支払いによるインタラクティブキャンペーン"
slug: "adamant-s-interactive-bounty-bot-for-cryptocurrency-projects-51fec10f93b9"
description: "ADAMANT Bounty Botは、ADAMANT Messenger内のチャットを通じてバウンティキャンペーンやエアドロップを実施するためのオープンソースツールです。タスクの検証と支払いを自動化します。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamants-interactive-bounty-bot-for-cryptocurrency-projects-51fec10f93b9"
publishedAt: "2020-09-11T08:11:44.041Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/51fec10f93b9/001-1-gjb4fgnplpza3buymtpy6w-png.webp"
cardSpan: "full"
originalId: "medium:51fec10f93b9"
locale: "ja"
placeholder: false
---

ADAMANT Bounty Botは、暗号通貨プロジェクトがADAMANT Messenger内のチャットを通じてバウンティキャンペーンやエアドロップをインタラクティブに実施できるように設計されたオープンソースツールです。タスクの検証と支払いを自動化することで、専任のバウンティマネージャーを必要とせず、参加者への支払い遅延を解消します。

### 専用のバウンティボットが必要な理由

従来のバウンティキャンペーンでは、マネージャーがBitcointalkなどのフォーラムに条件を掲載し、キャンペーン終了後に参加者の達成状況を手動で確認していました。この方法はユーザーにとって不便であり、プロジェクト所有者にとってはコストがかかります。ADAMANT Bounty Botはこのプロセスを合理化します。参加者はチャット内でボットと直接やり取りし、ボットが完了したタスクを自動で検証し、ADM、ETH、またはERC-20トークンで即座に報酬を支払います。

現在、ボットはTwitterキャンペーン（アカウントのフォロー、コメント付きリツイート、友人の言及、ハッシュタグの使用）およびユーザーが他者を招待するADAMANT紹介キャンペーンをサポートしています。ボットはオープンソースであるため、開発者が追加のソーシャルネットワークをサポート対象に含めることもできます。

### 動作の仕組み

ボットはサーバー上で常時実行されます。インストール後、参加者がフォローすべきTwitterアカウント、リツイートすべきツイート、リツイートコメントに含めるべき内容などのキャンペーン設定を構成します。ボットはユーザーのメッセージを追跡し、タスクの達成を確認して報酬を支払い、統計情報を蓄積します。また、同一ユーザーが複数のソーシャルメディアアカウントを使用して報酬を重複して受け取るのを防ぐために、重複アカウントを検出します。

### 必要条件

ボットを実行するには、基本的なLinuxおよびNode.jsのスキルが必要です。サーバーの要件は最小限で、Ubuntuを搭載した任意のVPS（例：Digital Ocean、Ramnode、Scaleway、Hetzner）で十分です。完全なADAMANTノードのインストールは任意ですが、分散化を支援するために、ディスク容量40GB以上、RAM 1GB以上のマシンではインストールを推奨します。また、ボット用のADAMANTウォレット、支払い用の資金入り暗号通貨ウォレット（ERC-20の送金手数料はETHで支払われるため、ボットのETHウォレットも適宜チャージする必要があります）、Twitterキャンペーンを実施する場合はTwitter APIキー、およびサーバー上にインストールされたMongoDBが必要です。

### コマンド

ボットは複数のユーザーおよび管理者コマンドに応答します。ユーザーは`/help`でキャンペーン情報、`/rates`でトークンの市場価格、`/calc`で暗号通貨間の換算を確認できます。管理者は`/balances`でボットのウォレット残高を確認し、`/test`で`/test twitterapi`などの診断を実行できます。

### インストール

ボットは`adamant`ユーザーの下でインストールする必要があります。以前にADAMANTノードをインストールしている場合、このユーザーはすでに存在します。リポジトリをクローンして依存関係をインストールします：

```bash
su - adamant
git clone https://github.com/Adamant-im/adamant-bountybot.git
cd ./adamant-bountybot
npm i
```

### 設定

テキストエディタで`config.json`を開きます。設定すべき主なパラメータを以下に示します。

**`passPhrase`** — ボットのADMアカウントのシードフレーズ。既存のアカウントを再利用せず、必ず新しいアカウントを作成してください。

```json
"passPhrase": "scatter tomato doctor also stay tell success pause gift clip hungry october",
```

**`twitter_follow`** — 参加者が報酬を得るためにフォローすべきTwitterアカウント。無効にする場合は空の配列に設定します。

```json
"twitter_follow": [
  "@adamant_im",
  "@BitZ_Group"
],
```

**`twitter_retweet_w_comment`** — コメント付きでリツイートすべきツイートを定義します。`min_mentions`は言及すべき友人の数を設定し、`hashtags`は必須のハッシュタグを指定します。無効にする場合は空の配列に設定します。

```json
"twitter_retweet_w_comment": [
  {
    "tweet": "https://twitter.com/adamant_im/status/1272945640574722048",
    "min_mentions": 3,
    "hashtags": [
      "#privacy",
      "#decentralization"
    ]
  }
],
```

**`adamant_campaign`** — 参加者がADAMANTに招待すべき新規ユーザー数（`min_contacts`）を設定します。紹介されたユーザーは、最初のメッセージが3日以内に送信され、キャンペーン参加者に送られた場合にカウントされます。無効にする場合は`0`に設定します。

```json
"adamant_campaign": {
  "min_contacts": 3
},
```

**`rewards`** — 全タスクを完了した各ユーザーに対する支払い金額および通貨を指定します。

```json
"rewards": [
  {
    "currency": "ADM",
    "amount": 100
  },
  {
    "currency": "ETH",
    "amount": 0.01
  }
],
```

**`twitter_api`** — Twitter開発者ポータルから取得したTwitter API認証情報。Twitterキャンペーンを実施しない場合は空のままにしてください。

```json
"twitter_api": {
  "consumer_key": "jsoQSRzVYWTUE88t",
  "consumer_secret": "6l7w0vqHCEIkmjbdR8ubTxzhJZRk1JUlSUonu5",
  "access_token_key": "86823450088-il17SnfGmxQCYW9bAGAnFB2aW4",
  "access_token_secret": "W0k1armrFUL8ATzJwAJ2x9yuxojKIEtRaphT"
},
```

**`admin_accounts`** — 管理者コマンドを受け付けるために、あなたの個人的なADMアドレスを設定します。これはボット自身のアドレスとは異なるものでなければなりません。

```json
"admin_accounts": [
  "U14818108337685946763"
],
```

**`welcome_string`**および**`help_message`** — ユーザーに表示されるウェルカムメッセージおよびヘルプテキスト。両方ともMarkdownをサポートし、`${config.rewards_list}`、`${config.twitter_follow_list}`などの設定変数を参照できます。

**`adamant_notify`**および**`slack`** — 任意ですが推奨される通知チャネル。ADAMANT通知を使用する場合、`admin_accounts`とは異なるアドレスを指定してください。

```json
"adamant_notify": "U48110833768594688888",
"slack": "https://hooks.slack.com/services/T7YUJW/LKHHD/rDKFJZ94FOhbkn49eOfq",
```

### ボットの実行

pm2プロセスマネージャーを使用してボットを起動します。ADAMANTノードをインストール済みの場合、pm2はすでに利用可能です。そうでない場合は`sudo npm install -g pm2`でインストールしてください。

```bash
pm2 start --name bountybot app.js
```

ボットがメッセージに応答しない場合は、ログを確認してください：

```bash
pm2 logs bountybot
```

マシンの再起動後にボットが自動的に再起動するようにするには、cronエントリを追加します：

```bash
crontab -e
```

以下の行を追加して保存します：

```
@reboot cd /home/adamant/adamant-bountybot && pm2 start --name bountybot app.js
```

![ADAMANTのインタラクティブなバウンティボット（暗号通貨プロジェクト向け）](/images/engineering-notes/medium/51fec10f93b9/002-0-turkg-jxhihlqu39.webp)
