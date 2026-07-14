---
title: "Exécuter un nœud ADAMANT sur Ubuntu ou CentOS Linux"
slug: "how-to-run-adamant-node-on-ubuntu-or-centos-linux-990e391e8fcc"
description: "Exécutez votre propre nœud ADAMANT pour renforcer la décentralisation et participer au forging en tant que délégué sur Ubuntu ou CentOS."
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
locale: "fr"
placeholder: false
---

## Aperçu

ADAMANT utilise Fair dPoS (Preuve d'Enjeu Déléguée) pour la validation du blockchain. Exécuter votre propre nœud renforce la décentralisation du réseau et permet le forging en tant que délégué. Ce guide couvre l'installation sur Ubuntu 20–24 (préféré) ou CentOS 8, bien que d'autres systèmes compatibles Linux puissent fonctionner.

Un serveur ou VPS avec au moins 2 Go de RAM et 70 Go d'espace disque (à partir d'octobre 2025 pour le mainnet) est requis.

## Installation rapide

Pour une première installation, exécutez le script d'installation avec les privilèges sudo. Le script met à jour les paquets du système, crée un utilisateur système `adamant`, installe PostgreSQL, Node.js et d'autres dépendances, configure le nœud ADAMANT et télécharge éventuellement une image du blockchain. Vous devrez définir des mots de passe pour les utilisateurs base de données et système.

**Ubuntu :**

```
sudo bash -c "$(wget -O - https://adamant.im/install_node.sh)"
```

**CentOS :**

```
sudo bash <(curl -s https://adamant.im/install_node_centos.sh)
```

![Comment exécuter un nœud ADAMANT sur Ubuntu ou CentOS Linux](/images/engineering-notes/medium/990e391e8fcc/002-1-xzbcago0snmqw09cignfyq-png.webp)

Utilisez l'outil `screen` pour garantir que l'installation se termine même si votre connexion SSH est interrompue. Le processus prend généralement entre 10 et 20 minutes.

Pour le testnet, ajoutez les indicateurs appropriés :

**Ubuntu :**

```
sudo bash -c "$(wget -O - https://adamant.im/install_node.sh)" -O -b dev -n testnet -j jod
```

**CentOS :**

```
sudo bash <(curl -s https://adamant.im/install_node_centos.sh) -b dev -n testnet -j jod
```

## Installation manuelle (Ubuntu)

Ces étapes concernent Ubuntu. Sur CentOS, utilisez des commandes équivalentes ou le script rapide ci-dessus.

### Préparation du système

Mettez à jour le système et installez les outils de compilation, git et Redis :

```
sudo apt update && sudo apt upgrade -y
sudo apt-get install -y build-essential curl automake autoconf libtool rpl mc git redis-server
```

### Configuration de PostgreSQL

Ajoutez le dépôt PostgreSQL et installez-le :

```
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O - | sudo apt-key add -
sudo apt update && sudo apt install -y postgresql postgresql-contrib libpq-dev
```

Créez l'utilisateur et la base de données. Utilisez un mot de passe fort au lieu de l'exemple ci-dessous :

```
su postgres -c psql
CREATE ROLE adamant LOGIN PASSWORD 'HardPass111';
CREATE DATABASE adamant_main;
ALTER DATABASE adamant_main OWNER TO adamant;
\q
```

### Créer un utilisateur système

```
adduser adamant
sudo usermod -aG sudo adamant
su - adamant
```

### Installer Node.js et PM2

Installez nvm, puis Node.js LTS (Hydrogen/v18), puis PM2 comme gestionnaire de processus :

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```

Déconnectez-vous puis reconnectez-vous pour que nvm prenne effet, puis :

```
nvm i --lts=hydrogen
npm install -g pm2
```

### Cloner et configurer ADAMANT

```
git clone https://github.com/Adamant-im/adamant
cd adamant
npm i
cp default.config.json config.json
nano config.json
```

Dans `config.json`, définissez le mot de passe de la base de données pour qu'il corresponde à celui que vous avez créé précédemment. Définissez `api/access/public` sur `true` si vous souhaitez un accès API externe (active le serveur web pour les appels API). Définissez `consoleLogLevel` sur `error` pour des journaux plus propres.

### Optionnel : Image du blockchain

Télécharger une image pré-construite du blockchain permet d'économiser du temps de synchronisation, mais nécessite de faire confiance à la source. Ne pas le faire implique une vérification complète de chaque transaction, ce qui peut prendre plusieurs jours mais prouve la cohérence de la chaîne.

```
pm2 stop adamant
wget https://explorer.adamant.im/db_backup.sql.gz
gunzip db_backup.sql.gz
psql adamant_main < db_backup.sql
```

Si vous avez déjà enregistré un nœud avec cette base de données, supprimez-la et recréez-la d'abord à l'aide de `dropdb` et `createdb`.

## Exécution et vérification

Démarrez le nœud avec PM2, qui exécute le processus en arrière-plan et le redémarre automatiquement en cas de panne :

```
cd /home/adamant/adamant && pm2 start --name adamant app.js
```

Vérifiez l'état avec `pm2 show adamant` — il doit être `online`. Interrogez la hauteur du blockchain :

```
curl -k -X GET http://localhost:36666/api/blocks/getHeight
```

Au démarrage, la hauteur est `1` et augmente pendant la synchronisation. Lorsque la synchronisation est terminée, la hauteur correspond à celle des autres nœuds du réseau. Consultez les journaux avec `pm2 logs adamant` en cas de problème. Vous pouvez également vérifier que votre nœud apparaît sur le moniteur du réseau ADAMANT en recherchant votre adresse IP.

## Activer l'API publique

L'API publique permet aux applications ADAMANT Messenger de se connecter à votre nœud. L'API interne (localhost) est activée par défaut. Pour autoriser l'accès externe, définissez `api/access/public` sur `true` dans `config.json`, puis redémarrez :

```
pm2 restart adamant
```

Vérifiez en ouvrant `http://<IP>:36666/api/blocks/getHeight` dans un navigateur.

## Arrêt et mise à jour

Arrêtez le nœud avec `pm2 stop adamant`. Pour mettre à jour :

```
su - adamant
cd adamant
pm2 stop adamant
git pull
npm update
pm2 restart adamant
```

## Démarrage automatique au redémarrage

Ajoutez une entrée crontab en tant qu'utilisateur `adamant` pour que le nœud redémarre après un redémarrage du VPS :

```
crontab -e
```

```
@reboot cd /home/adamant/adamant && pm2 start --name adamant app.js
```

Sinon, `pm2 save` et `pm2 startup` offrent un mécanisme de démarrage automatique plus fiable.

## Récupération

Si un nœud perd sa synchronisation et redémarre à la hauteur 0 — généralement à cause d'erreurs matérielles ou d'un espace disque insuffisant — utilisez le script de récupération pour restaurer à partir d'une image du blockchain. Cela est particulièrement utile pour les délégués en forging qui doivent reprendre rapidement l'activité :

```
sudo bash -c "$(wget -O - https://adamant.im/fix_node.sh)" -O -n mainnet
```

Sinon, suivez les étapes manuelles décrites ci-dessus pour charger une image du blockchain.
