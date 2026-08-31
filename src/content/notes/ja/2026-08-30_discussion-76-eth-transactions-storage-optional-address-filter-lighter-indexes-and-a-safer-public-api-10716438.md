---
title: "ETH-transactions-storage：オプションのアドレスフィルタ、軽量インデックス、および安全なパブリックAPI"
slug: "discussion-76-eth-transactions-storage-optional-address-filter-lighter-indexes-and-a-safer-public-api-10716438"
description: "ETH-transactions-storageは、Ethereumノードを追跡してネイティブETHおよびERC-20の転送アクティビティをPostgreSQLに保存し、REST APIとして公開するセルフホスト型Ethereumインデクサーです。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/76"
publishedAt: "2026-08-30T20:51:54Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10716438"
locale: "ja"
placeholder: false
---

[ETH-transactions-storage](https://github.com/Adamant-im/ETH-transactions-storage)は、Ethereumノードを追跡してネイティブETHおよびERC-20の`transfer(address,uint256)`アクティビティをPostgreSQLに保存し、PostgRESTを通じて読み取り専用のREST APIとして公開するセルフホスト型Ethereumインデクサーです。Ethereumノードはアドレス履歴のクエリに直接回答できないため、ウォレット、DApps、トレジャリー、およびオペレーターは通常サードパーティのエクスプローラーに依存しています。このプロジェクトは、APIキーのベンダー、追跡、テレメトリを必要としない、自前で運用可能な代替手段です。

`dev`ブランチには、[PR #29](https://github.com/Adamant-im/ETH-transactions-storage/pull/29)でマージされた**オプションのアドレスフィルタ**が含まれるようになりました。フルチェーンのインデックス作成は引き続きデフォルトであり、ADAMANTウォレットで使用されています。フィルタリングモードは、特定の既知のアドレスセットのみが必要で、チェーンの残りの部分を保存したくないオペレーターを対象としています。

## フィルタが存在する理由

パブリックなEthereumインデクサーは巨大なデータベースです。約4億9000万行のメインネットの1年分のデータセットにおいて、従来のフルインデックスセットは数百ギガバイトを消費していました。多くのオペレーターにはこれほどの規模は必要ありません。独自のユーザーのみにサービスを提供するウォレットやカストディアルバックエンド、少数の運用アドレスを監視するプロジェクトのトレジャリー、アプリ固有のアドレスセット用のセルフホスト型エクスプローラー、あるいは小規模に保つべきラボやCI環境など、選択的な保存は多くのケースで有益です。フィルタを使用しても既存のAPIコントラクトは維持されるため、クライアントは引き続き`/ethtxs`、`/max_block`、`/aval`に対してクエリを実行できます。オペレーターは読み取り方法ではなく、保存する内容を変更することになります。

## アドレスフィルタの動作

フィルタはデフォルトで無効になっています（`ADDRESS_FILTER_ENABLED=false`）。これを有効にすると、`ADDRESS_FILTER_FILE`がプライベートリスト（デフォルトは`filter/addresses.txt`。gitignoredであり、Dockerイメージにはコピーされません）を指すようになります。リストは1行につき1つの`0x`で始まる40文字の16進数アドレスを受け入れ、空行や`#`で始まるコメントは無視され、大文字と小文字は区別されません。ネイティブ転送は`txfrom`または`txto`と一致します。サポートされているERC-20の`transfer(address,uint256)`呼び出しは、送信者（`txfrom`）、トークンコントラクト（`txto`）、およびABIエンコードされた受信者（`contract_to`）と一致します。

リストは同期パスの前に毎回再読み込みされるため、インデクサーを再起動することなく、追加や削除が反映されます。無効なリスト、空のリスト、またはリストが存在しない場合は「フェイルクローズ」となり、すべてを黙って保存するのではなく、ファイルが修正されるまでインデックス作成が停止します。フィルタによって拒否されたトランザクションについては、レシートRPCがスキップされます。

既存のインデクサーの制限は変わりません。フィルタは、内部ETH転送、直接的な`transfer(address,uint256)`ではないERC-20フロー（`transferFrom`、ルーター、マルチシグ、バッチ/アグリゲーター呼び出しなど）、またはアドレスが追加された際の過去の自動バックフィルをキャプチャしません。フィルタを有効にしても、すでに保存されている行は削除されません。再構築はオペレーターによる手動操作が必要です。インデクサーを停止し、1つのトランザクションで`ethtxs`と`sync_state`の両方を切り詰める（または両方をブロック`N`まで巻き戻す）、`START_BLOCK`を設定して再起動します。`ethtxs`のみを切り詰めても、チェックポイントがチェーンを完了済みとして報告するため、再スキャンは行われません。

## 耐久性のある同期進捗

フィルタリングされたブロックや空のブロックは以前は「何も起こらなかった」ように見えたため、インデクサーがそれらを再スキャンする可能性がありました。`dev`ブランチでは、単一行の`public.sync_state`チェックポイントを保持し、そのブロックの挿入と同じPostgreSQLトランザクションで更新されるようになりました。`/max_block`エンドポイントは引き続き`{ max, version }`を返しますが、`max`は`GREATEST(MAX(ethtxs.block), sync_state.last_block)`となります。起動時の処理では、最後に処理されたブロックをチェックポイントと原子的に巻き戻します。`create_tables.sql`スクリプトはべき等であり、`sync_state`を作成し、既存の最も高いトランザクションブロックから初期化し、これらのロールが存在する場合は`api_user`および`app_user`にDML権限を付与します。`web_anon`ロールは`sync_state`を直接読み書きできません。

## インデックス、APIの強化、および運用

アドレスフィルタは、[PR #28](https://github.com/Adamant-im/ETH-transactions-storage/pull/28)による他の`dev`作業に基づいて構築されています（GitHubリリースにはまだ含まれておらず、最新タグは[v2.4.1](https://github.com/Adamant-im/ETH-transactions-storage/releases/tag/v2.4.1)のままです）。最小限の5つのインデックスセットがADAMANT WebおよびiOSのクエリ形状をカバーしており、従来の8つのインデックスセットと比較して、1年分のデータセットあたり約90〜110GBを節約できます。PostgRESTの匿名ロール`web_anon`は、`ethtxs`、`aval`、`max_block`に対して`SELECT`のみが可能になり、`db-max-rows = 10000`によってシリアル化された結果サイズが制限されるため、制限のない`GET /ethtxs`によってAPIがOOM（メモリ不足）になることはありません。

パブリックなデプロイメントでは、nginxによる保護が強化されました。メソッドの許可リスト（`GET`/`HEAD`/`OPTIONS`）、`/ethtxs`での`txfrom`または`txto`の必須化、および`Prefer: count=exact`や巨大なオフセットの拒否が含まれます。`.env`ワークフローはテンプレート付きで文書化され、シークレットはGitに含まれず、Composeはハードコードされたデータベースパスワードを出荷しなくなりました。DB診断はより安全になり、接続URIは正しく機能し、パスワードはログから削除されます。`AGENTS.md`ファイルは、リポジトリのコントリビューターおよびオペレーターの契約を定義しています。

既存のsystemdホストは、コードおよびスキーマのアップグレード中も現在のユニットを維持してください。新しいインデクサーを起動する前に`ON_ERROR_STOP`を使用して`create_tables.sql`を適用し、同等の値を持つ本番環境の`.env`が存在するまでリポジトリの`ethsync.service`をコピーしないでください。

## 対象読者

ADAMANTは、[adamant-im](https://github.com/Adamant-im/adamant-im)および[adamant-iOS](https://github.com/Adamant-im/adamant-iOS)が中央集権的なエクスプローラーなしでEthereumおよびERC-20の履歴を表示できるように、このインデクサーを使用しています。同じバイナリは、ウォレット、決済処理業者、トークン発行者、および独自のPostgreSQLとアクセスポリシーの下でアドレスインデックス付きのEthereum履歴を必要とするすべての人のための、汎用オープンソースサービスです。セルフホストしてパブリックAPI用にフルチェーンモードを維持するか、フィルタを有効にして実際にサービスを提供するアドレスのみを保存してください。
