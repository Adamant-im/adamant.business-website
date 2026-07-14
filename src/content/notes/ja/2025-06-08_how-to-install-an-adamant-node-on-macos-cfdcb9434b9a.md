---
title: "macOSにADAMANTノードをインストールする方法"
slug: "how-to-install-an-adamant-node-on-macos-cfdcb9434b9a"
description: "このガイドでは、macOSにADAMANT Messengerのブロックチェーンノードをゼロからインストールおよび実行する方法を説明します。開発ツール、PostgreSQL、Node.js、再起動後の自動起動設定も含まれます。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/how-to-install-an-adamant-node-on-macos-cfdcb9434b9a"
publishedAt: "2025-06-08T16:04:37.394Z"
author: "Alex Web3"
authorUrl: "https://medium.com/@al.onyxprotocol"
sourceAccount: "al-onyx"
coverImage: "/images/engineering-notes/medium/cfdcb9434b9a/001-1-v00ichfaftdwhvumrvfkxq-png.webp"
cardSpan: "full"
originalId: "medium:cfdcb9434b9a"
locale: "ja"
placeholder: false
---

このガイドでは、**macOS**に**ADAMANT Messengerブロックチェーンノード**をゼロからインストールおよび実行する方法について説明します。開発ツール、PostgreSQL、Node.js、および再起動後の自動起動設定も含まれます。

macOS 13 Ventura以降でテスト済み。ノードタイプ：`mainnet`または`testnet`。所要時間：約15～30分。

ADAMANTノードを実行することで、ADAMANT Messengerを支える完全に分散型でプライバシー重視のブロックチェーンをサポートできます。ネットワークを強化し、ブロックチェーンデータに直接アクセスでき、検証者／デリゲートになればdPoS報酬も受け取れます。

### 前提条件

macOS 13（Ventura）以降を搭載したMac、管理者ユーザーアカウント、安定したインターネット接続、約50 GBの空きディスク容量、およびターミナルの基本的な操作スキルが必要です。`Cmd + Space`を押して「Terminal」と入力し、Enterキーを押すことでターミナルを開きます。

### Appleコマンドラインツールのインストール

コードのコンパイルやGitの使用には、Appleの開発者ツールが必要です：

```bash
xcode-select --install
```

ポップアップが表示され、インストールの確認を求められます。承認し、完了まで待ちます。

### Homebrewのインストール

Homebrewは、PostgreSQLやその他の依存関係をインストールするために使用されるmacOS用パッケージマネージャーです：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

![How to Install an ADAMANT Node on macOS](/images/engineering-notes/medium/cfdcb9434b9a/002-1-vp1mtcppml-dgtygq6vb9q-png.webp)

*Enter*キーで確認します。インストール後、「Next steps」セクションに表示される手順（通常は`~/.zprofile`や`~/.bash_profile`などのシェル設定にHomebrewを追加）に従ってください。シェルを再読み込みします：

```bash
source ~/.zprofile  # or ~/.bash_profile depending on your shell
```

### 必要なパッケージのインストール

PostgreSQL、Redis、Git、およびその他の必要なツールをインストールします：

```bash
brew install postgresql redis git make automake autoconf libtool jq htop
```

PostgreSQLとRedisを起動および有効化します：

```bash
brew services start postgresql
brew services start redis
```

### PostgreSQLデータベースのセットアップ

ADAMANT用のPostgreSQLユーザーとデータベースを作成します：

```bash
# Customize these as needed
DB_USER=adamant
DB_NAME=adamant_main
DB_PASSWORD=securepassword

psql postgres -c "CREATE ROLE $DB_USER LOGIN PASSWORD '$DB_PASSWORD';"
psql postgres -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;"
```

### NVMとNode.jsのインストール

Node Version Manager（NVM）とNode.js 22 LTS（コードネームJod）をインストールします：

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.nvm/nvm.sh
nvm install 22
```

*pm2*（Node.jsプロセスマネージャ）をインストールします：

```bash
npm install -g pm2
```

*pm2*のログローテーションを設定します（オプションですが推奨）：

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 500M
pm2 set pm2-logrotate:retain 5
pm2 set pm2-logrotate:compress true
pm2 set pm2-logrotate:rotateInterval '0 0 0 1 *'
```

### ADAMANTノードのクローンとセットアップ

整理されたセットアップのために、`~/Applications`ディレクトリを使用します（ホームディレクトリ内の個人用フォルダで、システム全体の`/Applications`とは異なります）：

```bash
mkdir -p ~/Applications
cd ~/Applications
```

GitHubからADAMANTリポジトリをクローンします：

```bash
# Customize these as needed
NETWORK=mainnet   # or testnet
BRANCH=master     # or desired Git branch

git clone https://github.com/Adamant-im/adamant --branch $BRANCH
cd adamant
npm install
```

