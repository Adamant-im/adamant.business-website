---
title: "MarketMaking.App: Beschreibung des kostenlosen Moduls"
slug: "discussion-16-marketmaking-app-free-module-description-8923038"
description: "MarketMaking.App: Beschreibung des kostenlosen Moduls. Die kostenlose Open-Source-Version des ADAMANT-Market-Making-Bots eignet sich für kleine Kryptoprojekte mit geringer Liquidität an zentralisierten Börsen."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/16"
publishedAt: "2025-09-20T14:33:55Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:8923038"
locale: "de"
placeholder: false
---

# MarketMaking.App: Beschreibung des kostenlosen Moduls

Die kostenlose, Open-Source-Version des ADAMANT-Market-Making-Bots eignet sich für kleine Kryptoprojekte mit geringer Liquidität, die an zentralisierten Börsen aus der unterstützten Liste gehandelt werden. Der Quellcode ist auf [GitHub](https://github.com/Adamant-im/adamant-tradebot) verfügbar.

## Modul zur manuellen Auftragsausführung

Dieses Modul ermöglicht es dem Betreiber, bestimmte Kauf- und Verkaufsaufträge zu platzieren. Ein einzelner Markt- oder Limitauftrag kann mit den Befehlen `/buy` oder `/sell` platziert werden, während mehrere Limitaufträge gleichzeitig mit `/fill` gesetzt werden können. Der Befehl `/fill` kann auch das gesamte Orderbuch sofort mit gestuften Bids und Asks füllen, um die Börsenlisting-Anforderungen zu erfüllen. Es funktioniert mit jedem Handelspaar an der Börse und ist nützlich für die Umwandlung von Mitteln, den Kauf oder Verkauf von Assets oder das vorbereitende Befüllen des Orderbuchs, bevor das automatisierte Market-Making beginnt.

## Modul zur Erzeugung von Handelsvolumen

Dieses Modul simuliert Aktivität und Volumen an einem Markt-Paar durch internen Handel. Es unterstützt drei Strategien: spreadbasiert, bei der Trades innerhalb eines definierten Bid/Ask-Spreads erfolgen; orderbuchbasiert, die das Verhalten anhand der bestehenden Orderbuchstruktur nachahmt; und optimal, bei der dynamisch Preisniveaus für realistisch aussehende Trades gewählt werden. Dies ist nützlich, um neue Märkte zu bootstrappen, das Erscheinungsbild des Listings zu verbessern und die Volumenanforderungen der Börse zu erfüllen.

## Realitätsnaher, dynamischer Orderbuch-Generator

Dieses Modul erstellt ein realistisches, menschenähnliches Orderbuch, um organische Marktbewegungen zu simulieren. Es verwaltet die dynamische Platzierung und Entfernung von Aufträgen über sichtbare Preisebenen hinweg, mit zufälligen Auftragsgrößen, Intervallen und Preisschritten, um eine Erkennung zu vermeiden. Periodische Neuordnungen spiegeln realistisches Händlerverhalten wider und schaffen ein Marktumfeld, das lebendig wirkt und für externe Händler attraktiver ist.

## Spread- und Liquiditätsaufrechterhaltung

Dieses Modul sorgt für eine gesunde Handelsspanne und minimale Liquidität, um enge Märkte und einen stabilen Paarstatus sicherzustellen. Es überwacht kontinuierlich die besten Bid- und Ask-Niveaus und platziert automatisch Liquidität innerhalb eines konfigurierbaren prozentualen Spread-Schwellenwerts, bis zu festgelegten Maximalbeträgen. Es stellt eine Mindestliquidität auf beiden Seiten des Orderbuchs sicher und aktualisiert sich automatisch, wenn Aufträge ausgeführt werden oder sich der Markt bewegt.

## Marktbeobachter & Bereichsverfolgung

Dieses Modul überwacht wichtige Preisindikatoren und externe Referenzen, um das Bot-Verhalten zu steuern oder Befehle auszulösen. Die Preisbereichsüberwachung erzwingt den Handel nur innerhalb eines definierten statischen Minimal- und Maximalpreisbereichs. Die Cross-Exchange-Überwachung synchronisiert Preise oder reagiert auf Bewegungen an einer anderen unterstützten Börse. Diese Funktionen helfen Betreibern, volatile Preisbereiche zu vermeiden, auf externe Marktbewegungen zu reagieren oder die Preisentwicklung mit einer anderen Börse abzugleichen.

## Handelspaar- und Bot-Zustandsabfrage

Dieses Modul bietet Echtzeiteinblicke in den aktuellen Zustand des Bots und relevante Informationen zum Handelspaar. Betreiber können verfügbare Kontostände für Basis- und Quote-Assets mit `/balances` anzeigen, aktuelle aktive Limitaufträge mit `/orders` auflisten und Market-Making-Aktivität, generiertes Volumen und Spread-Breite mit `/stats` anzeigen. Metadaten zum Paar und zur Kryptowährung wie minimale Handelsgröße, Tick-Größe und Gebühren können mit `/info` oder `/pair` abgerufen werden, und Einzahlungsadressen für Assets sind über `/deposit` erhältlich. Dies hilft Betreibern, den Bot-Status und Marktbedingungen in Echtzeit zu überwachen, die Einrichtung zu überprüfen und die Leistung oder den Kontostand zu verfolgen.

Einige Funktionen haben im Basisversion des Bots eingeschränkte Optionen. Umfangreichere Einstellungen sind in der Premiumversion verfügbar.
