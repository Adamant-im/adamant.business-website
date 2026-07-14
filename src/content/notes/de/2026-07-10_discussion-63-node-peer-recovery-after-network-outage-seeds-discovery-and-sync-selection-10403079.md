---
title: "ADAMANT-Knoten-Peer-Wiederherstellung nach Netzwerkausfall: Seeds, Discovery und Sync-Auswahl"
slug: "discussion-63-node-peer-recovery-after-network-outage-seeds-discovery-and-sync-selection-10403079"
description: "ADAMANT-Knoten nutzen drei Mechanismen für die Peer-Verbindung, die nach einem Ausfall leicht zu verwechseln sind. Dieser Beitrag erklärt ihr Zusammenspiel."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/63"
publishedAt: "2026-07-10T05:24:55Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "ADM Nodes, Delegates & Pools"
cardSpan: "half"
originalId: "github-discussion:10403079"
locale: "de"
placeholder: false
---

ADAMANT-Knoten halten die Peer-Verbindung über drei separate Mechanismen aufrecht, die beim Lesen der Konsolenlogs nach einem Netzwerkausfall leicht zu verwechseln sind. Dieser Beitrag erklärt, wie sie interagieren, warum die Synchronisation auch dann stocken kann, wenn weiterhin Seed-Peers kontaktiert werden, und was Betreiber während der Wiederherstellung erwarten sollten.

## Hintergrund

Ein Knoten führt eine in-Memory-Peer-Tabelle, die aus drei Quellen befüllt wird: Seed-Peers aus der `peers.list`-Konfiguration, persistierte Peers, die beim Start aus der Datenbank geladen werden, und entdeckte Peers, die von anderen Knoten über `GET /peer/list` zurückgegeben werden. Seed-Peers sind fixiert — sie werden niemals aus der Tabelle entfernt, selbst wenn Anfragen fehlschlagen.

Jeder Peer hat einen Zustand: `BANNED` (0, von der normalen Nutzung ausgeschlossen), `DISCONNECTED` (1, bekannt, aber aktuell nicht für Sync oder Broadcast nutzbar) oder `CONNECTED` (2, kürzlich erfolgreich geantwortet und für die Synchronisation geeignet). Bei Anfragefehlern sinkt die Erfolgsrate eines Peers. Wenn ein zuvor `CONNECTED`-Peer unter 80 % Erfolgsquote fällt, wird sein Zustand auf `DISCONNECTED` herabgestuft. Netzwerk-Timeouts (`ECONNABORTED`) entfernen den Peer nicht, sondern verringern lediglich die Erfolgsrate.

## Drei parallele Mechanismen

**Seed-Ping (leise).** Beim Start und etwa alle 5 Sekunden pingt der Knoten jeden Seed-Peer aus der Konfiguration über `GET /peer/height`. Fehler werden auf Trace-Ebene protokolliert und sind normalerweise in der Standard-Konsolenausgabe nicht sichtbar. Ein erfolgreicher Ping hebt den Peer wieder auf `CONNECTED`.

**Peer-Discovery (laut).** Etwa alle 5 Sekunden wählt der Knoten zufällig einen Peer aus dem Speicher (Zustand `DISCONNECTED` oder `CONNECTED`) aus und ruft `GET /peer/list` auf, um neue Adressen zu erlernen. Wenn diese zufällige Auswahl ein Timeout hat, zeigt die Konsole Folgendes an:

```text
Discovering new peers failed. ECONNABORTED Request failed GET http://<peer>/peer/list
```

Diese Fehlermeldung nennt nur den zufällig ausgewählten Peer, nicht die gesamte Peer-Tabelle. Während der Wiederherstellung tauchen oft wenig bekannte, in der Cloud gehostete Knoten auf, die zuvor entdeckt und in der Datenbank gespeichert wurden. Das bedeutet nicht, dass der Knoten Seed-Peers ignoriert.

**Blockchain-Sync (streng).** Der Loader-Sync-Pfad verwendet `peers.list()` mit dem Standardfilter: nur `CONNECTED`-Peers. Wenn kein Peer aktuell `CONNECTED` ist und eine nutzbare Höhe hat, endet die Synchronisation mit:

```text
Failed to find enough good peers
```

In diesem Fall ist der Knoten nicht vom Netzwerk getrennt, im Sinne, dass keine Peer-Einträge vorhanden wären. Es existieren einfach keine aktiven Peers, die für den Block-Download geeignet sind.

## Typischer Ausfallverlauf

Wenn die Netzwerkverbindung verloren geht, beginnen HTTP-Anfragen an alle Peers zu fehlschlagen. Zuvor `CONNECTED`-Peers werden zu `DISCONNECTED`, und der Loader kann keine geeigneten Peers auswählen, sodass die Höhe nicht weiter fortschreitet. Discovery-Fehler treten weiterhin bei zufälligen, veralteten Einträgen auf, während Seed-Pings im Hintergrund leise weiterlaufen. Sobald mindestens ein Seed- oder anderer bekannter Peer erneut auf einen Ping antwortet, kehrt er zu `CONNECTED` zurück und die Synchronisation setzt sich fort.

Die Zeitspanne zwischen „Internet ist wieder da“ und „Knoten synchronisiert wieder“ kann mehrere Minuten betragen — oder noch länger, wenn entfernte Peers weiterhin nicht erreichbar sind —, da die Wiederherstellung von einer erfolgreichen Round-Trip-Anfrage an einen Peer abhängt, der `CONNECTED` wird, nicht nur von der lokalen Konnektivität.

## Erwartungen für Betreiber

Es ist normal, nach einem Ausfall Discovery-Fehler mit unbekannten Adressen zu sehen; dies deutet allein nicht auf eine Fehlkonfiguration hin. Seed-Peers aus der Konfiguration werden weiterhin kontaktiert; ihre Ping-Fehler sind in den Standard-Logs nur nicht auffällig. Die Meldung `Failed to find enough good peers` bedeutet, dass keine aktuell aktiven Peers vorhanden sind, nicht, dass die Peer-Tabelle geleert wurde. Ein Neustart des Knotens lädt Seeds und Datenbank-Peers erneut, aber die Wiederherstellung erfordert weiterhin, dass mindestens ein entfernter Peer antwortet.

## Mögliche Verbesserungen

Mehrere Änderungen könnten die Betreibererfahrung verbessern: Seed-Ping-Fehler auf `warn` protokollieren, wenn länger als ein Schwellwert keine `CONNECTED`-Peers vorhanden sind, Seed-Peers oder kürzlich funktionierende Peers in `getFromRandomPeer` bevorzugen statt einer gleichmäßigen Zufallsauswahl, alle Seed-Peers parallel erneut versuchen, wenn der Sync `Failed to find enough good peers` meldet, und doppelte Warnmeldungen reduzieren, wenn `async.retry` alle Sync-Versuche erschöpft hat.
