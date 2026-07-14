---
title: "Cómo instalar un nodo ADAMANT en macOS"
slug: "how-to-install-an-adamant-node-on-macos-cfdcb9434b9a"
description: "Esta guía cubre la instalación y ejecución desde cero de un nodo de blockchain de ADAMANT Messenger en macOS, incluyendo herramientas de desarrollo, PostgreSQL, Node.js y configuración de inicio automático."
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
locale: "es"
placeholder: false
---

Esta guía cubre la instalación y ejecución de un **nodo de blockchain de ADAMANT Messenger** desde cero en **macOS**, incluyendo herramientas de desarrollo, PostgreSQL, Node.js y la configuración de inicio automático tras reiniciar.

Probado en macOS 13 Ventura y versiones posteriores. Tipo de nodo: `mainnet` o `testnet`. Tiempo requerido: ~15–30 minutos.

Ejecutar un nodo ADAMANT respalda una blockchain completamente descentralizada y centrada en la privacidad que impulsa ADAMANT Messenger. Fortalece la red, brinda acceso directo a los datos de la blockchain y permite obtener recompensas dPoS si se convierte en validador/delegado.

### Requisitos previos

Necesita una Mac con macOS 13 (Ventura) o posterior, una cuenta de usuario administrador, una conexión a internet estable, aproximadamente 50 GB de espacio libre en disco y cierta comodidad con Terminal. Abra Terminal presionando `Cmd + Espacio`, escribiendo `Terminal` y presionando Enter.

### Instalar herramientas de línea de comandos de Apple

Las herramientas de desarrollo de Apple son necesarias para compilar código y usar Git:

```bash
xcode-select --install
```

Aparecerá un cuadro de diálogo solicitando confirmación de la instalación. Acepte y espere a que finalice.

### Instalar Homebrew

Homebrew es un gestor de paquetes para macOS que se usa para instalar PostgreSQL y otras dependencias:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

![Cómo instalar un nodo ADAMANT en macOS](/images/engineering-notes/medium/cfdcb9434b9a/002-1-vp1mtcppml-dgtygq6vb9q-png.webp)

Confirme con la tecla *Enter*. Tras la instalación, siga las instrucciones mostradas en la sección "Next steps" (normalmente agregar Homebrew a su configuración del shell como `~/.zprofile` o `~/.bash_profile`). Recargue su shell:

```bash
source ~/.zprofile  # or ~/.bash_profile depending on your shell
```

### Instalar paquetes necesarios

Instale PostgreSQL, Redis, Git y otras herramientas necesarias:

```bash
brew install postgresql redis git make automake autoconf libtool jq htop
```

Inicie y habilite PostgreSQL y Redis:

```bash
brew services start postgresql
brew services start redis
```

### Configurar la base de datos PostgreSQL

Cree un usuario y una base de datos PostgreSQL para ADAMANT:

```bash
# Customize these as needed
DB_USER=adamant
DB_NAME=adamant_main
DB_PASSWORD=securepassword

psql postgres -c "CREATE ROLE $DB_USER LOGIN PASSWORD '$DB_PASSWORD';"
psql postgres -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;"
```

### Instalar NVM y Node.js

Instale Node Version Manager (NVM) y Node.js 22 LTS (nombre clave Jod):

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.nvm/nvm.sh
nvm install 22
```

Instale *pm2* (gestor de procesos de Node.js):

```bash
npm install -g pm2
```

Configure la rotación de registros de *pm2* (opcional pero recomendado):

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 500M
pm2 set pm2-logrotate:retain 5
pm2 set pm2-logrotate:compress true
pm2 set pm2-logrotate:rotateInterval '0 0 0 1 *'
```

### Clonar y configurar el nodo ADAMANT

Para una configuración organizada, use el directorio `~/Applications` (una carpeta personal en su directorio de inicio, no la carpeta global `/Applications`):

```bash
mkdir -p ~/Applications
cd ~/Applications
```

Clone el repositorio ADAMANT desde GitHub:

```bash
# Customize these as needed
NETWORK=mainnet   # or testnet
BRANCH=master     # or desired Git branch

git clone https://github.com/Adamant-im/adamant --branch $BRANCH
cd adamant
npm install
```

![Cómo instalar un nodo ADAMANT en macOS](/images/engineering-notes/medium/cfdcb9434b9a/003-1-rtjskr-1lfxqntzxxg2h-q-png.webp)

Configure el archivo de configuración del nodo ADM:

