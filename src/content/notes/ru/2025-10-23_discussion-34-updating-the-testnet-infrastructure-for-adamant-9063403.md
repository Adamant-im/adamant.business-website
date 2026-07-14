---
title: "Обновление инфраструктуры тестовой сети для ADAMANT"
slug: "discussion-34-updating-the-testnet-infrastructure-for-adamant-9063403"
description: "ADAMANT определил задачу по улучшению инфраструктуры (Issue 148) для обновления и стабилизации тестовой сети. Здоровая тестовая сеть необходима для надёжной разработки блокчейна."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/34"
publishedAt: "2025-10-23T15:40:31Z"
author: "al-onyxprotocol"
authorUrl: "https://github.com/al-onyxprotocol"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:9063403"
locale: "ru"
placeholder: false
---

ADAMANT определил задачу по улучшению инфраструктуры (Issue #148) для обновления и стабилизации среды тестовой сети. Здоровая тестовая сеть необходима для надёжной разработки блокчейна, обеспечивая реалистичное тестирование и ввод новых участников в проект.

## Что доступно

Теперь доступна **загрузочная копия** базы данных тестовой сети для скачивания по адресу `https://testnet.adamant.im/db_test_backup.sql.gz`. Это позволяет разработчикам быстро развернуть узел тестовой сети без синхронизации с нуля.

Тестовые монеты ADM (3500 ADM) можно запросить через тот же кран, что и для основной сети, по адресу `https://adamant.im/free-adm-tokens/`. Приложение тестовой сети ADAMANT Messenger с веткой разработки доступно по адресу `https://dev-adamant-testnet.surge.sh/`, а обозреватель блоков тестовой сети — по адресу `https://testnet.adamant.im/`.

Список публичных узлов тестовой сети поддерживается в файле конфигурации по умолчанию на GitHub: `https://github.com/Adamant-im/adamant/blob/dev/test/config.default.json`.

Полные детали реализации доступны в оригинальной статье по адресу `https://news.adamant.im/updating-the-testnet-infrastructure-for-adamant-aac36fea2a56`.
