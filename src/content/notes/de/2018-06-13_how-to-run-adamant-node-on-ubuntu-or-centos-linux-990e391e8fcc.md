---
title: "Betrieb eines ADAMANT-Knotens auf Ubuntu oder CentOS Linux"
slug: "how-to-run-adamant-node-on-ubuntu-or-centos-linux-990e391e8fcc"
description: "ADAMANT verwendet Fair dPoS für die Blockchain-Konsensfindung. Ein eigener Knoten stärkt die Dezentralisierung und ermöglicht das Forging als Delegierter."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/how-to-run-your-adamant-node-on-ubuntu-990e391e8fcc"
publishedAt: "2018-06-13T08:17:00.719Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/990e391e8fcc/001-1-ere-rzan0-vcmaaj97qubg-jpeg.webp"
cardSpan: "full"
originalId: "medium:990e391e8fcc"
locale: "de"
placeholder: false
---

## Übersicht

ADAMANT verwendet Fair dPoS (Delegated Proof of Stake) für die Blockchain-Konsensfindung. Der Betrieb eines eigenen Knotens stärkt die Dezentralisierung des Netzwerks und ermöglicht das Forging als Delegierter. Diese Anleitung behandelt die Installation auf Ubuntu 20–24 (bevorzugt) oder CentOS 8, funktioniert aber möglicherweise auch auf anderen Linux-kompatiblen Systemen.

Ein Server oder VPS mit mindestens 2 GB RAM und 70 GB Speicherplatz (Stand Oktober 2025 für das Mainnet) ist erforderlich.

## Schnellinstallation

Führen Sie das Installationsskript mit sudo-Rechten für die Ersteinrichtung aus. Das Skript aktualisiert die Betriebssystempakete, erstellt einen `adamant`-Systembenutzer, installiert PostgreSQL, Node.js und andere Abhängigkeiten, richtet den ADAMANT-Knoten ein und lädt optional ein Blockchain-Image herunter. Sie werden zur Eingabe von Passwörtern für die Datenbank und Systembenutzer aufgefordert.

**Ubuntu:**

```
sudo bash -c "$(wget -O - https://adamant.im/install_node.sh)"
```

**CentOS:**

```
sudo bash <(curl -s https://adamant.im/install_node_centos.sh)
```

![So führen Sie einen ADAMANT-Knoten auf Ubuntu oder CentOS Linux aus](/images/engineering-notes/medium/990e391e8fcc/002-1-xzbcago0snmqw09cignfyq-png.webp)

Verwenden Sie das `screen`-Tool, um sicherzustellen, dass die Installation abgeschlossen wird, auch wenn die SSH-Verbindung abbricht. Der Vorgang dauert in der Regel 10–20 Minuten.

Für das Testnetz fügen Sie die entsprechenden Flags hinzu:

**Ubuntu:**

```
sudo bash -c "$(wget -O - https://adamant.im/install_node.sh)" -O -b dev -n testnet -j jod
```

**CentOS:**

```
sudo bash <(curl -s https://adamant.im/install_node_centos.sh) -b dev -n testnet -j jod
```

## Manuelle Installation (Ubuntu)

Diese Schritte gelten für Ubuntu. Unter CentOS verwenden Sie entsprechende Befehle oder das oben genannte Schnellskript.

### Systemvorbereitung

Aktualisieren Sie das System und installieren Sie Build-Tools, git und Redis:

```
sudo apt update && sudo apt upgrade -y
sudo apt-get install -y build-essential curl automake autoconf libtool rpl mc git redis-server
```

### PostgreSQL-Einrichtung

Fügen Sie das PostgreSQL-Repository hinzu und installieren Sie es:

```
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O - | sudo apt-key add -
sudo apt update && sudo apt install -y postgresql postgresql-contrib libpq-dev
```

Erstellen Sie den Datenbankbenutzer und die Datenbank. Verwenden Sie ein sicheres Passwort anstelle des unten stehenden Beispiels:

```
su postgres -c psql
CREATE ROLE adamant LOGIN PASSWORD 'HardPass111';
CREATE DATABASE adamant_main;
ALTER DATABASE adamant_main OWNER TO adamant;
\q
```

### Systembenutzer erstellen

```
adduser adamant
sudo usermod -aG sudo adamant
su - adamant
```

