---
title: "Currencyinfo 4.2.0: Selbst gehostete Referenzkurse für Krypto und Fiat"
slug: "currencyinfo-4-2-0-reliable-reference-rates-now-built-for-everyone-953c0ea815f7"
description: "Jede Wallet, jeder Explorer und jedes Finanztool benötigt aktuelle Asset-Preise. Currencyinfo 4.2.0 bietet nun eine universelle, Open-Source-Lösung für Referenzkurse."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/currencyinfo-4-2-0-reliable-reference-rates-now-built-for-everyone-953c0ea815f7"
publishedAt: "2026-09-10T20:41:57.667Z"
author: "ADAMANT Messenger"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:953c0ea815f7"
coverImage: "/images/engineering-notes/medium/953c0ea815f7/001-b82653a311.webp"
locale: "de"
placeholder: false
---

Jede Wallet, jeder Explorer, jeder Zahlungsdienst, jedes Buchhaltungstool und jede Portfolio-App stellt sich irgendwann dieselbe Frage: Welchen Wert hat dieses Asset in diesem Moment? Die Schwierigkeit liegt nicht darin, einen API-Aufruf zu tätigen. Sie liegt darin, zu entscheiden, welcher Quelle man vertraut, unterschiedliche Märkte zu normalisieren, Quoten und Ausfälle zu überstehen, fehlerhafte Daten abzuweisen, den Verlauf zu bewahren und zu begründen, warum sich ein Wert geändert hat. Currencyinfo wurde entwickelt, um genau diese Arbeit zu erledigen – und mit Version 4.2.0 wird es nicht mehr als interne ADAMANT-Komponente präsentiert. Es ist ein universeller, quelloffener und selbst gehosteter Referenzkurs-Dienst für jeden, der mit Krypto- und Fiat-Daten arbeitet.

Ein Referenzkurs sollte keine mysteriöse Zahl sein, die von einem einzelnen Anbieter übernommen wird. Er sollte ein beobachtbares Ergebnis sein, das auf Regeln basiert, die Sie selbst kontrollieren.

## Aggregation aus mehreren Quellen

Die Preisgestaltung aus einer einzigen Quelle ist bequem, bis diese Quelle Anfragen drosselt, einen Markt streicht, das Format ändert, in Ihrer Region nicht verfügbar ist oder Ausreißer meldet. Currencyinfo 4.2.0 kann bis zu zehn unabhängige Anbieter gegeneinander prüfen und deren Kurse in einen konfigurierbaren Referenzkurs umwandeln.

Das Release fügt vier schlüssellose Konnektoren hinzu: CoinPaprika, CoinLore, Binance und ExchangeRate-API. Zusammen mit Currency API umfasst die Standardkonfiguration nun fünf Quellen, die ohne API-Anmeldedaten funktionieren. CoinGecko bleibt mit einem Demo-Key verfügbar; CoinMarketCap und ExchangeRate.host unterstützen authentifizierte Setups; MOEX bietet eine weitere spezialisierte Option. CryptoCompare wird aus Kompatibilitätsgründen beibehalten, ist jedoch jetzt als veraltet markiert und standardmäßig deaktiviert, da für den neuen Zugriff ein Abonnement erforderlich ist.

Anbieter unterscheiden sich in der Asset-Abdeckung, Aktualisierungshäufigkeit, regionalen Verfügbarkeit, Quoten und Marktannahmen. Currencyinfo macht diese Unterschiede explizit und gibt Betreibern die Kontrolle darüber, wie sich diese auf den endgültigen Kurs auswirken sollen.

## Von Kursen zu einem belastbaren Referenzwert

Die Pipeline durchläuft fünf Phasen. Quellen werden nach ihren eigenen Zeitplänen abgefragt. Die Validierung normalisiert Paare und weist Null- oder nicht-finite Kreuzkurse ab. Die Aggregation erkennt Abweichungen, wendet Gruppen und Gewichtungen an und verwendet `minSources`, um zu entscheiden, ob ein Paar ausreichend gestützt ist, um veröffentlicht zu werden. Der Verlauf speichert Snapshots in der eigenen MongoDB des Betreibers. Schließlich stellt eine REST-API aktuelle und historische Kurse über gezielte Endpunkte bereit.

![Currencyinfo 4.2.0: Zuverlässige Referenzkurse, jetzt für jeden entwickelt](/images/engineering-notes/medium/953c0ea815f7/002-5f5d5df734.webp)

Diese kurze Beschreibung verbirgt mehrere nützliche Steuerelemente. Autoritative Quellgruppen können von Fallback-Gruppen getrennt werden. Gewichtungen und Zusammenführungsstrategien können festlegen, wie Anbieter kombiniert werden sollen. Eine deterministische Triangulation von Basis-Coins kann ein Paar ableiten, wenn kein direkter Kurs verfügbar ist. Die Handhabung der Aktualität durch `rateLifetime` verhindert, dass veraltete Beobachtungen unbemerkt als aktuell erscheinen.

