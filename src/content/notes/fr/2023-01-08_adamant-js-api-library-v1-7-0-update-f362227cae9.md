---
title: "ADAMANT JS API Library v1.7.0 Update"
slug: "adamant-js-api-library-v1-7-0-update-f362227cae9"
description: "La bibliothèque JavaScript ADAMANT API v1.7.0 ajoute le support des rappels pour la logique post-initialisation."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-js-api-library-v1-7-0-update-f362227cae9"
publishedAt: "2023-01-08T14:33:18.085Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/f362227cae9/001-1-fyo9k3w-4-kerjuoncf9fw-png.webp"
cardSpan: "full"
originalId: "medium:f362227cae9"
locale: "fr"
placeholder: false
---

La bibliothèque JavaScript ADAMANT API v1.7.0 introduit le support des callbacks pour la logique post-initialisation. Deux changements sont inclus dans cette version : une nouvelle méthode `api.setStartupCallback()` et un paramètre de callback optionnel accepté en tant que troisième argument du constructeur `api`. Ces deux mécanismes permettent d'exécuter du code personnalisé une fois que la bibliothèque a terminé son initialisation, ce qui est utile pour les tâches de configuration dépendant d'une instance API prête à l'emploi.

La documentation complète de l'API est disponible dans le [wiki du client ADAMANT API](https://github.com/Adamant-im/adamant-api-jsclient/wiki/API-Specification). Les détails de la version sont disponibles dans les [notes de publication v1.7.0](https://github.com/Adamant-im/adamant-api-jsclient/releases/tag/v1.7.0).
