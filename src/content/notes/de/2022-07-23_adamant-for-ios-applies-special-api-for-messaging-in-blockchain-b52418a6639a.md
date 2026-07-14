---
title: "ADAMANT für iOS übernimmt Chatrooms-API für schnellere Blockchain-Nachrichten"
slug: "adamant-for-ios-applies-special-api-for-messaging-in-blockchain-b52418a6639a"
description: "ADAMANT für iOS unterstützt jetzt die Chatrooms-API, wodurch die Ladezeiten für Nachrichten um bis zu das 50-Fache reduziert werden. Die Verbesserung ist direkt nach dem Login spürbar."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-for-ios-applies-special-api-for-messaging-in-blockchain-b52418a6639a"
publishedAt: "2022-07-23T13:24:47.800Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
cardSpan: "full"
originalId: "medium:b52418a6639a"
locale: "de"
placeholder: false
---

ADAMANT für iOS unterstützt jetzt die Chatrooms API für Blockchain-Nachrichten und beschleunigt die Ladezeiten für Nachrichten um bis zu das 50-Fache. Diese Verbesserung ist unmittelbar nach dem Anmelden an einem ADM-Konto spürbar. Desktop-Anwendungen haben diese API bereits zuvor implementiert.

Die Chatrooms API bietet zwei Hauptendpunkte. Der erste, `/api/chatrooms/U000000000000`, ruft die Chatliste für ein bestimmtes Konto ab. Der zweite, `/api/chatrooms/U000000000000/U000000000001`, lädt den Nachrichtenverlauf zwischen zwei spezifischen Konten. Zur Optimierung des Datenverkehrs unterstützt die API Pagination. Weitere technische Details sind in AIP 14 verfügbar.

Version 2.5.0 der iOS-Anwendung enthält neben der Integration der Chatrooms API auch schnellere Abfragen der Kursdaten, allgemeine Leistungsverbesserungen, Optimierungen für MacBook M1 sowie diverse Fehlerbehebungen.
