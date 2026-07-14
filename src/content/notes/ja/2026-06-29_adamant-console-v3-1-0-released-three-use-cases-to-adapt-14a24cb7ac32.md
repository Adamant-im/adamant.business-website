---
title: "ADAMANT Console v3.1.0：CLIおよびJSON-RPCのユースケース"
slug: "adamant-console-v3-1-0-released-three-use-cases-to-adapt-14a24cb7ac32"
description: "ADAMANT Console v3.1.0がGitHubとnpmで利用可能。CLI操作、JSON-RPC連携、ローカルJavaScriptラッパーの開発体験を刷新。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-console-v3-1-0-released-three-use-cases-to-adapt-14a24cb7ac32"
publishedAt: "2026-06-29T08:58:40.394Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/14a24cb7ac32/001-0-1kktbaowg0a7u8mr.webp"
cardSpan: "full"
originalId: "medium:14a24cb7ac32"
locale: "ja"
placeholder: false
---

ADAMANT Console v3.1.0がGitHubとnpmで利用可能になりました。このリリースにより、ConsoleはADAMANT Node v0.10.0と互換性を持つようになり、CLIの使用、JSON-RPCの統合、ローカルJavaScriptラッパー周りの開発体験が刷新されました。スクリプト、ボット、取引所インフラ、内部ツール、モニタリングダッシュボード、支払い自動化など、ADAMANTを活用するすべての開発者・運用担当者に向けたアップデートです。

### ADAMANT Consoleとは？

ADAMANT Consoleは、ADAMANTブロックチェーンと対話するためのコマンドラインおよびJSON-RPCツールです。アカウント、ブロック、トランザクション、チャット、デリゲート、ノードのステータスを確認したり、ADMの送金や暗号化メッセージの送信が可能です。また、任意の言語で書かれたサービス向けにローカルなJSON-RPCブリッジとして動作させたり、パスフレーズがADAMANTノードに送信されることのないよう、トランザクションをローカルで署名できます。特にこの点が重要です。Consoleはローカル署名を前提に設計されています。アプリケーションがアクションをローカルで準備し、Consoleがローカルで署名し、署名済みトランザクションのみをネットワークに送信するという流れになります。

### v3.1.0の新機能

本リリースの主な目的は、ADAMANT Node v0.10.0との互換性の確保です。主な変更点には、ノードの更新されたレスポンスおよびクエリ挙動のサポート、`adamant-api` v3へのアップグレード、新しい`node status`コマンドのサポート、チャットおよびトランザクションヘルパーの拡張、トランザクション検索における`returnUnconfirmed`のサポート、デリゲートをユーザー名、公開鍵、またはADAMANTアドレスで検索可能にする機能、`includeDirectTransfers`による直接送金フィルターの更新、CLIヘルプ例の改善、JSON-RPCメソッドのカバレッジ拡張、新設されたConsoleドキュメントサイトによる自動生成APIリファレンス、信頼された公開（Trusted Publishing）によるprovenance付きnpmパッケージのリリースなどが含まれます。サポート対象のランタイムはNode.js 22.13.0以降です。

インストールまたは更新方法：

```bash
npm install -g adamant-console
```

その後、ローカル環境を確認してください：

```bash
adm client version
adm node status
```

### ユースケース：チームワークフロー向けの暗号資産運用ボット

ADMの支払いまたはノードの可用性に依存するサービスを運用するチームは、ADAMANT Consoleをボットの背後に設置された小さなローカルブリッジとして利用できます。Telegram、Discord、SlackのボットがConsoleのコマンドまたはJSON-RPCメソッドを呼び出して、ノードの健全性、トランザクションのステータス、ウォレット残高、未確認の入金状況について問い合わせることが可能です。

CLIでの確認例：

```bash
adm node status
adm get address U123456789
adm get transaction 123456789 returnUnconfirmed=1
adm get transactions recipientId=U123456789,limit=10
```

