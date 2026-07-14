---
title: "Comment installer un nœud ADAMANT sur macOS"
slug: "how-to-install-an-adamant-node-on-macos-cfdcb9434b9a"
description: "Ce guide explique comment installer et exécuter un nœud blockchain ADAMANT Messenger sur macOS, y compris les outils de développement, PostgreSQL, Node.js et la configuration du démarrage automatique."
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
locale: "fr"
placeholder: false
---

Ce guide couvre l'installation et l'exécution d'un **nœud blockchain ADAMANT Messenger** depuis zéro sur **macOS**, y compris les outils de développement, PostgreSQL, Node.js et la configuration du démarrage automatique après redémarrage.

Testé sur macOS 13 Ventura et versions ultérieures. Type de nœud : `mainnet` ou `testnet`. Durée estimée : ~15–30 minutes.

Exécuter un nœud ADAMANT soutient une blockchain entièrement décentralisée et axée sur la confidentialité, qui alimente ADAMANT Messenger. Cela renforce le réseau, donne un accès direct aux données blockchain et permet d'obtenir des récompenses dPoS si vous devenez validateur/délégué.

### Prérequis

Vous avez besoin d'un Mac disposant de macOS 13 (Ventura) ou ultérieur, d'un compte utilisateur administrateur, d'une connexion Internet stable, d'environ 50 Go d'espace disque libre et d'une certaine aisance avec Terminal. Ouvrez Terminal en appuyant sur `Cmd + Espace`, en tapant `Terminal`, puis en appuyant sur Entrée.

### Installer les outils en ligne de commande Apple

Les outils de développement d'Apple sont nécessaires pour compiler du code et utiliser Git :

```bash
xcode-select --install
```

Une fenêtre contextuelle vous demandera de confirmer l'installation. Acceptez et attendez la fin du processus.

### Installer Homebrew

Homebrew est un gestionnaire de paquets pour macOS utilisé pour installer PostgreSQL et d'autres dépendances :

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

![Comment installer un nœud ADAMANT sur macOS](/images/engineering-notes/medium/cfdcb9434b9a/002-1-vp1mtcppml-dgtygq6vb9q-png.webp)

Confirmez avec la touche *Entrée*. Après l'installation, suivez les instructions affichées dans la section "Next steps" (généralement ajouter Homebrew à votre configuration shell comme `~/.zprofile` ou `~/.bash_profile`). Rechargez votre shell :

```bash
source ~/.zprofile  # or ~/.bash_profile depending on your shell
```

### Installer les paquets requis

Installez PostgreSQL, Redis, Git et d'autres outils nécessaires :

```bash
brew install postgresql redis git make automake autoconf libtool jq htop
```

Démarrez et activez PostgreSQL et Redis :

```bash
brew services start postgresql
brew services start redis
```

### Configurer la base de données PostgreSQL

Créez un utilisateur et une base de données PostgreSQL pour ADAMANT :

```bash
# Customize these as needed
DB_USER=adamant
DB_NAME=adamant_main
DB_PASSWORD=securepassword

psql postgres -c "CREATE ROLE $DB_USER LOGIN PASSWORD '$DB_PASSWORD';"
psql postgres -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;"
```

### Installer NVM et Node.js

Installez Node Version Manager (NVM) et Node.js 22 LTS (nom de code Jod) :

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.nvm/nvm.sh
nvm install 22
```

Installez *pm2* (gestionnaire de processus Node.js) :

```bash
npm install -g pm2
```

Configurez la rotation des journaux *pm2* (facultatif mais recommandé) :

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 500M
pm2 set pm2-logrotate:retain 5
pm2 set pm2-logrotate:compress true
pm2 set pm2-logrotate:rotateInterval '0 0 0 1 *'
```

### Cloner et configurer le nœud ADAMANT

Pour une installation organisée, utilisez le répertoire `~/Applications` (un dossier personnel dans votre répertoire utilisateur, pas le `/Applications` système) :

```bash
mkdir -p ~/Applications
cd ~/Applications
```

Clonez le dépôt ADAMANT depuis GitHub :

```bash
# Customize these as needed
NETWORK=mainnet   # or testnet
BRANCH=master     # or desired Git branch

git clone https://github.com/Adamant-im/adamant --branch $BRANCH
cd adamant
npm install
```

![Comment installer un nœud ADAMANT sur macOS](/images/engineering-notes/medium/cfdcb9434b9a/003-1-rtjskr-1lfxqntzxxg2h-q-png.webp)

Définissez le fichier de configuration du nœud ADM :

```bash
cp config.default.json config.json
sed -i '' "s/\"password\": \"password\"/\"password\": \"$DB_PASSWORD\"/" config.json
```

