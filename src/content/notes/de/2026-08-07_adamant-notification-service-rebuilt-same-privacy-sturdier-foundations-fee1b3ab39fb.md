---
title: "Der ADAMANT Notification Service wurde neu aufgebaut: Gleiche Privatsphäre, stabilere Basis"
slug: "adamant-notification-service-rebuilt-same-privacy-sturdier-foundations-fee1b3ab39fb"
description: "Der ADAMANT Notification Service (ANS) hat sein größtes Update seit 2019 erhalten und behält sein Zero-Knowledge-Push-Benachrichtigungsmodell für iOS-Nutzer bei."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-notification-service-rebuilt-same-privacy-sturdier-foundations-fee1b3ab39fb"
publishedAt: "2026-08-07T14:48:47.463Z"
author: "Sab Kabadas"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:fee1b3ab39fb"
coverImage: "/images/engineering-notes/medium/fee1b3ab39fb/001-50da4f2353.webp"
locale: "de"
placeholder: false
---

Der ADAMANT Notification Service (ANS) hat sein bisher größtes Update seit 2019 erhalten. Dabei wurde die zugrunde liegende Infrastruktur vollständig neu aufgebaut, während das Zero-Knowledge-Modell für Push-Benachrichtigungen auf iOS-Geräten beibehalten wurde. Für iPhone-Nutzer des ADAMANT Messenger arbeitet der ANS unbemerkt im Hintergrund und benachrichtigt das Gerät über neue Nachrichten, ohne die Privatsphäre zu gefährden.

Die meisten Messaging-Apps stehen vor dem Problem, dass Push-Benachrichtigungen erfordern, dass eine Systemkomponente die Nachrichtendetails kennt. Der ANS umgeht dies, indem er die öffentliche ADAMANT-Blockchain nach Transaktionen abfragt, die an ein registriertes Gerät adressiert sind. Sobald eine Transaktion erkannt wird, fordert der Dienst Apple dazu auf, das Gerät unter Verwendung einer reinen Transaktions-ID zu benachrichtigen. Der ANS kann weder den Inhalt der Transaktion lesen noch entschlüsselte Inhalte in das Push-Payload aufnehmen, da die Entschlüsselung einen geheimen Schlüssel erfordert, der ausschließlich auf dem Gerät des Nutzers gespeichert ist. Weder der ANS noch Apple können die Konversation rekonstruieren.

Während dieses Datenschutzmodell unverändert bleibt, wurden die zugrunde liegende Laufzeitumgebung und die Zuverlässigkeitsmechanismen erheblich gestärkt. Der ANS läuft nun unter .NET 8 und ersetzt damit eine Laufzeitversion, deren Support eingestellt wurde. Dies ermöglicht es dem Dienst, nativ auf aktuellen Server-Betriebssystemen zu laufen, ohne auf veraltete Kompatibilitätsschichten angewiesen zu sein.

Zusätzlich wurde ein Leck bei der Netzwerkverbindung behoben, das sich im Laufe der Zeit aufstaute und regelmäßige Neustarts des Dienstes erforderte; Verbindungen werden nun ordnungsgemäß wiederverwendet. Der Dienst implementiert zudem ein echtes Failover für die Kommunikation mit Blockchain-Nodes. Zuvor konnte ein einzelner nicht erreichbarer Node die gesamte Benachrichtigungspipeline unterbrechen. Der ANS führt nun automatisch Wiederholungsversuche über einen anderen Node durch und nutzt dabei die dezentrale Resilienz des ADAMANT-Netzwerks.

Dieses Wartungs-Release wurde unabhängig von cryptofoundry sicherheitsgeprüft. Durch die Modernisierung der Laufzeitumgebung und die Behebung grundlegender Infrastrukturprobleme stellt ADAMANT sicher, dass der ANS auch in den kommenden Jahren zuverlässig zeitnahe Zero-Knowledge-Benachrichtigungen liefern kann.
