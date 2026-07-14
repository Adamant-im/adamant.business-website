---
title: "Proposition : API HTTP tierce optionnelle pour TradeBot"
slug: "discussion-48-proposal-optional-third-party-http-api-for-tradebot-webui-and-similar-clients-10255629"
description: "Cette proposition présente une API Bot v1 optionnelle, permettant à des clients externes — comme une interface Web graphique — de surveiller et contrôler un bot de trading sans dépendre d'ADAMANT Messenger ou de Telegram."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/48"
publishedAt: "2026-06-14T12:09:43Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10255629"
locale: "fr"
placeholder: false
---

Cette proposition présente une API Bot v1 optionnelle, permettant à des clients externes — tels qu'une interface Web graphique — de surveiller et de contrôler un bot de trading sans dépendre d'ADAMANT Messenger ou de Telegram. Dans cette architecture, l'interface Web communique exclusivement avec l'API du bot, garantissant que le bot reste la source unique et fiable des données de marché (cours, carnet d'ordres, transactions, OHLC), de l'état du compte, des paramètres de trading et de l'exécution des commandes.

L'API vise à fournir une interface HTTP entrante et WebSocket optionnelle sur le bot, utilisant un port `private_webui` dans la configuration. L'authentification sera gérée via JWT, vérifié sur le bot à l'aide d'une `private_webui_secret_key`, tandis que les comptes utilisateurs seront gérés par le client externe. L'API exposera des points de terminaison JSON structurés pour les données de marché, de compte et de paramètres, ainsi que des wrappers de commandes. Un point de terminaison `GET /bot` servira de démarrage, renvoyant les fonctionnalités disponibles telles que les modules `mm_*.js` installés et les indicateurs de fonctionnalités des exchanges. Pour les modifications en temps réel des paramètres de trading, un événement WebSocket `params:updated` sera disponible. Les modes de transport supporteront initialement `directHttp` pour les clients auto-hébergés, avec un support prévu ultérieurement pour `relayWs` destiné à l'hébergement par abonnement.

Cette discussion exclut les interfaces liées aux paiements, à la facturation ou aux licences, ainsi que les détails spécifiques de mise en œuvre de l'interface Web. La communauté est invitée à donner son avis sur la question de savoir si cette API devrait être intégrée au dépôt open source `adamant-tradebot` en tant que module optionnel, quels points de terminaison sont nécessaires pour un client minimal mais utile en complément des commandes messenger, et si un système de sondage (polling) ou de notification push est préféré pour les données de marché et de compte dans la version v1. Un ticket de suivi sera ouvert dans `adamant-tradebot` en référence à cette discussion. Une implémentation de référence premium est actuellement en cours de développement sur la branche `refactor/new-webui-api` du dépôt `adamant-tradebot-me`.
