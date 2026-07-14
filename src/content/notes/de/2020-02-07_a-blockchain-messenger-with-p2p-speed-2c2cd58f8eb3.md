---
title: "Ein Blockchain-Messenger mit P2P-Geschwindigkeit"
slug: "a-blockchain-messenger-with-p2p-speed-2c2cd58f8eb3"
description: "ADAMANT PWA Version 2.4.0 unterstützt WebSockets und erhöht die Nachrichtengeschwindigkeit deutlich, um mit klassischen P2P-Messengern konkurrieren zu können."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/a-blockchain-messenger-with-p2p-speed-2c2cd58f8eb3"
publishedAt: "2020-02-07T03:03:50.348Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/2c2cd58f8eb3/001-0-nhjz84euai2uyek8-png.webp"
cardSpan: "full"
originalId: "medium:2c2cd58f8eb3"
locale: "de"
placeholder: false
---

ADAMANT PWA Version 2.4.0 unterstützt nun WebSockets, wodurch die Nachrichtengeschwindigkeit deutlich erhöht wird und mit klassischen P2P-Messengern konkurrieren kann. WebSockets ermöglichen den sofortigen Datenaustausch zwischen einem Knoten und der Messaging-App und benachrichtigen Benutzer unverzüglich über neue Ereignisse und unbestätigte Transaktionen.

Wenn eine Nachricht gesendet wird, wird sie zunächst von einem einzelnen Knoten empfangen und innerhalb eines Bruchteils einer Sekunde mit dem Status „Zugestellt an einen Knoten“ ✔ angezeigt, was bedeutet, dass der Empfänger sie bereits erhalten hat. Die Nachricht wird anschließend von anderen Knoten im dezentralen Netzwerk verifiziert, wodurch die Sicherheitsvorteile eines Blockchain-Messengers gewährleistet werden. Sobald die Nachricht verifiziert und in einen neuen Block aufgenommen wurde, ändert sich der Status auf „Auf der Blockchain gespeichert“ ⚭. Dieser Verifizierungsprozess dauert einige Sekunden.

Derzeit kommunizieren Knoten mit einer leichten Verzögerung untereinander. Wenn beide Benutzer mit demselben Knoten verbunden sind, werden Nachrichten sofort zugestellt. Wenn sie mit verschiedenen Knoten verbunden sind, kann die Zustellung einige Sekunden dauern. Benutzer können dies testen, indem sie in den Einstellungen zur Liste der Knoten navigieren und alle Knoten bis auf einen deaktivieren.

![Ein Blockchain-Messenger mit P2P-Geschwindigkeit](/images/engineering-notes/medium/2c2cd58f8eb3/002-0-7eq9vdfgyflcuptg-png.webp)

Zukünftige Updates werden unterstützte Verbindungen zwischen Sockets und Knoten hinzufügen, um Verzögerungen unabhängig davon zu eliminieren, mit welchen Knoten Benutzer verbunden sind. Neben der WebSocket-Unterstützung und den neuen Blockchain-Statusindikatoren enthält Version 2.4.0 auch die Unterstützung für das Resfinex-Token (RES), einen aktualisierten Namen und ein aktualisiertes Logo für Stably Dollar (USDS) sowie verschiedene Anpassungen der Benutzeroberfläche, wie beispielsweise einen überarbeiteten Dialog zum Kaufen und Verkaufen von Token und eine angepasste Höhe des Menüs zum Senden von Token. Die Veröffentlichung führt außerdem eine Validierung von BTC-Adressen ein und behebt Probleme beim Einfügen von Adressen aus der Zwischenablage sowie beim Senden negativer Beträge.
