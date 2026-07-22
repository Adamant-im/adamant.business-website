---
title: "Sicherheits- und Zuverlässigkeitsprüfung des ADAMANT Explorer"
slug: "discussion-69-adamant-explorer-security-and-reliability-review-by-cryptofoundry-10464221"
description: "ADAMANT Explorer hat eine gezielte Sicherheits- und Zuverlässigkeitsprüfung seiner öffentlichen HTTP-Oberfläche, ADAMANT Node-Grenze, Redis-Cache, Socket.IO-Lifecycle, Reverse-Proxy-Vertrauen und Browser-Rendering abgeschlossen."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/69"
publishedAt: "2026-07-20T20:32:14Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10464221"
locale: "de"
placeholder: false
---

ADAMANT Explorer hat eine gezielte Sicherheits- und Zuverlässigkeitsprüfung seiner öffentlichen HTTP-Oberfläche, der ADAMANT Node-Grenze, des Redis-Cache-Verhaltens, des Socket.IO-Lifecycles, des Reverse-Proxy-Vertrauens und des Browser-Renderings abgeschlossen. Die Härtung wurde in [adamant-explorer#37](https://github.com/Adamant-im/adamant-explorer/pull/37) zusammengeführt und schließt die Issues [#23](https://github.com/Adamant-im/adamant-explorer/issues/23), [#25](https://github.com/Adamant-im/adamant-explorer/issues/25) und [#33](https://github.com/Adamant-im/adamant-explorer/issues/33). Die Prüfung umfasste die Reihenfolge der Express-Middleware, die öffentliche API-Exposition, Validierung, Rate Limiting, Reverse-Proxy-Vertrauen, ADAMANT Node-Antworten als nicht vertrauenswürdige Datengrenze, Redis-Cache-Korrektheit und Fehlerverhalten, Socket.IO-Polling und Reconnects, Browser-Rendering von Node- und Peer-gesteuerten Werten, Fehler bei optionalen Abhängigkeiten, Wechselkurs-Kontinuität, operatives Health-Reporting und Threat Modeling des Repositorys.

## Öffentliche HTTP- und API-Grenze

Der Explorer stellt nun ausschließlich die 12 same-origin API-Routen bereit, die von seiner UI benötigt werden, sowie `GET /api/networkHealth`. Sechzehn Legacy-Route-Registrierungen und Wildcard-CORS wurden entfernt. Anfragen werden vor dem Redis-Lookup oder den ADAMANT-Bereitschaftsprüfungen gegen eine exakte API-Oberfläche geprüft, wodurch verhindert wird, dass entfernte Endpunkte durch veraltete Cache-Einträge wiederbelebt werden. Öffentliche Query-Parameter verwenden nun strikte Validierung und begrenzte Paginierung. Die Anwendung wendet ein Proxy-bewusstes, prozessinternes Fixed-Window-Limit von 300 API-Anfragen pro Minute pro Client an, mit begrenztem Identitätsspeicher und einem Fail-Closed-Overflow-Bucket. Das Reverse-Proxy-Vertrauen ist explizit und validiert. Security Headers, eine eingeschränkte Content Security Policy, stabile Fehlerantworten, HTTP-Timeouts und datenminimiertes Request-Logging reduzieren die exponierte Angriffsfläche weiter.

## Verfügbarkeit und Zustandkorrektheit

`GET /api/networkHealth` meldet kohärente `live`-, `degraded`-, `critical`- oder `unavailable`-Zustände und gibt HTTP `503` nur zurück, wenn kein kohärenter Node-Snapshot erzeugt werden kann. Redis- und optionale externe Service-Ausfälle bringen nicht mehr das Kern-HTTP und statische Serving zum Absturz. Die Cache-Identität ist dort, wo erforderlich, block sensitiv, und der Wechselkurs-Aktualisierungspfad bewahrt nutzbare zuletzt bekannte Werte, während überlappende Aktualisierungen vermieden werden. Socket.IO-Polling ist serialisiert, lifecycle-bewusst und bei Upstream-Ausfällen begrenzt. Generation-Tracking, explizite Timer-Eigentümerschaft und die Unterdrückung veralteter Callbacks verhindern, dass getrennte oder neu gestartete Namespaces veraltete Arbeiten fortsetzen.

## Nicht vertrauenswürdige Daten und Browser-Sicherheit

ADAMANT Node- und Peer-Payloads bleiben nicht vertrauenswürdig, bis sie normalisiert oder validiert sind. Network Monitor-Werte werden als Text gerendert, während Routenziele, CSS-abgeleitete Werte und Koordinaten vor der Verwendung eingeschränkt werden. Frontend- und Backend-API-Pfade teilen sich nun eine einzige Quelle der Wahrheit, um Vertragsabweichungen zu verhindern.

## Kompatibilität und Integrationsauswirkungen

Die beibehaltene Explorer-API ist ein Implementierungsdetail der Web-UI und keine Allzweck-Integrations-API. Externe Anwendungen sollten [adamant-api-jsclient](https://github.com/Adamant-im/adamant-api-jsclient) für die direkte ADAMANT Node-Integration verwenden. Betreiber können `GET /api/networkHealth` für das Explorer-Monitoring nutzen. Bestehende Frontend-Routen und Deep Links bleiben kompatibel. Deployments hinter einem Reverse Proxy müssen `trustedProxies` so konfigurieren, dass sie der tatsächlichen Topologie entsprechen. HTTPS-Nodes werden bevorzugt; ein Legacy-Plaintext-HTTP-Fallback bleibt aus Kompatibilitätsgründen erhalten.

## Umfang und Folgearbeiten

Dies war ein Repository-Code- und Architekturaudit des Explorer und seiner Laufzeit-Vertrauensgrenzen, kein Audit des kryptografischen Protokolls oder des Blockchain-Konsenses. Der Rate Limiter ist absichtlich pro Prozess ausgelegt, daher sollten Multi-Replica-Deployments zusätzlich ein aggregiertes Limit an der Edge durchsetzen. Ein [Repository-Threat-Model](https://github.com/Adamant-im/adamant-explorer/blob/dev/adamant-explorer-threat-model.md) und die vollständige [Sicherheits- und Zuverlässigkeitsprüfung](https://github.com/Adamant-im/adamant-explorer/blob/dev/security_best_practices_report.md) sind verfügbar. Offene Folgearbeiten umfassen [optionale Peer-IP-Datenschutzkontrollen](https://github.com/Adamant-im/adamant-explorer/issues/20), [größere Frontend-Dependency-Upgrades](https://github.com/Adamant-im/adamant-explorer/issues/34), [ADAMANT Node-Response-Schema-Validierung](https://github.com/Adamant-im/adamant-explorer/issues/35) und [Outage-Retry und Log-Zusammenfassung](https://github.com/Adamant-im/adamant-explorer/issues/36).
