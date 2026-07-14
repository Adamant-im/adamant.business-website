---
title: "Weltweit erste Blockchain-basierte 2FA im Produktivbetrieb: ADAMANT auf Resfinex"
slug: "world-first-2fa-on-a-blockchain-in-real-life-7adf5554728d"
description: "Zwei-Faktor-Authentifizierung schützt Guthaben, aber nicht alle Methoden sind gleich sicher. SMS-basierte 2FA ist anfällig für SIM-Swapping-Angriffe, die erhebliche Kryptoverluste verursacht haben."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/world-first-2fa-on-a-blockchain-in-real-life-7adf5554728d"
publishedAt: "2020-03-01T07:19:10.858Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/7adf5554728d/001-0-hktm6vjfrwccv7kd.webp"
cardSpan: "full"
originalId: "medium:7adf5554728d"
locale: "de"
placeholder: false
---

Die Zwei-Faktor-Authentifizierung ist entscheidend zum Schutz von Guthaben, aber nicht alle 2FA-Methoden sind gleich sicher. SMS-basierte 2FA ist besonders anfällig für SIM-Swapping-Angriffe, die bereits erhebliche Kryptoverluste verursacht haben. Blockchain-basierte 2FA bietet eine zuverlässigere Alternative, indem Authentifizierungscodes über einen On-Chain-Messenger übermittelt werden und die Angriffsfläche des Telekommunikationsnetzes vollständig eliminiert werden.

### ADAMANT 2FA an der Resfinex-Börse

Die Kryptobörse Resfinex ist die erste Produktivimplementierung einer blockchainbasierten 2FA, die ADAMANT Messenger zur Übermittlung von Authentifizierungscodes nutzt. Der Einrichtungsprozess ist einfach: Der Nutzer navigiert zu den Sicherheitseinstellungen, wählt die 2FA-Methode ADAMANT Messenger aus und gibt seine ADAMANT-Adresse ein, an die die Codes gesendet werden sollen. Neue ADAMANT-Nutzer benötigen eine geringe Menge ADM, um ihr Konto zu initialisieren. Nach Eingabe des Bestätigungscodes und des Börsenpassworts ist die 2FA aktiviert.

![Weltweit erste 2FA auf einer Blockchain im echten Leben](/images/engineering-notes/medium/7adf5554728d/002-0-xvtbn00u-d5nvyzb.webp)

![Weltweit erste 2FA auf einer Blockchain im echten Leben](/images/engineering-notes/medium/7adf5554728d/003-0-necwvzuliwggpf2c.webp)

![Weltweit erste 2FA auf einer Blockchain im echten Leben](/images/engineering-notes/medium/7adf5554728d/004-0-to4kuxsaixckgh5j.webp)

![Weltweit erste 2FA auf einer Blockchain im echten Leben](/images/engineering-notes/medium/7adf5554728d/005-0-kexa5qysqrmab0vf.webp)

![Weltweit erste 2FA auf einer Blockchain im echten Leben](/images/engineering-notes/medium/7adf5554728d/006-0-f1qr6w3udghq575k.webp)

![Weltweit erste 2FA auf einer Blockchain im echten Leben](/images/engineering-notes/medium/7adf5554728d/007-0-a-sfwulbvejil2rl.webp)

Sobald aktiviert, sind 2FA-Codes erforderlich für Anmeldungen, Abhebungsbestätigungen, Passwortänderungen, Erstellung von API-Schlüsseln sowie Änderungen an Sicherheits- oder anderen sensiblen Kontoeinstellungen.

### Blockchain-2FA in Ihren Dienst integrieren

Jeder Dienstanbieter, einschließlich Börsen und Finanzinstitute, kann ADAMANT 2FA integrieren. ADAMANT ist ein vollständig Open-Source-Projekt mit Dokumentation und Implementierungsanleitungen. Der Quellcode für die ADAMANT 2FA-Demoanwendung ist auf [GitHub](https://github.com/Adamant-im/adamant-2fa) verfügbar, und für Entwickler steht ein [Verbindungsleitfaden](https://medium.com/adamant-im/go-to-secure-2fa-on-a-blockchain-344500a5f010#db04) zur Verfügung.

![Weltweit erste 2FA auf einer Blockchain im echten Leben](/images/engineering-notes/medium/7adf5554728d/008-0-1zqjg9sgj2eli5h5.webp)

![Weltweit erste 2FA auf einer Blockchain im echten Leben](/images/engineering-notes/medium/7adf5554728d/009-0-wdowhqndtnflq0oy.webp)
