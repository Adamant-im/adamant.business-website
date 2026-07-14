---
title: "ADAMANTのTestnetインフラの更新"
slug: "updating-the-testnet-infrastructure-for-adamant-aac36fea2a56"
description: "ADAMANTのTestnetインフラを更新し、開発・テスト・コミュニティ貢献をより効果的に支援。アクセシビリティと安定性の向上が主な目的です。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/updating-the-testnet-infrastructure-for-adamant-aac36fea2a56"
publishedAt: "2025-10-23T15:31:46.542Z"
author: "Alex Web3"
authorUrl: "https://medium.com/@al.onyxprotocol"
sourceAccount: "al-onyx"
coverImage: "/images/engineering-notes/medium/aac36fea2a56/001-1-gpu744hucponr8ep2jojwa-png.webp"
cardSpan: "full"
originalId: "medium:aac36fea2a56"
locale: "ja"
placeholder: false
---

### Testnetの重要性

ADAMANTのtestnetインフラは、[Issue #148](https://github.com/Adamant-im/adamant/issues/148)で、開発、テスト、コミュニティからの貢献をより適切に支援するために更新と安定化が必要であると指摘されました。この議論から、2つの優先事項が浮かび上がりました。1つはアクセシビリティで、新しい貢献者が複雑なセットアップなしにノードを立ち上げられるようにすること。もう1つは安定性で、テストノードが本番環境と同様の条件を確実に再現できるようにすることです。

### ADM Testnet用ブートストラップイメージ

testnetのデータベースのスナップショットをダウンロード可能にしており、最新のtestnet状態にすでに同期済みの新しいノードをすばやくセットアップでき、大幅に導入時間を短縮できます。

testnetノードをインストールした後、スナップショットをダウンロードしてください：

```bash
wget https://testnet.adamant.im/db_test_backup.sql.gz
```

解凍します：

```bash
gunzip db_test_backup.sql.gz
```

スナップショットをtestnetノードのデータベースに読み込みます：

```bash
psql adamant_test < db_test_backup.sql
```

### 公開Testnetノード

ADAMANT testnetは、ピア発見、ネットワーク同期、APIアクセスのために事前に定義された公開ノードのリストを提供しています。公式な情報源は、リポジトリ内の[公式設定ファイル](https://github.com/Adamant-im/adamant/blob/dev/test/config.default.json)です。執筆時点で、以下の3つのノード（すべてポート36667使用）がリストされています：

```json
"list": [
  {
    "ip": "162.55.32.80",
    "port": 36667
  },
  {
    "ip": "81.0.247.181",
    "port": 36667
  },
  {
    "ip": "95.217.19.144",
    "port": 36667
  }
]
```

最初のノード（`testnode1.adamant.im`）はtestnetエクスプローラもホストしています。2つ目のノードはドメインがなく、公開APIも無効です。3つ目のノード（`testnode3.adm.im`）は公開APIを提供しており、たとえば`https://testnode3.adm.im/api/node/status`にアクセスするとノードのステータスを取得できます。

### テストの実行

貢献者およびバリデータは、プロジェクトの[貢献ガイドライン](https://github.com/Adamant-im/adamant/blob/dev/.github/CONTRIBUTING.md)に従って、自身のノードに対してユニットテストおよびAPIテストを実行する必要があります。

### Testnet ADMの取得とアプリへのアクセス

メインネットと同じフェーシャーから、3500のtestnet ADMを取得できます：[https://adamant.im/free-adm-tokens](https://adamant.im/free-adm-tokens/)。testnet版メッセンジャーは[https://dev-adamant-testnet.surge.sh](https://dev-adamant-testnet.surge.sh)で利用可能で、devブランチから自動ビルドされています。testnetエクスプローラは[https://testnet.adamant.im](https://testnet.adamant.im/)にあります。
