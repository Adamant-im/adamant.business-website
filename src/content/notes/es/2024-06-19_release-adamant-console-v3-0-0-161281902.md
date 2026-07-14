---
title: "ADAMANT Console v3.0.0"
slug: "release-adamant-console-v3-0-0-161281902"
description: "Se ha corregido la validación de parámetros de claves públicas y nombres de delegados en el comando vote for. El comando de versión del cliente ahora incluye campos adicionales."
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
locale: "es"
placeholder: false
---

Se ha corregido la validación de los parámetros de claves públicas y nombres de delegados en el comando `vote for`. El comando `client version` ahora incluye campos adicionales que muestran la ruta del archivo de configuración, la red y la cuenta:

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

### Cambios importantes

La respuesta del comando `get message` ahora mantiene el mensaje cifrado dentro del objeto `transaction.asset.chat` en lugar de devolverlo descifrado directamente. Se ha introducido un nuevo campo `transaction.decoded` para el mensaje ya descifrado cuando la transacción incluye la clave pública del usuario configurado:

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
