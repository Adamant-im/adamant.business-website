---
title: "ADAMANT Node v0.10.2 : récupération plus sûre, API enrichies et requêtes plus rapides"
slug: "discussion-66-adamant-node-v0-10-2-safer-recovery-richer-apis-and-faster-queries-10442742"
description: "ADAMANT Node v0.10.2 améliore la disponibilité des nœuds, la récupération, la gestion des pannes de base de données, les API d'observation et les abonnements clients. Mise à jour recommandée mais non obligatoire."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/66"
publishedAt: "2026-07-16T18:19:41Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "ADM Nodes, Delegates & Pools"
cardSpan: "half"
originalId: "github-discussion:10442742"
locale: "fr"
placeholder: false
---

ADAMANT Node v0.10.2 se concentre sur la disponibilité des nœuds, une récupération plus rapide, une gestion plus sûre des pannes de base de données, des API d'observation enrichies et des abonnements clients plus efficaces. La mise à jour est recommandée mais pas obligatoire pour la compatibilité réseau : cette version ne contient aucun fork de consensus et ne modifie ni la sérialisation des blocs ou des transactions, ni les signatures, ni l'ordre des délégués, ni les récompenses, ni les frais, ni les hauteurs d'activation, ni le minutage des créneaux, ni la relecture déterministe.

## Récupération de la synchronisation

Auparavant, une erreur de rappel ou de base de données dans le pipeline de synchronisation pouvait laisser un nœud signaler de façon permanente qu'il était en cours de synchronisation sans aucune progression. Dans cet état, il rejetait les blocs en direct, ne relançait jamais une autre synchronisation et nécessitait un redémarrage manuel. La v0.10.2 introduit un watchdog basé sur la progression qui détecte une exécution de synchronisation n'ayant appliqué aucun nouveau bloc pendant cinq minutes. L'exécution bloquée est interrompue à l'aide d'un signal d'arrêt limité à l'exécution, aucune nouvelle mutation d'état ne peut démarrer après le signal d'interruption, et les travaux en cours sur les blocs et comptes se terminent avant que le chargeur ne libère son état de synchronisation. Les requêtes PostgreSQL rejetées se propagent désormais à travers la vérification des blocs, le chargement des blocs et les mises à jour des tables mémoire au démarrage, au lieu de mettre silencieusement en attente les chaînes de rappels. Il s'agit uniquement de modifications de disponibilité et de propagation des erreurs ; elles ne modifient pas quels blocs sont valides.

## Points de contrôle persistés

ADAMANT conserve l'état dérivé du consensus dans les tables `mem_*`. Si un processus est interrompu pendant la mise à jour de ces miroirs, le nœud doit les reconstruire à partir des blocs canoniques. La v0.10.2 ajoute trois emplacements de points de contrôle tournants pour l'état mémoire dérivé. Chaque point de contrôle enregistre la hauteur/l'identifiant du bloc, le tour, le nethash, la version du schéma, le statut et l'empreinte SHA-256 canonique. Au démarrage, seuls les points de contrôle dont les métadonnées, l'empreinte, la référence de chaîne, le réseau et les invariants d'état passent la validation sont acceptés. Un point de contrôle valide est restauré et seuls les blocs ultérieurs sont relus ; toute erreur de validation ou de relecture partielle déclenche une reconstruction déterministe complète existante. Les tables de jonction non confirmées ne sont pas mises en point de contrôle et sont reconstruites à partir de l'état confirmé. Les blocs canoniques et la relecture déterministe restent la source de vérité — un point de contrôle n'est qu'un cache de récupération local et ne peut pas redéfinir l'état de la chaîne.

## Améliorations de l'API REST

`GET /api/accounts/top` est désormais disponible de manière cohérente sur chaque nœud, offrant un tri déterministe `balance DESC, address ASC`, une pagination, un filtre `isDelegate`, des métadonnées de comptage et des requêtes de comptage seul avec `limit=0`.

Plusieurs bogues de l'API des délégués sont corrigés. `GET /api/delegates/get` indique à nouveau le rang/taux réel du délégué et la productivité correcte des externes. `GET /api/delegates/voters` ne peut plus perdre son filtre d'adresse et retourner tous les comptes. `GET /api/delegates/getNextForgers` utilise la hauteur du prochain bloc aux limites de tour et signale une erreur de chargement stable avant qu'une pointe de chaîne n'existe.

Les API de statut et de délégués exposent désormais le `consensusCodeName` actif, le calendrier d'activation effectif du consensus après les valeurs par défaut et les surcharges d'exécution, le calendrier complet des jalons de récompense de bloc, et le montant `forged` à vie de chaque délégué sous forme de chaîne d'entier en base 10. Cela réduit la dépendance à des calendriers codés en dur dupliqués et expose la configuration effective du nœud sans modifier le comportement du consensus.

`GET /api/blocks` honore désormais `numberOfTransactions=0`. Un nouvel index B-tree composite sur `(text_generatorPublicKey, height DESC)` évite le chemin coûteux de filtrage de table complète pour un générateur inconnu combiné au tri par défaut. Le contrat de réponse reste inchangé. Sur une grande base de données, les opérateurs doivent prévoir du temps et de l'espace disque pour la migration de l'index lors du premier démarrage.

## Événements Socket.IO pour les blocs et les soldes

Les services peuvent désormais s'abonner aux événements compacts `newBlock` et aux événements `balances/change` pour `balance`, `unconfirmedBalance` ou les deux. Le nœud maintient des index d'abonnement dédiés afin que les sockets non concernés ne soient pas parcourus. Les lectures de soldes sont regroupées autour de l'application et de l'annulation des blocs, et les échecs de publication d'événements sont isolés de la mutation d'état. Ces événements sont en mode best-effort et non durables ; les clients doivent restaurer leurs abonnements après reconnexion et utiliser la réconciliation REST pour l'état critique.

## Maintenance des dépendances et audit

Les dépendances d'exécution et de développement ont été mises à jour au sein de leurs versions majeures actuelles. La dépendance d'exécution `npm` directe inutilisée et son sous-arbre intégré ont été supprimés, et une surcharge Grunt/js-yaml compatible et restreinte a été ajoutée. La base de vérification d'audit est passée de 4 résultats modérés et 1 résultat élevé à zéro résultat modéré, élevé ou critique. Aucun comportement de protocole cryptographique, de signature, de mnémonique, de poignée de main entre pairs ou de validation de transaction n'a changé.

## Notes pour les opérateurs

Continuez à utiliser Node.js 22.13.0 ou une version plus récente. Sauvegardez la base de données selon la procédure habituelle, arrêtez le nœud proprement et attendez le message `Cleaned up successfully`. Laissez le premier démarrage de la v0.10.2 terminer les migrations et la création des points de contrôle et des index. Prévoyez de l'espace disque supplémentaire pour les trois emplacements tournants de points de contrôle d'état dérivé. Après le démarrage, vérifiez `/api/node/status`, la progression de la synchronisation, le traitement des blocs en direct et les capacités REST/Socket.IO utilisées par vos services.

## Références

- [GitHub Release v0.10.2](https://github.com/Adamant-im/adamant/releases/tag/v0.10.2)
- [Documentation ADAMANT Node](https://docs.adamant.im)
- [Schéma API ADAMANT](https://schema.adamant.im)
