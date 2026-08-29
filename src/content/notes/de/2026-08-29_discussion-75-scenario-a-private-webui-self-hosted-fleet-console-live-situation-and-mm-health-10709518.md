---
title: "Private WebUI: Selbstgehostete Flottenkonsole für ADAMANT Market-Making-Software"
slug: "discussion-75-scenario-a-private-webui-self-hosted-fleet-console-live-situation-and-mm-health-10709518"
description: "Ein Fortschrittsbericht zu Szenario A der privaten, selbstgehosteten WebUI: eine Operator-Konsole für eine Flotte von ADAMANT Market-Making-Instanzen."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/75"
publishedAt: "2026-08-29T09:35:34Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10709518"
locale: "de"
placeholder: false
---

## Kontext

Dies ist ein Fortschrittsbericht zu **Szenario A** der privaten, selbstgehosteten WebUI: eine zentrale Operator-Konsole für eine Flotte von ADAMANT Market-Making-Software-Instanzen. Szenario B (öffentliche Abonnement-WebUI, Outbound-Relay, Lizenz-Token) wird hier nicht behandelt.

Eine zentrale architektonische Vorgabe für Operatoren: Der Browser und das WebUI-Backend kommunizieren niemals direkt mit den Börsen. Charts, Orderbücher, Guthaben, Parameter und Befehle fließen ausschließlich über die `/api/v1`-Schnittstelle des jeweiligen Bots. Exchange-API-Schlüssel verbleiben auf dem Bot.

## Was Sie heute bereits nutzen können

Ein lokaler WebUI-Prozess (Vite UI + Fastify BFF) stellt eine Verbindung zu einem oder mehreren Bots her, die mit aktiviertem `private_webui` und einem gemeinsamen HMAC-Secret laufen. Sie fügen jeden Bot per URL hinzu. Die WebUI speichert das Flottenregister, der Bot selbst nicht. Operator-Konten, 2FA und Rollen werden in der WebUI verwaltet, während der Bot lediglich ein signiertes JWT validiert, das `{ login, role }` enthält.

![WebUI-Anmeldung](/images/engineering-notes/github/discussions/10709518/001-65a9054569.webp)

*Anmeldung. Operator-Zugangsdaten liegen in der WebUI (E-Mail / ADM / ETH + obligatorische 2FA). Jeder Bot prüft nur das signierte JWT – es gibt keinen Login-Endpunkt auf dem Bot.*

## Flotten-Tabs und das Market-Desk

Die Tabs in der Kopfzeile repräsentieren jeweils einen Bot. Status-Punkte stammen vom JWT-authentifizierten `GET /api/v1/status`-Endpunkt und zeigen `working`, `degraded` oder `stopped` an – nicht den öffentlichen Liveness-Probe-Status. Der öffentliche `GET /api/v1/health`-Endpunkt gibt lediglich `{ status, transport }` zurück, damit eine erreichbare Bind-Adresse keine Informationen über die MM-Qualität preisgibt.

Die **Market**-Ansicht bietet Kerzencharts mit überlagerten Bot-Orders, ein Live-Orderbuch mit Spread, 24h-Spanne und Volumen, Paar-Inventar in Coin und USD sowie die Möglichkeit zur manuellen Platzierung von Limit-Orders. Ein Klick auf eine Zeile im Orderbuch übernimmt Seite, Preis und Menge. Ein Abbruch sendet `{ id, market, side }` und entfernt die Zeile, sobald die Börse die Order als nicht mehr existent führt.

![Market-Desk](/images/engineering-notes/github/discussions/10709518/002-04f3b72fdc.webp)

*Market. Kerzen, Orderbuch, USD-Inventar und Order-Platzierung für `PENGUIN/USDT` auf BiFinance – ein Tab in einer Multi-Bot-Flotte.*

## Parameter und Live-Situation

**Parameter** stellt das vollständige `WebUiTradeParams`-Formular bereit: einen Master-MM-Schalter sowie Gruppen, die den Bot-`capabilities` folgen (fehlende `trade/mm_*.js`-Module bleiben gesperrt). Liquidität, Preisbeobachtung, Ladders, Volume-Trader, Analog-Hinweise und andere Einstellungen werden über `PUT /params` bearbeitet und via Socket.IO über `params:updated` live aktualisiert.

