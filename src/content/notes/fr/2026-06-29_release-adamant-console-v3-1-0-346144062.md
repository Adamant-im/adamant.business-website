---
title: "ADAMANT Console v3.1.0"
slug: "release-adamant-console-v3-1-0-346144062"
description: "ADAMANT Console v3.1.0 met à jour la console pour ADAMANT Node v0.10.0 avec de nouvelles fonctionnalités CLI, RPC, documentation et outils de validation."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-console/releases/tag/v3.1.0"
publishedAt: "2026-06-29T08:31:56Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-console"
tag: "v3.1.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-console:346144062"
locale: "fr"
placeholder: false
---

ADAMANT Console v3.1.0 met à jour la console pour ADAMANT Node v0.10.0 et renouvelle le CLI, JSON-RPC, l’enveloppe JavaScript, la documentation et la chaîne d’outils de validation. Cette version ajoute la prise en charge des réponses et requêtes d’ADAMANT Node v0.10.0 via `adamant-api` v3. Elle introduit également des mises à jour dans la gestion de l’état du nœud, des salons/messages de discussion, des transactions de discussion, de la requête `returnUnconfirmed` pour les transactions, de la recherche de délégué et des transferts directs. Les métadonnées et dépendances des paquets ont été actualisées, accompagnées d’un nouveau site de documentation VitePress, d’une référence API TypeDoc générée automatiquement, et d’un déploiement sur GitHub Pages à chaque publication. D’autres améliorations incluent des exemples d’aide CLI, une couverture étendue du JSON-RPC, des JSDoc API publics, une coloration syntaxique pour la sortie JSON formatée, ainsi qu’une couverture accrue des tests pour les enveloppes API, le comportement de l’aide CLI, les métadonnées de configuration/client, l’historique des invites et la journalisation.

La vérification peut être effectuée à l’aide des commandes suivantes :
@@CODEBLOCK1@@
### Changements cassants
Node.js 22.13.0 ou une version ultérieure est désormais requis pour exécuter ADAMANT Console.