![How to Install an ADAMANT Node on macOS](/images/engineering-notes/medium/cfdcb9434b9a/003-1-rtjskr-1lfxqntzxxg2h-q-png.webp)

ADMノードの設定ファイルを設定します：

```bash
cp config.default.json config.json
sed -i '' "s/\"password\": \"password\"/\"password\": \"$DB_PASSWORD\"/" config.json
```

これにより、デフォルトの設定が自身のファイルにコピーされ、先ほど設定したDBパスワードが入力されます。`nano config.json`で設定ファイルを手動で編集することもできます。

**testnet**ノードの場合は、代わりに以下のコマンドを使用します：

```bash
cp test/config.default.json test/config.json
sed -i '' "s/\"password\": \"password\"/\"password\": \"$DB_PASSWORD\"/" test/config.json
```

### ブロックチェーンスナップショットのダウンロード（任意、mainnetのみ）

完全な分散化をサポートしたい場合は、この手順をスキップしてください。そうでない場合、スナップショットのダウンロードによりブロックチェーンの同期が大幅に高速化されます：

```bash
curl -O https://explorer.adamant.im/db_backup.sql.gz
gunzip db_backup.sql.gz
psql $DB_NAME < db_backup.sql
rm db_backup.sql
```

最大20分かかる場合がありますが、同期時間の約1週間を節約できます。

### ADMノードの実行

まず、ターミナルで一時的にノードを実行して、すべてが正常に動作するか確認します：

```bash
node app.js
```

成功すると、起動出力が表示され、ノードの高さが増加しながらブロックチェーンが同期していることがわかります：

![How to Install an ADAMANT Node on macOS](/images/engineering-notes/medium/cfdcb9434b9a/004-1-fclr7waeepraklxpmforsg-png.webp)

![How to Install an ADAMANT Node on macOS](/images/engineering-notes/medium/cfdcb9434b9a/005-1-cewqr7pjxjoxwgic-kw4cg-png.webp)

`Ctrl + C`でノードを停止し、次に*Terninalを閉じた後も永続化するために*pm2*で起動します：

```shell
# Mainnet
pm2 start --name adamant app.js

# Or, for testnet
# pm2 start --name adamanttest app.js -- --config test/config.json --genesis test/genesisBlock.json
```

![How to Install an ADAMANT Node on macOS](/images/engineering-notes/medium/cfdcb9434b9a/006-1-yamwpxe0isnydfrzhcujg-png.webp)

*pm2*プロセスリストを保存します：

```bash
pm2 save
```

実行中であることを確認します：

```bash
pm2 logs adamant
```

![How to Install an ADAMANT Node on macOS](/images/engineering-notes/medium/cfdcb9434b9a/007-1-d8em6reqerk-q53fjdwb-q-png.webp)

### macOS再起動後のノード再起動

Macの再起動後にADAMANTノードを自動的に再起動するには、2つのオプションがあります。

**オプション1：再起動後に手動で起動**。Macを再起動するたびに、以下のコマンドを実行します：

```bash
source ~/.nvm/nvm.sh
pm2 resurrect
```

これをシェルプロファイル（例：`~/.zprofile`）に追加することで自動化できます：

```bash
echo 'source ~/.nvm/nvm.sh && pm2 resurrect' >> ~/.zprofile
```

**オプション2：`pm2 startup`による自動起動**。*pm2 startup*コマンドは、macOSのシステム整合性保護（SIP）とシームレスに動作しない場合があります。代わりに、`launchd`サービスを作成します：

```bash
pm2 startup launchd
```

これにより、`sudo env PATH=$PATH:/Users/youruser/.nvm/versions/node/vXX.X.X/bin pm2 startup launchd -u youruser — hp /Users/youruser`のようなコマンドが出力されます。ターミナルでこれを実行し、その後pm2プロセスリストを保存します：

```bash
pm2 save
```

これで、*pm2*は起動時にADAMANTノードを自動的に再起動します。後でこれを解除するには、`pm2 unstartup launchd`を実行します。

### インストールの確認

プロセスのステータスを確認します：

```bash
pm2 show adamant
```

ノードのブロック高さを確認します：

```bash
curl http://localhost:36666/api/blocks/getHeight
```

ノードのステータスを取得します：

```bash
curl http://localhost:36666/api/node/status
```

`"syncing":true`を含む応答は、ノードがまだ完全に同期していないことを意味します。ブロックチェーンの完全な同期が完了するまで待ちます。ブロックチェーンスナップショットを使用すると、このプロセスが大幅に高速化されます。

詳細については、[ADAMANTノードドキュメント](https://docs.adamant.im/)を参照してください。
