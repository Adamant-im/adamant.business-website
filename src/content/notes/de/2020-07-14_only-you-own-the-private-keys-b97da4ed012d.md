---
title: "Nur Sie besitzen die privaten Schlüssel"
slug: "only-you-own-the-private-keys-b97da4ed012d"
description: "Der grundlegende Unterschied zwischen Kryptowährungen und Bankkonten ist das Eigentum: Sie besitzen kein Bankkonto, aber Kryptowährungen gehören vollständig Ihnen."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/only-you-own-the-private-keys-b97da4ed012d"
publishedAt: "2020-07-14T20:41:58.005Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/b97da4ed012d/001-1-vwww-ippgzj9jadeo82tzw-png.webp"
cardSpan: "full"
originalId: "medium:b97da4ed012d"
locale: "de"
placeholder: false
---

Der grundlegende Unterschied zwischen Kryptowährungen und Bankkonten ist das Eigentum: Sie besitzen kein Bankkonto, aber Kryptowährungen gehören vollständig Ihnen. Dies ist die Grundlage der Dezentralisierung. ADAMANT unterstützt bereits seit einem Jahr das Exportieren privater Schlüssel in seiner iOS-Anwendung, und diese Funktion ist nun auf allen Plattformen verfügbar.

### Was ist ein privater Schlüssel?

Eine Krypto-Wallet-Adresse ist öffentlich, wie eine Bankkontonummer. Eine ADAMANT-Adresse sieht beispielsweise so aus: `U4193701161843143990`, während eine Ethereum-Adresse so aussieht: `0x8edbf571D2973ce211ad561299419238dcC69f43`. Nur der Besitzer des privaten Schlüssels kann jedoch das Konto verwalten. Ein privater Schlüssel ist ein eindeutiger Code, der vollständigen Zugriff auf eine bestimmte Wallet ermöglicht.

Dieser Schlüssel kann verschiedene Formen annehmen. In ADAMANT und Lisk besteht er aus einem zwölfwörtigen Passwort. Bei Ethereum und Bitcoin handelt es sich um einen Zeichensatz.

![Nur Sie besitzen die privaten Schlüssel!](/images/engineering-notes/medium/b97da4ed012d/002-1-gia0n-uqgriaoa-ezm6-aa-png.webp)

Wenn Sie den privaten Schlüssel nicht besitzen, dann besitzen Sie auch die Wallet nicht. Zum Beispiel haben Sie keine Schlüssel für Wallets auf Kryptobörsen, und Sie können keine Münzen abheben, ohne die Erlaubnis der Börse. Das Überweisen von Kryptowährungen auf eine Börse bedeutet, einem Dritten zu vertrauen. Bewahren Sie alle privaten Schlüssel an einem sicheren Ort auf. Wenn jemand Ihren privaten Schlüssel erfährt, kann er über Ihr Guthaben verfügen. Niemand wird gestohlene Münzen zurückgeben — dies ist der Preis für Freiheit und Dezentralisierung.

### Wallets in ADAMANT

Um sich bei ADAMANT anzumelden, geben Sie ein zwölfwörtiges Passwort ein. Basierend auf diesem Passwort generieren verschiedene Algorithmen die privaten Schlüssel für alle anderen Wallets im Konto, einschließlich Ethereum und Bitcoin. ADAMANT überträgt private Schlüssel nicht über das Netzwerk, sodass der Wallet-Inhaber die vollständige Kontrolle über sein Konto behält. Bei Nutzung der integrierten Wallets müssen Sie nicht alle individuellen Schlüssel kennen, da sie alle vom Passwort abgeleitet sind. Wenn Sie jedoch auf diese Wallets in einer anderen Anwendung zugreifen möchten, müssen die privaten Schlüssel exportiert werden.

### Exportieren privater Schlüssel

Die ADAMANT-App ermöglicht es Nutzern, ihre privaten Schlüssel für die Nutzung außerhalb des Messenger-Systems zu exportieren. So können Sie beispielsweise über MyEtherWallet auf Ihre Ethereum- und ERC-20-Wallets zugreifen oder exportierte Schlüssel als Backup speichern. Die Exportfunktion ist in den Einstellungen verfügbar.

