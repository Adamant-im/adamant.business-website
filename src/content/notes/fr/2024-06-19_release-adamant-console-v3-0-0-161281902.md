---
title: "ADAMANT Console v3.0.0"
slug: "release-adamant-console-v3-0-0-161281902"
description: "La validation des paramètres des clés publiques et des noms de délégué dans la commande vote for a été corrigée. La commande client version inclut désormais des champs supplémentaires indiquant le chemin du fichier de configuration, le réseau et le compte."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-console/releases/tag/v3.0.0"
publishedAt: "2024-06-19T12:50:46Z"
author: "martiliones"
authorUrl: "https://github.com/martiliones"
repo: "adamant-console"
tag: "v3.0.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-console:161281902"
locale: "fr"
placeholder: false
---

La validation des paramètres des clés publiques et des noms de délégué dans la commande `vote for` a été corrigée. La commande `client version` inclut désormais des champs supplémentaires indiquant le chemin du fichier de configuration, le réseau et le compte :

```jsonc
{
  "success": true,
  "version": "3.0.0",
  // The new fields:
  "config": "/home/username/.adm/config.jsonc",
  "network": "mainnet",
  "account": "U3716604363012166999"
}
```

### Changements cassants

La réponse de la commande `get message` conserve désormais le message chiffré dans l'objet `transaction.asset.chat` au lieu de le renvoyer déchiffré en clair. Un nouveau champ `transaction.decoded` a été introduit pour contenir le message déjà déchiffré lorsque la transaction inclut la clé publique de l'utilisateur configuré :

```jsonc
{ // adm get message 3745646290027012070
  "success": true,
  "nodeTimestamp": 214429446,
  "transaction": {
    "id": "3745646290027012070",
    // ...
    "asset": {
      "chat": {
        "message": "d6247af9ff5cd53eeb88a48e62cb47c33cc8b1b37d38e784e0481b8251149d", // <--- encoded message
        "own_message": "ae3f5203f252fa75705a6681fee3244b46da5bb0aa169498",
        "type": 1
      }
    },
    "decoded": "Hello, ADAMANT!" // <--- decoded message
  }
}
```
