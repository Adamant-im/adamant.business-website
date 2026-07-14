---
title: "ADAMANT Messenger Sicherheitsfunktionen"
slug: "adamant-messenger-security-features-e7cc836ff52c"
description: "ADAMANT ist ein privater Messenger, der vollständig auf einer Blockchain basiert. Durch die Speicherung jeder Nachricht als On-Chain-Transaktion werden Sicherheitslücken typischer P2P- und zentralisierter Messenger behoben."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-security-features-e7cc836ff52c"
publishedAt: "2018-08-21T13:14:09.919Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/e7cc836ff52c/001-0-ed-frrpe89f-d93u.webp"
cardSpan: "full"
originalId: "medium:e7cc836ff52c"
locale: "de"
placeholder: false
---

ADAMANT ist ein privater Messenger, der vollständig auf einer Blockchain basiert. Durch die Speicherung jeder Nachricht als On-Chain-Transaktion werden Sicherheitslücken typischer sowohl von Peer-to-Peer- als auch zentralisierter Messenger behoben und ein anderer Vertrauensmodell für private Kommunikation angeboten.

## Verschlüsselung und Signierung

Jede Nachricht ist eine Blockchain-Transaktion, die mit Ed25519 EdDSA, Curve25519, Salsa20 und Poly1305 verschlüsselt und signiert wird. Nachrichten werden auf dem Gerät des Absenders verschlüsselt und auf dem Gerät des Empfängers entschlüsselt. Die Client-App überträgt niemals den privaten Schlüssel oder die mnemonische Passphrase eines Benutzers über das Netzwerk; alle kryptografischen Operationen werden lokal durchgeführt.

Da jedes Konto durch seinen öffentlichen Schlüssel in der Blockchain identifiziert wird, sind die Authentizität von Absender und Empfänger überprüfbar. Man-in-the-Middle-Angriffe sind erkennbar: Wenn ein Angreifer Nachrichten abfängt und weiterleitet, stimmt die Absender-ID nicht mit dem erwarteten öffentlichen Schlüssel überein, wodurch die Abhörung offengelegt wird.

## Blockchain als Nachrichtenspeicher

Die Blockchain fungiert als redundante, zuverlässige Speicherschicht für den Nachrichtenverlauf. Nachrichten können nach der Bestätigung weder nachträglich datiert noch verändert werden, und die Zustellung wird sowohl signiert als auch vom Netzwerk bestätigt. Der Nachrichtenverlauf wird niemals auf dem lokalen Gerät des Benutzers gespeichert, sondern bei Bedarf direkt aus der Blockchain geladen. Das bedeutet auch, dass ein Benutzer seinen vollständigen Nachrichtenverlauf von jedem Gerät aus abrufen kann, ähnlich wie bei einem zentralisierten Speichermodell, jedoch ohne dass eine zentrale Instanz die Daten kontrolliert.

## Dezentrale Architektur

ADAMANT läuft auf einem dezentralen Netzwerk von Blockchain-Knoten, die von Benutzern betrieben werden. Keine zentrale Instanz kann den Dienst deaktivieren, pausieren oder blockieren. Konten können von niemandem gesperrt oder eingeschränkt werden, auch nicht von den Entwicklern des Projekts. Die Entwickler haben keine Kontrolle über die Aktionen der Benutzer im Netzwerk.

## Datenschutz und Anonymität

Im Gegensatz zu P2P-Messengern, bei denen die IP-Adresse eines Peers sichtbar sein kann, werden alle ADAMANT-Kommunikationen über Blockchain-Knoten geleitet, wodurch es unmöglich ist, die IP-Adresse eines Benutzers direkt zu ermitteln. Dies ist konzeptionell vergleichbar mit der Weiterleitung über ein Tor-Netzwerk.

Der Messenger fordert keinen Zugriff auf das Adressbuch, den Standort oder andere Gerätedaten des Benutzers an. Zur Kontoerstellung oder Wiederherstellung ist keine Telefonnummer erforderlich, wodurch SMS-Abhörung als Angriffsvektor entfällt. Konten können innerhalb von Sekunden erstellt werden, und Benutzer können jederzeit sowohl ihre UID als auch ihre Verschlüsselungsschlüssel ändern. Keine persönliche Identifikation ist erforderlich.

## Open Source

ADAMANT ist vollständig Open Source, sodass unabhängige Überprüfungen der Client-Anwendungen und der Knotensoftware möglich sind.

![ADAMANT Messenger Sicherheitsfunktionen](/images/engineering-notes/medium/e7cc836ff52c/002-0-qtvvnsefdgux9haq.webp)
