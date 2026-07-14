---
title: "ADAMANT Web App 2.1: QR-Teilen, Bot-Zugriff und verbesserte Token-Übertragung"
slug: "adamant-introduces-web-app-2-1-get-your-hands-on-the-latest-convenient-functions-4ffbc0ebc656"
description: "Das ADAMANT Web App 2.1-Update verbessert die Messenger-Effizienz und vereinfacht die Einrichtung. Neue Konten erhalten sofort Zugriff auf zwei Bots – einen Tausch- und einen Wettbot."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-introduces-web-app-2-1-get-your-hands-on-the-latest-convenient-functions-4ffbc0ebc656"
publishedAt: "2019-10-02T06:50:35.550Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/4ffbc0ebc656/001-1-l-nswrbv8xnsm1omxvshqg-png.webp"
cardSpan: "full"
originalId: "medium:4ffbc0ebc656"
locale: "de"
placeholder: false
---

Das ADAMANT Web App 2.1-Update steht im Zeichen der Effizienzsteigerung im Messenger und einer vereinfachten Ersteinrichtung. Neue Konten erhalten nun sofortigen Zugriff auf zwei Bots – einen Tausch-Bot und einen Wett-Bot – ohne zusätzliche Einrichtung.

Ein Klick auf eine Wallet-Adresse zeigt drei Optionen: Die Adresse in die Zwischenablage kopieren, einen freigegebenen Chat-Link kopieren oder einen QR-Code anzeigen. Das Format des Freigabelinks folgt dem Muster `https://msg.adamant.im/?address=U14236667426471084862`, sodass Empfänger sofort mit dem Chatten beginnen können. QR-Codes werden nun auch im Bereich „Partner-Info“ angezeigt, wenn Sie das Symbol eines Kontakts anklicken.

![ADAMANT Web App 2.1](/images/engineering-notes/medium/4ffbc0ebc656/002-1-ca218mdchy7u6byjnmqxha-png.webp)

Das Teilen per QR-Code eignet sich hervorragend für den persönlichen Austausch von Kontakten, da keine nachverfolgbare Aufzeichnung entsteht. Ein einzelner QR-Code kann nicht nur eine Adresse, sondern auch eine Kontaktkennung, einen Token-Betrag und eine Begrüßungsnachricht enthalten. Die App analysiert Links in der Zwischenablage automatisch und füllt die entsprechenden Felder aus. Beispielsweise öffnet dieser Link einen Chat mit einem beschrifteten Kontakt, einem voreingestellten Token-Betrag und einer Nachricht:

```
https://msg.adamant.im/?address=U14236667426471084862&label=John%20Doe&amount=1.01&message=Hi%20there
```

Bei der Übertragung von Token unterstützt die App schnelle Voreinstellungen, sodass Sie entweder den gesamten verfügbaren Betrag oder einen Bruchteil wie ein Drittel ohne manuelle Eingabe senden können.

![ADAMANT Web App 2.1](/images/engineering-notes/medium/4ffbc0ebc656/004-1-dmv7hxalesdxspouol49ka-png.webp)

Diese Funktionen basieren auf ADAMANT Improvement Proposals (AIPs), einer offenen Sammlung von Vorschlägen zur Verbesserung der Anwendung, die im [AIPs-Repository auf GitHub](https://github.com/Adamant-im/AIPs) gehostet werden. Neben der Web-App wurden auch die Builds für Tor, Windows und Linux aktualisiert und sind in [Release 2.1 auf GitHub](https://github.com/Adamant-im/adamant-im/releases/tag/v2.1.0) verfügbar.

![ADAMANT Web App 2.1](/images/engineering-notes/medium/4ffbc0ebc656/003-1-2hnq5ol3qs8fauymp6vxa-png.webp)
