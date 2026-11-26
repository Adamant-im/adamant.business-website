---
title: "ADAMANT Node v0.11.1: Sicherheits-Härtung, verschlüsseltes Forging und konsolidierte Dokumentation"
slug: "discussion-84-adamant-node-v0-11-1-security-hardening-encrypted-forging-and-consolidated-docs-11400159"
description: "ADAMANT Node v0.11.1 ist ein wichtiges Sicherheits- und Stabilitäts-Release für Node-Betreiber, Delegates, Pool-Betreiber, Explorer, Messenger und andere Dienste."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/84"
publishedAt: "2026-11-25T19:56:21Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "ADM Nodes, Delegates & Pools"
cardSpan: "half"
originalId: "github-discussion:11400159"
locale: "de"
placeholder: false
---

ADAMANT Node v0.11.1 ist ein wichtiges Sicherheits- und Stabilitäts-Release für Node-Betreiber, Delegates, Pool-Betreiber, Explorer, Messenger und andere Dienste, die mit ADAMANT-Nodes kommunizieren. Es handelt sich um das erste getaggte Release der v0.11-Linie; v0.11.0 wurde zwar in den `master`-Branch gemergt, aber nie getaggt, daher sollten auch Betreiber, die den `master`-Branch nutzen, ein Upgrade durchführen.

Ein Upgrade wird dringend empfohlen. Es gibt keinen Konsens-Fork und keine neuen SQL-Migrationen: Serialisierung, Signaturen, Delegate-Reihenfolge, Belohnungen, Gebühren, Aktivierungshöhen und Slot-Timing sind identisch mit v0.10.2. Aufgrund von Breaking Changes in der HTTP-API und geänderten Laufzeitanforderungen sollten Betreiber jedoch vor dem Upgrade den Upgrade-Leitfaden lesen.

## Vor dem Upgrade

Erforderlich sind nun Node.js 22.22.2+ (innerhalb von 22.x) oder 24.15.0+. Legacy-APIs für Forging und DApp-Laufzeitsteuerung wurden vollständig entfernt (GHSA-vjhq-r5fg-85cx). Das Forging wird nun über `forging.secret` in der `config.json` konfiguriert; schreibgeschützte DApp-APIs und DApp-Transaktionstypen sind davon nicht betroffen. Filter für States, Chats und Chatrooms sind nun strikt: `and:`-Filter funktionieren wie erwartet, während `or:`, falsch geschriebene oder nicht unterstützte Parameter nun abgelehnt statt stillschweigend ignoriert werden. Der Parameter `keysIds` wurde in `keyIds` umbenannt. Ratenbegrenzungen (Rate Limits) sind standardmäßig aktiviert; alte `max: 0`-Limits in der `config.json` deaktivieren die Begrenzung weiterhin, daher sollten diese entfernt werden, um die neuen Standardwerte zu übernehmen.

## Sicherheit und Härtung

Die serverseitige DApp-Ausführungsumgebung und die HTTP-Forging-Steuerung wurden vollständig entfernt statt nur gepatcht, was die Angriffsfläche erheblich reduziert.

Delegate-Passphrasen in der `forging.secret` können optional mit einem Betreiber-Passwort unter Verwendung von AES-256-GCM mit scrypt-Schlüsselableitung verschlüsselt werden. Die Node synchronisiert weiterhin und stellt APIs bereit, während sie gesperrt ist; das Forging wird lokal über das `adm-node` CLI entsperrt. Konfigurationen im Klartext funktionieren weiterhin. Zabbix-Templates für den Sperrstatus und das Delegate-Ergebnis sind enthalten.

Anti-Missbrauchs-Ratenbegrenzungen wurden für öffentlichen REST-, Peer-HTTP- und WebSocket-Verkehr hinzugefügt, jeweils mit einer konsistenten `429`-Antwort. Während der Übergangsphase mit gemischten Versionen werden `/peer/*`-Anfragen ohne den neuen Ratenbegrenzungs-Header nicht gedrosselt, und jeder Aufrufer kann diesen weglassen. Betreiber sollten bis zur vollständigen Implementierung innerhalb der Node ein Limit für `/peer/*` an ihrem Reverse-Proxy oder ihrer Firewall hinzufügen.

Installations- und Reparaturskripte sind nun sicherer: Snapshot-Prüfsummen werden verifiziert, PM2- und systemd-Shutdown-Einstellungen erfolgen sauber, und eine synchronisierende Node wird nicht ohne explizite Anweisung neu gestartet. Abhängigkeiten werden mit einer 7-tägigen Release-Quarantäne in der CI aktualisiert, wobei keine moderaten oder höheren Audit-Befunde vorliegen dürfen.

## Zuverlässigkeit und Netzwerk

Die Node stellt nun PostgreSQL-Verbindungen nach einem Datenbank-Neustart wieder her, anstatt hängenzubleiben. Peer-Health-Checks und Antwortgrößen sind begrenzt, mit Backoff- und Ausschlussmechanismen für unerreichbare Peers. Ausgehende WebSocket-Verbindungen wurden sowohl für die Peer-Rotation als auch für die v0.11.0-Regression behoben, bei der gar keine ausgehenden Verbindungen aufgebaut wurden. Die Round-Settlement-Logik ist nun höhenbegrenzt, und das Rollback von Belohnungen ist pro Delegate abgestimmt; Replay und Recovery erzeugten identische Zustände auf Mainnet und Testnet. Ein separates Rollback-Problem bleibt offen. Ein schnellerer Memory-Checkpoint-Guard-Query und aktualisierte Seed-Peers runden die Stabilitätsverbesserungen ab.

## API und Dokumentation

Die `and:`-Filter berücksichtigen nun korrekt `toHeight` sowie kombinierte Absender-/Empfänger-Bedingungen. Die Dokumentation und die OpenAPI 3.2-Spezifikation befinden sich nun im Node-Repository, sodass Code, Schema und Dokumentation synchron gehalten werden. Das API-Schema ist unter https://docs.adamant.im/schema/ veröffentlicht. Betreiber von API-Clients und Tools sollten zukünftig die OpenAPI-Quellen aus dem Verzeichnis `openapi/` im Node-Repository beziehen.

## Upgrade-Anleitung

Aktualisieren Sie Node.js auf eine unterstützte Version, stoppen Sie die Node ordnungsgemäß und warten Sie auf die Meldung `Cleaned up successfully` — verwenden Sie niemals `kill -9`. Checken Sie v0.11.1 aus und führen Sie `npm ci --omit=dev` aus. Überprüfen Sie die `config.json` auf Ratenbegrenzungsblöcke, `trustProxy` und Automatisierungen, die entfernte Endpunkte aufrufen. Starten Sie die Node; bei verschlüsselten Passphrasen führen Sie nach jedem Neustart `npm run adm-node -- forging unlock` aus. Überprüfen Sie `/api/node/status`, den Synchronisationsfortschritt, die Peer-Verbindungen und den Forging-Status.

Vor der Veröffentlichung lief v0.11.0 auf einer Mainnet-Node mit vier Delegates und verschlüsselten Passphrasen über 16 Stunden: 471 Blöcke wurden geschmiedet, nach dem Neustart ging kein Block verloren. Das einzige release-spezifische Problem — die ausgehende WebSocket-Regression — wurde in v0.11.1 behoben.
