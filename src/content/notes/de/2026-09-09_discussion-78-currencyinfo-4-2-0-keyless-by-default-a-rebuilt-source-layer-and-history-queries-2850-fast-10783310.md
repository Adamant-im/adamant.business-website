---
title: "Currencyinfo 4.2.0: Standardmäßig schlüssellos, neu strukturierte Quellschicht und 2850-mal schnellere Verlaufsabfragen"
slug: "discussion-78-currencyinfo-4-2-0-keyless-by-default-a-rebuilt-source-layer-and-history-queries-2850-fast-10783310"
description: "Das Update 4.2.0 für Currencyinfo führt schlüssellose Standardeinstellungen, eine optimierte Architektur und massive Performance-Verbesserungen bei Verlaufsabfragen ein."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/78"
publishedAt: "2026-09-09T17:15:27Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "Currencyinfo"
cardSpan: "half"
originalId: "github-discussion:10783310"
locale: "de"
placeholder: false
---

## Wichtige Neuerungen in Version 4.2.0

Wir freuen uns, die Veröffentlichung von **Currencyinfo 4.2.0** bekannt zu geben. Dieses Update konzentriert sich auf die Sicherheit durch Standardeinstellungen, eine grundlegende Überarbeitung der Quellschicht und signifikante Performance-Optimierungen.

### Standardmäßig schlüssellos

Ab sofort ist **Currencyinfo** standardmäßig schlüssellos konfiguriert. Dies erhöht die Sicherheit für alle neuen Installationen erheblich, da keine sensiblen API-Schlüssel mehr standardmäßig erforderlich sind, um grundlegende Funktionen zu nutzen. Benutzer, die erweiterte Funktionen benötigen, können ihre Konfiguration weiterhin individuell anpassen.

### Neu strukturierte Quellschicht

Die interne Quellschicht wurde von Grund auf neu aufgebaut. Diese Architekturänderung verbessert die Wartbarkeit des Codes und ermöglicht eine stabilere Anbindung an verschiedene Datenquellen. Durch die Entkopplung der Datenbeschaffung von der Geschäftslogik ist das System nun deutlich modularer und robuster gegenüber Änderungen an externen APIs.

### Massive Performance-Steigerung

Durch die Optimierung der Datenbankabfragen und die Einführung effizienterer Indizierungsstrategien konnten wir die Geschwindigkeit von Verlaufsabfragen um den Faktor **2850** steigern. Was zuvor Sekunden dauerte, wird nun in Millisekunden verarbeitet, was besonders bei der Analyse großer Datensätze einen erheblichen Vorteil bietet.

## Upgrade-Hinweise

Bitte überprüfen Sie Ihre `config.default.jsonc` nach dem Update, um sicherzustellen, dass Ihre Einstellungen mit der neuen schlüssellosen Architektur kompatibel sind. Bei Fragen oder Problemen wenden Sie sich bitte an unser Support-Team unter [@adamant_business](https://t.me/adamant_business) auf Telegram.

Wir danken der Community für das kontinuierliche Feedback, das diese Verbesserungen erst möglich gemacht hat.
