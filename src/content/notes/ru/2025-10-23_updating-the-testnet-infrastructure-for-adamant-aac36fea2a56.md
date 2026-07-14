---
title: "Обновление инфраструктуры тестовой сети ADAMANT"
slug: "updating-the-testnet-infrastructure-for-adamant-aac36fea2a56"
description: "Зачем важна тестовая сеть, образ для быстрого запуска узла, публичные узлы и тестовые ADM"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/updating-the-testnet-infrastructure-for-adamant-aac36fea2a56"
publishedAt: "2025-10-23T15:31:46.542Z"
author: "Alex Web3"
authorUrl: "https://medium.com/@al.onyxprotocol"
sourceAccount: "al-onyx"
coverImage: "/images/engineering-notes/medium/aac36fea2a56/001-1-gpu744hucponr8ep2jojwa-png.webp"
cardSpan: "full"
originalId: "medium:aac36fea2a56"
locale: "ru"
placeholder: false
---

### Зачем важна тестовая сеть

Инфраструктура тестовой сети ADAMANT была отмечена в [Issue #148](https://github.com/Adamant-im/adamant/issues/148) как требующая обновления и стабилизации для лучшей поддержки разработки, тестирования и вклада сообщества. В ходе обсуждения выделились две приоритетные задачи: доступность, чтобы новые участники могли быстро запустить узел без сложной настройки, и стабильность, чтобы тестовые узлы надёжно отражали условия, близкие к производственным.

### Образ для загрузки тестовой сети ADM

Доступна снимок базы данных тестовой сети, который можно загрузить, чтобы быстро запустить новый узел, уже синхронизированный с текущим состоянием тестовой сети, что значительно сокращает время настройки.

После установки узла тестовой сети загрузите снимок:

```bash
wget https://testnet.adamant.im/db_test_backup.sql.gz
```

Распакуйте его:

```bash
gunzip db_test_backup.sql.gz
```

Загрузите образ в базу данных узла тестовой сети:

```bash
psql adamant_test < db_test_backup.sql
```

### Публичные узлы тестовой сети

Тестовая сеть ADAMANT предоставляет предопределённый список публичных узлов для обнаружения пиеров, синхронизации сети и доступа к API. Официальный источник — [файл конфигурации](https://github.com/Adamant-im/adamant/blob/dev/test/config.default.json) в репозитории. На момент написания в списке три узла, все на порту 36667:

```json
"list": [
  {
    "ip": "162.55.32.80",
    "port": 36667
  },
  {
    "ip": "81.0.247.181",
    "port": 36667
  },
  {
    "ip": "95.217.19.144",
    "port": 36667
  }
]
```

Первый узел (`testnode1.adamant.im`) также размещает обозреватель тестовой сети. Второй не имеет домена и имеет отключённый публичный API. Третий (`testnode3.adm.im`) предоставляет публичный API; например, `https://testnode3.adm.im/api/node/status` возвращает статус узла.

### Запуск тестов

Участники и валидаторы должны запускать модульные и API-тесты на своём узле в соответствии с [рекомендациями по участию](https://github.com/Adamant-im/adamant/blob/dev/.github/CONTRIBUTING.md) проекта.

### Запрос тестовых ADM и доступ к приложениям

Вы можете запросить 3500 тестовых ADM через тот же кран, что и для основной сети: [https://adamant.im/free-adm-tokens](https://adamant.im/free-adm-tokens/). Приложение тестовой сети доступно по адресу [https://dev-adamant-testnet.surge.sh](https://dev-adamant-testnet.surge.sh), автоматически собираемое из ветки dev. Обозреватель тестовой сети находится по адресу [https://testnet.adamant.im](https://testnet.adamant.im/).
