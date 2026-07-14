---
title: "ADAMANT Console v3.0.0"
slug: "release-adamant-console-v3-0-0-161281902"
description: "Validation of the parameters for public keys and delegate names in the vote for command has been fixed. The client version command now includes additional fields showing the con…"
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
locale: "en"
placeholder: false
---

Validation of the parameters for public keys and delegate names in the `vote for` command has been fixed. The `client version` command now includes additional fields showing the configuration file path, network, and account:

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

The `get message` command response now keeps the message encrypted inside the `transaction.asset.chat` object instead of returning it decrypted in place. A new `transaction.decoded` field has been introduced for the already decrypted message when the transaction includes the configured user's public key:

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
