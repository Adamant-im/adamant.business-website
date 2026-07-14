---
title: "ADAMANT Node v0.6.0 Update"
slug: "adamant-node-v-0-6-0-update-688bbdb30e19"
description: "Ein dezentraler Messenger basiert auf zwei Komponenten: dem Blockchain-System und den Client-Anwendungen. Die Blockchain wird von Netzwerkknoten gepflegt, die Daten bereitstellen und Anfragen verarbeiten."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-node-v-0-6-0-update-688bbdb30e19"
publishedAt: "2020-02-17T09:23:50.372Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/688bbdb30e19/001-1-fmo2vlyn2yehfv84inqtmq-png.webp"
cardSpan: "full"
originalId: "medium:688bbdb30e19"
locale: "de"
placeholder: false
---

Ein dezentraler Messenger basiert auf zwei Komponenten: dem Blockchain-System und den Client-Anwendungen. Die Blockchain wird von Netzwerkknoten gepflegt, die Daten an Anwendungen liefern und eingehende Anfragen verarbeiten. ADAMANT hat die Knotensoftwareversion 0.6.0 veröffentlicht, verfügbar auf der GitHub-Releases-Seite des Projekts.

Diese Version verbessert die Socket-Verbindungen und die Transaktions-API. Socket-Verbindungen geben nun `recipientPublicKey` zurück, und die Endpunkte der Transaktions-API – einschließlich KVS und Chats – enthalten jetzt ein `block_timestamp`-Feld in ihren Antworten. Der Endpunkt `/states/get/` wurde erweitert, um die Parameter `SenderIds` und `keyIds` sowie POST-Anfragen zu unterstützen. Die Veröffentlichung enthält außerdem eine Korrektur für Migrationen und einen aktualisierten Dokumentationssatz.

Das Update ist für alle Knotenbetreiber nicht zwingend erforderlich. Knoten, die eine Verbindung zu Messenger-Anwendungen herstellen müssen, sollten jedoch auf die neueste Version aktualisiert werden.
