---
title: "ADAMANT IPFS Node v0.1.0 : Stockage borné, GC conscient du cycle de vie et réplication déterministe"
slug: "discussion-74-adamant-ipfs-node-v0-1-0-bounded-storage-lifecycle-aware-gc-and-deterministic-replication-10693309"
description: "ADAMANT IPFS Node v0.1.0 introduit un cycle de vie de stockage orienté production qui limite la croissance du disque, nettoie les échecs et distingue le contenu durable du cache."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/74"
publishedAt: "2026-08-26T19:14:25Z"
author: "massivedev0"
authorUrl: "https://github.com/massivedev0"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10693309"
locale: "fr"
placeholder: false
---

ADAMANT IPFS Node v0.1.0 introduit un cycle de vie de stockage orienté production qui limite la croissance du disque, nettoie les téléchargements échoués, distingue le contenu durable du cache récupérable, place les réplicas de manière déterministe sur l'ensemble des nœuds ADAMANT, répare les copies manquantes et préserve chaque CID préexistant lors d'une mise à niveau.

## Pourquoi cela était nécessaire

L'implémentation précédente pouvait diffuser des blocs dans le blockstore avant que toutes les limites de requête ne soient connues. Un téléchargement interrompu ou rejeté pouvait laisser des blocs orphelins, les téléchargements réussis restaient épinglés sans politique d'expiration, et il n'existait aucun quorum de réplication explicite ni processus de réparation. Il était donc impossible de déterminer de manière fiable l'espace disque consommé par un téléchargement, quels fichiers sont durables ou récupérables, ce qui se passe en cas de déconnexion lors d'un import, quels nœuds sont responsables d'un CID, si un nœud peut récupérer de l'espace sans supprimer de contenu confirmé, et si les fichiers existants restent disponibles après une mise à niveau du cluster.

## L'admission précède le stockage

Les téléchargements sont rejetés avant de pouvoir consommer un espace disque illimité. Les téléchargements simultanés sont limités par `storage.maxConcurrentUploads` (réponse `429`). La taille globale des requêtes est plafonnée par `storage.maxRequestSizeBytes` (`413`), appliquée à la fois au `Content-Length` et aux octets réellement diffusés, car les requêtes fragmentées ne déclarent pas leur taille finale. Une réserve de disque appliquée par `storage.diskReserveBytes` renvoie `507` lorsque l'espace libre est insuffisant. Les fichiers par requête sont limités par `maxFileCount` (`400`), et la taille individuelle des fichiers par `uploadLimitSizeBytes` (`400`). Les requêtes simultanées réservent le disque de manière atomique, empêchant plusieurs téléchargements de puiser dans la même marge d'espace libre.

Chaque requête possède une session de téléchargement qui suit les blocs créés. Un rejet par l'analyseur, un échec d'importation, une erreur de routage, un échec de quorum strict ou une déconnexion du client ne supprime que ces nouveaux blocs. Les blocs préexistants, ceux conservés par un autre téléchargement simultané et les blocs épinglés sont préservés.

## Cycle de vie explicite des fichiers

Un registre basé sur une base de données sous `/adm/files` enregistre le cycle de vie et la comptabilité de stockage de chaque CID connu. L'état `temporary` représente un téléchargement en attente de confirmation ou de règlement transactionnel. `confirmed` représente le contenu durable protégé par une politique. `expired` représente le contenu libéré pouvant être récupéré sous pression. `pinned` et `heldLocally` sont suivis séparément de l'état logique.

Les transitions de cycle de vie, les opérations d'épinglage, les écritures dans le registre, le nettoyage des téléchargements, le règlement des réplicas, la réparation et le ramasse-miettes (garbage collection) sont coordonnés avec des verrous par CID et un bail de collecte à l'échelle du stockage. La compensation des échecs restaure à la fois l'épinglage et l'enregistrement du registre à leur état initial au lieu de les laisser dans des états contradictoires.

La valeur par défaut `storage.confirmationRequired: false` conserve le contrat API existant où les téléchargements deviennent immédiatement durables. Les déploiements activant la confirmation bénéficient d'un TTL configurable pour les téléchargements abandonnés et doivent appeler le point de terminaison de confirmation authentifié.

## Ramasse-miettes (GC) piloté par la pression et conscient du cycle de vie

