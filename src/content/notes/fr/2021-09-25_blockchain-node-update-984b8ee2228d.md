---
title: "ADAMANT Node v0.6.5 Update"
slug: "blockchain-node-update-984b8ee2228d"
description: "ADAMANT Node v0.6.5 est disponible. Cette version améliore la qualité du code et les outils, sans changer le protocole. La mise à jour est facultative et n’affecte pas le consensus réseau."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/blockchain-node-update-984b8ee2228d"
publishedAt: "2021-09-25T11:38:15.720Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/984b8ee2228d/001-0-f4qfd6o3timcqsgd.webp"
cardSpan: "full"
originalId: "medium:984b8ee2228d"
locale: "fr"
placeholder: false
---

ADAMANT Node v0.6.5 est désormais disponible. Cette version met l’accent sur la qualité du code et les outils, plutôt que sur des modifications de protocole, donc la mise à jour est facultative et n’affecte pas le consensus du réseau.

Les paramètres par défaut de diffusion ont été modifiés, et le script d’installation bash a été mis à jour. Les dépendances de développement ont été actualisées, la base de code a été relue (linted), et la suite de tests a été corrigée.

Deux ajouts notables sont le paramètre en ligne de commande `-genesis` et un port dédié `portWS` 36665 pour le testnet. Cela facilite l’exécution de configurations de genesis et de testnet sans avoir à recourir à des remplacements manuels.

Les instructions d’installation pour Ubuntu, macOS et Windows sont disponibles dans les [notes de publication d’ADAMANT Node v0.6.5](https://github.com/Adamant-im/adamant/releases/tag/v0.6.5).