Cela copie la configuration par défaut dans votre propre fichier et entre le mot de passe de la base de données que vous avez défini précédemment. Vous pouvez également modifier manuellement la configuration avec `nano config.json`.

Pour un nœud **testnet**, utilisez plutôt ces commandes :

```bash
cp test/config.default.json test/config.json
sed -i '' "s/\"password\": \"password\"/\"password\": \"$DB_PASSWORD\"/" test/config.json
```

### Télécharger un instantané de la blockchain (facultatif, mainnet uniquement)

Si vous souhaitez soutenir la décentralisation complète, sautez cette étape. Sinon, télécharger un instantané accélère considérablement la synchronisation de la blockchain :

```bash
curl -O https://explorer.adamant.im/db_backup.sql.gz
gunzip db_backup.sql.gz
psql $DB_NAME < db_backup.sql
rm db_backup.sql
```

Cela peut prendre jusqu'à 20 minutes, mais économise environ une semaine de temps de synchronisation.

### Exécuter le nœud ADM

Exécutez d'abord le nœud temporairement dans Terminal pour vérifier que tout fonctionne :

```bash
node app.js
```

Si tout réussit, vous verrez les messages de démarrage et la synchronisation de la blockchain avec une hauteur de bloc croissante :

![Comment installer un nœud ADAMANT sur macOS](/images/engineering-notes/medium/cfdcb9434b9a/004-1-fclr7waeepraklxpmforsg-png.webp)

![Comment installer un nœud ADAMANT sur macOS](/images/engineering-notes/medium/cfdcb9434b9a/005-1-cewqr7pjxjoxwgic-kw4cg-png.webp)

Arrêtez le nœud avec `Ctrl + C`, puis démarrez-le avec *pm2* pour qu'il persiste après la fermeture de Terminal :

```shell
# Mainnet
pm2 start --name adamant app.js

# Or, for testnet
# pm2 start --name adamanttest app.js -- --config test/config.json --genesis test/genesisBlock.json
```

![Comment installer un nœud ADAMANT sur macOS](/images/engineering-notes/medium/cfdcb9434b9a/006-1-yamwpxe0isnydfrzhcujg-png.webp)

Enregistrez la liste des processus *pm2* :

```bash
pm2 save
```

Vérifiez qu'il est en cours d'exécution :

```bash
pm2 logs adamant
```

![Comment installer un nœud ADAMANT sur macOS](/images/engineering-notes/medium/cfdcb9434b9a/007-1-d8em6reqerk-q53fjdwb-q-png.webp)

### Redémarrer le nœud après un redémarrage de macOS

Pour redémarrer automatiquement le nœud ADAMANT après un redémarrage du Mac, vous avez deux options.

**Option 1 : Démarrage manuel après redémarrage.** À chaque redémarrage de votre Mac, exécutez :

```bash
source ~/.nvm/nvm.sh
pm2 resurrect
```

Vous pouvez automatiser cela en ajoutant les lignes à votre profil shell (par exemple, `~/.zprofile`) :

```bash
echo 'source ~/.nvm/nvm.sh && pm2 resurrect' >> ~/.zprofile
```

**Option 2 : Démarrage automatique avec `pm2 startup`.** La commande *pm2 startup* peut ne pas fonctionner parfaitement avec la Protection d'intégrité du système (SIP) de macOS. Créez plutôt un service `launchd` :

```bash
pm2 startup launchd
```

Cela affiche une commande comme `sudo env PATH=$PATH:/Users/youruser/.nvm/versions/node/vXX.X.X/bin pm2 startup launchd -u youruser — hp /Users/youruser`. Exécutez-la dans Terminal, puis enregistrez la liste des processus pm2 :

```bash
pm2 save
```

*pm2* redémarrera désormais automatiquement votre nœud ADAMANT au démarrage. Pour annuler cela ultérieurement, exécutez `pm2 unstartup launchd`.

### Vérifier l'installation

Vérifiez l'état du processus :

```bash
pm2 show adamant
```

Vérifiez la hauteur de bloc du nœud :

```bash
curl http://localhost:36666/api/blocks/getHeight
```

Obtenez l'état du nœud :

```bash
curl http://localhost:36666/api/node/status
```

Une réponse avec `"syncing":true` signifie que le nœud n'est pas encore entièrement synchronisé. Attendez la fin complète de la synchronisation de la blockchain. L'utilisation d'un instantané blockchain accélère considérablement ce processus.

Pour plus d'informations, consultez la [documentation du nœud ADAMANT](https://docs.adamant.im/).
