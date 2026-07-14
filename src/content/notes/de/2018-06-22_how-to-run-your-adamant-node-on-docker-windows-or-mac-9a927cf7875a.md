---
title: "So führen Sie Ihren ADAMANT-Knoten auf Docker aus (Windows oder Mac)"
slug: "how-to-run-your-adamant-node-on-docker-windows-or-mac-9a927cf7875a"
description: "Hinweis: Das Docker-Image ist möglicherweise veraltet; stattdessen wird die Ausführung eines ADAMANT-Knotens auf einem Ubuntu-Server empfohlen."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/how-to-run-your-adamant-node-on-docker-windows-or-mac-9a927cf7875a"
publishedAt: "2018-06-22T15:46:46.729Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/9a927cf7875a/001-0-fg4w7kswcdb2l5b0.webp"
cardSpan: "full"
originalId: "medium:9a927cf7875a"
locale: "de"
placeholder: false
---

Hinweis: Das Docker-Image ist möglicherweise veraltet; stattdessen wird die Ausführung eines ADAMANT-Knotens auf einem Ubuntu-Server empfohlen. ADAMANT verwendet Delegated Proof of Stake (dPoS) für die Blockchain-Konsensfindung, und durch das Betreiben eines eigenen Knotens wird die Netzwerkdezentralisierung verbessert.

Diese Anleitung erklärt, wie Sie einen ADAMANT-Knoten unter Windows, macOS oder Linux mithilfe von Docker installieren, ausführen und aktualisieren. Das Beispiel verwendet Windows 10, für das eine 64-Bit-Version von Windows 10 Pro, Enterprise oder Education (Build 14393 oder höher) erforderlich ist. Die Host-Maschine sollte je nach aktueller Blockhöhe mindestens 4 GB RAM und 50 GB freien Speicherplatz aufweisen.

Um Docker zu installieren, laden Sie die kostenlose Docker Community Edition herunter und führen den Installer aus. Befolgen Sie den Installationsassistenten, um die Lizenz zu akzeptieren, und autorisieren Sie den Installer mit Ihrem Systempasswort, das für Netzwerkkomponenten und Hyper-V-VMs benötigt wird. Starten Sie nach der Installation Docker über das Startmenü. Sobald das Whale-Symbol in der Statusleiste durchgehend angezeigt wird, läuft Docker. Außerdem müssen Sie Ihr lokales Laufwerk mit Docker teilen, indem Sie mit der rechten Maustaste auf das Symbol in der Statusleiste klicken, Einstellungen auswählen, das Kontrollkästchen für das freigegebene Laufwerk aktivieren und die Änderungen übernehmen.

![So führen Sie Ihren ADAMANT-Knoten auf Docker aus (Windows oder Mac)](/images/engineering-notes/medium/9a927cf7875a/002-0-lyckrpled-5lr7hl.webp)

![So führen Sie Ihren ADAMANT-Knoten auf Docker aus (Windows oder Mac)](/images/engineering-notes/medium/9a927cf7875a/003-0-6akvfvvlkcfe7829.webp)

![So führen Sie Ihren ADAMANT-Knoten auf Docker aus (Windows oder Mac)](/images/engineering-notes/medium/9a927cf7875a/004-0-a86t6y8gjz9oxrpc.webp)

Um den ADAMANT-Knoten zu installieren, installieren Sie zunächst einen Git-Client mit den Standardoptionen. Öffnen Sie Microsoft PowerShell und klonen Sie das Repository:

```bash
git clone https://github.com/Adamant-im/adamant-docker
cd adamant-docker
```

![So führen Sie Ihren ADAMANT-Knoten auf Docker aus (Windows oder Mac)](/images/engineering-notes/medium/9a927cf7875a/005-0-fgfme0jdbid9yncf.webp)

Um den Knoten auszuführen, ziehen Sie die erforderlichen Docker-Images:

```bash
docker-compose pull
```

![So führen Sie Ihren ADAMANT-Knoten auf Docker aus (Windows oder Mac)](/images/engineering-notes/medium/9a927cf7875a/006-0-aivqroqzrjyhguqd.webp)

Starten Sie den Datenbankdienst und überprüfen Sie, ob er erfolgreich gestartet wurde:

```bash
docker-compose up -d db
docker-compose logs
```

![So führen Sie Ihren ADAMANT-Knoten auf Docker aus (Windows oder Mac)](/images/engineering-notes/medium/9a927cf7875a/007-0-papyajoh0cxgai9i.webp)

Starten Sie anschließend den adamant-node-Dienst und überprüfen Sie die Logs, um einen erfolgreichen Start zu bestätigen:

```bash
docker-compose up -d adamant-node
```

![So führen Sie Ihren ADAMANT-Knoten auf Docker aus (Windows oder Mac)](/images/engineering-notes/medium/9a927cf7875a/008-0-5juodmupmzrre2n1.webp)

Sie können alle laufenden Dienste mit `docker-compose stop` anhalten und sie später mit `docker-compose start` erneut starten.

![So führen Sie Ihren ADAMANT-Knoten auf Docker aus (Windows oder Mac)](/images/engineering-notes/medium/9a927cf7875a/009-0-hrzlp4aniigch2fc.webp)

Überprüfen Sie die Installation, indem Sie das Anwendungslog des Knotens prüfen:

```bash
docker-compose logs --tail=10 adamant-node
```

![So führen Sie Ihren ADAMANT-Knoten auf Docker aus (Windows oder Mac)](/images/engineering-notes/medium/9a927cf7875a/010-0-v8ofli8bjy-hqo2b.webp)

Das Argument `--tail=10` beschränkt die Ausgabe auf die letzten 10 Log-Zeilen. Um zu überprüfen, ob der Knoten mit der ADAMANT-Blockchain verbunden ist, besuchen Sie den ADAMANT-Netzwerkmonitor und suchen Sie Ihren Knoten anhand seiner IP-Adresse. Es kann einige Minuten dauern, bis Ihr Knoten erscheint. Ein neu installierter Knoten zeigt eine Blockhöhe von 1 an, während er synchronisiert, was je nach Verbindung und CPU bis zu einem Tag dauern kann.

![So führen Sie Ihren ADAMANT-Knoten auf Docker aus (Windows oder Mac)](/images/engineering-notes/medium/9a927cf7875a/011-0-74skpvuswckotzf6.webp)

Um die Höhe direkt zu überprüfen, rufen Sie die Container-ID mit `docker ps` ab und fragen Sie anschließend die API des Knotens ab:

```bash
docker ps
docker exec <container_id> curl -k -X GET http://localhost:36666/api/blocks/getHeight
```

![So führen Sie Ihren ADAMANT-Knoten auf Docker aus (Windows oder Mac)](/images/engineering-notes/medium/9a927cf7875a/012-0-osgtdu-u6daibuqi.webp)

Wenn die Synchronisation abgeschlossen ist, entspricht die Höhe der anderer Knoten im Netzwerk. Um den ADAMANT-Knoten zu aktualisieren, öffnen Sie PowerShell und führen Sie die folgenden Befehle aus:

```bash
cd adamant-docker
docker-compose stop
docker-compose pull
docker-compose down
docker-compose up -d db
docker-compose up -d adamant-node
```

![So führen Sie Ihren ADAMANT-Knoten auf Docker aus (Windows oder Mac)](/images/engineering-notes/medium/9a927cf7875a/013-0-l5hbgju9qlgr65sw.webp)
