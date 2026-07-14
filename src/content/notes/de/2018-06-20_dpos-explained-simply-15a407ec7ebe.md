---
title: "DPoS erklärt — Einfach"
slug: "dpos-explained-simply-15a407ec7ebe"
description: "Blockchain ist eine verteilte Technologie. Im Gegensatz zu zentralen Systemen hat keine Einzelperson große Macht über das Netzwerk; nur die gesamte verbundene Gemeinschaft besitzt solchen Einfluss."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/dpos-explained-simply-15a407ec7ebe"
publishedAt: "2018-06-20T13:44:33.120Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/15a407ec7ebe/001-0-boc7uxzeiy2c0lhm.webp"
cardSpan: "full"
originalId: "medium:15a407ec7ebe"
locale: "de"
placeholder: false
---

Blockchain ist eine verteilte Technologie. Im Gegensatz zu klassischen zentralen Systemen hat keine einzelne Person umfassende Macht über das Netzwerk; nur die gesamte verbundene Gemeinschaft verfügt über einen solchen Einfluss. Damit das System wirklich verteilt ist, wurde die **Proof-of-Work (PoW)**-Methode durch einen Prozess namens Mining realisiert (z. B. Bitcoin, Litecoin). Wenn Bobs Computer schneller ist als der von Alice, hat er mehr Einfluss auf das Netzwerk.

Mining weist jedoch einen erheblichen Nachteil auf: hohe Stromkosten. Eine alternative Methode, **Proof-of-Stake (PoS)** (z. B. PeerCoin, NXT), wurde entwickelt, um dieses Problem zu lösen. Bei PoS hängt der Einfluss eines Benutzers von seinem aktiven Anteil am Netzwerk ab. Angenommen, Bob besitzt 100 Netzwerkcoins und Alice 90. Bob hat mehr Einfluss, aber wenn er 20 Coins verkauft, sinkt sein Bestand auf 80 und Alice erhält den größeren Einfluss.

Die nächste Verbesserung ist **Delegated Proof-of-Stake (dPoS)** und seine Varianten, die von Projekten wie BitShares, Lisk und ADAMANT Messenger verwendet werden. Diese Methode funktioniert ähnlich wie PoS, weist aber ein wichtiges Unterscheidungsmerkmal auf: Sie können Ihren Einfluss im Netzwerk an andere Benutzer übertragen (delegieren).

Angenommen, Bob besitzt 100 Coins und Alice 80. Bob stimmt (delegiert seinen Einfluss) für Bill und Helen, und Alice stimmt für Mark. Im Fall des dPoS von Lisk haben Bill und Helen mehr Einfluss (100) als Mark (80), was nach einigen Bewertungen unfair ist.

> ADAMANT verbesserte dieses dPoS-System, indem es das Stimmgewicht entsprechend der Anzahl der Stimmen verringert. Da Bob für zwei Delegierte stimmt, beträgt seine Stimme 100/2 = 50. Bill und Helen haben dann jeweils einen Einfluss von 50, während Mark 80 hat. Marks Einfluss wird damit größer als der von Bill und Helen.

Das verbesserte dPoS von ADAMANT berücksichtigt auch die **Knotenproduktivität**. Schnellere, erfolgreichere Knoten, die keine Blöcke verpassen, erhalten ein höheres Stimmgewicht. Dieser Ansatz wird **Fair dPoS** genannt.

Fair dPoS ermöglicht es bedeutenden Netzwerkteilnehmern sicherzustellen, dass alles wie vorgesehen funktioniert. Delegierte sind nicht nur für das ordnungsgemäße Funktionieren des Netzwerks verantwortlich, sondern erhalten auch eine Belohnung in Coins für ihre Rolle.

Um Delegierter im ADAMANT-Netzwerk zu werden, müssen Sie einen Knoten installieren, sich als Delegierter registrieren und die Stimmen von Benutzern erhalten, die Ihnen vertrauen. Sie müssen genügend Stimmen sammeln, sodass die Summe der Coins Ihrer Wähler Sie in die Liste der Top-101-Delegierten bringt.
