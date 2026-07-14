---
title: "ADAMANT Console v1.3.0"
slug: "release-adamant-console-v1-3-0-13940917"
description: "Cette version introduit deux nouvelles commandes : account new et get transactions. Elle ajoute également la prise en charge de l'option passPhrase."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-console/releases/tag/v1.3.0"
publishedAt: "2018-11-11T16:19:44Z"
author: "zyuhel"
authorUrl: "https://github.com/zyuhel"
repo: "adamant-console"
tag: "v1.3.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-console:13940917"
locale: "fr"
placeholder: false
---

Cette version introduit deux nouvelles commandes : `account new` et `get transactions`. Elle ajoute également la prise en charge de l'option `--passPhrase`, permettant aux utilisateurs de fournir une phrase secrète directement lors de l'exécution d'une commande.

Plusieurs corrections sont incluses dans cette version. Les appels obsolètes `new Buffer()` ont été remplacés, et un bogue provoquant un chargement incorrect de la configuration a été résolu. Une mise à jour temporaire de dépendance a été appliquée en attendant la fusion de dthree/vorpal#322.
