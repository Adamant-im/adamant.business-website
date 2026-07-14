---
title: "Vorschlag: Moderne grafische WebUI für ADAMANT TradeBot"
slug: "discussion-49-proposal-modern-graphical-webui-for-adamant-tradebot-private-self-host-public-subscription-10255630"
description: "Die aktuelle WebUI basiert hauptsächlich auf Text. Dieser Vorschlag beschreibt eine moderne grafische Oberfläche mit Diagrammen, Orderbüchern, Kontoständen und mehr."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/49"
publishedAt: "2026-06-14T12:09:51Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10255630"
locale: "de"
placeholder: false
---

## Kontext

Die aktuelle WebUI-Erfahrung ist überwiegend textbasiert und stützt sich auf Befehlsantworten im Messenger-Stil. Dieser Vorschlag beschreibt eine moderne grafische Schnittstelle mit Diagrammen, Orderbüchern, Kontoständen, offenen Orders, Formularen für Handelsparameter und modulbasierten Bedienfeldern. Eine zentrale architektonische Regel ist, dass die WebUI niemals direkt mit Börsen verbunden wird; alle Daten müssen über die Bot-API fließen.

## Bereitstellungsmodelle

Es werden zwei Bereitstellungsmodelle vorgeschlagen. Das erste ist eine private, selbstgehostete WebUI, die als Einmalkauf angeboten wird. In diesem Modell betreibt der Betreiber die WebUI hinter HTTPS über einen Reverse-Proxy. Die WebUI verwaltet eine Flotte von Bots und verwendet einen gemeinsamen `private_webui_secret_key`, um JSON Web Tokens (JWT) nach der Anmeldung des Betreibers zu signieren, einschließlich lokaler Benutzer und Zwei-Faktor-Authentifizierung. Der WebUI-Server kommuniziert mit jedem Bot über direkte HTTP-Anfragen an die `/api/v1/*`-Endpunkte, wodurch eine einzige WebUI-Adresse mehrere Bots über Tabs verwalten kann.

Das zweite Modell ist eine öffentliche WebUI mit Abonnement. Benutzer authentifizieren sich über einen externen Zahlungs- und Authentifizierungsdienst und tragen anschließend ein Lizenz-Token in ihre Bot-Konfiguration ein. Der Bot stellt eine ausgehende Verbindung zu einem öffentlichen Relay her, sodass kein eingehender Bot-Port erforderlich ist. Browser-Anfragen werden über die öffentliche WebUI und das Relay über einen eins-zu-eins-API-Tunnel an den Bot weitergeleitet. Der Lizenzumfang ist auf eine Börse und ein Handelspaar pro Lizenz beschränkt.

## MVP-Umfang

Das Minimum Viable Product (MVP) priorisiert das Szenario der privaten, selbstgehosteten WebUI. Es umfasst den Aufbau eines neuen Stacks mit Vite und React 18, ohne Unterstützung der Legacy-WebUI. Die Implementierung beinhaltet eine Transport-Abstraktionsschicht, beginnend mit `DirectHttpTransport` und gefolgt von `RelayWsTransport`. Die UI wird über eine `GET /bot`-Anfrage initialisiert, wobei die Bot-Funktionen die sichtbaren UI-Blöcke bestimmen. Parameter werden über WebSocket-`params:updated`-Ereignisse zusammen mit REST verwaltet. Markt- und Kontodaten basieren zunächst auf REST-Polling mit einem Intervall von etwa 10 Sekunden, wobei geplant ist, Daten später aus dem Bot-Cache zu pushen.

## Nicht-Ziele

Diese Diskussion schließt ausdrücklich Details zur Zahlungs- und Abrechnungsimplementierung ebenso aus wie die Gestaltung der Bot-API, die in einer begleitenden Diskussion behandelt wird. In dem Repository `adamant-tradebot-webui` wird ein Tracking-Issue erstellt, das auf diesen Vorschlag verweist.
