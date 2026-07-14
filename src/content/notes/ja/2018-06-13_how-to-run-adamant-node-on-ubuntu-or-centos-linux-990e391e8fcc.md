---
title: "UbuntuまたはCentOS LinuxでADAMANTノードを実行する"
slug: "how-to-run-adamant-node-on-ubuntu-or-centos-linux-990e391e8fcc"
description: "ADAMANTはFair dPoSを採用。独自ノードの運用でネットワーク分散化を強化し、デリゲートとしてフォージング可能。Ubuntu/CentOSへのインストール手順。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/how-to-run-your-adamant-node-on-ubuntu-990e391e8fcc"
publishedAt: "2018-06-13T08:17:00.719Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/990e391e8fcc/001-1-ere-rzan0-vcmaaj97qubg-jpeg.webp"
cardSpan: "full"
originalId: "medium:990e391e8fcc"
locale: "ja"
placeholder: false
---

## 概要

ADAMANTはブロックチェーンのコンセンサスにFair dPoS（委任証明）を使用しています。独自のノードを運用することで、ネットワークの分散化が強化され、デリゲートとしてのフォージングが可能になります。本ガイドでは、Ubuntu 20–24（推奨）またはCentOS 8へのインストール手順を説明しますが、他のLinux互換システムでも動作する可能性があります。

サーバーまたはVPSには、少なくとも2 GBのRAMと70 GBのディスク容量（2025年10月時点のメインネット基準）が必要です。

## クイックインストール

初めて設定する場合は、sudo権限でインストールスクリプトを実行してください。このスクリプトはOSパッケージを更新し、`adamant`システムユーザーを作成し、PostgreSQL、Node.js、その他の依存関係をインストールしてADAMANTノードをセットアップし、オプションでブロックチェーンイメージをダウンロードします。データベースおよびシステムユーザーのパスワード設定を求められます。

**Ubuntu：**

```
sudo bash -c "$(wget -O - https://adamant.im/install_node.sh)"
```

**CentOS：**

```
sudo bash <(curl -s https://adamant.im/install_node_centos.sh)
```

![UbuntuまたはCentOS LinuxでADAMANTノードを実行する方法](/images/engineering-notes/medium/990e391e8fcc/002-1-xzbcago0snmqw09cignfyq-png.webp)

SSH接続が切断されてもインストールが完了するよう、`screen`ツールを使用してください。通常、処理には10～20分かかります。

テストネットの場合は、適切なフラグを追加してください：

**Ubuntu：**

```
sudo bash -c "$(wget -O - https://adamant.im/install_node.sh)" -O -b dev -n testnet -j jod
```

**CentOS：**

```
sudo bash <(curl -s https://adamant.im/install_node_centos.sh) -b dev -n testnet -j jod
```

## 手動インストール（Ubuntu）

ここでの手順はUbuntu用です。CentOSの場合は、同等のコマンドを使用するか、上記のクイックスクリプトを使用してください。

### システムの準備

システムを更新し、ビルドツール、git、Redisをインストールします：

```
sudo apt update && sudo apt upgrade -y
sudo apt-get install -y build-essential curl automake autoconf libtool rpl mc git redis-server
```

### PostgreSQLのセットアップ

PostgreSQLリポジトリを追加してインストールします：

```
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O - | sudo apt-key add -
sudo apt update && sudo apt install -y postgresql postgresql-contrib libpq-dev
```

データベースユーザーとデータベースを作成します。以下の例のパスワードは、強力なパスワードに置き換えてください：

```
su postgres -c psql
CREATE ROLE adamant LOGIN PASSWORD 'HardPass111';
CREATE DATABASE adamant_main;
ALTER DATABASE adamant_main OWNER TO adamant;
\q
```

### システムユーザーの作成

```
adduser adamant
sudo usermod -aG sudo adamant
su - adamant
```

### Node.jsとPM2のインストール

nvmをインストールし、その後Node.js LTS（Hydrogen/v18）をインストールし、PM2をプロセスマネージャーとしてインストールします：

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```

nvmの反映のためにログアウト・ログイン後、以下を実行：

```
nvm i --lts=hydrogen
npm install -g pm2
```

### ADAMANTのクローンと設定

```
git clone https://github.com/Adamant-im/adamant
cd adamant
npm i
cp default.config.json config.json
nano config.json
```

`config.json`では、先ほど作成したパスワードに合わせてデータベースパスワードを設定してください。外部APIアクセスを許可する場合は（API呼び出し用のWebサーバーを有効化）、`api/access/public`を`true`に設定します。ログを簡潔にするには、`consoleLogLevel`を`error`に設定してください。

### オプション：ブロックチェーンイメージ

事前に構築されたブロックチェーンイメージをダウンロードすると同期時間が短縮されますが、信頼できるソースである必要があります。この手順を省略するとすべてのトランザクションを完全に検証するため、数日かかる可能性がありますが、チェーンの一貫性が保証されます。

```
pm2 stop adamant
wget https://explorer.adamant.im/db_backup.sql.gz
gunzip db_backup.sql.gz
psql adamant_main < db_backup.sql
```

以前にこのデータベースに対してノードを登録していた場合は、まず`dropdb`と`createdb`でデータベースを削除・再作成してください。

## 実行と確認

PM2を使用してノードを起動します。PM2はプロセスをバックグラウンドでフォークし、障害時に自動再起動します：

```
cd /home/adamant/adamant && pm2 start --name adamant app.js
```

`pm2 show adamant`でステータスを確認します — `online`である必要があります。ブロックチェーンの高さを照会：

```
curl -k -X GET http://localhost:36666/api/blocks/getHeight
```

起動時、高さは`1`で、ノードの同期に伴って増加します。同期が完了すると、ネットワーク上の他のノードと高さが一致します。問題が発生した場合は`pm2 logs adamant`でログを確認してください。また、ADAMANTネットワークモニターでIPアドレスを検索し、ノードが表示されるか確認することもできます。

## 公開APIの有効化

公開APIにより、ADAMANTメッセージアプリがノードに接続できるようになります。内部（localhost）APIはデフォルトで有効です。外部アクセスを有効にするには、`config.json`の`api/access/public`を`true`に設定し、以下で再起動：

```
pm2 restart adamant
```

ブラウザで`http://<IP>:36666/api/blocks/getHeight`を開いて確認してください。

## 停止と更新

`pm2 stop adamant`でノードを停止します。更新するには：

```
su - adamant
cd adamant
pm2 stop adamant
git pull
npm update
pm2 restart adamant
```

## 再起動時の自動起動

`adamant`ユーザーとしてcrontabにエントリを追加し、VPS再起動後にノードが自動で再起動するようにします：

```
crontab -e
```

```
@reboot cd /home/adamant/adamant && pm2 start --name adamant app.js
```

あるいは、`pm2 save`と`pm2 startup`を使用すると、より信頼性の高い自動起動が実現できます。

## 復旧

ノードが同期を失い高さ0から再起動した場合（通常はハードウェアエラーやディスク容量不足が原因）、ブロックチェーンイメージから復旧するためのスクリプトを使用してください。これはフォージングデリゲートが迅速に運用を再開する場合に特に有効です：

```
sudo bash -c "$(wget -O - https://adamant.im/fix_node.sh)" -O -n mainnet
```

あるいは、ブロックチェーンイメージの読み込みに関する上記の手動復旧手順に従ってください。
