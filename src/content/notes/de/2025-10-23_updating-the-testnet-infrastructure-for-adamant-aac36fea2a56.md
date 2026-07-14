---
title: "Aktualisierung der Testnet-Infrastruktur für ADAMANT"
slug: "updating-the-testnet-infrastructure-for-adamant-aac36fea2a56"
description: "Warum das Testnet wichtig ist: Die Testnet-Infrastruktur von ADAMANT benötigt Updates und Stabilisierung zur besseren Unterstützung von Entwicklung, Tests und Community-Beiträgen."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/updating-the-testnet-infrastructure-for-adamant-aac36fea2a56"
publishedAt: "2025-10-23T15:31:46.542Z"
author: "Alex Web3"
authorUrl: "https://medium.com/@al.onyxprotocol"
sourceAccount: "al-onyx"
coverImage: "/images/engineering-notes/medium/aac36fea2a56/001-1-gpu744hucponr8ep2jojwa-png.webp"
cardSpan: "full"
originalId: "medium:aac36fea2a56"
locale: "de"
placeholder: false
---

### Warum das Testnet wichtig ist

Die Testnet-Infrastruktur von ADAMANT wurde in [Issue #148](https://github.com/Adamant-im/adamant/issues/148) als verbesserungsbedürftig identifiziert, um Entwicklung, Tests und Community-Beiträge besser unterstützen zu können. Aus der Diskussion ergaben sich zwei Prioritäten: Erstens Zugänglichkeit, sodass neue Mitwirkende einen Knoten ohne komplizierte Einrichtung betreiben können, und zweitens Stabilität, damit Testknoten zuverlässig produktionsnahen Bedingungen entsprechen.

### Bootstrap-Image für das ADM-Testnet

Ein Snapshot der Testnet-Datenbank steht zum Download bereit und ermöglicht es, einen neuen Knoten mit dem aktuellen Stand des Testnetzes zu synchronisieren, wodurch die Einrichtungszeit erheblich verkürzt wird.

Nach der Installation eines Testnet-Knotens, laden Sie den Snapshot herunter:

```bash
wget https://testnet.adamant.im/db_test_backup.sql.gz
```

Entpacken Sie ihn:

```bash
gunzip db_test_backup.sql.gz
```

Laden Sie das Image in die Datenbank des Testnet-Knotens:

```bash
psql adamant_test < db_test_backup.sql
```

### Öffentliche Testnet-Knoten

Das ADAMANT-Testnet stellt eine vordefinierte Liste öffentlicher Knoten für die Peersuche, Netzwerksynchronisation und API-Zugriff bereit. Die maßgebliche Quelle ist die [offizielle Konfigurationsdatei](https://github.com/Adamant-im/adamant/blob/dev/test/config.default.json) im Repository. Zum jetzigen Zeitpunkt enthält die Liste drei Knoten, alle auf Port 36667:

```json
"list": [
  {
    "ip": "162.55.32.80",
    "port": 36667
  },
  {
    "ip": "81.0.247.181",
    "port": 36667
  },
  {
    "ip": "95.217.19.144",
    "port": 36667
  }
]
```

Der erste Knoten (`testnode1.adamant.im`) hostet auch den Testnet-Explorer. Der zweite hat keine Domain und die öffentliche API ist deaktiviert. Der dritte (`testnode3.adm.im`) stellt eine öffentliche API bereit; beispielsweise liefert `https://testnode3.adm.im/api/node/status` den Status des Knotens.

### Ausführen von Tests

Mitwirkende und Validatoren sollten die Unit- und API-Tests gemäß den [Beitragsrichtlinien des Projekts](https://github.com/Adamant-im/adamant/blob/dev/.github/CONTRIBUTING.md) an ihrem Knoten durchführen.

### Anfordern von Testnet-ADM und Zugriff auf Apps

Sie können 3500 Testnet-ADM über denselben Faucet anfordern, der auch für das Mainnet verwendet wird: [https://adamant.im/free-adm-tokens](https://adamant.im/free-adm-tokens/). Die Testnet-Messenger-App ist verfügbar unter [https://dev-adamant-testnet.surge.sh](https://dev-adamant-testnet.surge.sh) und wird automatisch aus dem dev-Branch erstellt. Der Testnet-Explorer befindet sich unter [https://testnet.adamant.im](https://testnet.adamant.im/).
