---
title: "ADAMANT Wallet Metadata 2.6.0 : Notes techniques pour les intégrations de portefeuilles"
slug: "discussion-55-adamant-wallet-metadata-2-6-0-developer-notes-for-wallet-integrations-10329995"
description: "ADAMANT Wallet Metadata 2.6.0 est prête pour publication. Cette mise à jour concerne principalement les développeurs intégrant les portefeuilles cryptographiques intégrés ADAMANT, les métadonnées de portefeuille, les listes de nœuds, etc."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/55"
publishedAt: "2026-06-27T13:42:14Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "Developers & API"
cardSpan: "half"
originalId: "github-discussion:10329995"
locale: "fr"
placeholder: false
---

ADAMANT Wallet Metadata `2.6.0` est prête pour publication. Cette mise à jour concerne principalement les développeurs qui intègrent les portefeuilles cryptographiques intégrés ADAMANT, les métadonnées de portefeuille, les listes de nœuds, les définitions de service ou la synchronisation de l'interface/utilisateur ou de la configuration en aval.

## Ce qui a changé pour les développeurs de portefeuilles et de services

Le dépôt `adamant-wallets` est la source officielle des métadonnées relatives aux monnaies, jetons, blockchains, nœuds, services, icônes et schémas utilisés par les applications ADAMANT. La version `2.6.0` met à jour à la fois les métadonnées elles-mêmes et la documentation sur la manière dont les consommateurs en aval doivent les lire.

Le modèle de remplacement des métadonnées est désormais documenté plus clairement. Les champs partagés se trouvent dans `assets/general/<coin-or-token>/info.json`, les valeurs par défaut des blockchains dans `assets/blockchains/<blockchain>/info.json`, et les remplacements spécifiques aux jetons par blockchain dans `assets/blockchains/<blockchain>/<token>/info.json`. Le fichier `README.md` restaure et étend désormais les explications des champs des métadonnées de portefeuille, y compris les nœuds, services, frais, précision, icônes, contrôles de santé, indicateurs d\'état et limites de transfert. Le fichier `specification/openapi.json` couvre davantage de champs de métadonnées de portefeuille et de structures imbriquées, aidant les SDK, validateurs, consommateurs de schéma et la documentation générée à mieux refléter la structure réelle du JSON. Les règles de maintenance spécifiques au dépôt, les attentes en matière de validation, les conventions pour les incidents et les demandes de tirage (PR), ainsi que les règles de sécurité des métadonnées sont désormais documentées dans `AGENTS.md` et `.github/CONTRIBUTING.md`.

## Mises à jour des métadonnées à vérifier en aval

Si votre application, service, SDK, bot ou backend consomme directement les métadonnées de portefeuille ADAMANT ou via des portefeuilles ADAMANT intégrés, veuillez examiner les modifications suivantes.

Les métadonnées des nœuds ADAMANT ont été actualisées, et trois nœuds proxy ADM indisponibles ont été supprimés : `tauri.bbry.app`, `endless.bbry.app` et `debate.bbry.app`. Les métadonnées de Bitcoin, Dash et Dogecoin ont été mises à jour, et les exemples de validation d\'adresse Dogecoin ont été corrigés. Le lien GitHub de DAI a été corrigé, et la désignation du jeton GT a été mise à jour. Les métadonnées obsolètes de USDS et les ressources d\'icône associées ont été supprimées. Les métadonnées des packages, les fichiers de verrouillage de dépendances, les informations sur le moteur Node.js, les scripts de validation et les liens vers le dépôt ont également été actualisés.

## Vérifications recommandées pour les intégrateurs

Si vous utilisez ce dépôt dans un portefeuille, une intégration d\'échange, un service de surveillance, une application mobile, une application web progressive (PWA), un SDK ou un backend personnalisé, resynchronisez les métadonnées du portefeuille après la fusion de la version `2.6.0` dans `master`. Vérifiez si votre code contient des références en dur aux métadonnées USDS supprimées ou aux nœuds proxy ADM supprimés, et relancez la validation de vos métadonnées par rapport au schéma OpenAPI mis à jour si vous utilisez des types générés, des validateurs ou des outils sensibles au schéma.

Revérifiez le comportement de l\'interface utilisateur du portefeuille pour les champs tels que `status`, `defaultVisibility`, `defaultOrdinalLevel`, `decimals`, `cryptoTransferDecimals`, `minBalance`, `minTransferAmount`, `fixedFee`, `defaultFee` et les chemins d\'icônes. Revérifiez la logique de sélection des nœuds et services si votre application utilise `nodes`, `services`, `healthCheck`, `minVersion`, `hasIndex`, `alt_ip`, `txFetchInfo`, `txConsistencyMaxTime`, `timeout` ou les paramètres de gaz de fiabilité. Assurez-vous que votre intégration traite les métadonnées comme une configuration basée sur des listes et ne s\'appuie pas sur un seul point de terminaison, sauf si votre propre stratégie de basculement est explicite.

## Références

- Incident de publication : https://github.com/Adamant-im/adamant-wallets/issues/137
- Demande de tirage (PR) de publication : https://github.com/Adamant-im/adamant-wallets/pull/138
- Dépôt : https://github.com/Adamant-im/adamant-wallets
- Propositions d\'amélioration ADAMANT : https://aips.adamant.im/
