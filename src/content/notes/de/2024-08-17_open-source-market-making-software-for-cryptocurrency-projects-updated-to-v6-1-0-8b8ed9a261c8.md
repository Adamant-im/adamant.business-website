---
title: "ADAMANT Market-making-Software auf Version 6.1.0 aktualisiert"
slug: "open-source-market-making-software-for-cryptocurrency-projects-updated-to-v6-1-0-8b8ed9a261c8"
description: "Die Open-Source-Market-making-Anwendung von ADAMANT wurde auf v6.1.0 aktualisiert mit Verbesserungen bei Stabilität, Funktionen und Wartbarkeit."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/open-source-market-making-software-for-cryptocurrency-projects-updated-to-v6-1-0-8b8ed9a261c8"
publishedAt: "2024-08-17T10:04:57.129Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/8b8ed9a261c8/001-0-3n-a6wrdfj1fhgin.webp"
cardSpan: "full"
originalId: "medium:8b8ed9a261c8"
locale: "de"
placeholder: false
---

Die Open-Source-Market-making-Anwendung von ADAMANT ist ein selbstgehostetes Tool für Kryptowährungsprojekte und Börsen, das darauf ausgelegt ist, Handelsvolumen zu generieren, Spread und Liquidität aufrechtzuerhalten und ein dynamisches Orderbuch aufzubauen. Die Basisversion ist kostenlos, während erweiterte Funktionen als kostenpflichtige Module erhältlich sind. Das Projekt hat kürzlich Version 6.1.0 veröffentlicht, die mehrere funktionale und Stabilitätsverbesserungen enthält.

![Open-Source-Market-making-Software für Kryptowährungsprojekte auf v6.1.0 aktualisiert](/images/engineering-notes/medium/8b8ed9a261c8/002-0-1vbp44c85yvdelg.webp)

Ein zentrales Update in diesem Release ist die Verbesserung des Price Watcher-Moduls. Es verfügt nun über einen Mechanismus, um zu überprüfen, ob der Token-Preis aktuell ist, wodurch verhindert wird, dass Market-making-Entscheidungen auf veralteten Daten basieren. Der Codebase wurde ebenfalls einer umfassenden Überarbeitung unterzogen, um die allgemeine Stabilität, Leistung und Wartbarkeit bei wachsenden Projekten zu verbessern.

Neue Einstellungen `dev` und `clear_db` wurden eingeführt. Die `dev`-Einstellung vereinfacht das Testen und die Entwicklung, während `clear_db` eine schnelle Möglichkeit bietet, die Datenbank zu leeren, was nützlich ist, um Umgebungen zurückzusetzen. Abhängigkeiten wurden aktualisiert, um die Kompatibilität mit den neuesten Bibliotheken sicherzustellen und so Sicherheit und Leistung zu verbessern.

Zusätzliche Verbesserungen umfassen kleinere Fehlerbehebungen, neu integrierte manuelle Tests zur Überprüfung der Installationen vor der Bereitstellung sowie ein überarbeitetes README mit aktualisierten Installations- und Nutzungsanleitungen. Der Release und das Changelog sind im ADAMANT GitHub-Repository verfügbar.
