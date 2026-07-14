---
title: "ADAMANT Tradebot 8.0: Ein stärkeres Fundament für selbstgehostetes Market Making"
slug: "adamant-market-making-software-8-0-a-stronger-foundation-for-your-token-s-market-presence-c8032a1a7d38"
description: "Version 8.0 ist das größte Update des Open-Source-ADAMANT Tradebot seit Jahren. Für Token-Emittenten ist die Lücke zwischen einem Listing und einem funktionierenden Markt real."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-market-making-software-8-0-a-stronger-foundation-for-your-tokens-market-presence-c8032a1a7d38"
publishedAt: "2026-06-26T15:58:19.696Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/c8032a1a7d38/001-0-qywflgfw1krzccj5-png.webp"
cardSpan: "full"
originalId: "medium:c8032a1a7d38"
locale: "de"
placeholder: false
---

Version 8.0 ist das größte Update des Open-Source-ADAMANT Tradebot seit Jahren. Für Token-Emittenten ist die Lücke zwischen einem Listing und einem funktionierenden Markt real: Ein dünnes Orderbuch schreckt Händler ab, ein breites Spread macht jeden Swap teuer, und Lücken im Orderbuch wirken wie Vernachlässigung. Der Bot schließt diese Lücke, indem er Spread-, Liquiditäts- und Volumenrichtlinien an den Börsen aufrechterhält, an denen Ihr Token tatsächlich gelistet ist.

Das Kernversprechen bleibt unverändert. Sie hosten den Bot auf Ihrem eigenen VPS, verbinden ihn über API-Schlüssel mit Ihrer Börse – diese verlassen niemals Ihre Infrastruktur – und kontrollieren, wer Befehle senden darf. Version 8.0 macht den Bot zuverlässiger, sicherer und einfacher im langfristigen Betrieb – weg von etwas, das nur funktioniert, wenn man es ständig überwacht, hin zu einer Infrastruktur, die unbeaufsichtigt laufen kann.

![ADAMANT Market-making Software 8.0: Ein stärkeres Fundament für die Marktpräsenz Ihres Tokens](/images/engineering-notes/medium/c8032a1a7d38/002-1-swca0-a2gacbe1zvi17jjq-png.webp)

### Betriebssicherheit

Version 8.0 aktualisiert Abhängigkeiten mit einer sauberen Bilanz bei kritischen und hohen Sicherheitsprüfungen, verschärft Zugriffsmuster für optionale Verwaltungs-APIs und bringt den Codebas auf dieselbe technische Grundlage wie die kommerzielle Produktlinie – ohne Premium-exklusive Funktionen einzubinden. Ihre Börsen-API-Schlüssel gelangen niemals zu ADAMANT oder irgendein SaaS-Dashboard.

### Verwaltungsschnittstellen

Der Bot kann über ADAMANT Messenger (der ursprüngliche verschlüsselte, dezentrale Befehlskanal), Telegram (verfügbar im Premium-Bot) und eine derzeit in Entwicklung befindliche Web-Oberfläche gesteuert werden. Im Hintergrund fügt Version 8.0 eine moderne private WebUI-API basierend auf Fastify mit JWT-Authentifizierung, validierten Anfrage-Schemata und Echtzeit-Updates über WebSocket hinzu. Für die meisten Betreiber bleibt dies unsichtbar – Sie erhalten lediglich eine reaktionsschnellere und zuverlässigere Verwaltungserfahrung, sobald die Web-Oberfläche aktiviert ist.

Im täglichen Betrieb tun Sie weiterhin das, was Sie immer getan haben: Überprüfen von Kontoständen, Anpassen des Spreads, Aktivieren von Volumenrichtlinien, Festlegen von Preisspannen und Deaktivieren von Modulen, wenn der Markt ungewöhnlich wird. Der Unterschied ist, dass der Bot diese Befehle nun vorhersehbarer verarbeitet.

![ADAMANT Market-making Software 8.0: Ein stärkeres Fundament für die Marktpräsenz Ihres Tokens](/images/engineering-notes/medium/c8032a1a7d38/003-1-6ltktmqgyhhs6pniej4dcq-png.webp)

### Börseunterstützung

Der Open-Source-Bot unterstützt eine gezielte Auswahl zentralisierter Börsen: Azbit, P2PB2B, StakeCube, Coinstore, FameEX (über FameEXnet – aktualisierter Connector in v8.0) und NonKYC. Nutzer von FameEX beachten bitte, dass der Bot nun mit FameEXnet kommuniziert. Das Upgrade erfordert daher einen geplanten Connector-Wechsel statt eines einfachen `git pull`. Der kostenlose Bot konzentriert sich bewusst auf Spot-Märkte mit Fokus auf REST und verzichtet auf die Komplexität von Futures. Eine umfassendere CEX-Abdeckung und erweiterte Strategiemodule gehören zur Premium-Produktlinie.

### Im Hintergrund

Der alte monolithische Befehls-Handler wurde in fokussierte Module aufgeteilt. Die ADAMANT-Transaktionsverarbeitung wurde auf `adamant-api` 3.x neu aufgebaut. Beim Start wartet die Anwendung nun auf die Datenbank, führt automatische Migrationen durch, sodass alte Orderdaten sicher aktualisiert werden, lädt Börsen-Metadaten vor und startet erst danach die Handelsschleifen.

Die Laufzeitumgebung zielt auf Node.js 22.2+ mit MongoDB-Treiber 7.x und einem aktualisierten HTTP-Stack ab. Die private WebUI-Schicht verwendet JWT, Schema-Validierung, IP-Whitelists und standardmäßig localhost-Einschränkungen, sodass Verwaltungskomfort nicht zu einer Angriffsfläche wird. Neue automatisierte Test-Suiten erfassen die WebUI-API und zentrale Hilfsfunktionen und reduzieren so das Upgrade-Risiko für technische Teams.

### Aktualisierung

Neue Projekte können mit folgendem Befehl starten:

```bash
git clone https://github.com/Adamant-im/adamant-tradebot
cd adamant-tradebot
npm i
cp config.default.jsonc config.jsonc
# edit config.jsonc - pair, API keys, spread/volume settings
npm start
```

Bestehende v7.x-Installationen sollten den Bot anhalten, pullen, neu installieren, alle neuen Felder aus `config.default.jsonc` in `config.jsonc` übernehmen und dann neu starten:

```bash
pm2 stop tradebot
git pull
npm i
# merge new config.default.jsonc fields into your config.jsonc
pm2 restart tradebot
```

Das Release wird im [GitHub PR #110](https://github.com/Adamant-im/adamant-tradebot/pull/110) verfolgt und schließt das Sammelthema [#109](https://github.com/Adamant-im/adamant-tradebot/issues/109). Vollständige Installations- und Befehlsreferenzen sind unter [marketmaking.app](https://marketmaking.app/cex-mm/installation/) verfügbar.

![ADAMANT Market-making Software 8.0: Ein stärkeres Fundament für die Marktpräsenz Ihres Tokens](/images/engineering-notes/medium/c8032a1a7d38/004-0-fcjgeqhiqq-h0grv-png.webp)

![ADAMANT Market-making Software 8.0: Ein stärkeres Fundament für die Marktpräsenz Ihres Tokens](/images/engineering-notes/medium/c8032a1a7d38/005-0-8ihrvb-is-qsshbb-png.webp)
