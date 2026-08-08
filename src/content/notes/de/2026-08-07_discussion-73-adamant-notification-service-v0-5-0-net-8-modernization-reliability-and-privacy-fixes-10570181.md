---
title: "ADAMANT Notification Service v0.5.0 — .NET 8 Modernisierung, Zuverlässigkeit und Datenschutz-Fixes"
slug: "discussion-73-adamant-notification-service-v0-5-0-net-8-modernization-reliability-and-privacy-fixes-10570181"
description: "Der ADAMANT Notification Service (ANS) liefert Apple Push-Benachrichtigungen für die ADAMANT iOS-App, ohne dass ANS oder Apple die Identität der Kommunikationspartner erfahren."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/73"
publishedAt: "2026-08-07T14:06:51Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10570181"
locale: "de"
placeholder: false
---

[ADAMANT Notification Service (ANS)](https://github.com/Adamant-im/adamant-notificationService) stellt Apple Push-Benachrichtigungen für die ADAMANT iOS-App bereit, ohne dass ANS oder Apple jemals erfahren, wer mit wem kommuniziert. Die Version [v0.5.0](https://github.com/Adamant-im/adamant-notificationService/releases/tag/v0.5.0) ist das erste getaggte Release seit 0.4.1 im Jahr 2019.

Dies war keine Neuentwicklung. Da ANS langfristig durch [adamant-ns](https://github.com/Adamant-im/adamant-ns) abgelöst werden soll, war das Ziel eng gefasst: Abhängigkeiten mit abgelaufenem Support (EOL) zu entfernen und Fehler zu beheben, die zu Produktionsausfällen führten, ohne dabei die Architektur oder das Datenschutzmodell zu verändern.

## Laufzeit

Der Dienst wurde in allen Projekten von `netcoreapp3.0` (EOL, seit 2020 nicht mehr unterstützt) auf **.NET 8 LTS** umgestellt. Dies ermöglicht die native Bereitstellung unter Ubuntu 22.04+ ohne die Notwendigkeit, veraltete Container-Images zur Aufrechterhaltung der alten Laufzeitumgebung zu verwenden.

## Socket-Leck

Der API-Client erstellte pro Anfrage einen neuen `HttpClient`, ohne diesen jemals freizugeben. In der Produktion äußerte sich dies durch einen stetigen Anstieg von Sockets im Status `CLOSE-WAIT` – auf einer laufenden Instanz wurden etwa 30+ Dateideskriptoren pro Minute verzeichnet. Ab einem gewissen Punkt führte dies zum Ausfall der DNS-Auflösung für den gesamten Prozess. Nun wird ein einzelner, gemeinsam genutzter und wiederverwendeter Client verwendet.

## Failover

Die Knotenauswahl wählte bisher einen zufälligen konfigurierten Knoten aus und unternahm keine erneuten Versuche. Jeder Fehler auf diesem Knoten, auch ein vorübergehender, führte zum Absturz des gesamten Dienstes. Das System versucht nun, bei einem Fehler einen anderen Knoten zu kontaktieren, bevor es aufgibt. Ein Totalausfall aller konfigurierten Knoten führt nun dazu, dass der Zyklus übersprungen wird, anstatt den Dienst zum Absturz zu bringen.

## Austausch des EF Core Providers

Der Plan war, EF Core unverändert zu lassen und nur das Zielframework der Anwendung anzuheben. Dies funktionierte für den ORM-Kern – EF Core 2.2 zielt auf `netstandard2.0` ab und kompiliert daher weiterhin unter .NET 8 –, aber der MySQL-Provider (`MySql.Data.EntityFrameworkCore`) funktionierte überhaupt nicht: Es trat eine `AmbiguousMatchException` bei der ersten Abfrage auf, die durch einen neuen, auf SQLite basierenden Smoke-Test erkannt wurde, bevor sie die Produktion erreichte. Er wurde durch `Pomelo.EntityFrameworkCore.MySql` ersetzt, den aktiv gepflegten Provider, auf den sich das .NET-Ökosystem weitgehend geeinigt hat.

## Datenschutz-Fixes

Drei Log-Anweisungen gaben vertrauliche Daten aus: ein Device-Token bei jeder erfolgreichen Push-Benachrichtigung, ein *entschlüsselter* Signal-Payload (der das Device-Token enthält) bei einem Parsing-Fehler sowie ein APNs-Zertifikatspasswort bei einem Ladefehler. Alle drei verstießen gegen die eigenen Datenschutzregeln des Projekts und wurden entfernt.

## Weitere Produktions-Fixes

Nachdem die oben genannten Änderungen implementiert waren, wurden weitere Probleme im laufenden Betrieb gefunden und behoben: ein Fehler bei der `~`-Pfaderweiterung, der das Starten beider Worker auf einem Headless-Server verhindern konnte; ein Sonderfall beim Start, der dazu führen konnte, dass nach einer Netzwerkunterbrechung alle registrierten Geräte mit Benachrichtigungen über alte Transaktionen überflutet wurden; ein Thread-Safety-Problem bei der Knotenauswahl unter gleichzeitiger Nutzung; ein fehlendes HTTP-Timeout sowie eine Null-Referenz bei einer spezifischen, fehlerhaft formatierten APNs-Antwort.

## Graceful Shutdown

Bisher reagierten die Worker nicht auf `SIGTERM`, sodass ein routinemäßiger `docker stop` oder `systemctl restart` in den Logs immer wie ein Absturz aussah. Sie beenden sich nun ordnungsgemäß.

## Tests und Versionsverfolgung

Die Testabdeckung wurde von wenigen Tests auf 35 erweitert, einschließlich des oben genannten EF Core/SQLite-Smoke-Tests. Builds tragen nun eine korrekte Versionsnummer – zuvor wurde jeder Build fälschlicherweise als `1.0.0.0` ausgeliefert, unabhängig von den Angaben in der Projektdatei.

## Sicherheit

Sicherheitsaudit durchgeführt durch [cryptofoundry](https://adamant.business#contact).

## Links

- [Release Notes](https://github.com/Adamant-im/adamant-notificationService/releases/tag/v0.5.0)
- [Vollständiger Diff, 0.4.1 → v0.5.0](https://github.com/Adamant-im/adamant-notificationService/compare/0.4.1...v0.5.0)
- [Tracking-Issue](https://github.com/Adamant-im/adamant-notificationService/issues/12)
- [Repository](https://github.com/Adamant-im/adamant-notificationService)
