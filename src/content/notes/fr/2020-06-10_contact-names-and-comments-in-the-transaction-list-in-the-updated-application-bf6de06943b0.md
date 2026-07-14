---
title: "Noms de contact et commentaires dans la liste des transactions — Dans l'application mise à jour"
slug: "contact-names-and-comments-in-the-transaction-list-in-the-updated-application-bf6de06943b0"
description: "La mise à jour v2.6.0 du messager web ADAMANT enrichit la liste des transactions avec des commentaires visibles, des noms de contact et des raccourcis vers les discussions."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/contact-names-and-comments-in-the-transaction-list-in-the-updated-application-bf6de06943b0"
publishedAt: "2020-06-10T06:44:48.139Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/bf6de06943b0/001-0-q5zuwj-pur7a9hdb.webp"
cardSpan: "full"
originalId: "medium:bf6de06943b0"
locale: "fr"
placeholder: false
---

La mise à jour v2.6.0 du messager web ADAMANT rend la liste des transactions plus informative. Les commentaires de transfert sont désormais visibles directement dans la liste, les noms de contact s'affichent aux côtés des adresses, et chaque entrée propose un raccourci pour ouvrir la discussion correspondante. Les vues détaillées des transactions ont été mises à jour pour afficher également les commentaires et les noms de contact, tandis que l'adresse de l'utilisateur est désormais étiquetée « Moi » pour plus de clarté. Pour les transactions impliquant d'autres cryptomonnaies, les adresses ADM et les noms de contact sont affichés dans la liste, avec le même raccourci vers la discussion disponible.

![Noms de contact et commentaires dans la liste des transactions — Dans l'application mise à jour](/images/engineering-notes/medium/bf6de06943b0/002-0-nu76kd5rli905hye.webp)

Le paramètre de persistance de la session a été clarifié : le comportement précédent « déconnexion à la fermeture de l’onglet » est remplacé par une option plus claire « Rester connecté ». Le mode sombre est désormais le thème par défaut. Sur le plan de la sécurité, les liens dans les messages et le lien vers la documentation du mot de passe utilisateur s'ouvrent désormais dans de nouvelles fenêtres avec `noopener`, empêchant ainsi le tab-nabbing. Les notifications push ont également été corrigées dans cette version.

Le journal complet des modifications est disponible sur la [page de publication ADAMANT GitHub](https://github.com/Adamant-im/adamant-im/releases/tag/v2.6.0).