Am wichtigsten ist, dass `minSources` nun die Aktualität berücksichtigt. Ein konfigurierter Anbieter, der keine verwertbaren Daten mehr liefert, zählt nicht mehr allein deshalb, weil er in der Konfiguration vorhanden ist. Der Dienst veröffentlicht Daten, wenn genügend *aktuelle* Nachweise vorliegen, und degradiert vorhersehbar, wenn dies nicht der Fall ist. Resilienz bedeutet nicht, so zu tun, als sei jeder Anbieter immer gesund; es bedeutet zu wissen, welche Nachweise aktuell sind, welche fehlen und was Ihr System als Nächstes tun sollte.

## Verbesserungen für Betreiber

Currencyinfo 4.2.0 stärkt auch die Komponenten hinter dem Endpunkt. Drei nach Datum sortierte Ticker-Indizes machen Verlaufsabfragen bei hoher Skalierung praktikabler. Im Validierungsdatensatz des Releases von etwa 238 Millionen Dokumenten verbesserte sich eine repräsentative Abfrage für Paare und Zeitbereiche von 22,8 Sekunden auf 8 Millisekunden. Die tatsächlichen Ergebnisse hängen von Hardware, Datenverteilung, Cache-Status und Abfrageform ab, aber die Richtung ist klar: Angesammelte Verlaufsdaten sind nun im Betrieb weitaus einfacher zu nutzen.

Der Dienst wurde auf Node.js 22.12 oder neuer umgestellt und aktualisiert seine Plattform auf NestJS 12, Mongoose 9, Zod 4, TypeScript 6 und Jest 30. Die vollständige Testsuite umfasst 28 Suiten und 266 Tests.

Die Container-Distribution ist nun ein erstklassiges Release-Format. Images werden für linux/amd64 und linux/arm64 mit OCI-Metadaten, einem SBOM und Build-Provenienz veröffentlicht. Die Laufzeitumgebung läuft ohne Root-Rechte, Paketmanager wurden aus dem Produktions-Image entfernt, Protokolle verwenden restriktive Berechtigungen, Werte im Secret-Format werden geschwärzt und die CI-Pipeline umfasst Schwachstellen-Scans.

Für eine neue Bereitstellung ist das öffentliche Image der schnellste Weg:

```
docker pull ghcr.io/adamant-im/currencyinfo:4.2.0
```

![Currencyinfo 4.2.0: Zuverlässige Referenzkurse, jetzt für jeden entwickelt](/images/engineering-notes/medium/953c0ea815f7/003-4f3ec4075a.webp)

## Klare Grenzen

Currencyinfo erstellt Referenzkurse. Es ist kein Ausführungs-Feed für Börsen, kein Hochfrequenz-Marktdaten-Terminal und keine gehostete API mit garantiertem SLA. Selbst-Hosting gibt Ihnen die Kontrolle über Konfiguration, Verlauf, Datenschutz und Verfügbarkeit; es macht Sie jedoch auch dafür verantwortlich, Ihre Bereitstellung zu überwachen und die Bedingungen, Limits und Weitergaberegeln jedes Upstream-Anbieters zu respektieren.

Ein Upgrade von 4.1.2 sollte geplant werden. Ältere Standardkonfigurationen könnten Anbieter aktivieren, die nun Anmeldedaten erfordern. Daher sollten Betreiber diese Quellen deaktivieren, Schlüssel hinzufügen oder die neuen schlüssellosen Standardeinstellungen übernehmen, bevor sie 4.2.0 starten. Große bestehende Verlaufsdatenbanken sollten die drei neuen Indizes zudem außerhalb des laufenden Betriebs erstellen: Die Messungen für das Release dauerten etwa 17 Minuten auf NVMe-Speicher und 50 Minuten auf SATA. Die gespeicherten Dokumentformate bleiben kompatibel, was ein Rollback unkompliziert macht.

Ein verhaltensbezogener Hinweis: Verlaufsfilter verwenden nun die dokumentierte BASE/QUOTE-Paarreihenfolge. Clients, die dies zuvor durch Umkehren der Paare kompensiert haben, sollten diesen Workaround entfernen. Unbekannte Abfrageparameter werden nun ebenfalls mit HTTP 400 abgelehnt, anstatt sie stillschweigend zu ignorieren.

ADAMANT bleibt sichtbar, da es Currencyinfo in der Produktion einsetzt und die Entwicklung weiterhin steuert. Das Projekt ist jedoch nicht auf ADAMANT beschränkt. Es ist gleichermaßen relevant für eine unabhängige Wallet, einen Block-Explorer, ein Zahlungs-Backend, ein Buchhaltungssystem oder einen Infrastrukturbetreiber, der einen Kursdienst wünscht, der inspiziert, konfiguriert und lokal ausgeführt werden kann.
