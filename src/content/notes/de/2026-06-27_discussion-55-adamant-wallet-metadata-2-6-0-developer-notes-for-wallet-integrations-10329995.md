---
title: "ADAMANT Wallet Metadata 2.6.0: Entwicklernotizen für Wallet-Integrationen"
slug: "discussion-55-adamant-wallet-metadata-2-6-0-developer-notes-for-wallet-integrations-10329995"
description: "ADAMANT Wallet Metadata 2.6.0 steht vor der Veröffentlichung. Aktualisierungen für Entwickler von integrierten ADAMANT-Wallets, Metadaten, Knotenlisten und mehr."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/55"
publishedAt: "2026-06-27T13:42:14Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "Developers & API"
cardSpan: "half"
originalId: "github-discussion:10329995"
locale: "de"
placeholder: false
---

ADAMANT Wallet Metadata `2.6.0` steht vor der Veröffentlichung. Diese Aktualisierung betrifft vor allem Entwickler, die ADAMANT-interne Kryptowallets, Wallet-Metadaten, Knotenlisten, Dienstedefinitionen oder die Synchronisation downstream gerichteter Wallet-Oberflächen und -Konfigurationen integrieren.

## Was sich für Wallet- und Service-Entwickler geändert hat

Das Repository `adamant-wallets` ist die kanonische Quelle für Münz-, Token-, Blockchain-, Knoten-, Service-, Icon- und Schema-Metadaten, die von ADAMANT-Apps verwendet werden. Version `2.6.0` aktualisiert sowohl die Metadaten selbst als auch die Dokumentation dazu, wie Downstream-Verbraucher diese lesen sollten.

Das Modell für Metadaten-Überschreibungen ist nun klarer dokumentiert. Gemeinsame Felder befinden sich in `assets/general/<coin-or-token>/info.json`, Blockchain-Standardwerte in `assets/blockchains/<blockchain>/info.json`, und blockchain-spezifische Token-Überschreibungen in `assets/blockchains/<blockchain>/<token>/info.json`. Die `README.md` stellt nun erweiterte Erklärungen zu Wallet-Metadaten-Parametern wieder her, einschließlich Knoten, Dienste, Gebühren, Präzision, Icons, Health Checks, Statusflags und Überweisungslimits. Die `specification/openapi.json` umfasst nun mehr Wallet-Metadaten-Felder und verschachtelte Strukturen, wodurch SDKs, Validatoren, Schema-Verbraucher und generierte Dokumentation näher an der tatsächlichen JSON-Struktur bleiben können. Repository-spezifische Wartungsregeln, Validierungserwartungen, Issue/PR-Konventionen und Metadaten-Sicherheitsregeln sind nun in `AGENTS.md` und `.github/CONTRIBUTING.md` dokumentiert.

## Zu prüfende Metadatenaktualisierungen downstream

Wenn Ihre App, Ihr Service, SDK, Bot oder Backend ADAMANT-Wallet-Metadaten direkt oder über gebündelte ADAMANT-Wallets nutzt, prüfen Sie die folgenden Änderungen.

ADAMANT-Knoten-Metadaten wurden aktualisiert, und drei nicht verfügbare ADM-Proxy-Knoten wurden entfernt: `tauri.bbry.app`, `endless.bbry.app` und `debate.bbry.app`. Bitcoin-, Dash- und Dogecoin-Metadaten wurden aktualisiert, und Beispiele zur Dogecoin-Adressvalidierung wurden korrigiert. Der DAI-GitHub-Link wurde korrigiert, und die GT-Token-Benennung wurde angepasst. Veraltete USDS-Metadaten und zugehörige Icon-Assets wurden entfernt. Paket-Metadaten, Abhängigkeits-Lockdatei, Node.js-Engine-Informationen, Validierungsskripte und Repository-Links wurden ebenfalls aktualisiert.

## Empfohlene Prüfungen für Integratoren

Wenn Sie dieses Repository in einer Wallet, einer Börsenintegration, einem Monitoring-Service, einer mobilen App, einer PWA, einem SDK oder einem benutzerdefinierten Backend nutzen, synchronisieren Sie die Wallet-Metadaten erneut, nachdem `2.6.0` in `master` gemerged wurde. Prüfen Sie, ob Ihr Code hartkodierte Referenzen auf die entfernten USDS-Metadaten oder die entfernten ADM-Proxy-Knoten enthält, und führen Sie Ihre Metadatenvalidierung erneut mit dem aktualisierten OpenAPI-Schema durch, falls Sie generierte Typen, Validatoren oder schema-basierte Tools verwenden.

Überprüfen Sie erneut das Verhalten der Wallet-Oberfläche für Felder wie `status`, `defaultVisibility`, `defaultOrdinalLevel`, `decimals`, `cryptoTransferDecimals`, `minBalance`, `minTransferAmount`, `fixedFee`, `defaultFee` und Icon-Pfade. Überprüfen Sie die Logik zur Auswahl von Knoten und Diensten, wenn Ihre App `nodes`, `services`, `healthCheck`, `minVersion`, `hasIndex`, `alt_ip`, `txFetchInfo`, `txConsistencyMaxTime`, `timeout` oder Einstellungen zur Zuverlässigkeitsgasmenge verwendet. Stellen Sie sicher, dass Ihre Integration Metadaten als listenbasierte Konfiguration behandelt und keinen einzelnen Endpunkt festlegt, es sei denn, Ihre eigene Fallback-Strategie ist explizit definiert.

## Referenzen

- Release issue: https://github.com/Adamant-im/adamant-wallets/issues/137
- Release PR: https://github.com/Adamant-im/adamant-wallets/pull/138
- Repository: https://github.com/Adamant-im/adamant-wallets
- ADAMANT Improvement Proposals: https://aips.adamant.im/
