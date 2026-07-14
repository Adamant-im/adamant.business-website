---
title: "Traitement de adamant-wallets : Informations sur les cryptomonnaies et jetons pour les applications clientes ADAMANT"
slug: "discussion-23-explanation-of-processing-adamant-wallets-all-coin-information-for-adamant-client-applicat-8933380"
description: "Le dépôt adamant-wallets regroupe toutes les informations sur les cryptomonnaies et jetons pour les applications clientes ADAMANT. L'application cliente doit correctement traiter ces données et offrir une structure unifiée aux développeurs."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/23"
publishedAt: "2025-09-22T12:54:29Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:8933380"
locale: "fr"
placeholder: false
---

Le dépôt `adamant-wallets` regroupe toutes les informations sur les cryptomonnaies et jetons destinées aux applications clientes ADAMANT. L'application cliente est responsable du traitement correct de ces données et de la mise à disposition des développeurs d'une structure unifiée et pratique. La structure proposée n'est pas parfaite — les informations sur les jetons sont fusionnées à partir de dossiers différents — mais les alternatives comportent elles aussi des inconvénients, aucune modification structurelle n'est donc proposée ici.

## Terminologie

Un **crypto** est un terme général englobant à la fois les pièces et les jetons. Chaque crypto possède un nom (par exemple, Bitcoin) et un ticker ou symbole (par exemple, BTC). Une **pièce** est une crypto qui existe sur sa propre blockchain, comme `ADM`, `BTC`, `DOGE`, `DASH` ou `KLY`. Un **jeton** est une crypto qui existe au-dessus d'une blockchain donnée — par exemple, `STORJ` ou `USDT` sur Ethereum ou Binance Smart Chain.

Chaque blockchain possède une **pièce principale**, qui partage des propriétés communes avec tous les jetons de cette chaîne et sert à payer les frais de transfert. Par exemple, transférer USDT sur Ethereum nécessite des frais payés en `ETH`. Chaque blockchain définit également un **type de jeton** — Ethereum utilise `ERC20`, Binance Smart Chain utilise `BEP20`. Un jeton peut exister sur plusieurs blockchains (un **jeton multi-chaîne**) : USDT existe à la fois comme `ERC20` sur Ethereum et comme `BEP20` sur Binance Smart Chain. Il s'agit du même jeton, avec la même valeur et les mêmes informations générales, mais stocké et transféré sur des chaînes différentes.

## Structure de base

Chaque crypto se trouve dans le dossier `/general`. Les jetons existent en outre dans le dossier `/blockchains`. Par exemple, `/general/USDT/info.json` contient les informations générales sur USDT, tandis que `/blockchains/ethereum/USDT/info.json` contient les informations spécifiques à USDT sur Ethereum. Le fichier `/blockchains/{chain}/info.json` stocke les informations partagées propres à la chaîne pour tous les jetons de cette chaîne et définit le lien vers la pièce principale avec ses propriétés de base.

### Sources des propriétés d'un jeton

Tout jeton sur une blockchain donnée dispose de quatre sources de propriétés, fusionnées par ordre de priorité décroissante :

1. `/blockchains/ethereum/USDT/info.json` — informations spécifiques au jeton sur une blockchain précise
2. `/blockchains/ethereum/info.json` — informations partagées sur les jetons de cette blockchain
3. `/general/ethereum/info.json` — informations provenant de la pièce principale de la blockchain
4. `/general/USDT/info.json` — informations générales sur le jeton

Par exemple, USDT sur Ethereum fusionne ces quatre sources, la source (1) prévalant sur (2), et ainsi de suite.

## Création de pièces et de jetons dans les applications

Pour créer des pièces, l'application parcourt tous les cryptos présents dans `/general` et lit chaque fichier `/general/{crypto}/info.json`. Elle ignore les entrées dont le `status` n'est pas actif ou dont le `type` n'est pas `coin`. Si `createCoin = true`, elle crée un objet pièce affiché comme une entrée blockchain, sans type de jeton — des exemples incluent `ADM` et `BTC`.

![Discussion screenshot 1](/images/engineering-notes/github/discussions/8933380/001-fafd0ecc.webp)

![Discussion screenshot 2](/images/engineering-notes/github/discussions/8933380/002-cebba626.webp)

Pour créer des jetons, l'application parcourt toutes les blockchains présentes dans `/blockchains` (par exemple, `ethereum`, `binanceSmartChain`) et lit le fichier `info.json` au niveau de la chaîne. Elle ignore la blockchain si son `status` n'est pas actif et note la `mainCoin`. Elle lit ensuite `/general/{mainCoin}/info.json` pour obtenir les informations générales de la pièce principale. Pour chaque jeton dans le dossier de cette blockchain, elle lit `/general/{token}/info.json` — en ignorant le jeton si le fichier est manquant ou si `type` n'est pas `token` — puis lit `/blockchains/{blockchain}/{token}/info.json`, en ignorant le jeton si `status` n'est pas actif. Enfin, elle fusionne les quatre sources selon leur priorité et crée un objet jeton affiché avec son type de jeton (par exemple, `ERC20`, `BEP20`). Des exemples incluent `USDT`, `USDC` et `DAI`.

![Discussion screenshot 3](/images/engineering-notes/github/discussions/8933380/003-f4329279.webp)

![Discussion screenshot 4](/images/engineering-notes/github/discussions/8933380/004-a0d74d6b.webp)

## Objet de données pour un crypto

Après analyse de `adamant-wallets`, l'application dispose d'un objet de données contenant les informations sur toutes les pièces et tous les jetons présents sur les différentes chaînes. Les propriétés étant déjà fusionnées, la récupération des données est simple :

```js
// Inside token-related methods
let property = coinInfo.property

// Outside, referencing by token and chain
let property = coinInfo["USDT"]["ethereum"].property
```

Cela garantit que les applications ADAMANT peuvent gérer de manière cohérente plusieurs blockchains et jetons.
