---
title: "ADAMANT Payment v1.0 — Kryptofirst-Plattform für Zahlungen, Abonnements und Lizenzverwaltung"
slug: "discussion-47-adamant-payment-v1-0-universal-crypto-first-platform-for-payments-subscriptions-and-licens-10234312"
description: "ADAMANT Payment (adamant payment) ist ein neues Infrastrukturmodul für das ADAMANT-Ökosystem und für Produkte, die native Krypto-Monetarisierung benötigen, ohne mehrere Drittanbieterdienste zu kombinieren."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/47"
publishedAt: "2026-06-10T14:30:29Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10234312"
locale: "de"
placeholder: false
---

**ADAMANT Payment** (`adamant-payment`) ist ein neues Infrastrukturmodul für das ADAMANT-Ökosystem und für jedes Produkt, das eine native Krypto-Monetarisierung benötigt, ohne mehrere Drittanbieterdienste miteinander verbinden zu müssen. Es ersetzt den veralteten `adamant-client-auth`-Ansatz durch eine moderne, produktunabhängige Plattform: Authentifizierung, Abrechnung, Kryptozahlungen, Abonnements, Lizenzverwaltung, ein Benutzerportal und eine Admin-Konsole in einer selbstgehosteten Lösung.

Die erste Integrationsziel ist das ADAMANT Tradebot WebUI-Abonnement (Szenario B): Nutzer kaufen ein Abonnement oder eine Testversion über adamant-payment, erhalten ein bereichsbezogenes Lizenz-Token, und der Bot verbindet sich ausgehend mit dem öffentlichen WebUI-Relay. Die Plattform ist nicht an den Tradebot gebunden — sie ist als eigenständiges Produkt für Bots, SaaS, Desktop-Apps und Web3-Dienste konzipiert.

## Architektur und zentrale Stärken

Die Plattform wurde von Grund auf für Kryptowährungszahlungen entwickelt, nicht als sekundärer Zusatz. Sie eignet sich ideal für Web3-Projekte, Trading-Bots, SaaS-Produkte und Software, die an ein globales Publikum verkauft wird. Die anfängliche Zahlungsunterstützung umfasst Bitcoin (über BTCPay Server) und ADM (nativ, mit eindeutigen Einzahlungsadressen und On-Chain-Watchern), sowie einen Entwickler-Provider für Tests. Webhooks sind idempotent, und eindeutige `externalId`/txid-Werte gewährleisten die Zahlungskorrektheit — ausgestellte Lizenzen werden bei Zahlungseingang aktiviert oder verlängert.

Authentifizierung, Abrechnung, Kryptozahlungen, Abonnements, Lizenzverwaltung, Benutzerportal und Admin-Panel sind in einer Lösung vereint, wodurch die Kombination mehrerer Drittanbieterdienste entfällt. Die Plattform kann nach Zahlung automatisch Lizenzen ausstellen, Ablaufdaten, Abonnements, Tarife und Produktzugriffe verwalten. Externe Anwendungen überprüfen Lizenzen über die REST-API unter `/v1/...`, sodass Produkte den Lizenzstatus, die Gültigkeit des Abonnements und den Benutzerzugriff programmatisch prüfen können.

Nutzer können sich entweder mit einem herkömmlichen E-Mail-Konto oder über kryptografische Authentifizierung mit einem ADM- oder ETH-Wallet anmelden (SIWE). Dies ist besonders nützlich für Web3-Nutzer, da die Plattform ohne zwingende E-Mail-Identität funktionieren kann. JWT-Sitzungen mit Refresh-Cookies unterstützen browserbasierte Anwendungen.

Die Lösung wird mit einer nutzerseitigen Oberfläche und einem Admin-Dashboard ausgeliefert. Kunden verwalten Zahlungen, Lizenzen und Abonnements; Produktbetreiber verwalten Nutzer, Bestellungen, Tarife und Zugriffsrechte. Das Admin-Panel unterstützt ADM 2FA und ETH 2FA, Turnstile-Captcha, IP- und Fingerabdruck-Sperre sowie Audit-Logging. In der Produktion läuft das Admin-Panel auf einer separaten Origin.

