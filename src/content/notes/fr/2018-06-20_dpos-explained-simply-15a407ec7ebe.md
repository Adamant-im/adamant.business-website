---
title: "DPoS Explained — Simply"
slug: "dpos-explained-simply-15a407ec7ebe"
description: "La blockchain est une technologie distribuée. Contrairement aux systèmes centralisés, aucun individu n'a de pouvoir étendu sur le réseau ; seul l'ensemble de la communauté connectée détient une telle influence."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/dpos-explained-simply-15a407ec7ebe"
publishedAt: "2018-06-20T13:44:33.120Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/15a407ec7ebe/001-0-boc7uxzeiy2c0lhm.webp"
cardSpan: "full"
originalId: "medium:15a407ec7ebe"
locale: "fr"
placeholder: false
---

La blockchain est une technologie distribuée. Contrairement aux systèmes centralisés classiques, aucun individu n'a de pouvoir étendu sur le réseau ; seule l'ensemble de la communauté connectée possède une telle influence. Pour que le système soit véritablement distribué, la méthode **Proof-of-Work (PoW)** a été mise en œuvre via un processus appelé minage (par exemple, Bitcoin, Litecoin). Si l'ordinateur de Bob est plus rapide que celui d'Alice, il a plus d'influence sur le réseau.

Le minage présente un inconvénient majeur : des coûts élevés en électricité. Une méthode alternative, le **Proof-of-Stake (PoS)** (par exemple, PeerCoin, NXT), a été inventée pour remédier à cela. Dans le PoS, l'influence d'un utilisateur dépend de sa part active dans le réseau. Supposons que Bob possède 100 pièces du réseau et qu'Alice en possède 90. Bob a plus d'influence, mais s'il vend 20 pièces, il passe à 80 et Alice obtient alors une influence supérieure.

L'amélioration suivante est le **Delegated Proof-of-Stake (dPoS)** et ses variantes, utilisés par des projets comme BitShares, Lisk et ADAMANT Messenger. Cette méthode fonctionne de manière similaire au PoS, mais avec une caractéristique importante : vous pouvez transférer (déléguer) votre influence sur le réseau à d'autres utilisateurs.

Supposons que Bob ait 100 pièces et Alice 80. Bob vote (délègue son influence) pour Bill et Helen, et Alice vote pour Mark. Dans le cas du dPoS de Lisk, Bill et Helen ont plus d'influence (100) que Mark (80), ce qui est considéré comme injuste par certains.

> ADAMANT a amélioré ce système dPoS en réduisant le poids du vote en fonction du nombre de délégations. Puisque Bob vote pour deux délégués, son vote est divisé : 100/2 = 50. Bill et Helen ont alors chacun une influence de 50, tandis que Mark a une influence de 80. L'influence de Mark devient ainsi supérieure à celle de Bill et Helen.

Le dPoS amélioré d'ADAMANT prend également en compte la **productivité du nœud**. Les nœuds plus rapides et plus performants, qui ne ratent pas de blocs, reçoivent un poids de vote plus élevé. Cette approche est appelée **Fair dPoS**.

Le Fair dPoS permet aux participants les plus importants du réseau de s'assurer que tout fonctionne comme prévu. Les délégués sont non seulement responsables du bon fonctionnement du réseau, mais reçoivent également une récompense en pièces pour leur rôle.

Pour devenir délégué sur le réseau ADAMANT, vous devez installer un nœud, vous enregistrer en tant que délégué, et obtenir les votes des utilisateurs qui vous font confiance. Vous devez recueillir suffisamment de votes pour que la somme des pièces de vos électeurs vous place dans la liste des 101 premiers délégués.
