---
title: "ADAMANT IPFS Node v0.1.0 : un maillage de distribution de fichiers auto-hébergé"
slug: "adamant-ipfs-node-v0-1-0-a-file-delivery-mesh-you-can-run-yourself-f2d20fc9af5a"
description: "ADAMANT IPFS Node v0.1.0 est la première version taguée et l'image conteneur publiée du service de distribution de fichiers auto-hébergé d'ADAMANT."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-ipfs-node-v0-1-0-a-file-delivery-mesh-you-can-run-yourself-f2d20fc9af5a"
publishedAt: "2026-09-30T18:36:13.519Z"
author: "ADAMANT Messenger"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:f2d20fc9af5a"
coverImage: "/images/engineering-notes/medium/f2d20fc9af5a/001-275d9701d0.webp"
locale: "fr"
placeholder: false
---

ADAMANT IPFS Node v0.1.0 est la première version taguée et l'image conteneur publiée du service de distribution de fichiers auto-hébergé d'ADAMANT. Elle regroupe dans une application Node.js unique l'adressage par contenu, une API REST, une distribution pair-à-pair contrôlée, des politiques de stockage, la réplication, la réparation et des points de contrôle de santé. ADAMANT Messenger utilise déjà cette infrastructure pour ses pièces jointes ; cette version facilite son évaluation, son déploiement et son adaptation par d'autres développeurs.

## Fichiers appartenant à l'application

L'intégration repose sur deux actions : le téléchargement d'un fichier via `POST /api/file/upload`, puis sa récupération via `GET /api/file/:cid`. L'identifiant de contenu (CID) renvoyé est dérivé du contenu lui-même plutôt que de l'adresse du serveur. Ainsi, une application peut transmettre cet identifiant à un destinataire sans avoir à décider quelle machine doit servir le fichier. Un nœud peut diffuser sa copie locale ou récupérer le contenu auprès de pairs configurés censés le détenir.

Cette approche est adaptée aux pièces jointes de messagerie, aux médias d'application immuables et aux services dont les clients échangent déjà des identifiants de contenu. Dans ADAMANT Messenger, le client télécharge une pièce jointe chiffrée, transporte son CID dans un message, et le destinataire le récupère via son propre nœud. Le chiffrement relève du protocole client ; le service de stockage ne traite que les octets qu'il reçoit.

## Un maillage avec des règles d'exploitation explicites

Le nœud est construit directement avec Helia et libp2p. Il exécute une pile IPFS intégrée parallèlement à son API HTTP, utilisant le transport TCP, le chiffrement Noise pour les connexions entre pairs et le multiplexage de flux Yamux.

Les opérateurs configurent l'ensemble des pairs. Le hachage de rendez-vous classe les détenteurs pour chaque CID, de sorte que les nœuds ayant la même appartenance dérivent la même stratégie de placement. Des niveaux basés sur l'ancienneté permettent à un déploiement de réduire le nombre cible de copies à mesure qu'un fichier vieillit. Un cycle de réparation reprenable vérifie l'absence de copies et tente de restaurer le placement prévu lorsque le contenu reste récupérable. Cela combine le placement et la réparation avec le service qui reçoit et distribue les fichiers, éliminant le besoin d'un service d'orchestration de « pin » séparé lors de la construction autour d'un ensemble de nœuds connus et mutuellement configurés.

![ADAMANT IPFS Node v0.1.0 : un maillage de distribution de fichiers que vous pouvez exécuter vous-même](/images/engineering-notes/medium/f2d20fc9af5a/002-1f2c5c003f.webp)

Le cycle de vie de la v0.1.0 en un coup d'œil : ingestion, placement déterministe, réparation et récupération, avec des limites de stockage et un suivi de santé constant.

## Les disques finis méritent une politique réelle

Les contrôles de stockage font partie du chemin d'ingestion. Les réservations de disque, les limites de requêtes globales, les limites de fichiers et l'admission des transferts simultanés aident le nœud à refuser le travail qu'il ne peut pas accepter en toute sécurité. Les téléchargements temporaires optionnels peuvent expirer après un TTL ; le ramasse-miettes (garbage collection) utilise des filigranes et le registre de cycle de vie pour récupérer les données éligibles.

Le contenu confirmé reste protégé. Lorsque les fichiers confirmés occupent la capacité disponible, les limites d'admission deviennent cruciales : un stockage limité ne signifie pas supprimer silencieusement des fichiers que la politique doit maintenir durables. Les opérateurs choisissent la politique de rétention et de réplication, provisionnent la capacité et surveillent les résultats. Le comportement du stockage peut être inspecté et configuré, y compris ce qui se passe lorsqu'un déploiement manque d'espace.