Die **Live-Situation** zeigt einen 12-Stunden-Verlauf im Browser: Inventar (Basis + Quote USD) und offene Orders nach Zweck. Balken füllen sich, solange der Bot verbunden bleibt. Gelbe Stundenrahmen zeigen an, dass die Stunde `degraded` war; Grau bedeutet, dass das MM `stopped` war. Der Rahmen umschließt den Balken, nicht die volle Chart-Höhe.

Auf dem Bot wird die MM-Qualität außerhalb von `trade/mm_*.js` gemessen. Der Aufruf von `/start` (oder PUT MM on) setzt identische Zeitstempel für `mm_generalInitTs` und `mm_generalRestartTs`. Ein Prozess-Neustart bei bereits aktivem MM behält den Init-Zeitstempel bei, erhöht aber den Restart-Zeitstempel, sodass man einen sauberen Start von einem Crash-Neustart unterscheiden kann.

![Parameter und Live-Situation](/images/engineering-notes/github/discussions/10709518/003-5723175f10.webp)

*Parameter. Master-MM-Schalter, 12-Stunden-Live-Situation (Inventar und offene Orders in $), Liquidität, Preisbeobachtung und Ladders – Gruppen werden gesperrt, wenn das Modul nicht im Bot-Build enthalten ist.*

## Befehle und Audit-Trail

**Befehle** kapselt dieselben Handler wie der Messenger und die CLI: fill, close, make-price, TWAP, transfer, withdraw und Abfragen. Destruktive POST-Anfragen erfordern eine Bestätigung. Die Konsole auf der rechten Seite zeigt den Markdown-Feed des Bots (Guthaben, Stornierungen, Epochen-Resets).

**Events** ist das Audit-Log der WebUI, das in SQLite gespeichert wird. Es protokolliert, wer was geändert hat (`admin@…` vs `bot`), deckt sowohl Parameter als auch Befehle ab und bietet Such-, Filter- und JSON-Export-Funktionen.

![Befehlskonsole](/images/engineering-notes/github/discussions/10709518/004-2adccfacb9.webp)

*Befehle. Formulare für Fill / Close / Make-Price sowie die Live-Konsole – derselbe Befehlssatz wie bei ADAMANT Messenger und CLI, strukturiert für den Arbeitsplatz.*

![Events-Audit](/images/engineering-notes/github/discussions/10709518/005-9665688ad1.webp)

*Events. Zeitgestempelte Parameteränderungen und Befehls-Payloads, zugeordnet zum Operator oder Bot.*

## Vertragliche Hinweise für Operatoren

Der `GET /health`-Endpunkt erfordert kein JWT und gibt nur `{ status, transport }` zurück, weiterhin gebunden an `private_webui_bind_host` und die Allowlist. Der JWT-authentifizierte `GET /status`-Endpunkt liefert `mmActive`, `mmState`, optionale Init- und Restart-Zeitstempel, Kulanzfristen und Gründe für `degraded`. `GET /params` liefert einen vollständigen Snapshot; `PUT /params` wendet nur geänderte Slices an, damit nicht zusammenhängende Module nicht erneut aktiviert werden. `POST /commands/cancel` akzeptiert ein optionales `side`-Feld (`buy` oder `sell`). Bezüglich der Rollen: Ein `read-only`-JWT kann keine Schreibvorgänge ausführen, während Token ohne `role`-Feld den ursprünglichen vollen Zugriff beibehalten. Ältere Bots ohne `/status` erscheinen weiterhin in der Flotte – die WebUI greift hier auf einen erweiterten `/health`-Payload zurück.

## Nicht in diesem Release enthalten

Szenario B (Relay, Zahlungssitzung, Lizenzumfang) ist ausgeschlossen. Ticker-, Orderbuch- und Guthabendaten nutzen weiterhin REST-Polling in Intervallen von etwa 10 Sekunden anstelle von WebSocket-Push. Browser und WebUI kommunizieren nicht direkt mit den Börsen.
