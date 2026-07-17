---
title: "ADAMANT Node v0.10.2 : Récupération de la synchronisation, points de contrôle vérifiés et améliorations de l'API"
slug: "a-stronger-foundation-for-decentralized-communication-769bb1723e89"
description: "ADAMANT Node v0.10.2 améliore la récupération de la synchronisation, introduit des points de contrôle vérifiés pour l'état dérivé, étend les capacités REST et Socket.IO, corrige plusieurs cas limites de l'API…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/a-stronger-foundation-for-decentralized-communication-769bb1723e89"
publishedAt: "2026-07-16T18:30:13.394Z"
author: "Alex Web3"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:769bb1723e89"
coverImage: "/images/engineering-notes/medium/769bb1723e89/001-23318e9ae1.webp"
locale: "fr"
placeholder: false
---

## Aperçu

ADAMANT Node v0.10.2 améliore la récupération de la synchronisation, introduit des points de contrôle vérifiés pour l'état dérivé, étend les capacités REST et Socket.IO, corrige plusieurs cas limites de l'API, optimise les requêtes de base de données et met à jour les dépendances. Cette version préserve le comportement existant du protocole et n'introduit pas de fork de consensus.

Le journal des modifications complet est disponible sur [GitHub](https://github.com/Adamant-im/adamant/releases/tag/v0.10.2).

## Récupération de la synchronisation

Un réseau décentralisé repose sur des opérateurs indépendants exécutant des nœuds dans des conditions variées. Si le logiciel du nœud nécessite une intervention constante ou une récupération de niveau expert, la participation devient plus difficile et le réseau devient moins décentralisé en pratique.

Auparavant, un rappel interrompu ou une erreur de base de données dans le pipeline de synchronisation pouvait laisser un nœud croire qu'il était encore en cours de synchronisation alors que la hauteur de ses blocs avait cessé de progresser. Le nœud restait bloqué jusqu'à ce qu'un opérateur s'en aperçoive et le redémarre.

La version v0.10.2 ajoute un watchdog de synchronisation basé sur la progression qui distingue un nœud lent appliquant encore des blocs d'une exécution de synchronisation véritablement bloquée. Si aucune progression de la hauteur de bloc n'est effectuée pendant la fenêtre configurée, le nœud interrompt en toute sécurité cette exécution, purge toute mutation d'état en cours et permet à la synchronisation de redémarrer. Cette version corrige également les chemins de rejet de la base de données qui pouvaient laisser silencieusement les rappels de traitement de bloc inachevés.

Il ne s'agit pas d'un changement de consensus. Cela ne décide pas quels blocs sont valides ; cela aide un nœud à revenir à un fonctionnement normal lorsque le pipeline d'exécution environnant se bloque.

## Points de contrôle vérifiés pour l'état dérivé

Les nœuds ADAMANT maintiennent des tables dérivées `mem_*` pour les soldes, les délégués, les rounds et l'état associé. La blockchain reste canonique, mais reconstruire tout l'état dérivé après un arrêt interrompu peut prendre longtemps sur une chaîne mature.

La version v0.10.2 introduit des points de contrôle tournants et persistés pour cet état dérivé. Chaque point de contrôle est lié à un bloc et un réseau connus, porte un résumé canonique et est validé avant utilisation. Lorsqu'un nœud démarre avec des miroirs mémoire incohérents, il peut restaurer le dernier point de contrôle vérifié et rejouer uniquement les blocs qui ont suivi.

Le modèle de sécurité est conservateur. Un point de contrôle n'est accepté qu'après vérification de ses métadonnées, de son résumé, de sa référence de chaîne, de son réseau et de ses invariants d'état. L'état non confirmé est reconstruit plutôt que de faire confiance à un point de contrôle. Si une étape de validation ou de rejeu partiel échoue, le nœud revient à la reconstruction déterministe complète existante. Les blocs canoniques et le rejeu déterministe restent la source de vérité, de sorte que le point de contrôle constitue un chemin de récupération plus rapide plutôt qu'un état de protocole.

## Améliorations de l'API REST

ADAMANT est une couche de confiance décentralisée pour les produits de communication, pas seulement une base de données blockchain. La version v0.10.2 ajoute un endpoint top-accounts cohérent avec un ordre déterministe, une pagination, un filtrage par délégué et des requêtes de comptage uniquement, éliminant ainsi les contournements spécifiques aux nœuds pour les explorateurs et les outils d'analyse.

Cette version expose également le nom de code de consensus actif du nœud, le calendrier d'activation effectif, le calendrier complet des jalons de récompense et le montant total forgé à vie de chaque délégué. Les systèmes de surveillance et les explorateurs peuvent désormais lire les calendriers effectifs directement depuis un nœud au lieu de dupliquer la configuration dans chaque client.

Plusieurs API de délégués existantes sont plus précises. Les réponses pour un délégué unique rapportent à nouveau le rang réel et le contexte de productivité. Les requêtes de votants de délégués ne risquent plus de retourner des comptes non liés lorsqu'un filtre de liste d'adresses est utilisé. Les projections du prochain forgeur utilisent désormais la bonne hauteur du prochain bloc aux limites de round.

L'API des blocs a reçu une correction de justesse et de performance : elle gère désormais correctement `numberOfTransactions=0`, et un nouvel index composite de base de données empêche un balayage coûteux lors de la requête d'un générateur inconnu avec l'ordre de hauteur par défaut.

## Événements en direct Socket.IO

Les applications nécessitant des mises à jour en temps opportun peuvent désormais opter pour deux nouvelles familles d'événements client Socket.IO : les notifications compactes `newBlock` et les notifications `balances/change` pour le solde confirmé, le solde non confirmé, ou les deux.

Le nœud maintient des index de souscription dédiés et regroupe les lectures de comptes affectés autour de l'application et du rollback de bloc, de sorte qu'il ne scanne pas chaque client connecté ni n'effectue de requêtes de compte inutiles lorsque personne n'est abonné aux données modifiées.

Ces événements sont au mieux effort et non durables. Les applications doivent restaurer leurs souscriptions après reconnexion et continuer à reconcilier l'état critique via REST. Les événements en direct réduisent le polling mais ne remplacent pas la vérification.

## Ligne de base des dépendances

Cette version met à jour les dépendances dans leurs versions majeures existantes, supprime une dépendance d'exécution npm directe inutilisée et son grand sous-arbre intégré, et applique un remplacement de compatibilité étroit pour une dépendance transitive de la chaîne d'outils. La ligne de base vérifiée de l'audit npm est passée de quatre résultats modérés et un résultat élevé à zéro résultat modéré, élevé ou critique.

Aucun protocole cryptographique, signature, mnémonique, poignée de main entre pairs ou comportement de validation de transaction n'a été modifié dans le cadre de cette maintenance.

## Notes de mise à jour

La mise à jour vers la version v0.10.2 n'est **pas obligatoire** pour la compatibilité réseau. Cette version ne modifie pas la sérialisation des blocs ou des transactions, les signatures, l'ordre des délégués, les récompenses, les frais, les hauteurs d'activation, le timing des slots ni le rejeu déterministe. Les nœuds compatibles existants peuvent continuer à participer. cryptofoundry recommande la mise à jour aux opérateurs qui souhaitent une meilleure récupération de la synchronisation, une restauration plus rapide après des arrêts interrompus, une maintenance de sécurité, des performances de requête améliorées et les nouvelles capacités de l'API.

ADAMANT Node continue de nécessiter Node.js 22.13.0 ou une version plus récente. Le premier démarrage après la mise à niveau applique de nouvelles migrations de base de données. Les opérateurs doivent suivre leur procédure de sauvegarde habituelle, arrêter le nœud gracieusement, attendre `Cleaned up successfully`, et allouer suffisamment de temps et d'espace disque pour la création des tables de points de contrôle et des nouveaux index. Après le démarrage, vérifiez l'état du nœud, la progression de la synchronisation, le traitement en direct des blocs et toutes les capacités REST ou Socket.IO utilisées par les services connectés.

Des ressources supplémentaires sont disponibles dans la [documentation ADAMANT Node](https://docs.adamant.im), le [schéma de l'API ADAMANT](https://schema.adamant.im) et la [discussion technique de la version](https://github.com/orgs/Adamant-im/discussions/66).
