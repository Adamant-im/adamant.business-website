---
title: "Procédure de récupération après fourchement de la blockchain ADM"
slug: "discussion-25-adm-blockchain-recovering-procedure-8951749"
description: "Dans le logiciel de nœud de blockchain ADAMANT, des fourches courtes peuvent survenir lorsque plusieurs nœuds délégués produisent des blocs en même temps."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/25"
publishedAt: "2025-09-27T12:49:14Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "ADM Nodes, Delegates & Pools"
cardSpan: "half"
originalId: "github-discussion:8951749"
locale: "fr"
placeholder: false
---

Dans le [logiciel de nœud de blockchain ADAMANT](https://github.com/Adamant-im/adamant), des fourches courtes peuvent survenir lorsque plusieurs nœuds délégués produisent des blocs en même temps. Le réseau doit alors décider quel bloc conserver. La règle de consensus actuelle consiste à choisir le bloc le plus ancien, en supposant que l'horodatage est fiable, ou, si les horodatages sont identiques, à sélectionner le bloc avec l'ID le plus petit. Ces fourches courtes se produisent régulièrement dans les blockchains et ne dégénèrent pas en fourches plus profondes ou dangereuses.

## Suppression du dernier bloc

Un nœud enregistre le message « Deleting last block » lorsqu'une fourche est détectée, soit pendant la récupération, soit à la réception d'un nouveau bloc. Une cause fréquente est la réception par le nœud d'un bloc ayant la même hauteur et le même ID de bloc précédent qu'un bloc existant, mais un ID de bloc différent. Cette action est une procédure de récupération normale qui maintient la cohérence de la blockchain sans provoquer de fourches plus profondes.

## Exemple de journal

L'entrée de journal suivante illustre l'action de récupération. Le bloc supprimé a une hauteur de 48093334 et un ID de 15500937233239097229. Les charges utiles complètes des transactions sont omises ici par souci de concision, mais les métadonnées clés affichent la version du bloc, les totaux, la récompense, le générateur et l'horodatage :

```
[WRN] 2025-08-06 00:00:09 | Deleting last block - {"version":0,"totalAmount":12119967437,"totalFee":150000000,"reward":15000000,"payloadHash":"b04ed7f935bec1f74b7a179ff07557a36ca5ea38d6966381f1a5794ca9df7125","timestamp":250066805,"numberOfTransactions":3,"payloadLength":351,"previousBlock":"17914802164676259429","generatorPublicKey":"547919533beb2612d76e3a7d5f38e61145a2b0ecb96d971277f34fb8efd3bcb3","blockSignature":"64be4069540ab86f195d3bfb477ac8b2514dc99c33b881d98cdab103101b95e21c3f0cb1d6df5a128977a13992956c5390d7e69b18eb99055250c55d9b734802","height":48093334,"id":"15500937233239097229","relays":3}
```

## Résumé

Les fourches sont résolues automatiquement en sélectionnant le bloc le plus ancien ou celui ayant l'ID le plus petit. L'action « Deleting last block » est une étape de récupération courante déclenchée lors de la détection de blocs en conflit à la même hauteur, garantissant ainsi que la blockchain reste cohérente sans provoquer de fourches plus profondes.
