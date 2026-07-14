---
title: "ADAMANT Pool v2.0.0 veröffentlicht"
slug: "new-version-of-the-forging-pool-software-adamant-pool-v2-0-0-aca713a5a3d6"
description: "ADAMANT Pool v2.0.0 umfasst eine komplette Neuentwicklung mit Fokus auf Zuverlässigkeit und Leistung. Der Pool nutzt nun die ADAMANT JS API v1.0.0, um sicherzustellen, dass Wähler ihre Belohnungen korrekt und pünktlich erhalten."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/new-version-of-the-forging-pool-software-adamant-pool-v2-0-0-aca713a5a3d6"
publishedAt: "2021-06-19T14:05:48.039Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/aca713a5a3d6/001-0-nfjyvf39o49caqs7.webp"
cardSpan: "full"
originalId: "medium:aca713a5a3d6"
locale: "de"
placeholder: false
---

ADAMANT Pool v2.0.0 umfasst eine komplette Neuentwicklung mit Fokus auf Zuverlässigkeit und Leistung. Der Pool nutzt nun die ADAMANT JS API v1.0.0, um sicherzustellen, dass Wähler ihre Belohnungen korrekt und pünktlich erhalten. Die Systemanforderungen wurden deutlich reduziert; der Pool kann jetzt auf einer virtuellen Maschine mit 1 vCPU und 512 MB RAM betrieben werden. Diese Effizienz wurde erreicht, indem unnötige Abhängigkeiten entfernt, verbleibende aktualisiert und die Bibliothek `request` durch `axios` ersetzt wurde.

Mehrere Konfigurationsänderungen wurden vorgenommen. Der Standardport ist nun 36667 statt 36668. Die Konfigurationsdatei enthält nun eine neue Option `log_level` sowie einen `donatewallet`-Parameter, um einen Prozentsatz der Belohnungen mit der ADAMANT Foundation zu teilen. Auszahlungsperioden können nun über eine Option für den Wochentag in `payoutperiod` geplant werden. Außerdem wird die Transaktionsgebühr für die Stimmabgabe nun von den Wählern selbst getragen, was zu 0,5 ADM weniger pro Belohnung führt. Betreiber sollten den Parameter `minpayout` anpassen, um sicherzustellen, dass die Auszahlungen im Verhältnis zur Gebühr angemessen bleiben. Die Produktivität des Delegierten wird nun während der Verteilung der Belohnungen berücksichtigt.

Weitere Aktualisierungen umfassen eine Umstrukturierung des Codes, die Entfernung des schreibgeschützten Modus und die Hinzufügung von Markdown-Funktionen für den Notificator. Das Design des Info-Panel-Dashboards des Pools wurde ebenfalls aktualisiert.

![Neue Version der Schürfpool-Software ADAMANT Pool v2.0.0](/images/engineering-notes/medium/aca713a5a3d6/002-0-vrmyfc6ou3ue0xnb.webp)

Beim Aktualisieren eines bestehenden Pools wird empfohlen, die alte Installation zu löschen und eine Neuinstallation durchzuführen. Die Datei `/db/transactions`, die den Transaktionsverlauf enthält, sollte jedoch erhalten bleiben.
