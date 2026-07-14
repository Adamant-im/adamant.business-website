---
title: "Überblick zur Verschlüsselung in ADAMANT Messenger"
slug: "encryption-overview-in-adamant-messenger-878ecec1ff78"
description: "ADAMANT verwendet etablierte kryptografische Algorithmen wie Bitcoin, Ethereum und Signal. Die Blockchain garantiert Dezentralisierung, Anonymität und Nachrichtenintegrität."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/encryption-overview-in-adamant-messenger-878ecec1ff78"
publishedAt: "2021-02-20T08:36:23.523Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/878ecec1ff78/001-1-z7yxhckijxqq1g7m-pnbq-png.webp"
cardSpan: "full"
originalId: "medium:878ecec1ff78"
locale: "de"
placeholder: false
---

ADAMANT basiert auf denselben bewährten kryptografischen Algorithmen, die auch von Bitcoin, Ethereum, Signal, Tor, OpenSSH und vielen anderen verwendet werden. Kryptografie ist von Natur aus konservativ, und jeder Cipher muss den Test der Zeit bestehen. Was ADAMANT auszeichnet, ist, dass die Blockchain selbst Dezentralisierung, Anonymität über Pseudonymität, Nachrichtenintegrität und -reihenfolge, permanente Speicherung, zuverlässige Zustellung und Widerstandsfähigkeit gegen Man-in-the-Middle-Angriffe garantiert. Nachrichten und Transaktionen werden von jedem Knoten im Netzwerk verifiziert, nicht vom Empfänger oder einer zentralen Instanz. Die Kosten dieser Dezentralisierung sind Transaktionsgebühren, die die Betreiber der Knoten entschädigen.

### Konto und Schlüsselpaar

Ein ADAMANT-Konto beginnt mit einer BIP39-Mnemonik aus 12 Wörtern, die etwa 132 Bit Entropie über rund 2048¹² mögliche Kombinationen bietet. Der BIP39-Seed wird mit SHA-256 gehasht, um einen 256-Bit-Wert zu erzeugen, aus dem Ed25519-Digitalsignaturschlüssel abgeleitet werden: ein 256-Bit-öffentlicher Schlüssel und ein 512-Bit-privater Schlüssel. Dies bietet eine Sicherheit, die RSA mit ~3000-Bit-Schlüsseln oder starken 128-Bit-Blockchiffren vergleichbar ist. Die vom Nutzer sichtbare ADM-Adresse besteht aus einem 'U' gefolgt von 8 Bytes des SHA-256-Hashes des öffentlichen Schlüssels und ergibt somit eine 64-Bit-Kennung. Der Ed25519-öffentliche Schlüssel wird mit der ersten ausgehenden Transaktion des Nutzers in der Blockchain veröffentlicht.

### Nachrichtenverschlüsselung

Für die verschlüsselte Kommunikation werden die Ed25519-Signaturschlüssel des Nutzers in Curve25519-Diffie-Hellman-Schlüssel umgewandelt – einen 256-Bit-öffentlichen Schlüssel und einen 256-Bit-geheimen Schlüssel –, wodurch eine asymmetrische Verschlüsselung zwischen den Parteien ermöglicht wird. Nachrichten werden mit dem Curve25519-XSalsa20-Poly1305-Chiffre (NaCl.box) verschlüsselt, der XSalsa20 mit einem 192-Bit-Nonce und Poly1305 für authentifizierte Verschlüsselung verwendet, um sowohl die Datenintegrität als auch die Nachrichtenauthentizität zu überprüfen.

### Schlüssel-Wert-Speicher (KVS)

Für den Schlüssel-Wert-Speicher werden die Ed25519-Signaturschlüssel des Nutzers verwendet, um einen XSalsa20-Poly1305-Geheimschlüssel abzuleiten. Die Daten werden in ein JSON-Objekt serialisiert, dem Rauschen hinzugefügt wird, und anschließend mit NaCl.secretbox verschlüsselt, wobei erneut XSalsa20 mit einem 192-Bit-Nonce und Poly1305 für Integritäts- und Authentizitätsprüfung verwendet wird.

### Transaktionssignaturen

Transaktionsdaten – einschließlich Zeitstempel und verschlüsselter Nachrichten – werden mit SHA-256 gehasht. Der Absender signiert diesen Hash mit Ed25519 unter Verwendung seines 256-Bit-öffentlichen Schlüssels und 512-Bit-privaten Schlüssels. Die Transaktions-ID besteht aus 8 Bytes des SHA-256-Hashes der resultierenden Signatur.

Detaillierte technische Referenzen zur Schlüsselerzeugung, Nachrichtenverschlüsselung/Entschlüsselung und Transaktionssignierung sind im ADAMANT-Projekt-Wiki auf GitHub verfügbar.

### Blockchain-Speicherung und Quantencomputer

Einige Nutzer befürchten, dass die permanente Speicherung verschlüsselter Nachrichten in der Blockchain eine zukünftige Schwachstelle darstellt: Könnten, sobald Quantencomputer ausgereift sind, alle gespeicherten Kommunikationsinhalte rückwirkend entschlüsselt werden?

Diese Sorge betrifft nicht nur ADAMANT. Die Quantenkryptanalyse bedroht die gesamte IT-Landschaft – staatliche Geheimnisse, Internetverkehr, gespeicherte Daten –, da praktisch alle modernen Systeme auf derselben Familie kryptografischer Primitive basieren. Massenüberwachungsprogramme wie PRISM erfassen und speichern bereits heute Datenverkehr, sodass heute abgefangene verschlüsselte Daten unabhängig von der Plattform von zukünftigen kryptanalytischen Fortschritten betroffen sein könnten.

Quantenkryptanalyse ist kein Allheilmittel. Sie bietet theoretische Geschwindigkeitsvorteile für bestimmte Probleme, aber aktuelle Chiffren verfügen über erhebliche Sicherheitsmargen, die diese Vorteile in der Praxis unwirksam machen könnten. Außerdem kann ein Angreifer nicht einfach eine gesamte Blockchain massenhaft entschlüsseln; jedes Konto verwendet unterschiedliche Verschlüsselungsschlüssel, sodass der Aufwand pro Konto betrieben werden muss. Da ADAMANT-Konten anonym sind, müsste ein Angreifer zunächst identifizieren, welche Konten es wert sind, angegriffen zu werden.

Praktische Quantenkryptanalyse liegt wahrscheinlich Jahrzehnte in der Zukunft, und die dominierende Bedrohung für die Kryptografie in dieser Zeit könnte sich als etwas anderes als Quantencomputer erweisen. Falls post-quantenresistente Algorithmen notwendig werden, kann ADAMANT seine Kryptografie anpassen – genauso wie andere Messenger und Protokolle auch.

Zur operativen Sicherheit eignet sich ADAMANT am besten für einmalige oder kurzfristige Kommunikation mit häufigem Kontowechsel. Die Erstellung eines neuen Kontos dauert etwa eine Sekunde, wodurch das Rotieren von Identitäten praktikabel wird und der Wert eines einzelnen kompromittierten Kontos begrenzt bleibt.
