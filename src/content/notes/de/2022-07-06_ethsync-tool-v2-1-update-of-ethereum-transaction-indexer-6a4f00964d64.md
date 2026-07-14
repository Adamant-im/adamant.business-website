---
title: "EthSync Tool v2.1: Update für den Ethereum-Transaktionsindexer"
slug: "ethsync-tool-v2-1-update-of-ethereum-transaction-indexer-6a4f00964d64"
description: "Das EthSync-Tool indiziert Ethereum- und ERC20-Transaktionen nach Adresse und bietet eine Wallet-Historie ähnlich wie Block-Explorer."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/ethsync-tool-v2-1-update-of-ethereum-transaction-indexer-6a4f00964d64"
publishedAt: "2022-07-06T15:40:23.802Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
cardSpan: "full"
originalId: "medium:6a4f00964d64"
locale: "de"
placeholder: false
---

Das EthSync-Tool indiziert Ethereum- und ERC20-Transaktionen nach Adresse und bietet eine Wallet-Historie, die Block-Explorern wie Etherscan ähnelt. Es läuft als Hintergrunddienst, der sich über HTTP-, WebSocket- oder IPC-APIs mit einem Ethereum-Knoten verbindet – kompatibel mit Geth, Nethermind und anderen Standardknoten –, speichert alle Transaktionen in einer Postgres-Datenbank und stellt die Transaktionsdaten über eine postgrest-basierte API bereit.

Version 2.1 bringt mehrere Verbesserungen. Das Skript ruft nun alle Transaktionsdaten in einer einzigen Anfrage beim Ethereum-Knoten ab und sendet nur noch eine zusätzliche Anfrage pro Transaktion, um deren Status abzurufen. Dadurch wird die Belastung des Knotens erheblich reduziert. Die Protokollierung wurde erweitert, und eine neue Umgebungsvariable `LOG_FILE` ermöglicht es Betreibern, einen optionalen Dateipfad für die Protokollausgabe anzugeben. Wenn diese Variable nicht gesetzt ist, verwendet das Tool automatisch `StreamHandler`.

Dieses Release behebt außerdem Probleme mit IPC- und Datenbankverbindungen, die frühere Versionen betroffen haben. Zwei neue Testskripte sind enthalten: `ethtest.py` überprüft die Verbindung zum Ethereum-Knoten und `pgtest.py` testet die Verbindung zur Postgres-Datenbank, wodurch die Fehlersuche bei der Bereitstellung vereinfacht wird.

Das EthSync-Tool ist Teil des ADAMANT Open-Source-Projekts und steht kostenlos zur Verfügung. Die vollständige Dokumentation, Installationsanleitungen und Nutzungbeispiele finden sich in der Projekt-[Readme](https://github.com/Adamant-im/ETH-transactions-storage#indexer-for-ethereum-to-get-transaction-list-by-eth-address).