これは、サポートデスク、モニタリングチャンネル、財務運用、内部インシデント対応において有用です。ボットはADAMANTプロトコルの詳細を知る必要はなく、Consoleを呼び出してJSONを解析し、人間向けに明確なステータスメッセージを提示するだけで済みます。

### ユースケース：ADMを利用したアプリのライセンス管理またはアクセス制御

もう一つの実用的なユースケースは、軽量なライセンス管理です。自己ホスティング型のアプリ、トレーディングツール、分析ダッシュボード、自動化サービスなどは、ユーザーが指定の支払いアドレスにADMを送金した時点でプレミアム機能を解放できます。バックエンドはユーザーに預け入れアドレスを割り当て、入金トランザクションを監視し、支払い金額とトランザクションのステータスを確認して自動的にアクセスを有効化し、オプションで暗号化されたADAMANTメッセージを領収書として送信できます。

サービスは以下のようにトランザクションを照会できます：

```bash
adm get transactions recipientId=U123456789,limit=20,returnUnconfirmed=1
```

または、確認メッセージを送信できます：

```bash
adm send message U123456789 "Your subscription is active"
```

大規模なアプリケーションでは、同じフローをJSON-RPC経由で実行できます。これにより、メインのバックエンドをPHP、Python、Go、Ruby、Javaなど、HTTPリクエストを発行できる任意の言語で記述できます。ConsoleはローカルのADAMANTブリッジとして機能します。

### ユースケース：取引所向けのJSON-RPCによる高速なADM入出金処理

取引所やカストディサービスは、入出金処理にシンプルで予測可能なインターフェースを必要とすることが多いです。ADAMANT ConsoleはローカルのJSON-RPCサーバーとして実行できます：

```bash
adm rpc server
```

デフォルトでは、通常`5080`である設定されたRPCポートでリッスンします。JSON-RPCサーバーは、ファイアウォールまたはプライベートネットワークの背後など、信頼できるインフラ上でのみ実行してください。サーバーがパスフレーズにアクセスできる場合は、署名インフラとして取り扱ってください。

ノードのステータスを確認：

```bash
curl -s -X POST http://127.0.0.1:5080 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"nodeStatus","params":[],"id":1}'
```

入金用アカウントを生成：

```bash
curl -s -X POST http://127.0.0.1:5080 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"accountNew","params":[],"id":2}'
```

生成された認証情報を安全に保管してください。パスフレーズや秘密鍵をログに記録しないでください。

入金を監視：

```bash
curl -s -X POST http://127.0.0.1:5080 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"getTransactionsReceivedByAddress","params":["U123456789"],"id":3}'
```

より柔軟なトランザクションスキャンには：

```bash
curl -s -X POST http://127.0.0.1:5080 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"getTransactions","params":["recipientId=U123456789","limit=20","returnUnconfirmed=1"],"id":4}'
```

取引所のバックエンドは、アドレス、トランザクションID、金額、タイムスタンプ、確認ポリシーに基づいて入金を照合できます。

出金処理：

```bash
curl -s -X POST http://127.0.0.1:5080 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"sendTokens","params":{"address":"U987654321","amount":"10ADM","passphrase":"your local passphrase"},"id":5}'
```

本番環境では、パスフレーズはログ、スクリーンショット、CI出力、共有されたシェル履歴などではなく、安全なローカルのシークレットストレージから取得するようにしてください。

### 今回のリリースの意義

ADAMANT Consoleは意図的に軽量に設計されています。完全なSDKやカスタムバックエンドを置き換えるものではありません。代わりに、開発者や運用担当者が、簡易スクリプト、ローカル署名、ボット連携、取引所の自動化、支払い確認、運用モニタリング、非JavaScriptスタックからのJSON-RPCアクセスに使える実用的なツールを提供します。v3.1.0により、このツールはADAMANT Node v0.10.0および最新のADAMANT JavaScript APIスタックと完全に整合性を持つようになりました。
