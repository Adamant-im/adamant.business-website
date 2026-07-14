---
title: "ADAMANT Console v3.0.0"
slug: "release-adamant-console-v3-0-0-161281902"
description: "Die Validierung der Parameter für öffentliche Schlüssel und Delegatennamen im vote for-Befehl wurde behoben. Der client version-Befehl enthält jetzt zusätzliche Felder, die den Konfigurationsdateipfad, das Netzwerk und das Konto anzeigen."
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
locale: "de"
placeholder: false
---

Die Validierung der Parameter für öffentliche Schlüssel und Delegatennamen im `vote for`-Befehl wurde behoben. Der `client version`-Befehl enthält jetzt zusätzliche Felder, die den Konfigurationsdateipfad, das Netzwerk und das Konto anzeigen:

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

### Breaking changes

Die Antwort des `get message`-Befehls bewahrt die Nachricht nun verschlüsselt innerhalb des `transaction.asset.chat`-Objekts auf, anstatt sie entschlüsselt an Ort und Stelle zurückzugeben. Ein neues Feld `transaction.decoded` wurde eingeführt, das die bereits entschlüsselte Nachricht enthält, wenn die Transaktion den konfigurierten öffentlichen Schlüssel des Benutzers beinhaltet:

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
