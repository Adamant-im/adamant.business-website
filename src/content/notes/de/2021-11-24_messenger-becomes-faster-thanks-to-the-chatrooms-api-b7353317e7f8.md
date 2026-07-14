---
title: "Messenger wird durch die Chatrooms-API schneller"
slug: "messenger-becomes-faster-thanks-to-the-chatrooms-api-b7353317e7f8"
description: "Die Chatrooms-API beschleunigt das Laden von Nachrichten im ADAMANT Messenger erheblich und senkt den Speicher- und CPU-Verbrauch."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/messenger-becomes-faster-thanks-to-the-chatrooms-api-b7353317e7f8"
publishedAt: "2021-11-24T14:07:09.171Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/b7353317e7f8/001-0-tot3wyqtwfswo3kx.webp"
cardSpan: "full"
originalId: "medium:b7353317e7f8"
locale: "de"
placeholder: false
---

ADAMANT behandelt jede Nachricht als Blockchain-Transaktion, was die Privatsphäre und Sicherheit erhöht, aber Herausforderungen für Geschwindigkeit und Nachrichtenabruf mit sich bringt. Herkömmliche Blockchain-APIs erforderten das Abrufen aller Transaktionen, um den Nachrichtenverkehr anzuzeigen. Die neue Chatrooms-API, speziell für Instant-Messenger entwickelt, macht das Laden von Nachrichten bis zu zehnmal effizienter und reduziert gleichzeitig den Speicher- und CPU-Verbrauch.

![Messenger wird durch die Chatrooms-API schneller](/images/engineering-notes/medium/b7353317e7f8/002-0-g1gbxwpdnkihcskz.webp)

In der Praxis dauerte das Laden eines Kontos mit der vorherigen Version 25 Sekunden und verbrauchte 80 MB Speicher. Mit der neuen Version dauert das Laden 3 Sekunden und verbraucht 28 MB Speicher – eine achtfache Steigerung der Geschwindigkeit. Der Leistungsgewinn steigt mit der Anzahl der Nachrichten, die ein Konto enthält.

Chatrooms bietet zwei Endpunkte: `/api/chatrooms/U000000000000` und `/api/chatrooms/U000000000000/U000000000001`. Der erste ruft eine Chatliste für ein bestimmtes Konto ab, der zweite die Nachrichten zwischen zwei Konten. Die Paginierung wird unterstützt, um die Datenübertragung zu minimieren, wie in AIP 14 beschrieben. Diese Endpunkte können von jeder Anwendung genutzt werden, einschließlich Messenger oder Bots.

Zur Unterstützung wurden die Knoten aktualisiert, um die neuen Anfragearten verarbeiten zu können. Im Gegensatz zur vorherigen Version, die alle Nachrichten gleichzeitig für die Offline-Anzeige herunterlud, lädt die Chatrooms-API Nachrichten bedarfsgerecht herunter und erfordert eine Internetverbindung.

Die Version v3.0.0 führt die Chatrooms-API neben mehreren anderen Updates ein. Sie ersetzt den HTTP-Knoten, entfernt die Resfinex-Börse und das RES-Token und implementiert eine Problemumgehung für einen Lisk-Service-`includePending`-Fehler. Weitere Korrekturen beheben die `background-color`-Einstellung des hellen/dunklen Themes, beenden eine Endlosschleife in der ADM-Transaktionsliste und aktualisieren Abhängigkeiten.
