---
title: "ADAMANT Docs & Schema: Top Accounts, Client WebSocket Events und Consensus Visibility"
slug: "discussion-68-docs-and-schema-top-accounts-client-websocket-events-and-consensus-visibility-10447246"
description: "Die ADAMANT-Dokumentation und Schema-Repositories wurden an die aktuelle Node-API-Oberfläche angeglichen. Alle Änderungen sind additiv und abwärtskompatibel — kein Consensus-Fork oder Wire-Format-Bruch."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/68"
publishedAt: "2026-07-17T12:40:07Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:10447246"
locale: "de"
placeholder: false
---

Die ADAMANT-Dokumentation und Schema-Repositories wurden an die aktuelle Node-API-Oberfläche angeglichen. Alle Änderungen sind additiv und abwärtskompatibel — kein Consensus-Fork oder Wire-Format-Bruch. Die Live-Dokumentation ist unter `https://docs.adamant.im` verfügbar, das OpenAPI-Bundle unter `https://schema.adamant.im`.

## Top Accounts API

`GET /api/accounts/top` ist nun Teil des öffentlichen Vertrags. Die Sortierung ist deterministisch: `balance DESC`, dann `address ASC`. Der Endpunkt unterstützt `limit`- und `offset`-Paginierung, einen optionalen `isDelegate`-Filter, Response-Metadaten (`count`) und `limit=0` für reine Zähl-Anfragen. Der Legacy-Konfigurationsschalter `topAccounts` wurde entfernt — der Endpunkt ist auf jedem Node registriert.

## Client WebSocket: `newBlock` und `balances/change`

Die Client-Socket.IO-Schnittstelle erhielt optionale kompakte `newBlock`-Events und feldgenaue `balances/change`-Payloads, die `balance`, `unconfirmedBalance` oder beide enthalten können. Subscriptions werden nach `address`, `types`, `assetChatTypes`, `balances` und `blocks` indiziert. Die Zustellung bleibt Best-Effort und nicht persistent: Konsumenten müssen sich neu verbinden, erneut subscriben und kritischen Zustand über REST abgleichen. Das OpenAPI-Paket dokumentiert dies unter `x-client-websocket` mit dedizierten Schemas in `specification/websocket/`.

## Status Schedules und Delegate `forged`

Öffentliche Status-APIs legen nun den effektiven Consensus-Aktivierungsplan und den vollständigen Block-Reward-Meilensteinplan offen, einschließlich `consensusCodeName`, `consensusSchedule.activationHeights` und `milestoneSchedule` (bestehend aus `offset`, `distance` und `milestones`). Delegate-List- und Get-Responses enthalten nun das lebenslange `forged` als Base-10-Integer-String in Base-Units. Die Next-forger-Projektion verwendet die nächste Block-Höhe an Runden-Grenzen. Das Schema korrigierte zudem `producedlocks` zu `producedblocks` und vervollständigte die Query-Parameter-Abdeckung für Peers, queued und unconfirmed Transactions sowie Delegate-Suche und `orderBy`.

## Blocks API Alignment

Die Query-Semantik von `GET /api/blocks` ist nun am tatsächlichen Node-Verhalten ausgerichtet. `numberOfTransactions=0` funktioniert korrekt, und `orderBy`, Betragsfilter sowie `offset` nach Sortierung sind präzise dokumentiert. Das Schema fügt vollständige Parameter-Abdeckung und `generatorPublicKey` auf `BlockInfoDto` hinzu. Falsche `timestampMs`-Beispiele wurden aus der Dokumentation entfernt.

## Operator Recovery: Mem-Table Checkpoints

Persistierte rotierende `mem_*`-Checkpoints sind für die Crash-Recovery dokumentiert. Das Feature wird über `loading.memCheckpoints.enabled` gesteuert und ist standardmäßig aktiviert. Die Dokumentation deckt SHA-256-Verifizierung, Fail-Closed-Restore, Fallback auf vollständigen deterministischen Rebuild, Speicherauswirkungen und das Verhalten bei geordnetem Shutdown ab (`SIGINT`/`SIGTERM` → Warten auf `Cleaned up successfully`). Checkpoints dienen als lokaler Recovery-Cache; kanonische Blöcke bleiben die Quelle der Wahrheit.

## Release Context

Diese Updates zielen auf ADAMANT Node `v0.10.2`. Downstream-Konsumenten — insbesondere `adamant-api-jsclient` — sollten ihre Typen aus dem aktualisierten OpenAPI-Bundle neu generieren. Relevante Pull Requests erstrecken sich über die [docs](https://github.com/Adamant-im/docs/pull/39)-, [schema](https://github.com/Adamant-im/adamant-schema/pull/53)- und [node](https://github.com/Adamant-im/adamant)-Repositories.
