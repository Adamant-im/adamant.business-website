---
title: "ADAMANT Messenger: Sichere ETH-Übertragungen"
slug: "adamant-messenger-secure-eth-transfers-b27984a3ce05"
description: "ADAMANT unterstützt nun integrierte Ethereum-Wallets und Übertragungen innerhalb der privaten Messaging-Plattform. Die Funktion ermöglicht vollständig vertrauenslose Kryptowährungsübertragungen…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-messenger-secure-eth-transfers-b27984a3ce05"
publishedAt: "2018-06-07T07:30:57.792Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/b27984a3ce05/001-0-0qs-wuvvdq6a0uk2.webp"
cardSpan: "full"
originalId: "medium:b27984a3ce05"
locale: "de"
placeholder: false
---

ADAMANT hat die Unterstützung für integrierte Ethereum (ETH)-Wallets und Übertragungen in seiner privaten Messaging-Plattform hinzugefügt. Die Funktion ermöglicht vollständig vertrauenslose Kryptowährungsübertragungen innerhalb des Chat-Systems, ohne Dritte oder Zwischenhändler. Dies funktioniert ähnlich wie die Open-Source-Client-Anwendung MyEtherWallet: Nutzer verwalten ihre eigenen privaten Schlüssel, und jede Transaktion wird clientseitig signiert, bevor sie verschlüsselt an einen Ethereum-Knoten gesendet wird.

Wenn ein Nutzer über das ADAMANT-Netzwerk ETH sendet, wird ein privater Schlüssel aus demselben ADAMANT-Wallet-Passwort abgeleitet, das auch für den Zugriff auf den Messenger verwendet wird. Das bedeutet, dass das ADAMANT-Passwort der einzige Schlüssel zu allen verknüpften Kryptowährungswallets ist, wodurch sichere Passwortspeicherung entscheidend wichtig wird. ADAMANT kann keine Gelder wiederherstellen oder Konten sperren, falls ein Passwort verloren geht oder durch Phishing kompromittiert wird.

![ADAMANT Messenger: Sichere ETH-Übertragungen](/images/engineering-notes/medium/b27984a3ce05/002-0-zzoel-pond1fmpkh.webp)

Derzeit werden separate Ethereum-Knoten mit spezialisierten Datenbankindizes zur Abrufung des Transaktionsverlaufs entwickelt. Nutzer, die der ADAMANT-Infrastruktur nicht vertrauen möchten, können ihren eigenen Ethereum-Knoten mit solchen Indizes betreiben und diesen in der Anwendung auswählen. Der gesamte ADAMANT-Quellcode ist öffentlich auf GitHub verfügbar.

Wenn ein Nutzer ein ADAMANT-Konto erstellt, wird eine Ethereum-Adresse generiert, und die Blockchain speichert einen öffentlichen Eintrag im KVS, um den Besitz nachzuweisen. Das Konto muss mehr als 0,001 ADM halten, um diese Transaktion aufzeichnen zu können. Sobald der Eintrag erfolgt ist, kann jeder in einem Chat die ETH-Adresse über die Blockchain abrufen, um eine Zahlung zu senden – es ist nicht mehr nötig, die Adresse separat anzufordern.

Ein wichtiger Aspekt bezüglich Datenschutz: Die ETH-Adresse ist öffentlich auf der Blockchain sichtbar, und jeder kann sehen, dass eine bestimmte ADAMANT-Adresse mit einer spezifischen ETH-Adresse verknüpft ist. Obwohl dies nicht mit einer realen Identität verknüpft werden kann, sollten Nutzer, die auf Anonymität Wert legen, ihre ADAMANT-Adresse nicht öffentlich teilen. Nutzer behalten die vollständige Kontrolle über ihre ETH-Wallet und können Gelder an jede andere Ethereum-Wallet überweisen, wobei die üblichen Ethereum-Gas-Gebühren anfallen.
