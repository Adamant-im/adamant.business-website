---
title: "Einführung von ADM-Payment: Eine kryptoorientierte Plattform für Zahlungen, Abonnements und Software-Lizenzierung"
slug: "introducing-adm-payment-a-crypto-first-platform-for-payments-subscriptions-and-software-46b6f4ec4e95"
description: "ADM-Payment ist eine universelle, kryptoorientierte, selbstgehostete Plattform für Zahlungen, Abonnements und Software-Lizenzmanagement."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/introducing-a-payment-a-crypto-first-platform-for-payments-subscriptions-and-software-licensing-46b6f4ec4e95"
publishedAt: "2026-06-10T16:33:29.168Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/46b6f4ec4e95/001-1-ikwbquslxdsnxlvmcfgy5a-png.webp"
cardSpan: "full"
originalId: "medium:46b6f4ec4e95"
locale: "de"
placeholder: false
---

### Einführung von ADM-Payment

Die Monetarisierung von Software sollte keine fehleranfällige Kette getrennter Dienste erfordern. Für viele Produkte – insbesondere im Bereich Web3, Trading, SaaS, Automatisierung und selbstgehostete Infrastruktur – liegt die eigentliche Herausforderung nicht nur im Zahlungsempfang, sondern in der Verwaltung des gesamten kommerziellen Ablaufs: Authentifizierung, Checkout, Abrechnungslogik, Abonnements, Lizenzvergabe, Lizenzvalidierung, administrative Aktionen, Benutzerverwaltung, Verlängerungen, Testversionen und Produkterreichbarkeit.

ADAMANT Payment (*ADM-Payment*) ist eine universelle, kryptoorientierte, selbstgehostete Plattform für Zahlungen, Abonnements und Software-Lizenzverwaltung. Sie wird derzeit als laufendes Projekt mit einer verfügbaren Beta-Version veröffentlicht. Die Plattform ist als eigenständiges Produkt konzipiert und nicht an ADAMANT Messenger oder eine einzelne Anwendung gebunden. Die erste interne Integration erfolgt über Abonnements der ADAMANT Tradebot WebUI, doch die Plattform ist für ein viel breiteres Spektrum an Produkten gedacht, darunter Bots, SaaS-Plattformen, Desktop-Anwendungen, Web3-Dienste, private Tools, kommerzielle APIs und selbstgehostete Software.

### Warum es entwickelt wurde

Die meisten modernen Monetarisierungsstacks wurden ursprünglich für traditionelle Fiat-Zahlungen konzipiert. Das funktioniert für viele Unternehmen, wird jedoch einschränkend, wenn das Produkt kryptoorientiert, global, selbstgehostet, datenschutzbewusst ist oder an Nutzer verkauft wird, die nicht auf traditionelle Bankinfrastrukturen angewiesen sein möchten. Ein typischer Aufbau erfordert separate Dienste für Authentifizierung, Zahlungen, Abonnements und Lizenzschlüssel sowie individuelle Skripte für den Produkterhalt, ein manuell erstelltes Admin-Panel, Webhooks, Callbacks, Datenbankverbindungen und manuelle Support-Prozesse.

ADM-Payment vereint diese Komponenten in einer kohärenten Plattform. Ein Produktanbieter kann Tarife definieren, Kryptozahlungen annehmen, Lizenzen ausstellen, Benutzer verwalten und externer Software über eine API die Zugriffsvalidierung ermöglichen – ohne die gesamte Monetarisierungsschicht immer wieder neu aufbauen zu müssen.

### Kernmodule

Die Plattform kombiniert Authentifizierung, Abrechnung, Kryptozahlungen, Test- und kostenpflichtige Lizenzen, Abonnements, Promo- und manuelle Lizenzen, ein nutzerfreundliches Webportal, ein Admin-Dashboard, eine Lizenzvalidierungs-API, Produktbranding, Internationalisierung und Funktionen zur Betriebssicherheit in einer selbstgehosteten Lösung.

