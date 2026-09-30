---
title: "ADAMANT IPFS Node v0.1.0: 制限付きストレージと決定論的レプリケーション"
slug: "discussion-80-adamant-ipfs-node-v0-1-0-released-from-master-bounded-storage-deterministic-replication-an-10920610"
description: "ADAMANT IPFS Nodeの最初のタグ付きリリースv0.1.0が公開されました。コンテナイメージは ghcr.io/adamant-im/ipfs-node:0.1.0 から入手可能です。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/80"
publishedAt: "2026-09-30T11:31:18Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10920610"
locale: "ja"
placeholder: false
---

ADAMANT IPFS Nodeの最初のタグ付きリリースがv0.1.0として公開されました。コンテナイメージは `ghcr.io/adamant-im/ipfs-node:0.1.0` です。このスタンドアロンのNode.jsおよびHeliaアプリケーションは、アプリケーションのファイル配信用のIPFSストレージノードとして機能します。Kuboのラッパーではなく、Kubo互換のAPIも公開していません。ADAMANT Messengerが参照デプロイメントですが、あらゆるアプリケーションでこのノードをセルフホスト可能です。

サービスランタイムは、ヘルスチェック、管理詳細、マルチパートアップロード、CIDによるダウンロード、ストレージメトリクスなど、12のパスで構成されるExpress APIを公開しています。アクセス権限は中央で管理され、管理キーはフェイルクローズ方式を採用しており、CORSは明示的な許可リスト形式です。ストレージのライフサイクルには、データストアベースのファイルレジストリ、耐久性のあるステートマシン、ディスク予約、取り込み予算、TTL付きの一時アップロード、およびウォーターマーク駆動型のガベージコレクションが含まれます。配置には設定されたピアセットに対する決定論的なランデブーハッシュを使用し、ファイルの経過時間に応じてコピー数を削減します。レプリケーションは、準備、コミット、ロールバックのステージングを備えたバージョン管理プロトコル上で実行されます。各アップロードセッションは作成されたブロックを追跡し、拒否または中断されたリクエストがそのブロックを確実に削除するようにします。

ヘルスチェックポイントはネットワークを認識し、永続化された単調増加する高さと明示的なメンバーシップエポックを持ち、設定されたピアからの証明のみを受け入れます。メッシュの信頼性向上として、libp2p pingによる定期的な生存確認（失敗時のセッションリセットを含む）や、古いレプリケーションストリームエラー後のリアクティブなリカバリが実装されています。CORSおよびエラーコードの更新により、オプトインの正確な `app://.` デスクトップオリジン、機械可読な `code` 値、およびTor Browser互換性のためにv3隠しサービス形式に限定された `http(s)://*.onion` ワイルドカードが導入されました。

コンテナは `node:24.13.0-bookworm-slim` をベースに、マルチステージのDockerfileを使用してビルドされています。権限のない `node` ユーザーとして `HOME=/data` で実行され、単一のボリュームでブロックストア、データストア、ピアID、ピン、レジストリ、修復カーソル、ヘルスチェックポイントを保持できます。イメージには設定が含まれていないため、運用者は `/app/config.json5` に設定をマウントする必要があります。`linux/amd64` および `linux/arm64` 向けに公開されており、SBOMと来歴証明（provenance attestation）が含まれています。

このノードはDHT、IPNS、パブリックゲートウェイ、Kubo APIを明示的に使用しません。保存されたコンテンツはパブリックIPFSネットワークにはアナウンスされず、パブリックネットワークのコンテンツをこのノード経由で取得することもできません。制御されたピアトポロジによりコンテンツルーティングメタデータの公開は抑制されますが、デプロイメントが本質的にプライベート、匿名、トラストレス、または検閲耐性を持つわけではありません。アップロードとダウンロードは設計上認証されておらず、唯一の認証情報として単一の管理キーのみを使用します。今後の課題として、アップローダー署名による削除、ピアディスカバリ、トラフィックアカウンティング、絶対データディレクトリ、パブリックネットワークとの相互運用性が挙げられます。

ノードを実行するには、データボリュームを作成し、適切な設定とポートマッピングを指定してコンテナを起動します。

```bash
docker volume create ipfs-node-data

docker run -d \
  --name ipfs-node \
  --restart unless-stopped \
  --stop-timeout 20 \
  -v ipfs-node-data:/data \
  -v "$PWD/config.json5:/app/config.json5:ro" \
  -p 127.0.0.1:4000:4000 \
  -p 4001:4001 \
  ghcr.io/adamant-im/ipfs-node:0.1.0
```

このリリースは、CI、セキュリティ監査、および両アーキテクチャでのコンテナスモークテストを通じて検証されました。公開ワークフローでは、タグが `master` の祖先であること、`package.json` のバージョンと一致していることを確認し、OCIラベル、SBOM、来歴証明を付与して再ビルドした後に2回目のスモークテストを実施しています。
