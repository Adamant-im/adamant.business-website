---
title: "Dezentrale Kommunikation braucht Zeit"
slug: "decentralized-messaging-needs-a-time-d5af2289041c"
description: "von Aleksei Lebedev, Gründer von ADAMANT Messenger. Datenschutzverletzungen sind alltäglich, doch dezentrale Messenger verlangen Verantwortung."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/decentralized-messaging-needs-a-time-d5af2289041c"
publishedAt: "2020-04-06T10:21:32.885Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/d5af2289041c/001-0-cubdo3cy7xzrqg2m.webp"
cardSpan: "full"
originalId: "medium:d5af2289041c"
locale: "de"
placeholder: false
---

*von Aleksei Lebedev, Gründer von ADAMANT Messenger*

Datenschutzverletzungen sind alltäglich geworden, während Technologie immer tiefer in das tägliche Leben eindringt. Messaging ist eine der häufigsten Formen der Online-Kommunikation, doch nur wenige Nutzer denken kritisch darüber nach, wohin ihre Daten wandern, nachdem sie auf „Senden“ geklickt haben. Beliebte Messenger werden von großen Konzernen betrieben, die so viele persönliche Informationen wie möglich sammeln – Kontakte, App-Nutzung, Transaktionen und sogar Daten, die andere über einen bereitstellen. Diese Daten werden auf zentralen Servern gespeichert, die regelmäßig gehackt werden, was beweist, dass selbst die größten Unternehmen keine Sicherheit garantieren können.

### Wem kann man vertrauen

Die kurze Antwort: Niemandem. Signal, oft als sicherer Messenger angepriesen, identifiziert Nutzer weiterhin über Telefonnummern. Genau deshalb existieren Bitcoin und dezentrale Anwendungen – um in einer vertrauensfreien Umgebung zu funktionieren. Die Blockchain-Technologie ermöglicht ein Design, bei dem Sicherheit und Vertrauenswürdigkeit überprüfbar sind, ohne dass man den zugrundeliegenden Code verstehen muss.

Nach drei Jahren Entwicklung hat ADAMANT sein Konzept eines dezentralen Blockchain-Messengers bestätigt, mit Apps für iOS, Web PWA, Windows, GNU/Linux, macOS und Android.

### Der Prototyp

Die Blockchain ermöglicht die Erstellung von Konten innerhalb von Sekunden, ohne Anmeldedaten wie Telefonnummern oder E-Mails. Nutzer können Konten frei wechseln, ohne Spuren zu hinterlassen, dass diese Konten jemals ihnen gehörten. IP-Adressen sind verborgen und Standorte nicht nachvollziehbar, da alle Daten über verteilte Knotenpunkte geroutet werden, und die Apps haben keinen Zugriff auf das Adressbuch. Es gibt keine zentrale Instanz, die die Authentizität von Nachrichten prüft – dies wird von einem verteilten, konsensbasierten Host-System übernommen, das den Nutzern gehört. Zensur ist unmöglich: Konten können nicht gesperrt und Nachrichten nicht gelöscht werden.

![Dezentrale Kommunikation braucht Zeit](/images/engineering-notes/medium/d5af2289041c/002-1-jrg9wiqqat22kbcwkhyaag-png.webp)

ADAMANT behandelt Nachrichten als Transaktionen. Jede Nachricht wird mit Ed25519 EdDSA signiert, wodurch Man-in-the-Middle-Angriffe ausgeschlossen sind. Nachrichten werden in Blöcke eingetragen, und da die Blockreihenfolge und Zeitstempel unveränderlich sind, ist die Reihenfolge der Nachrichten garantiert – „Das habe ich nicht gesagt“ funktioniert bei blockchaingespeicherten Nachrichten nicht. Alle Nachrichten sind Ende-zu-Ende-verschlüsselt, und der ADAMANT-Code ist vollständig quelloffen.

Da Dialoge auf der Blockchain gespeichert werden, ist kein lokaler Speicher erforderlich, was die Sicherheit erhöht und den Zugriff auf Chats von jedem Gerät oder Standort aus ermöglicht.

