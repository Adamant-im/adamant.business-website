---
title: "Persistente Mem-Table-Checkpoints für Absturzwiederherstellung"
slug: "discussion-64-persisted-mem-table-checkpoints-for-crash-recovery-node-261-10411019"
description: "Der ADAMANT-Knoten unterstützt jetzt persistente, rotierende Checkpoints des abgeleiteten Speicherzustands. Nach einem erzwungenen Abbruch kann der Startvorgang den letzten verifizierten Checkpoint wiederherstellen und nur Blöcke danach neu verarbeiten."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/64"
publishedAt: "2026-07-11T14:36:39Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "ADM Nodes, Delegates & Pools"
cardSpan: "half"
originalId: "github-discussion:10411019"
locale: "de"
placeholder: false
---

Der ADAMANT-Knoten unterstützt jetzt persistente, rotierende Checkpoints des abgeleiteten `mem_*`-Zustands. Nach einem erzwungenen Abbruch, der Speicherabbilder inkonsistent hinterlässt, kann der Start den letzten verifizierten Checkpoint wiederherstellen und nur Blöcke nach der Checkpoint-Höhe neu verarbeiten, anstatt alle Speichertabellen ab Höhe 1 neu aufzubauen. Dies implementiert das Design aus Issue #227, das in Pull Request #261 zusammengeführt wurde. Checkpoints sind lediglich ein lokaler Wiederherstellungscache; Blöcke und deterministisches Neuspielen bleiben die verbindliche Quelle. Falls Verifizierung oder Neuspielen fehlschlägt, fällt der Knoten auf den bestehenden vollständigen Neuaufbau zurück.

Abgeleitete Tabellen wie `mem_accounts`, `mem_round`, Delegierte- und Multisig-Verbindungstabellen sowie deren unbestätigte Spiegel können inkonsistent werden, wenn der Prozess während laufender Schreibvorgänge beendet wird. Ein ordnungsgemäßes Herunterfahren über `SIGTERM` bleibt der erforderliche Betriebsweg, aber Checkpoints verkürzen die Wiederherstellungszeit, wenn dennoch ein erzwungenes Beenden erfolgt.

Die Implementierung führt eine Metadatentabelle (`mem_state_checkpoint_meta`) und drei rotierende Tabellensatzgruppen (`mem_ckpt_0..2_*`) für den bestätigten Zustand ein. Unbestätigte Verbindungstabellen werden nicht gesichert; sie werden beim Wiederherstellen aus dem bestätigten Zustand neu aufgebaut. Die Kernlogik ist aufgeteilt auf `logic/memCheckpoint.js` für Digest und Slot-Rotation, `modules/memCheckpoints.js` als Modul-Wrapper, `sql/memCheckpoints.js` für SQL-Hilfsfunktionen sowie Änderungen an `modules/loader.js` und `modules/blocks/chain.js`, um Wiederherstellung und Checkpoint-Erstellung auszulösen.

Checkpoints werden nur an abgeschlossenen Rundengrenzen erstellt, nachdem die gesamte `applyBlock`-Pipeline den Block dauerhaft gespeichert hat. Am Chain-Tip erfolgt dies nach jeder abgeschlossenen Runde. Während der Catch-up-Synchronisation geschieht es alle 100. Runde, um die Synchronisationsdurchsatzleistung nicht zu beeinträchtigen. Die Checkpoint-Erstellung nutzt eine PostgreSQL-`REPEATABLE READ`-Transaktion, um den MVCC-Snapshot einzufrieren. Der kritische Abschnitt für die Blockverarbeitung wird freigegeben, sobald die Metadatenzeile gespeichert ist, während das Tabellenkopieren und Digest-Berechnung im Hintergrund auf dem eingefrorenen Snapshot fortgesetzt werden. Dadurch wird der kritische Abschnitt nicht für die gesamte Kopieroperation gehalten.

Bevor ein Checkpoint für die Wiederherstellung akzeptiert wird, werden mehrere Invarianten geprüft: Der Status muss vollständig sein, Schema und Nethash müssen übereinstimmen, der referenzierte Block muss existieren und der SHA-256-Digest muss korrekt sein. Die Wiederherstellung versucht alle vollständigen Slots in absteigender Reihenfolge (neuester zuerst), sodass ein beschädigter neuester Slot keinen vollständigen Neuaufbau erzwingt, falls ein älterer gültiger Slot vorhanden ist. Beim Start, wenn `checkMemTables()` Inkonsistenzen erkennt, stellt `memCheckpoints.tryRecover()` den Slot wieder her, setzt den unbestätigten Zustand zurück, initialisiert den letzten Block und spielt Blöcke von der Checkpoint-Höhe bis zum Chain-Tip erneut ab. Falls das Neuspielen fehlschlägt, verwirft der Knoten den Checkpoint-Zustand und führt einen vollständigen Neuaufbau ab Genesis durch.

Die Funktion ist standardmäßig in `config.default.json` aktiviert:

```json
"loading": {
  "memCheckpoints": {
    "enabled": true
  }
}
```

Betreibende sollten beachten, dass dies keine Protokolländerungen einführt; Checkpoints fließen niemals in den Konsens ein, und manipulierte lokale Daten können die Blockvalidierung nicht umgehen. Bei mainnet-großen `mem_*`-Footprints benötigen drei Slots etwa 96–144 MB plus Metadaten, daher wird empfohlen, etwa 1 GB Reserve vorzuhalten. Betreibende sollten weiterhin ordnungsgemäßes Herunterfahren bevorzugen, da Checkpoints die Wiederherstellung verkürzen, aber korrekte Herunterfahrverfahren nicht ersetzen.
