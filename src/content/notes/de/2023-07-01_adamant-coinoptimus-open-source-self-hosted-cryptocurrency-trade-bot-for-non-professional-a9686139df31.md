---
title: "ADAMANT CoinOptimus: Open-Source Self-Hosted Cryptocurrency Trade Bot"
slug: "adamant-coinoptimus-open-source-self-hosted-cryptocurrency-trade-bot-for-non-professional-a9686139df31"
description: "ADAMANT CoinOptimus ist ein selbstgehosteter Kryptowährungs-Handelsbot für Privatanleger, der Automatisierung bietet, ohne die Kontrolle über die Schlüssel abzugeben."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-coinoptimus-open-source-self-hosted-cryptocurrency-trade-bot-for-non-professional-traders-a9686139df31"
publishedAt: "2023-07-01T12:39:55.877Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/a9686139df31/001-0-ygfhry-dhfu9rszm.webp"
cardSpan: "full"
originalId: "medium:a9686139df31"
locale: "de"
placeholder: false
---

ADAMANT CoinOptimus ist ein selbstgehosteter Kryptowährungs-Handelsbot für Privatanleger, die Automatisierung wünschen, ohne die Kontrolle über ihre Schlüssel an Drittdienste abzugeben. Da er auf Ihrem eigenen Server läuft, behalten nutzer mit Datenschutzanspruch die vollständige Kontrolle über ihre Börsen-API-Zugangsdaten. Der Bot eignet sich auch für Gelegenheitskrypto-Enthusiasten und dank seiner Ladder/Grid-Strategie für Projektinhaber oder Market Maker, die Orderbücher füllen und die Liquidität verbessern möchten.

Der Bot basiert auf Node.js und läuft kontinuierlich auf einem VPS. Sie konfigurieren die Zielbörse und das Handelspaar in einer `config.jsonc`-Datei, geben Börsen-API-Schlüssel ein (idealerweise nur für Handel, ohne Abhebungsberechtigung) und steuern den Bot über Befehle mit Schrägstrich-Präfix in ADAMANT Messenger. Echtzeit-Handelsbenachrichtigungen können an ADAMANT Messenger, Slack und Discord gesendet werden. Ab der ersten Version unterstützt CoinOptimus Binance, Bitfinex, P2PB2B, Azbit und StakeCube.

### Ladder/Grid-Strategie

CoinOptimus verwendet hauptsächlich eine optimale Ladder/Grid-Strategie. Der Bot platziert mehrere Kauf- und Verkaufsaufträge ausgehend von der Spanne. Wenn der nächstgelegene Auftrag ausgeführt wird, platziert er einen entsprechenden Auftrag auf der gegenüberliegenden Seite, gemäß dem Prinzip, günstiger zu kaufen als zu verkaufen und teurer zu verkaufen als zu kaufen. Dieser Ansatz funktioniert am besten in volatilen Märkten.

![ADAMANT CoinOptimus: Open-source Self-Hosted Cryptocurrency Trade Bot for Non-Professional Traders](/images/engineering-notes/medium/a9686139df31/002-0-tfo-ftrmwbt1zl7r.webp)

![ADAMANT CoinOptimus: Open-source Self-Hosted Cryptocurrency Trade Bot for Non-Professional Traders](/images/engineering-notes/medium/a9686139df31/003-0-2twg79hid4ph-cia.webp)

### Installation und Konfiguration

CoinOptimus unterstützt Ubuntu 18–22 und CentOS 8 und benötigt Node.js v16+ sowie MongoDB v6+. Die Installation erfolgt durch Klonen des [GitHub-Repositorys](https://github.com/Adamant-im/adamant-coinoptimus) und Ausführen von `npm install`. Die Konfiguration erfolgt über `config.jsonc`, in der Sie die ADAMANT-Passphrase des Bots, die Administratoradressen zur Befehlserteilung, Börsendetails und API-Schlüssel angeben. Bei einer Quellaktualisierung über git sollten Sie die Änderungen in der Standardkonfiguration prüfen und in Ihre `config.jsonc` übernehmen, bevor Sie den Bot neu starten.

### Nutzung über ADAMANT Messenger

Der Bot nutzt ADAMANT-Blockchain-Konten, die durch öffentliche Adressen identifiziert und mit 12-Wörter-Passphrasen gesichert sind. Nach der Installation senden Sie Befehle über ADAMANT Messenger. Zum Beispiel platziert `/buy ADM/USDT amount=200 price=0.005` einen Kaufauftrag für 200 ADM zum Kurs von 0,005 USDT. Um die Ladder-Strategie mit 6 Aufträgen, einer Preisspanne von 3 % und etwa 100 USDT pro Auftrag zu starten, verwenden Sie `/start ld 100 USDT 6 3%`. Die vollständige Befehlsreferenz finden Sie im [CoinOptimus Wiki](https://github.com/Adamant-im/adamant-coinoptimus/wiki).

![ADAMANT CoinOptimus: Open-source Self-Hosted Cryptocurrency Trade Bot for Non-Professional Traders](/images/engineering-notes/medium/a9686139df31/004-0-jinplg771dicgjt7.webp)

### Haftungsausschluss

CoinOptimus ist keine Gewinnmaschine mit Garantie. Die Nutzung erfolgt auf eigene Verantwortung.
