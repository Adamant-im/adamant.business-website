---
title: "ADAMANT IPFS Node v0.1.0 : Stockage borné et réplication déterministe"
slug: "discussion-80-adamant-ipfs-node-v0-1-0-released-from-master-bounded-storage-deterministic-replication-an-10920610"
description: "La première version taguée d'ADAMANT IPFS Node est disponible en v0.1.0, avec une image conteneur sur ghcr.io/adamant-im/ipfs-node:0.1.0."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/80"
publishedAt: "2026-09-30T11:31:18Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10920610"
locale: "fr"
placeholder: false
---

La première version taguée d'ADAMANT IPFS Node est désormais disponible sous le numéro v0.1.0, avec l'image conteneur située à l'adresse `ghcr.io/adamant-im/ipfs-node:0.1.0`. Cette application autonome basée sur Node.js et Helia sert de nœud de stockage IPFS pour la distribution de fichiers applicatifs. Il ne s'agit pas d'un wrapper Kubo et l'application n'expose aucune API compatible avec Kubo. Bien qu'ADAMANT Messenger constitue le déploiement de référence, n'importe quelle application peut héberger son propre nœud.

Le runtime du service expose une API Express via douze chemins documentés, incluant la santé, les détails administratifs, le téléchargement multipart, le téléchargement par CID et les métriques de stockage. Les classes d'accès sont appliquées de manière centralisée, la clé d'administration est sécurisée par défaut (fail-closed) et le CORS repose sur une liste d'autorisation explicite. Le cycle de vie du stockage comprend un registre de fichiers adossé à une base de données avec une machine à états durable, une réserve disque, un budget d'admission, des téléchargements temporaires avec TTL et un ramasse-miettes (garbage collection) piloté par filigranes. Le placement utilise un hachage de rendez-vous déterministe sur l'ensemble des pairs configurés, avec un nombre de copies diminuant selon l'ancienneté du fichier. La réplication s'exécute via des protocoles versionnés avec des phases de préparation, de validation et de restauration. Chaque session de téléchargement suit les blocs créés, garantissant que les requêtes rejetées ou abandonnées suppriment précisément ces blocs.

Les points de contrôle de santé sont conscients du réseau avec une hauteur monotone persistée et une époque d'appartenance explicite, n'acceptant que les attestations provenant de pairs configurés. Les améliorations de la fiabilité du maillage incluent des vérifications de vivacité libp2p périodiques avec réinitialisation de session en cas d'échec, et une récupération réactive après des erreurs de flux de réplication obsolètes. Les mises à jour du CORS et des codes d'erreur introduisent une origine de bureau `app://.` exacte sur option, des valeurs `code` lisibles par machine et des caractères génériques `http(s)://*.onion` limités aux formes de services cachés v3 pour la compatibilité avec Tor Browser.

Le conteneur est construit sur `node:24.13.0-bookworm-slim` en utilisant un Dockerfile multi-étapes. Il s'exécute en tant qu'utilisateur `node` sans privilèges avec `HOME=/data`, permettant à un seul volume de contenir le blockstore, le datastore, l'identité des pairs, les épingles (pins), le registre, le curseur de réparation et le point de contrôle de santé. L'image est fournie sans configuration ; les opérateurs doivent en monter une dans `/app/config.json5`. Elle est publiée pour `linux/amd64` et `linux/arm64` avec SBOM et attestation de provenance.

Le nœud évite explicitement le DHT, l'IPNS, les passerelles publiques et les API Kubo. Le contenu stocké n'est pas annoncé sur le réseau IPFS public, et le contenu du réseau public ne peut pas être récupéré via ce nœud. Une topologie de pairs contrôlée réduit l'exposition publique des métadonnées de routage de contenu, mais ne rend pas intrinsèquement un déploiement privé, anonyme, sans confiance ou résistant à la censure. Le téléchargement et l'envoi ne sont pas authentifiés par conception, avec une seule clé administrative comme unique identifiant. Les travaux en cours incluent la suppression signée par l'expéditeur, la découverte de pairs, la comptabilité du trafic, le répertoire de données absolu et l'interopérabilité avec le réseau public.

Pour exécuter le nœud, créez un volume de données et démarrez le conteneur avec la configuration et les mappages de ports appropriés :

```bash
docker volume create ipfs-node-data

docker run -d \
  --name ipfs-node \
  --restart unless-stopped \
  --stop-timeout 20 \
  -v ipfs-node-data:/data \
  -v "$PWD/config.json5:/app/config.json5:ro" \
  -p 127.0.0.1:4000:4000 \
  -p 4001:4001 \
  ghcr.io/adamant-im/ipfs-node:0.1.0
```

La version a été vérifiée via CI, des audits de sécurité et des tests de fumée (smoke tests) de conteneur sur les deux architectures. Le flux de travail de publication confirme que le tag est un ancêtre de `master`, correspond à la version `package.json` et reconstruit avec des étiquettes OCI, SBOM et provenance avant un second test de fumée.