![Nur Sie besitzen die privaten Schlüssel!](/images/engineering-notes/medium/b97da4ed012d/003-0-gzswtnmhue8pesiw.webp)

Nur Sie sind für Ihr Konto und Ihre Wallets verantwortlich. Nur Sie kennen die privaten Schlüssel. Wenn ein privater Schlüssel kompromittiert wird, können Dritte die zugehörigen Mittel beschlagnahmen. Erstellen Sie in diesem Fall ein neues ADAMANT-Konto, sodass das System ein neues Passwort und damit neue Schlüssel generiert.

### Sicherheits-FAQ

**Kennen die ADAMANT-Entwickler mein Passwort und meine privaten Schlüssel?** Nein. Das ADAMANT-Konto, das Passwort und die privaten Schlüssel werden auf Ihrem Gerät erstellt. Wenn Sie die Anwendung auf einem PC verwenden, werden sie auf dem PC erstellt; auf einem Mobiltelefon entsprechend auf dem Telefon. Private Schlüssel verlassen niemals Ihr Gerät. Wenn Sie eine Zahlung tätigen oder eine Nachricht senden, wird nur eine signierte Transaktion an den Knoten gesendet. Dies gilt für alle in ADAMANT integrierten Kryptowährungen.

**Wie kann ich überprüfen, dass ADAMANT keine privaten Schlüssel über das Netzwerk sendet?** Der Quellcode ist vollständig offen und auf GitHub verfügbar.

**Sind mein Passwort und meine privaten Schlüssel unmöglich zu stehlen?** Nein. Wenn Ihr Gerät kompromittiert ist, könnte jemand die Schlüssel stehlen. Beispiele hierfür sind eine Browsererweiterung, die Daten an Dritte sendet, ein Keylogger, der alle Tastatureingaben aufzeichnet, ein Virus, der den Speicher scannt, oder die Nutzung einer Phishing-Messenger-App (z. B. `msg.adamant.io` statt `msg.adamant.im`).

**Ist es notwendig, die privaten Schlüssel zu exportieren?** Nein. Gespeicherte Schlüssel erhöhen das Risiko, dass jemand anderes sie sieht und Münzen stiehlt.

**Wenn jemand meine privaten Schlüssel für die integrierten Wallets stiehlt, erhält er auch Zugriff auf ADAMANT-Nachrichten?** Nein. Exportierte private Schlüssel gewähren nur Zugriff auf die integrierten Krypto-Wallets. Außerdem kann ein Angreifer, der einen Schlüssel für eine Kryptowährung (z. B. Doge) stiehlt, nicht auf Ethereum- oder Dash-Wallets zugreifen.

**Wenn jemand mein ADAMANT-Passwort stiehlt, erhält er Zugriff auf alle integrierten Krypto-Wallets?** Ja. Er erhält Zugriff sowohl auf Nachrichten als auch auf Wallets, weshalb es entscheidend ist, das Passwort geheim zu halten.

**Passwort oder private Schlüssel wurden gestohlen — was tun?** Erstellen Sie ein neues Konto. Befinden sich Münzen auf dem alten Konto, überweisen Sie diese auf das neue Konto.

**Wo kann ich exportierte private Schlüssel verwenden?** Exportierte ADAMANT-Schlüssel sind mit mehreren Anwendungen von Drittanbietern kompatibel. Für Bitcoin funktionieren Electrum, Blockchain.com und jede Wallet, die das WIF-Schlüsselformat unterstützt. Für Ethereum wird MyEtherWallet unterstützt. Für Doge: MultiDoge. Für Dash: Dash Electrum. Für Lisk wird ein API-Knoten benötigt; es gibt keine bekannten Anwendungen, die das direkte Importieren des privaten Schlüssels ermöglichen, da aus einem Schlüssel kein Passwort generiert werden kann.