### Node.js und PM2 installieren

Installieren Sie nvm, anschließend Node.js LTS (Hydrogen/v18) und dann PM2 als Prozessmanager:

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```

Melden Sie sich ab und wieder an, damit nvm wirksam wird, dann:

```
nvm i --lts=hydrogen
npm install -g pm2
```

### ADAMANT klonen und konfigurieren

```
git clone https://github.com/Adamant-im/adamant
cd adamant
npm i
cp default.config.json config.json
nano config.json
```

In `config.json` setzen Sie das Datenbankpasswort entsprechend dem zuvor erstellten. Setzen Sie `api/access/public` auf `true`, wenn Sie externen API-Zugriff wünschen (aktiviert Webserver für API-Aufrufe). Setzen Sie `consoleLogLevel` auf `error`, um die Logs übersichtlicher zu halten.

### Optional: Blockchain-Image

Der Download eines vorgefertigten Blockchain-Images spart Synchronisierungszeit, erfordert aber Vertrauen in die Quelle. Wenn Sie darauf verzichten, wird jede Transaktion vollständig verifiziert, was mehrere Tage dauern kann, aber die Konsistenz der Kette beweist.

```
pm2 stop adamant
wget https://explorer.adamant.im/db_backup.sql.gz
gunzip db_backup.sql.gz
psql adamant_main < db_backup.sql
```

Falls Sie zuvor einen Knoten mit dieser Datenbank registriert haben, löschen und erstellen Sie diese zuerst mit `dropdb` und `createdb` neu.

## Starten und Überprüfen

Starten Sie den Knoten mit PM2, das den Prozess im Hintergrund ausführt und bei Fehlern automatisch neu startet:

```
cd /home/adamant/adamant && pm2 start --name adamant app.js
```

Überprüfen Sie den Status mit `pm2 show adamant` – er sollte `online` anzeigen. Fragen Sie die Blockchain-Höhe ab:

```
curl -k -X GET http://localhost:36666/api/blocks/getHeight
```

Beim Start beträgt die Höhe `1` und steigt während der Synchronisierung. Bei Abschluss entspricht die Höhe der anderer Knoten im Netzwerk. Prüfen Sie mit `pm2 logs adamant`, falls Probleme auftreten. Sie können auch überprüfen, ob Ihr Knoten im ADAMANT-Netzwerkmonitor erscheint, indem Sie nach Ihrer IP-Adresse suchen.

## Öffentliche API aktivieren

Die öffentliche API ermöglicht es ADAMANT-Messenger-Apps, eine Verbindung zu Ihrem Knoten herzustellen. Die interne (localhost) API ist standardmäßig aktiviert. Um externen Zugriff zu ermöglichen, setzen Sie `api/access/public` in `config.json` auf `true` und starten Sie neu:

```
pm2 restart adamant
```

Überprüfen Sie dies, indem Sie `http://<IP>:36666/api/blocks/getHeight` in einem Browser öffnen.

## Anhalten und Aktualisieren

Stoppen Sie den Knoten mit `pm2 stop adamant`. Zum Aktualisieren:

```
su - adamant
cd adamant
pm2 stop adamant
git pull
npm update
pm2 restart adamant
```

## Automatischer Start nach Neustart

Fügen Sie einen Crontab-Eintrag als `adamant`-Benutzer hinzu, damit der Knoten nach einem VPS-Neustart neu startet:

```
crontab -e
```

```
@reboot cd /home/adamant/adamant && pm2 start --name adamant app.js
```

Alternativ bieten `pm2 save` und `pm2 startup` einen zuverlässigeren Mechanismus für den automatischen Start.

## Wiederherstellung

Wenn ein Knoten die Synchronisierung verliert und von Höhe 0 neu startet – typischerweise aufgrund von Hardwarefehlern oder unzureichendem Speicherplatz – verwenden Sie das Wiederherstellungsskript, um aus einem Blockchain-Image wiederherzustellen. Dies ist besonders nützlich für Forging-Delegierte, die schnell wieder in Betrieb genommen werden müssen:

```
sudo bash -c "$(wget -O - https://adamant.im/fix_node.sh)" -O -n mainnet
```

Alternativ folgen Sie den oben beschriebenen manuellen Wiederherstellungsschritten zum Laden eines Blockchain-Images.