La libération d'une épingle et la suppression de blocs sont des décisions intentionnellement distinctes. Un fichier libéré reste dans le blockstore et peut continuer à servir des lectures gratuitement. Les blocs ne sont supprimés que lorsque le blockstore dépasse le seuil haut configuré ou que le système de fichiers tombe dans la réserve de disque. Cela évite de rejeter un cache utile pour devoir le récupérer ultérieurement.

Le collecteur possède plusieurs propriétés de sécurité. Le contenu confirmé détenu par ce nœud n'est jamais sélectionné pour l'éviction. Une protection manquante sur un fichier confirmé est réparée avant toute suppression. Une exécution qui ne peut pas vérifier le contenu durable s'arrête avant sa première action destructive. Les échecs partiels de GC conservent les enregistrements du registre afin que le prochain passage puisse réessayer en toute sécurité. Le mode "dry-run" rapporte le plan exact de libération et de rétention sans modifier les épingles ou les blocs. Les balayages planifiés sont bornés et progressent au lieu de scanner répétitivement tout le registre.

Les valeurs par défaut documentées sont un seuil haut de 50 Gio, un seuil bas de 40 Gio, une réserve d'espace libre de 5 Gio et un passage planifié toutes les 15 minutes. Toutes les valeurs sont configurables. Le GC planifié est activé par défaut mais n'effectue aucune suppression tant que l'espace reste au-dessus des seuils de sécurité. Les opérateurs peuvent inspecter le plan avec :

bash
curl --fail-with-body \
  -X POST \
  -H "x-api-key: $ADMIN_API_KEY" \
  "https://ipfs.example.org/api/storage/gc?dryRun=true"

## Réplication sur le réseau libp2p existant

La réplication s'exécute sur `/adamant/replication/1.0.0`, et non sur un service HTTP supplémentaire. La poignée de main libp2p prouve l'identité du pair distant, donc la réplication ne nécessite aucun secret d'API partagé, aucun second port public ou démon de cluster séparé. Les opérations qui rendent ce nœud responsable du contenu ne sont acceptées que de la part des pairs listés dans `nodes`. Les messages de contrôle sont encadrés en longueur et bornés. Les transactions de réplicas enregistrent leur pair d'origine, et seul ce pair peut les régler.

Les détenteurs sont sélectionnés par hachage "rendezvous" sur le CID. Chaque nœud possédant la même liste de membres calcule indépendamment le même ensemble de détenteurs sans coordinateur central. La politique de placement par défaut conserve quatre copies pour le contenu récent, trois copies après 180 jours et deux copies après un an. Le nombre est plafonné par la taille réelle du réseau ; ainsi, un réseau de trois nœuds sollicité pour quatre copies place une copie sur chaque nœud disponible. Le placement diminue selon l'âge du fichier plutôt que selon la date du dernier accès, car le suivi des lectures créerait des métadonnées sur le moment où les utilisateurs récupèrent les fichiers.

La durabilité stricte des téléchargements est optionnelle. Lorsque `replication.requireQuorumOnUpload` est activé, l'admission locale et les réplicas distants forment une transaction capable de retour en arrière : les pairs préparent les copies, l'origine vérifie le quorum d'accusé de réception configuré, puis valide ou annule chaque réplica préparé. Une configuration stricte nécessite `ackQuorum >= 2`, garantissant que le succès prouve au moins une copie distante.

## Réparation, transfert et récupération

Le travail de réparation demande à un pair s'il possède déjà un CID et s'il dispose d'espace avant de transférer les données. L'admission est limitée par la concurrence, la taille de la requête, la réservation de disque, le délai d'attente et le budget par pair. Un nœud en dehors de l'ensemble des détenteurs actuels transmet sa copie durable aux détenteurs désignés et libère sa propre épingle seulement après que ces détenteurs ont confirmé posséder le fichier. Si tous les détenteurs distants disparaissent alors que les blocs sont encore locaux, le nœud reprend la responsabilité au lieu de laisser disparaître la dernière copie récupérable.

Les lectures utilisent également les informations de placement. Avant de servir un CID, un nœud se connecte directement aux pairs censés le détenir plutôt que de compter sur un pair Bitswap déjà connecté. Le peering périodique maintient le maillage configuré disponible après le démarrage. C'est important pour ADAMANT Messenger : un expéditeur et un récepteur utilisent normalement des nœuds d'infrastructure différents, donc la première lecture du récepteur atterrit généralement sur un nœud qui n'est pas un détenteur désigné.

