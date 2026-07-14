---
title: "Health-Check-Algorithmus für ADAMANT-Knoten und -Dienste"
slug: "discussion-17-health-check-algorithm-general-description-8923107"
description: "Der Health-Check-Algorithmus soll ADAMANT zur zuverlässigsten Kryptowallet machen. Er gilt für alle Knoten, einschließlich ADM- und Coin-Knoten, sowie Dienste wie Info-Dienst und…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/17"
publishedAt: "2025-09-20T15:11:05Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:8923107"
locale: "de"
placeholder: false
---

Der Health-Check-Algorithmus zielt darauf ab, ADAMANT zur zuverlässigsten Kryptowallet zu machen. Er gilt für alle Knoten, einschließlich ADM- und Coin-Knoten, sowie Dienste wie `info-service` und IPFS. Der Algorithmus bewertet die Knotenhöhe, die minimal unterstützte Version und nutzt den aussagekräftigsten verfügbaren Endpunkt, beispielsweise `/api/node/status` für ADM. Er überspringt vom Benutzer deaktivierte Knoten und speichert die Knotenliste lokal, unabhängig von der Einstellung „Angemeldet bleiben“.

Knotenstatus umfassen Deaktiviert vom Benutzer, Nicht unterstützt (aufgrund der Version oder eines HTTP-Knotens über PWA-HTTPS) und Nicht verfügbar. Wenn ein Knoten nicht verfügbar ist, prüft der Algorithmus zuerst die Domain und dann eine `alt_ip`, falls die Domain fehlschlägt. Sobald die Domain verfügbar ist, wird `alt_ip` nicht erneut geprüft, um zusätzliche Anfragen zu vermeiden. Sind beide nicht verfügbar, versucht der Algorithmus es bei der nächsten Anfrage erneut.

Die Erkennung von Verfügbarkeit und Synchronisation basiert auf Schwellwerten für die Knotenhöhe (`HEIGHT_EPSILON`). Der einzige ansprechbare Knoten wird als Verfügbar markiert. Eine Gruppe von Knoten innerhalb des Schwellwerts gilt als Aktiv, während Knoten außerhalb des Schwellwerts als In-sync (oder „Cheater“) gelten. Die Schwellwerte variieren je nach Coin: ADM beträgt 10, BTC 2, ETH 5, DOGE 3, DASH 3 und LSK 5. Beispielsweise wären BTC-Knoten bei 815.000 und 815.001 beide aktiv, ein Knoten bei 815.010 wäre jedoch als In-sync markiert.

Während des initialen Health Checks oder nach einem Verbindungsabbruch könnte die erste Antwort eines Knotens fälschlicherweise als Aktiv statt als In-sync markiert werden. Ein Warten auf eine vollständige 10-Sekunden-Prüfung würde die App blockieren. Um dies zu vermeiden, werden Status erst aktualisiert, wenn mindestens 30 % der Knoten geantwortet haben; andernfalls bleiben die vorherigen Status erhalten. Dies wird als Erstprüfung markiert. Bei nachfolgenden Prüfungen erfolgt eine Statusaktualisierung erst, wenn 100 % der Knoten geantwortet haben, um zu verhindern, dass ausstehende Knoten mit veralteten Daten fälschlicherweise als In-sync markiert werden.

Um Benutzer nicht zu verwirren, wird während einer laufenden Erstprüfung für Knoten mit dem Status Unbestimmt oder Nicht verfügbar ein visueller Status „Wird aktualisiert…“ angezeigt. Dies erscheint als grauer Punkt mit abgeschwächtem Text.

![Diskussionsscreenshot 1](/images/engineering-notes/github/discussions/8923107/001-bfb8d9fa.webp)

Jede Health-Check-Anfrage misst den Ping, und der Knoten mit dem geringsten Ping gilt als der schnellste. Die Einstellung „Schnellsten Knoten bevorzugen“ ist standardmäßig bei ADM auf Nein und bei Coin-Knoten auf Ja gesetzt und wird separat für Coin-Knoten und Indexer angewendet.

Health Checks laufen unabhängig vom Internetverbindungsstatus, da die vom Betriebssystem gemeldete „Keine Internetverbindung“ unzuverlässig ist. Bei fehlender Verbindung ist das Ergebnis einfach, dass keine verfügbaren Knoten vorhanden sind. Die Zustände `hasEnabledNodes` und `hasAvailableNodes` aktualisieren sich, sobald mindestens drei Knoten ansprechbar sind oder eine Prüfung abgeschlossen ist, wodurch die Start-UX verbessert wird, da 10-Sekunden-Freeze vermieden werden. Überlappende Prüfungen werden verhindert; ein Fehler, bei dem `setInterval()` statt `setTimeout()` verwendet wurde, verursachte zuvor einen Anfragesturm beim Wiederherstellen der App aus dem Hintergrund.

Health Checks werden beim App-Start, nach Wiederherstellung der Verbindung, beim Öffnen eines Knotenbildschirms oder bei Aktualisierung der Knotenlisten ausgelöst. Regelmäßige Intervalle (`normalUpdateInterval`) variieren je nach Knotentyp zwischen 3 und 8 Minuten. Wenn alle aktiven Knoten ausfallen, wird ein zusätzlicher Health Check durchgeführt.

Beim Senden von HTTP-Anfragen ignoriert der Algorithmus den Status „Keine Internetverbindung“ und wartet nicht auf einen vollständigen Health Check. Er wählt entweder den schnellsten oder einen zufälligen aktiven Knoten. Wenn eine Anfrage aufgrund eines Timeouts fehlschlägt, wird der nächste Knoten versucht und der fehlgeschlagene als Nicht verfügbar markiert. HTTP-Fehler wie 404 gelten nicht als Fehlschlag. Ausstehende Anfragen werden nach Wiederherstellung der Verbindung immer abgeschlossen, sodass Vorgänge wie das Speichern einer Kontaktliste nicht unterbrochen werden.
