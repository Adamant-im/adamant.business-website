---
title: "ADAMANT Node v0.10.2: Sicherere Wiederherstellung, erweiterte APIs und schnellere Abfragen"
slug: "discussion-66-adamant-node-v0-10-2-safer-recovery-richer-apis-and-faster-queries-10442742"
description: "ADAMANT Node v0.10.2 verbessert Knotenverfügbarkeit, schnellere Wiederherstellung, sicherere Datenbankfehlerbehandlung, erweiterte Beobachtungs-APIs und effizientere Client-Abonnements."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/66"
publishedAt: "2026-07-16T18:19:41Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "ADM Nodes, Delegates & Pools"
cardSpan: "half"
originalId: "github-discussion:10442742"
locale: "de"
placeholder: false
---

ADAMANT Node v0.10.2 konzentriert sich auf Knotenverfügbarkeit, schnellere Wiederherstellung, sicherere Behandlung von Datenbankfehlern, erweiterte Beobachtungs-APIs und effizientere Client-Abonnements. Ein Upgrade wird empfohlen, ist für die Netzwerkkompatibilität jedoch nicht zwingend erforderlich: Das Release enthält keinen Konsens-Fork und ändert weder Block- oder Transaktionsserialisierung, Signaturen, Delegiertenreihenfolge, Belohnungen, Gebühren, Aktivierungshöhen, Slot-Timing noch deterministisches Replay.

## Wiederherstellung der Synchronisation

Ein Callback- oder Datenbankfehler in der Synchronisations-Pipeline konnte einen Knoten zuvor dauerhaft in einem Zustand belassen, in dem er meldete, zu synchronisieren, ohne Fortschritte zu machen. In diesem Zustand lehnte er Live-Blöcke ab, startete nie eine weitere Synchronisation und erforderte einen manuellen Neustart. v0.10.2 führt einen fortschrittsbasierten Watchdog ein, der einen Synchronisationslauf erkennt, der seit fünf Minuten keinen neuen Block angewendet hat. Der blockierte Lauf wird über ein laufzeitbezogenes Stopp-Signal abgebrochen, nach dem Abbruchsignal darf keine neue Zustandsänderung beginnen, und laufende Block-/Konto-Arbeiten werden abgeschlossen, bevor der Loader seinen Synchronisationszustand freigibt. Abgelehnte PostgreSQL-Abfragen werden nun über die Blockverifizierung, das Blockladen und die Startup-Speichertabellen-Aktualisierungen weitergeleitet, anstatt Callback-Ketten still zu parken. Dies sind ausschließlich Verfügbarkeits- und Fehlerweiterleitungsänderungen; sie ändern nicht, welche Blöcke gültig sind.

## Persistierte Checkpoints

ADAMANT hält den konsensabgeleiteten Zustand in `mem_*`-Tabellen. Wird ein Prozess unterbrochen, während diese Spiegel aktualisiert werden, muss der Knoten sie aus kanonischen Blöcken neu aufbauen. v0.10.2 fügt drei rotierende Checkpoint-Slots für abgeleiteten Speicherzustand hinzu. Jeder Checkpoint erfasst Blockhöhe/ID, Runde, Nethash, Schema-Version, Status und kanonischen SHA-256-Digest. Der Startup akzeptiert nur Checkpoints, deren Metadaten, Digest, Kettenreferenz, Netzwerk und Zustandinvarianten die Validierung bestehen. Ein gültiger Checkpoint wird wiederhergestellt und nur spätere Blöcke werden replayt; jeder Validierungs- oder Partial-Replay-Fehler fällt auf den bestehenden vollständigen deterministischen Neuaufbau zurück. Unbestätigte Junction-Tabellen werden nicht gecheckpointet und aus dem bestätigten Zustand neu aufgebaut. Kanonische Blöcke und deterministisches Replay bleiben die Quelle der Wahrheit – ein Checkpoint ist nur ein lokaler Wiederherstellungs-Cache und kann den Kettenzustand nicht neu definieren.

## REST-API-Verbesserungen