```bash
cp config.default.json config.json
sed -i '' "s/\"password\": \"password\"/\"password\": \"$DB_PASSWORD\"/" config.json
```

Esto copia la configuración predeterminada a su propia carpeta y establece la contraseña de la base de datos que definió anteriormente. También puede editar manualmente la configuración con `nano config.json`.

Para un nodo de **testnet**, use estos comandos en su lugar:

```bash
cp test/config.default.json test/config.json
sed -i '' "s/\"password\": \"password\"/\"password\": \"$DB_PASSWORD\"/" test/config.json
```

### Descargar una instantánea de la blockchain (opcional, solo mainnet)

Si desea apoyar la descentralización completa, omita este paso. De lo contrario, descargar una instantánea acelera significativamente la sincronización de la blockchain:

```bash
curl -O https://explorer.adamant.im/db_backup.sql.gz
gunzip db_backup.sql.gz
psql $DB_NAME < db_backup.sql
rm db_backup.sql
```

Esto puede tardar hasta 20 minutos, pero ahorra aproximadamente una semana de tiempo de sincronización.

### Ejecutar el nodo ADM

Primero, ejecute temporalmente el nodo en Terminal para verificar que todo funcione:

```bash
node app.js
```

Si tiene éxito, verá la salida de inicio y la sincronización de la blockchain con la altura del nodo aumentando:

![Cómo instalar un nodo ADAMANT en macOS](/images/engineering-notes/medium/cfdcb9434b9a/004-1-fclr7waeepraklxpmforsg-png.webp)

![Cómo instalar un nodo ADAMANT en macOS](/images/engineering-notes/medium/cfdcb9434b9a/005-1-cewqr7pjxjoxwgic-kw4cg-png.webp)

Detenga el nodo con `Ctrl + C`, luego inícielo con *pm2* para que continúe ejecutándose tras cerrar Terminal:

```shell
# Mainnet
pm2 start --name adamant app.js

# Or, for testnet
# pm2 start --name adamanttest app.js -- --config test/config.json --genesis test/genesisBlock.json
```

![Cómo instalar un nodo ADAMANT en macOS](/images/engineering-notes/medium/cfdcb9434b9a/006-1-yamwpxe0isnydfrzhcujg-png.webp)

Guarde la lista de procesos de *pm2*:

```bash
pm2 save
```

Verifique que esté en ejecución:

```bash
pm2 logs adamant
```

![Cómo instalar un nodo ADAMANT en macOS](/images/engineering-notes/medium/cfdcb9434b9a/007-1-d8em6reqerk-q53fjdwb-q-png.webp)

### Reiniciar el nodo tras reiniciar macOS

Para reiniciar automáticamente el nodo ADAMANT tras un reinicio del Mac, tiene dos opciones.

**Opción 1: Inicio manual tras reiniciar.** Cada vez que su Mac se reinicie, ejecute:

```bash
source ~/.nvm/nvm.sh
pm2 resurrect
```

Puede automatizar esto agregando las líneas a su perfil del shell (por ejemplo, `~/.zprofile`):

```bash
echo 'source ~/.nvm/nvm.sh && pm2 resurrect' >> ~/.zprofile
```

**Opción 2: Inicio automático con `pm2 startup`.** El comando *pm2 startup* podría no funcionar sin problemas con la Protección de Integridad del Sistema (SIP) de macOS. En su lugar, cree un servicio `launchd`:

```bash
pm2 startup launchd
```

Esto genera un comando como `sudo env PATH=$PATH:/Users/youruser/.nvm/versions/node/vXX.X.X/bin pm2 startup launchd -u youruser — hp /Users/youruser`. Ejecute este comando en Terminal, luego guarde la lista de procesos de pm2:

```bash
pm2 save
```

*pm2* ahora reiniciará automáticamente su nodo ADAMANT al arrancar. Para cancelar esto más adelante, ejecute `pm2 unstartup launchd`.

### Verificar instalación

Verifique el estado del proceso:

```bash
pm2 show adamant
```

Verifique la altura del bloque del nodo:

```bash
curl http://localhost:36666/api/blocks/getHeight
```

Obtenga el estado del nodo:

```bash
curl http://localhost:36666/api/node/status
```

Una respuesta con `"syncing":true` indica que el nodo aún no está completamente sincronizado. Espere a que finalice la sincronización completa de la blockchain. Usar una instantánea de blockchain hace que este proceso sea significativamente más rápido.

Para más referencia, consulte la [documentación del nodo ADAMANT](https://docs.adamant.im/).
