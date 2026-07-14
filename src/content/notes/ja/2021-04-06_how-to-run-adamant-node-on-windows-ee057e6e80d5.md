---
title: "WindowsでADAMANTノードを実行する方法"
slug: "how-to-run-adamant-node-on-windows-ee057e6e80d5"
description: "Windows 10バージョン1903以降とWindows Server 2019では、WSL 2によりLinuxアプリケーションを実行でき、ADAMANTノードの運用が可能になります。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/how-to-run-adamant-node-on-windows-ee057e6e80d5"
publishedAt: "2021-04-06T13:12:12.555Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/ee057e6e80d5/001-1-uqe2ccpdkrmbxnio3cyqaq-jpeg.webp"
cardSpan: "full"
originalId: "medium:ee057e6e80d5"
locale: "ja"
placeholder: false
---

Windows 10バージョン1903およびWindows Server 2019から、MicrosoftはWSL 2（Windows Subsystem for Linux）を搭載し、Windows上でLinuxアプリケーションを実行できるようになりました。これにより、自宅のコンピュータでADAMANTノードを実行できるようになり、デリゲートとしての動作やフォージングプールの運用も可能になります。

### システム要件

Windows 10 x64（バージョン1903 / ビルド18362以降）またはWindows Server 2019、RAM 4 GB以上、ディスク容量50 GBが必要です。インストール前に、コンピュータのBIOSで仮想化テクノロジー（Virtualization Technology）が有効になっている必要があります。

### WSL 2のセットアップ

[公式のWSL 2インストールガイド](https://docs.microsoft.com/en-us/windows/wsl/install-win10#manual-installation-steps)に従ってください。Microsoft Storeを使用しない場合は、[Ubuntuを手動でダウンロード](https://docs.microsoft.com/en-us/windows/wsl/install-manual)することも可能です。Ubuntu 16、18、20のいずれも適しています。

![How to run ADAMANT node on Windows](/images/engineering-notes/medium/ee057e6e80d5/002-0-d3n4-16cc9epoa-d.webp)

インストール後、Ubuntuディストリビューション用のUNIXユーザー名とパスワードを作成します。たとえば、ユーザー名を*ubuntu*に設定します。

### ADAMANTノードのインストール

これで、Windows上で動作するUbuntuサブシステムが利用可能になり、仮想マシンのように振る舞います。標準の[Ubuntu手順](https://medium.com/adamant-im/how-to-run-your-adamant-node-on-ubuntu-990e391e8fcc)に従ってADAMANTノードをインストールしてください。

![How to run ADAMANT node on Windows](/images/engineering-notes/medium/ee057e6e80d5/003-0-jj5gjxvimq-cagrf.webp)

インストール直後、セットアップスクリプトが新しいブロックチェーンイメージをダウンロードし、Linuxサブシステムがそれをメモリにキャッシュするため、*Vmmem*（WSL 2）プロセスが大量のRAMを消費する場合があります。コンピュータを再起動すると、メモリ使用量は大幅に低下します。

### 再起動後のノードの実行

Ubuntuのウィンドウを閉じてもノードは停止せず、Linuxサブシステムはバックグラウンドで引き続き実行されます。コンピュータがスリープ状態になっても、復帰時にノードは再開し、ブロックチェーンの高さに同期します。ただし、コンピュータを完全に再起動した場合は、ノードを手動で起動する必要があります。

Ubuntuターミナルを開くか、PowerShellから接続します：

```
wsl
```

複数のLinuxディストリビューションをインストールしている場合は、バージョンを指定してください：

```
wsl -d Ubuntu-18.04
```

接続後、PostgreSQLを起動し、*adamant*ユーザーに切り替えてノードを起動します：

```
sudo service postgresql start
su - adamant
cd /home/adamant/adamant && pm2 start --name adamant app.js
```

ノードが実行中でブロック高を取得しているか確認します：

```
curl http://localhost:36666/api/blocks/getHeight
```

ノードが現在のブロックチェーンの高さに追いつくまでには時間がかかります。システム管理者の知識がある場合は、再起動時の自動起動を設定できます。詳しい手順は[このAsk Ubuntuの回答](https://askubuntu.com/a/1166012)を参照してください。

### APIへのアクセス

UbuntuターミナルおよびWindowsの両方から、*localhost*経由でノードのAPIにアクセスできます。ブラウザで`http://localhost:36666/api/blocks/getHeight`を開いてください。他のコンピュータからAPIにアクセスするには、追加のネットワーク設定が必要です。