## Préservation des fichiers et CID existants

La mise à niveau ne réimporte, ne réécrit et ne renomme pas le contenu stocké. La génération de CID reste compatible avec la pile précédente, de sorte que les liens de messages existants continuent d'adresser les mêmes fichiers. Au démarrage, les épingles antérieures au registre de cycle de vie sont remplies en tant qu'enregistrements confirmés. Leurs tailles DAG sont mesurées hors ligne, et le contenu incomplet est signalé plutôt que silencieusement enregistré comme durable. L'API peut démarrer pendant que le remplissage se poursuit en arrière-plan.

Une implication sur la capacité est importante : le temps de téléchargement initial d'une épingle héritée ne peut pas être récupéré, donc les fichiers remplis sont initialement traités comme frais et entrent dans le niveau de placement le plus large. Les opérateurs doivent planifier la capacité du cluster pour le corpus existant, et non seulement pour les futurs téléchargements. Les processus de réparation traitent ce corpus par lots bornés et progressifs plutôt que de tenter de tout répliquer en un seul passage.

Seul `/adamant/replication/1.0.0` est actuellement proposé, cette version est donc destinée à une mise à niveau coordonnée à l'échelle du cluster. `GET /api/storage/metrics` expose la version active du protocole, rendant un déploiement mixte visible.

## Visibilité opérationnelle et limites d'accès

Les routes publiques en lecture seule exposent la capacité et l'état du cycle de vie sans noms de fichiers, inventaires de CID ou topologie de pairs : `GET /api/file/:cid/status`, `GET /api/storage/metrics` et `GET /api/storage/policy`. Les mutations administratives telles que la confirmation, la libération, le GC à la demande, la réparation, la gestion des épingles et les opérations de topologie libp2p nécessitent la clé `x-api-key` configurée.

Le rapport de stockage inclut les octets épinglés et récupérables, la disponibilité du système de fichiers, la capacité réservée et utilisable, les comptes de cycle de vie, les transactions de réplicas en attente, l'état des travaux et la santé de la réplication. Il fournit suffisamment d'informations pour valider une mise à niveau et surveiller les passages ultérieurs de collecte et de réparation sans exposer de détails opérationnels privés.

## Valeurs par défaut que les opérateurs doivent examiner

Les valeurs par défaut conviennent à un volume de stockage dédié et préservent le comportement actuel de téléchargement immédiat. La taille globale des téléchargements est par défaut de 512 Mio, les téléchargements simultanés à 32, la réserve de disque à 5 Gio, le TTL temporaire à 24 heures, le planning de GC à 15 minutes, le planning de réparation à 30 minutes et le placement initial à 4 copies. Le quorum d'accusé de réception de téléchargement est par défaut à 1 (réplication au mieux), et le quorum strict est désactivé. Chaque opérateur doit examiner la capacité, les seuils, les listes de membres et les niveaux de placement avant le déploiement.

## Vérification

L'implémentation fusionnée a passé 232 tests unitaires, 102 tests d'intégration, la construction TypeScript de production, les vérifications ESLint et Prettier, un audit des dépendances de production, ainsi que des scans Semgrep SAST et Semgrep OSS. Elle a également été testée sur un réseau de quatre nœuds : seize fichiers ont été placés sur trois détenteurs lorsqu'ils étaient frais, ont convergé vers exactement deux détenteurs après avoir vieilli dans le niveau suivant, puis ont été lus octet par octet de manière identique depuis les quatre nœuds sur 64 lectures croisées réussies. Aucune nouvelle dépendance d'exécution n'a été introduite.

## Travaux de suivi délibérés

Cette version établit un stockage borné et une durabilité de nœud à nœud, mais ne prétend pas résoudre tous les problèmes de propriété ou d'appartenance au réseau. Le ticket #27 suit la suppression autorisée par la signature de l'expéditeur original. Le ticket #28 suit la découverte décentralisée des nœuds et la résistance aux attaques Sybil. Le ticket #29 suit la comptabilité du trafic, le backoff et les limites mensuelles. Le chiffrement du contenu reste la responsabilité du protocole client ADAMANT ; le nœud de stockage gère le contenu chiffré par CID et n'a pas besoin d'accès en texte clair.
