---
title: "ADAMANT Bounty Bot: Interaktive Kampagnen mit automatisierten Krypto-Zahlungen"
slug: "adamant-s-interactive-bounty-bot-for-cryptocurrency-projects-51fec10f93b9"
description: "Der ADAMANT Bounty Bot ist ein Open-Source-Tool für Kryptoprojekte, um interaktive Belohnungskampagnen und Airdrops über ADAMANT Messenger durchzuführen."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamants-interactive-bounty-bot-for-cryptocurrency-projects-51fec10f93b9"
publishedAt: "2020-09-11T08:11:44.041Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/51fec10f93b9/001-1-gjb4fgnplpza3buymtpy6w-png.webp"
cardSpan: "full"
originalId: "medium:51fec10f93b9"
locale: "de"
placeholder: false
---

Der ADAMANT Bounty Bot ist ein Open-Source-Tool, das für Kryptowährungsprojekte entwickelt wurde, um Belohnungskampagnen und Airdrops interaktiv über Chat in ADAMANT Messenger durchzuführen. Er automatisiert die Überprüfung von Aufgaben und Zahlungen und eliminiert so die Notwendigkeit eines dedizierten Bounty-Managers sowie Verzögerungen bei der Auszahlung an Teilnehmer.

### Warum ein dedizierter Bounty-Bot

Traditionelle Bounty-Kampagnen basieren auf Managern, die die Bedingungen auf Foren wie Bitcointalk veröffentlichen und die Einhaltung der Teilnehmer manuell am Ende einer Kampagne überprüfen. Dieser Ansatz ist für Nutzer unpraktisch und für Projektbetreiber kostspielig. Der ADAMANT Bounty Bot vereinfacht den Prozess: Teilnehmer interagieren direkt im Chat mit dem Bot, der Bot überprüft die erledigten Aufgaben automatisch und zahlt Belohnungen sofort in ADM, ETH oder ERC-20-Token aus.

Derzeit unterstützt der Bot Twitter-Kampagnen (Folgen von Accounts, Retweeten mit Kommentar, Erwähnung von Freunden und Verwendung von Hashtags) sowie ADAMANT-Referral-Kampagnen, bei denen Nutzer andere zur Teilnahme einladen. Unterstützung für zusätzliche soziale Netzwerke kann von Mitwirkenden hinzugefügt werden, da der Bot quelloffen ist.

### Funktionsweise

Der Bot läuft kontinuierlich auf einem Server. Nach der Installation konfigurieren Sie die Kampagneneinstellungen, z. B. welche Twitter-Accounts die Teilnehmer folgen müssen, welchen Tweet sie retweeten sollen und was der Retweet-Kommentar enthalten muss. Der Bot verfolgt Benachrichtigungen, prüft die Aufgabenerfüllung, zahlt Belohnungen aus und sammelt Statistiken. Er erkennt auch doppelte Social-Media-Accounts, um zu verhindern, dass ein einzelner Nutzer eine Belohnung zweimal erhält.

### Anforderungen

Der Betrieb des Bots erfordert grundlegende Linux- und Node.js-Kenntnisse. Die Serveranforderungen sind gering – jeder VPS mit Ubuntu genügt (z. B. Digital Ocean, Ramnode, Scaleway, Hetzner). Die Installation eines vollständigen ADAMANT-Knotens ist optional, aber empfehlenswert auf Maschinen mit mehr als 40 GB Festplatte und 1 GB RAM, um die Dezentralisierung zu unterstützen. Außerdem benötigen Sie eine ADAMANT-Wallet für den Bot, gefüllte Kryptowährungs-Wallets für die Auszahlungen (beachten Sie, dass ERC-20-Überweisungsgebühren in ETH bezahlt werden, daher muss auch die ETH-Wallet des Bots aufgeladen sein), Twitter-API-Schlüssel bei Twitter-Kampagnen sowie MongoDB, das auf dem Server installiert sein muss.

### Befehle

Der Bot reagiert auf mehrere Benutzer- und Admin-Befehle. Nutzer können `/help` für Informationen zur Kampagne, `/rates` für Token-Marktpreise und `/calc` zur Umrechnung zwischen Kryptowerten senden. Administratoren können `/balances` verwenden, um die Wallet-Salden des Bots zu prüfen, und `/test`, um Diagnosen wie `/test twitterapi` durchzuführen.

### Installation

Der Bot sollte unter dem Benutzer `adamant` installiert werden. Falls Sie zuvor einen ADAMANT-Knoten installiert haben, existiert dieser Benutzer bereits. Klonen Sie das Repository und installieren Sie die Abhängigkeiten:

```bash
su - adamant
git clone https://github.com/Adamant-im/adamant-bountybot.git
cd ./adamant-bountybot
npm i
```

