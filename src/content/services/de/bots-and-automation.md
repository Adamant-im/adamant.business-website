---
title: Krypto-Bots & Automatisierung
description: Selbst gehostete Bots, Monitoring, Alerting und Ausführungstools. Sie behalten die Schlüssel, Strategie und Verantwortung.
cta: Ich möchte einen Krypto-Bot
layoutStyle: accordion
proofLinks:
  - label: adamant-2fa
    url: https://github.com/Adamant-im/adamant-2fa
  - label: adamant-exchangebot
    url: https://github.com/Adamant-im/adamant-exchangebot
---

Ein Bot ist ein kleines Programm mit Zugriff auf Geld. Diese Rahmung treibt jede Entscheidung, die wir treffen: minimale Schlüsselberechtigungen, langweilige Zuverlässigkeit und vollständiger Quellcode in Ihren Händen. Wir liefern die Software — Sie behalten die Schlüssel, Strategie und Verantwortung.

## Was wir automatisieren

- **Benachrichtigungs- und Alert-Bots** — Telegram- und ADAMANT-Bots, die Salden, Node-Gesundheit, Börsenauftragsstatus oder On-Chain-Transfers überwachen und einen Menschen alarmieren, bevor ein Problem zu einem Verlust wird
- **Ausführungshelfer** — halbautomatisierte Workflows, bei denen der Bot eine Transaktion oder einen Auftrag vorbereitet und eine Person genehmigt; nützlich für Treasury-Operationen und OTC-Abwicklung
- **Betriebs-Dashboards** — eine einheitliche Sicht auf Wallets, Nodes und Bots, die Ihr Team bereits betreibt, statt acht Browser-Tabs und eine Tabelle
- **In-Chat-Dienste** — Bots im verschlüsselten ADAMANT-Chat: Börsenabläufe, Auszahlungen, Support-Warteschlangen und Zugriffskontrolle
- **KI-gestützte Tools** — LLM-basierte Zusammenfasser und Triage-Helfer, immer unter Senior-Engineering-Review und nie mit direktem Schlüsselzugriff

## Wie wir verhindern, dass Bots zu Vorfällen werden

Die meisten Bot-Horrorgeschichten kommen von denselben drei Fehlern: API-Schlüssel mit Auszahlungsrechten, Wiederholungsschleifen, die doppelt auszahlen, und Stille, wenn etwas bricht. Unser Standard:

- Börsenschlüssel auf das minimale Berechtigungsset begrenzt, das der Workflow braucht — wo möglich nur Handel oder nur Lesen
- Idempotente Operationen und expliziter Zustand, damit ein Neustart nie eine Überweisung wiederholt
- Rate-Limit-Budgets und Circuit Breaker um jede externe API
- Alerting auf dem Bot selbst — ein Bot, der still ausfällt, ist schlimmer als kein Bot
- Deployment auf Ihren Servern, mit Logs und Metriken, die Ihr Team lesen kann

## Fall: blockchain-verifizierte 2FA

[adamant-2fa](https://github.com/Adamant-im/adamant-2fa) liefert Einmalcodes über den ADAMANT-Messenger statt per SMS. Die Zustellung wird On-Chain verifiziert und kann nicht per SIM-Swap kompromittiert werden. Wir bauen ähnliche Verifizierungsabläufe für Produkte, bei denen E-Mail und SMS keine akzeptablen Angriffsflächen sind.

## Fall: Börse im verschlüsselten Chat

[adamant-exchangebot](https://github.com/Adamant-im/adamant-exchangebot) führt einen vollständigen Börsen-Workflow — Angebote, Einzahlungen, Auszahlungen — im Ende-zu-Ende-verschlüsselten Chat aus. Dasselbe Muster passt sich für Auszahlungen, Faucets, Bounty-Zahlungen und interne Token-Verteilung in Ihrem eigenen Stack an.

## Wo die Grenze liegt

Wir führen keine Strategien in Ihrem Namen aus, halten keine Schlüssel und versprechen keine Handelsgewinne. Wenn eine Anfrage auf „bauen Sie einen Bot, der Geld druckt“ hinausläuft, sagen wir Nein und erklären warum — und schlagen dann die Automatisierung vor, die Ihrem Team tatsächlich Engineering-Stunden spart.
