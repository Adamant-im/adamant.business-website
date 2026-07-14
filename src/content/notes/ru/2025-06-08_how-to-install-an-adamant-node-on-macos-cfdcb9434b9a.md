---
title: "Как установить ноду ADAMANT на macOS"
slug: "how-to-install-an-adamant-node-on-macos-cfdcb9434b9a"
description: "Это руководство охватывает установку и запуск ноды блокчейна ADAMANT Messenger с нуля на macOS, включая инструменты разработки, PostgreSQL, Node.js и настройку автозапуска."
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
locale: "ru"
placeholder: false
---

Это руководство охватывает установку и запуск **ноды блокчейна ADAMANT Messenger** с нуля на **macOS**, включая инструменты разработки, PostgreSQL, Node.js и настройку автозапуска после перезагрузки.

Проверено на macOS 13 Ventura и новее. Тип ноды: `mainnet` или `testnet`. Время выполнения: ~15–30 минут.

Запуск ноды ADAMANT поддерживает полностью децентрализованный, ориентированный на приватность блокчейн, лежащий в основе ADAMANT Messenger. Это укрепляет сеть, обеспечивает прямой доступ к данным блокчейна и позволяет получать вознаграждения по модели dPoS, если вы станете валидатором/делегатом.

### Предварительные требования

Вам понадобится Mac с macOS 13 (Ventura) или новее, учётная запись пользователя с правами администратора, стабильное интернет-соединение, около 50 ГБ свободного места на диске и базовые навыки работы с Терминалом. Откройте Терминал, нажав `Cmd + Space`, введите `Terminal` и нажмите Enter.

### Установка инструментов командной строки от Apple

Для компиляции кода и использования Git требуются инструменты разработчика от Apple:

```bash
xcode-select --install
```

Появится всплывающее окно с запросом подтверждения установки. Подтвердите и дождитесь завершения.

### Установка Homebrew

Homebrew — это менеджер пакетов для macOS, используемый для установки PostgreSQL и других зависимостей:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

![Как установить ноду ADAMANT на macOS](/images/engineering-notes/medium/cfdcb9434b9a/002-1-vp1mtcppml-dgtygq6vb9q-png.webp)

Подтвердите нажатием клавиши *Enter*. После установки выполните инструкции из раздела "Next steps" (обычно это добавление Homebrew в конфигурацию вашей оболочки, например, `~/.zprofile` или `~/.bash_profile`). Перезагрузите оболочку:

```bash
source ~/.zprofile  # or ~/.bash_profile depending on your shell
```

### Установка необходимых пакетов

Установите PostgreSQL, Redis, Git и другие необходимые инструменты:

```bash
brew install postgresql redis git make automake autoconf libtool jq htop
```

Запустите и включите автозагрузку PostgreSQL и Redis:

```bash
brew services start postgresql
brew services start redis
```

### Настройка базы данных PostgreSQL

Создайте пользователя и базу данных PostgreSQL для ADAMANT:

```bash
# Customize these as needed
DB_USER=adamant
DB_NAME=adamant_main
DB_PASSWORD=securepassword

psql postgres -c "CREATE ROLE $DB_USER LOGIN PASSWORD '$DB_PASSWORD';"
psql postgres -c "CREATE DATABASE $DB_NAME OWNER $DB_USER;"
```

### Установка NVM и Node.js

Установите Node Version Manager (NVM) и Node.js 22 LTS (кодовое имя Jod):

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
source ~/.nvm/nvm.sh
nvm install 22
```

Установите *pm2* (менеджер процессов Node.js):

```bash
npm install -g pm2
```

Настройте ротацию логов *pm2* (опционально, но рекомендуется):

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 500M
pm2 set pm2-logrotate:retain 5
pm2 set pm2-logrotate:compress true
pm2 set pm2-logrotate:rotateInterval '0 0 0 1 *'
```

### Клонирование и настройка ноды ADAMANT

Для удобства используйте каталог `~/Applications` (личную папку в вашей домашней директории, а не системный `/Applications`):

```bash
mkdir -p ~/Applications
cd ~/Applications
```

Склонируйте репозиторий ADAMANT с GitHub:

```bash
# Customize these as needed
NETWORK=mainnet   # or testnet
BRANCH=master     # or desired Git branch

git clone https://github.com/Adamant-im/adamant --branch $BRANCH
cd adamant
npm install
```

![Как установить ноду ADAMANT на macOS](/images/engineering-notes/medium/cfdcb9434b9a/003-1-rtjskr-1lfxqntzxxg2h-q-png.webp)

