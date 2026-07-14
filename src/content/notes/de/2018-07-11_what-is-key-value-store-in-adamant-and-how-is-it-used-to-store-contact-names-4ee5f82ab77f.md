---
title: "Key-Value Store in ADAMANT: Speicherung von Kontaktnamen auf der Blockchain"
slug: "what-is-key-value-store-in-adamant-and-how-is-it-used-to-store-contact-names-4ee5f82ab77f"
description: "ADAMANT führte einen Key-Value Store (KVS) zur Speicherung von Kontaktinformationen auf der Blockchain ein, implementiert in ADAMANT Blockchain Version 0.2.0. KVS unterstützt öffentliche und private Daten."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/what-is-key-value-store-in-adamant-and-how-is-it-used-to-store-contact-names-4ee5f82ab77f"
publishedAt: "2018-07-11T07:10:16.055Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/4ee5f82ab77f/001-0-tvpp-oomdjax-ek8.webp"
cardSpan: "full"
originalId: "medium:4ee5f82ab77f"
locale: "de"
placeholder: false
---

ADAMANT führte einen Key-Value-Store (KVS) zur Speicherung von Kontaktinformationen auf der Blockchain ein, implementiert in ADAMANT Blockchain Version 0.2.0. KVS unterstützt sowohl öffentliche als auch private Datenspeicherung. Öffentliche Beispiele umfassen Ethereum-Adressen, während private Beispiele Adressbücher sind.

Private KVS-Transaktionen werden zusammen mit anderen Transaktionstypen auf der Blockchain gespeichert, sind jedoch nur für ihre Besitzer zugänglich. Der Inhalt der Transaktion wird mithilfe eines Hashs aus dem privaten Schlüssel des Besitzers und einem zusätzlichen Salt verschlüsselt, um die Sicherheit zu erhöhen. Alle technischen Details sind in [AIP-3](https://aips.adamant.im/AIPS/aip-3) beschrieben.

ADAMANT verwendet ein inkrementelles Speicherkonzept, d. h., die Client-Anwendung überträgt nur Änderungen am Adressbuch und nicht das gesamte Adressbuch. Dies ist besonders wichtig bei der Speicherung auf Basis einer Blockchain, bei der die Größe der Daten auf der Kette minimiert werden sollte. Jeder Schlüssel (Key) wird einem bestimmten Wert zugeordnet – beispielsweise wird eine ADAMANT-Adresse eines Kontakts (wie `U324242353425354`) einem Anzeigenamen (wie „John“) zugeordnet.

Die Webanwendung von ADAMANT Messenger wurde aktualisiert, um diese Funktion zu unterstützen. Nutzer können einen Kontakt umbenennen, indem sie auf die Überschrift klicken, die die ADAMANT-Adresse innerhalb eines Chats enthält.

![Key-Value Store in ADAMANT](/images/engineering-notes/medium/4ee5f82ab77f/002-0-xzokd2tzoxh9eqk2.webp)

Die Unterstützung für Adressbücher ist in zukünftigen Versionen der iOS- und Android-Anwendungen geplant.
