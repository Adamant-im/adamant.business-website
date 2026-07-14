---
title: "Entwickeln Sie Apps und Dienste auf der ADAMANT-Blockchain mit der JavaScript-API v1.0.0"
slug: "develop-apps-and-services-upon-messenger-s-blockchain-adamant-javascript-api-v1-0-0-f00922f5b00d"
description: "ADAMANT ist eine öffentliche Blockchain für anonyme Nachrichten. Ihre Einzigartigkeit liegt in den darauf aufbauenden Diensten. Entwickler können Programme schreiben, die ihre Funktionen nutzen."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/develop-apps-and-services-upon-messengers-blockchain-adamant-javascript-api-v1-0-0-f00922f5b00d"
publishedAt: "2021-05-28T20:22:13.112Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/f00922f5b00d/001-0-fghvl6xn-ahzkh9m.webp"
cardSpan: "full"
originalId: "medium:f00922f5b00d"
locale: "de"
placeholder: false
---

ADAMANT ist eine öffentliche Blockchain, die für anonyme Nachrichtenübermittlung konzipiert ist. Was sie einzigartig macht, ist nicht die Blockchain selbst, sondern die darauf aufbauenden Dienste. Jeder Entwickler kann Programme schreiben, die ihre Funktionen nutzen, darunter anonyme Nachrichten- und Signalübertragung, ewige verschlüsselte Datenspeicherung, plattformübergreifenden Datenzugriff, schnelle temporäre Konten und hohe Zuverlässigkeit.

Mehrere Anwendungen laufen bereits auf der ADAMANT-Blockchain. Dazu gehören ein Messenger und eine Kryptowallet, ein Krypto-Tauschbot, ein zweifaktorauthentifizierter Dienst auf Blockchain-Basis und ein Bounty-Bot.

![Entwickeln Sie Apps und Dienste auf der Messenger-Blockchain — ADAMANT JavaScript API v1.0.0](/images/engineering-notes/medium/f00922f5b00d/002-0-dtmatfmf-pnkc0hj.webp)

![Entwickeln Sie Apps und Dienste auf der Messenger-Blockchain — ADAMANT JavaScript API v1.0.0](/images/engineering-notes/medium/f00922f5b00d/003-0-45fiuq9gnu-tgiot.webp)

![Entwickeln Sie Apps und Dienste auf der Messenger-Blockchain — ADAMANT JavaScript API v1.0.0](/images/engineering-notes/medium/f00922f5b00d/004-0-oyzmxof2phgcsl2c.webp)

### ADAMANT JavaScript API v1.0.0

Die ADAMANT JavaScript API wurde auf [v1.0.0](https://www.npmjs.com/package/adamant-api) aktualisiert. Im Vergleich zur vorherigen Version ist die Bibliothek zuverlässiger bei Blockchain-Anfragen und einfacher in der Anwendung. Sie demonstriert Dezentralisierung in der Praxis: Falls ein Netzwerkknoten eine Anfrage nicht erfüllen kann, leitet die Bibliothek automatisch an einen anderen Knoten weiter und versucht dies mehrfach, bis ein Ergebnis zurückgegeben wird. Der Entwickler muss das Knoten-Failover nicht manuell behandeln.

Ein einfaches Beispiel für eine Blockchain-Abfrage:

```javascript
api.get('blocks').then(response => {
  console.log(response.data)
})
```

Die Bibliothek wurde komplett überarbeitet, mit aktualisierten und bereinigten Abhängigkeiten sowie neu geschriebenen internen Funktionen. Version 1.0.0 ist nicht kompatibel mit der vorherigen Version v0.5.3, aber die Migration ist unkompliziert. Die vollständige Dokumentation ist im [adamant-api-jsclient Wiki](https://github.com/Adamant-im/adamant-api-jsclient/wiki) verfügbar.
