---
title: "Stockage clé-valeur dans ADAMANT : enregistrement des noms de contacts sur la blockchain"
slug: "what-is-key-value-store-in-adamant-and-how-is-it-used-to-store-contact-names-4ee5f82ab77f"
description: "ADAMANT a introduit un mécanisme de stockage clé-valeur (KVS) pour les données de contact sur la blockchain, implémenté dans la version 0.2.0 du protocole ADAMANT. Le KVS prend en charge les données publiques et privées."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/what-is-key-value-store-in-adamant-and-how-is-it-used-to-store-contact-names-4ee5f82ab77f"
publishedAt: "2018-07-11T07:10:16.055Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/4ee5f82ab77f/001-0-tvpp-oomdjax-ek8.webp"
cardSpan: "full"
originalId: "medium:4ee5f82ab77f"
locale: "fr"
placeholder: false
---

ADAMANT a introduit un mécanisme de stockage clé-valeur (KVS) pour enregistrer les données de contact sur la blockchain, implémenté dans la version 0.2.0 du protocole ADAMANT. Le KVS prend en charge à la fois le stockage de données publiques et privées. Des exemples publics incluent les adresses Ethereum, tandis que des exemples privés incluent les carnets d'adresses.

Les transactions KVS privées sont stockées sur la blockchain aux côtés des autres types de transactions, mais ne sont accessibles qu'à leurs propriétaires. Le contenu de la transaction est chiffré à l’aide d’un hachage de la clé privée du propriétaire, auquel est ajouté un sel (salt) pour renforcer la sécurité. Les détails techniques complets sont spécifiés dans [AIP-3](https://aips.adamant.im/AIPS/aip-3).

ADAMANT utilise un stockage de données incrémentiel, ce qui signifie que l’application cliente transmet uniquement les modifications apportées au carnet d’adresses plutôt que l’ensemble du carnet. Cela constitue un point important pour le stockage basé sur la blockchain, où la minimisation de la taille des données sur la chaîne est essentielle. Chaque clé correspond à une valeur spécifique — par exemple, l’adresse ADAMANT d’un contact (telle que `U324242353425354`) est associée à un nom d’affichage (tel que "John").

L’application web ADAMANT Messenger a été mise à jour pour prendre en charge cette fonctionnalité. Les utilisateurs peuvent renommer un contact en cliquant sur l’en-tête contenant l’adresse ADAMANT dans une discussion.

![Stockage clé-valeur dans ADAMANT](/images/engineering-notes/medium/4ee5f82ab77f/002-0-xzokd2tzoxh9eqk2.webp)

Le support du carnet d’adresses est prévu pour les applications iOS et Android dans les versions futures.
