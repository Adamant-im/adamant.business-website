---
title: "La première stablecoin dans ADAMANT : USDS par Stably"
slug: "the-first-stablecoin-in-adamant-meet-usds-by-stably-42106aae239"
description: "Intégrer des jetons dans ADAMANT a montré la nécessité d'une stablecoin dans le portefeuille. Les stablecoins préservent la valeur et sont utiles pour les échanges quotidiens d'actifs blockchain ainsi que pour les paiements."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/the-first-stablecoin-in-adamant-meet-usds-by-stably-42106aae239"
publishedAt: "2019-08-02T11:09:24.464Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/42106aae239/001-0-wizmb-2p-jaeiioj.webp"
cardSpan: "full"
originalId: "medium:42106aae239"
locale: "fr"
placeholder: false
---

Intégrer des jetons dans ADAMANT a mis en évidence la nécessité d'une stablecoin dans le portefeuille. Les stablecoins préservent la valeur et sont utiles pour les échanges quotidiens d'actifs blockchain ainsi que pour payer des biens et services. ADAMANT a sélectionné StableUSD (USDS) comme première stablecoin après avoir évalué plusieurs options.

### À propos de StableUSD

USDS est émise par Stably Blockchain Labs, Inc., une entreprise canadienne. Chaque jeton USDS est entièrement adossé à un dollar américain détenu en réserve, ce qui fait que sa valeur suit celle du dollar américain. StableUSD est négociée sur Bittrex et Binance et sert de stablecoin principale sur Binance DEX. La pièce existe sur deux réseaux : Ethereum (USDS) et Binance Chain (USDSB). ADAMANT a intégré la version Ethereum.

L'équipe de Stably a été choisie en partie pour son ouverture aux nouvelles technologies et sa volonté de collaborer, contrairement à d'autres émetteurs de stablecoins plus établis qui ont hésité à s'engager. La feuille de route de coopération commence par le stockage dans le portefeuille et les transferts en chat de USDS, suivis par l'intégration dans les services internes d'ADAMANT tels que les échangeurs de cryptomonnaies intégrés.

### USDS dans le messager

Les utilisateurs de l'application web ont accès à un portefeuille USDS directement dans ADAMANT. Les utilisateurs peuvent transférer des USDS dans les discussions à leurs contacts et les utiliser pour des paiements.

![Portefeuille USDS dans ADAMANT](/images/engineering-notes/medium/42106aae239/002-1-ykzho7rrajzcrnwtdkn40w-png.webp)

Les frais d'envoi de USDS sont payés en Ether (ETH), le jeton de gaz du réseau Ethereum. Cette approche permet au portefeuille de déterminer précisément le montant de USDS à envoyer et simplifie le calcul des frais pour l'utilisateur.

![Envoi de USDS dans ADAMANT](/images/engineering-notes/medium/42106aae239/003-0-ovcrx5nnfyucgphs.webp)