![Dezentrale Kommunikation braucht Zeit](/images/engineering-notes/medium/d5af2289041c/003-0-iccadzxqtzq4ocze.webp)

Die Blockchain-Kommunikation eröffnet auch neue Möglichkeiten. Eine Zustellbestätigung ist nützlich für kritische Benachrichtigungen. Die Integration mit Ethereum, Dogecoin, Lisk, Dash und Bitcoin ermöglicht Kryptotransfers direkt im Chat, und ADAMANT verfügt über einen integrierten Krypto-Tauscher. ADAMANT 2FA bietet eine blockchainbasierte Alternative zur SMS-basierten Zwei-Faktor-Authentifizierung, die bekannte Sicherheitsschwächen aufweist.

### Änderungen sind keine Kleinigkeit

Die Entwicklung eines echten Blockchain-Messengers erfordert deutlich mehr Aufwand als ein herkömmlicher Messenger – es gibt keine Vorbilder. Jenseits technischer Herausforderungen steht der Massenadoption ein tieferes Hindernis entgegen: Die Menschen müssen zuerst ihre Denkweise ändern.

### Paradigmenwechsel

Das Kernproblem ist Verantwortung. Menschen vermeiden sie. Wenn ein Bankkonto kompromittiert wird, besteht eine gute Chance, dass die Bank den Verlust ersetzt. Wenn eine Bitcoin-Wallet kompromittiert wird, gibt es niemanden, dem man die Schuld geben kann. Der Wert von Fiat-Währungen wird von Regierungen garantiert; niemand garantiert den Wert von Bitcoin.

Dezentrale Messenger fallen Nutzern noch schwerer. Sie fragen: „Was, wenn ich meinen privaten Schlüssel verliere? Dann werden alle meine Gespräche gestohlen!“ – und sie mögen die Antwort nicht: Bewahre deinen privaten Schlüssel sicher auf. Bei Facebook können Nutzer dem Unternehmen Sicherheitslücken anlasten. Bei einem dezentralen Messenger gibt es niemanden, dem man die Schuld geben kann. Das nennt man Verantwortung.

### Lieber versteckte Kosten zahlen

Nutzer neigen dazu, direkte Zahlungen zu vermeiden und versteckte Kosten vorzuziehen – selbst wenn diese den Verlust persönlicher Daten und Gespräche bedeuten. Es gibt kein kostenloses Mittagessen.

Bei ADAMANT ist der Preis explizit. Jede Aktion, einschließlich Nachrichtenversand oder das Speichern von Kontakten, verursacht eine Netzwerkgebühr von 0,001 ADM. Kritiker fragen, ob Menschen wirklich für das Versenden von Nachrichten zahlen werden, wenn es kostenlose Alternativen gibt, doch sie missverstehen das Modell: Die Gebühren fließen an die Knotenbetreiber, nicht an die Entwickler – genau wie bei Bitcoin-Transaktionsgebühren, die nicht an die Bitcoin-Entwickler gehen.

### Die Zeit prüft die Wahrheit

Die Blockchain ist nur ein Versuch, einen dezentralen Messenger zu schaffen. Ob er erfolgreich sein wird, wird die Zeit zeigen. Doch ein bahnbrechender Messenger wird letztendlich eine Massenadoption im Stil von Facebook erreichen.

ADAMANT hat bewiesen, dass ein Blockchain-Messenger existieren kann. Der einzige vorherige Versuch war Bitmessage im Jahr 2012, der an langen Zustellzeiten, hoher CPU-Last und fehlenden mobilen Apps scheiterte.

Die aktuelle Skepsis rührt daher, dass Blockchain-Messenger ihrer Zeit voraus sind. Die Menschen sind noch nicht bereit, Verantwortung für ihre Konten zu übernehmen, das Konzept des Eigentums an persönlichen Daten ist noch nicht populär, und die aktuelle Blockchain-Technologie bietet keine hohen Geschwindigkeiten. Wenn nicht ADAMANT, dann werden zukünftig fortschrittlichere Analoga erscheinen.
