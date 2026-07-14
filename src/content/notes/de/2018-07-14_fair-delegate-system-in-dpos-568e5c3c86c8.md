---
title: "Faires Delegierten-System im dPoS"
slug: "fair-delegate-system-in-dpos-568e5c3c86c8"
description: "ADAMANT verbessert die Dezentralisierung durch ein faires Delegierten-System, das Einfluss und Markteintritt im dPoS-Netzwerk angleicht."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/fair-delegate-system-in-dpos-568e5c3c86c8"
publishedAt: "2018-07-14T10:22:15.269Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/568e5c3c86c8/001-0-b1b6dbg3hvdjf9i4.webp"
cardSpan: "full"
originalId: "medium:568e5c3c86c8"
locale: "de"
placeholder: false
---

Dezentralisierung ist ein entscheidendes Merkmal von ADAMANT, und das Team hat mögliche Verbesserungen für das Ökosystem untersucht, indem es Erkenntnisse aus anderen dPoS-Netzwerken wie Lisk analysiert hat.

Auf Lisk benötigt man etwa 29 Millionen LSK an Stimmen, um ein aktiver Delegierter zu werden, und über 1.600 Delegierte wurden dauerhaft in den Standby-Modus versetzt. Der am niedrigsten platzierte aktive Delegierte verfügt über ein Stimmgewicht von fast 28,7 Millionen LSK — eine extrem hohe Markteintrittsschwelle.

![Faires Delegierten-System im dPoS](/images/engineering-notes/medium/568e5c3c86c8/002-0-gyx2cakh6c0w-8a.webp)

Das Kernproblem besteht darin, dass in einem herkömmlichen dPoS-System eine einzelne „dicke“ Wallet gleichzeitig gleich starke Stimmen an eine große Liste von Delegierten verteilen kann. Eine Wallet, die für 101 Delegierte stimmt, kann effektiv die Kontrolle über das gesamte Netzwerk erlangen.

ADAMANT begegnet diesem Problem, indem das **Stimmgewicht jeder Wallet durch die Anzahl der Delegierten geteilt wird, für die sie stimmt**:

> *Stimmgewicht = ADM / Stimmen*

Beispielsweise hält Bob 100 ADM und stimmt für zwei Delegierte, während Alice 80 ADM hält und für einen Delegierten stimmt. Bobs Stimme wird auf 50 pro Delegierten aufgeteilt. Alices einziger Delegierter erhält volle 80. Nach dem Lisk-Modell würden Bobs Delegierte jeweils 100 erhalten — mehr als Alices — was unfair ist. Im ADAMANT-Modell hat Alices Delegierter größeren Einfluss, was einer gerechteren Verteilung entspricht.

Ein zweiter Parameter, **Produktivität**, verfeinert das Stimmgewicht weiter. Das Netzwerk erfordert gewissenhafte Delegierte, die keine Blöcke verpassen, um sicherzustellen, dass Nachrichten über den ADAMANT Messenger ohne Verzögerung zugestellt werden. Die Produktivität reicht von 0,05 % bis 100 % und reduziert das Stimmgewicht von Delegierten, die keine zuverlässigen Knoten betreiben. Wenn ein Delegierter mit dem Forgen beginnt, wird die Produktivität für die ersten 200 Blöcke (produziert plus verpasst) nicht berücksichtigt.

Die endgültige Formel lautet:

> *Stimmgewicht = ADM / Stimmen × Produktivität*

Dieser Ansatz wird als **Faires dPoS** bezeichnet. Er reduziert den Einfluss dicker Wallets auf ein angemessenes Niveau und senkt die Markteintrittsschwelle für das Forgen. Der Produktivitätsfaktor motiviert Delegierte, Knoten auf leistungsstärkerer Hardware zu betreiben, anstatt minimale Setups zu nutzen. Da sich sowohl die Token-Verteilung als auch die Delegierten-Produktivität im Laufe der Zeit ändern, wird die Liste der 101 forgenden Delegierten regelmäßig neu aufgebaut, wodurch Standby-Delegierten eine realistische Chance eingeräumt wird, wieder zum Forgen zurückzukehren.

Benutzer mit kleinen ADM-Salden können ebenfalls teilnehmen, indem sie Pools bilden. Diese Änderungen wurden ab Release 0.4.0, ab Block 4359464, aktiviert.
