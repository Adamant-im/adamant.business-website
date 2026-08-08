---
title: "Push-Benachrichtigungen ohne Client-Server-Kanal: Design, Kompromisse und ein bekanntes Race-Condition-Problem bei der Deregistrierung"
slug: "discussion-72-push-notifications-without-a-client-to-server-channel-design-trade-offs-and-a-known-deregi-10570025"
description: "Push-Benachrichtigungen sind der Bereich, in dem private Messenger am ehesten Kompromisse eingehen. Wir erklären, wie ADAMANT dies datenschutzfreundlich löst."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/72"
publishedAt: "2026-08-07T13:36:18Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10570025"
locale: "de"
placeholder: false
---

Push-Benachrichtigungen sind der Bereich, in dem private Messenger am ehesten Kompromisse eingehen. Irgendjemand muss darüber informiert werden, dass eine Nachricht eingegangen ist, und unter iOS ist dieser Jemand Apple. Dieser Beitrag beschreibt, wie ADAMANT dies technisch umsetzt, damit der Benachrichtigungsdienst so wenig wie möglich erfährt, welche Kosten dieses Design verursacht und welcher bekannte Fehlerzustand vom Projekt bewusst in Kauf genommen wird, anstatt ihn zu verschleiern.

## Die Struktur des Systems

Es sind vier Parteien beteiligt: das Gerät des Nutzers, ein ADAMANT-Node, der Apple Push Notification Service (APNs) und der ADAMANT Notification Service (ANS), der von cryptofoundry betrieben wird.

