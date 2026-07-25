---
title: "ADAMANT Explorer: Überarbeitung der mobilen UX und für kleine Bildschirme"
slug: "discussion-70-adamant-explorer-mobile-and-small-screen-ux-overhaul-10490745"
description: "ADAMANT Explorer hat die mobile Darstellung optimiert, sodass komplexe Blockchain-Daten wie Tabellen, Adressen und Monitore auf kleinen Bildschirmen übersichtlich bleiben."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/70"
publishedAt: "2026-07-24T15:52:32Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10490745"
locale: "de"
placeholder: false
---

ADAMANT Explorer hat eine gezielte Überarbeitung des Verhaltens auf Mobilgeräten und kleinen Bildschirmen abgeschlossen, damit komplexe Blockchain-Daten – Tabellen, Adressen, Monitore, die Peer-Karte und das Netzwerkgrafik-Diagramm – nach dem Vue-Redesign auf Smartphones und in schmalen Viewports lesbar und nutzbar bleiben. Die Arbeit wurde in Adamant-im/adamant-explorer#42 in den `dev`-Branch gemergt und schließt Issues zur Anzeige/mobilen UX sowie zum Rauschen bei WebSocket-Blockbestätigungen, ergänzt durch einen Fix für das iOS-Fokus-Zoomen.

![Startseite — letzte Operationen](/images/engineering-notes/github/discussions/10490745/001-7b8f5a7ef4.webp)

![Transaktionsdetails](/images/engineering-notes/github/discussions/10490745/002-95436bddca.webp)

![Adressübersicht](/images/engineering-notes/github/discussions/10490745/003-7f8d8ca009.webp)

![Blockdetails](/images/engineering-notes/github/discussions/10490745/004-b4abc82ab8.webp)

![Delegate Monitor](/images/engineering-notes/github/discussions/10490745/005-d25c6a646f.webp)

![Netzwerk-Monitor](/images/engineering-notes/github/discussions/10490745/006-864cc5422f.webp)

## Änderungen an der Oberfläche

Die universelle Suche wurde aus dem eingeklappten Menü in die obere Leiste zwischen Logo und Menü-Toggle verschoben und wird auf kleinen Bildschirmen kompakt dargestellt, während die Netzwerkleiste einen komfortablen Status-Einschub beibehält. Auf der Startseite wurde das gedrängte Tabellen-Fallback durch Operationskarten ersetzt. Block-, Transaktions- und Adressseiten verwenden auf Mobilgeräten nun kompakte, scrollbare Transaktionstabellen; die Blockliste zeigt eine `TXS`-Spaltenanzahl, und die Transaktionsseite blendet die doppelte Ledger-Zeile aus. Delegate Monitor, Netzwerk-Monitor-Peers, Top-Accounts und reservierte Wallets erhalten `.table-mobile`-Karten-Fallbacks, mobile Sortiersteuerungen und ein verfeinertes ARIA. Benutzerdefinierte Tooltips werden beim Tippen ausgeblendet, sodass auf Touch-Geräten keine Tooltips hängen bleiben, und das Suchfeld löst beim Fokus nicht mehr den Zoom-und-Scroll-Effekt von Safari aus.

## Implementierungshinweise

Zwei strukturelle Breakpoints steuern das Layout. Bei einer Breite von `<=720px` klappen Datentabellen zu Karten oder kompakten Scroll-Tabellen zusammen; bei `<=420px` werden diese Karten vertikal neu gestapelt. Desktop- und Tablet-Layouts über `720px` bleiben unverändert.

Jede Zeile auf der Startseite ist eine CSS-Grid-Karte. Bei `<=720px` verläuft die Route in einer Zeile als `Absender -> Empfänger  Betrag  öffnen`; bei `<=420px` wird sie mit einem zentrierten Abwärtspfeil und dem Betrag daneben neu gestapelt, wobei Absender und Empfänger horizontal zentriert sind. Navigation und Tooltip sind nur an das explizite Öffnen-Steuerelement gebunden, nicht an die gesamte Karte.

Block- und Adress-Transaktionslisten bleiben auf Mobilgeräten echte Tabellen – horizontal scrollbar innerhalb ihres Containers mit einem festen, kompakten Spaltensatz (Typ, ID, Absender, Empfänger, Betrag; plus Datum auf der Adressseite) und ohne Kopier-Buttons pro Zeile. Die Blockliste verzichtet auf Mobilgeräten auf die Sortierung.

Ein subtiler Umbruchfehler betraf Zusammenfassungswerte: Adressen und Transaktions-IDs wurden selbst bei ausreichendem Platz auf ein einzelnes nachstehendes Zeichen umgebrochen. Die Ursache war ein `flex`-Element mit `min-width: 0` und `overflow-wrap: anywhere`, das auf seinen 1-Zeichen-Min-Content-Beitrag kollabierte, wodurch die Breite des Kopier-Buttons einen Umbruch erzwang. Der Wert wächst nun, um die Zelle auszufüllen (`flex: 1`), wodurch Adressen und Transaktions-IDs in einer Zeile bleiben, während Public Keys weiterhin sauber umbrechen.

Der einzelne Tooltip auf Body-Ebene ist nur während der Sichtbarkeit pointer-interaktiv und wird bei `pointerdown` ausgeblendet, was ein Beenden auf Touch-Geräten garantiert, wo der Auto-Hide-Timer nicht immer zuverlässig ist. Für iOS gilt: Mobile Safari zoomt jedes fokussierte Eingabefeld, dessen Schriftgröße unter 16px liegt, was dazu führt, dass die Seite verschoben wird; das Suchfeld ist auf 16px fixiert, während das Viewport-Meta den Benutzer-Zoom für die Barrierefreiheit aktiviert lässt.

## Node WebSocket-Blockbestätigung

Kompakte WebSocket-Blockbenachrichtigungen werden über die Node REST API mit einem einzelnen begrenzten Wiederholungsversuch für die erwartete SQL-Sichtbarkeitsverzögerung zwischen den Nodes hydriert. Ein Höhen-Fallback muss weiterhin die angekündigte Block-ID und -Höhe bestätigen. Der erste Fehlversuch wird als `debug` protokolliert und eine `warn` wird nur ausgegeben, wenn die Bestätigung wirklich erschöpft ist, sodass routinemäßige Timing-Unterschiede zwischen Nodes kein Fehlerrauschen mehr erzeugen. Node-spezifische Unit-Tests decken die Pfade für Wiederholung, Fallback, Validierung und Protokollierung ab.

## Validierung

`npm run lint`, `npm run format:check` und `npm run test:unit` (225 Tests, einschließlich WebSocket-Block-Hydrierung) sind erfolgreich. `git diff --check` ist sauber, und Desktop- sowie Tablet-Layouts über 720px sind unverändert ohne Regressionen.
