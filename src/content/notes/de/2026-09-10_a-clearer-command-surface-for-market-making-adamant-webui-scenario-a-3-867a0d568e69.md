---
title: "Eine klarere Bedienoberfläche für Market Making: ADAMANT WebUI Szenario A-3"
slug: "a-clearer-command-surface-for-market-making-adamant-webui-scenario-a-3-867a0d568e69"
description: "Market-Making-Infrastrukturen sind oft technisch leistungsfähig, aber operativ undurchsichtig. Das dritte MVP-Inkrement der ADAMANT WebUI schafft hier Abhilfe."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/a-clearer-command-surface-for-market-making-adamant-webui-scenario-a-3-867a0d568e69"
publishedAt: "2026-09-10T20:23:38.199Z"
author: "ADAMANT Messenger"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:867a0d568e69"
coverImage: "/images/engineering-notes/medium/867a0d568e69/001-880955b2e4.webp"
locale: "de"
placeholder: false
---

Market-Making-Infrastrukturen sind oft technisch leistungsfähig, aber operativ undurchsichtig. Der Status findet sich in einem Befehl, die Parameter in einem anderen, und der Grund für einen Sicherheitsstopp ist womöglich tief in den Protokollen vergraben. Das dritte MVP-Inkrement von Szenario A, die private, selbst gehostete ADAMANT Market-Making WebUI, wandelt den Browser von einer Ansammlung isolierter Steuerelemente in eine übersichtlichere Bedienoberfläche für Betreiber um, die täglich Token-Liquidität verwalten.

Das neue Dashboard pro Bot ist die primäre Ansicht. Es führt Kontext zu Handelspaar und Börse, den Market-Making-Status aus der /status API des Bots, ein Feature-Edition-Badge, ein kompaktes 15-Minuten-Preisdiagramm, aktive und inaktive Module, eine lesbare Parameterzusammenfassung, Salden sowie offene Aufträge nach Zweck gruppiert zusammen. Das Editions-Badge – von Basic bis Full – leitet sich aus den installierten Fähigkeiten des Bots ab, nicht daraus, welche Module in diesem Moment aktiviert sind. Dies verhindert, dass ein Betreiber den verwalteten Bot falsch identifiziert, falls ein Modul vorübergehend deaktiviert ist.

![Eine klarere Bedienoberfläche für Market Making: ADAMANT WebUI Szenario A-3](/images/engineering-notes/medium/867a0d568e69/002-57c6753fc6.webp)

Die Start-Aktion wurde bewusst weniger präskriptiv gestaltet. Das Starten des Market Makings sendet nun keine Strategie-Überschreibung mehr; der Bot behält die aktuelle Richtlinie bei, die bereits auf dem Bot selbst konfiguriert ist. Dies verhindert, dass ein Klick in der Benutzeroberfläche das Betriebsmodell einer aktiven Strategie unbemerkt ändert. Auf Marktebene können Betreiber eine sich bildende Kerze im OHLC-Diagramm, Bot-Auftragsmarkierungen im Orderbuch und bei aktuellen Trades, Overlays für offene Aufträge, Spread-Kontext, Salden und die Oberfläche zur Auftragseingabe sehen. Das Stornieren eines Auftrags sendet eine präzise { id, market, side } Anfrage; ein Auftrag, der bereits verschwunden ist, wird als erfolgreiches Ergebnis behandelt und nicht als alarmierender, falscher Fehler. Dies unterscheidet eine echte betriebliche Ausnahme von dem normalen Wettlauf zwischen einem menschlichen Klick und einem bereits ausgeführten oder stornierten Auftrag.

Szenario A-3 bindet den Sicherheitspfad in die WebUI ein. Wenn der Bot das Market Making automatisch stoppt oder eine Leiter (Ladder) aus Sicherheitsgründen pausiert, zeigt der Browser den Benachrichtigungstext des Bots in einem Dialog an und spiegelt den Notfallstatus in den Parametern wider. Sicherheitsereignisse erscheinen mit sichtbaren Badges im Ereignis-Board (Events); eine ausgesetzte Leiter kann aus der entsprechenden Ereigniszeile wieder aufgenommen werden. Das Ereignis-Board protokolliert zudem Parameteränderungen aus der WebUI gegenüber bot-seitigen Quellen, zeigt den Market-Making-Status an und kann Salden-Snapshots sowie Deltas zum Zeitpunkt einer Aktion darstellen. Dies schafft einen kohärenten Prüfpfad für die Untersuchung von Vorfällen.

![Eine klarere Bedienoberfläche für Market Making: ADAMANT WebUI Szenario A-3](/images/engineering-notes/medium/867a0d568e69/003-e5260f854d.webp)

