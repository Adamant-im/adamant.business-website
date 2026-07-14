---
title: "Sichere 2FA auf einer Blockchain"
slug: "go-to-secure-2fa-on-a-blockchain-344500a5f010"
description: "SMS-basierte Zwei-Faktor-Authentifizierung ist anfällig für SIM-Swap-Betrug. Erfahren Sie, wie ADAMANT eine sichere, blockchainbasierte Alternative bietet."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/go-to-secure-2fa-on-a-blockchain-344500a5f010"
publishedAt: "2020-01-19T10:27:29.377Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/344500a5f010/001-1-ljkbgctg0w-cqgb0tn5s6g-png.webp"
cardSpan: "full"
originalId: "medium:344500a5f010"
locale: "de"
placeholder: false
---

SMS ist die am weitesten verbreitete Methode der Zwei-Faktor-Authentifizierung und wird von Banken, Krypto-Wallets und unzähligen Online-Diensten genutzt. Doch sie ist grundsätzlich unsicher. SIM-Swap-Betrug – bei dem ein Angreifer die Telefonnummer eines Opfers auf eine neue SIM-Karte umleitet – wird bereits seit den frühen Tagen der Mobilkommunikation ausgenutzt und hat sich seither weiter verbreitet. Die Polizei von London meldete 2019 einen Anstieg der SIM-Swap-Betrügereien um 63 %, und bekannte Fälle führten zum Diebstahl von Millionenbeträgen an Kryptowährungen. Die Ursache ist strukturell: Wer die SIM-Karte kontrolliert, kann Passwörter zurücksetzen und Konten übernehmen, und Mitarbeiter von Telekommunikationsanbietern können bestochen oder getäuscht werden, um Nummern neu zuzuweisen.

![Gehe zu sichere 2FA auf einer Blockchain](/images/engineering-notes/medium/344500a5f010/002-0-h92gnghvvfxe0cfp.webp)

Ein typischer SIM-Swap-Angriff verläuft in drei Phasen. Zuerst sammeln Betrüger persönliche Daten – oft aus sozialen Medien oder mithilfe eines Komplizen im Telekommunikationsunternehmen. Danach kontaktieren sie den Mobilfunkanbieter, behaupten, das Telefon sei verloren gegangen, und blockieren die SIM-Karte des Opfers. Schließlich erhalten sie eine Ersatz-SIM, manchmal unter Verwendung gefälschter Dokumente oder mit Unterstützung eines kollaborierenden Filialleiters. Sobald die neue SIM aktiv ist, verliert das Opfer den Zugriff auf alle SMS-basierten Authentifizierungen, während der Angreifer jeden Einmalkode erhält und schnell Passwörter ändert.

![Gehe zu sichere 2FA auf einer Blockchain](/images/engineering-notes/medium/344500a5f010/003-0-tptrqqosbbxrb3up.webp)

*Joel Ortiz auf einer Pressekonferenz der Universität. Zwei Jahre später wurde er wegen Cyberbetrugs festgenommen und zu 10 Jahren Haft verurteilt, nachdem er über 7,5 Millionen US-Dollar an Kryptowährungen durch SIM-Swapping gestohlen hatte.*

Die Wiederherstellung ist schwierig. Fiat-Überweisungen können manchmal mit Unterstützung der Bank rückgängig gemacht werden, aber Kryptowährungstransaktionen sind effektiv unwiderruflich und oft nicht nachverfolgbar. Keine Kryptobörse hat Opfern von SIM-Swap-Diebstählen bisher Entschädigung gezahlt, und rechtliche Schritte richten sich meist gegen den Telekommunikationsanbieter, nicht gegen die Rückgewinnung von Geldern. Michael Terpin beispielsweise verlor 224 Millionen US-Dollar und verklagt nun AT&T.

Abgesehen von SIM-Swapping weist die SMS-basierte 2FA weitere technische Schwächen auf. Nachrichten können durch Sicherheitslücken im Signaling System 7 (SS7) abgefangen werden, und das US-amerikanische National Institute of Standards and Technology hat SMS offiziell als zweiten Faktor in seinen Digital Identity Guidelines abgeschafft. Die Zustellung von SMS ist außerdem unzuverlässig – Codes kommen verspätet oder gar nicht an – und die Nutzung von 2FA kann bei Nutzern ein falsches Sicherheitsgefühl erzeugen, wodurch sie schwächere Passwörter wählen.

## Andere 2FA-Methoden und ihre Kompromisse

Alternative 2FA-Methoden umfassen Einmalkennwort-Listen (TAN), biometrische Authentifizierung, zeitbasierte Authentifizierungs-Apps wie Google Authenticator und Hardware-Sicherheitsschlüssel. Jede dieser Methoden hat praktische Nachteile. Physische Token können verloren gehen oder gestohlen werden. Authentifizierungs-Apps erschweren den Gerätewechsel – Google Authenticator bietet beispielsweise keinen Schlüssel-Export, wodurch die Wiederherstellung nach einem defekten Telefon schmerzhaft wird. Eine Studie aus dem Jahr 2013 ergab, dass Nutzer alle Formen von 2FA als unbequem empfinden, und SMS bleibt beliebt, einfach weil es die am wenigsten unbequeme Option ist, nicht weil sie die sicherste ist.

Eine ideale 2FA-Methode sollte sicher, zuverlässig, bequem und kostengünstig sein. Die Zustellung über eine Blockchain erfüllt diese Kriterien.

## 2FA über Blockchain mit ADAMANT

