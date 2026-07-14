---
title: "Запуск ноды ADAMANT на Ubuntu или CentOS Linux"
slug: "how-to-run-adamant-node-on-ubuntu-or-centos-linux-990e391e8fcc"
description: "Руководство по установке ноды ADAMANT на Ubuntu или CentOS. Укрепите децентрализацию сети и участвуйте в форжинге как делегат."
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
locale: "ru"
placeholder: false
---

## Обзор

ADAMANT использует Fair dPoS (Delegated Proof of Stake) для консенсуса в блокчейне. Запуск собственной ноды укрепляет децентрализацию сети и позволяет участвовать в форжинге как делегату. В этом руководстве описывается установка на Ubuntu 20–24 (предпочтительно) или CentOS 8, хотя могут подойти и другие совместимые с Linux системы.

Требуется сервер или VPS с минимум 2 ГБ ОЗУ и 70 ГБ дискового пространства (по состоянию на октябрь 2025 года для мейннета).

## Быстрая установка

Для первоначальной настройки запустите скрипт установки с правами sudo. Скрипт обновляет пакеты ОС, создаёт системного пользователя `adamant`, устанавливает PostgreSQL, Node.js и другие зависимости, настраивает ноду ADAMANT и при необходимости загружает образ блокчейна. Вам будет предложено задать пароли для базы данных и системных пользователей.

**Ubuntu:**

```
sudo bash -c "$(wget -O - https://adamant.im/install_node.sh)"
```

**CentOS:**

```
sudo bash <(curl -s https://adamant.im/install_node_centos.sh)
```

![Как запустить ноду ADAMANT на Ubuntu или CentOS Linux](/images/engineering-notes/medium/990e391e8fcc/002-1-xzbcago0snmqw09cignfyq-png.webp)

Используйте инструмент `screen`, чтобы установка завершилась даже при разрыве SSH-соединения. Процесс обычно занимает 10–20 минут.

Для тестовой сети добавьте соответствующие флаги:

**Ubuntu:**

```
sudo bash -c "$(wget -O - https://adamant.im/install_node.sh)" -O -b dev -n testnet -j jod
```

**CentOS:**

```
sudo bash <(curl -s https://adamant.im/install_node_centos.sh) -b dev -n testnet -j jod
```

## Ручная установка (Ubuntu)

Эти шаги предназначены для Ubuntu. В CentOS используйте эквивалентные команды или приведённый выше быстрый скрипт.

### Подготовка системы

Обновите систему и установите инструменты сборки, git и Redis:

```
sudo apt update && sudo apt upgrade -y
sudo apt-get install -y build-essential curl automake autoconf libtool rpl mc git redis-server
```

### Настройка PostgreSQL

Добавьте репозиторий PostgreSQL и установите его:

```
sudo sh -c 'echo "deb http://apt.postgresql.org/pub/repos/apt/ `lsb_release -cs`-pgdg main" > /etc/apt/sources.list.d/pgdg.list'
wget -q https://www.postgresql.org/media/keys/ACCC4CF8.asc -O - | sudo apt-key add -
sudo apt update && sudo apt install -y postgresql postgresql-contrib libpq-dev
```

Создайте пользователя базы данных и саму базу. Используйте надёжный пароль вместо примера ниже:

```
su postgres -c psql
CREATE ROLE adamant LOGIN PASSWORD 'HardPass111';
CREATE DATABASE adamant_main;
ALTER DATABASE adamant_main OWNER TO adamant;
\q
```

### Создание системного пользователя

```
adduser adamant
sudo usermod -aG sudo adamant
su - adamant
```

### Установка Node.js и PM2

Установите nvm, затем Node.js LTS (Hydrogen/v18), затем PM2 в качестве менеджера процессов:

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
```

Выйдите и снова войдите, чтобы nvm начал работать, затем:

```
nvm i --lts=hydrogen
npm install -g pm2
```

### Клонирование и настройка ADAMANT

```
git clone https://github.com/Adamant-im/adamant
cd adamant
npm i
cp default.config.json config.json
nano config.json
```

В файле `config.json` установите пароль от базы данных, соответствующий созданному ранее. Установите `api/access/public` в значение `true`, если хотите разрешить внешний доступ к API (включает веб-сервер для API-запросов). Установите `consoleLogLevel` в значение `error` для более чистых логов.

### Дополнительно: образ блокчейна

Загрузка предварительно собранного образа блокчейна экономит время синхронизации, но требует доверия к источнику. Пропуск этого шага означает полную проверку каждой транзакции, что может занять несколько дней, но гарантирует целостность цепи.

```
pm2 stop adamant
wget https://explorer.adamant.im/db_backup.sql.gz
gunzip db_backup.sql.gz
psql adamant_main < db_backup.sql
```

Если ранее вы регистрировали ноду с этой базой данных, сначала удалите и создайте её заново с помощью `dropdb` и `createdb`.

## Запуск и проверка

Запустите ноду с помощью PM2, который запускает процесс в фоне и автоматически перезапускает его при сбоях:

```
cd /home/adamant/adamant && pm2 start --name adamant app.js
```

Проверьте статус с помощью `pm2 show adamant` — он должен быть `online`. Запросите высоту блокчейна:

```
curl -k -X GET http://localhost:36666/api/blocks/getHeight
```

При запуске высота равна `1` и увеличивается по мере синхронизации. Когда синхронизация завершится, высота будет соответствовать другим нодам в сети. Проверьте логи с помощью `pm2 logs adamant`, если возникнут проблемы. Вы также можете убедиться, что ваша нода отображается в мониторе сети ADAMANT, найдя свой IP-адрес.

## Включение публичного API

Публичный API позволяет приложениям ADAMANT Messenger подключаться к вашей ноде. Внутренний API (localhost) включён по умолчанию. Чтобы разрешить внешний доступ, установите `api/access/public` в значение `true` в файле `config.json`, затем перезапустите:

```
pm2 restart adamant
```

Проверьте, открыв `http://<IP>:36666/api/blocks/getHeight` в браузере.

## Остановка и обновление

Остановите ноду с помощью `pm2 stop adamant`. Чтобы обновить:

```
su - adamant
cd adamant
pm2 stop adamant
git pull
npm update
pm2 restart adamant
```

## Автозапуск при перезагрузке

Добавьте запись в crontab от имени пользователя `adamant`, чтобы нода перезапускалась после перезагрузки VPS:

```
crontab -e
```

```
@reboot cd /home/adamant/adamant && pm2 start --name adamant app.js
```

В качестве альтернативы `pm2 save` и `pm2 startup` обеспечивают более надёжный механизм автозапуска.

## Восстановление

Если нода теряет синхронизацию и перезапускается с высоты 0 — обычно из-за аппаратных ошибок или нехватки места на диске — используйте скрипт восстановления, чтобы восстановить данные из образа блокчейна. Это особенно полезно для делегатов, которым нужно быстро вернуться к работе:

```
sudo bash -c "$(wget -O - https://adamant.im/fix_node.sh)" -O -n mainnet
```

В качестве альтернативы выполните описанные выше ручные шаги по загрузке образа блокчейна.
