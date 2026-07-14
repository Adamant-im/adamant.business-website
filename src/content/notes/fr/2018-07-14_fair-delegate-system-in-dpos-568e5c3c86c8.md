---
title: "Système équitable de délégués dans le dPoS"
slug: "fair-delegate-system-in-dpos-568e5c3c86c8"
description: "La décentralisation est essentielle à ADAMANT ; l'équipe a étudié des améliorations en s'inspirant d'autres réseaux dPoS comme Lisk."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/fair-delegate-system-in-dpos-568e5c3c86c8"
publishedAt: "2018-07-14T10:22:15.269Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/568e5c3c86c8/001-0-b1b6dbg3hvdjf9i4.webp"
cardSpan: "full"
originalId: "medium:568e5c3c86c8"
locale: "fr"
placeholder: false
---

La décentralisation est un attribut essentiel d'ADAMANT, et l'équipe a évalué des améliorations possibles pour l'écosystème en examinant les enseignements tirés d'autres réseaux dPoS tels que Lisk.

Sur Lisk, devenir un délégué actif exige environ 29 millions de LSK en votes, et plus de 1\,600 délégués ont été relégués de façon permanente en mode Standby. Le délégué actif le moins bien classé détient un poids de vote de près de 28,7 millions de LSK — une barrière d'entrée extrêmement élevée.

![Système équitable de délégués dans le dPoS](/images/engineering-notes/medium/568e5c3c86c8/002-0-gyx2cakh6c0w-8a.webp)

Le problème fondamental est qu'avec un système dPoS classique, un seul portefeuille « épais » peut distribuer des votes également épais à une longue liste de délégués en une seule fois. Un portefeuille votant pour 101 délégués peut ainsi soumettre l'ensemble du réseau à son contrôle.

ADAMANT résout cela en **divisant le poids de vote de chaque portefeuille par le nombre de délégués pour lesquels il vote** :

> *Poids de vote = ADM / Votes*

Par exemple, si Bob possède 100 ADM et vote pour deux délégués, tandis qu'Alice possède 80 ADM et vote pour un seul, le vote de Bob est divisé en 50 par délégué. Le délégué d'Alice reçoit les 80 intégraux. Avec le modèle de Lisk, chaque délégué de Bob recevrait 100 — plus qu'Alice — ce qui serait injuste. Avec le modèle d'ADAMANT, le délégué d'Alice a une influence plus grande, reflétant une répartition plus équitable.

Un second paramètre, la **Productivité**, affine davantage le poids de vote. Le réseau exige des délégués assidus qui ne manquent aucun bloc, garantissant ainsi que les messages sur ADAMANT Messenger sont livrés sans retard. La productivité varie de 0,05 % à 100 %, réduisant le poids de vote des délégués qui ne maintiennent pas des nœuds fiables. Quand un délégué commence à forger, la productivité n'est pas prise en compte pour les 200 premiers blocs (produits et manqués).

La formule finale est :

> *Poids de vote = ADM / Votes × Productivity*

Cette approche s'appelle **Fair dPoS**. Elle réduit l'influence des portefeuilles épais à des niveaux raisonnables et abaisse la barrière d'entrée pour le forging. Le facteur de productivité incite les délégués à exécuter leurs nœuds sur des matériels plus puissants plutôt que sur des configurations minimales. Comme la distribution des jetons et la productivité des délégués évoluent dans le temps, la liste des 101 délégués en train de forger est régulièrement reconstruite, offrant aux délégués Standby une chance réaliste de revenir au forging.

Les utilisateurs ayant de petits soldes en ADM peuvent aussi participer en formant des pools. Ces modifications sont entrées en vigueur à partir de la version 0.4.0, à partir du bloc 4359464.
