---
title: "Ein klarerer Blick auf ADAMANT: Neu gestalteter Blockchain Explorer"
slug: "a-clearer-view-of-adamant-redesigned-blockchain-explorer-f97501b0dc55"
description: "Ein Blockchain Explorer sollte mehr als nur Transaktionen und Blöcke anzeigen. Er sollte Nutzern helfen, schnell, präzise und zuverlässig zu verstehen, was im Netzwerk passiert."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/a-clearer-view-of-adamant-redesigned-blockchain-explorer-f97501b0dc55"
publishedAt: "2026-07-19T11:11:20.263Z"
author: "massivedev0 (Theo Bitner)"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:f97501b0dc55"
coverImage: "/images/engineering-notes/medium/f97501b0dc55/001-00d120d06c.webp"
locale: "de"
placeholder: false
---

Ein Blockchain Explorer sollte mehr als nur Transaktionen und Blöcke anzeigen. Er sollte den Menschen helfen, schnell, präzise und mit Zuversicht zu verstehen, was im Netzwerk geschieht. Der ADAMANT Blockchain Explorer wurde vollständig neu gestaltet – mit genau diesem Grundsatz im Mittelpunkt.

Die Neugestaltung ist nicht nur kosmetischer Natur. Sie überdenkt, wie Informationen strukturiert werden, wie Transaktionen erklärt werden, wie die Netzwerkgundheit kommuniziert wird und wie der Explorer auf Desktop- und Mobilgeräten funktioniert.

### Vertrauen beginnt mit Klarheit

Ein Blockchain Explorer ist eines der wichtigsten Verifizierungswerkzeuge in jedem Blockchain-Ökosystem. Nutzer öffnen ihn, um zu bestätigen, dass eine Transaktion ins Ledger aufgenommen wurde, eine Adresse zu prüfen, die Aktivität eines Delegierten zu überprüfen oder den aktuellen Zustand des Netzwerks zu verstehen. Wenn die Oberfläche verwirrend, inkonsistent oder visuell generisch ist, erzeugt sie genau dort Unsicherheit, wo Nutzer Transparenz erwarten.

Der neu gestaltete Explorer etabliert eine klarere visuelle Hierarchie für Blockchain-Daten. Transaktions-IDs, Adressen, Beträge, Bestätigungen, Zeitstempel und Operationstypen sind jetzt leichter zu identifizieren und zu vergleichen. Der Netzwerkstatus basiert auf aussagekräftigen Forging-Daten anstatt auf einem rein dekorativen „Online“-Indikator. Der Explorer unterscheidet zwischen den Zuständen live, degraded, critical, delayed und connecting – anhand der Aktivität der ADAMANT-Delegierten und der Aktualität der Netzwerk-Updates. Das Design wird damit selbst Teil des Vertrauensmodells: Nutzer können nicht nur nachvollziehen, was passiert ist, sondern auch, wie aktuell und zuverlässig die angezeigten Informationen sind.

### Responsiv by Design

Explorer werden oft als dichte Desktop-Tabellen gestaltet und als technische Werkzeuge für ein enges Publikum behandelt. In der Realität prüfen Menschen Transaktionen von Mobilgeräten aus, überwachen Delegierte über längere Sitzungen und wechseln häufig zwischen Übersichtsseiten und Detailansichten.

Der neue Explorer ist responsiv gestaltet. Tabellen werden zu lesbaren mobilen Layouts, anstatt Nutzer durch komprimierte Spalten zu navigieren. Bekannte Konten und Delegierte zeigen sowohl ihre Namen als auch die zugrundeliegenden Adressen. Kopieraktionen kopieren stets den tatsächlichen Blockchain-Wert. Beträge sind kompakt dargestellt, wo schnelles Scannen wichtig ist, und bleiben auf Detailseiten vollständig präzise.

Ein vollständiges Dark Theme wurde als erstklassige Erfahrung eingeführt – nicht als einfache Farbumkehr. Es verbessert den Komfort bei langen Überwachungssitzungen, während der Kontrast für Netzwerkzustände, Transaktionsrichtungen, Kartenknoten, Diagramme und Statusindikatoren erhalten bleibt.

![Ein klarerer Blick auf ADAMANT: Neu gestalteter Blockchain Explorer](/images/engineering-notes/medium/f97501b0dc55/002-216920b6f7.webp)

Blockchain-Daten auf jedem Bildschirm komfortabel nutzbar zu machen, senkt die Schwelle zwischen Nutzern und dem Netzwerk selbst.

### Eine neue visuelle Identität

