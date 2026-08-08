---
title: "ADAMANT Notification Service v0.5.0 — Modernisation .NET 8, fiabilité et correctifs de confidentialité"
slug: "discussion-73-adamant-notification-service-v0-5-0-net-8-modernization-reliability-and-privacy-fixes-10570181"
description: "L'ADAMANT Notification Service (ANS) gère les notifications push Apple pour iOS sans qu'ANS ou Apple ne sachent qui communique avec qui. La version v0.5.0 est la première."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/73"
publishedAt: "2026-08-07T14:06:51Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10570181"
locale: "fr"
placeholder: false
---

[ADAMANT Notification Service (ANS)](https://github.com/Adamant-im/adamant-notificationService) gère les notifications push Apple pour l'application iOS ADAMANT sans qu'ANS ou Apple ne puissent jamais savoir qui communique avec qui. La version [v0.5.0](https://github.com/Adamant-im/adamant-notificationService/releases/tag/v0.5.0) est la première version taguée depuis la 0.4.1 en 2019.

Il ne s'agit pas d'une réécriture. L'ANS étant destiné à être remplacé à terme par [adamant-ns](https://github.com/Adamant-im/adamant-ns), l'objectif était limité : abandonner les dépendances en fin de vie et corriger les bugs provoquant des incidents en production, sans modifier l'architecture ni le modèle de confidentialité.

## Environnement d'exécution

Le service est passé de `netcoreapp3.0` (en fin de vie, non pris en charge depuis 2020) à **.NET 8 LTS** pour l'ensemble des projets. Cela permet un déploiement natif sur Ubuntu 22.04+ sans dépendre de conteneurs utilisant des bibliothèques obsolètes pour maintenir l'ancien environnement.

## Fuite de sockets

Le client API allouait un nouvel `HttpClient` par requête sans jamais le libérer. En production, cela se traduisait par une augmentation constante des sockets bloqués en état `CLOSE-WAIT` — confirmée à environ 30 descripteurs de fichiers par minute sur une instance en cours d'exécution. Au-delà d'un certain seuil, cela entraînait l'échec de la résolution DNS pour tout le processus. Il s'agit désormais d'un client unique, partagé et réutilisé.

## Basculement (Failover)

La sélection de nœuds choisissait auparavant un nœud configuré au hasard sans jamais effectuer de nouvelle tentative. Toute erreur sur ce nœud, même transitoire, faisait planter l'ensemble du service. Le système tente désormais de se connecter à un autre nœud avant d'abandonner, et une panne totale sur tous les nœuds configurés entraîne simplement le saut du cycle actuel au lieu de provoquer un plantage.

## Remplacement du fournisseur EF Core

Le plan initial était de conserver EF Core tel quel et de ne mettre à jour que le framework cible de l'application. Cela fonctionnait pour le cœur de l'ORM — EF Core 2.2 ciblant `netstandard2.0`, il compile toujours sous .NET 8 — mais le fournisseur MySQL (`MySql.Data.EntityFrameworkCore`) ne fonctionnait plus du tout : une `AmbiguousMatchException` survenait dès la première requête, détectée par un nouveau test de fumée basé sur SQLite avant d'atteindre la production. Il a été remplacé par `Pomelo.EntityFrameworkCore.MySql`, le fournisseur activement maintenu sur lequel s'est standardisé l'écosystème .NET.

## Correctifs de confidentialité

Trois instructions de journalisation (logs) enregistraient indûment des données sensibles : un jeton d'appareil à chaque notification réussie, une charge utile de signal *décryptée* (contenant le jeton d'appareil) en cas d'échec d'analyse, et le mot de passe d'un certificat APNs en cas d'échec de chargement. Ces trois points violaient les règles de confidentialité du projet et ont été supprimés.

## Autres correctifs en production

Suite à ces changements, d'autres problèmes ont été identifiés et corrigés en production : un bug d'expansion de chemin `~` pouvant empêcher les deux workers de démarrer sur un serveur sans interface graphique, un cas limite au démarrage pouvant entraîner l'envoi massif de notifications sur d'anciennes transactions après une instabilité réseau, un problème de sécurité des threads lors de la sélection de nœuds en utilisation concurrente, un délai d'attente HTTP manquant et une référence nulle sur une réponse APNs mal formée.

## Arrêt gracieux

Les workers ne prenaient pas en charge `SIGTERM` auparavant, si bien qu'un `docker stop` ou un `systemctl restart` habituel apparaissait toujours comme un plantage dans les logs. Ils s'arrêtent désormais proprement.

## Tests et suivi des versions

La couverture des tests est passée de quelques unités à 35 tests, incluant le test de fumée EF Core/SQLite mentionné plus haut. Les builds portent désormais un numéro de version réel — auparavant, chaque build était silencieusement étiqueté `1.0.0.0` indépendamment de ce qui était déclaré dans le fichier projet.

## Sécurité

Sécurité auditée par [cryptofoundry](https://adamant.business#contact).

## Liens

- [Notes de version](https://github.com/Adamant-im/adamant-notificationService/releases/tag/v0.5.0)
- [Diff complet, 0.4.1 → v0.5.0](https://github.com/Adamant-im/adamant-notificationService/compare/0.4.1...v0.5.0)
- [Ticket de suivi](https://github.com/Adamant-im/adamant-notificationService/issues/12)
- [Dépôt](https://github.com/Adamant-im/adamant-notificationService)
