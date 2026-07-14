---
title: "So installieren Sie einen ADAMANT-Knoten unter macOS"
slug: "how-to-install-an-adamant-node-on-macos-cfdcb9434b9a"
description: "Diese Anleitung behandelt die Installation und Ausführung eines ADAMANT Messenger Blockchain-Knotens von Grund auf unter macOS, einschließlich Entwicklungstools, PostgreSQL, Node.js und Auto-Start-Konfiguration nach dem Neustart."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/how-to-install-an-adamant-node-on-macos-cfdcb9434b9a"
publishedAt: "2025-06-08T16:04:37.394Z"
author: "Alex Web3"
authorUrl: "https://medium.com/@al.onyxprotocol"
sourceAccount: "al-onyx"
coverImage: "/images/engineering-notes/medium/cfdcb9434b9a/001-1-v00ichfaftdwhvumrvfkxq-png.webp"
cardSpan: "full"
originalId: "medium:cfdcb9434b9a"
locale: "de"
placeholder: false
---

Diese Anleitung behandelt die Installation und Ausführung eines **ADAMANT Messenger Blockchain-Knotens** von Grund auf unter **macOS**, einschließlich Entwicklungstools, PostgreSQL, Node.js und Auto-Start-Konfiguration nach dem Neustart.

Getestet unter macOS 13 Ventura und neuer. Knotentyp: `mainnet` oder `testnet`. Benötigte Zeit: ~15–30 Minuten.

Die Ausführung eines ADAMANT-Knotens unterstützt eine vollständig dezentralisierte, datenschutzfreundliche Blockchain, die ADAMANT Messenger antreibt. Sie stärkt das Netzwerk, ermöglicht direkten Zugriff auf Blockchain-Daten und bietet dPoS-Belohnungen, wenn Sie ein Validatorknoten (Delegate) werden.

### Voraussetzungen

Sie benötigen einen Mac mit macOS 13 (Ventura) oder neuer, ein Administrator-Benutzerkonto, eine stabile Internetverbindung, etwa 50 GB freien Speicherplatz und grundlegende Kenntnisse im Umgang mit dem Terminal. Öffnen Sie das Terminal, indem Sie `Cmd + Leertaste` drücken, `Terminal` eingeben und die Eingabetaste drücken.

### Apple Command Line Tools installieren

Apples Entwickler-Tools sind erforderlich, um Code zu kompilieren und Git zu verwenden:

```bash
xcode-select --install
```

Ein Popup-Fenster fordert Sie zur Bestätigung der Installation auf. Bestätigen Sie und warten Sie, bis die Installation abgeschlossen ist.

### Homebrew installieren

Homebrew ist ein Paketmanager für macOS, der zur Installation von PostgreSQL und anderen Abhängigkeiten verwendet wird:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

![So installieren Sie einen ADAMANT-Knoten unter macOS](/images/engineering-notes/medium/cfdcb9434b9a/002-1-vp1mtcppml-dgtygq6vb9q-png.webp)

Bestätigen Sie mit der *Eingabetaste*. Nach der Installation befolgen Sie die Anweisungen im Abschnitt „Next steps“ (in der Regel Hinzufügen von Homebrew zu Ihrer Shell-Konfiguration wie `~/.zprofile` oder `~/.bash_profile`). Laden Sie Ihre Shell neu:

```bash
source ~/.zprofile  # or ~/.bash_profile depending on your shell
```

### Erforderliche Pakete installieren

Installieren Sie PostgreSQL, Redis, Git und andere notwendige Tools:

```bash
brew install postgresql redis git make automake autoconf libtool jq htop
```

Starten und aktivieren Sie PostgreSQL und Redis:

```bash
brew services start postgresql
brew services start redis
```

### PostgreSQL-Datenbank einrichten

Erstellen Sie einen PostgreSQL-Benutzer und eine Datenbank für ADAMANT:

```bash
# Customize these as needed
DB_USER=adamant
DB_NAME=adamant_main
DB_PASSWORD=securepassword

psql postgres -c "CREATE ROLE $DB_USER LOGIN PASSWORD '$DB_PASSWORD';"
psql postgres -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;"
```

### NVM und Node.js installieren

Installieren Sie Node Version Manager (NVM) und Node.js 22 LTS (Codename Jod):

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.nvm/nvm.sh
nvm install 22
```

Installieren Sie *pm2* (Node.js-Prozessmanager):

```bash
npm install -g pm2
```

Richten Sie die *pm2*-Log-Rotation ein (optional, aber empfohlen):

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 500M
pm2 set pm2-logrotate:retain 5
pm2 set pm2-logrotate:compress true
pm2 set pm2-logrotate:rotateInterval '0 0 0 1 *'
```

### ADAMANT-Knoten klonen und einrichten

Für eine geordnete Einrichtung verwenden Sie das Verzeichnis `~/Applications` (ein persönlicher Ordner in Ihrem Home-Verzeichnis, nicht das systemweite `/Applications`):

```bash
mkdir -p ~/Applications
cd ~/Applications
```

Klonen Sie das ADAMANT-Repository von GitHub:

```bash
# Customize these as needed
NETWORK=mainnet   # or testnet
BRANCH=master     # or desired Git branch

git clone https://github.com/Adamant-im/adamant --branch $BRANCH
cd adamant
npm install
```