### Konfiguration

Öffnen Sie `config.json` in einem Texteditor. Die wichtigsten zu setzenden Parameter sind unten beschrieben.

**`passPhrase`** — die Seed-Phrase für das ADM-Konto des Bots. Erstellen Sie immer ein neues Konto für den Bot, statt ein bestehendes wiederzuverwenden.

```json
"passPhrase": "scatter tomato doctor also stay tell success pause gift clip hungry october",
```

**`twitter_follow`** — Twitter-Accounts, die Teilnehmer folgen müssen, um Belohnungen zu erhalten. Auf leeres Array setzen, um zu deaktivieren.

```json
"twitter_follow": [
  "@adamant_im",
  "@BitZ_Group"
],
```

**`twitter_retweet_w_comment`** — definiert den Tweet, der mit einem Kommentar retweetet werden muss. `min_mentions` legt fest, wie viele Freunde erwähnt werden müssen; `hashtags` gibt erforderliche Hashtags an. Auf leeres Array setzen, um zu deaktivieren.

```json
"twitter_retweet_w_comment": [
  {
    "tweet": "https://twitter.com/adamant_im/status/1272945640574722048",
    "min_mentions": 3,
    "hashtags": [
      "#privacy",
      "#decentralization"
    ]
  }
],
```

**`adamant_campaign`** — legt fest, wie viele neue Nutzer ein Teilnehmer zu ADAMANT einladen muss (`min_contacts`). Ein weitergeleiteter Nutzer zählt, wenn seine erste Nachricht nicht älter als drei Tage ist und an einen Kampagnenteilnehmer gesendet wurde. Auf `0` setzen, um zu deaktivieren.

```json
"adamant_campaign": {
  "min_contacts": 3
},
```

**`rewards`** — gibt die Auszahlungsbeträge und -währungen für jeden Nutzer an, der alle Aufgaben erfüllt hat.

```json
"rewards": [
  {
    "currency": "ADM",
    "amount": 100
  },
  {
    "currency": "ETH",
    "amount": 0.01
  }
],
```

**`twitter_api`** — Ihre Twitter-API-Anmeldedaten vom Twitter-Entwicklerportal. Leer lassen, wenn keine Twitter-Kampagne durchgeführt wird.

```json
"twitter_api": {
  "consumer_key": "jsoQSRzVYWTUE88t",
  "consumer_secret": "6l7w0vqHCEIkmjbdR8ubTxzhJZRk1JUlSUonu5",
  "access_token_key": "86823450088-il17SnfGmxQCYW9bAGAnFB2aW4",
  "access_token_secret": "W0k1armrFUL8ATzJwAJ2x9yuxojKIEtRaphT"
},
```

**`admin_accounts`** — Ihre persönliche ADM-Adresse, damit der Bot Admin-Befehle von Ihnen akzeptiert. Diese muss sich von der eigenen Adresse des Bots unterscheiden.

```json
"admin_accounts": [
  "U14818108337685946763"
],
```

**`welcome_string`** und **`help_message`** — die Begrüßungs- und Hilfstexte, die den Nutzern angezeigt werden. Beide unterstützen Markdown und können auf Konfigurationsvariablen verweisen (z. B. `${config.rewards_list}`, `${config.twitter_follow_list}`).

**`adamant_notify`** und **`slack`** — optionale, aber empfohlene Benachrichtigungskanäle. Bei Verwendung von ADAMANT-Benachrichtigungen geben Sie eine Adresse an, die sich von `admin_accounts` unterscheidet.

```json
"adamant_notify": "U48110833768594688888",
"slack": "https://hooks.slack.com/services/T7YUJW/LKHHD/rDKFJZ94FOhbkn49eOfq",
```

### Bot starten

Verwenden Sie den Prozessmanager pm2, um den Bot zu starten. Falls Sie einen ADAMANT-Knoten installiert haben, ist pm2 bereits verfügbar; andernfalls installieren Sie es mit `sudo npm install -g pm2`.

```bash
pm2 start --name bountybot app.js
```

Überprüfen Sie die Logs, falls der Bot nicht auf Nachrichten reagiert:

```bash
pm2 logs bountybot
```

Um sicherzustellen, dass der Bot nach einem Neustart des Servers neu gestartet wird, fügen Sie einen Cron-Eintrag hinzu:

```bash
crontab -e
```

Fügen Sie die folgende Zeile hinzu und speichern Sie:

```
@reboot cd /home/adamant/adamant-bountybot && pm2 start --name bountybot app.js
```

![Interaktiver ADAMANT Bounty-Bot für Kryptowährungsprojekte](/images/engineering-notes/medium/51fec10f93b9/002-0-turkg-jxhihlqu39.webp)
