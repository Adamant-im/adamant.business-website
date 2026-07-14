---
title: "ADAMANT Blockchain Node Update: Version 0.8.0"
slug: "adamant-blockchain-node-update-introducing-version-0-8-0-35647db85081"
description: "ADAMANT, die Open-Source-dezentrale Messaging-Plattform auf Blockchain-Basis, hat die Knotenversion 0.8.0 veröffentlicht. Dieses Update konzentriert sich auf API-Verbesserungen und Optimierungen."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-blockchain-node-update-introducing-version-0-8-0-35647db85081"
publishedAt: "2023-03-20T08:43:48.499Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
cardSpan: "full"
originalId: "medium:35647db85081"
locale: "de"
placeholder: false
---

ADAMANT, die Open-Source-dezentrale Messaging-Plattform auf Blockchain-Technologie, hat die Knotenversion 0.8.0 veröffentlicht. Dieses Update konzentriert sich auf API-Verbesserungen und Optimierungen statt auf Konsensänderungen. Daher ist das Aktualisieren Ihres Knotens optional.

## API-Verbesserungen

Die Endpunkte `/api/transactions` und `/api/chats/get` akzeptieren jetzt entweder `inId` oder `isIn` als äquivalente Abfrageparameter. Zum Beispiel liefern `/api/chats/get?InId=U6386412615727665758` und `/api/chats/get?isIn=U6386412615727665758` dasselbe Ergebnis. Außerdem sind Benutzer-IDs in den Endpunkten `/api/chats/get` und `/api/chatrooms` jetzt nicht mehr auf Groß-/Kleinschreibung angewiesen. Das bedeutet, dass `/api/chatrooms/U6386412615727665758` und `/api/chatrooms/u6386412615727665758` identisch behandelt werden.

Transaktionen und `POST /api/accounts/delegates` akzeptieren jetzt eine Transaktion entweder als einfaches Objekt oder verschachtelt in einer `transaction`-Eigenschaft. Beide folgenden Formen sind gültig:

```bash
curl -X POST https://endless.adamant.im/api/transactions/process -H 'Content-Type: application/json' -d '{"type": 0, "amount": 100000000, ...}'
# or {"transaction": { "type": 0, "amount": 100000000, ... }}
```

Der Endpunkt `/api/states/get` enthält jetzt eine `confirmations`-Eigenschaft, und die Abfrageleistung von `generatorPublicKey` wurde optimiert. Eine `cors`-Option wurde außerdem zu `config.json` hinzugefügt, um die Konfiguration für Cross-Origin-Anfragen zu vereinfachen.

## Fehlerbehebungen und inkompatible Änderungen

Das Update behebt einen „Zugriff verweigert für Schema public“-Fehler, der einige Bereitstellungen betroffen hat. Version 0.8.0 führt jedoch eine inkompatible Änderung ein: Der Endpunkt `/api/blocks` gibt nicht mehr die Eigenschaft `count` zurück. Anwendungen, die auf dieses Feld angewiesen sind, müssen entsprechend aktualisiert werden.

Da diese Version keine Konsensregeln verändert, können bestehende Knoten weiterhin mit der vorherigen Version betrieben werden, ohne Kompatibilitätsprobleme zu verursachen.