Aus Sicht des Nutzers funktioniert die Blockchain-2FA genauso wie die SMS-basierte Zustellung: Der Dienst generiert einen Einmalkode und sendet ihn über einen Messaging-Kanal; der Nutzer liest ihn und gibt ihn ein. Der Unterschied liegt im Transportweg. Anstelle von SMS wird der Code über den ADAMANT-Blockchain-Messenger übermittelt, der als Web-App, Tor-Client und native Apps für iOS, Android, Linux, Windows und macOS verfügbar ist.

![Gehe zu sichere 2FA auf einer Blockchain](/images/engineering-notes/medium/344500a5f010/004-0-l5oogpwqaljtmoab.webp)

Die Blockchain bietet mehrere Sicherheitseigenschaften, die SMS nicht bieten kann. Die Kontoeinrichtung erfordert weder Telefonnummer noch E-Mail – nur eine Passphrase. Alle Nachrichten sind Ende-zu-Ende-verschlüsselt mit curve25519xsalsa20poly1305. Jede Nachricht ist eine Blockchain-Transaktion, die mit Ed25519 EdDSA signiert ist, wodurch Man-in-the-Middle-Angriffe unmöglich werden. Nachrichten werden mit unveränderlichen Zeitstempeln in Blöcke eingetragen, und ihre Authentizität wird durch ein verteiltes Konsenssystem von Knoten überprüft, nicht durch eine zentrale Autorität. Konten können nicht blockiert und Nachrichten nicht gelöscht werden, was bedeutet, dass es kein Äquivalent dazu gibt, dass ein Mobilfunkanbieter eine SIM-Karte sperrt. Codes sind jederzeit von jedem Gerät aus zugänglich, und der Absender erhält eine Zustellbestätigung – wodurch die Notwendigkeit von „Erneut senden“-Schaltflächen entfällt.

![Gehe zu sichere 2FA auf einer Blockchain](/images/engineering-notes/medium/344500a5f010/005-0-prx5mhtulthutavr.webp)

Nutzer melden sich bei ADAMANT ausschließlich mit einer Passphrase an, sodass sie ein einzelnes Konto für alle Dienste nutzen oder pro Dienst separate Konten erstellen können. Eine Einschränkung besteht darin, dass ein Konto mindestens eine Transaktion benötigt, bevor sein öffentlicher Schlüssel in der Blockchain erscheint, was erforderlich ist, um verschlüsselte Nachrichten an das Konto zu senden. Die ADAMANT-Wallet enthält einen Faucet mit kostenlosen Tokens, um dieses Problem zu umgehen, obwohl eine robustere Lösung darin bestehen würde, Konten direkt über den öffentlichen Schlüssel statt über die abgeleitete numerische Adresse anzusprechen.

Die Kosten für das Senden eines 2FA-Codes über ADAMANT betragen etwa 0,001 ADM (derzeit ca. 0,00001 USD). Ein Dienst könnte auch seine eigene Blockchain auf Basis des ADAMANT-Codebase betreiben und die Transaktionsgebühr auf null festlegen.

## Implementierungsanleitung

Die folgenden Schritte beschreiben, wie man eine Blockchain-2FA in einen Dienst integriert, wobei ADAMANT als Zustellkanal verwendet wird. Eine Referenzimplementierung ist auf GitHub unter `https://github.com/Adamant-im/adamant-2fa` verfügbar.

### Schritt 1: Absenderkonto erstellen

Erstellen Sie ein ADAMANT-Konto, das die 2FA-Codes senden wird. Dies kann manuell in der Web-Wallet erfolgen oder programmatisch über die ADAMANT Node API, Console oder JS API. Die Kontoeinrichtung umfasst die Generierung einer BIP39-Passphrase, die Berechnung ihres SHA-256-Hashs, die Ableitung eines Ed25519-Privat- und -Öffentlichen-Schlüssel-Paares und anschließend die Ableitung der Blockchain-Adresse aus dem öffentlichen Schlüssel über einen weiteren SHA-256-Hash mit Invertierung.

![Gehe zu sichere 2FA auf einer Blockchain](/images/engineering-notes/medium/344500a5f010/006-0-djya3mapovmiw1rz.webp)

![Gehe zu sichere 2FA auf einer Blockchain](/images/engineering-notes/medium/344500a5f010/007-0-wjbii6tc0qtwvpom.webp)

### Schritt 2: Einmalkennwörter generieren

Generieren Sie für jeden Anmeldeversuch einen HOTP-Code. Das folgende Beispiel verwendet die `speakeasy`-Bibliothek:

```js
const hotp = speakeasy.hotp({
  counter,
  secret: account.seSecretAscii,
});
```

Validierung, wenn der Nutzer den Code eingibt:

```js
se2faVerified = speakeasy.hotp.verify({
  counter: this.seCounter,
  secret: this.seSecretAscii,
  token: hotp,
});
```

### Schritt 3: Code über die Blockchain senden

Verwenden Sie die ADAMANT Console CLI, um den Code als Blockchain-Nachricht zu senden:

```js
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const command = `adm send message ${adamantAddress} "2FA code: ${hotp}"`;
let { error, stdout, stderr } = await exec(command);
```

Alternativ verwenden Sie die `send`-Methode der ADAMANT JS API-Bibliothek für einen programmatischen Ansatz, ohne die CLI aufrufen zu müssen.

### Schritt 4: Benutzeroberfläche erstellen

Stellen Sie ein Eingabefeld bereit, in das der Nutzer den 2FA-Code eingibt. Die Demo-Anwendung verwendet Vue, aber jedes Frontend-Framework funktioniert.

![Gehe zu sichere 2FA auf einer Blockchain](/images/engineering-notes/medium/344500a5f010/008-0-uvflqyj6wavxcmsl.webp)

Der vollständige Quellcode der Demo ist auf GitHub unter `https://github.com/Adamant-im/adamant-2fa` verfügbar, inklusive Einrichtungsanleitungen und einem Link zur Live-Demo.
