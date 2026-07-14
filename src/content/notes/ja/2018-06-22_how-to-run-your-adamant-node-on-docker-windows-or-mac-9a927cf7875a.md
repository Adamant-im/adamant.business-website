---
title: "DockerでADAMANTノードを実行する方法（WindowsまたはMac）"
slug: "how-to-run-your-adamant-node-on-docker-windows-or-mac-9a927cf7875a"
description: "Dockerイメージは古くなっている可能性があります。代わりにUbuntuサーバーでADAMANTノードを実行することをお勧めします。ADAMANTはブロックチェーンの合意形成にdPoSを使用しています。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/how-to-run-your-adamant-node-on-docker-windows-or-mac-9a927cf7875a"
publishedAt: "2018-06-22T15:46:46.729Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/9a927cf7875a/001-0-fg4w7kswcdb2l5b0.webp"
cardSpan: "full"
originalId: "medium:9a927cf7875a"
locale: "ja"
placeholder: false
---

注意：Dockerイメージは古くなっている可能性があります。代わりにUbuntuサーバーでADAMANTノードを実行することをお勧めします。ADAMANTはブロックチェーンの合意形成に委任型プルーフオブステーク（dPoS）を使用しており、独自のノードを実行することでネットワークの非中央集権性が向上します。

このガイドでは、Dockerを使用してWindows、macOS、またはLinuxにADAMANTノードをインストール、実行、および更新する方法について説明します。例ではWindows 10を使用していますが、64ビット版のWindows 10 Pro、Enterprise、またはEducation（ビルド14393以降）が必要です。ホストマシンには、現在のブロック高に応じて、少なくとも4GBのRAMと50GBの空きディスク容量が必要です。

Dockerをインストールするには、無料のDocker Community Editionをダウンロードしてインストーラーを実行します。ライセンスに同意し、ネットワークコンポーネントとHyper-Vの仮想マシンに必要となるシステムパスワードでインストーラーを承認するよう求められるので、ウィザードに従って進めてください。インストール後、スタートメニューからDockerを起動します。ステータスバーのクジラのアイコンが点滅から安定した表示になったら、Dockerが実行されています。また、ステータスバーのアイコンを右クリックし、[Settings]を選択して共有ドライブのチェックボックスをオンにし、変更を適用することで、ローカルドライブをDockerと共有する必要があります。

![DockerでADAMANTノードを実行する方法（WindowsまたはMac）](/images/engineering-notes/medium/9a927cf7875a/002-0-lyckrpled-5lr7hl.webp)

![DockerでADAMANTノードを実行する方法（WindowsまたはMac）](/images/engineering-notes/medium/9a927cf7875a/003-0-6akvfvvlkcfe7829.webp)

![DockerでADAMANTノードを実行する方法（WindowsまたはMac）](/images/engineering-notes/medium/9a927cf7875a/004-0-a86t6y8gjz9oxrpc.webp)

ADAMANTノードをインストールするには、まずデフォルトのオプションでGitクライアントをインストールします。Microsoft PowerShellを開き、リポジトリをクローンします：

```bash
git clone https://github.com/Adamant-im/adamant-docker
cd adamant-docker
```

![DockerでADAMANTノードを実行する方法（WindowsまたはMac）](/images/engineering-notes/medium/9a927cf7875a/005-0-fgfme0jdbid9yncf.webp)

ノードを実行するには、必要なDockerイメージを取得します：

```bash
docker-compose pull
```

![DockerでADAMANTノードを実行する方法（WindowsまたはMac）](/images/engineering-notes/medium/9a927cf7875a/006-0-aivqroqzrjyhguqd.webp)

データベースサービスを起動し、正常に起動したことを確認します：

```bash
docker-compose up -d db
docker-compose logs
```

![DockerでADAMANTノードを実行する方法（WindowsまたはMac）](/images/engineering-notes/medium/9a927cf7875a/007-0-papyajoh0cxgai9i.webp)

次に、adamant-nodeサービスを起動し、ログを確認して正常に開始されたことを確認します：

```bash
docker-compose up -d adamant-node
```

![DockerでADAMANTノードを実行する方法（WindowsまたはMac）](/images/engineering-notes/medium/9a927cf7875a/008-0-5juodmupmzrre2n1.webp)

`docker-compose stop`コマンドで実行中のすべてのサービスを停止でき、後で`docker-compose start`を使用して再起動できます。

![DockerでADAMANTノードを実行する方法（WindowsまたはMac）](/images/engineering-notes/medium/9a927cf7875a/009-0-hrzlp4aniigch2fc.webp)

ノードアプリケーションのログを確認してインストールを検証します：

```bash
docker-compose logs --tail=10 adamant-node
```

![DockerでADAMANTノードを実行する方法（WindowsまたはMac）](/images/engineering-notes/medium/9a927cf7875a/010-0-v8ofli8bjy-hqo2b.webp)

`--tail=10`引数は出力を最後の10行に制限します。ノードがADAMANTブロックチェーンに接続されていることを確認するには、ADAMANTネットワークモニターにアクセスし、IPアドレスで自分のノードを探します。ノードが表示されるまで数分かかる場合があります。新しくインストールされたノードは同期中にブロック高が1と表示され、接続とCPUの状況によって最大1日程度かかることがあります。

![DockerでADAMANTノードを実行する方法（WindowsまたはMac）](/images/engineering-notes/medium/9a927cf7875a/011-0-74skpvuswckotzf6.webp)

高さを直接確認するには、`docker ps`を使ってコンテナIDを取得し、ノードのAPIをクエリします：

```bash
docker ps
docker exec <container_id> curl -k -X GET http://localhost:36666/api/blocks/getHeight
```

![DockerでADAMANTノードを実行する方法（WindowsまたはMac）](/images/engineering-notes/medium/9a927cf7875a/012-0-osgtdu-u6daibuqi.webp)

同期が完了すると、ネットワーク上の他のノードと高さが一致します。ADAMANTノードを更新するには、PowerShellを開き、以下のコマンドを実行します：

```bash
cd adamant-docker
docker-compose stop
docker-compose pull
docker-compose down
docker-compose up -d db
docker-compose up -d adamant-node
```

![DockerでADAMANTノードを実行する方法（WindowsまたはMac）](/images/engineering-notes/medium/9a927cf7875a/013-0-l5hbgju9qlgr65sw.webp)
