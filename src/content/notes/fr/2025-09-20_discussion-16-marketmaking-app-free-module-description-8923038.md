---
title: "MarketMaking.App : description du module gratuit"
slug: "discussion-16-marketmaking-app-free-module-description-8923038"
description: "MarketMaking.App : description du module gratuit. Édition open source adaptée aux petits projets cryptographiques à faible liquidité, échangés sur des plateformes centralisées."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/16"
publishedAt: "2025-09-20T14:33:55Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:8923038"
locale: "fr"
placeholder: false
---

# MarketMaking.App : description du module gratuit

L\'édition gratuite et open source du bot de market making ADAMANT convient aux petits projets cryptographiques à faible liquidité, échangés sur les exchanges centralisés de la liste prise en charge. Le code source est disponible sur [GitHub](https://github.com/Adamant-im/adamant-tradebot).

## Module d\'exécution manuelle d\'ordres

Ce module permet à l\'opérateur de placer des ordres d\'achat et de vente spécifiques. Un ordre unique au marché ou à cours limité peut être placé avec les commandes `/buy` ou `/sell`, tandis que plusieurs ordres à cours limité peuvent être placés simultanément avec `/fill`. La commande `/fill` peut également remplir instantanément tout le carnet d\'ordres avec des ordres imbriqués d\'achats et de ventes afin de répondre aux exigences de cotation de l\'exchange. Il fonctionne avec n\'importe quelle paire de trading sur l\'exchange et est utile pour convertir des fonds, acheter ou vendre des actifs, ou effectuer un remplissage initial du carnet d\'ordres avant de démarrer le market making automatisé.

## Module de création de volume de trading

Ce module simule une activité et un volume sur une paire de trading en utilisant des échanges internes. Il prend en charge trois politiques : basée sur l\'écart, où les échanges ont lieu dans un écart d\'achat/vente défini ; basée sur le carnet d\'ordres, qui imite l\'activité en fonction de la forme du carnet d\'ordres existant ; et optimale, qui choisit dynamiquement des points de prix pour des échanges réalistes. Cela est utile pour amorcer de nouveaux marchés, améliorer l\'apparence de la cotation et satisfaire aux exigences de volume des exchanges.

## Générateur de carnet d\'ordres dynamique de type réel

Ce module construit un carnet d\'ordres réaliste et humain pour simuler une activité de marché organique. Il gère le placement et la suppression dynamiques d\'ordres sur les niveaux de prix visibles, avec des tailles d\'ordres, des intervalles et des pas de prix randomisés afin d\'éviter la détection. Un réarrangement périodique reflète un comportement réaliste des traders, créant un environnement de marché vivant et plus attractif pour les traders externes.

## Maintien de l\'écart et de la liquidité

Ce module maintient un écart de trading sain et des niveaux minimaux de liquidité afin d\'assurer des marchés serrés et une bonne stabilité de la paire. Il surveille constamment les meilleurs niveaux d\'achat et de vente, plaçant automatiquement de la liquidité dans un seuil d\'écart en pourcentage configurable, jusqu\'à des montants maximaux définis. Il garantit une liquidité minimale des deux côtés du carnet et se met à jour automatiquement lorsque les ordres sont exécutés ou que le marché bouge.

## Observateur de marché et suivi de plage

Ce module surveille les principales métriques de prix et les références externes afin de guider le comportement du bot ou déclencher des commandes. La surveillance de plage de prix limite les échanges à une plage de prix statique définie, minimale et maximale. La surveillance inter-exchanges synchronise les prix ou réagit aux mouvements sur un autre exchange pris en charge. Ces fonctions aident les opérateurs à éviter les zones de prix volatiles, à réagir aux changements du marché externe ou à aligner le mouvement des prix sur un autre exchange.

## Inspecteur d\'état du bot et de la paire de trading

Ce module fournit une vision en temps réel de l\'état actuel du bot et des informations pertinentes sur la paire de trading. Les opérateurs peuvent visualiser les soldes disponibles pour les actifs de base et de cotation avec `/balances`, lister les ordres limites actifs avec `/orders`, et afficher l\'activité de market making, le volume généré et la largeur de l\'écart avec `/stats`. Les métadonnées de la paire et des actifs, telles que la taille minimale de transaction, la taille de tick et les frais, peuvent être récupérées avec `/info` ou `/pair`, et les adresses de dépôt des actifs peuvent être obtenues avec `/deposit`. Cela aide les opérateurs à surveiller en temps réel la santé du bot et les conditions du marché, valider la configuration et suivre la performance ou l\'état des fonds.

Certaines fonctionnalités ont des options limitées dans la version basique du bot. Des paramètres plus avancés sont disponibles dans la version premium.
