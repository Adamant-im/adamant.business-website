---
title: "Annahme von Wetten auf der Blockchain und Auszahlung von Belohnungen in LSK, ETH und ADM"
slug: "accepting-bets-on-blockchain-and-paying-rewards-in-lsk-eth-and-adm-8dd6abb45e2d"
description: "Der ADAMANT Bet Bot ist eine anonyme, blockchainbasierte Wettanwendung, die Wetten verarbeitet und automatisch Belohnungen auszahlt. Eine typische Konfiguration beinhaltet Wetten auf einen Kryptowährungskurs wie Bitcoin."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/accepting-bets-on-blockchain-and-paying-rewards-in-lsk-eth-and-adm-8dd6abb45e2d"
publishedAt: "2022-11-20T13:10:11.915Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/8dd6abb45e2d/001-0-l0olsfjrwmjzcc-3.webp"
cardSpan: "full"
originalId: "medium:8dd6abb45e2d"
locale: "de"
placeholder: false
---

Der ADAMANT Bet Bot ist eine anonyme, durch die Blockchain nachweisbare Wettanwendung, die Wetten verarbeitet und Belohnungen automatisch auszahlt. Eine typische Konfiguration beinhaltet Wetten auf den Kurs einer Kryptowährung wie Bitcoin. Mit dem Update v2.0 unterstützt der Bot nun Wetten und Auszahlungen in Lisk (LSK) neben ADM und Ethereum.

Der Bot nimmt Wetten direkt aus ADAMANT Messenger-Wallets in Kryptowährung entgegen, wobei alle Wett- und Zahlungsaktivitäten durch Blockchain-Transaktionen nachweisbar sind. Nutzer, die den Bitcoin-Kurs – oder den Kurs einer anderen Kryptowährung – korrekt vorhersagen, können Belohnungen erhalten. Da der Wettbot quelloffen ist, kann jeder eine eigene Instanz bereitstellen, um Wetten auf den Kurs einer beliebigen Kryptowährung entgegenzunehmen, nicht nur auf Bitcoin.

## So platzieren Sie eine Wette auf den Bitcoin-Kurs

Um eine Wette abzugeben, erstellen Sie eine anonyme Wallet in ADAMANT, laden den Kontostand auf und senden eine Wette an den Bot. Der Bot akzeptiert Wetten auf den Wechselkurs von Bitcoin (BTC). Eine neue Runde beginnt jeden Sonntag um 10:00 UTC, wobei Wetten für die aktuelle Runde von Sonntag bis Donnerstag angenommen werden. Wetten, die am Freitag oder Samstag – innerhalb von 48 Stunden vor Rundenende – abgegeben werden, zählen für die nächste Runde.

Der akzeptable Vorhersagefehler beträgt ±500 USD. Wenn Sie beispielsweise einen Kurs von 9.500 USD prognostizieren und der tatsächliche Kurs 9.900 USD beträgt, gelten Sie dennoch als Gewinner. Der Mindesteinsatz beträgt 0,1 USD, und die Mindestauszahlung beträgt ebenfalls 0,1 USD. Für vollständige Details senden Sie `/help` an den Bet-Bot in ADAMANT.

Um eine Wette abzugeben, laden Sie die gewünschte Kryptowährung auf (ADM, LSK oder ETH), öffnen den Bet-Bot-Dialog in ADAMANT und senden `/rates BTC`, um den aktuellen Wechselkurs abzufragen. Anschließend senden Sie den gewünschten Wettbetrag an den Bot, wobei Sie Ihren prognostizierten Preis im Transaktionskommentar angeben – beispielsweise senden Sie 250 ADM mit dem Kommentar "11300", um darauf zu wetten, dass der Bitcoin-Kurs am Ende der Runde 11.300 USD beträgt. Wenn die Runde endet, meldet der Bot den tatsächlichen Kurs und zahlt die Belohnungen an die Gewinner aus.

![Annahme von Wetten auf der Blockchain und Auszahlung von Belohnungen in LSK, ETH und ADM](/images/engineering-notes/medium/8dd6abb45e2d/002-0-yhlmw4fu3ffrh8-l.webp)

## Versionshinweise zu v2.0.2

Die Version v2.0.2 fügt die Unterstützung für Lisk hinzu, ermöglicht Socket-Verbindungen, aktualisiert Abhängigkeiten und beinhaltet Refactorings sowie Fehlerbehebungen.
