---
title: "ADAMANT ETH Transactions Storage v2.1"
slug: "release-eth-transactions-storage-v2-1-71343717"
description: "Этот релиз уменьшает количество запросов к узлу Ethereum и добавляет логирование. Исправлены подключения по IPC и к базе данных."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/ETH-transactions-storage/releases/tag/v2.1"
publishedAt: "2022-07-06T08:00:44Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "ETH-transactions-storage"
tag: "v2.1"
prerelease: false
cardSpan: "half"
originalId: "github-release:ETH-transactions-storage:71343717"
locale: "ru"
placeholder: false
---

Этот технический релиз для инструмента ETH-transactions-storage уменьшает количество запросов к узлу Ethereum и добавляет расширенное логирование по всему приложению. Исправлено подключение IPC к узлу Ethereum, а также подключение к базе данных, что повышает общую надёжность.

Добавлена новая переменная окружения `LOG_FILE`, позволяющая администраторам настраивать путь для записи логов. В комплект теперь входят два вспомогательных скрипта: `ethtest.py` для проверки подключения к узлу Ethereum и `pgtest.py` для проверки подключения к базе данных PostgreSQL. Эти скрипты упрощают диагностику проблем с подключением при развертывании.
