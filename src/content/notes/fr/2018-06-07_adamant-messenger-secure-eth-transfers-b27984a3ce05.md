---
title: "ADAMANT Messenger : Transferts sécurisés d'ETH"
slug: "adamant-messenger-secure-eth-transfers-b27984a3ce05"
description: "ADAMANT ajoute un portefeuille Ethereum (ETH) intégré permettant des transferts de cryptomonnaies sans intermédiaire dans son système de messagerie privé."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-messenger-secure-eth-transfers-b27984a3ce05"
publishedAt: "2018-06-07T07:30:57.792Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/b27984a3ce05/001-0-0qs-wuvvdq6a0uk2.webp"
cardSpan: "full"
originalId: "medium:b27984a3ce05"
locale: "fr"
placeholder: false
---

ADAMANT a ajouté la prise en charge intégrée du portefeuille Ethereum (ETH) et des transferts au sein de sa plateforme de messagerie privée. Cette fonctionnalité permet des transferts de cryptomonnaies entièrement sans confiance au sein du système de chat, sans tiers ni intermédiaires. Le fonctionnement est similaire à celui de l'application open source côté client MyEtherWallet : les utilisateurs conservent leurs propres clés privées, et chaque transaction est signée côté client avant d'être envoyée chiffrée à un nœud Ethereum.

Lorsqu'un utilisateur envoie des ETH via le réseau ADAMANT, une clé privée est dérivée du même mot de passe du portefeuille ADAMANT utilisé pour accéder au Messenger. Cela signifie que le mot de passe ADAMANT devient la seule clé permettant d'accéder à tous les portefeuilles cryptomonnaies associés, rendant ainsi essentiel un stockage sécurisé du mot de passe. ADAMANT ne peut ni récupérer les fonds ni bloquer les comptes si un mot de passe est perdu ou compromis suite à une tentative de phishing.

![ADAMANT Messenger : Transferts sécurisés d'ETH](/images/engineering-notes/medium/b27984a3ce05/002-0-zzoel-pond1fmpkh.webp)

Des nœuds Ethereum distincts, dotés d'index de base de données spécialisés pour récupérer l'historique des transactions, sont actuellement en cours de développement. Les utilisateurs qui préfèrent ne pas faire confiance à l'infrastructure ADAMANT peuvent exécuter leur propre nœud Ethereum avec ces index et le sélectionner dans l'application. L'ensemble du code source ADAMANT est disponible publiquement sur GitHub.

Lorsqu'un utilisateur crée un compte ADAMANT, une adresse Ethereum est générée et la blockchain enregistre une entrée publique dans KVS pour prouver la propriété. Le compte doit détenir plus de 0,001 ADM pour enregistrer cette transaction. Une fois enregistrée, toute personne dans un chat peut rechercher l'adresse ETH à partir de la blockchain afin d'envoyer un paiement, éliminant ainsi la nécessité de demander l'adresse séparément.

Une considération importante en matière de confidentialité : l'adresse ETH est publiquement visible sur la blockchain, et toute personne peut voir qu'une adresse ADAMANT donnée est liée à une adresse ETH spécifique. Bien qu'elle ne puisse pas être associée à une identité réelle, les utilisateurs soucieux de leur anonymat devraient éviter de partager publiquement leur adresse ADAMANT. Les utilisateurs conservent un contrôle total sur leur portefeuille ETH et peuvent transférer des fonds vers n'importe quel autre portefeuille Ethereum, les frais de gaz standards d'Ethereum s'appliquant dans ce cas.
