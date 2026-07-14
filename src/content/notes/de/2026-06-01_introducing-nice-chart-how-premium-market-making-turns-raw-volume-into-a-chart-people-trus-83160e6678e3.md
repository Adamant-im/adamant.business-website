---
title: "Nice Chart: Premium-Preisgestaltung für Market-Making"
slug: "introducing-nice-chart-how-premium-market-making-turns-raw-volume-into-a-chart-people-trus-83160e6678e3"
description: "ADAMANTs aktualisiertes Nice-Chart-Modul formt die Spotpreisentwicklung, sodass ein Token lebendig, liquid und durchdacht wirkt — nicht wie ein vergessener Bot."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/introducing-nice-chart-how-premium-market-making-turns-raw-volume-into-a-chart-people-trust-83160e6678e3"
publishedAt: "2026-06-01T08:42:48.686Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/83160e6678e3/001-1-2ebag0oqbrqff72gxpcsbw-png.webp"
cardSpan: "full"
originalId: "medium:83160e6678e3"
locale: "de"
placeholder: false
---

ADAMANTs aktualisiertes Nice-Chart-Modul formt die Spotpreisentwicklung, sodass ein Token lebendig, liquid und durchdacht wirkt — nicht wie ein Bot, der nur das Volumen aktiviert hat und das ästhetische Feintuning vergaß. Es ist in der Premium-Edition des [ADAMANT Trading & Market-making bot](https://github.com/Adamant-im/adamant-tradebot) enthalten und für Teams konzipiert, denen Wahrnehmung genauso wichtig ist wie Ausführung.

### Das Chart ist Ihr Schaufenster

An einer zentralen Börse erhält ein Token nicht zuerst ein Pitch-Deck oder eine Landingpage. Es erhält ein Kerzenchart. Händler, Market Maker, Listing-Partner und Community-Mitglieder beurteilen innerhalb von Sekunden die Gesundheit: Sind die Dochten natürlich? Bewegt sich der Preis fließend oder in Sprüngen? Wirkt das Volumen wie ein echter Markt — oder wie Software, die nur die Spread ausnutzt? Einen Market-Making-Bot zu haben, ist Standard; wie sich das Chart *anfühlt*, ist der entscheidende Unterschied.

Klassische Bots, die nur innerhalb der Spread agieren, erfüllen ihre Aufgabe — sie platzieren Orders, rotieren Inventar und generieren Handelsdaten. Doch ohne gezielte Preisgestaltung erzählen Charts oft die falsche Geschichte: ungleichmäßige Kerzen, abrupte Sprünge, die "Algorithmus" statt "Markt" signalisieren, Artefakte nach Neustarts und kurze Erinnerung aufgrund begrenzter Börsen-Handelsverläufe. Das Ergebnis ist nicht immer fehlerhafter Handel; es ist gebrochenes Vertrauen.

Nice Chart ersetzt keine Risikosteuerung, Spread-Pflege oder Liquiditätsmodule. Es fügt den bereits bestehenden operativen Sicherheitsvorkehrungen eine bewusste ästhetische Preisgestaltung hinzu.

### Was Nice Chart leistet

Nice Chart ist ein dediziertes Preisformungsmodul für das Trader-Modul. Während der Bot weiterhin Spread, Price-Watcher-Grenzen, MM-Policy und Orderbuch-Sicherheit beachtet, fragt Nice Chart kontinuierlich: Angesichts der aktuellen Kerze und der bekannten Historie — welcher nächste Handelspreis wäre der natürlichste, ohne den sicheren Bereich zu verlassen?

In der Praxis bedeutet das glattere, glaubwürdigere Kerzen mit weniger harten Diskontinuitäten; Kontinuität nach Neustarts, da die Historie erinnert statt bei jedem Deployment neu erfunden wird; sanfte Degradation bei dünnen Börsendaten, mit Rückgriff auf gesammelte Historie und klaren Warnungen statt blindem Raten; sowie bestmögliche Kerzenschlussbildung, bei der der Bot — wenn Sicherheitsprüfungen es erlauben — in Richtung eines kohärenteren Schlusses steuert, niemals jedoch Risikoregeln übergeht.

### Hinter den Kulissen

Nice Chart lebt im eigenen Modul `trade/mm_nice_chart.js` und wird über eine Soft-Dependency in `mm_trader` eingebunden. Fehlt das Modul in einem Custom-Build, verhält sich Trader weiterhin wie bisher. Gibt Nice Chart ungültige Ausgaben zurück, weicht Trader sicher zurück — kein Absturz, kein stilles Überschreiben von Sicherheitsfunktionen. Diese Architektur ist entscheidend für den Unterschied zwischen Premium- und Basisversion: fortgeschrittene Chart-Gestaltung wird dort bereitgestellt, wo sie hingehört, ohne jede Installation mit unnötigem Overhead zu belasten.

Börsen-Handelsendpunkte sind kurzlebig, daher arbeitet Nice Chart mit einer gemeinsamen Markthistorie-Schicht, die einen aktiven In-Memory-Zustand für den Markt hält, Kerzen in die DB speichert, etwa 90 Tage Historie behält und Entscheidungen auf Basis eines ~30-Tage-Analysefensters trifft. Zudem werden Trades anhand stabiler Identität (Trade-ID, Zeitstempel, Side/Preis-Fallbacks) dedupliziert. Der Bot nutzt ein dauerhaftes Handelsprotokoll, das Neustarts überlebt — entscheidend für Emittenten, die häufig neu deployen.

Kerzen werden zeithorizontunabhängig aus demselben Trade-Stream gebildet, egal ob live oder bei Berichtsanalyse, wodurch das klassische Risiko von Simulator-Produktions-Abweichungen reduziert wird. Premium-Teams erhalten einen interaktiven HTML-Simulator `trade/tests/nice_chart.test.js`, der mehrere Lightweight-Charts-Ansichten für verschiedene Zeiträume rendert, Basis- vs. Nice-Chart-Pfade bei identischen Eingaben vergleicht und `snapshot` (Live-Börsendaten) und `db` (gesammelte Historie) als Modi für qualitative QA unterstützt, bevor echtes Kapital eingesetzt wird.

Die Sicherheit bleibt weiterhin oberste Priorität. Nice Chart schlägt einen begrenzten Zielkorridor vor, keinen beliebigen Preis. `mm_trader` schneidet diesen Korridor mit Spread-Grenzen, Watcher-Bedingungen, policyabhängigen Orderbuchregeln und Liquiditätsprüfungen, bevor Orders platziert werden. Die Korrektur des Kerzenschlusses erfolgt bestmöglicherweise und ohne Umgehung — Ästhetik gewinnt niemals gegenüber Ausführungssicherheit.

### Für wen ist das?

Token-Emittenten und Krypto-Projekte profitieren, weil ein Chart soziale Beweiskraft hat; Nice Chart hilft, tägliche Kerzen als Geschichte organischen Handels zu erzählen statt mechanischen Rauschens, besonders bei Paaren, bei denen visuelles Vertrauen die Haltung der Inhaber beeinflusst. Börsen und Market-Making-Desks profitieren, weil Partner Charts über verschiedene Handelsplätze vergleichen und ein polierter Handelsverlauf Gespräche wie „Erklären Sie mal diese Dochte“ reduziert. Power-User mit Premium-Builds erhalten eine ästhetische Schicht — den finalen Feinschliff eines Stacks, der bereits für den Betrieb optimiert ist.

Der Open-Source-Basisbot setzt weiterhin den Standard-Trader-Pfad fort. Nice Chart ist eine Premium-Funktion für Teams, die für eine fortgeschrittene Marktdarstellung zahlen.

![Einführung von Nice Chart: Wie Premium-Market-Making rohes Volumen in ein vertrauenswürdiges Chart verwandelt](/images/engineering-notes/medium/83160e6678e3/002-1-rhpseh8d6qk4rkb0slsxuq-png.webp)

Ziel ist kein gefälschtes BTC-Chart bei einem Mikrocap — sondern ein Chart, das die wahre Geschichte des Tokens nicht stört.

### Praktische Anwendung

Konzeptionell aktivieren Sie Trader in einer Spot-Premium-Konfiguration mit aktiviertem Nice Chart, beobachten die Verengung des Korridors und das Kerzenverhalten über eine Sitzung hinweg und starten den Bot neu, um Kontinuität statt Amnesie zu bestätigen. Visuell führen Sie den Nice-Chart-Simulator mit Ihrer Konfiguration aus — der `trader`-Modus mit `db`-Seed kommt dem am nächsten, was die Produktion sich merkt, während `snapshot` das Kaltstart-Verhalten unter Stress testet. Operativ passen Sie `mm_minInterval` bewusst an; der Bot warnt, wenn Ihr Trader-Rhythmus Nice Chart in einen degradierten Nur-Schluss-Modus zwingt, was bewusste Transparenz und keine versteckte Degradation darstellt.

Implementierungspfad: [Feature-Issue #94](https://github.com/Adamant-im/adamant-tradebot/issues/94).

Jedes ernsthafte Projekt kann Market-Making kaufen oder betreiben. Weniger investieren jedoch darin, wie ihr Markt stündlich auf dem Chart aussieht, den jeder als Screenshot teilt. Nice Chart ist ADAMANTs Antwort für Premium-Kunden, die möchten, dass die Bot-Ausgabe durchdacht wirkt — glattere Kerzen, stabilere Kontinuität, ehrliche Fallbacks und Werkzeuge, um den Unterschied *vor* dem Kapitaleinsatz zu sehen.
