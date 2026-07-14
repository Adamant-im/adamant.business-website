---
title: "Ejecución de un nodo ADAMANT en Ubuntu o CentOS Linux"
slug: "how-to-run-adamant-node-on-ubuntu-or-centos-linux-990e391e8fcc"
description: "Ejecutar tu propio nodo fortalece la descentralización de la red y permite la creación de bloques como delegado. Instalación en Ubuntu 20–24 o CentOS 8."
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
locale: "es"
placeholder: false
---

## Información general

ADAMANT utiliza Fair dPoS (Delegated Proof of Stake) para el consenso de la blockchain. Ejecutar tu propio nodo fortalece la descentralización de la red y permite la creación de bloques como delegado. Esta guía cubre la instalación en Ubuntu 20–24 (preferido) o CentOS 8, aunque otros sistemas compatibles con Linux también podrían funcionar.

Se requiere un servidor o VPS con al menos 2 GB de RAM y 70 GB de espacio en disco (a partir de octubre de 2025 para mainnet).

## Instalación rápida

Para la configuración inicial, ejecuta el script de instalación con privilegios sudo. El script actualiza los paquetes del sistema operativo, crea un usuario de sistema `adamant`, instala PostgreSQL, Node.js y otras dependencias, configura el nodo ADAMANT y opcionalmente descarga una imagen de la blockchain. Se te pedirá que establezcas contraseñas para los usuarios de la base de datos y del sistema.

**Ubuntu:**

```
sudo bash -c "$(wget -O - https://adamant.im/install_node.sh)"
```

**CentOS:**

```
sudo bash <(curl -s https://adamant.im/install_node_centos.sh)
```

![Cómo ejecutar un nodo ADAMANT en Ubuntu o CentOS Linux](/images/engineering-notes/medium/990e391e8fcc/002-1-xzbcago0snmqw09cignfyq-png.webp)

Utiliza la herramienta `screen` para asegurarte de que la instalación finalice incluso si se pierde la conexión SSH. El proceso suele tardar entre 10 y 20 minutos.

Para testnet, añade las banderas adecuadas:

**Ubuntu:**

```
sudo bash -c "$(wget -O - https://adamant.im/install_node.sh)" -O -b dev -n testnet -j jod
```

**CentOS:**

```
sudo bash <(curl -s https://adamant.im/install_node_centos.sh) -b dev -n testnet -j jod
```

## Instalación manual (Ubuntu)

Estos pasos son para Ubuntu. En CentOS, utiliza comandos equivalentes o el script rápido anterior.

### Preparación del sistema

Actualiza el sistema e instala herramientas de compilación, git y Redis:

```
sudo apt update && sudo apt upgrade -y
sudo apt-get install -y build-essential curl automake autoconf libtool rpl mc git redis-server
```

### Configuración de PostgreSQL

Añade el repositorio de PostgreSQL e instálalo:

```
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O - | sudo apt-key add -
sudo apt update && sudo apt install -y postgresql postgresql-contrib libpq-dev
```

Crea el usuario de la base de datos y la base de datos. Usa una contraseña segura en lugar del ejemplo siguiente:

```
su postgres -c psql
CREATE ROLE adamant LOGIN PASSWORD 'HardPass111';
CREATE DATABASE adamant_main;
ALTER DATABASE adamant_main OWNER TO adamant;
\q
```

### Crear usuario del sistema

```
adduser adamant
sudo usermod -aG sudo adamant
su - adamant
```

### Instalar Node.js y PM2

Instala nvm, luego Node.js LTS (Hydrogen/v18), y después PM2 como gestor de procesos:

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```

Cierra sesión y vuelve a iniciarla para que nvm surta efecto, luego:

```
nvm i --lts=hydrogen
npm install -g pm2
```

### Clonar y configurar ADAMANT

```
git clone https://github.com/Adamant-im/adamant
cd adamant
npm i
cp default.config.json config.json
nano config.json
```

En `config.json`, establece la contraseña de la base de datos para que coincida con la que creaste anteriormente. Establece `api/access/public` en `true` si deseas acceso API externo (habilita el servidor web para llamadas API). Establece `consoleLogLevel` en `error` para tener registros más limpios.

### Opcional: imagen de la blockchain

Descargar una imagen preconstruida de la blockchain ahorra tiempo de sincronización, pero requiere confiar en la fuente. Omitirlo significa verificar completamente cada transacción, lo cual puede tardar varios días, pero demuestra la consistencia de la cadena.

```
pm2 stop adamant
wget https://explorer.adamant.im/db_backup.sql.gz
gunzip db_backup.sql.gz
psql adamant_main < db_backup.sql
```

Si previamente registraste un nodo contra esta base de datos, elimínala y vuelve a crearla primero usando `dropdb` y `createdb`.

## Ejecución y verificación

Inicia el nodo usando PM2, que bifurca el proceso en segundo plano y lo reinicia automáticamente en caso de fallo:

```
cd /home/adamant/adamant && pm2 start --name adamant app.js
```

Consulta el estado con `pm2 show adamant` — debería aparecer como `online`. Consulta la altura de la blockchain:

```
curl -k -X GET http://localhost:36666/api/blocks/getHeight
```

Al iniciar, la altura es `1` y aumenta conforme el nodo se sincroniza. Cuando finaliza la sincronización, la altura coincide con otros nodos de la red. Revisa los registros con `pm2 logs adamant` si surgen problemas. También puedes verificar que tu nodo aparezca en el monitor de red ADAMANT buscando tu dirección IP.

## Habilitar API pública

La API pública permite que las aplicaciones del mensajero ADAMANT se conecten a tu nodo. La API interna (localhost) está habilitada por defecto. Para habilitar acceso externo, establece `api/access/public` en `true` en `config.json`, luego reinicia:

```
pm2 restart adamant
```

Verifica abriendo `http://<IP>:36666/api/blocks/getHeight` en un navegador.

## Detener y actualizar

Detén el nodo con `pm2 stop adamant`. Para actualizar:

```
su - adamant
cd adamant
pm2 stop adamant
git pull
npm update
pm2 restart adamant
```

## Inicio automático al reiniciar

Añade una entrada en crontab como usuario `adamant` para que el nodo se reinicie tras un reinicio del VPS:

```
crontab -e
```

```
@reboot cd /home/adamant/adamant && pm2 start --name adamant app.js
```

Alternativamente, `pm2 save` y `pm2 startup` proporcionan un mecanismo de inicio automático más confiable.

## Recuperación

Si un nodo pierde sincronización y se reinicia desde la altura 0 —típicamente debido a errores de hardware o espacio en disco insuficiente—, utiliza el script de recuperación para restaurar desde una imagen de la blockchain. Esto es especialmente útil para delegados que crean bloques y necesitan volver rápidamente a operar:

```
sudo bash -c "$(wget -O - https://adamant.im/fix_node.sh)" -O -n mainnet
```

Alternativamente, sigue los pasos manuales descritos anteriormente para cargar una imagen de la blockchain.
