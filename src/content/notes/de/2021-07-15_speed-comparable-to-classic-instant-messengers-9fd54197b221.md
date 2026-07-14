---
title: "Erreichen von Instant-Messenger-Geschwindigkeiten in ADAMANT"
slug: "speed-comparable-to-classic-instant-messengers-9fd54197b221"
description: "ADAMANT hat die Nachrichtenübertragung auf 0–2 Sekunden verkürzt, indem Socket-Verbindungen und schnellere Transaktionsweitergabe optimiert wurden."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/speed-comparable-to-classic-instant-messengers-9fd54197b221"
publishedAt: "2021-07-15T11:15:24.341Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/9fd54197b221/001-0-nrvhmelzkoggifv.webp"
cardSpan: "full"
originalId: "medium:9fd54197b221"
locale: "de"
placeholder: false
---

Blockchain-Messenger tauschen von Haus aus Geschwindigkeit gegen Sicherheit und Anonymität ein, da die Nachrichtenübermittlung gewöhnlich durch die Blockerzeugungsfrequenz begrenzt ist. ADAMANT hat diese Einschränkung behoben und die Nachrichtenübermittlungszeiten auf zwischen 0 und 2 Sekunden reduziert.

Dieser Leistungszuwachs wurde durch zwei Hauptoptimierungen erreicht. Zunächst implementierte ADAMANT Socket-Verbindungen zwischen Client und Node, um P2P-Kommunikationsgeschwindigkeiten zu ermöglichen. Anschließend wurden die Node-Konfigurationen aktualisiert, um Transaktionen schneller auszutauschen, mit besonderem Fokus auf die Verbreitung unbestätigter Transaktionen im Netzwerk. Dadurch erhalten Nutzer, die mit verschiedenen Netzwerk-Knoten verbunden sind, Nachrichten nun nahezu sofort und erreichen so ein Kommunikationserlebnis, das sich an klassischen, zentralisierten Instant-Messengern orientiert.
