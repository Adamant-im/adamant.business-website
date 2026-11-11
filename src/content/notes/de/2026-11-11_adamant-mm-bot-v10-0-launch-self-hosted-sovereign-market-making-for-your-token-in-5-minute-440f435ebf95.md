---
title: "ADAMANT mm Bot v10.0: Souveränes, selbstgehostetes Market Making für Token-Projekte"
slug: "adamant-mm-bot-v10-0-launch-self-hosted-sovereign-market-making-for-your-token-in-5-minute-440f435ebf95"
description: "Das Liquiditätsproblem für Token-Gründer: Ein illiquider Token ist faktisch wertlos. ADAMANT TradeBot v10.0 bietet eine sichere, nicht-verwahrende Alternative."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-mm-bot-v10-0-launch-self-hosted-sovereign-market-making-for-your-token-in-5-minutes-440f435ebf95"
publishedAt: "2026-11-11T07:09:05.209Z"
author: "Quantum Trader"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:440f435ebf95"
coverImage: "/images/engineering-notes/medium/440f435ebf95/001-9e1cee5966.webp"
locale: "de"
placeholder: false
---

## Das Liquiditätsproblem bei Token

Für Token-Gründer offenbart die Notierung an einer zentralen Börse eine harte Realität: Ein illiquider Token ist faktisch wertlos. Ohne kontinuierliche Liquidität und sichtbares Handelsvolumen verlieren Projekte ihr Ranking bei Aggregatoren, Arbitrage-Bots weiten die Spreads aus und private Käufer ziehen sich aufgrund von Slippage zurück. Die traditionelle Reaktion besteht darin, eine Market-Making-Agentur zu beauftragen, monatliche Gebühren von 5.000 bis 30.000 USD oder mehr zu zahlen und die Verwahrung von Token und Stablecoins an Konten Dritter abzutreten. Allzu viele Projekte mussten bereits erleben, wie Treasury-Token abgestoßen wurden oder Market Maker bei Marktstress einfach verschwanden.

Die Alternative ist souveränes, selbstgehostetes Market Making. Mit ADAMANT TradeBot v10.0.0 können Sie in weniger als fünf Minuten einen professionellen, vollautomatisierten Market Maker auf einem VPS für 5 USD/Monat oder in einem Docker-Container betreiben, ohne die Verwahrung Ihrer Token an Dritte abzugeben.

## Nicht-verwahrendes Design

Die Kernphilosophie ist vollständige finanzielle Souveränität. ADAMANT TradeBot läuft vollständig in Ihrer eigenen Single-Tenant-Umgebung. Der Bot benötigt lediglich grundlegende Lese- und Handels-API-Berechtigungen; Auszahlungsberechtigungen sind strikt deaktiviert und untersagt. Sie senden niemals Token oder Stablecoins an ADAMANT, eine Agentur oder einen Smart Contract. Token verlassen niemals Ihr Börsenkonto, und alle Orderberechnungen, algorithmischen Spreads und Saldenabgleiche werden lokal ausgeführt. Sie können Spreads, Zielvolumina und Preiskorridore jederzeit über die ADAMANT Messenger-Schnittstelle oder die WebUI-API anpassen.

```
┌─────────────────────────────────────────────────────────────┐
│                    YOUR INFRASTRUCTURE                      │
│            ($5/mo VPS, Private Server, or Docker)           │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                 ADAMANT mm bot                      │   │
│   │  [ Trader ]   [ OrderBook ]  [ Liquidity ]  [ Watcher]│ │
│   └──────────────────────────┬──────────────────────────┘   │
└──────────────────────────────┼──────────────────────────────┘
                               │ API Keys
                               │ (Trade Permissions ONLY)
                               │ ❌ No Withdrawal Access
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     CENTRALIZED EXCHANGE                    │
│     (Gate, Coinstore, XT, NonKYC, MEXC, etc.)               │
│                                                             │
│  🔒 Tokens never leave your exchange account                │
│  📊 Orders placed directly via signed REST / WebSocket      │
└─────────────────────────────────────────────────────────────┘
```

## Vier algorithmische Engines

Die Open-Source-Edition wird mit vier synchronisierten Engines ausgeliefert, die gemeinsam alle Dimensionen des Market Making abdecken.

Die **Trader**-Engine generiert konsistentes, natürlich wirkendes Volumen durch die Ausführung von Self-Matched-Trades innerhalb des Spreads oder der Orderbuchtiefe. Dies hält das Projekt auf Aggregatoren wie CoinMarketCap und CoinGecko aktiv, ohne Kapital zu verschwenden.

