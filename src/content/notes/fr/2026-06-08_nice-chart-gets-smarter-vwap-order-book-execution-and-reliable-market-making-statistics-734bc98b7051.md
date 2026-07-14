---
title: "Nice Chart devient plus intelligent : VWAP, exécution sur carnet d'ordres et statistiques fiables de market-making"
slug: "nice-chart-gets-smarter-vwap-order-book-execution-and-reliable-market-making-statistics-734bc98b7051"
description: "La dernière mise à jour d'adamant-tradebot (v23.0.0) améliore considérablement Nice Chart, le mode premium de market-making d'ADAMANT. Désormais, le moteur analyse chaque trade en profondeur et fournit des statistiques détaillées."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/nice-chart-gets-smarter-vwap-order-book-execution-and-reliable-market-making-statistics-734bc98b7051"
publishedAt: "2026-06-08T13:31:06.952Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/734bc98b7051/001-1-m2zzlsbbi-isnuqvz3kn9q-png.webp"
cardSpan: "full"
originalId: "medium:734bc98b7051"
locale: "fr"
placeholder: false
---

La dernière mise à jour de `adamant-tradebot` (version 23.0.0) améliore considérablement Nice Chart, le mode premium de market-making d'ADAMANT. Plutôt que de simplement générer de l'activité de trading, le moteur d'exécution suit désormais davantage de contexte autour de chaque trade, évalue plus précisément l'écart VWAP projeté et fournit des statistiques détaillées sur le comportement des traders et les ordres récemment clôturés. Cela aide les opérateurs à comprendre non seulement ce qui s'est produit, mais aussi pourquoi.

## Suivi amélioré de l'écart VWAP

VWAP (Volume-Weighted Average Price) est l'un des indicateurs les plus importants pour la qualité d'exécution. La mise à jour améliore la gestion du VWAP de trois manières. Premièrement, la précision d'affichage de l'écart a été corrigée — le formatage précédent en pourcentage pouvait prêter à confusion, et le nouvel affichage convient désormais à une analyse au niveau du point de base. Deuxièmement, le seuil d'écart VWAP autorisé a été ajusté à 0,6 %, offrant ainsi plus de flexibilité pratique à la stratégie lors de l'appariement d'ordres dans des conditions réelles. Troisièmement, le moteur gère désormais avec plus de précaution les scénarios d'écart VWAP projeté négatif, car certaines situations sur le carnet d'ordres peuvent sembler acceptables au premier regard, alors que l'exécution projetée déformerait en réalité la logique de trade souhaitée.

## Exécution plus intelligente sur carnet d'ordres

![Nice Chart devient plus intelligent : VWAP, exécution sur carnet d'ordres et statistiques fiables de market-making](/images/engineering-notes/medium/734bc98b7051/002-1-flqt3yboi63ap-dbqbejq-png.webp)

Le moteur mis à jour introduit un routage d'exécution plus explicite, rendant la stratégie plus facile à comprendre, déboguer et exploiter. Un nouveau paramètre de configuration, `executeInOrderBookPercent`, contrôle quelle partie d'un trade peut être exécutée directement via le carnet d'ordres. Cela évite une consommation trop agressive de liquidité visible et est particulièrement utile sur les marchés où le carnet d'ordres est peu profond, irrégulier ou partiellement contrôlé par des traders tiers. Plutôt que d'exécuter aveuglément le montant total, Nice Chart peut désormais appliquer des plafonds de montant et prendre des décisions plus réfléchies.

## Suivi d'exécution plus transparent

Le bot fournit désormais des journaux (logs) plus clairs concernant les actions sur carnet d'ordres, les décisions de routage, la limitation de montant et le comportement d'exécution des trades. Lorsqu'un événement inattendu se produit — un remplissage partiel, un remplacement, un saut ou une correspondance inattendue — les journaux fournissent davantage de contexte. Pour les systèmes de trading, de bons journaux font partie de la sécurité opérationnelle, et pas seulement du confort pour les développeurs.

## Statistiques améliorées pour les traders

La commande `/orders t full` a été enrichie avec plus de contexte autour des ordres récemment clôturés, des statistiques cumulées, du volume de trading et du suivi par époque (epoch). Les opérateurs peuvent désormais répondre à des questions telles que : quel volume a été généré depuis le début de l'époque actuelle, combien d'ordres récents ont été clôturés, et l'activité actuelle est-elle conforme au comportement historique ?

![Nice Chart devient plus intelligent : VWAP, exécution sur carnet d'ordres et statistiques fiables de market-making](/images/engineering-notes/medium/734bc98b7051/003-1-go7ssfwyfsy0gje-f72-yg-png.webp)

## Attribution améliorée des remplissages

Une nouvelle fonction, `attributeThirdPartyFillFromMatchPlan`, améliore la manière dont le moteur attribue les remplissages tiers lorsque l'exécution sur carnet d'ordres est impliquée. Cela rend les statistiques plus précises et permet de mieux distinguer le comportement interne de la stratégie des interactions avec le marché externe.

## PnL MTM et flux de trésorerie en USD

Les calculs de PnL Mark-to-Market ont été enrichis avec des propriétés de flux de trésorerie en USD. Cela rend les rapports plus clairs pour les paires où les opérateurs doivent comprendre la performance en termes de USD, et non seulement en actif de base ou en actif de cotation.

## Système de types et tests

De nouvelles définitions de types ont été ajoutées ou mises à jour pour les données de graphique en chandeliers, les informations du carnet d'ordres, la configuration d'exécution, les demandes de prix, les paramètres des traders et la configuration de Nice Chart. Bien que le projet reste basé sur JavaScript avec des annotations JSDoc, de meilleures définitions de types permettent de détecter les erreurs plus tôt et réduisent le risque de bogues subtils d'exécution. La couverture des tests a également été étendue pour les actions sur carnet d'ordres, la limitation de montant, le traitement des remplissages, le comportement VWAP et les fonctions utilitaires, avec des données simulées couvrant des situations de carnet d'ordres plus réalistes.

## Configuration et compatibilité

![Nice Chart devient plus intelligent : VWAP, exécution sur carnet d'ordres et statistiques fiables de market-making](/images/engineering-notes/medium/734bc98b7051/004-1-4imanifwledhlg5xklk-ow-png.webp)

La configuration par défaut a été étendue avec de nouveaux paramètres d'exécution Nice Chart, ce qui facilite l'ajustement du comportement d'exécution sur carnet d'ordres sans modifier le code. La mise à jour est compatible avec les données d'ordres existantes — aucune migration de base de données n'est requise, et les nouveaux paramètres ont des valeurs par défaut pertinentes. L'exécution sur carnet d'ordres de Nice Chart peut également être désactivée ou annulée tout en maintenant le reste du système opérationnel.

## Ce que les opérateurs doivent surveiller

Après la mise à jour, les opérateurs doivent surveiller le comportement de l'écart VWAP (le nouveau seuil de 0,6 % peut affecter la logique d'appariement sur des écarts serrés ou instables), la fréquence d'exécution sur carnet d'ordres (la logique de routage et les plafonds de montant peuvent modifier la fréquence à laquelle les trades touchent la liquidité existante), l'attribution des remplissages (les remplissages tiers doivent être comparés avec les enregistrements de l'exchange) et les statistiques des traders (vérifier que le volume, les ordres récemment clôturés, les métriques par époque et les statistiques cumulées s'affichent correctement).