Zahlungen sind von Grund auf kryptoorientiert konzipiert, kein nachträglich hinzugefügtes Feature. Der aktuelle Umfang umfasst Bitcoin-Zahlungen über einen selbstgehosteten BTCPay Server, native ADAMANT-Zahlungen mit eindeutigen Einzahlungsadressen und On-Chain-Überwachung sowie einen Entwicklungsanbieter zum Testen von Abläufen. Die Architektur ist so gestaltet, dass zusätzliche Zahlungsanbieter (Ethereum, ERC20, Stablecoins und andere) und Blockchains später hinzugefügt werden können, ohne den Abrechnungskern neu schreiben zu müssen.

![Anmeldung mit Ethereum-Wallet](/images/engineering-notes/medium/46b6f4ec4e95/002-1-uvvnwb38hzdf94wtr5rkra-png.webp)

![Annahme von Kryptowährungszahlungen](/images/engineering-notes/medium/46b6f4ec4e95/003-1-18j1i2bwffpurrfyebeoqg-png.webp)

Für Nutzer bietet ADM-Payment eine klare Web-Oberfläche zum Anmelden, Katalog durchsuchen, Bezahlen und Lizenzverwaltung. Für Produktanbieter stellt es ein Admin-Dashboard bereit, um Konten, Lizenzen, Rechnungen, Wallets, Tarife und Zugriffsrechte zu verwalten. Für externe Software bietet es eine API-basierte Lizenzvalidierung, sodass ein Bot, SaaS-Backend, Relay, Desktop-App oder anderes Produkt programmatisch prüfen kann, ob ein Nutzer aktiven Zugriff hat.

### Zielanwendungsfälle

ADM-Payment ist eine Monetarisierungsschicht, nicht nur eine Zahlungsseite. Es ist besonders nützlich für Trading-Bots und Automatisierungstools, die lizenzbasierten Zugriff, Abonnementpläne, pro Markt oder pro Börse definierte Einschränkungen und private Bereitstellungen benötigen. Ein Entwickler eines Trading-Bots kann Tarife wie Basic, Pro oder Enterprise erstellen; Nutzer zahlen in Kryptowährung, erhalten Lizenzen, und der Bot prüft den Zugriff über die API. Lizenzen können nach produktspezifischen Parametern wie Börse und Handelspaar begrenzt werden, wodurch eine präzise Zugriffskontrolle ermöglicht wird, die über ein einfaches bezahlt/nicht-bezahlt-Modell hinausgeht.

Für SaaS-Produkte mit kryptoorientierten Nutzern bietet ADM-Payment eine Möglichkeit, Kryptowährungen anzunehmen, Abonnements zu verwalten und den Zugriff zu steuern, ohne vollständig von traditionellen Zahlungsanbietern abhängig zu sein. Desktop-Anwendungen und private Tools können es als Lizenz- und Abrechnungs-Backend nutzen, indem sie die Validierungs-API aufrufen, um zu prüfen, ob eine Lizenz aktiv ist. Web3-Dienste profitieren von kryptoorientierten Authentifizierungsabläufen, einschließlich ADM- und Ethereum-Wallet-Anmeldung neben der klassischen E-Mail-Anmeldung. Selbstgehostete kommerzielle Produkte können die Plattform bereitstellen und an eigene Regeln anpassen, anstatt auf einen geschlossenen Lizenz-SaaS angewiesen zu sein.

Die Plattform unterstützt Testversionen mit automatischer Registrierung, wobei Regeln wie eine Testversion pro definiertem Bereich durchgesetzt werden. Sie umfasst auch kostenpflichtige, Test-, Promo- und manuelle Lizenztypen und bietet Betreibern Flexibilität, ohne direkte Datenbankänderungen vornehmen zu müssen. Branding kann über Umgebungsvariablen konfiguriert werden, und das Datenmodell verwendet generische Produkt-Slugs anstelle harter ADAMANT-spezifischer Annahmen, wodurch es für White-Label-Bereitstellungen über mehrere Produkte hinweg geeignet ist.

### Technische Architektur

