---
title: "So führen Sie einen ADAMANT-Knoten unter Windows aus"
slug: "how-to-run-adamant-node-on-windows-ee057e6e80d5"
description: "Ab Windows 10 Version 1903 und Windows Server 2019 bietet Microsoft WSL 2, um Linux-Anwendungen unter Windows auszuführen. So betreiben Sie einen ADAMANT-Knoten lokal."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/how-to-run-adamant-node-on-windows-ee057e6e80d5"
publishedAt: "2021-04-06T13:12:12.555Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/ee057e6e80d5/001-1-uqe2ccpdkrmbxnio3cyqaq-jpeg.webp"
cardSpan: "full"
originalId: "medium:ee057e6e80d5"
locale: "de"
placeholder: false
---

Ab Windows 10 Version 1903 und Windows Server 2019 bietet Microsoft WSL 2 (Windows Subsystem für Linux), mit dem Sie Linux-Anwendungen unter Windows ausführen können. Das bedeutet, dass Sie einen ADAMANT-Knoten auf Ihrem Heimrechner betreiben können, beispielsweise als Delegierter oder zum Betrieb eines Forging-Pools.

### Systemvoraussetzungen

Sie benötigen Windows 10 x64 (Version 1903 / Build 18362 oder höher) oder Windows Server 2019, mindestens 4 GB RAM und 50 GB Festplattenspeicher. Virtualisierungstechnologie muss im BIOS Ihres Computers aktiviert sein, bevor Sie die Installation durchführen.

### Einrichtung von WSL 2

Befolgen Sie den [offiziellen WSL 2-Installationsleitfaden](https://docs.microsoft.com/en-us/windows/wsl/install-win10#manual-installation-steps). Falls Sie den Microsoft Store nicht verwenden möchten, können Sie [Ubuntu manuell herunterladen](https://docs.microsoft.com/en-us/windows/wsl/install-manual); Ubuntu 16, 18 oder 20 sind alle geeignet.

![So führen Sie einen ADAMANT-Knoten unter Windows aus](/images/engineering-notes/medium/ee057e6e80d5/002-0-d3n4-16cc9epoa-d.webp)

Nach der Installation legen Sie einen UNIX-Benutzernamen und ein Passwort für die Ubuntu-Distribution fest. Beispielsweise können Sie den Benutzernamen auf *ubuntu* setzen.

### Installation des ADAMANT-Knotens

Sie verfügen nun über ein unter Windows laufendes Ubuntu-Subsystem, das sich ähnlich wie eine virtuelle Maschine verhält. Installieren Sie den ADAMANT-Knoten gemäß der standardmäßigen [Ubuntu-Anleitung](https://medium.com/adamant-im/how-to-run-your-adamant-node-on-ubuntu-990e391e8fcc).

![So führen Sie einen ADAMANT-Knoten unter Windows aus](/images/engineering-notes/medium/ee057e6e80d5/003-0-jj5gjxvimq-cagrf.webp)

Unmittelbar nach der Installation kann der *Vmmem* (WSL 2)-Prozess viel RAM verbrauchen, da das Setup-Skript ein frisches Blockchain-Image herunterlädt und das Linux-Subsystem dieses im Arbeitsspeicher zwischerspeichert. Der Speicherverbrauch sinkt nach einem Neustart des Computers deutlich.

### Knoten nach einem Neustart ausführen

Das Schließen des Ubuntu-Fensters stoppt den Knoten nicht; das Linux-Subsystem läuft weiterhin im Hintergrund. Wenn der Computer in den Ruhezustand wechselt, setzt der Knoten nach dem Aufwachen seine Arbeit fort und holt die aktuelle Blockchain-Höhe nach. Nach einem vollständigen Neustart des Computers müssen Sie den Knoten jedoch manuell starten.

Öffnen Sie das Ubuntu-Terminal oder stellen Sie eine Verbindung über PowerShell her:

```
wsl
```

Wenn mehrere Linux-Distributionen installiert sind, geben Sie die Version an:

```
wsl -d Ubuntu-18.04
```

Nach der Verbindung starten Sie PostgreSQL, wechseln zum Benutzer *adamant* und starten den Knoten:

```
sudo service postgresql start
su - adamant
cd /home/adamant/adamant && pm2 start --name adamant app.js
```

Überprüfen Sie, ob der Knoten läuft und an Höhe gewinnt:

```
curl http://localhost:36666/api/blocks/getHeight
```

Es dauert einige Zeit, bis der Knoten die aktuelle Blockchain-Höhe erreicht. Bei entsprechenden Systemkenntnissen können Sie einen automatischen Start nach einem Neustart einrichten; eine Anleitung finden Sie in [dieser Antwort auf Ask Ubuntu](https://askubuntu.com/a/1166012).

### Zugriff auf die API

Sowohl über das Ubuntu-Terminal als auch über Windows können Sie über *localhost* auf die API des Knotens zugreifen. Öffnen Sie einen Browser unter `http://localhost:36666/api/blocks/getHeight`. Der Zugriff auf die API von einem anderen Computer aus erfordert zusätzliche Netzwerkkonfiguration.
