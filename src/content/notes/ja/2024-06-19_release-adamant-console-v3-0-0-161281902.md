---
title: "ADAMANT Console v3.0.0"
slug: "release-adamant-console-v3-0-0-161281902"
description: "vote forコマンドにおける公開鍵とデリゲート名のパラメータ検証が修正されました。client versionコマンドに設定ファイルパスやネットワーク、アカウントを表示する追加フィールドが含まれるようになりました。"
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-console/releases/tag/v3.0.0"
publishedAt: "2024-06-19T12:50:46Z"
author: "martiliones"
authorUrl: "https://github.com/martiliones"
repo: "adamant-console"
tag: "v3.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-console:161281902"
locale: "ja"
placeholder: false
---

`vote for` コマンドにおける公開鍵とデリゲート名のパラメータの検証が修正されました。`client version` コマンドには、設定ファイルパス、ネットワーク、アカウントを示す追加フィールドが含まれるようになりました：

```jsonc
{
  "success": true,
  "version": "3.0.0",
  // The new fields:
  "config": "/home/username/.adm/config.jsonc",
  "network": "mainnet",
  "account": "U3716604363012166999"
}
```

### 重大な変更

`get message` コマンドのレスポンスは、設定済みユーザーの公開鍵をトランザクションが含む場合に、メッセージをその場で復号して返すのではなく、暗号化された状態で `transaction.asset.chat` オブジェクト内に保持するようになりました。復号済みのメッセージは、新たに追加された `transaction.decoded` フィールドで確認できます：

```jsonc
{ // adm get message 3745646290027012070
  "success": true,
  "nodeTimestamp": 214429446,
  "transaction": {
    "id": "3745646290027012070",
    // ...
    "asset": {
      "chat": {
        "message": "d6247af9ff5cd53eeb88a48e62cb47c33cc8b1b37d38e784e0481b8251149d", // <--- encoded message
        "own_message": "ae3f5203f252fa75705a6681fee3244b46da5bb0aa169498",
        "type": 1
      }
    },
    "decoded": "Hello, ADAMANT!" // <--- decoded message
  }
}
```