ADM-Payment ist als modernes Monorepo mit `pnpm` und Turborepo aufgebaut. Der Umfang von v1.0.0 umfasst ein Fastify 5 API-Backend, Prisma ORM, PostgreSQL-Datenbank, React 18 Frontend mit Vite, separate Web-Apps für Nutzer und Admins, gemeinsam genutzte Pakete für gemeinsame Logik, JWT-Sitzungen mit Refresh-Cookies, ADM-Nachrichtencode-Authentifizierung, Ethereum SIWE-Authentifizierung, E-Mail- und Passwort-Authentifizierung, Turnstile-Captcha, BTCPay Server-Integration für Bitcoin-Zahlungen, einen nativen ADAMANT-Zahlungsanbieter mit eindeutigen Einzahlungsadressen und On-Chain-Beobachter, idempotente Webhooks, einen Admin-API-Key, optionale 2FA, IP- und Fingerabdruck-Sperre, Audit-Logging, i18n-Internationalisierung und GitHub Actions CI für Installation, Prisma-Generierung, Build, Lint und Typüberprüfung.

Die Architektur trennt nutzer- und adminseitige Bereiche. Externe Produkte interagieren mit der Plattform über API-Endpunkte, um Lizenzen zu validieren oder den Abonnementstatus zu prüfen. Dieser API-first-Ansatz bedeutet, dass ADM-Payment nicht nur eine Checkout-Seite, sondern ein Backend-Dienst ist, auf den andere Software vertrauen kann.

Sicherheitsfunktionen sind auf Architekturebene integriert: getrennte Nutzer- und Admin-Bereiche, geschützte Authentifizierungsabläufe, Zugriffskontrolle, sichere Lizenzvalidierungs-APIs, Admin-API-Key, optionale ADM- und ETH-2FA, Captcha-Unterstützung, IP- und Fingerabdruck-Sperre sowie Audit-Logging. Die Wallet-basierte Authentifizierung ermöglicht es Nutzern, sich über kryptobasierte Identitätsabläufe anzumelden, anstatt auf E-Mail-allein-Konten beschränkt zu sein, während die E-Mail- und Passwort-Anmeldung für traditionelle Nutzer weiterhin verfügbar bleibt.

### Aktueller Status

ADM-Payment ist ein laufendes Projekt mit einer verfügbaren Beta-Version. Die Grundlage ist bereits nutzbar, das Produkt wird jedoch kontinuierlich durch Verbesserung der Abläufe, Erweiterung der Dokumentation und Sammlung von Feedback aus echten Integrationen weiterentwickelt. Die aktuelle Entwicklungslinie umfasst die Plattformgrundlage v1.0.0, wobei die erste Produktintegration auf Abonnements der ADAMANT Tradebot WebUI fokussiert ist. Die Roadmap beinhaltet weitere Zahlungsanbieter, weitere Blockchains, OpenAPI-Dokumentation, Automatisierung der Abonnementverlängerung und Integrationen von Drittanbieter-Produkten.

### Screenshots

![Benutzeroberfläche: Anmeldemöglichkeiten](/images/engineering-notes/medium/46b6f4ec4e95/004-1-cqwvqqbxknkp-uvuuknxrq-png.webp)

![Benutzeroberfläche: Abonnementpläne](/images/engineering-notes/medium/46b6f4ec4e95/005-1-t37cypcdhaysabgjilzivg-png.webp)

![Benutzeroberfläche: Lizenzen](/images/engineering-notes/medium/46b6f4ec4e95/006-1-3kfx3yvszqtpokjjjvsexa-png.webp)

![Admin-Dashboard: Konten](/images/engineering-notes/medium/46b6f4ec4e95/007-1-bp6rl5dl-yi5cq0-elmo1q-png.webp)

![Admin-Dashboard: Lizenzen](/images/engineering-notes/medium/46b6f4ec4e95/008-1-wpdhnvtgoltez8bgcjxjyg-png.webp)

![Admin-Dashboard: Rechnungen](/images/engineering-notes/medium/46b6f4ec4e95/009-1-o-3ouw6yormfxhtyk3npbw-png.webp)

![Admin-Dashboard: Manuelle Lizenzvergabe (Option)](/images/engineering-notes/medium/46b6f4ec4e95/010-1-kg3c6muwymo6kftbchh2jg-png.webp)

![Admin-Dashboard: ADM-Zahlungen](/images/engineering-notes/medium/46b6f4ec4e95/011-1-ypzmklcvz81nqi7rh7fyrg-png.webp)

![Admin-Dashboard: BTC-Zahlungen](/images/engineering-notes/medium/46b6f4ec4e95/012-1-pygj4qnhxawlioosdttx5a-png.webp)