Die Registrierung erfolgt über die Blockchain, nicht über eine API. Das Gerät fragt zunächst bei APNs einen Push-Token an. Die App verschlüsselt dann `{token, provider, action}` mit dem öffentlichen Schlüssel des ANS und sendet dies als **Signal-Nachricht** (Chat-Typ 3, [AIP-6](https://aips.adamant.im/AIPS/aip-6)) an die ADM-Adresse des ANS-Kontos, über den vom Nutzer gewählten Node. Der ANS fragt Nodes nach Transaktionen ab, die an ihn gerichtet sind, entschlüsselt diese und speichert das Paar `ADM-Adresse → Push-Token`.

Die Zustellung erfolgt spiegelbildlich. Der ANS fragt nach Transfer- (Typ 0) und Chat-Transaktionen (Typ 8), prüft den Empfänger anhand seines Registers und weist APNs an, eine Push-Benachrichtigung zuzustellen.

## Was die einzelnen Parteien tatsächlich erfahren

Die Benachrichtigungs-Payload enthält keinen Nachrichteninhalt:

```json
{
  "aps": {
    "alert": { "loc-key": "NotificationsService.NewMessage.BodySingle" },
    "badge": 1,
    "mutable-content": 1,
    "sound": "notification.mp3"
  },
  "push-recipient": "U1234567890123456",
  "txn-id": "7175005690801347553"
}
```

Der Body ist ein Lokalisierungsschlüssel, keine Nachricht. Die Notification Service Extension der App nimmt die `txn-id`, ruft die Transaktion von einem Node ab und entschlüsselt sie lokal mit dem privaten Schlüssel des Nutzers, bevor die Benachrichtigung angezeigt wird. Apple sieht einen Geräte-Token, eine ADM-Adresse, eine Transaktions-ID und Zeitstempel – niemals den Inhalt. Das ist eine wichtige Offenlegung: Wenn Sie an Apple senden, erfährt Apple, dass diese Adresse etwas empfangen hat, und wann.

Die interessantere Eigenschaft liegt auf der Serverseite. Die App baut niemals eine Verbindung zum ANS auf. Der Token-Dienst des iOS-Clients führt genau zwei Arten von Netzwerkaufrufen aus, beide an ADM-Nodes, und nirgendwo in der App erscheint ein Hostname für einen Push-Dienst. Der ANS sieht daher nur das, was ohnehin öffentlich auf der Chain steht, und sieht – was entscheidend ist – niemals eine IP-Adresse des Geräts. Ein Nutzer, der über seinen eigenen Node oder über Tor routet, berührt die Infrastruktur von cryptofoundry überhaupt nicht.

Diese Eigenschaft ist der eigentliche Kern und sie ist fragil. Das offensichtliche Komfort-Feature – ein kleiner HTTPS-Endpunkt auf dem ANS, damit ein Client fragen könnte: „Hast du meinen Token noch?“ – würde dies zunichtemachen. Es würde dem ANS die IP-Adresse des Geräts offenbaren, jeden App-Start in ein gerätespezifisches Aktivitätssignal verwandeln, die Wahl des Nodes durch den Nutzer aushebeln und einen einzelnen blockierbaren Hostnamen schaffen, wo heute eine austauschbare Node-Liste existiert. Dieser Endpunkt wird nicht hinzugefügt.

## Der Registrierungs-Lebenszyklus und seine Tücken

Da der Kanal die Blockchain ist, sind `add` und `remove` Transaktionen. Jede Signal-Nachricht kostet eine normale Chat-Gebühr: `constants.fees.chat_message = 100000` bei `fixedPoint = 1e8`, d. h. **0,001 ADM**. Das ist wichtiger, als der Preis vermuten lässt – ein Nutzer mit einem Kontostand von Null kann keine Nachricht senden, was „regelmäßige Neuregistrierung“ als Strategie zur Robustheit ausschließt.

Der Client speichert eine lokale Kopie des Tokens, von dem er glaubt, dass er registriert ist, und registriert sich nur dann neu, wenn iOS einen *anderen* Token liefert. Er fragt niemals den Server, ob die Registrierung noch existiert, da er dies nicht tun kann, ohne die Privatsphäre-Eigenschaft aufzugeben.

Dies führt zu einem bekannten und reproduzierbaren Fehlerzustand, der keinen Datenverlust auf dem Server erfordert. Der Nutzer meldet sich ab, während er offline ist oder einen instabilen Node verwendet; der Client löscht seinen zwischengespeicherten Token und sendet `remove(T)`, aber das Senden schlägt fehl, sodass die Transaktion gespeichert und bei jedem weiteren App-Start erneut versucht wird. Der Nutzer meldet sich dann auf demselben Gerät wieder an. iOS liefert denselben Token `T`. Der lokale Cache ist leer, also sendet der Client `add(T)` und es ist erfolgreich – der Serverstatus ist nun korrekt. Aber das in der Warteschlange befindliche `remove(T)` ist letztlich auch erfolgreich und landet *nach* dem `add` auf der Chain, sodass der ANS die gerade erstellte Registrierung wieder löscht. Der Cache des Clients sagt `T`, iOS liefert weiterhin `T`, sodass die Prüfung „hat sich der Token geändert?“ nie ausgelöst wird. Das Gerät ist deregistriert und hat keine Möglichkeit, dies zu bemerken.

Benachrichtigungen hören stillschweigend auf. Die einzige Wiederherstellung ist ein manuelles Umschalten von **Benachrichtigungen → Aus → Push** in der App, was den lokalen Cache leert und eine neue Registrierung erzwingt.

## Warum dies nicht überstürzt wird

Es ist ein echter Bug, aber ein begrenzter: Er erfordert eine fehlgeschlagene Deregistrierung, gefolgt von einer Neuregistrierung desselben Tokens. Die beiden Abkürzungen, die ihn maskieren würden, sind beide schlimmer als der Bug. Eine HTTP-Prüfung tauscht einen seltenen, stillen Fehler gegen ein permanentes, universelles Metadaten-Leck ein. Eine periodische Neuregistrierung verbraucht Nutzerguthaben nach einem Zeitplan und funktioniert schlichtweg nicht für Nutzer mit 0 ADM.

Die korrekte Lösung ist eine clientseitige Reihenfolge, und sie bleibt vollständig innerhalb des Blockchain-vermittelten Designs: Die Warteschlange für Wiederholungsversuche muss Token-bewusst gemacht werden, sodass ein ausstehendes `remove(T)` verworfen wird, sobald ein späteres `add(T)` erfolgreich ist. Zudem sollte „Cache ist leer“ nicht mehr als Registrierungsstatus behandelt werden, und das `add` sollte mit der gleichen Sorgfalt persistiert werden wie das `remove`. Diese Arbeit gehört in die Clients.

Eine verwandte Konsequenz derselben Asymmetrie: Ein `unregister` kann nur für einen Token gesendet werden, an den sich die App noch erinnert, sodass eine Neuinstallation die vorherige Registrierung dauerhaft verwaist zurücklässt. Das Register enthält derzeit etwa 2.600 Zeilen für rund 1.700 verschiedene Adressen, wobei eine Adresse 251 davon belegt. Zeilen werden entfernt, wenn APNs einen Token als ungültig meldet, sodass sich das Register für jeden, der noch Push-Benachrichtigungen erhält, selbst bereinigt – aber eine Adresse, an die niemand schreibt, wird nie genutzt und nie bereinigt.

## Darauf aufbauen

Zwei Erkenntnisse für jeden, der ADAMANT-Benachrichtigungen integriert oder einen Client baut. Erstens: Fügen Sie keinen Callback vom Gerät zum Benachrichtigungsdienst hinzu – es ist das naheliegende Design, aber es ist genau das, was die Garantie bricht. Zweitens: Behandeln Sie Registrierung und Deregistrierung als geordnetes Paar. Sie sind asynchron, wiederholbar, on-chain und können in der falschen Reihenfolge ankommen. Sequenzieren Sie diese explizit, anstatt den Status aus einem lokalen Cache abzuleiten.