`GET /api/accounts/top` ist nun auf jedem Knoten konsistent verfügbar und bietet deterministische `balance DESC, address ASC`-Sortierung, Paginierung, einen `isDelegate`-Filter, Zählmetadaten und `limit=0`-Zähl-Anfragen.

Mehrere Delegate-API-Fehler wurden behoben. `GET /api/delegates/get` meldet wieder den echten Rang/Rate des Delegierten und korrekte Outsider-Produktivität. `GET /api/delegates/voters` kann seinen Adressfilter nicht mehr verlieren und alle Konten zurückgeben. `GET /api/delegates/getNextForgers` verwendet die nächste Blockhöhe an Rundengrenzen und meldet einen stabilen Ladefehler, bevor ein Ketten-Tip existiert.

Status- und Delegierten-APIs legen nun den aktiven `consensusCodeName`, den effektiven Konsens-Aktivierungsplan nach Standardwerten und Laufzeit-Overrides, den vollständigen Blockbelohnungs-Meilensteinplan und den lebenslangen `forged`-Betrag jedes Delegierten als Base-10-Integer-String offen. Dies reduziert die Abhängigkeit von duplizierten hartcodierten Plänen und legt die effektive Konfiguration des Knotens offen, ohne das Konsensverhalten zu ändern.

`GET /api/blocks` berücksichtigt nun `numberOfTransactions=0`. Ein neuer zusammengesetzter B-Baum-Index auf `(text_generatorPublicKey, height DESC)` verhindert den teuren Full-Table-Filterpfad für einen unbekannten Generator in Kombination mit der Standard-Sortierung. Der Response-Vertrag bleibt unverändert. Bei einer großen Datenbank sollten Betreiber beim ersten Startup Zeit und Speicherplatz für die Index-Migration einplanen.

## Socket.IO-Block- und Balance-Events

Dienste können nun kompakte `newBlock`-Events und `balances/change`-Events für `balance`, `unconfirmedBalance` oder beides abonnieren. Der Knoten verwaltet dedizierte Abonnement-Indizes, sodass nicht verwandte Sockets nicht durchsucht werden. Balance-Lesevorgänge werden um Block-Apply/Rollback gebündelt, und Event-Veröffentlichungsfehler werden von der Zustandsänderung isoliert. Diese Events sind Best-Effort und nicht persistent; Clients sollten Abonnements nach dem Wiederverbinden wiederherstellen und REST-Abgleich für kritische Zustände verwenden.

## Abhängigkeits- und Audit-Pflege

Laufzeit- und Entwicklungsabhängigkeiten wurden innerhalb ihrer aktuellen Major-Versionen aktualisiert. Die ungenutzte direkte `npm`-Laufzeitabhängigkeit und ihr gebündelter Unterbaum wurden entfernt, und ein schmaler kompatibler Grunt/js-yaml-Override wurde hinzugefügt. Die verifizierte Audit-Baseline änderte sich von 4 moderaten und 1 hohen Fund auf null moderate, hohe oder kritische Funde. Kein kryptografisches Protokoll, Signatur, Mnemonic, Peer-Handshake oder Transaktionsvalidierungsverhalten wurde geändert.

## Betreiber-Hinweise

Verwenden Sie weiterhin Node.js 22.13.0 oder neuer. Sichern Sie die Datenbank mit dem üblichen Verfahren, stoppen Sie den Knoten ordnungsgemäß und warten Sie auf `Cleaned up successfully`. Lassen Sie den ersten v0.10.2-Startup Migrationen und Checkpoint-/Index-Erstellung abschließen. Planen Sie zusätzlichen Speicherplatz für drei rotierende abgeleitete Zustands-Checkpoint-Slots ein. Überprüfen Sie nach dem Startup `/api/node/status`, Synchronisationsfortschritt, Live-Blockverarbeitung und die REST/Socket.IO-Funktionen, die von Ihren Diensten verwendet werden.

## Referenzen

- [GitHub Release v0.10.2](https://github.com/Adamant-im/adamant/releases/tag/v0.10.2)
- [ADAMANT Node documentation](https://docs.adamant.im)
- [ADAMANT API schema](https://schema.adamant.im)
