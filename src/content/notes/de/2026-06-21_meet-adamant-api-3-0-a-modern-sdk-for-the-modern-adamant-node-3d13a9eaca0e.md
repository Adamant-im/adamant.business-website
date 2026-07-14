---
title: "adamant-api 3.0 kennenlernen — ein modernes SDK für den modernen ADAMANT-Knoten"
slug: "meet-adamant-api-3-0-a-modern-sdk-for-the-modern-adamant-node-3d13a9eaca0e"
description: "Das adamant api JavaScript/TypeScript SDK veröffentlicht Version 3.0.0, optimiert für ADAMANT Node v0.10.0. Neue Funktionen: Millisekunden-Timestamps, erweiterte Abfragen, inklusive Mindestversion-Filterung."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/meet-adamant-api-3-0-a-modern-sdk-for-the-modern-adamant-node-3d13a9eaca0e"
publishedAt: "2026-06-21T15:54:25.436Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/3d13a9eaca0e/001-0-hkmpiqt1p-ubpghb.webp"
cardSpan: "full"
originalId: "medium:3d13a9eaca0e"
locale: "de"
placeholder: false
---

Das `adamant-api` JavaScript/TypeScript SDK hat Version 3.0.0 veröffentlicht, die nahtlos mit ADAMANT Node v0.10.0 funktioniert. Diese Version führt Millisekunden-Timestamps, erweiterte Abfrageparameter, konsolidierte Knotenstatus-Antworten und inklusive Filterung nach Mindestversion ein. Das SDK bietet automatische Integritätsprüfungen, Wiederholungsversuche, Failover, typisierte Antworten, verschlüsselte Nachrichtenübertragung und Echtzeit-WebSocket-Abonnements.

ADAMANT ist ein blockchainbasiertes, Ende-zu-Ende-verschlüsseltes Messenger-System mit integriertem Kryptowallet, das weder Telefonnummer noch zentralen Server benötigt. Das `adamant-api` SDK abstrahiert das Netzwerk in saubere Funktionsaufrufe und ermöglicht Entwicklern, dezentrale Bots, Trinkgeldbehälter und Wallets zu erstellen, bei denen Benutzer ihre Identität und Guthaben kontrollieren.

### Was ist neu in Version 3.0

Die API-Datenübertragungsobjekte (DTOs) des SDKs werden nun aus einer festgelegten `adamant-schema`-Revision neu generiert, was korrekte Typisierung für Millisekunden-Timestamps, Loader/Status-Daten und nullbare Felder bei unbestätigten Transaktionen sicherstellt. Die Abfragefunktionen umfassen nun `returnUnconfirmed`, `includeDirectTransfers`, Delegatensuche per Adresse sowie Abfragen nach mehreren Transaktionstypen. Transaktionsfilter werden standardmäßig mit logischem `and` kombiniert, und Betragsfilter gelten nur für Überweisungstransaktionen. Optional sind `timestampMs`-Konstruktion und `getEpochTimeMs()` verfügbar, wobei `timestampMs` nicht Teil der signierten Bytes ist und somit Hashes, IDs und Signaturen unverändert lässt.

Zu den Verbesserungen der Zuverlässigkeit gehört, dass Wiederholungsschleifen für explizit abgelehnte POST-Anfragen beendet werden und strukturierte, nicht wiederholbare Fehler zurückgegeben werden. Wiederholungen und Failover bei aktiven Knoten bleiben für sichere Anfragen und Netzwerkfehler erhalten. Knotenauswahl basierend auf Blockhöhe und inklusive `minVersion`-Filterung stellen sicher, dass nur mit gesunden, aktuellen Knoten kommuniziert wird.

Ein echter WebSocket-Client ermöglicht das Abonnieren mehrerer Adressen, Transaktionstypen und Chat-Asset-Typen über eine einzige Verbindung. Er bietet typisierte Verbindungsfehler, Rückrufe bei erneuter Verbindung, explizite `connect()`/`disconnect()`-Methoden, Aufräumen von Listenern und begrenztes Reconnect-Verhalten.

