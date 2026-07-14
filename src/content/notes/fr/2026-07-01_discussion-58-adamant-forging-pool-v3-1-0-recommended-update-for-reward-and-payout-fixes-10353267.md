---
title: "ADAMANT Forging Pool v3.1.0 : corrections des récompenses et des paiements"
slug: "discussion-58-adamant-forging-pool-v3-1-0-recommended-update-for-reward-and-payout-fixes-10353267"
description: "ADAMANT Forging Pool v3.1.0 est une mise à jour recommandée pour les opérateurs de pools. La version corrige et renforce le calcul des récompenses et la gestion des paiements programmés."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/58"
publishedAt: "2026-07-01T14:33:27Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "ADM Nodes, Delegates & Pools"
cardSpan: "half"
originalId: "github-discussion:10353267"
locale: "fr"
placeholder: false
---

ADAMANT Forging Pool v3.1.0 est une mise à jour recommandée pour les opérateurs de pools. Cette version corrige et renforce le calcul des récompenses et la gestion des paiements programmés, et introduit plusieurs changements structurels dont il convient de prendre connaissance avant de mettre à jour les pools de production.

## Pourquoi mettre à jour

Les changements les plus importants visent la sécurité des paiements, la sécurité des opérateurs et la maintenabilité à long terme. Les récompenses en attente sont désormais normalisées avant le calcul des paiements, et l’avancement des récompenses par votant est conservé pour les blocs forgés. Les chemins de réessai et de reprise après incident sont désormais plus sûrs contre les mises à jour de récompenses en double. Les chemins de paiement, d’analyse des blocs et de comportement du stockage bénéficient désormais de tests plus ciblés, et les journaux et notifications sont plus clairs en cas de défaillance opérationnelle.

## Stockage et migration

Le stockage du pool repose désormais sur MongoDB. La version inclut des outils de migration pour les anciennes données de pool basées sur LowDB, situés dans `scripts/migrate-lowdb-mongodb/`, ainsi que des tests de migration, la configuration des index MongoDB, une référence de configuration mise à jour et des instructions de migration dans le README. Les opérateurs doivent sauvegarder leurs données existantes, tester la migration sur une copie et vérifier les totaux des récompenses en attente et reçues avant de basculer les paiements de production vers le pool mis à jour.

## Sécurité des opérateurs

La version v3.1.0 ajoute un support optionnel pour le chiffrement de la phrase secrète. Les configurations existantes avec phrase secrète en clair restent prises en charge, mais les opérateurs peuvent désormais chiffrer la phrase secrète du délégué et déverrouiller le pool en cours d’exécution uniquement lorsque les paiements doivent être activés :

```sh
npm run adm-pool encrypt
npm run adm-pool unlock
npm run adm-pool lock
npm run adm-pool status
```

L’interface de contrôle utilise un socket Unix local accessible uniquement par le propriétaire. Avec une phrase secrète chiffrée, le pool peut démarrer verrouillé : la synchronisation des blocs, le tableau de bord et l’API publique restent disponibles, tandis que les paiements et les notifications ADM sont suspendus jusqu’au déverrouillage.

## Surveillance et tableau de bord

Cette version ajoute un point de terminaison `/api/health` destiné à la surveillance externe sans secret, ainsi qu’un statut de paiement verrouillé pour le tableau de bord. Le filtrage des votants et des transactions par adresse ou par nom est désormais pris en charge, et les noms du délégué et des votants s’affichent sous les adresses lorsque disponibles. Des corrections de tri numérique, des liens vers l’explorateur améliorés et des améliorations de mise en page du tableau de bord complètent cette série de modifications.

## Notes sur le runtime et la mise à jour

La version minimale requise est désormais Node.js 22.13.0+ et npm 10+. Le README, le fichier CONTRIBUTING et les instructions du dépôt ont été mis à jour pour la configuration, la migration, la surveillance, la sécurité des secrets et le flux de contribution.

Avant la mise à jour, sauvegardez la configuration et l’historique des récompenses, examinez les paramètres MongoDB dans `config.default.jsonc` et testez la migration LowDB vers MongoDB sur une copie des données. Après la migration, vérifiez les totaux des récompenses en attente et reçues, revoyez les paramètres du portefeuille de paiement et de maintenance, générez et testez rapidement le tableau de bord, puis vérifiez `/api/health`. Déverrouillez les paiements uniquement après avoir contrôlé les journaux de démarrage et l’état du pool.

Version et dépôt : [github.com/Adamant-im/pool](https://github.com/Adamant-im/pool)
