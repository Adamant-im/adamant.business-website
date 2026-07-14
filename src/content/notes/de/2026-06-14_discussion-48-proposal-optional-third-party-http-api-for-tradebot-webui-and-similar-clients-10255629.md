---
title: "Vorschlag: Optionale Drittanbieter-HTTP-API für TradeBot"
slug: "discussion-48-proposal-optional-third-party-http-api-for-tradebot-webui-and-similar-clients-10255629"
description: "Dieser Vorschlag führt eine optionale Bot-API v1 ein, die externen Clients wie einer grafischen WebUI die Überwachung und Steuerung eines TradeBot ermöglicht, ohne auf ADAMANT Messenger oder T…"
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/48"
publishedAt: "2026-06-14T12:09:43Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10255629"
locale: "de"
placeholder: false
---

Dieser Vorschlag führt eine optionale Bot-API v1 ein, die externen Clients – beispielsweise einer grafischen WebUI – ermöglicht, einen Tradebot zu überwachen und zu steuern, ohne auf ADAMANT Messenger oder Telegram angewiesen zu sein. In dieser Architektur kommuniziert die WebUI ausschließlich mit der Bot-API, wodurch sichergestellt wird, dass der Bot die einzige verlässliche Datenquelle für Marktinformationen (Ticker, Orderbuch, Trades, OHLC), Kontozustand, Handelsparameter und Befehlsausführung bleibt.

Die API zielt darauf ab, eine optionale eingehende HTTP- und WebSocket-Schnittstelle im Bot bereitzustellen, die einen `private_webui`-Port in der Konfiguration nutzt. Die Authentifizierung erfolgt über JWT, das auf dem Bot mithilfe eines `private_webui_secret_key` verifiziert wird, während die Benutzerkonten in dem externen Client verbleiben. Die API stellt strukturierte JSON-Endpunkte für Markt-, Konto- und Parameterdaten sowie Befehlswrappern bereit. Ein `GET /bot`-Endpunkt dient als Bootstrap und gibt Funktionen wie installierte `mm_*.js`-Module und Feature-Flags der Börse zurück. Für Live-Änderungen von Handelsparametern wird ein WebSocket-`params:updated`-Ereignis verfügbar sein. Transportmodi unterstützen zunächst `directHttp` für selbstgehostete Clients, `relayWs` für Abonnement-Hosting ist für eine spätere Phase geplant.

Diese Diskussion schließt Zahlungs-, Abrechnungs- oder Lizenz-Benutzeroberflächen sowie konkrete Implementierungsdetails der WebUI aus. Die Community ist eingeladen, Feedback dazu zu geben, ob diese API als optionales Modul im Open-Source-Repository `adamant-tradebot` enthalten sein sollte, welche Endpunkte über Messenger-Befehle hinaus für einen minimal nützlichen Client erforderlich sind und ob für Markt- und Kontodaten in v1 Polling oder Push bevorzugt wird. Ein Tracking-Issue wird im Repository `adamant-tradebot` erstellt, das auf diese Diskussion verweist. Eine Premium-Referenzimplementierung ist derzeit in Arbeit im Branch `refactor/new-webui-api` des Projekts `adamant-tradebot-me`.