Настройте конфигурационный файл ноды ADM:

```bash
cp config.default.json config.json
sed -i '' "s/\"password\": \"password\"/\"password\": \"$DB_PASSWORD\"/" config.json
```

Эта команда копирует конфигурацию по умолчанию и вводит пароль от базы данных, который вы задали ранее. Вы также можете отредактировать конфигурацию вручную с помощью `nano config.json`.

Для ноды **testnet** используйте вместо этого следующие команды:

```bash
cp test/config.default.json test/config.json
sed -i '' "s/\"password\": \"password\"/\"password\": \"$DB_PASSWORD\"/" test/config.json
```

### Загрузка снапшота блокчейна (опционально, только для mainnet)

Если вы хотите поддержать полную децентрализацию, пропустите этот шаг. В противном случае загрузка снапшота значительно ускорит синхронизацию блокчейна:

```bash
curl -O https://explorer.adamant.im/db_backup.sql.gz
gunzip db_backup.sql.gz
psql $DB_NAME < db_backup.sql
rm db_backup.sql
```

Это может занять до 20 минут, но сэкономит около недели времени синхронизации.

### Запуск ноды ADM

Сначала запустите ноду временно в Терминале, чтобы убедиться, что всё работает:

```bash
node app.js
```

При успешном запуске вы увидите вывод процесса старта и синхронизацию блокчейна с увеличением высоты блока:

![Как установить ноду ADAMANT на macOS](/images/engineering-notes/medium/cfdcb9434b9a/004-1-fclr7waeepraklxpmforsg-png.webp)

![Как установить ноду ADAMANT на macOS](/images/engineering-notes/medium/cfdcb9434b9a/005-1-cewqr7pjxjoxwgic-kw4cg-png.webp)

Остановите ноду с помощью `Ctrl + C`, затем запустите её через *pm2*, чтобы она продолжала работать после закрытия Терминала:

```shell
# Mainnet
pm2 start --name adamant app.js

# Or, for testnet
# pm2 start --name adamanttest app.js -- --config test/config.json --genesis test/genesisBlock.json
```

![Как установить ноду ADAMANT на macOS](/images/engineering-notes/medium/cfdcb9434b9a/006-1-yamwpxe0isnydfrzhcujg-png.webp)

Сохраните список процессов *pm2*:

```bash
pm2 save
```

Проверьте, что нода запущена:

```bash
pm2 logs adamant
```

![Как установить ноду ADAMANT на macOS](/images/engineering-notes/medium/cfdcb9434b9a/007-1-d8em6reqerk-q53fjdwb-q-png.webp)

### Перезапуск ноды после перезагрузки macOS

Чтобы автоматически перезапускать ноду ADAMANT после перезагрузки Mac, у вас есть два варианта.

**Вариант 1: Ручной запуск после перезагрузки.** Каждый раз после перезагрузки Mac выполните:

```bash
source ~/.nvm/nvm.sh
pm2 resurrect
```

Вы можете автоматизировать это, добавив строки в профиль вашей оболочки (например, `~/.zprofile`):

```bash
echo 'source ~/.nvm/nvm.sh && pm2 resurrect' >> ~/.zprofile
```

**Вариант 2: Автоматический запуск с помощью `pm2 startup`.** Команда *pm2 startup* может некорректно работать с Защитой целостности системы macOS (SIP). Вместо этого создайте службу `launchd`:

```bash
pm2 startup launchd
```

Это выведет команду вида `sudo env PATH=$PATH:/Users/youruser/.nvm/versions/node/vXX.X.X/bin pm2 startup launchd -u youruser — hp /Users/youruser`. Выполните её в Терминале, затем сохраните список процессов pm2:

```bash
pm2 save
```

Теперь *pm2* будет автоматически перезапускать вашу ноду ADAMANT при загрузке. Чтобы отменить это позже, выполните `pm2 unstartup launchd`.

### Проверка установки

Проверьте статус процесса:

```bash
pm2 show adamant
```

Проверьте высоту блока ноды:

```bash
curl http://localhost:36666/api/blocks/getHeight
```

Получите статус ноды:

```bash
curl http://localhost:36666/api/node/status
```

Ответ с параметром `"syncing":true` означает, что нода ещё не полностью синхронизирована. Дождитесь завершения полной синхронизации блокчейна. Использование снапшота блокчейна значительно ускоряет этот процесс.

Для дополнительной информации см. [документацию по ноде ADAMANT](https://docs.adamant.im/).
