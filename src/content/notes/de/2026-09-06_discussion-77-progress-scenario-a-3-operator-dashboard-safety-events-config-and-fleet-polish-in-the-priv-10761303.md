---
title: "Szenario A-3: Operator-Dashboard, Sicherheitsereignisse und Flottenoptimierung im privaten WebUI"
slug: "discussion-77-progress-scenario-a-3-operator-dashboard-safety-events-config-and-fleet-polish-in-the-priv-10761303"
description: "Ein Fortschrittsbericht für Szenario A (privates, selbst gehostetes WebUI, directHttp-Transport) für den ADAMANT TradeBot. Das WebUI verbindet sich nicht mit Börsen."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/77"
publishedAt: "2026-09-06T18:53:34Z"
author: "massivedev0"
authorUrl: "https://github.com/massivedev0"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10761303"
locale: "de"
placeholder: false
---

Dies ist ein Fortschrittsbericht für Szenario A (privates, selbst gehostetes WebUI, `directHttp`-Transport) für den ADAMANT TradeBot. Das WebUI stellt niemals eine Verbindung zu Börsen her; alle Markt-, Konto- und Parameterdaten fließen über die `/api/v1`-API des Bots.

Das bot-spezifische Dashboard ist nun die primäre Ansicht nach Auswahl eines Bot-Tabs. Es bietet einen Überblick über das Paar, die Börse und den Market-Making-Status via `GET /api/v1/status`, ergänzt um 24-Stunden-Preis- und Volumendaten. Eine Feature-Edition-Kennzeichnung wird aus den installierten Bot-Funktionen abgeleitet, nicht aus den aktiven Modulen. Das Dashboard umfasst ein kompaktes Preisdiagramm mit sich bildender Kerze, ein farbcodiertes Modulraster, eine Zusammenfassung der Handelsparameter sowie strukturierte Salden mit offenen Aufträgen. Das Starten von MM sendet nun keine Strategie-Überschreibung mehr, wodurch der Bot seine aktuelle Richtlinie beibehalten kann.

![Operator-Dashboard: MM-Status, Feature-Edition, Modulraster, Parameter-Zusammenfassung und kompaktes Diagramm](/images/engineering-notes/github/discussions/10761303/001-32674fae63.webp)

Die Marktansichten wurden optimiert, einschließlich sich bildender Kerzen im OHLC-Diagramm, Bot-Auftragsmarkierungen im Orderbuch und Overlays für offene Aufträge. Stornierungsaktionen senden `{ id, market, side }`, und bereits ausgeführte Aufträge werden für den Operator als Erfolg gewertet.

![Markt-Tab: offene Aufträge, Orderbuch mit Spread, Kauf-/Verkaufsformulare, Salden](/images/engineering-notes/github/discussions/10761303/002-47dd4a54b7.webp)

Die Parameter-Ansicht enthält nun einen 12-Stunden-Live-Statusstreifen, der den Inventar-USD-Mix und den Nominalwert offener Aufträge nach Zweck in der Zeitzone des Operators anzeigt. Stundenrahmen aus der lokalen Status-Historie weisen auf beeinträchtigte oder gestoppte Stunden hin. Wenn der Bot MM automatisch stoppt oder eine Ladder aus Sicherheitsgründen pausiert, zeigt das WebUI einen Dialog basierend auf dem Benachrichtigungstext des Bots an und spiegelt den Notfallstatus wider.

![Parameter: Master-MM-Schalter, 12h-Live-Status, Liquiditäts- und Preisbeobachtungsgruppen](/images/engineering-notes/github/discussions/10761303/003-bfb5b261fd.webp)

Ein Ereignis-Board bietet ein Audit-Protokoll für Parameteränderungen mit Saldoschnappschüssen zum Zeitpunkt der Änderung, Sicherheitskennzeichnungen und einer Aktion zum Fortsetzen der Ladder direkt aus den Zeilen der Sicherheitsereignisse.

![Ereignisse: Parameter-Audit-Protokoll mit Sicherheits-Autostopp und Saldo-Kontext](/images/engineering-notes/github/discussions/10761303/004-241365a624.webp)

Die Admin-Konfigurationsansicht zeigt die Laufzeitintegrität, Paarmetadaten und einen Live-Baum der Handelsparameter in gleicher Höhe an. Sie bietet eine bereinigte `config.json`-Zusammenfassung sowie Tabs für Roh-JSON, ohne Geheimnisse preiszugeben.

![Konfiguration: Laufzeitintegrität, Paarmetadaten, Live-Handelsparameter-Baum, Konfigurationszusammenfassung](/images/engineering-notes/github/discussions/10761303/005-271ca78365.webp)

Verbesserungen an der Flotten-Shell umfassen editierbare Registrierungsfelder für Label und Konto, wobei Header-Tabs diese Informationen anzeigen. Keep-Alive-Bereiche überstehen nun Bot-Tab-Wechsel, indem sie einen eingefrorenen Redux-Schnappschuss lesen, anstatt in einen leeren Zustand zusammenzuklappen.

Dieser Schritt überführt das WebUI von einer Messenger-artigen Schnittstelle zu einem persistenten Dashboard mit Diagrammen, Modulen und Parametern. Sicherheitsereignisse enthalten nun einen Saldo-Kontext und Fortsetzungsaktionen, was das bisherige Rätselraten darüber, warum MM gestoppt wurde, ersetzt. Multi-Bot-Tabs mit Keep-Alive-Bereichen und ein Flottenüberblick verhindern Kontextverluste beim Wechsel zwischen Bots. Die Admin-Konfigurationsansicht macht die Laufzeitintegrität und einen bereinigten Konfigurationsschnappschuss sichtbar. MM-Qualitätspunkte (`working`, `degraded`, `stopped`) werden aus `/status` mit einer 10-minütigen Karenzzeit nach dem Start abgeleitet. Das System bleibt vollständig selbst gehostet: Das WebUI befindet sich hinter einem Reverse-Proxy, Bots laufen auf der Infrastruktur des Operators, es werden keine Börsen-API-Schlüssel im WebUI gespeichert und 2FA ist obligatorisch.

Der Stack besteht aus WebUI v0.2.0, erstellt mit Vite, React 18, Chakra UI, Fastify BFF und einem SQLite-Ereignisprotokoll. Der Bot stellt Endpunkte wie `GET /api/v1/bot`, `/status`, `/params` und `/account/*` sowie ein `params:updated`-WebSocket bereit. Der Transport ist auf `DirectHttpTransport` beschränkt. Das private Self-Host-Szenario A ist für den MVP-Umfang funktionsvollständig. Zukünftige Arbeiten konzentrieren sich auf Szenario B, ein öffentliches Abonnement-WebUI via Outbound-Relay und Lizenz-Token.
