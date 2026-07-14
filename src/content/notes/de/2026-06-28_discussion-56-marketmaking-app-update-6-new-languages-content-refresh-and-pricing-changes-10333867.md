---
title: "marketmaking.app-Update: Neue Sprachen, überarbeitete Inhalte und Preisänderungen"
slug: "discussion-56-marketmaking-app-update-6-new-languages-content-refresh-and-pricing-changes-10333867"
description: "cryptofoundry veröffentlicht ein umfassendes Update für marketmaking.app mit sechs neuen Sprachen, aktualisierten Inhalten und angepassten Preisen."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/56"
publishedAt: "2026-06-28T14:14:24Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10333867"
locale: "de"
placeholder: false
---

## Übersicht

cryptofoundry hat ein umfassendes Update für marketmaking.app veröffentlicht, das sechs neue Sprachen, eine überarbeitete Positionierung des kostenlosen Basisbots für Token-Emittenten, aktualisierte Dokumentation und mehrere UX-Verbesserungen umfasst.

## Sprachen

Die Website unterstützt nun acht Sprachen. Neben den bestehenden englischen und russischen Versionen wurden Chinesisch (Vereinfacht), Spanisch, Arabisch (von rechts nach links), Französisch, Japanisch und Deutsch hinzugefügt. Alle Hauptseiten wurden aus dem Englischen übersetzt, wobei bei Bedarf Russisch als Referenz diente. Die Kopfzeile, das Modalmenü, der Kontaktbutton, der Sprachumschalter, Navigationslinks und das Logo verweisen nun auf die korrekten sprachspezifischen URLs.

## Inhalte und Positionierung

Der Abschnitt „Was ist Market Making“ wurde an das aktuelle ADAMANT Tradebot-README angepasst und betont nun die kostenlose Basisversion für Token-Emittenten sowie Premium-Module und -Dienste. Die Seiten zur Installation, zum Schnellstart und zum kostenlosen Market-Making-Bot wurden überprüft und aktualisiert. Der Befehls-Referenz wurde mit dem Bot-Codebase abgeglichen, um neue Befehle hinzuzufügen und veraltete Beschreibungen zu korrigieren.

Die Premium-Features wurden angepasst: Der Block „Kein Wash Trading“ wurde entfernt, stattdessen wurden die Blöcke „Balance Watcher“ und „Perpetual Trading“ (Futures) hinzugefügt. Dollar-Preise wurden durch „Anfrage“-Links ersetzt, die das Kontakt-Popup öffnen. Auf der Dienstleistungsseite werden keine festen Preise mehr angezeigt, ebenso wurde der Hinweis zum Bereitstellen von Exchange-API-Keys entfernt. Auf der Startseite wurde der Demo-Preis von 800 $ im Abschnitt „Demo anfordern“ entfernt. Zudem wurden diverse Grammatikfehler, kaputte Links und veraltete Datumsangaben in den englischen und russischen Texten behoben.

## Kontakt und UX

Ein Kontaktmodal kann nun von jeder Seite aus über den Anker `#contact` geöffnet werden, beispielsweise unter `/cex-mm/free-market-making-bot/#contact`. Telegram wurde als dritte Kontaktmöglichkeit über @adamant_business hinzugefügt.

## Infrastruktur

Der Server und der WordPress-Stack wurden aktualisiert, einschließlich Ubuntu-Paketen, PHP, MySQL, WordPress-Kern, Polylang, Insert PHP und WP Rocket. Duplicator wurde nach der Migration entfernt. Vor und nach dem Update wurden vollständige Sicherungen erstellt.

![Diskussionsscreenshot 1](/images/engineering-notes/github/discussions/10333867/001-007bf37e.webp)
