---
title: "Modèles organisationnels pour les problèmes et les demandes de fusion pour ADAMANT"
slug: "discussion-4-let-s-add-organization-wide-issue-and-pr-templates-for-adamant-8890522"
description: "Améliorer la cohérence des dépôts ADAMANT grâce aux modèles organisationnels GitHub."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/4"
publishedAt: "2025-09-13T14:38:21Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "Proposals & Ideas"
cardSpan: "half"
originalId: "github-discussion:8890522"
locale: "fr"
placeholder: false
---

Pour améliorer la cohérence entre tous les dépôts ADAMANT, nous pouvons exploiter la fonctionnalité de modèles organisationnels de GitHub. En créant un dépôt spécial `.github` à la racine de l'organisation, nous pouvons fournir des modèles par défaut que les dépôts sans modèles personnalisés hériteront automatiquement.

Ce dépôt contiendrait plusieurs fichiers modèles. Pour les rapports de bogues, un fichier `bug_report.yml` structurerait le processus de signalement. Pour les demandes de fonctionnalités, `feature_request.yml` guiderait les contributeurs. Un fichier `config.yml` peut contrôler la visibilité des modèles et ajouter des liens de contact, tandis qu'un fichier `PULL_REQUEST_TEMPLATE.md` standardiserait les descriptions des demandes de fusion.

La mise en œuvre de ces modèles offre une structure claire aux contributeurs, garantissant que des détails essentiels comme les étapes de reproduction, la motivation et les alternatives ne soient pas oubliés. Cela fait gagner du temps aux mainteneurs en réduisant le nombre de problèmes incomplets et améliore l'expérience générale des développeurs sur tous les projets ADAMANT.

La prochaine étape consiste à définir la formulation finale et les champs de ces modèles. Une fois un accord trouvé, nous pourrons préparer une demande de fusion avec les fichiers prêts à l'emploi.