`adamant-payment` ist nicht an ADAMANT Messenger oder eine bestimmte Anwendung gebunden. White-Label-Branding ist über `BRAND_*`-Umgebungsvariablen verfügbar, und das Datenmodell verwendet generische Produkt-Slugs. Im Gegensatz zu Stripe, Paddle, Lemon Squeezy oder herkömmlichen Lizenz-SaaS-Plattformen kann es an eigene Regeln, Krypto-Zahlungsabläufe, Preismodelle und Produkte angepasst werden. Es wird auf eigener Infrastruktur (PostgreSQL, Node.js) bereitgestellt, mit voller Kontrolle über Nutzer, Zahlungslogik, Lizenzen und Geschäftsdaten. Docker Compose wird für Postgres bereitgestellt, ohne verpflichtende Cloud-SaaS-Abhängigkeiten.

## Umfang von v1.0

Die v1.0-Version umfasst den Kern-Monetarisierungsablauf: Nutzerregistrierung, Zahlung, Zugriffslieferung, Abonnementverlängerung, Administration und Produktintegration. Die Authentifizierung unterstützt ADM-Nachrichtencode, Ethereum (SIWE) sowie E-Mail und Passwort. Die Abrechnung umfasst einen Katalog, eine 14-tägige Testversion (einmal pro Börse und Paar weltweit), kostenpflichtige, Promo- und manuelle Lizenzen, mit Hot-Reload von `config/` für Tarife und Promo-Codes. Das Admin-Panel bietet Statistiken, Account-Verwaltung, Lizenzen, Rechnungen und Ansichten für ADM/BTC-Wallets, mit API-Key-Authentifizierung und optionalem 2FA. Die Internationalisierung umfasst bei der Einführung Englisch und Russisch, mit erweiterbarem i18n in `packages/shared`.

Der Technologie-Stack verwendet pnpm mit Turborepo, Fastify 5, Prisma, PostgreSQL und React 18 (Vite). CI läuft auf GitHub Actions und umfasst Installation, Prisma-Generierung, Build, Lint und Typüberprüfung.

## Produkt- und Integrationsanforderungen

Produktneutralität ist eine Kernanforderung: Es gibt keine hartkodierten Tradebot- oder ADAMANT-Branding-Einträge in DB-Enumerationen; alles ist pro Bereitstellung konfigurierbar. Der Lizenzumfang umfasst eine Lizenz pro Börse und Paar, mit einer Testversion pro Bereich weltweit. Die Multi-Identitäts-Authentifizierung stellt sicher, dass ADM, ETH und E-Mail koexistieren. Die Betreiber-Sicherheit verlangt, dass das Admin-Panel in der Produktion auf einer separaten Origin läuft, mit API-Key, optionalem 2FA, Captcha, Sperre und Audit-Trail.

Für die Ökosystemintegration validiert das Tradebot WebUI (Szenario B) Relay Lizenzen über die adamant-payment-API, wobei der Bot ein ausgehendes Verbindungsmodell verwendet. Die Tradebot-API im Branch `refactor/new-webui-api` nutzt die Lizenzvalidierung, und das ADAMANT Tradebot WebUI im Branch `refactor/new-stack` stellt die öffentliche WebUI und das Relay bereit. Neue `PaymentProvider`-Implementierungen (z. B. zusätzliche Chains) können hinzugefügt werden, ohne den Abrechnungskern umzuschreiben.

## Freigabekriterien

Die v1.0.0-Version wird als GitHub Release veröffentlicht und getaggt. CI muss auf `dev` und dem Release-PR zu `main` grün sein. Die Dokumentation umfasst Authentifizierung, Abrechnung, Zahlungen, Admin-Sicherheit, Branding, Datenbank und BTCPay-Setup. Stichprobenartige Tests (Smoke Tests) decken Authentifizierungsabläufe, Testversionserfassung, Checkout-zu-Lizenz, Admin-Panels und den Lizenzvalidierungs-Endpunkt ab.

## Roadmap nach v1

Geplante Arbeiten umfassen die Automatisierung der Abonnementverlängerung (BTCPay erstellt nur Rechnungen; die Verlängerungslogik liegt in adamant-payment), zusätzliche Zahlungsanbieter und Chains, OpenAPI-Dokumentation für die öffentliche API sowie Integrationen von Drittanbieter-Produkten jenseits des Tradebot.

Freigabeverfolgung: [Adamant-im/adamant-payment#1](https://github.com/Adamant-im/adamant-payment/issues/1).