Der **Order Book Builder** platziert, verschiebt und ersetzt kontinuierlich gestaffelte Kauf- und Verkaufsaufträge. Dies erzeugt ein dichtes, realistisches Orderbuch mit organischer Preisvariation und vermeidet das leere Erscheinungsbild, das auf kleineren Börsen häufig vorkommt.

Der **Liquidity Provider** schützt das Orderbuch vor Slippage, indem er die optimale Liquiditätsverteilung aus den verfügbaren Salden berechnet und Depth-Orders innerhalb Ihres definierten Spread-Prozentsatzes platziert, damit Käufer und Verkäufer aus der Community eine faire Ausführung erhalten.

Der **Price Watcher** überwacht Token-Preise über Referenzmärkte wie Binance, DEXs oder wichtige Handelspaare hinweg. Wenn sich externe Preise bewegen, passt er automatisch die lokalen Preisgrenzen und Orderkorridore an, um zu verhindern, dass Ihre Liquidität durch räuberische Cross-Exchange-Arbitrage entzogen wird.

## Neuerungen in v10.0.0

Version 10.0.0 ist die bedeutendste architektonische Veröffentlichung in der Geschichte des Projekts, mit Fokus auf Zuverlässigkeit für Unternehmen, Sicherheit und Integrität der Lieferkette.

**Concurrency-safe Iteration Locking** adressiert die häufigste Ursache für doppelte Orders und desynchronisierte Zustände in Hochfrequenz-Bots: überlappende Ausführungs-Ticks. v10.0 führt `helpers/moduleIteration.js` ein, das ein striktes Locking implementiert. Wenn eine Iteration bereits auf eine API-Antwort der Börse wartet, wird der nächste Tick sauber verschoben, anstatt gleichzeitig ausgeführt zu werden. Iterationen werden sicher aus `finally`-Blöcken neu geplant, sodass der Bot bei vorübergehenden Netzwerkunterbrechungen nicht hängen bleibt oder abstürzt.

Der **Azbit-Connector** wurde komplett neu geschrieben. Er verwendet nun native HMAC-SHA256-Signaturgenerierung mit Mikrosekunden-Zeitstempeln, präzise Dezimalausrichtung gemäß den Lot- und Tick-Spezifikationen von Azbit sowie eine sofortige Invalidierung des Salden-Caches mit robuster Fehlerbehebung bei gedrosselten HTTP-Anfragen.

Ein **Inactivity Guard** schützt vor dem Szenario, in dem der Host-Server neu startet oder die Verbindung verliert und sich der Markt während der Offline-Zeit des Bots signifikant bewegt. Beim Start prüft er die Heartbeat-Zeitstempel; überschreitet die Ausfallzeit Ihren Sicherheitsschwellenwert, wird der abgesicherte Modus aktiviert, um die Ausführung veralteter Orders zu verhindern.

**Strukturierte Log-Rotation** nutzt die tägliche Winston-Rotation mit automatischer gzip-Archivierung, konfigurierbaren Aufbewahrungsrichtlinien und bereinigter Protokollierung, um sicherzustellen, dass API-Geheimnisse niemals in Logdateien gelangen.

**End-to-End Supply Chain Security** rundet die Veröffentlichung ab. Docker-Images, die in der GitHub Container Registry veröffentlicht werden, enthalten Sigstore-Provenienz-Attestierungen, und npm-Pakete werden über OpenID Connect Trusted Publishing mit vollständiger Build-Provenienz auf npmjs.com veröffentlicht.

## Bereitstellung

Die Bereitstellung erfolgt unkompliziert entweder über die globale npm-CLI oder Docker.

Für den CLI-Ansatz stellen Sie sicher, dass Node.js 22+ installiert ist, und führen Sie dann die Installations-, Initialisierungs- und Startbefehle aus:

```
# 1. Install the bot globally
npm install -g adamant-tradebot

# 2. Initialize your configuration
mm init

# 3. Configure your exchange API keys & token pair
nano config/config.default.jsonc

# 4. Start the market maker
mm start

# 5. Check live status
mm status
```

Für Docker ziehen Sie den provenienzgeprüften Container und führen ihn aus:

```
docker run -d \
  --name adamant-tradebot \
  --restart unless-stopped \
  -v $(pwd)/config:/app/config \
  -v $(pwd)/logs:/app/logs \
  ghcr.io/adamant-im/adamant-tradebot:10.0.0
```
