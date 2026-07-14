---
title: "ADAMANT Console v2.3.0"
slug: "release-adamant-console-v2-3-0-149043878"
description: "Cette version introduit la commande adm init [chemin], qui permet de copier le fichier de configuration par défaut vers /.adm/ ou un répertoire personnalisé. Aucune modification incompatible."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-console/releases/tag/v2.3.0"
publishedAt: "2024-03-29T17:13:09Z"
author: "martiliones"
authorUrl: "https://github.com/martiliones"
repo: "adamant-console"
tag: "v2.3.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-console:149043878"
locale: "fr"
placeholder: false
---

Cette version introduit la commande `adm init [path]`, qui permet aux utilisateurs de copier le fichier de configuration par défaut vers `~/.adm/` ou vers un chemin de répertoire spécifié.

```bash
# to copy to ~/.adm/$ADM_CONFIG_FILENAME
$ adm init
# to copy to the specific directory
$ adm init ./my-dir
```

Aucune modification incompatible n'est introduite dans cette version.
