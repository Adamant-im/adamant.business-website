---
title: "Client-WebSocket-Events für Blöcke und Salden im ADAMANT Node"
slug: "discussion-65-client-websocket-events-for-blocks-and-balances-in-adamant-node-10428016"
description: "Überblick: ADAMANT Node unterstützt jetzt zwei optionale Client-WebSocket-Funktionen: newBlock-Events für erfolgreich angewandte und gespeicherte Blöcke sowie balances/change-Events für bestätigte…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/65"
publishedAt: "2026-07-14T16:18:33Z"
author: "massivedev0"
authorUrl: "https://github.com/massivedev0"
discussionCategory: "ADM Nodes, Delegates & Pools"
cardSpan: "half"
originalId: "github-discussion:10428016"
locale: "de"
placeholder: false
---

## Überblick

ADAMANT Node unterstützt jetzt zwei optionale Client-WebSocket-Funktionen: `newBlock`-Events für erfolgreich angewandte und gespeicherte Blöcke sowie `balances/change`-Events für bestätigte `balance`- und `unconfirmedBalance`-Aktualisierungen. Die Implementierung verwendet Socket.IO anstelle einer reinen WebSocket-Verbindung. Abonnements sind auf einen einzelnen Socket beschränkt und müssen nach einer Wiederverbindung erneut hergestellt werden.

Die Implementierung behandelt [Node issue #256](https://github.com/Adamant-im/adamant/issues/256) und [Node issue #217](https://github.com/Adamant-im/adamant/issues/217), mit Dokumentation in [Adamant-im/docs#35](https://github.com/Adamant-im/docs/pull/35) und einem begleitenden OpenAPI-Vertrag in [Adamant-im/adamant-schema#48](https://github.com/Adamant-im/adamant-schema/pull/48).

## Neue Block-Events

Clients aktivieren Blockbenachrichtigungen explizit durch das Senden von `blocks: true`. Die `newBlock`-Payload enthält einen kompakten öffentlichen Header: Block-ID, Höhe, Zeitstempel, Generator-Public-Key, Transaktionsanzahl, Gesamtbetrag, Gesamtgebühr und Belohnung. Sie lässt absichtlich die Transaktionsliste, Signaturen und den Payload-Hash weg; Clients können bei Bedarf den vollständigen Block über REST anfordern.

```js
connection.emit('blocks', true);

connection.on('newBlock', (block) => {
  console.log('Applied block:', block);
});
```

Der Node gibt dieses Event erst aus, nachdem die vollständige Blockanwendungspipeline erfolgreich war und der Block gespeichert wurde. Historisches Replay und Speicher-Tabellen-Neuaufbauten erzeugen keine live-ähnlichen Block-Events.

## Saldenänderungs-Events

Die Saldenübermittlung erfordert sowohl ein Adressabonnement als auch ein explizites Feldabonnement. Die Payload enthält nur abonnierte Felder, die sich geändert haben, mit Werten als Dezimalzeichenketten in 1/10^8 ADM-Einheiten.

```js
connection.emit('address', ['U1234567890123456']);
connection.emit('balances', ['balance', 'unconfirmedBalance']);

connection.on('balances/change', (account) => {
  console.log('Balance changed:', account);
});
```

`balance` repräsentiert den bestätigten Blockchain-Zustand. `unconfirmedBalance` spiegelt auch den aktuellen unbestätigten Pool des Nodes wider und kann sich ändern, wenn Transaktionen akzeptiert, bestätigt, abgelaufen, zurückgerollt oder neu validiert werden.

## Zustellungs- und Performance-Design

Das Hauptziel war es, nützliche Events hinzuzufügen, ohne jede Kontoänderung in einen Scan aller verbundenen Sockets oder eine unnötige Datenbankabfrage zu verwandeln. Dedizierte Block- und Pro-Adresse-Saldenindizes wählen nur interessierte Sockets aus, und der Node überspringt Kontolesungen, wenn kein Abonnent die geänderte Adresse und das geänderte Feld benötigt. Blockanwendung und Rollback bündeln interne Saldenänderungen und führen eine einzige abschließende Kontolesung pro geänderter Adresse durch. Verschachtelte Batch-Unterdrückung wird verriegelt, bis der äußere Batch geschlossen wird, was eine teilweise Veröffentlichung nach einem inneren Fehler verhindert. Fehlgeschlagene Blockanwendung, fehlgeschlagener Rollback, Replay, Neuaufbau und abgeschlossene Snapshot-Kürzung unterdrücken alle nicht-dauerhaften Saldenbenachrichtigungen. Socket-Matching, Konto-Lookup und Fehler bei der individuellen Socket-Ausgabe sind von der Block-, Runden- und Kontoverarbeitung isoliert. Änderungen der Rundenbelohnung werden erst nach einer abgeschlossenen dauerhaften Rundenoperation veröffentlicht.

Diese Änderungen modifizieren keine Konsensregeln, Block- oder Transaktionsserialisierung, Signaturen, IDs, Datenbankschemata, Belohnungen, Gebühren oder das Peer-Protokollverhalten.

## Best-Effort-Event-Semantik

Diese Events sind Latenz-arme Benachrichtigungen, kein dauerhaftes Event-Log. Clients können Events während einer Trennung verpassen und müssen wichtigen Zustand über REST abgleichen. Saldenabonnements senden keinen anfänglichen Snapshot, und asynchrone Saldenlesungen können bei schnellen unabhängigen Aktualisierungen in falscher Reihenfolge abgeschlossen werden. Doppelte Transaktions- und Block-IDs werden für mindestens 60 Sekunden unterdrückt, wobei periodische Bereinigung das effektive Fenster auf etwa zwei Minuten ausdehnt. Wenn ein Block zurückgerollt und dieselbe ID innerhalb dieses Fensters erneut angewendet wird, kann die zweite Benachrichtigung unterdrückt werden.

Die aktuelle Salden-Zeichenkettendarstellung entspricht absichtlich dem REST-Verhalten; exakte Werte jenseits des JavaScript-Safe-Integer-Bereichs erfordern eine koordinierte API-weite Änderung anstelle einer reinen WebSocket-Abweichung. Es wurde keine willkürliche stille Pro-Socket-Abonnement-Obergrenze eingeführt. Die aktuelle API hat keinen Bestätigungsmechanismus für teilweise Ablehnung, daher sollte ein Ressourcenlimit ein separater konfigurierbarer und dokumentierter Vertrag mit explizitem Client-Feedback sein.

## Validierung

Die Validierung umfasste 226 bestandene funktionszielgerichtete Node-Tests, die WebSocket-, Konto-, Transaktions-, Block- und Rundenpfade abdecken, sowie gezielte Folge-Regressionstests für Snapshot-Unterdrückung und verschachteltes Batch-Verwerfen. Die breitere schnelle Unit-Suite bestand 940 Tests. Zusätzliche Prüfungen umfassten ESLint, einen produktiven VitePress-Dokumentations-Build, OpenAPI-Formatierung und Bundle-Validierung sowie echte Socket.IO-Integrationsabdeckung für Block- und Saldenübermittlung. Unzusammenhängende langlaufende Test-Suites wurden absichtlich übersprungen, da diese Funktion keine Konsensvalidierung, Serialisierung, SQL, Peer-Transport oder REST-Endpunkte verändert.