Das Paket ist nun von Grund auf modular aufgebaut. Das Hauptpaket bleibt auf ADM fokussiert, während Subpfad-Exporte Zugriff auf API-DTOs, Transaktionen, Metadaten sowie Hilfsfunktionen für BTC/ETH/DASH/DOGE für sowohl CommonJS als auch ESM bereitstellen. Die Kryptowährungsmetadaten sind deterministisch und aus `adamant-wallets` festgelegt. Die Dokumentation wurde auf eine versionskontrollierte VitePress + TypeDoc-Website verlegt.

![adamant-api 3.0 kennenlernen — ein modernes SDK für den modernen ADAMANT-Knoten](/images/engineering-notes/medium/3d13a9eaca0e/002-0-bato9yeonu3b9-oz.webp)

### Schnellstart

Installieren Sie das Paket und initialisieren Sie den Client mit einer Liste von Knoten. Integritätsprüfungen, Wiederholungen und Failover werden automatisch verwaltet.

```javascript
import {AdamantApi} from 'adamant-api';

const api = new AdamantApi({
  nodes: [
    'https://endless.adamant.im',
    'https://clown.adamant.im',
    'https://lake.adamant.im',
  ],
  checkHealthAtStartup: true,
  minVersion: '0.10.0', // inclusive — older nodes are excluded automatically
});

api.onReady(async () => {
  const response = await api.getBlocks();
  if (response.success) {
    console.log(response.blocks);
  } else {
    console.error(response.errorMessage);
  }
});
```

### Anwendungsfälle

Sie können einen dezentralen Chatbot erstellen, der Konten in Echtzeit überwacht und auf verschlüsselte Nachrichten reagiert. Die Ende-zu-Ende-Verschlüsselung ist integriert; der Bot entschlüsselt Nachrichten mit seiner eigenen Passphrase, und der Server speichert niemals Klartext.

```javascript
import {AdamantApi, WebSocketClient, decodeMessage} from 'adamant-api';
import {config} from './config.js';

const api = new AdamantApi({nodes: config.nodes});

const ws = new WebSocketClient({
  admAddress: config.address,
  direction: 'incoming', // only messages sent *to* the bot
});
api.initSocket(ws);

ws.onMessage(async (tx) => {
  const text = decodeMessage(
    tx.asset.chat.message,
    tx.senderPublicKey,
    config.passphrase,
    tx.asset.chat.own_message,
  );

  if (text.trim() === '/ping') {
    await api.sendMessage(config.passphrase, tx.senderId, 'pong 🏓');
  }
});
```

Für einen Krypto-Trinkgeldbehälter oder Zahlungsbot können Sie auf eingehende Tokenübertragungen reagieren und Token zurücksenden. Eine einzelne WebSocket-Verbindung kann auch viele Adressen überwachen und nach Typ filtern, was nützlich für Börseneinläufe oder Buchhaltungs-Dashboards ist.

Wenn Sie ein leichtgewichtiges Multi-Coin-Wallet benötigen, können Sie BTC-, ETH-, DASH- oder DOGE-Adressen aus derselben ADAMANT-Passphrase ableiten, ohne mehrere Kryptostacks in Ihren ADM-only-Bot einzubinden. Importieren Sie genau das, was Sie benötigen, über Subpfad-Exporte, um serverlose Bundles klein zu halten.

```javascript
import {eth} from 'adamant-api/coins/eth';
import {btc} from 'adamant-api/coins/btc';

const {address: ethAddress} = eth.keys(process.env.PASSPHRASE);
const {address: btcAddress} = btc.keys(process.env.PASSPHRASE);

console.log({ethAddress, btcAddress});
```

### Migration von 2.x

Zur Migration aktualisieren Sie Node auf Version 22 oder höher in Ihrer Laufzeitumgebung und CI. Überprüfen Sie die WebSocket-Richtung und fügen Sie `direction: 'incoming'` hinzu, falls Ihre Anwendung nur eingehende Nachrichten annahm. Aktualisieren Sie die Coin-Importe auf `adamant-api/coins/*`, entfernen Sie Lisk/Klayr-Codepfade und überprüfen Sie Abfragefilter erneut auf das neue Standardverhalten mit logischem `and`, wobei `withoutDirectTransfers` durch `includeDirectTransfers` ersetzt wird. Die Signierung, Transaktions-IDs und CommonJS/ESM-Importe bleiben unverändert.
