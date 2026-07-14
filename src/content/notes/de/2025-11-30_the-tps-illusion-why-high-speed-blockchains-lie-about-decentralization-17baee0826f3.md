---
title: "Die TPS-Illusion: Warum Hochgeschwindigkeits-Blockchains über Dezentralisierung lügen"
slug: "the-tps-illusion-why-high-speed-blockchains-lie-about-decentralization-17baee0826f3"
description: "Die harte Wahrheit: TPS zerstört Dezentralisierung. Jede neue „zukunftssichere“ Chain verspricht 100.000 TPS, subsekundäre Finalität und Konsens der nächsten Generation. Doch Physik, Netzwerke und…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/the-tps-illusion-why-high-speed-blockchains-lie-about-decentralization-17baee0826f3"
publishedAt: "2025-11-30T14:10:17.731Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/17baee0826f3/001-1-v56lizsnpjrlqz2jzw0tpw-png.webp"
cardSpan: "full"
originalId: "medium:17baee0826f3"
locale: "de"
placeholder: false
---

### Die harte Wahrheit: TPS zerstört Dezentralisierung

Jede neue „zukunftssichere“ Chain verspricht 100.000 TPS, subsekundäre Finalität und Konsens der nächsten Generation. Doch Physik, Netzwerke und die Realität von Hardware zerstören dieses Marketing-Märchen sofort. Man kann nicht gleichzeitig extremen Durchsatz und extreme Dezentralisierung haben; je höher die TPS, desto weniger Menschen können einen Node betreiben.

Um 10.000 bis 20.000 Transaktionen pro Sekunde zu verarbeiten, muss ein Node bis zu 1,2 Millionen Transaktionen pro Minute validieren, Statusaktualisierungen im RAM halten, riesige Datenmengen auf NVMe schreiben, Blöcke innerhalb von unter 100 ms im Netzwerk synchronisieren und EVM oder benutzerdefinierte VM mit Rechenzentrums-Geschwindigkeit ausführen. Damit fallen sofort Heim-Validatoren, günstige VPS-Server, Hobby-Nodes und alle Personen ohne Enterprise-Hardware weg. Dezentralisierung bedeutet schlichtweg, dass eine durchschnittliche Person einen Full-Node betreiben kann. Wenn die Antwort nein lautet, ist die Chain zentralisiert.

### Realitätscheck: Hardware-Anforderungen über verschiedene Netzwerke hinweg

Bitcoin bleibt der Goldstandard für Dezentralisierung mit etwa 7 TPS. Jede Consumer-Hardware, einschließlich eines Raspberry Pi mit 4 bis 8 GB RAM und einer 400 bis 600 GB großen HDD oder SSD, kann einen Node betreiben. Das Mining erfordert eine einmalige Hardware-Investition von 500 US-Dollar sowie Stromkosten. Diese maximale Zugänglichkeit führt zu Zehntausenden von Nodes und hält das Netzwerk dezentral. Bitcoin ist absichtlich langsam; Langsamkeit bedeutet Zugänglichkeit und Dezentralisierung.

Ethereum bildet einen Mittelweg mit 15 bis 30 TPS. Nodes benötigen eine 2-TB-SSD, 16 bis 32 GB RAM, eine Mehrkern-CPU und stabile Bandbreite. Die Validierung von Blöcken erfordert 32 ETH (über 100.000 US-Dollar) sowie Hardwarekosten von etwa 1.500 US-Dollar. Obwohl technisch gesehen mit Tausenden von Validatoren halbwegs dezentralisiert, ist es wirtschaftlich zentralisiert und für Gelegenheitsnutzer zu anspruchsvoll. Ethereum skaliert über L2-Rollups, nicht über L1-Inflation – das ist die richtige Architektur.

Solana ist schnell, aber standardmäßig zentralisiert. Obwohl über 50.000 TPS angegeben werden, liegt der reale Durchsatz bei 300 bis 1.500. Nodes verlangen 256 GB RAM, eine High-End-CPU mit 16 bis 32 Kernen, 2 bis 4 TB NVMe und 1 bis 10 Gbps Bandbreite. Die Hardware kostet 5.000 bis 10.000 US-Dollar, zusätzlich zu Internetverbindungen auf Rechenzentrumsniveau. Nur Rechenzentren können Validatoren betreiben, was zu wirtschaftlicher und technischer Zentralisierung führt. Solana opfert bewusst Dezentralisierung für Durchsatz.

