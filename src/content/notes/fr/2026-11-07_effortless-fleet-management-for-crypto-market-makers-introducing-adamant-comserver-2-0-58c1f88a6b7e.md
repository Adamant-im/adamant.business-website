---
title: "ADAMANT ComServer 2.0 : Gestion de flotte pour les teneurs de marché crypto auto-hébergés"
slug: "effortless-fleet-management-for-crypto-market-makers-introducing-adamant-comserver-2-0-58c1f88a6b7e"
description: "ADAMANT ComServer 2.0 simplifie la gestion multi-échanges des bots de trading via un hub de commande unifié, sécurisé et performant pour les teneurs de marché."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/effortless-fleet-management-for-crypto-market-makers-introducing-adamant-comserver-2-0-58c1f88a6b7e"
publishedAt: "2026-11-07T10:12:13.811Z"
author: "ADAMANT Messenger"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:58c1f88a6b7e"
coverImage: "/images/engineering-notes/medium/58c1f88a6b7e/001-5aba38788d.webp"
locale: "fr"
placeholder: false
---

À mesure que les projets de jetons et les fournisseurs de liquidité se développent, le maintien de carnets d'ordres profonds, de spreads serrés et d'un volume de trading sain est rarement réalisable sur une seule plateforme d'échange centralisée. Une opération sérieuse de tenue de marché nécessite généralement plusieurs instances de bots réparties sur diverses plateformes. ADAMANT Trade Bot Communication Server (ComServer) v2.0.0 résout les difficultés opérationnelles liées à la gestion de cette flotte, en remplaçant les sessions SSH manuelles, l'inspection des journaux et les scripts ad hoc par un hub de commande unifié et authentifié.

## Orchestration à l'échelle de la flotte

ComServer est un démon de relais auto-hébergé qui connecte les bots de trading ADAMANT via un canal Socket.IO authentifié. Les opérateurs gèrent l'ensemble de leur flotte via un hub de communication unique plutôt que d'interagir avec chaque bot isolément.

Pour une vue d'ensemble rapide des soldes sur toutes les plateformes connectées, une seule commande suffit :

```
/remote balances all
```

ComServer achemine la requête vers un bot par compte d'échange, rassemble les réponses et renvoie un résumé des actifs trié de manière déterministe par échange et par priorité de devise de cotation.

Les ajustements de stratégie synchronisés sont tout aussi concis. La volatilité du marché ou les annonces majeures exigent souvent des changements de paramètres rapides sur chaque bot. Des commandes telles que `/remote make price 1.1 USDT in 5 days -all` coordonnent tous les bots vers un prix cible, `/remote enable pw 1.00–1.10 USDT -all` impose des corridors de spread plus étroits sur tous les carnets, et `/remote make volume +25% -all` ajuste la profondeur de liquidité à l'échelle de la flotte. Pour un contrôle chirurgical, les opérateurs peuvent cibler des bots spécifiques par identifiant unique ou par identifiant partiel non ambigu au lieu de diffuser la commande à tous.

## Nouveautés de la version 2.0.0

La version 2.0.0 a été entièrement réécrite en mettant l'accent sur la sécurité du transport, la résilience opérationnelle et le minimalisme logiciel.

### Sécurité du transport

Comme ComServer relaie des commandes opérationnelles sensibles (passation d'ordres, interrogation de soldes), la sécurité du transport est critique. Le protocole réseau utilise désormais le chiffrement authentifié **AES-256-GCM**, remplaçant l'ancien mode AES-256-CTR. Chaque trame est chiffrée avec un nonce éphémère de 96 bits et validée contre les attaques par altération, falsification et inversion de bits.

Les clés de communication sont dérivées dynamiquement de la `SECRET_KEY` partagée via HKDF, garantissant une séparation stricte des rôles entre le serveur et le bot. Des données authentifiées supplémentaires (AAD) lient cryptographiquement l'identité de l'expéditeur, le rôle et les horodatages en millisecondes à chaque charge utile, empêchant les réflexions de trames entre bots. Un `ReplayCache` à haut débit et compartimenté suit les nonces à usage unique jusqu'à une capacité de 100 000 trames ; si le cache atteint sa capacité sous attaque, il rejette en toute sécurité les nouvelles trames plutôt que d'évincer les anciennes, éliminant ainsi toute fenêtre de rejeu. L'authentification du client est vérifiée dans le middleware Socket.IO avant l'admission au socket ; les poignées de main non autorisées ou mal formées sont terminées avant qu'une connexion socket ne soit établie.

### Réduction des dépendances

L'arborescence des dépendances a été radicalement simplifiée. Le nombre total de paquets est passé de 615 à 141, éliminant 32 avis de sécurité historiques — dont 2 critiques et 19 vulnérabilités élevées — pour atteindre zéro.

### Ingénierie et opérations

L'environnement d'exécution cible Node.js 22.13+ avec des modules ES natifs purs, l'injection de dépendances et aucune donnée globale. Lorsqu'un bot actif se reconnecte après une interruption réseau, ComServer supprime immédiatement les sockets zombies persistants afin que les commandes ne soient jamais acheminées vers des connexions mortes. Les files d'attente de commandes en attente sont limitées à 1 000 requêtes simultanées pour éviter l'épuisement de la mémoire sous charge. La gestion du cycle de vie PM2 est préconfigurée via `ecosystem.config.cjs` pour une gestion fluide des signaux (SIGINT, SIGTERM) avec un nettoyage propre des temporisateurs de commande. La base de code comprend 182 tests couvrant les étapes unitaires, d'intégration et de cycle de vie des processus, utilisant le test runner de Node.js avec JSDoc vérifié par TypeScript.

## Souveraineté auto-hébergée

Le logiciel de tenue de marché ADAMANT et ComServer fonctionnent entièrement sur le matériel de l'opérateur ou sur son cloud privé. Aucune donnée de trading, clé secrète ou instruction opérationnelle ne transite par un serveur tiers. ComServer offre le contrôle de flotte unifié d'un bureau de trading institutionnel tout en préservant le modèle de sécurité du logiciel open-source auto-hébergé : vos clés, vos jetons, votre infrastructure.

ADAMANT ComServer v2.0.0 est disponible pour les utilisateurs exécutant la version premium de ADAMANT Trade Bot.
