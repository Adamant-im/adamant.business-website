---
title: "Aktualisierung der Testnet-Infrastruktur für ADAMANT"
slug: "discussion-34-updating-the-testnet-infrastructure-for-adamant-9063403"
description: "ADAMANT hat eine Infrastrukturverbesserung (Issue 148) zur Stabilisierung des Testnets eingeleitet. Ein stabiles Testnet ist entscheidend für die Blockchain-Entwicklung."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/34"
publishedAt: "2025-10-23T15:40:31Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:9063403"
locale: "de"
placeholder: false
---

ADAMANT hat eine Infrastrukturverbesserungsmaßnahme (Issue #148) identifiziert, um die Testnet-Umgebung zu aktualisieren und zu stabilisieren. Ein gesundes Testnet ist entscheidend für eine zuverlässige Blockchain-Entwicklung und ermöglicht realistisches Testen sowie das Onboarding von Beitragenden.

## Verfügbarer Umfang

Ein **Bootstrap-Snapshot** der Testnet-Datenbank steht nun zum Download unter `https://testnet.adamant.im/db_test_backup.sql.gz` bereit. Dadurch können Entwickler schnell einen Testnet-Knoten einrichten, ohne den Sync-Prozess von Grund auf durchlaufen zu müssen.

Testnet-ADM-Münzen (3500 ADM) können über denselben Faucet wie das Mainnet unter `https://adamant.im/free-adm-tokens/` angefordert werden. Die Testnet-Messenger-App, die den dev-Zweig ausführt, ist verfügbar unter `https://dev-adamant-testnet.surge.sh/`, und der Testnet-Block-Explorer steht unter `https://testnet.adamant.im/` zur Verfügung.

Eine Liste öffentlicher Testnet-Knoten wird in der Standardkonfigurationsdatei auf GitHub gepflegt: `https://github.com/Adamant-im/adamant/blob/dev/test/config.default.json`.

Für vollständige Implementierungsdetails siehe den Originalartikel unter `https://news.adamant.im/updating-the-testnet-infrastructure-for-adamant-aac36fea2a56`.
