---
title: "Scénario A-3 : Tableau de bord opérateur, événements de sécurité et perfectionnement de la flotte dans l'interface Web privée"
slug: "discussion-77-progress-scenario-a-3-operator-dashboard-safety-events-config-and-fleet-polish-in-the-priv-10761303"
description: "Mise à jour du scénario A (interface Web privée auto-hébergée, transport directHttp) pour l'ADAMANT TradeBot. L'interface Web ne se connecte jamais aux échanges."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/77"
publishedAt: "2026-09-06T18:53:34Z"
author: "massivedev0"
authorUrl: "https://github.com/massivedev0"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10761303"
locale: "fr"
placeholder: false
---

Ceci est une mise à jour sur l'avancement du scénario A (interface Web privée auto-hébergée, transport `directHttp`) pour l'ADAMANT TradeBot. L'interface Web ne se connecte jamais aux échanges ; toutes les données relatives au marché, au compte et aux paramètres proviennent de l'API `/api/v1` du bot.

Le tableau de bord par bot est désormais la vue principale après la sélection d'un onglet de bot. Il fournit un aperçu de la paire, de l'échange et de l'état du market-making via `GET /api/v1/status`, ainsi que le prix et le volume sur 24 heures. Un badge d'édition de fonctionnalité est dérivé des capacités installées du bot plutôt que des modules actifs. Le tableau de bord inclut un graphique de prix compact avec une bougie en formation, une grille de modules codée par couleur, un résumé des paramètres de trading et des soldes structurés avec les ordres ouverts. Le démarrage du MM n'envoie plus de remplacement de stratégie, permettant au bot de conserver sa politique actuelle.

![Tableau de bord opérateur : état du MM, édition de fonctionnalité, grille de modules, résumé des paramètres et graphique compact](/images/engineering-notes/github/discussions/10761303/001-32674fae63.webp)

Les vues de marché ont été perfectionnées, incluant des bougies en formation sur le graphique OHLC, des marqueurs d'ordres du bot sur le carnet d'ordres et des superpositions d'ordres ouverts. Les actions d'annulation envoient `{ id, market, side }`, et les ordres déjà disparus sont traités comme un succès pour l'opérateur.

![Onglet Marché : ordres ouverts, carnet d'ordres avec spread, formulaires d'achat/vente, soldes](/images/engineering-notes/github/discussions/10761303/002-47dd4a54b7.webp)

La vue Paramètres inclut désormais une bande de situation en direct sur 12 heures montrant le mix d'inventaire en USD et le notionnel des ordres ouverts par objectif dans le fuseau horaire de l'opérateur. Les cadres horaires de l'historique de santé local indiquent les heures dégradées ou arrêtées. Lorsque le bot arrête automatiquement le MM ou met en pause une échelle pour des raisons de sécurité, l'interface Web affiche une boîte de dialogue basée sur le texte de notification du bot et reflète l'état d'urgence.

![Paramètres : interrupteur principal MM, situation en direct 12h, groupes de liquidité et de surveillance des prix](/images/engineering-notes/github/discussions/10761303/003-bfb5b261fd.webp)

Un tableau des événements fournit un journal d'audit des changements de paramètres avec des instantanés de solde au moment du changement, des badges de sécurité et une action de reprise de l'échelle directement depuis les lignes d'événements de sécurité.

![Événements : piste d'audit des paramètres avec arrêt automatique de sécurité et contexte de solde](/images/engineering-notes/github/discussions/10761303/004-241365a624.webp)

La vue de configuration administrateur affiche la santé à l'exécution, les métadonnées de la paire et une arborescence des paramètres de trading en direct à hauteur égale. Elle propose des onglets de résumé `config.json` assaini et de JSON brut sans exposer les secrets.

![Configuration : santé à l'exécution, métadonnées de la paire, arborescence des paramètres de trading en direct, résumé de la configuration](/images/engineering-notes/github/discussions/10761303/005-271ca78365.webp)

Les améliorations du shell de flotte incluent des champs de registre modifiables pour l'étiquette (Label) et le compte, avec des onglets d'en-tête affichant ces informations. Les volets « keep-alive » survivent désormais aux changements d'onglet de bot, lisant un instantané Redux figé au lieu de se réduire à un état vide.

Cet incrément fait passer l'interface Web d'une interface de type messagerie à un tableau de bord persistant avec des graphiques, des modules et des paramètres. Les événements de sécurité incluent désormais un contexte de solde et des actions de reprise, remplaçant les conjectures précédentes sur les raisons de l'arrêt du MM. Les onglets multi-bots avec volets « keep-alive » et une vue d'ensemble de la flotte évitent la perte de contexte lors du changement de bot. La vue de configuration administrateur expose la santé à l'exécution et un instantané de configuration assaini. Les points de qualité MM (`working`, `degraded`, `stopped`) sont dérivés de `/status` avec une période de grâce de 10 minutes après le démarrage. Le système reste entièrement auto-hébergé : l'interface Web se situe derrière un proxy inverse, les bots fonctionnent sur l'infrastructure de l'opérateur, aucune clé API d'échange n'est stockée dans l'interface Web et la 2FA est obligatoire.

La pile se compose de l'interface Web v0.2.0 construite avec Vite, React 18, Chakra UI, Fastify BFF et un journal d'événements SQLite. Le bot expose des points de terminaison tels que `GET /api/v1/bot`, `/status`, `/params` et `/account/*`, ainsi qu'un WebSocket `params:updated`. Le transport est limité à `DirectHttpTransport`. Le scénario A d'auto-hébergement privé est complet pour le périmètre MVP. Les travaux futurs se concentreront sur le scénario B, une interface Web d'abonnement public via un relais sortant et un jeton de licence.
