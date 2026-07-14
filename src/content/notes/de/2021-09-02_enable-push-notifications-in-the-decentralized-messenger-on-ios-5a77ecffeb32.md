---
title: "Push-Benachrichtigungen in ADAMANT Messenger für iOS aktivieren"
slug: "enable-push-notifications-in-the-decentralized-messenger-on-ios-5a77ecffeb32"
description: "Aktivieren Sie Push-Benachrichtigungen in ADAMANT Messenger für iOS über den ADAMANT Notification Service (ANS) – erfahren Sie, wie die Verschlüsselung und Zustellung funktioniert."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/enable-push-notifications-in-the-decentralized-messenger-on-ios-5a77ecffeb32"
publishedAt: "2021-09-02T20:37:14.112Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/5a77ecffeb32/001-0-gssgbcsz1xeu5gpg.webp"
cardSpan: "full"
originalId: "medium:5a77ecffeb32"
locale: "de"
placeholder: false
---

ADAMANT Messenger für iOS kann Benutzer über neue Nachrichten benachrichtigen, auch wenn die Anwendung nicht läuft, ermöglicht durch den ADAMANT Notification Service (ANS). Der Ablauf beginnt damit, dass ein Benutzer eine verschlüsselte Signalnachricht mit einem eindeutigen Token an einen ADAMANT-Blockchain-Knoten sendet, wobei die ANS-ADAMANT-Adresse als Empfänger dient. ANS überprüft die Blockchain, um das Token des Benutzers zu entschlüsseln, und filtert Transaktionen, bei denen die ADM-Adresse des Benutzers der Empfänger ist. Anschließend fordert ANS den Apple Push Notification Service (APNS) auf, diese Transaktionen – die verschlüsselte Nachrichten enthalten – an das durch das eindeutige Token bestimmte Gerät des Benutzers zu übermitteln. Schließlich benachrichtigt APNS das Gerät, und die Messenger-App nutzt ihren geheimen Schlüssel (Passphrase), um die Nachrichten zu entschlüsseln.

Diese Architektur stellt sicher, dass das Gerät des Benutzers niemals direkt mit ANS kommuniziert, sodass ANS weder die IP-Adresse noch andere Identitäten des Geräts kennt. Die Kommunikation erfolgt ausschließlich über Blockchain-Knoten. Um Push-Benachrichtigungen in der App zu aktivieren, müssen Benutzer die Option „Angemeldet bleiben“ aktivieren und einen Push-Benachrichtigungstyp auswählen.
