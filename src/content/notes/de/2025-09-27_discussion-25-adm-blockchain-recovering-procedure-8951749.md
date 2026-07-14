---
title: "ADM Blockchain Fork-Wiederherstellungsverfahren"
slug: "discussion-25-adm-blockchain-recovering-procedure-8951749"
description: "Im ADAMANT-Blockchain-Knoten können kurze Forks auftreten, wenn mehrere Delegierte gleichzeitig Blöcke erzeugen. Das Netzwerk wählt dann den ältesten Block."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/25"
publishedAt: "2025-09-27T12:49:14Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "ADM Nodes, Delegates & Pools"
cardSpan: "half"
originalId: "github-discussion:8951749"
locale: "de"
placeholder: false
---

In der [ADAMANT-Blockchain-Knotensoftware](https://github.com/Adamant-im/adamant) können kurze Forks auftreten, wenn mehrere Delegierte gleichzeitig Blöcke erzeugen. Das Netzwerk muss dann entscheiden, welchen Block beibehalten wird. Die aktuelle Konsensregel lautet, den ältesten Block zu wählen – vorausgesetzt, der Zeitstempel ist vertrauenswürdig –, oder bei gleichen Zeitstempeln den Block mit der kleinsten ID auszuwählen. Solche kurzen Forks treten regelmäßig in Blockchains auf und eskalieren nicht zu größeren oder gefährlichen Forks.

## Letzten Block löschen

Ein Knoten protokolliert „Deleting last block“, wenn ein Fork erkannt wird, entweder während der Wiederherstellung oder beim Empfang eines neuen Blocks. Ein häufiger Auslöser ist, wenn der Knoten einen Block mit derselben Höhe und derselben Vorblock-ID wie ein vorhandener Block erhält, aber einer anderen Block-ID. Dies ist eine normale Wiederherstellungsmaßnahme, die die Blockchain konsistent hält, ohne tiefere Forks zu erzeugen.

## Beispiel-Protokoll

Der folgende Protokolleintrag veranschaulicht die Wiederherstellungsmaßnahme. Der gelöschte Block hat die Höhe 48093334 und die ID 15500937233239097229. Die vollständigen Transaktionsdaten sind hier der Kürze halber weggelassen, aber die wichtigsten Metadaten zeigen die Blockversion, Summen, Belohnung, Erzeuger und Zeitstempel:

```
[WRN] 2025-08-06 00:00:09 | Deleting last block - {"version":0,"totalAmount":12119967437,"totalFee":150000000,"reward":15000000,"payloadHash":"b04ed7f935bec1f74b7a179ff07557a36ca5ea38d6966381f1a5794ca9df7125","timestamp":250066805,"numberOfTransactions":3,"payloadLength":351,"previousBlock":"17914802164676259429","generatorPublicKey":"547919533beb2612d76e3a7d5f38e61145a2b0ecb96d971277f34fb8efd3bcb3","blockSignature":"64be4069540ab86f195d3bfb477ac8b2514dc99c33b881d98cdab103101b95e21c3f0cb1d6df5a128977a13992956c5390d7e69b18eb99055250c55d9b734802","height":48093334,"id":"15500937233239097229","relays":3}
```

## Zusammenfassung

Forks werden automatisch gelöst, indem entweder der älteste Block oder der Block mit der kleinsten ID ausgewählt wird. Die Aktion „Deleting last block“ ist ein routinemäßiger Wiederherstellungsschritt, der durchgeführt wird, wenn konfligierende Blöcke auf derselben Höhe erkannt werden, und gewährleistet, dass die Blockchain konsistent bleibt, ohne tiefere Forks zu erzeugen.
