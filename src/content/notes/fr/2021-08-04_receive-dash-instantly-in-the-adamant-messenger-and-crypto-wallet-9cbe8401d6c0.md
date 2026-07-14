---
title: "Recevez des DASH instantanément dans ADAMANT Messenger et le portefeuille crypto"
slug: "receive-dash-instantly-in-the-adamant-messenger-and-crypto-wallet-9cbe8401d6c0"
description: "ADAMANT Messenger 2.12.0 prend en charge Dash InstantSend, permettant de recevoir des transferts DASH immédiatement, sans attendre les confirmations du réseau."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/receive-dash-instantly-in-the-adamant-messenger-and-crypto-wallet-9cbe8401d6c0"
publishedAt: "2021-08-04T13:23:12.613Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/9cbe8401d6c0/001-0-omadd6rxri1q0dfd.webp"
cardSpan: "full"
originalId: "medium:9cbe8401d6c0"
locale: "fr"
placeholder: false
---

ADAMANT Messenger version 2.12.0 introduit la prise en charge de Dash InstantSend, permettant de recevoir des transferts DASH instantanément sans attendre les confirmations du réseau. Généralement, les transferts de cryptomonnaies nécessitent d'attendre des confirmations de blocs, mais Dash InstantSend utilise des nœuds maîtres pour vérifier les transactions et garantir leur inclusion dans les blocs suivants. Par ailleurs, cette mise à jour améliore la rapidité de la mise à jour de l'état des transactions pour les autres cryptomonnaies prises en charge.

Cette version intègre également un bot de récompenses ADM directement dans les discussions. Ce bot verse automatiquement et instantanément des récompenses pour les tâches accomplies et prend actuellement en charge les campagnes Twitter. Les utilisateurs peuvent envoyer la commande `/help` au bot pour connaître les règles de la campagne.

![Recevez des DASH instantanément dans ADAMANT Messenger et le portefeuille crypto](/images/engineering-notes/medium/9cbe8401d6c0/002-0-hofe2-yqoknm1e74.webp)

Afin d'assurer la fiabilité et la sécurité du code, la mise à jour met à jour les dépendances vers des versions sans vulnérabilités connues. L'empreinte de l'application a été réduite en supprimant les listes de mots bip39 inutilisées non anglaises. En outre, la génération des clés cryptographiques pour les portefeuilles intégrés a été optimisée, rendant la connexion à un nouveau compte environ six fois plus rapide grâce à la mise en cache de la graine. D'autres opérations de maintenance incluent la mise à jour des bibliothèques Ethereum, la suppression du lien vers l'exchange Atomars (désormais obsolète), ainsi que divers correctifs de bogues.
