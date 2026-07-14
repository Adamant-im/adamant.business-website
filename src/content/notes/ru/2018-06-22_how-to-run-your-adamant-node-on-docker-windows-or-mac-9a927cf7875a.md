---
title: "Как запустить ваш ADAMANT-нод на Docker (Windows или Mac)"
slug: "how-to-run-your-adamant-node-on-docker-windows-or-mac-9a927cf7875a"
description: "Примечание: образ Docker может быть устаревшим; вместо этого рекомендуется запускать ноду ADAMANT на сервере Ubuntu. ADAMANT использует Delegated Proof of Stake (dPoS) для консенсуса блокчейна…"
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
locale: "ru"
placeholder: false
---

Примечание: образ Docker может быть устаревшим; вместо этого рекомендуется запускать ноду ADAMANT на сервере Ubuntu. ADAMANT использует Delegated Proof of Stake (dPoS) для консенсуса блокчейна, и запуск собственной ноды способствует децентрализации сети.

Это руководство объясняет, как установить, запустить и обновить ноду ADAMANT на Windows, macOS или Linux с использованием Docker. В примере используется Windows 10, для которой требуется 64-разрядная версия Windows 10 Pro, Enterprise или Education (сборка 14393 или новее). На хост-машине должно быть не менее 4 ГБ ОЗУ и 50 ГБ свободного дискового пространства, в зависимости от текущей высоты блока.

Чтобы установить Docker, скачайте бесплатную версию Docker Community Edition и запустите установщик. Следуйте инструкциям мастера установки, примите лицензионное соглашение и авторизуйте установщик с помощью пароля системы, который необходим для сетевых компонентов и виртуальных машин Hyper-V. После установки запустите Docker через меню «Пуск». Как только значок кита в строке состояния станет постоянным, Docker запущен. Вам также необходимо предоставить доступ к локальному диску для Docker: щелкните правой кнопкой мыши по значку в строке состояния, выберите Settings, установите флажок у общего диска и примените изменения.

![Как запустить ваш ADAMANT-нод на Docker (Windows или Mac)](/images/engineering-notes/medium/9a927cf7875a/002-0-lyckrpled-5lr7hl.webp)

![Как запустить ваш ADAMANT-нод на Docker (Windows или Mac)](/images/engineering-notes/medium/9a927cf7875a/003-0-6akvfvvlkcfe7829.webp)

![Как запустить ваш ADAMANT-нод на Docker (Windows или Mac)](/images/engineering-notes/medium/9a927cf7875a/004-0-a86t6y8gjz9oxrpc.webp)

Чтобы установить ноду ADAMANT, сначала установите клиент Git с параметрами по умолчанию. Откройте Microsoft PowerShell и клонируйте репозиторий:

```bash
git clone https://github.com/Adamant-im/adamant-docker
cd adamant-docker
```

![Как запустить ваш ADAMANT-нод на Docker (Windows или Mac)](/images/engineering-notes/medium/9a927cf7875a/005-0-fgfme0jdbid9yncf.webp)

Чтобы запустить ноду, загрузите необходимые образы Docker:

```bash
docker-compose pull
```

![Как запустить ваш ADAMANT-нод на Docker (Windows или Mac)](/images/engineering-notes/medium/9a927cf7875a/006-0-aivqroqzrjyhguqd.webp)

Запустите службу базы данных и убедитесь, что она успешно запущена:

```bash
docker-compose up -d db
docker-compose logs
```

![Как запустить ваш ADAMANT-нод на Docker (Windows или Mac)](/images/engineering-notes/medium/9a927cf7875a/007-0-papyajoh0cxgai9i.webp)

Далее запустите службу adamant-node и проверьте логи, чтобы подтвердить успешный запуск:

```bash
docker-compose up -d adamant-node
```

![Как запустить ваш ADAMANT-нод на Docker (Windows или Mac)](/images/engineering-notes/medium/9a927cf7875a/008-0-5juodmupmzrre2n1.webp)

Вы можете остановить все запущенные службы с помощью `docker-compose stop` и перезапустить их позже с помощью `docker-compose start`.

![Как запустить ваш ADAMANT-нод на Docker (Windows или Mac)](/images/engineering-notes/medium/9a927cf7875a/009-0-hrzlp4aniigch2fc.webp)

Проверьте установку, просмотрев лог приложения ноды:

```bash
docker-compose logs --tail=10 adamant-node
```

![Как запустить ваш ADAMANT-нод на Docker (Windows или Mac)](/images/engineering-notes/medium/9a927cf7875a/010-0-v8ofli8bjy-hqo2b.webp)

Аргумент `--tail=10` ограничивает вывод последними 10 строками лога. Чтобы убедиться, что нода подключена к блокчейну ADAMANT, посетите монитор сети ADAMANT и найдите свою ноду по IP-адресу. Появление ноды может занять несколько минут. Новая нода будет отображать высоту блока 1 во время синхронизации, которая может занять до суток в зависимости от подключения и CPU.

![Как запустить ваш ADAMANT-нод на Docker (Windows или Mac)](/images/engineering-notes/medium/9a927cf7875a/011-0-74skpvuswckotzf6.webp)

Чтобы проверить высоту напрямую, получите идентификатор контейнера с помощью `docker ps`, затем запросите API ноды:

```bash
docker ps
docker exec <container_id> curl -k -X GET http://localhost:36666/api/blocks/getHeight
```

![Как запустить ваш ADAMANT-нод на Docker (Windows или Mac)](/images/engineering-notes/medium/9a927cf7875a/012-0-osgtdu-u6daibuqi.webp)

Когда синхронизация завершится, высота будет соответствовать другим нодам в сети. Чтобы обновить ноду ADAMANT, откройте PowerShell и выполните следующие команды:

```bash
cd adamant-docker
docker-compose stop
docker-compose pull
docker-compose down
docker-compose up -d db
docker-compose up -d adamant-node
```

![Как запустить ваш ADAMANT-нод на Docker (Windows или Mac)](/images/engineering-notes/medium/9a927cf7875a/013-0-l5hbgju9qlgr65sw.webp)