Die Oberfläche ist so gestaltet, dass sie professionell und zurückhaltend wirkt, ohne einem generischen Administrations-Dashboard zu ähneln. Das aktualisierte Design verwendet ein semantisches System aus Flächen, Typografie, Abständen, Rändern und Statusfarben. Helle und dunkle Themes teilen dieselbe Informationshierarchie, passen jedoch Kontrast und Betonung an die jeweilige Umgebung an.

Die Neugestaltung umfasst den gesamten Explorer: Startseite und neueste öffentliche Operationen, Blöcke und Blockdetails, Transaktionen und Transaktionsdetails, Adress- und Delegiertenseiten, Top Accounts, Delegate Monitor, Network Monitor, Activity Graph sowie alle unterstützenden Komponenten wie Header, Navigation, Suche, Tooltips, Tabellen und Footer. Der Inhaltsbereich hat nun eine komfortable Maximalbreite auf großen Displays, während ausgewählte Überwachungsabschnitte weiterhin das gesamte Viewport nutzen können, wo zusätzlicher Platz das Verständnis verbessert.

### Transaktionen erklären jetzt mehr

Rohe Protokoll-Transaktionstypen sind nützlich für Maschinen, beschreiben die Operation aber nicht immer aus Nutzersicht. Der Explorer leitet nun aussagekräftigere Transaktionstypen aus ihrem Kontext ab. Neben regulären Transfers kann er Operationen wie deposit, withdraw, welcome bonus, vote, unvote, vote & unvote, create delegate, DApp deposit and withdrawal sowie message and state transactions identifizieren.

Bekannte Exchange-Wallets werden über das gemeinsame ADAMANT-Adressbuch identifiziert. Dadurch kann der Explorer Transfers von und zu Exchanges beschreiben, ohne eine separate, duplizierte Liste im Frontend zu pflegen. Die Transaktionssemantik wird nun in einer gemeinsamen Registry definiert, die sowohl vom Backend als auch vom Frontend genutzt wird – was das Verhalten konsistenter macht und das Hinzufügen zukünftiger Protokolltypen vereinfacht.

### Stabilere und präzisere Live-Daten

Die Neugestaltung bot auch die Gelegenheit, mehrere zugrundeliegende Datenflüsse zu verbessern. Die Startseite zeigt nun die 20 neuesten öffentlichen Operationen. Transaktionen mit identischen Zeitstempeln werden deterministisch nach ihrer Höhe und ID sortiert, wodurch ein Springen oder Verschwinden von Zeilen zwischen Updates verhindert wird. Bestätigungen und Ledger-Status aktualisieren sich beim Eintreffen neuer Blöcke. Der Delegate Monitor wartet auf einen frischen und kohärenten Forging-Snapshot, wenn der erste Client sich verbindet, anstatt kurzzeitig Daten aus einer früheren Sitzung anzuzeigen.

![Ein klarerer Blick auf ADAMANT: Neu gestalteter Blockchain Explorer](/images/engineering-notes/medium/f97501b0dc55/003-0b5168c513.webp)

Unnötige Account-Lookups wurden reduziert, Request Coalescing und Caching wurden hinzugefügt, und die Oberfläche ist nun gegen temporäre Node-Ausfälle und Browser geschützt, in denen kein persistenter Speicher verfügbar ist. Diese Änderungen sind größtenteils unsichtbar – und genau das ist der Punkt. Ein guter Explorer sollte sich stabil anfühlen, ohne dass Nutzer über die Komplexität dahinter nachdenken müssen.

### Präzision ohne visuelles Rauschen

Blockchain-Werte erfordern Präzision, aber die Anzeige jeder einzelnen Nachkommastelle überall macht Tabellen schwer lesbar. Die neue Oberfläche passt die Formatierung dem Kontext an. Übersichtstabellen betonen vier signifikante Stellen, ganzzahlige Werte verwenden Tausendertrennzeichen, und vollständige Werte bleiben in Tooltips verfügbar. Detailseiten bewahren jede aussagekräftige On-Chain-Nachkommastelle, unwesentliche nachgestellte Nullen werden entfernt, und Zeitstempel verwenden ein einheitliches Format mit UTC-Zeit und einem knappen relativen Alter. Dasselbe Prinzip gilt im gesamten Explorer: vollständige Informationen bereitstellen und dabei das hervorheben, was im jeweiligen Moment am wichtigsten ist.

Der neue Explorer ist derzeit im Entwicklungs-Repository verfügbar, eine Veröffentlichung ist in Kürze geplant.