Der Parameter-Bildschirm enthält nun einen 12-Stunden-Live-Situationsstreifen in der Zeitzone des Betreibers. Er fasst den Inventarwert und den Nominalwert offener Aufträge nach Zweck zusammen und gibt dem Betreiber ein kompaktes Gefühl dafür, wie sich Exposure und Liquiditätsplatzierung entwickelt haben. Der Gesundheitsverlauf wird in stündlichen Rahmen angezeigt: eine beeinträchtigte Stunde ist gelb, während eine Stunde mit gestopptem Market Making grau dargestellt wird. Nach einem Startvorgang beinhaltet das Qualitätsmodell eine 10-minütige Karenzzeit, damit ein neu gestarteter Bot nicht sofort anhand von Daten beurteilt wird, für deren Erstellung er noch keine Zeit hatte. Sichtbarkeit sollte Unsicherheit ehrlich ausdrücken; "in Betrieb", "beeinträchtigt" und "gestoppt" sind nützlicher als ein dauerhaft grünes Dashboard.

![Eine klarere Bedienoberfläche für Market Making: ADAMANT WebUI Szenario A-3](/images/engineering-notes/medium/867a0d568e69/004-4f86597efd.webp)

Die neue Konfigurationsansicht nur für Administratoren hält den operativen Kontext zusammen: Laufzeit, Paar und ein Live-Baum der tradeParams_*.js-Werte liegen nebeneinander, gefolgt von einer strukturierten config.json-Zusammenfassung und einer rohen JSON-Ansicht. Der Konfigurations-Snapshot ist bereinigt; Socket-Felder geben *Not included* an, wenn der Bot sie nicht meldet, und eine Börse, die minimale Handelswerte auslässt, wird als *Not provided* dargestellt, anstatt als irreführende Null.

![Eine klarere Bedienoberfläche für Market Making: ADAMANT WebUI Szenario A-3](/images/engineering-notes/medium/867a0d568e69/005-913c132505.webp)

Der Betrieb mehrerer Bots führt zu Reibungsverlusten, wenn das Wechseln von Tabs die Position des Betreibers zurücksetzt. Szenario A-3 fügt eine klarere Flotten-Shell und ein Register hinzu. Jeder Bot erhält ein editierbares Label und Konto mit nützlichen Standardwerten, die aus der Bot-ID und der Konfiguration abgeleitet sind. Transport, Version, Branch und Paar-Saldo sind auf Flottenebene sichtbar. Offline- oder unbekannte Zeilen sind ausgegraut, während verbundene Bots, die lediglich gestoppt sind, lesbar bleiben. Hinter der Schnittstelle bewahren Keep-Alive-Panels den vertikalen Bildlauf und den Status innerhalb der Seite beim Wechsel zwischen Bots und Abschnitten. Versteckte Panels lesen einen eingefrorenen Redux-Snapshot, anstatt in einen leeren Zustand zu kollabieren, was es Betreibern ermöglicht, einen Markt zu vergleichen, die Konfiguration zu prüfen und zurückzukehren, ohne den Faden zu verlieren.

Die WebUI bleibt eine private, selbst gehostete Bereitstellung. Sie verwendet DirectHttpTransport, um mit der /api/v1-Schnittstelle des Bots zu kommunizieren; der Browser und das WebUI-Backend verbinden sich nicht mit Börsen, und Börsen-API-Schlüssel gehören nicht in die WebUI. Die obligatorische 2FA für Betreiber unterstützt die Verifizierung per E-Mail, ADAMANT oder Ethereum-Wallet. Der Stack verwendet Vite, React 18, Chakra UI, ein Fastify BFF und ein SQLite-Ereignisprotokoll. Das Feature ist additiv, mit Fallback auf die bestehende /health-Route für ältere Bots, die /status noch nicht bereitstellen. Ein passender moderner Bot-Build ist für das Verhalten "Start-ohne-Strategie" erforderlich.

Szenario A, das private, selbst gehostete MVP, ist für seinen angegebenen Umfang funktionsvollständig. Das nächste Bereitstellungsmodell, Szenario B, bleibt separat: ein Outbound-Relay, eine öffentliche Abonnement-WebUI, Lizenz-Token-Umfang und Push-Marktdaten sind nicht in dieser Version enthalten. Die WebUI fragt weiterhin REST-APIs für Marktdaten ab. Diese Trennung macht den bestehenden privaten Betreiber-Workflow klarer und prüfbarer, bevor das Vertrauensmodell erweitert wird. Für Teams, die einen Token-Market-Making-Bot betreiben, ist das Ergebnis eine ruhigere Antwort auf ein grundlegendes betriebliches Bedürfnis: ein Bildschirm, der Live-Status, Steuerelemente, Historie, Konfiguration und Sicherheitskontext verbindet, während die Börsengrenze innerhalb des Bots bleibt.
