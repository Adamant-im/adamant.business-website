---
title: "ADAMANT Forging Pool v3.1.0 : Récompenses plus sûres, opérations simplifiées, meilleure supervision"
slug: "forging-pool-v3-1-0-safer-rewards-easier-operations-better-monitoring-c77f450abf44"
description: "ADAMANT Forging Pool v3.1.0 est une mise à jour recommandée pour les opérateurs de pools. Elle améliore le calcul des récompenses, la fiabilité des paiements, la comptabilité et la supervision."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/forging-pool-v3-1-0-safer-rewards-easier-operations-better-monitoring-c77f450abf44"
publishedAt: "2026-07-01T18:03:33.378Z"
author: "Quantum Trader"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:c77f450abf44"
coverImage: "/images/engineering-notes/medium/c77f450abf44/001-5ca73690a5.webp"
locale: "fr"
placeholder: false
---

ADAMANT Forging Pool v3.1.0 est une mise à jour recommandée pour les opérateurs de pools. Elle améliore la fiabilité du calcul et du paiement des récompenses, renforce la logique comptable, modernise l'environnement d'exécution et simplifie les opérations quotidiennes.

### Pourquoi cette version est importante

La responsabilité principale d'un pool de forge est de calculer correctement les récompenses des votants et de les verser en toute sécurité. La version v3.1.0 se concentre précisément sur cet aspect. Les flux de récompenses et de paiements ont été revus et renforcés pour réduire les risques liés aux cas limites, tels que les nouvelles tentatives, les échecs partiels ou les valeurs de récompense stockées. Les récompenses en attente sont normalisées avant la comptabilisation des paiements, et l'avancement des récompenses par votant est désormais suivi de manière plus sûre, afin qu'un incident ou une nouvelle tentative n'entraîne pas accidentellement de doublons dans les mises à jour de récompenses. Cette version est donc particulièrement importante pour les opérateurs soucieux de la justesse des paiements et de la fiabilité à long terme.

### Quoi de neuf dans la v3.1.0

Le changement d'infrastructure le plus important est le passage à un stockage basé sur MongoDB, offrant aux opérateurs de pools une couche de stockage plus robuste pour les blocs, les votants, les transactions, l'historique des récompenses et les données opérationnelles. Pour les pools existants, la version v3.1.0 inclut des outils de migration pour les anciennes données basées sur LowDB, permettant aux opérateurs de passer à la nouvelle version sans perdre l'historique des récompenses.

![Forging Pool v3.1.0 : Récompenses plus sûres, opérations simplifiées, meilleure supervision](/images/engineering-notes/medium/c77f450abf44/002-a7aa0fc331.webp)

Cette version ajoute également une distribution de récompenses et une comptabilisation des paiements plus sûres, un suivi des progrès des récompenses résistant aux nouvelles tentatives, des journaux (logs) améliorés pour les paiements et le traitement des blocs, un point de terminaison `/api/health` pour la supervision externe, la prise en charge optionnelle du chiffrement de la phrase secrète du délégué, des commandes CLI `adm-pool` pour chiffrer, déverrouiller, verrouiller et vérifier le statut, la possibilité de filtrer le tableau de bord par adresse ou par nom, un affichage plus clair des votants et délégués dans les tableaux, une documentation mise à jour, ainsi qu'une version minimale requise de Node.js 22.13.0+.

### Sécurité renforcée pour les opérateurs

Les opérateurs de pools peuvent désormais chiffrer la phrase secrète du délégué à l'aide d'un mot de passe opérateur. Cette fonctionnalité est facultative, les configurations existantes avec phrase secrète en clair restant prises en charge, mais le nouveau flux de travail offre un chemin de production plus sécurisé. Avec des phrases secrètes chiffrées, le pool peut démarrer dans un état verrouillé. La synchronisation des blocs, le tableau de bord et les API publiques restent accessibles, tandis que les paiements et les notifications ADM sont suspendus jusqu'à ce que l'opérateur déverrouille le pool. Cela signifie qu'un serveur peut redémarrer ou se relancer sans exposer immédiatement les fonctionnalités de paiement.

### Opérations et supervision simplifiées

Le nouveau CLI `adm-pool` fournit aux opérateurs des commandes simples pour les actions les plus sensibles au moment de l'exécution :

```sh
npm run adm-pool encrypt
npm run adm-pool unlock
npm run adm-pool lock
npm run adm-pool status
```
Plutôt que de gérer manuellement chaque changement d'état sensible dans les fichiers de configuration ou les journaux de processus, les opérateurs disposent désormais d'un flux de contrôle dédié. Le nouveau point de terminaison `/api/health` fournit une vue d'ensemble du statut sans nécessiter de secrets, destinée aux outils de supervision tels que Zabbix, des tableaux de bord personnalisés ou des vérifications de disponibilité. Associé au stockage MongoDB et aux journaux plus clairs, cela rend le pool plus facile à surveiller, déboguer et maintenir à long terme.

### Mise à niveau recommandée

ADAMANT Forging Pool v3.1.0 est recommandée pour tous les opérateurs de pools, en particulier ceux qui gèrent des pools de production avec des paiements réguliers. Avant la mise à niveau, les opérateurs doivent sauvegarder leur configuration et leur historique de récompenses, vérifier les paramètres MongoDB, tester la migration sur une copie des données existantes et valider les paramètres de paiement après la migration.

Version publiée : [https://github.com/Adamant-im/pool/releases/tag/v3.1.0](https://github.com/Adamant-im/pool/releases/tag/v3.1.0)
Dépôt : [https://github.com/Adamant-im/pool](https://github.com/Adamant-im/pool)
