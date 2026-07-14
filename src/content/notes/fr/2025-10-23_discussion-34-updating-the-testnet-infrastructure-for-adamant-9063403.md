---
title: "Mise à jour de l'infrastructure du testnet pour ADAMANT"
slug: "discussion-34-updating-the-testnet-infrastructure-for-adamant-9063403"
description: "ADAMANT a identifié une tâche d'amélioration de l'infrastructure (Issue 148) pour mettre à jour et stabiliser son environnement de testnet. Un testnet sain est essentiel au développement blockchain fiable…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/34"
publishedAt: "2025-10-23T15:40:31Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:9063403"
locale: "fr"
placeholder: false
---

ADAMANT a identifié une tâche d'amélioration de l'infrastructure (Issue #148) afin de mettre à jour et stabiliser son environnement de testnet. Un testnet sain est essentiel pour un développement blockchain fiable, permettant des tests réalistes et l'intégration des contributeurs.

## Ce qui est disponible

Une **capture instantanée de démarrage** de la base de données du testnet est désormais disponible au téléchargement à l'adresse `https://testnet.adamant.im/db_test_backup.sql.gz`. Cela permet aux développeurs de déployer rapidement un nœud de testnet sans avoir à synchroniser depuis le début.

Des jetons ADM de testnet (3500 ADM) peuvent être demandés via le même distributeur utilisé pour le réseau principal, à l'adresse `https://adamant.im/free-adm-tokens/`. L'application messagerie de testnet exécutant la branche de développement est accessible à l'adresse `https://dev-adamant-testnet.surge.sh/`, et l'explorateur de blocs de testnet est disponible à l'adresse `https://testnet.adamant.im/`.

Une liste des nœuds publics de testnet est maintenue dans le fichier de configuration par défaut sur GitHub : `https://github.com/Adamant-im/adamant/blob/dev/test/config.default.json`.

Pour plus de détails sur l'implémentation, consultez l'article original à l'adresse `https://news.adamant.im/updating-the-testnet-infrastructure-for-adamant-aac36fea2a56`.
