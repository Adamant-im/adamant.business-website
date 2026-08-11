---
title: "ADAMANT Messenger v4.12.0: Eine sicherere PWA für private Konversationen"
slug: "adamant-messenger-v4-12-0-a-safer-pwa-for-private-conversations-3afcd8416678"
description: "ADAMANT Messenger v4.12.0 ist ein koordiniertes Sicherheits-Release für den dezentralen Messenger, Wallet und das PWA-Erlebnis. Nutzer sollten das Update umgehend installieren."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-messenger-v4-12-0-a-safer-pwa-for-private-conversations-3afcd8416678"
publishedAt: "2026-08-11T00:19:47.725Z"
author: "ADAMANT Messenger"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:3afcd8416678"
coverImage: "/images/engineering-notes/medium/3afcd8416678/001-e1683c8738.webp"
locale: "de"
placeholder: false
---

ADAMANT Messenger v4.12.0 ist ein koordiniertes Sicherheits-Release für das dezentrale Messenger-, Wallet- und PWA-Erlebnis. Nutzer in Browsern, auf Mobilgeräten, über Tor oder auf dem Desktop sollten das Update umgehend installieren, um von den verstärkten Schutzmaßnahmen für sensible Daten zu profitieren.

Die aktualisierte PWA behält die gewohnte Benutzeroberfläche für die anonyme Kontoerstellung, die Chat-Verwaltung und die Multi-Asset-Wallet-Steuerung bei. Wie immer sind weder Telefonnummer, E-Mail-Adresse noch ein zentraler Betreiber erforderlich. Die Passphrase des Benutzers bleibt der einzige Schlüssel für den Zugriff auf eine anonyme Adresse und das selbstverwaltete Wallet.

Hinter der Benutzeroberfläche schließt v4.12.0 bestätigte Pfade für gespeichertes XSS, entfernt das veraltete v-html-Rendering und stärkt Markdown mit SafeHtml. Zudem werden von Nodes bereitgestellte öffentliche Schlüssel gegen die Adressen verifiziert, die sie angeblich repräsentieren – eine wichtige Sicherheitsgrenze, wenn eine dezentrale App mit öffentlicher Infrastruktur interagiert. Die lokale Speicherung von Geheimnissen und der Prozess zur Ableitung von Passwortschlüsseln wurden mit versioniertem scrypt aktualisiert, während kryptografische Hilfsfunktionen auf das moderne @noble- und @scure-Ökosystem umgestellt wurden. Die strikte Content Security Policy (CSP) deckt nun PWA-, Tor-, Testnet-, Android- und Electron-Builds ab.

Das Release verbessert zudem die Systemzuverlässigkeit. Verzögerte Coin-Indexer werden nicht mehr als fehlerfreie Nodes behandelt, und Node-Versionsprüfungen verwenden nun echtes semantisches Versioning. Zusätzlich werden AIP-6-Signalnachrichten aus dem sichtbaren Chat-Verlauf herausgehalten. Für Android-Nutzer wurden die Grenzen für Backups und Datenextraktion gestärkt, was zu weniger versteckten Annahmen und einem sichereren Ablauf von der Anmeldung bis zur Nachrichtenzustellung führt.

![ADAMANT Messenger v4.12.0: Eine sicherere PWA für private Konversationen](/images/engineering-notes/medium/3afcd8416678/002-419a41b893.webp)

![ADAMANT Messenger v4.12.0: Eine sicherere PWA für private Konversationen](/images/engineering-notes/medium/3afcd8416678/003-dc272cf2f1.webp)

![ADAMANT Messenger v4.12.0: Eine sicherere PWA für private Konversationen](/images/engineering-notes/medium/3afcd8416678/004-c1c599fad0.webp)
