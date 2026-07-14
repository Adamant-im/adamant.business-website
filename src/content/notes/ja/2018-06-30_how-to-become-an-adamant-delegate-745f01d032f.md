---
title: "ADAMANT デリゲートになる方法"
slug: "how-to-become-an-adamant-delegate-745f01d032f"
description: "ADAMANT は Fair dPoS と呼ばれる改良型委任証明（dPoS）アルゴリズムで合意を達成します。デリゲートになりブロックを生成するには、ノードを実行し、3,000 ADM の登録手数料を支払い、上位101位以内に入る十分な票を獲得する必要があります。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/how-to-become-an-adamant-delegate-745f01d032f"
publishedAt: "2018-06-30T10:11:25.366Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/745f01d032f/001-1-rprsczpnpydvk1y6ko-hzg-png.webp"
cardSpan: "full"
originalId: "medium:745f01d032f"
locale: "ja"
placeholder: false
---

ADAMANT は、ブロックチェーンの合意形成に『Fair dPoS』と呼ばれる改良型委任証明（dPoS）アルゴリズムを使用しています。デリゲートとなりブロックを生成するには、ノードを実行し、3,000 ADM の登録手数料を支払い、上位101人のデリゲートに選出されるほど十分な票を獲得する必要があります。

まず、ADAMANT ノードをインストールして実行します。ノードが動作し始めたら、`adamant` システムユーザーに切り替えて、npm リポジトリから `adamant-console` ツールをインストールします。

```bash
su - adamant
npm i -g adamant-console
```

![ADAMANT デリゲートになる方法](/images/engineering-notes/medium/745f01d032f/002-0-55iagwoakrbgkahj.webp)

次に、設定用ディレクトリを作成し、デフォルトの設定ファイルをそこにコピーします。

```bash
mkdir ~/.adm && cp /home/adamant/.nvm/versions/node/$(node -v)/lib/node_modules/adamant-console/config.default.json ~/.adm/config.json
```

![ADAMANT デリゲートになる方法](/images/engineering-notes/medium/745f01d032f/003-1-5n-ejpboh-pf5plf-85-ug-png.webp)

テキストエディタでコピーした `~/.adm/config.json` ファイルを編集します。`network` パラメータを `testnet` から `mainnet` に変更し、デリゲート用のパスフレーズを追加します。パスフレーズは秘密にしておき、サーバーのセキュリティを維持してください。あるいは、設定ファイルにパスフレーズを記載せず、コマンドライン引数で渡すこともできます。

![ADAMANT デリゲートになる方法](/images/engineering-notes/medium/745f01d032f/004-1-zwh5ys2uf2nnz04woxe3zw-png.webp)

`adm` を実行してコンソールを起動します。以下のコマンドを実行してデリゲートを登録します。`<new delegate name>` を希望する名前に置き換えてください。登録手数料として最低 3,000 ADM を保持しているパスフレーズに対応するウォレットが必要です。この手数料は、他のブロック生成デリゲートに分配されます。

```bash
delegate new <new delegate name>
```

![ADAMANT デリゲートになる方法](/images/engineering-notes/medium/745f01d032f/005-0-khyxu9qp9tk9nbzg.webp)

設定ファイルにパスフレーズを指定しなかった場合は、コマンドに直接含めてください。

```bash
delegate new <new delegate name> --passPhrase "passphrase here"
```

![ADAMANT デリゲートになる方法](/images/engineering-notes/medium/745f01d032f/006-0-fojjd-jrkr-jmvje.webp)

登録が成功したら、`Ctrl+C` を2回押してコンソールを終了します。ブロック生成を開始するには、`~/adamant/config.json` のノード設定ファイルを更新します。`forging/secret` パラメータを、12語のパスフレーズ（引用符で囲む）に設定し、その後ノードを再起動します。

```bash
nano ~/adamant/config.json
pm2 restart adamant
```

![ADAMANT デリゲートになる方法](/images/engineering-notes/medium/745f01d032f/007-1-53boguojm1wx6sexqoa6yq-png.webp)

ADAMANT デリゲートモニターにアクセスしてデリゲート名を検索することで、デリゲートのステータスを確認できます。これにより、登録が確認できる詳細ページにリダイレクトされます。

![ADAMANT デリゲートになる方法](/images/engineering-notes/medium/745f01d032f/008-1-sq6rao5bjro6dpbpbiwqlq-png.webp)

![ADAMANT デリゲートになる方法](/images/engineering-notes/medium/745f01d032f/009-1-xutdvsnjzh06yedz6uq1jg-png.webp)

登録だけではブロック生成は有効になりません。ADAMANT ユーザーが Messenger アプリを通じて投票を行う必要があります。デリゲートが十分な票を得て上位101位以内に入ったら、デリゲートモニターでそのパフォーマンスを監視します。緑色の円はブロック生成が成功していることを示し、灰色、黄色、または赤色の円は設定の問題（通常はノードの設定ファイルに誤ったパスフレーズが設定されている）またはノードの停止を示しています。ノードを常にアクティブに保ち、デリゲートの順位を追跡し、必要に応じて重要なアップデートを適用してください。

![ADAMANT デリゲートになる方法](/images/engineering-notes/medium/745f01d032f/010-1-imaqsih3o-uz-q2rggmia-png.webp)