## Fiabilité au-delà d'une connexion ouverte

La version inclut des correctifs pour une défaillance subtile du maillage : une connexion TCP peut rester active alors que les flux d'application cessent de fonctionner. La logique de peering précédente pouvait voir un pair connecté et laisser une session bloquée intacte. La PR #40 ajoute des vérifications de vivacité et une récupération de session réactive. La PR #42 renforce encore ce chemin : les opérations de récupération simultanées sont fusionnées, les flux défaillants peuvent déclencher une réinitialisation sans être annulés par un ping réussi, et le placement peut réessayer une fois sur une nouvelle connexion.

Le rapport d'état suit le même principe. `GET /api/node/health` expose les états de démarrage, prêt, obsolète ou dégradé, ainsi qu'une hauteur de point de contrôle persistante et des informations d'appartenance. La hauteur progresse lorsque les vérifications requises réussissent et se fige lorsqu'elles échouent ; les hauteurs ne sont comparables qu'au sein de la même version d'appartenance. Les opérateurs doivent lire cet état, et ne pas se fier uniquement au code HTTP 200. Une tolérance optionnelle pour le backlog de réparation peut accepter un nombre configuré de cycles de réparation infructueux, tandis que le backlog et les résultats des cycles restent visibles pour la surveillance. La valeur par défaut n'accorde aucune tolérance.

## Intégration client Bureau et Tor

La v0.1.0 inclut des travaux sur le CORS permettant aux opérateurs d'autoriser explicitement l'origine bureau `app://.` et les origines onion appropriées, y compris l'origine nulle opaque que certaines requêtes Tor Browser envoient. Les échecs de téléchargement et d'admission incluent désormais des codes d'erreur stables lisibles par machine, permettant aux clients de distinguer la limitation de débit, les limites de concurrence, le stockage insuffisant, les échecs de quorum de réplication et les délais d'attente sans avoir à analyser du texte. Le CORS reste un contrôle de compatibilité du navigateur ; les déploiements nécessitent toujours la politique d'autorisation et d'exposition appropriée à leur application.

## Déploiement

Le conteneur public est disponible pour linux/amd64 et linux/arm64 :

```
docker pull ghcr.io/adamant-im/ipfs-node:0.1.0
```

L'image s'exécute en tant qu'utilisateur non privilégié et comporte un SBOM ainsi qu'une attestation de provenance de construction. La configuration est montée séparément sur `/app/config.json5`. Un volume `/data` unique contient le magasin de blocs, le magasin de données, l'identité du pair, l'ensemble de « pins », le registre de cycle de vie, le curseur de réparation et le point de contrôle de santé, conservant l'état persistant lors du remplacement du conteneur. Le pipeline de version re-télécharge et teste les deux architectures, vérifiant le démarrage, la disponibilité, le téléchargement, l'arrêt propre et la préservation du contenu et de l'identité du pair après remplacement.

Pour l'évaluation, commencez avec `docker/config.example.json5`, qui ne rejoint aucun réseau. Le modèle de production contient la liste des pairs d'ADAMANT ; votre propre déploiement doit définir ses propres pairs et origines de navigateur. Gardez le service HTTP derrière un proxy inverse HTTPS correctement configuré.

## Limites architecturales

La topologie configurée évite les annonces DHT publiques et le routage via des passerelles publiques, réduisant l'exposition publique des métadonnées de routage de contenu. Cela ne rend pas un déploiement anonyme ou confidentiel par lui-même. Le service ne chiffre pas les fichiers stockés ; les téléchargements et envois ne sont pas authentifiés par conception. Les applications nécessitant une confidentialité ou un accès authentifié doivent fournir ces contrôles au-dessus de la couche de stockage.

Il n'y a pas d'interopérabilité IPFS publique, d'IPNS, de passerelle publique ou d'API compatible Kubo dans cette version. Le contenu stocké ici n'est pas annoncé sur le réseau public, et le contenu détenu uniquement par des pairs publics ne peut pas être récupéré via ce nœud. La suppression signée par l'expéditeur, la découverte dynamique des pairs et la comptabilité du trafic restent des travaux en cours.

Pour un ensemble de pairs connu et une distribution d'application adressée par contenu, ces choix forment un modèle d'exploitation ciblé. Pour une participation à l'IPFS public, une flotte dynamique ou des contrôles d'identité et d'accès de type S3, consultez le guide de comparaison avant de choisir une architecture de stockage.
