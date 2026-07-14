---
title: "So werden Sie ein ADAMANT-Delegate"
slug: "how-to-become-an-adamant-delegate-745f01d032f"
description: "ADAMANT erreicht Blockchain-Konsens mittels eines verbesserten Delegated Proof of Stake (dPoS)-Algorithmus namens Fair dPoS. Führen Sie einen Node aus, um Delegate zu werden."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/how-to-become-an-adamant-delegate-745f01d032f"
publishedAt: "2018-06-30T10:11:25.366Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/745f01d032f/001-1-rprsczpnpydvk1y6ko-hzg-png.webp"
cardSpan: "full"
originalId: "medium:745f01d032f"
locale: "de"
placeholder: false
---

ADAMANT erreicht Blockchain-Konsens mithilfe eines verbesserten Delegated Proof of Stake (dPoS)-Algorithmus, bekannt als Fair dPoS. Um ein Delegate zu werden und Blöcke zu generieren, müssen Sie einen Node betreiben, eine Registrierungsgebühr von 3.000 ADM entrichten und genügend Stimmen sammeln, um unter den Top 101 Delegates zu rangieren.

Beginnen Sie damit, einen ADAMANT-Node zu installieren und auszuführen. Sobald der Node läuft, wechseln Sie zum Systembenutzer `adamant` und installieren das Tool `adamant-console` aus den npm-Repositories.

```bash
su - adamant
npm i -g adamant-console
```

![So werden Sie ein ADAMANT-Delegate](/images/engineering-notes/medium/745f01d032f/002-0-55iagwoakrbgkahj.webp)

Erstellen Sie anschließend ein Konfigurationsverzeichnis und kopieren Sie die Standardkonfigurationsdatei hinein.

```bash
mkdir ~/.adm && cp /home/adamant/.nvm/versions/node/$(node -v)/lib/node_modules/adamant-console/config.default.json ~/.adm/config.json
```

![So werden Sie ein ADAMANT-Delegate](/images/engineering-notes/medium/745f01d032f/003-1-5n-ejpboh-pf5plf-85-ug-png.webp)

Bearbeiten Sie die kopierte Datei `~/.adm/config.json` mit einem Texteditor. Ändern Sie den `network`-Parameter von `testnet` auf `mainnet` und fügen Sie die Passphrase Ihres Delegates hinzu. Bewahren Sie die Passphrase geheim und stellen Sie sicher, dass Ihr Server sicher bleibt. Alternativ können Sie die Passphrase aus der Konfiguration weglassen und stattdessen zur Registrierung per Befehlszeilen-Flag übergeben.

![So werden Sie ein ADAMANT-Delegate](/images/engineering-notes/medium/745f01d032f/004-1-zwh5ys2uf2nnz04woxe3zw-png.webp)

Starten Sie die Konsole mit `adm`. Registrieren Sie Ihren Delegate, indem Sie den folgenden Befehl ausführen und `<new delegate name>` durch Ihren gewünschten Namen ersetzen. Die mit Ihrer Passphrase verknüpfte Wallet muss mindestens 3.000 ADM enthalten, um die Registrierungsgebühr zu decken, die an andere forghende Delegates verteilt wird.

```bash
delegate new <new delegate name>
```

![So werden Sie ein ADAMANT-Delegate](/images/engineering-notes/medium/745f01d032f/005-0-khyxu9qp9tk9nbzg.webp)

Wenn Sie die Passphrase nicht in der Konfigurationsdatei angegeben haben, fügen Sie sie direkt im Befehl hinzu:

```bash
delegate new <new delegate name> --passPhrase "passphrase here"
```

![So werden Sie ein ADAMANT-Delegate](/images/engineering-notes/medium/745f01d032f/006-0-fojjd-jrkr-jmvje.webp)

Nach erfolgreicher Registrierung verlassen Sie die Konsole durch zweimaliges Drücken von `Ctrl+C`. Um mit dem Forgen zu beginnen, aktualisieren Sie die Konfigurationsdatei Ihres Nodes unter `~/adamant/config.json`. Setzen Sie den Parameter `forging/secret` auf Ihre zwölfwörtige Passphrase, eingeschlossen in Anführungszeichen, und starten Sie den Node neu.

```bash
nano ~/adamant/config.json
pm2 restart adamant
```

![So werden Sie ein ADAMANT-Delegate](/images/engineering-notes/medium/745f01d032f/007-1-53boguojm1wx6sexqoa6yq-png.webp)

Sie können Ihren Delegate-Status überwachen, indem Sie den ADAMANT Delegate Monitor besuchen und nach Ihrem Delegatenamen suchen. Dies leitet Sie auf eine Detailseite weiter, die Ihre Registrierung bestätigt.

![So werden Sie ein ADAMANT-Delegate](/images/engineering-notes/medium/745f01d032f/008-1-sq6rao5bjro6dpbpbiwqlq-png.webp)

![So werden Sie ein ADAMANT-Delegate](/images/engineering-notes/medium/745f01d032f/009-1-xutdvsnjzh06yedz6uq1jg-png.webp)

Die Registrierung allein aktiviert noch nicht das Forgen. Sie müssen Stimmen von ADAMANT-Nutzern über die Messenger-Apps erhalten. Sobald Ihr Delegate genügend Stimmkraft sammelt, um unter die Top 101 zu gelangen, überwachen Sie seine Leistung im Delegate Monitor. Ein grüner Kreis zeigt erfolgreiches Blockforging an, während graue, gelbe oder rote Kreise auf Konfigurationsprobleme – meist eine falsche Passphrase in der Node-Konfiguration – oder Node-Ausfallzeiten hindeuten. Halten Sie Ihren Node aktiv, verfolgen Sie den Rang Ihres Delegates und spielen Sie wichtige Updates rechtzeitig ein.

![So werden Sie ein ADAMANT-Delegate](/images/engineering-notes/medium/745f01d032f/010-1-imaqsih3o-uz-q2rggmia-png.webp)
