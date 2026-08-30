---
title: "Behalten Sie Ihre Token: Ein selbst gehostetes Market-Making-Desk für ADAMANT"
slug: "keep-your-tokens-run-the-market-a-self-hosted-market-making-desk-is-coming-5116a74186a4"
description: "Wenn Sie einen Token herausgeben, ist der Pitch bekannt: Ein Market Maker kümmert sich um das Orderbuch, enge Spreads und Volumen – Sie senden nur Token und Liquidität."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/keep-your-tokens-run-the-market-a-self-hosted-market-making-desk-is-coming-5116a74186a4"
publishedAt: "2026-08-30T07:03:02.790Z"
author: "massivedev0 (Theo Bitner)"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:5116a74186a4"
coverImage: "/images/engineering-notes/medium/5116a74186a4/001-80778e7498.webp"
locale: "de"
placeholder: false
---

Wenn Sie einen Token herausgeben, ist der Pitch bekannt: Ein Market Maker wird sich „um das Orderbuch kümmern“, für enge Spreads sorgen und Volumen generieren – Sie müssen nur einen Beutel Token und einen Beutel mit Quote-Assets senden und der Vereinbarung vertrauen. Genau das ist der Punkt, der Sie stutzig machen sollte. Diese Token sind Ihr Float, Ihr Treasury, Ihre Listing-Story. Sobald sie Ihr Wallet verlassen, betreiben Sie kein Market Making mehr. Sie mieten eine Blackbox. Sie können nicht sehen, welche Orders Ihre sind, den Bot um 3 Uhr morgens stoppen oder einem Partner beweisen, dass die Bestände noch Ihnen gehören.

Selbst gehostetes, selbst kontrolliertes Market Making ist das Gegenmodell: Sie behalten die Token, die API-Schlüssel und den Prozess. Die Software läuft direkt neben Ihrem Exchange-Konto. Nichts wird von einem Desk in einer anderen Jurisdiktion verwahrt.

