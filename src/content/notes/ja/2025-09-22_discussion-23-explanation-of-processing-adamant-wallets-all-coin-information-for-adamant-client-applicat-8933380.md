---
title: "adamant-walletsの処理：ADAMANTクライアントアプリ向けのコインおよびトークン情報"
slug: "discussion-23-explanation-of-processing-adamant-wallets-all-coin-information-for-adamant-client-applicat-8933380"
description: "adamant-walletsリポジトリは、ADAMANTクライアントアプリ向けのすべてのコインおよびトークン情報を統合しています。クライアントアプリはこのデータを正しく処理し、開発者に使いやすい統一構造を提供する責任があります。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/23"
publishedAt: "2025-09-22T12:54:29Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:8933380"
locale: "ja"
placeholder: false
---

`adamant-wallets`リポジトリは、ADAMANTクライアントアプリ向けのすべてのコインおよびトークン情報を一元管理しています。クライアントアプリは、このデータを正しく処理し、開発者に便利で統一された構造を提供する責任があります。提案された構造は完全ではありません——トークン情報は異なるフォルダから統合されています——が、代替案にもそれぞれトレードオフがあるため、ここでは構造の変更は提案しません。

## 用語解説

**暗号資産（crypto）** は、コインとトークンの総称です。各暗号資産は名前（例：Bitcoin）とティッカーまたはシンボル（例：BTC）を持ちます。**コイン** は、それ自体のブロックチェーン上に存在する暗号資産で、`ADM`、`BTC`、`DOGE`、`DASH`、`KLY` などが該当します。**トークン** は、他のブロックチェーン上に存在する暗号資産で、たとえばイーサリアムやBinance Smart Chain上の `STORJ` や `USDT` が該当します。

すべてのブロックチェーンは、そのチェーン上のすべてのトークンに共通する性質を持ち、トランザクション手数料の支払いに使用される**メインコイン**を1つ持ちます。たとえば、イーサリアム上でUSDTを送信するには、手数料を `ETH` で支払う必要があります。各ブロックチェーンはまた、**トークンタイプ** を定義しています——イーサリアムは `ERC20`、Binance Smart Chainは `BEP20` を使用します。トークンは複数のブロックチェーンに存在する場合があります（**マルチチェーントークン**）：USDTは、イーサリアム上では `ERC20`、Binance Smart Chain上では `BEP20` として存在します。これは同じ価値と基本情報を持つ同一のトークンですが、異なるチェーン上で保管および送信されます。

## 基本的な構造

各暗号資産は `/general` フォルダ内に存在します。トークンはさらに `/blockchains` フォルダ内にも存在します。たとえば、`/general/USDT/info.json` にはUSDTに関する一般的な情報が、`/blockchains/ethereum/USDT/info.json` にはイーサリアム上のUSDTに関する特定の情報が格納されます。`/blockchains/{chain}/info.json` ファイルには、そのチェーン上のすべてのトークンが共有するチェーン固有の情報が格納され、メインコインへのリンクと基本プロパティが定義されます。

### トークンのプロパティの情報源

任意のブロックチェーン上の任意のトークンには、以下の4つのプロパティ情報源があり、優先度の高い順にマージされます：

1. `/blockchains/ethereum/USDT/info.json` — 特定のブロックチェーン上の特定のトークン
2. `/blockchains/ethereum/info.json` — このブロックチェーン上のすべてのトークンが共有する情報
3. `/general/ethereum/info.json` — ブロックチェーンのメインコインからの情報
4. `/general/USDT/info.json` — トークンの一般的な情報

たとえば、イーサリアム上のUSDTはこの4つすべてをマージし、情報源(1)が(2)を上書きし、以降も同様に優先されます。

## アプリでのコインおよびトークンの作成

コインを作成するには、アプリは `/general` 内のすべての暗号資産をループし、それぞれの `/general/{crypto}/info.json` を読み込みます。`status` が active でない、または `type` が `coin` でないエントリはスキップします。`createCoin = true` の場合、ブロックチェーンエントリとして表示されるコインオブジェクトを作成します。これはトークンタイプを持たず、`ADM` や `BTC` などが該当します。

![Discussion screenshot 1](/images/engineering-notes/github/discussions/8933380/001-fafd0ecc.webp)

![Discussion screenshot 2](/images/engineering-notes/github/discussions/8933380/002-cebba626.webp)

トークンを作成するには、アプリは `/blockchains` 内のすべてのブロックチェーン（例：`ethereum`、`binanceSmartChain`）をループし、チェーンレベルの `info.json` を読み込みます。`status` が active でない場合はそのブロックチェーンをスキップし、`mainCoin` を記録します。次に、`/general/{mainCoin}/info.json` を読み込み、メインコインの一般的な情報を取得します。そのブロックチェーンフォルダ内の各トークンについて、`/general/{token}/info.json` を読み込みます——ファイルが存在しない、または `type` が `token` でない場合はスキップ——その後、`/blockchains/{blockchain}/{token}/info.json` を読み込み、`status` が active でない場合はスキップします。最後に、4つの情報源を優先度に従ってマージし、トークンタイプ（例：`ERC20`、`BEP20`）とともに表示されるトークンオブジェクトを作成します。例としては `USDT`、`USDC`、`DAI` があります。

![Discussion screenshot 3](/images/engineering-notes/github/discussions/8933380/003-f4329279.webp)

![Discussion screenshot 4](/images/engineering-notes/github/discussions/8933380/004-a0d74d6b.webp)

## 暗号資産のデータオブジェクト

`adamant-wallets` を解析した後、アプリはすべてのチェーンにわたるすべてのコインおよびトークンの情報を含むデータオブジェクトを保持します。プロパティはすでにマージされているため、データの取得は簡単です：

```js
// Inside token-related methods
let property = coinInfo.property

// Outside, referencing by token and chain
let property = coinInfo["USDT"]["ethereum"].property
```

これにより、ADAMANTアプリは複数のブロックチェーンおよびトークンを一貫して扱えるようになります。