![So installieren Sie einen ADAMANT-Knoten unter macOS](/images/engineering-notes/medium/cfdcb9434b9a/003-1-rtjskr-1lfxqntzxxg2h-q-png.webp)

Legen Sie die ADM-Knoten-Konfigurationsdatei fest:

```bash
cp config.default.json config.json
sed -i '' "s/\"password\": \"password\"/\"password\": \"$DB_PASSWORD\"/" config.json
```

Dadurch wird die Standardkonfiguration kopiert und das zuvor festgelegte Datenbankpasswort eingetragen. Sie können die Konfiguration auch manuell mit `nano config.json` bearbeiten.

Für einen **Testnetzwerk**-Knoten verwenden Sie stattdessen diese Befehle:

```bash
cp test/config.default.json test/config.json
sed -i '' "s/\"password\": \"password\"/\"password\": \"$DB_PASSWORD\"/" test/config.json
```

### Blockchain-Snapshot herunterladen (optional, nur Mainnet)

Wenn Sie die volle Dezentralisierung unterstützen möchten, überspringen Sie diesen Schritt. Andernfalls beschleunigt das Herunterladen eines Snapshots die Blockchain-Synchronisierung erheblich:

```bash
curl -O https://explorer.adamant.im/db_backup.sql.gz
gunzip db_backup.sql.gz
psql $DB_NAME < db_backup.sql
rm db_backup.sql
```

Dies kann bis zu 20 Minuten dauern, spart aber etwa eine Woche an Synchronisierungszeit.

### Ausführen des ADM-Knotens

Führen Sie den Knoten zuerst temporär im Terminal aus, um sicherzustellen, dass alles funktioniert:

```bash
node app.js
```

Bei Erfolg sehen Sie Ausgaben zur Initialisierung und die Blockchain synchronisiert sich mit zunehmender Blockhöhe:

![So installieren Sie einen ADAMANT-Knoten unter macOS](/images/engineering-notes/medium/cfdcb9434b9a/004-1-fclr7waeepraklxpmforsg-png.webp)

![So installieren Sie einen ADAMANT-Knoten unter macOS](/images/engineering-notes/medium/cfdcb9434b9a/005-1-cewqr7pjxjoxwgic-kw4cg-png.webp)

Stoppen Sie den Knoten mit `Strg + C`, starten Sie ihn dann mit *pm2*, damit er auch nach dem Schließen des Terminals weiterläuft:

```shell
# Mainnet
pm2 start --name adamant app.js

# Or, for testnet
# pm2 start --name adamanttest app.js -- --config test/config.json --genesis test/genesisBlock.json
```

![So installieren Sie einen ADAMANT-Knoten unter macOS](/images/engineering-notes/medium/cfdcb9434b9a/006-1-yamwpxe0isnydfrzhcujg-png.webp)

Speichern Sie die *pm2*-Prozessliste:

```bash
pm2 save
```

Überprüfen Sie, ob er läuft:

```bash
pm2 logs adamant
```

![So installieren Sie einen ADAMANT-Knoten unter macOS](/images/engineering-notes/medium/cfdcb9434b9a/007-1-d8em6reqerk-q53fjdwb-q-png.webp)

### Knoten nach macOS-Neustart neu starten

Um den ADAMANT-Knoten nach einem Mac-Neustart automatisch neu zu starten, haben Sie zwei Optionen.

**Option 1: Manueller Start nach Neustart.** Führen Sie jedes Mal nach einem Neustart aus:

```bash
source ~/.nvm/nvm.sh
pm2 resurrect
```

Sie können dies automatisieren, indem Sie die Zeilen zu Ihrem Shell-Profil hinzufügen (z. B. `~/.zprofile`):

```bash
echo 'source ~/.nvm/nvm.sh && pm2 resurrect' >> ~/.zprofile
```

**Option 2: Automatischer Start mit `pm2 startup`.** Der *pm2 startup*-Befehl funktioniert möglicherweise nicht reibungslos mit dem macOS System Integrity Protection (SIP). Erstellen Sie stattdessen einen `launchd`-Dienst:

```bash
pm2 startup launchd
```

Dies gibt einen Befehl wie `sudo env PATH=$PATH:/Users/youruser/.nvm/versions/node/vXX.X.X/bin pm2 startup launchd -u youruser — hp /Users/youruser` aus. Führen Sie ihn im Terminal aus und speichern Sie anschließend die pm2-Prozessliste:

```bash
pm2 save
```

*pm2* startet Ihren ADAMANT-Knoten nun automatisch beim Systemstart. Um dies später rückgängig zu machen, führen Sie `pm2 unstartup launchd` aus.

### Installation überprüfen

Überprüfen Sie den Prozessstatus:

```bash
pm2 show adamant
```

Überprüfen Sie die Blockhöhe des Knotens:

```bash
curl http://localhost:36666/api/blocks/getHeight
```

Rufen Sie den Knotenstatus ab:

```bash
curl http://localhost:36666/api/node/status
```

Eine Antwort mit `"syncing":true` bedeutet, dass der Knoten noch nicht vollständig synchronisiert ist. Warten Sie, bis die vollständige Synchronisierung der Blockchain abgeschlossen ist. Die Verwendung eines Blockchain-Snapshots beschleunigt dies erheblich.

Weitere Informationen finden Sie in der [ADAMANT-Knoten-Dokumentation](https://docs.adamant.im/).
