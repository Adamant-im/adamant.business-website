---
title: "ADAMANT Console v2.2.0"
slug: "release-adamant-console-v2-2-0-142293299"
description: "Le wiki a été mis à jour avec les derniers changements. Les dépendances ont été actualisées. La base de code utilise désormais des modules ES (.mjs)."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-console/releases/tag/v2.2.0"
publishedAt: "2024-02-16T09:24:56Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-console"
tag: "v2.2.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-console:142293299"
locale: "fr"
placeholder: false
---

Le wiki a été mis à jour pour refléter les derniers changements. Les dépendances ont été mises à jour vers leurs versions actuelles. La base de code a été réécrite pour utiliser des modules ES (.mjs) afin de prendre en charge les bibliothèques modernes. Prettier a été ajouté pour le formatage du code.

### Changements cassants

Le format du fichier de configuration a changé. La clé `passPhrase` dans la configuration a été renommée en `passphrase`. Les fichiers de configuration `config.json` et `config.default.json` ont été renommés respectivement en `config.jsonc` et `config.default.jsonc`. La réponse de la commande `account new` renvoie désormais `passphrase` au lieu de `passPhrase`. L'option en ligne de commande `--passPhrase` a été renommée en `--passphrase`, donc `adm --passPhrase=""` doit maintenant être écrit `adm --passphrase=""`.
