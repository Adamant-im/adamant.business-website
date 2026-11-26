---
title: "ADAMANT Node v0.11.1 : renforcement de la sécurité, forge chiffrée et documentation consolidée"
slug: "discussion-84-adamant-node-v0-11-1-security-hardening-encrypted-forging-and-consolidated-docs-11400159"
description: "ADAMANT Node v0.11.1 est une mise à jour majeure de sécurité et de fiabilité pour les opérateurs de nœuds, délégués, pools, explorateurs et services communiquant avec ADAMANT."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/84"
publishedAt: "2026-11-25T19:56:21Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "ADM Nodes, Delegates & Pools"
cardSpan: "half"
originalId: "github-discussion:11400159"
locale: "fr"
placeholder: false
---

ADAMANT Node v0.11.1 est une mise à jour majeure axée sur la sécurité et la fiabilité pour les opérateurs de nœuds, les délégués, les opérateurs de pools, les explorateurs, les services de messagerie et autres services communiquant avec les nœuds ADAMANT. Il s'agit de la première version taguée de la branche v0.11 ; la version v0.11.0 ayant été fusionnée dans `master` sans être taguée, les opérateurs utilisant la branche `master` doivent également effectuer la mise à jour.

Une mise à jour est fortement recommandée. Il n'y a pas de fork de consensus ni de nouvelle migration SQL : la sérialisation, les signatures, l'ordre des délégués, les récompenses, les frais, les hauteurs d'activation et la synchronisation des slots restent identiques à ceux de la version v0.10.2. Cependant, en raison de changements majeurs dans l'API HTTP et des exigences d'exécution, les opérateurs doivent lire le guide de mise à jour avant de procéder.

## Avant de procéder à la mise à jour

Node.js 22.22.2+ (sur la branche 22.x) ou 24.15.0+ est désormais requis. Les anciennes API de forge et de contrôle d'exécution des DApps ont été entièrement supprimées (GHSA-vjhq-r5fg-85cx). La forge est désormais configurée via `forging.secret` dans `config.json` ; les API DApp en lecture seule et les types de transactions DApp ne sont pas affectés. Les filtres sur les états, les chats et les salons de discussion sont désormais stricts : les filtres `and:` fonctionnent comme prévu, tandis que les paramètres `or:`, mal orthographiés ou non pris en charge sont rejetés au lieu d'être ignorés silencieusement. Le paramètre `keysIds` a été renommé `keyIds`. Les limites de débit (rate limits) sont activées par défaut ; les anciens blocs de limite `max: 0` dans `config.json` maintiennent la limitation désactivée, il convient donc de les supprimer pour adopter les nouvelles valeurs par défaut.

## Sécurité et renforcement

La surface d'exécution des DApps côté serveur et le contrôle de forge HTTP ont été entièrement supprimés plutôt que corrigés, ce qui réduit considérablement la surface d'attaque.

Les phrases secrètes des délégués dans `forging.secret` peuvent désormais être chiffrées avec un mot de passe opérateur utilisant AES-256-GCM avec dérivation de clé scrypt. Le nœud continue de se synchroniser et de servir les API lorsqu'il est verrouillé, et la forge est déverrouillée localement via l'interface CLI `adm-node`. Les configurations en texte clair restent fonctionnelles. Des modèles Zabbix pour l'état de verrouillage et le résultat du délégué sont inclus.

Des limites de débit anti-abus ont été ajoutées pour le trafic REST public, HTTP entre pairs et WebSocket, avec une réponse cohérente `429`. Pendant la période de déploiement des versions mixtes, les requêtes `/peer/*` sans le nouvel en-tête de limite de débit ne sont pas restreintes, et tout appelant peut l'omettre. Les opérateurs doivent ajouter une limite pour `/peer/*` au niveau de leur proxy inverse ou pare-feu jusqu'à ce que l'application au sein du nœud soit suivie et implémentée.

Les scripts d'installation et de réparation sont plus sécurisés : les sommes de contrôle des snapshots sont vérifiées, les paramètres d'arrêt de PM2 et systemd sont gérés proprement, et un nœud en cours de synchronisation n'est redémarré que si cela est forcé. Les dépendances sont actualisées avec une quarantaine de 7 jours appliquée en CI, sans aucune découverte d'audit de niveau modéré ou supérieur.

## Fiabilité et réseau

Le nœud récupère désormais les connexions PostgreSQL après un redémarrage de la base de données au lieu de rester bloqué. Les vérifications de santé des pairs et les tailles de réponse sont limitées, avec un mécanisme de backoff et d'éviction pour les pairs inaccessibles. Les connexions WebSocket sortantes sont corrigées, tant pour la rotation des pairs que pour la régression de la v0.11.0 où aucune connexion sortante n'était établie. Le règlement des tours est limité par la hauteur, et le rollback des récompenses est aligné par délégué ; la relecture et la récupération ont produit un état identique sur le mainnet et le testnet. Un problème de rollback distinct reste ouvert. Une requête de garde de point de contrôle mémoire plus rapide et des pairs de démarrage (seed peers) mis à jour complètent le travail de fiabilité.

## API et documentation

Les filtres `and:` respectent désormais correctement `toHeight` et les conditions combinées expéditeur/destinataire. La documentation et la spécification OpenAPI 3.2 se trouvent désormais dans le dépôt du nœud, de sorte que le code, le schéma et la documentation évoluent ensemble. Le schéma de l'API est publié sur https://docs.adamant.im/schema/. Les mainteneurs de clients API et d'outils doivent désormais utiliser les sources OpenAPI du répertoire `openapi/` dans le dépôt du nœud.

## Comment effectuer la mise à jour

Mettez à jour Node.js vers une version prise en charge, puis arrêtez le nœud proprement et attendez le message `Cleaned up successfully` — n'utilisez jamais `kill -9`. Récupérez la version v0.11.1 et exécutez `npm ci --omit=dev`. Vérifiez `config.json` pour les blocs de limite de débit, `trustProxy` et toute automatisation appelant des points de terminaison supprimés. Démarrez le nœud ; avec des phrases secrètes chiffrées, exécutez `npm run adm-node -- forging unlock` après chaque redémarrage. Vérifiez `/api/node/status`, la progression de la synchronisation, les connexions aux pairs et l'état de la forge.

Avant la publication, la version v0.11.0 a fonctionné sur un nœud du mainnet avec quatre délégués et des phrases secrètes chiffrées pendant plus de 16 heures : 471 blocs forgés, aucun manqué après le redémarrage. Le seul problème spécifique à la version identifié — la régression des WebSocket sortants — est corrigé dans la v0.11.1.
