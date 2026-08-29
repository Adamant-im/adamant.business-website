---
title: "WebUI privée : console de gestion auto-hébergée pour le logiciel de market-making ADAMANT"
slug: "discussion-75-scenario-a-private-webui-self-hosted-fleet-console-live-situation-and-mm-health-10709518"
description: "Mise à jour sur le scénario A de la WebUI privée auto-hébergée : une console opérateur unique pour une flotte d'instances du logiciel de market-making ADAMANT."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/75"
publishedAt: "2026-08-29T09:35:34Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10709518"
locale: "fr"
placeholder: false
---

## Contexte

Ceci est une mise à jour sur le **Scénario A** de la WebUI privée auto-hébergée : une console opérateur unique pour une flotte d'instances du logiciel de market-making ADAMANT. Le Scénario B (WebUI par abonnement public, relais sortant, jeton de licence) n'est pas traité ici.

Une règle architecturale clé pour les opérateurs : le navigateur et le backend de la WebUI ne communiquent jamais directement avec les échanges. Les graphiques, carnets d'ordres, soldes, paramètres et commandes transitent tous par le `/api/v1` de chaque bot. Les clés API des échanges restent sur le bot.

## Ce que vous pouvez exécuter aujourd'hui

Un processus WebUI local (Vite UI + Fastify BFF) se connecte à un ou plusieurs bots exécutés avec `private_webui` activé et un secret HMAC partagé. Vous ajoutez chaque bot par son URL. La WebUI stocke le registre de la flotte, contrairement au bot. Les comptes opérateurs, la 2FA et les rôles résident sur la WebUI, tandis que le bot se contente de vérifier un JWT signé contenant `{ login, role }`.

![Connexion WebUI](/images/engineering-notes/github/discussions/10709518/001-65a9054569.webp)

*Connexion. Les identifiants de l'opérateur résident sur la WebUI (e-mail / ADM / ETH + 2FA obligatoire). Chaque bot vérifie uniquement le JWT signé — il n'y a pas de point de terminaison de connexion sur le bot.*

## Onglets de flotte et bureau de marché

Les onglets de l'en-tête représentent chacun un bot. Les points de statut proviennent du point de terminaison `GET /api/v1/status` authentifié par JWT, signalant `working`, `degraded` ou `stopped` — et non de la sonde de disponibilité publique. Le point de terminaison public `GET /api/v1/health` renvoie uniquement `{ status, transport }` afin qu'une adresse de liaison accessible ne divulgue pas d'informations sur la qualité du MM.

La vue **Marché** fournit des bougies avec les ordres du bot en superposition, un carnet d'ordres en temps réel avec le spread, la plage et le volume sur 24h, l'inventaire de la paire en coin et en USD, ainsi que le placement manuel d'ordres limités. Cliquer sur une ligne du carnet remplit le côté, le prix et le montant. L'annulation envoie `{ id, market, side }` et supprime la ligne lorsque l'échange considère déjà l'ordre comme disparu.

![Bureau de marché](/images/engineering-notes/github/discussions/10709518/002-04f3b72fdc.webp)

*Marché. Bougies, carnet d'ordres, inventaire en USD et placement d'ordre pour `PENGUIN/USDT` sur BiFinance — un onglet au sein d'une flotte multi-bot.*

## Paramètres et situation en direct

**Paramètres** expose le formulaire complet `WebUiTradeParams` : un interrupteur MM maître ainsi que des groupes qui suivent les `capabilities` du bot (les modules `trade/mm_*.js` manquants restent verrouillés). La liquidité, le suivi des prix, les échelles, le volume trader, les indices analogiques et d'autres paramètres sont modifiés via `PUT /params` et mis à jour en direct via Socket.IO avec `params:updated`.

**Situation en direct** affiche une bande de 12 heures dans le navigateur : inventaire (base + quote USD) et notionnel des ordres ouverts par objectif. Les barres se remplissent tant que le bot reste connecté. Les cadres horaires jaunes indiquent que l'heure était `degraded` ; le gris signifie que le MM était `stopped`. Le cadre épouse la barre plutôt que la hauteur totale du graphique.

Sur le bot, la qualité du MM est échantillonnée en dehors de `trade/mm_*.js`. L'appel à `/start` (ou PUT MM on) marque des valeurs égales pour `mm_generalInitTs` et `mm_generalRestartTs`. Un redémarrage du processus alors que le MM est déjà actif conserve l'init mais incrémente le redémarrage, ce qui permet de distinguer un démarrage propre d'un redémarrage après crash.

![Paramètres et situation en direct](/images/engineering-notes/github/discussions/10709518/003-5723175f10.webp)

*Paramètres. Interrupteur MM maître, situation en direct sur 12 heures (inventaire et ordres ouverts en $), liquidité, suivi des prix et échelles — les groupes sont verrouillés lorsque le module n'est pas présent dans cette version du bot.*

## Commandes et piste d'audit

**Commandes** enveloppe les mêmes gestionnaires que le messenger et la CLI : fill, close, make-price, TWAP, transfer, withdraw et requêtes. Les POST destructeurs nécessitent une confirmation. La console de droite affiche le flux markdown du bot (soldes, annulations, réinitialisations d'époque).

**Événements** est le journal d'audit de la WebUI stocké dans SQLite, enregistrant qui a modifié quoi (`admin@…` vs `bot`), couvrant à la fois les paramètres et les commandes, avec recherche, filtrage et exportation JSON.

![Console de commandes](/images/engineering-notes/github/discussions/10709518/004-2adccfacb9.webp)

*Commandes. Formulaires fill / close / make-price et console en direct — même ensemble de commandes que ADAMANT Messenger et la CLI, structuré pour un bureau.*

![Audit des événements](/images/engineering-notes/github/discussions/10709518/005-9665688ad1.webp)

*Événements. Bascules de paramètres et charges utiles de commandes horodatées, attribuées à l'opérateur ou au bot.*

## Notes de contrat pour les opérateurs

Le point de terminaison `GET /health` ne nécessite aucun JWT et renvoie uniquement `{ status, transport }`, toujours lié à `private_webui_bind_host` et à la liste d'autorisation. Le `GET /status` authentifié par JWT renvoie `mmActive`, `mmState`, des horodatages optionnels d'init et de redémarrage, une période de grâce et les raisons de la dégradation. `GET /params` fournit un instantané complet ; `PUT /params` n'applique que les tranches modifiées afin que les modules non liés ne soient pas réactivés. `POST /commands/cancel` accepte un champ optionnel `side` (`buy` ou `sell`). Concernant les rôles, un JWT en `read-only` ne peut pas écrire, tandis que les jetons sans champ `role` conservent l'accès complet hérité. Les anciens bots sans `/status` apparaissent toujours dans la flotte — la WebUI revient alors à une charge utile `/health` complète.