Dieses Modell existiert bereits in der [ADAMANT Market-Making Software](https://marketmaking.app), einer selbst gehosteten Liquiditätslösung für CEX-Listings. Sie platziert und verwaltet den Maker-Flow auf Ihrem Konto – Spreads, Tiefe, Ladders, Volumen, Preisbänder. Sie installieren sie, verknüpfen sie mit Ihren API-Schlüsseln, und die Coins verlassen niemals das Exchange-Wallet, das Ihnen gehört. Die Kontrolle ist heute real, aber es ist immer noch ein Power-User-Workflow: ADAMANT Messenger, Telegram, CLI. Ein Befehl, eine Textantwort. In Ordnung für ein einzelnes Paar, mit dem man täglich arbeitet; umständlich für eine ganze Flotte und schwierig, wenn man das Orderbuch, die Kerzencharts, den Bestand und die letzten zwölf Stunden auf einen Blick sehen muss.

Genau diese Lücke schließt cryptofoundry.

## Ein Web-Desk für Software, die niemals Ihre Token nimmt

Das Projekt entwickelt ein privates, selbst gehostetes WebUI: eine Adresse im Browser, viele Bots in Tabs. Sie melden sich als Operator an, wählen ein Paar aus und erhalten einen Marktbildschirm, Parameterformulare, Befehle und Logs – ohne dass der Browser jemals mit der Exchange kommuniziert. Die Architektur ist absichtlich simpel gehalten. Das WebUI speichert keine Exchange-Geheimnisse und platziert keine Orders in der Cloud. Jeder Chart, jeder Kontostand und jede Stornierung läuft über die API Ihres Bots. Der Bot bleibt der einzige Prozess, der die Exchange kennt.

Die Anmeldung erfolgt über Ihre Konsole – nicht über die Exchange und nicht über einen Market Maker eines Drittanbieters. Jeder Bot verifiziert lediglich ein signiertes Token. Dies ist Szenario A: Sie betreiben die Konsole (typischerweise hinter HTTPS auf einer Maschine, die Sie kontrollieren), fügen jeden Bot per URL hinzu und teilen ein HMAC-Secret mit der Flotte. Ein WebUI, viele Instanzen – Binance, Bybit, Gate, BiFinance, was auch immer Sie gelistet haben. Ein gehostetes Abonnement (Szenario B: Outbound-Relay, Lizenz in der Bot-Konfiguration, kein Inbound-Bot-Port) ist ein zukünftiges Produkt. Die Regel bleibt unverändert: Token verbleiben auf Ihrem Exchange-Konto.

## Der Markt, kein Chat-Log

Öffnen Sie einen Bot-Tab und Sie befinden sich an einem Market-Desk: Kerzencharts mit Ihren eingezeichneten Orders, ein Live-Orderbuch mit Spread, 24h-Spanne und Volumen, Basis- und Quote-Bestände in Coin und USD sowie manuelle Limits, falls Sie eingreifen müssen. Klicken Sie auf das Orderbuch, und Seite, Preis sowie Größe werden übernommen. „Cancel“ sendet die Order-ID, den Markt und die Seite; die Zeile verschwindet aus der Tabelle. Sie betrachten Ihr Konto durch Ihren Bot.

![Marktansicht](/images/engineering-notes/medium/5116a74186a4/002-a2f1096b3e.webp)

*Marktansicht. Kerzen, Orderbuch, USD-Bestand und Orderplatzierung – ein Tab in einer Multi-Bot-Flotte. Dies sind weiterhin Ihre API-Schlüssel und Ihr Wallet auf der Exchange.*

## Parameter, die Sie um 2 Uhr morgens verstehen

Market Making ist nicht nur ein Schalter. Es sind Liquiditätsbänder, Preisüberwachung, Ladders, Volumen und Benachrichtigungen. Das WebUI verwandelt dies in gruppierte Formulare. Wenn ein Modul in diesem Bot-Build nicht enthalten ist, bleibt die Gruppe gesperrt – Sie müssen nicht raten, welcher `/enable`-Code welcher Karte zugeordnet ist.

Die Live-Situation ist ein Streifen für Operatoren, die nicht ständig ein Terminal überwachen wollen: zwölf Stunden Bestand (Basis + Quote in USD) und die Mischung der offenen Orders. Die Balken füllen sich im Browser, während Sie verbunden sind. Eine gelbe Stunde bedeutet, dass die Qualität beeinträchtigt war; grau bedeutet, dass das Market Making ausgeschaltet war. Sie sehen die Nacht, nicht nur einen einzelnen Schnappschuss.

![Parameter](/images/engineering-notes/medium/5116a74186a4/003-5c8d7d7f51.webp)

*Parameter. Master-Market-Making-Schalter, 12-Stunden-Live-Situation, Liquidität, Preisüberwachung, Ladders. Die Gruppen richten sich danach, was dieser Bot tatsächlich installiert hat.*

Ein Hinweis zur Mechanik, da es wichtig ist, wenn etwas schiefgeht: Der Bot protokolliert, wann das MM zuletzt gestartet wurde und wann der Prozess zuletzt mit bereits aktivem MM neu gestartet wurde. Gleiche Zeitstempel bedeuten einen sauberen Start. Ein älteres „Init“ als der Neustart bedeutet, dass die Box neu gebootet hat. Die öffentliche Prozess-Live-Prüfung (`/health`) bleibt ein winziges `{ status, transport }`, damit ein erreichbarer Port nicht die Qualität des Orderbuchs preisgibt. Die Qualität ist ein separater, authentifizierter `/status`-Aufruf.

## Die gleichen Befehle, auf einem Desk

Fill, Close, Make-Price, TWAP, Transfer, Withdraw und Queries – dieselben Handler wie bei Messenger und CLI, mit Bestätigungen bei destruktiven Aufrufen und einer Live-Konsole auf der rechten Seite.

![Befehle](/images/engineering-notes/medium/5116a74186a4/004-18e42a4cf7.webp)

*Befehle. Das Power-User-Set, angeordnet für einen Desk: das Orderbuch füllen, eine Position schließen, einen Preis stellen, dem Bot in der Konsole bei der Arbeit zusehen.*

Da „Wer hat MM ausgeschaltet?“ eine berechtigte Frage ist, sind Events ein Audit-Trail im WebUI – Operator vs. Bot, Parameter vs. Befehle, inklusive Suche und Export.

![Ereignisse](/images/engineering-notes/medium/5116a74186a4/005-0c6f4d12d6.webp)

*Ereignisse. Was hat sich geändert, wann und durch wen: Sie, ein Kollege oder der Bot selbst.*

## Warum dies nicht einfach ein weiteres SaaS-MM ist

Die meisten „Wir machen Ihren Markt“-Angebote optimieren für ihre eigenen Abläufe: Sie benötigen Ihre Token auf ihren Konten, damit ihre Bots handeln können. Dieses Modell optimiert für Ihre Abläufe. Die Verwahrung bleibt auf der Exchange unter Schlüsseln, die Sie ausgestellt haben. Der Bot läuft, wo Sie es wünschen – auf Ihrem VPS, Ihrem Rack. Das WebUI ist ein Fenster zu diesem Prozess, kein neuer Verwahrer. Eine Konsole deckt jedes Paar ab, das Ihnen wirklich wichtig ist.

Wenn ein Listing einen zweiten API-Schlüssel für Self-Trade-Regeln benötigt, ist das weiterhin Ihr zweites Konto. Wenn Sie die Software stoppen, können Sie die Orders selbst stornieren. Wenn Sie die Zusammenarbeit mit dem Anbieter beenden, warten Sie nicht auf die Rückgabe von Token, die bereits weg sind.

## Status

Der private, selbst gehostete Pfad (Szenario A) befindet sich in der aktiven Integration: Markt, Parameter, Live-Situation, Befehle, Ereignisse und authentifizierter MM-Health-Status. Die Flotten-Dashboards und die Konfiguration werden derzeit verfeinert, damit die ersten Operatoren sie als täglichen Desk nutzen können, nicht als Demo.

ADAMANT Market-Making Software ist selbst gehostet. Sie behalten das Exchange-Konto, die API-Schlüssel, die Gelder und die Ausführung. Das hier beschriebene WebUI ist die Operator-Konsole für diese Software – kein Handelsplatz, der Bestände entgegennimmt.
