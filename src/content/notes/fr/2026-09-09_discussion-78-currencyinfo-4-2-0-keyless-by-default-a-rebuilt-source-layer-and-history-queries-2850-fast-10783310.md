---
title: "Currencyinfo 4.2.0 : Par défaut sans clé, couche source reconstruite et requêtes d'historique 2850× plus rapides"
slug: "discussion-78-currencyinfo-4-2-0-keyless-by-default-a-rebuilt-source-layer-and-history-queries-2850-fast-10783310"
description: "Découvrez les nouveautés de Currencyinfo 4.2.0, incluant le mode sans clé, une architecture optimisée et des performances de requêtes d'historique nettement améliorées."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/78"
publishedAt: "2026-09-09T17:15:27Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "Currencyinfo"
cardSpan: "half"
originalId: "github-discussion:10783310"
locale: "fr"
placeholder: false
---

## Introduction

Nous sommes ravis d'annoncer la sortie de **Currencyinfo 4.2.0**. Cette mise à jour majeure apporte des changements structurels importants, une sécurité renforcée par défaut et des gains de performance considérables pour les utilisateurs de **ADAMANT Tradebot**.

## Principales nouveautés

### Par défaut sans clé (Keyless)

La sécurité est au cœur de nos préoccupations. Dans cette version, l'accès aux données est désormais configuré en mode « sans clé » par défaut. Cela réduit la surface d'exposition et simplifie le déploiement initial pour les nouveaux utilisateurs de **cryptofoundry**.

### Couche source reconstruite

Nous avons entièrement réécrit la couche source pour améliorer la maintenabilité et la robustesse du système. Cette refonte permet une meilleure intégration avec **Node.js** et facilite les futures mises à jour des modules situés dans `modules/commands/`.

### Performances : requêtes d'historique 2850× plus rapides

Grâce à une optimisation poussée des index **MongoDB** et à une révision des algorithmes de traitement, la vitesse d'exécution des requêtes d'historique a été multipliée par 2850. Ce gain massif garantit une réactivité optimale, même avec des volumes de données importants sur des plateformes comme **Azbit**, **P2PB2B** ou **NonKYC**.

## Mise à jour et installation

Pour mettre à jour votre instance, utilisez les commandes **CLI** habituelles :

- `mm status` pour vérifier votre version actuelle.
- `mm logs` pour consulter les journaux après la mise à jour.

Si vous utilisez **Docker** et **Compose**, assurez-vous de récupérer la dernière image depuis **GHCR** via **GitHub Actions**.

## Support

Pour toute question technique ou retour d'expérience, n'hésitez pas à contacter notre équipe via **ADAMANT Messenger** en écrivant à [@adamant_business](https://t.me/adamant_business). Vous pouvez également consulter la documentation sur [marketmaking.app](https://marketmaking.app) ou ouvrir une issue sur notre dépôt **GitHub**.