Monad verspricht 10.000 bis 20.000 TPS als „Solana-Performance-EVM“, benötigt aber Hardware auf Solana-Niveau: 64 bis 256 GB RAM, 8 bis 32 Kerne CPU und 2 bis 4 TB NVMe. Die Hardwarekosten übersteigen 5.000 US-Dollar, und die Stake-Anforderung wird aufgrund der VC-lastigen Zuteilung wahrscheinlich hoch sein. Validatoren werden ausschließlich Rechenzentren sein, was zu wirtschaftlicher und technischer Zentralisierung führt. Monad ist einfach Solana mit Solidity – eine valide Architektur, aber keine dezentrale.

Litecoin (LTC) ist stabil, konservativ und ausreichend dezentralisiert mit etwa 56 TPS. Nodes benötigen eine leichte SSD und 4 bis 8 GB RAM, was sie kompatibel mit Heimhardware macht. Die Mining-Kosten sind ähnlich wie bei Bitcoin. Es bleibt tatsächlich dezentralisiert, weil es klein und konservativ geblieben ist.

ADAMANT (ADM) ist klein, ausreichend schnell und tatsächlich dezentralisiert mit einer TPS-Zahl im zweistelligen Bereich. Ein voller Validierungs-Node läuft auf einem 5-US-Dollar-pro-Monat-VPS mit 2 vCPU, 2 GB RAM und einer 60 bis 80 GB großen SSD. Das Forging erfordert einen Stake von etwa 500.000 ADM (ca. 7.000 US-Dollar), wobei Forging-Pools einen nahezu kostenfreien Einstieg ermöglichen. Jeder kann einen Node betreiben, ohne an ein Rechenzentrum gebunden zu sein, was eine hohe Teilnahme-Dezentralisierung ermöglicht.

### Kapitalallokation und falsche Dezentralisierung

Die andere Hälfte der Dezentralisierung, über die niemand spricht, ist die Kapitalallokation und die Dominanz durch VCs. Hohe TPS in Kombination mit hoher VC-Zuteilung erzeugt zwei Schichten der Zentralisierung gleichzeitig, was zu zukünftigem Verkaufsdruck und Kontrolle führt.

![Die TPS-Illusion: Warum Hochgeschwindigkeits-Blockchains über Dezentralisierung lügen](/images/engineering-notes/medium/17baee0826f3/002-1-tuy7beyom37poplwpaklag-png.webp)

Viele moderne Chains vermarkten sich als „Web-scale Dezentralisierung“ oder „hohe TPS ohne Sicherheitseinbußen“. In Wirklichkeit ist ein System, bei dem nur 0,01 % der Nutzer einen Node betreiben können, kein dezentrales System – es ist ein CDN mit Token. Es ist besser, ein ehrlich zentrales System zu haben, als eine Chain, die vorgibt, dezentralisiert zu sein, es aber nicht ist. Ehrliche Zentralisierung bietet vorhersehbare Governance und zuverlässige Leistung, während versteckte Zentralisierung falsche Sicherheitserwartungen und katastrophale Ausfälle erzeugt.

![Die TPS-Illusion: Warum Hochgeschwindigkeits-Blockchains über Dezentralisierung lügen](/images/engineering-notes/medium/17baee0826f3/003-1-yjn8ft-7uxsr-npfs1flyg-png.webp)

### Fazit: TPS ist die neue Betrugsmetrik

Projekte werden weiterhin Tausende von TPS und schnellere Chains versprechen. Die Schlussfolgerung ist brutal einfach: Je mehr TPS eine Chain anstrebt, desto weniger Menschen können sie betreiben. Je weniger Menschen sie betreiben können, desto weniger dezentralisiert und weniger sicher ist sie. Echte Dezentralisierung ist nicht glamourös, schnell oder VC-freundlich. Sie ist kostengünstig, zugänglich, langweilig, widerstandsfähig und zensurresistent. Deshalb überleben Systeme wie Bitcoin, Litecoin und ADAMANT die Zyklen.
