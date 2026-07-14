---
title: "Как запустить ноду ADAMANT на Windows"
slug: "how-to-run-adamant-node-on-windows-ee057e6e80d5"
description: "Начиная с Windows 10 версии 1903 и Windows Server 2019, Microsoft включает WSL 2, что позволяет запускать ноду ADAMANT на домашнем компьютере."
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
locale: "ru"
placeholder: false
---

Начиная с Windows 10 версии 1903 и Windows Server 2019, Microsoft включает WSL 2 (Windows Subsystem for Linux), который позволяет запускать Linux-приложения на Windows. Это означает, что вы можете запустить ноду ADAMANT на своём домашнем компьютере, включая функции делегата или пула форжинга.

### Системные требования

Вам понадобится Windows 10 x64 (версия 1903 / сборка 18362 или выше) или Windows Server 2019, не менее 4 ГБ ОЗУ и 50 ГБ свободного места на диске. Технология виртуализации должна быть включена в BIOS вашего компьютера перед установкой.

### Настройка WSL 2

Следуйте [официальной инструкции по установке WSL 2](https://docs.microsoft.com/en-us/windows/wsl/install-win10#manual-installation-steps). Если вы не используете Microsoft Store, вы можете [вручную скачать Ubuntu](https://docs.microsoft.com/en-us/windows/wsl/install-manual); подойдут Ubuntu 16, 18 или 20.

![Как запустить ноду ADAMANT на Windows](/images/engineering-notes/medium/ee057e6e80d5/002-0-d3n4-16cc9epoa-d.webp)

После установки создайте имя пользователя и пароль UNIX для дистрибутива Ubuntu. Например, установите имя пользователя *ubuntu*.

### Установка ноды ADAMANT

Теперь у вас есть подсистема Ubuntu, работающая на Windows, которая ведёт себя как виртуальная машина. Установите ноду ADAMANT, следуя стандартной [инструкции для Ubuntu](https://medium.com/adamant-im/how-to-run-your-adamant-node-on-ubuntu-990e391e8fcc).

![Как запустить ноду ADAMANT на Windows](/images/engineering-notes/medium/ee057e6e80d5/003-0-jj5gjxvimq-cagrf.webp)

Сразу после установки процесс *Vmmem* (WSL 2) может потреблять много оперативной памяти, поскольку скрипт установки загружает свежий образ блокчейна, а подсистема Linux кэширует его в памяти. Потребление памяти значительно снижается после перезагрузки компьютера.

### Запуск ноды после перезагрузки

Закрытие окна Ubuntu не останавливает ноду; подсистема Linux продолжает работать в фоновом режиме. Если компьютер переходит в спящий режим, нода возобновит работу при пробуждении и догонит текущую высоту блокчейна. Однако после полной перезагрузки компьютера ноду необходимо запустить вручную.

Откройте терминал Ubuntu или подключитесь из PowerShell:

```
wsl
```

Если у вас установлено несколько дистрибутивов Linux, укажите версию:

```
wsl -d Ubuntu-18.04
```

После подключения запустите PostgreSQL, переключитесь на пользователя *adamant* и запустите ноду:

```
sudo service postgresql start
su - adamant
cd /home/adamant/adamant && pm2 start --name adamant app.js
```

Проверьте, что нода работает и увеличивает высоту блокчейна:

```
curl http://localhost:36666/api/blocks/getHeight
```

Ноде требуется некоторое время, чтобы догнать текущую высоту блокчейна. Вы можете настроить автозапуск при перезагрузке, если обладаете знаниями системного администрирования; за инструкцией обратитесь к [этому ответу на Ask Ubuntu](https://askubuntu.com/a/1166012).

### Доступ к API

Из терминала Ubuntu и из Windows вы можете получить доступ к API ноды через *localhost*. Откройте браузер и перейдите по адресу `http://localhost:36666/api/blocks/getHeight`. Для доступа к API с другого компьютера требуется дополнительная настройка сети.
