---
title: "Crypto-Handels- und Market-Making-Bot in ADAMANT"
slug: "crypto-trading-and-market-making-bot-in-adamant-82fa48b78f51"
description: "Der ADAMANT-Handelsbot unterstützt verschiedene Kryptobörsen und eignet sich für manuellen oder automatisierten Handel mit Fokus auf Orderbuchfüllung."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/crypto-trading-market-making-bot-in-adamant-82fa48b78f51"
publishedAt: "2020-03-13T11:21:13.547Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/82fa48b78f51/001-0-o1ekf2vkjogaqiht.webp"
cardSpan: "full"
originalId: "medium:82fa48b78f51"
locale: "de"
placeholder: false
---

Der ADAMANT-Handelsbot unterstützt eine Reihe von Kryptowährungsbörsen. Er kann für manuellen oder automatisierten Handel verwendet werden, wobei derzeit der Schwerpunkt auf der Füllung von Orderbüchern und der Generierung von Handelsvolumen statt auf spekulativem Gewinn liegt.

### Realistische Erwartungen an Handelsbots

Handelsbots sind keine garantierten Gewinnmaschinen. Die Erfolgswahrscheinlichkeit ist etwa ausgeglichen, und wer behauptet, ein Bot werde definitiv Gewinn erzielen, handelt nicht ehrlich. Unternehmen verkaufen Handelsbots statt selbst damit zu handeln, weil der Kryptohandel erhebliche Risiken birgt – unabhängig davon, ob ein Bot oder manuelle Methoden eingesetzt werden. Die gewinnorientierten Handelsfunktionen des ADAMANT-Bots sind derzeit begrenzt; der primäre Anwendungsfall ist das Market Making.

### Warum Market Making wichtig ist

Ein großer Teil des Handelsvolumens an Kryptobörsen ist künstlich. Kleine Token-Projekte, die an kleineren Börsen gelistet sind, haben oft kein Handelsvolumen, da selbst Top-Coins Mühe haben, Volumen anzuziehen. Ohne sichtbares Volumen zögern Nutzer beim Kauf, und andere Börsen lehnen Listings ab. Projektbetreiber müssen daher selbst Handelsvolumen erzeugen und Orderbücher füllen – verbunden mit der Zahlung von Börsengebühren.

### Funktionsweise des Bots

Der Handelsbot ist ein dauerhaft laufendes Serverprogramm. Nach der Installation konfigurieren Sie die Zielbörse und das Handelspaar. Der Bot überwacht eingehende Befehle, führt Trades gemäß Ihrer konfigurierten Strategie aus und sendet Benachrichtigungen für alle Aktionen. Befehle werden über ADAMANT Messenger gesendet, weshalb Sie zwei ADM-Konten benötigen: eines für sich als Administrator und eines für den Bot.

### Voraussetzungen für den Start

Sie sollten über grundlegende Kenntnisse von Linux und Node.js verfügen sowie einen minimalen virtuellen Server von einem beliebigen Cloud-Anbieter. Der Betrieb eines vollständigen ADAMANT-Knotens ist nicht erforderlich. Sie müssen zwei ADAMANT-Konten erstellen: Ihr persönliches Konto, dessen Adresse in das `admin_accounts`-Konfigurationsfeld eingetragen wird, und das Konto des Bots, dessen `passPhrase` in der Konfiguration festgelegt wird. Jede Nachricht an den Bot kostet 0,001 ADM, und kostenlose ADM-Tokens sind über das ADAMANT-Bounty-Programm in ausreichender Menge für Jahre der Nutzung verfügbar.

Seitens der Börse benötigen Sie API-Schlüssel für Ihr Börsenkonto, die in den API-Einstellungen der Börse erstellt werden. Finanzieren Sie die Handelspaar-Bestände an der Börse und stellen Sie sicher, dass das Orderbuch für Ihr gewähltes Paar mindestens ein Bid und ein Ask enthält, bevor Sie den Bot starten. Installieren Sie abschließend den Bot, passen Sie die Konfigurationsdatei an und führen Sie ihn aus.

### Befehle

Der Bot akzeptiert Befehle über ADAMANT Messenger. Verwenden Sie `/help`, um verfügbare Befehle anzuzeigen, und konsultieren Sie die vollständige Befehlsreferenz für Details.

![Crypto-Handels- und Market-Making-Bot in ADAMANT](/images/engineering-notes/medium/82fa48b78f51/002-0-mvxlgzjz2pq3e6dl.webp)

### Einrichtung und Quellcode

Der Bot ist Open Source; Installationsanleitungen sind auf GitHub verfügbar. Ausführliche Einrichtungshilfen für weniger erfahrene Nutzer finden Sie auf der Projektwebsite.

Der Handel mit Kryptowährungen birgt erhebliche Risiken. Sie sind allein verantwortlich für Ihre Handelsentscheidungen. ADAMANT bietet auch andere Bots für unterschiedliche Anwendungsfälle an.
