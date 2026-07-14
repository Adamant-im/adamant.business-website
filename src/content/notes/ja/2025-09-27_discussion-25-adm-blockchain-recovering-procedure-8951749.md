---
title: "ADMブロックチェーンのフォーク回復手順"
slug: "discussion-25-adm-blockchain-recovering-procedure-8951749"
description: "ADMブロックチェーンノードソフトウェアでは、複数のデリゲートノードが同時にブロックを生成すると短いフォークが発生する。ネットワークは保持するブロックを決定する必要がある。"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/25"
publishedAt: "2025-09-27T12:49:14Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "ADM Nodes, Delegates & Pools"
cardSpan: "half"
originalId: "github-discussion:8951749"
locale: "ja"
placeholder: false
---

[ADAMANTブロックチェーンノードソフトウェア](https://github.com/Adamant-im/adamant)では、複数のデリゲートノードが同時にブロックを生成すると、短いフォークが発生する可能性がある。その場合、ネットワークはどちらのブロックを保持するかを決定する必要がある。現在のコンセンサスルールでは、タイムスタンプが信頼できると仮定して最も古いブロックを選択する。タイムスタンプが同じ場合は、IDが最も小さいブロックを選択する。このような短いフォークはブロックチェーンで定期的に発生するが、より大規模または危険なフォークに発展することはない。

## 最後のブロックの削除

フォークが検出されたとき、つまりリカバリ中または新しいブロックを受信したときに、ノードは「Deleting last block（最後のブロックを削除）」とログに出力する。よくあるトリガーは、ノードが既存のブロックと同じ高さ（height）と前のブロックIDを持つが、ブロックID自体は異なるブロックを受信した場合である。これは正常なリカバリ処理であり、より深いフォークを発生させることなくブロックチェーンの一貫性を保つ。

## ログの例

以下のログエントリは、リカバリ処理の例を示している。削除されるブロックの高さは48093334、IDは15500937233239097229である。トランザクションの完全なペイロードはここでは省略しているが、ブロックバージョン、合計値、報酬、生成者、タイムスタンプといった重要なメタデータが含まれている：

```
[WRN] 2025-08-06 00:00:09 | Deleting last block - {"version":0,"totalAmount":12119967437,"totalFee":150000000,"reward":15000000,"payloadHash":"b04ed7f935bec1f74b7a179ff07557a36ca5ea38d6966381f1a5794ca9df7125","timestamp":250066805,"numberOfTransactions":3,"payloadLength":351,"previousBlock":"17914802164676259429","generatorPublicKey":"547919533beb2612d76e3a7d5f38e61145a2b0ecb96d971277f34fb8efd3bcb3","blockSignature":"64be4069540ab86f195d3bfb477ac8b2514dc99c33b881d98cdab103101b95e21c3f0cb1d6df5a128977a13992956c5390d7e69b18eb99055250c55d9b734802","height":48093334,"id":"15500937233239097229","relays":3}
```

## まとめ

フォークは、最も古いブロックまたはIDが最も小さいブロックを選択することで自動的に解決される。「Deleting last block」の処理は、同じ高さで競合するブロックが検出された際に実行される通常のリカバリ手順であり、ブロックチェーンが一貫性を保ち、より深いフォークが発生しないようにする。
