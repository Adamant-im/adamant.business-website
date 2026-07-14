---
title: "Nouvelles fonctionnalités de sécurité dans ADAMANT Messenger 2.11.0"
slug: "new-security-features-in-adamant-messenger-88c8daec0b75"
description: "La version 2.11.0 d'ADAMANT Messenger introduit la vérification des transactions cryptos, des avertissements pour adresses suspectes et la mise à jour à la demande du statut des transactions."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/new-security-features-in-adamant-messenger-88c8daec0b75"
publishedAt: "2021-05-02T08:46:58.373Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/88c8daec0b75/001-0-0hsc7oe7vtwfo3p0.webp"
cardSpan: "full"
originalId: "medium:88c8daec0b75"
locale: "fr"
placeholder: false
---

La version 2.11.0 d'ADAMANT Messenger introduit la vérification des transactions cryptomonnaies, des avertissements pour les adresses de portefeuille suspectes et des mises à jour du statut des transactions à la demande.

### Portefeuilles suspects dans le KVS

ADAMANT stocke les adresses de portefeuille dans le Key-Value Store (KVS) de la blockchain, ce qui permet les transferts cryptos dans les discussions. L'enregistrement d'une adresse nécessite la phrase secrète du compte, empêchant ainsi des tiers d'injecter de fausses adresses au nom de l'utilisateur. Toutefois, si la phrase secrète est compromise, un attaquant pourrait remplacer les adresses cryptomonnaies du compte par les siennes et intercepter les fonds envoyés à la victime.

Le Messenger vérifie désormais la cohérence de l'adresse du portefeuille lors de la connexion et avertit l'utilisateur en cas d'incohérence. Lors de l'envoi de cryptomonnaies à un contact, l'application valide également l'adresse stockée du destinataire.

### Transferts de cryptomonnaies dans les discussions

Les transferts dans les discussions fonctionnent en envoyant d'abord un message spécial sur la blockchain ADAMANT, suivi de la transaction cryptomonnaie elle-même. Des incohérences peuvent survenir entre le message spécial et la transaction sur la blockchain — par exemple, des montants, destinataires, expéditeurs ou horaires de transfert différents. Le Messenger détecte désormais ces incohérences et alerte l'utilisateur.

![Nouvelles fonctionnalités de sécurité dans ADAMANT Messenger](/images/engineering-notes/medium/88c8daec0b75/002-0-bjwjfxdbbty8fily.webp)

Tout transfert de cryptomonnaie dans une discussion devrait également apparaître dans l'historique des transactions du portefeuille sous Wallet → Coin → Balance. Le statut d'une transaction peut désormais être revérifié manuellement depuis l'écran de discussion ou depuis l'écran des détails de la transaction.

### Autres mises à jour

Cette version optimise les délais de mise à jour des transactions pour toutes les cryptomonnaies, corrige la gestion des UTXO pour Doge, ajoute l'affichage de la version du nœud dans la vue Nodes, et corrige un bogue selon lequel la liste des transactions apparaissait vide. Le journal complet des modifications est disponible dans les [notes de publication v2.11.0](https://github.com/Adamant-im/adamant-im/releases/tag/v2.11.0).
