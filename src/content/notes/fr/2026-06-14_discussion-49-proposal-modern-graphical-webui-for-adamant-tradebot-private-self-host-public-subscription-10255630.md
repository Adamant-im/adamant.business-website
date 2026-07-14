---
title: "Proposition : Une interface WebUI graphique moderne pour ADAMANT TradeBot"
slug: "discussion-49-proposal-modern-graphical-webui-for-adamant-tradebot-private-self-host-public-subscription-10255630"
description: "L'interface WebUI actuelle est basée sur du texte. Cette proposition décrit une nouvelle interface graphique avec tableaux, carnets d'ordres, soldes, formulaires, et plus."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/49"
publishedAt: "2026-06-14T12:09:51Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10255630"
locale: "fr"
placeholder: false
---

## Contexte

L'expérience actuelle de l'interface WebUI est principalement textuelle, reposant sur des réponses de commandes au format messagerie. Cette proposition décrit une interface graphique moderne incluant des graphiques, des carnets d'ordres, des soldes, des ordres ouverts, des formulaires de paramètres de trading, et des panneaux de contrôle prenant en compte les modules. Une règle architecturale essentielle est que l'interface WebUI ne se connecte jamais directement aux exchanges ; toutes les données doivent provenir de l'API du bot.

## Modèles de déploiement

Deux modèles de déploiement sont proposés. Le premier est une interface WebUI privée auto-hébergée, offerte en achat unique. Dans ce modèle, l'opérateur exécute l'interface WebUI derrière HTTPS via un proxy inverse. L'interface WebUI gère un registre de bots, utilisant une `private_webui_secret_key` partagée pour signer des jetons web JSON (JWT) après la connexion de l'opérateur, incluant les utilisateurs locaux et l'authentification à deux facteurs. Le serveur WebUI communique avec chaque bot via des requêtes HTTP directes vers les points de terminaison `/api/v1/*`, permettant à une seule adresse WebUI de gérer plusieurs bots via des onglets.

Le second modèle est une interface WebUI publique par abonnement. Les utilisateurs s'authentifient via un service externe de paiement et d'authentification, puis insèrent un jeton de licence dans la configuration de leur bot. Le bot établit une connexion sortante vers un relais public, éliminant ainsi le besoin d'un port entrant sur le bot. Les requêtes du navigateur passent par l'interface WebUI publique et le relais pour atteindre le bot via un tunnel API point à point. La portée de la licence est limitée à un exchange et une paire par licence.

## Périmètre du produit minimum viable (MVP)

Le produit minimum viable privilégie le scénario d'auto-hébergement privé. Il implique la création d'une nouvelle pile technologique utilisant Vite et React 18, sans prise en charge de l'ancienne interface WebUI. L'implémentation inclut une couche d'abstraction de transport, démarrant avec `DirectHttpTransport` puis suivie par `RelayWsTransport`. L'interface utilisateur s'initialise via une requête `GET /bot`, où les fonctionnalités du bot déterminent les blocs d'interface visibles. Les paramètres sont gérés via des événements WebSocket `params:updated` en complément de REST. Les données de marché et de compte s'appuient sur un sondage REST avec un intervalle initial d'environ 10 secondes, avec pour objectif ultérieur d'envoyer les données depuis le cache du bot.

## Non-objectifs

Cette discussion exclut explicitement les détails de mise en œuvre des paiements et de la facturation, ainsi que la conception de l'API du bot, traitée dans une autre discussion. Un ticket de suivi sera ouvert dans le dépôt `adamant-tradebot-webui` en référence à cette proposition.
