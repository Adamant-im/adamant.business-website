---
title: "Stockage des transactions ETH 2.5.0 : l'historique d'adresses que vous hébergez vous-même"
slug: "eth-transactions-storage-2-5-0-address-history-you-host-yourself-b957c243edf3"
description: "Les clients d'exécution Ethereum ne peuvent pas répondre à la question essentielle de tout portefeuille : quelles transactions impliquent cette adresse, de la plus récente à la plus ancienne ?"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/eth-transactions-storage-2-5-0-address-history-you-host-yourself-b957c243edf3"
publishedAt: "2026-09-05T14:44:58.348Z"
author: "massivedev0 (Theo Bitner)"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:b957c243edf3"
coverImage: "/images/engineering-notes/medium/b957c243edf3/001-a6ae0683b6.webp"
locale: "fr"
placeholder: false
---

Les clients d'exécution Ethereum peuvent vous indiquer la tête de chaîne, un bloc, un reçu ou un journal, mais ils ne peuvent pas répondre à la question que tout écran de portefeuille pose à son ouverture : quelles transactions impliquent cette adresse, de la plus récente à la plus ancienne ? Les indexeurs publics y répondent, mais ils voient également chaque adresse que vos utilisateurs consultent, limitent votre débit en cas de trafic important, et peuvent modifier leurs tarifs ou disparaître. Si l'historique des transactions fait partie de votre produit, cette dépendance constitue un point critique.

ETH Transactions Storage est un indexeur auto-hébergé qui lit les blocs depuis votre nœud Ethereum, écrit les transferts ETH natifs et les appels de transfert ERC-20 dans votre base de données PostgreSQL, et fournit l'historique des adresses via une API REST en lecture seule. Il n'y a aucune télémétrie, aucun compte tiers, et seulement deux connexions sortantes : le nœud et la base de données que vous configurez. L'architecture est simple : nœud Ethereum → ethsync.py → PostgreSQL → PostgREST → votre application. Il fonctionne avec Geth, Nethermind, Besu et Erigon via HTTP, WebSocket ou IPC, ainsi qu'avec les réseaux compatibles EVM exposant la même interface JSON-RPC.

La version 2.5.0 transforme cette idée en un outil distribuable, exploitable et documenté. Le contrat d'API utilisé en production reste identique, mais le logiciel qui l'entoure est nouveau. Cette version introduit une synchronisation fiable, un ensemble d'index recommandé plus restreint, un filtrage d'adresses optionnel, un modèle de sécurité documenté, une image conteneurisée publiée et un site de documentation.

### Synchronisation fiable et filtrage d'adresses

Chaque bloc est écrit avec son point de contrôle dans une transaction de base de données unique. Les redémarrages reprennent exactement là où ils s'étaient arrêtés. Au démarrage, l'indexeur supprime le bloc le plus élevé et revient en arrière d'une étape, garantissant qu'un bloc partiellement écrit ne puisse survivre à un plantage. Les blocs vides et filtrés ne trompent plus le curseur ; une ligne `sync_state` dédiée enregistre la dernière hauteur traitée, même lorsque cette hauteur ne contenait aucune ligne. Les erreurs de base de données déclenchent une annulation et une nouvelle tentative au lieu de laisser le point de contrôle en avance sur les données.

L'historique complet de la chaîne est le choix par défaut approprié pour une API de portefeuille public, mais pas pour un outil de gestion de trésorerie ou de support où l'ensemble des adresses est connu à l'avance. La version 2.5.0 ajoute un filtre d'adresses optionnel. Lorsqu'il est chargé, l'indexeur ne stocke un transfert que si l'expéditeur, le destinataire natif ou le destinataire du jeton correspond. La liste est rechargée pendant l'exécution du processus. La validation est stricte et sécurisée par défaut : si la liste ne peut être lue, l'indexation ne se poursuit pas avec un filtre vide. Notez que l'activation du filtre ou l'ajout d'une adresse ne remplit pas les blocs antérieurs ; planifiez donc l'historique nécessaire avant de commencer.

