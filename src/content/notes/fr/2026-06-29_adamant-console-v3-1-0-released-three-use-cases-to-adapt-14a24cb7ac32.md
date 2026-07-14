---
title: "ADAMANT Console v3.1.0 : cas d'utilisation CLI et JSON-RPC"
slug: "adamant-console-v3-1-0-released-three-use-cases-to-adapt-14a24cb7ac32"
description: "ADAMANT Console v3.1.0 est disponible sur GitHub et npm. Cette version assure la compatibilité avec ADAMANT Node v0.10.0 et améliore l'expérience développeur pour le CLI et JSON-RPC."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-console-v3-1-0-released-three-use-cases-to-adapt-14a24cb7ac32"
publishedAt: "2026-06-29T08:58:40.394Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/14a24cb7ac32/001-0-1kktbaowg0a7u8mr.webp"
cardSpan: "full"
originalId: "medium:14a24cb7ac32"
locale: "fr"
placeholder: false
---

ADAMANT Console v3.1.0 est désormais disponible sur GitHub et npm. Cette version aligne Console sur ADAMANT Node v0.10.0 et améliore l'expérience développeur autour de l'utilisation du CLI, des intégrations JSON-RPC et des wrappers JavaScript locaux. Elle s'adresse à toute personne utilisant ADAMANT dans des scripts, des bots, des infrastructures d'échange, des outils internes, des tableaux de bord de surveillance ou des automatisations de paiement.

### Qu'est-ce qu'ADAMANT Console ?

ADAMANT Console est un outil en ligne de commande et JSON-RPC pour interagir avec la blockchain ADAMANT. Il permet d'inspecter les comptes, blocs, transactions, discussions, délégués et l'état du nœud ; d'envoyer des transferts ADM et des messages chiffrés ; de fonctionner comme pont JSON-RPC local pour des services écrits dans n'importe quel langage ; et de signer des transactions localement afin que les phrases secrètes ne soient jamais envoyées aux nœuds ADAMANT. Ce dernier point est crucial : Console est conçu autour de la signature locale. Votre application prépare une action localement, Console la signe localement, et seule la transaction signée est soumise au réseau.

### Quoi de neuf dans la v3.1.0 ?

L'objectif principal de cette version est la compatibilité avec ADAMANT Node v0.10.0. Les changements notables incluent la prise en charge du comportement mis à jour des réponses et requêtes du nœud, une mise à niveau vers `adamant-api` v3, un nouveau support pour `node status`, des assistants étendus pour les discussions et les transactions, la prise en charge de `returnUnconfirmed` pour les recherches de transactions, la recherche de délégués par nom d'utilisateur, clé publique ou adresse ADAMANT, des filtres de transfert direct mis à jour avec `includeDirectTransfers`, des exemples d'aide CLI améliorés, une couverture élargie des méthodes JSON-RPC, une référence API générée avec un nouveau site de documentation Console, et un package npm publié avec provenance via Trusted Publishing. Le runtime pris en charge est désormais Node.js 22.13.0 ou supérieur.

Installer ou mettre à jour :

```bash
npm install -g adamant-console
```

Puis vérifier votre configuration locale :

```bash
adm client version
adm node status
```

### Cas d'utilisation : un bot d'opérations crypto pour les flux d'équipe

Une équipe exploitant des services dépendant des paiements ADM ou de la disponibilité d'un nœud peut utiliser ADAMANT Console comme petit pont local derrière un bot. Un bot Telegram, Discord ou Slack peut appeler des commandes Console ou des méthodes JSON-RPC pour répondre à des questions sur la santé du nœud, le statut des transactions, les soldes des portefeuilles et les paiements entrants non confirmés.

Exemples de vérifications CLI :

```bash
adm node status
adm get address U123456789
adm get transaction 123456789 returnUnconfirmed=1
adm get transactions recipientId=U123456789,limit=10
```

