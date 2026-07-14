---
title: "Docs et schéma mis à jour pour ADAMANT Node v0.10.0"
slug: "discussion-53-docs-and-schema-updated-for-adamant-node-v0-10-0-10292291"
description: "Avec ADAMANT Node v0.10.0, la pile destinée aux développeurs est actualisée : spécification API (adamant-schema) et documentation (adamant-docs) sont à jour, ainsi qu'un réseau local et un testnet fraîchement redémarré."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/53"
publishedAt: "2026-06-20T18:25:34Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:10292291"
locale: "fr"
placeholder: false
---

Parallèlement à **ADAMANT Node v0.10.0**, la pile destinée aux développeurs a été actualisée pour rester parfaitement synchronisée avec le nœud : la spécification d'API (`adamant-schema`) et la documentation (`adamant-docs`) sont toutes deux mises à jour, ainsi qu'un réseau local et un testnet fraîchement redémarré. Voici un bref résumé pour tous ceux qui développent sur ADAMANT.

## adamant-schema (spécification d'API)

La spécification a été mise à jour de **OpenAPI 3.0.3 → 3.2.0**, sa version étant désormais alignée sur `0.10.0` et vérifiée par rapport au nœud en production. Les transactions prennent désormais en charge **`timestampMs`**, offrant des horodatages précis au milliseconde en complément du `timestamp` existant au niveau de la seconde. Les réponses d'état du nœud sont enrichies, ajoutant **`nodeTimestampMs`**, **`unixTimestampMs`**, et un objet **`loader`** exposant `syncing`, `consensus`, `blocks` et `blocksCount`.

Un nouvel endpoint **`GET /peers/get`** permet de rechercher un pair par son IP et son port. De nouveaux paramètres de requête **`returnUnconfirmed`** et **`includeDirectTransfers`** remplacent l'ancien `withoutDirectTransfers`, désormais déprécié. Les nœuds de testnet ont été ajoutés à la liste des serveurs.

L'interface Swagger UI interactive sur [schema.adamant.im](https://schema.adamant.im) propose désormais une recherche d'opérations en direct, des vérifications de santé par nœud avec des étiquettes de version d'API, et une sélection automatique d'un nœud mainnet opérationnel. Les outils ont été mis à jour vers Node.js 22, TypeScript et Express 5, avec un client régénéré et typé pour les consommateurs.

## adamant-docs (documentation)

La référence d'API est mise à jour en **v0.10.0** et marquée par version dans la barre latérale, garantissant que documentation et réseau ne dérivent jamais. De nouvelles pages couvrent la **consensus et la validation des transactions**, le **synchronisation**, ainsi que l'endpoint **loader / état du nœud**. La sémantique de **`timestampMs`** est documentée de bout en bout, et la documentation de l'API **peers** a été actualisée.

Les guides **run-your-own-node** ont été étendus pour couvrir l'installation (y compris sur macOS), la configuration, le démarrage automatique, le bootstrap et la récupération du nœud. Il existe désormais des pages dédiées à l'exécution d'un **localnet** et à la participation au **testnet**.

## Localnet & testnet

Un **localnet** vous permet de déployer localement un réseau ADAMANT complet afin de développer et tester sans toucher à l'infrastructure publique. Le **testnet** a été redémarré et aligné sur v0.10.0, vous permettant de valider vos intégrations dans des conditions de réseau réelles avant le déploiement en mainnet. Ensemble, cela rend le parcours **local → testnet → mainnet** fluide et entièrement documenté.

## Ressources associées

- Référence API : https://schema.adamant.im
- Documentation : https://docs.adamant.im
- Code source du nœud : https://github.com/Adamant-im/adamant
- Dépôt de la spécification API : https://github.com/Adamant-im/adamant-schema
- Dépôt de la documentation : https://github.com/Adamant-im/docs
- Client JS : https://github.com/Adamant-im/adamant-api-jsclient