### Indexation optimisée et sécurité

L'ensemble de base de données recommandé comprend désormais cinq index B-tree, dérivés du trafic de requêtes réel en production plutôt que de l'indexation de chaque colonne potentiellement utile. Sur un ensemble de données d'environ 490 millions de lignes, cet ensemble réduit permet une économie estimée de 90 à 110 Go. L'utilisation de `citext` sur les champs d'adresse permet une correspondance insensible à la casse sans envelopper chaque requête dans `LOWER()`.

L'utilisateur de l'indexeur effectue des écritures, mais l'API publique ne doit pas le faire. Cette version documente et fournit un rôle `web_anon` avec un accès SELECT uniquement sur `ethtxs`, `aval` et `max_block`. PostgREST est limité à 10 000 lignes par réponse. Le guide de sécurité couvre les règles de proxy inverse pour les déploiements publics, y compris les listes d'autorisation de méthodes, les filtres d'adresses obligatoires sur `/ethtxs`, et la protection contre les agrégats de comptage coûteux et les décalages non bornés. Les identifiants sont chargés depuis `.env`, les URI de connexion PostgreSQL sont pris en charge, et les diagnostics masquent les mots de passe.

### Conteneur et contrat d'API

L'image publiée est `ghcr.io/adamant-im/eth-transactions-storage:2.5.0`, conçue pour linux/amd64 et linux/arm64. Les balises de version sont immuables ; utilisez la version 2.5.0 en production. Docker Compose exécute cette image par défaut aux côtés de PostgreSQL, PostgREST, un Geth local optionnel et l'indexeur. Le site de documentation sur eth-indexer.docs.adamant.im fournit l'architecture, les démarrages rapides, la configuration et les détails de sécurité.

Une version aussi importante n'est utile que si les clients existants continuent de fonctionner. C'est le cas. Les points de terminaison `/ethtxs`, `/max_block` et `/aval` restent inchangés.

Transferts ETH natifs, une requête :

```http
GET /ethtxs?and=(contract_to.eq.,or(txfrom.eq.{address},txto.eq.{address}))&order=time.desc&limit=25
```

Transferts ERC-20 pour un contrat de jeton :

```http
GET /ethtxs?and=(txto.eq.{contract_address},or(txfrom.eq.{address},contract_to.eq.000000000000000000000000{address_without_0x}))&order=time.desc&limit=25
```

Santé :

```http
GET /max_block
GET /aval
```

Les noms de colonnes, les encodages et les adresses insensibles à la casse restent inchangés. Les 24 zéros initiaux sur `contract_to` sont un remplissage ABI, et non une particularité à corriger plus tard.

### Portée et limitations

L'indexeur stocke les transferts ETH natifs avec une valeur non nulle et les transferts ERC-20 soumis en tant qu'appel direct de haut niveau `transfer(address,uint256)`. Il ne stocke pas les transferts ETH internes, les flux `transferFrom`, les flux multisig ou de routeur, les autres normes de jetons ou les journaux d'événements. L'indexeur ne répare pas automatiquement une réorganisation profonde de la chaîne après coup ; `CONFIRMATIONS_BLOCK` le maintient derrière la tête de chaîne, ce qui signifie qu'une réorganisation profonde nécessite une réindexation planifiée de la plage affectée. Si votre application doit refléter chaque mouvement de jeton possible, vous avez besoin d'un indexeur basé sur les journaux. Si elle nécessite des transferts initiés par l'utilisateur — l'historique qu'un portefeuille affiche réellement — celui-ci est conçu pour cette tâche et reste peu coûteux à exploiter.

Les opérateurs existants doivent lire le guide de mise à niveau avant le déploiement. Appliquez d'abord le schéma additif, conservez vos valeurs d'environnement de production et ne traitez pas une mise à jour de balise d'image Compose comme une mise à niveau de PostgreSQL. ETH Transactions Storage est une infrastructure open-source maintenue par la communauté de développeurs ADAMANT et cryptofoundry.