Cela est utile pour les services d'assistance, les canaux de surveillance, les opérations de trésorerie et la réponse interne aux incidents. Le bot n'a pas besoin de connaître en détail le protocole ADAMANT ; il appelle Console, analyse le JSON et présente des messages d'état clairs aux utilisateurs humains.

### Cas d'utilisation : licence ou contrôle d'accès basé sur ADM

Un autre cas d'utilisation pratique est la gestion légère de licences. Une application auto-hébergée, un outil de trading, un tableau de bord analytique ou un service d'automatisation peut débloquer un accès premium lorsqu'un utilisateur envoie des ADM à une adresse de paiement. Le backend attribue une adresse de dépôt à l'utilisateur, surveille les transactions entrantes, vérifie le montant du paiement et le statut de la transaction, active automatiquement l'accès et peut éventuellement envoyer un message chiffré ADAMANT comme reçu.

Un service peut interroger les transactions comme suit :

```bash
adm get transactions recipientId=U123456789,limit=20,returnUnconfirmed=1
```

Ou envoyer un message de confirmation :

```bash
adm send message U123456789 "Your subscription is active"
```

Pour des applications plus volumineuses, le même flux peut s'exécuter via JSON-RPC, permettant au backend principal d'être écrit en PHP, Python, Go, Ruby, Java ou tout autre langage capable d'effectuer des requêtes HTTP. Console devient alors le pont ADAMANT local.

### Cas d'utilisation : dépôts et retraits rapides d'ADM via JSON-RPC pour les exchanges

Les exchanges et services de custody ont souvent besoin d'une interface simple et prévisible pour les dépôts et retraits. ADAMANT Console peut fonctionner comme serveur JSON-RPC local :

```bash
adm rpc server
```

Par défaut, il écoute sur le port RPC configuré, généralement `5080`. Exécutez le serveur JSON-RPC uniquement sur une infrastructure de confiance, derrière un pare-feu ou un réseau privé. Si le serveur a accès aux phrases secrètes, traitez-le comme une infrastructure de signature.

Vérifier l'état du nœud :

```bash
curl -s -X POST http://127.0.0.1:5080 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"nodeStatus","params":[],"id":1}'
```

Générer un compte de dépôt :

```bash
curl -s -X POST http://127.0.0.1:5080 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"accountNew","params":[],"id":2}'
```

Stockez les identifiants générés de manière sécurisée. Ne journalisez jamais les phrases secrètes ni les clés privées.

Surveiller les dépôts :

```bash
curl -s -X POST http://127.0.0.1:5080 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"getTransactionsReceivedByAddress","params":["U123456789"],"id":3}'
```

Pour des analyses de transactions plus flexibles :

```bash
curl -s -X POST http://127.0.0.1:5080 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"getTransactions","params":["recipientId=U123456789","limit=20","returnUnconfirmed=1"],"id":4}'
```

Votre backend d'échange peut rapprocher les dépôts par adresse, ID de transaction, montant, horodatage et politique de confirmation.

Traiter les retraits :

```bash
curl -s -X POST http://127.0.0.1:5080 \
  -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","method":"sendTokens","params":{"address":"U987654321","amount":"10ADM","passphrase":"your local passphrase"},"id":5}'
```

Pour les systèmes de production, les phrases secrètes doivent provenir d'un stockage local sécurisé, et non des journaux, captures d'écran, sorties CI ou historiques shell partagés.

### Pourquoi cette version est importante

ADAMANT Console est volontairement léger. Il ne cherche pas à remplacer un SDK complet ou un backend personnalisé. Il offre plutôt aux développeurs et opérateurs un outil pratique pour des scripts rapides, la signature locale, les intégrations de bots, l'automatisation d'échanges, les vérifications de paiement, la surveillance opérationnelle et l'accès JSON-RPC depuis des piles non JavaScript. Avec la v3.1.0, cet outil est désormais aligné sur ADAMANT Node v0.10.0 et la pile actuelle de l'API JavaScript ADAMANT.
