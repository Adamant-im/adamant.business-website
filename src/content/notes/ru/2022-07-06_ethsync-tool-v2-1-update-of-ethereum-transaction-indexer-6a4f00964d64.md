---
title: "EthSync Tool v2.1: обновление индексатора транзакций Ethereum"
slug: "ethsync-tool-v2-1-update-of-ethereum-transaction-indexer-6a4f00964d64"
description: "Инструмент EthSync индексирует транзакции Ethereum и ERC20 по адресу, обеспечивая историю кошелька, аналогичную обозревателям блоков, и работает как фоновая служба."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/ethsync-tool-v2-1-update-of-ethereum-transaction-indexer-6a4f00964d64"
publishedAt: "2022-07-06T15:40:23.802Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
cardSpan: "full"
originalId: "medium:6a4f00964d64"
locale: "ru"
placeholder: false
---

Инструмент EthSync индексирует транзакции Ethereum и ERC20 по адресу, обеспечивая историю кошелька, аналогичную обозревателям блоков, таким как Etherscan. Он работает как фоновая служба, подключающаяся к узлу Ethereum через HTTP, WebSocket или IPC API — совместима с Geth, Nethermind и другими стандартными узлами — сохраняет все транзакции в базе данных Postgres и предоставляет данные о транзакциях через API, работающее на основе postgrest.

Версия 2.1 включает несколько улучшений. Теперь скрипт получает все данные транзакций в одном запросе к узлу Ethereum и выполняет только один дополнительный запрос на каждую транзакцию для получения её статуса, что значительно снижает нагрузку на узел. Логирование было расширено, а новая переменная окружения `LOG_FILE` позволяет операторам указать необязательный путь к файлу для вывода логов; если она не задана, инструмент использует `StreamHandler`.

В этом выпуске также устранены проблемы с подключениями IPC и базой данных, которые наблюдались в более ранних версиях. Добавлены два новых тестовых скрипта: `ethtest.py` проверяет подключение к узлу Ethereum, а `pgtest.py` — подключение к базе данных Postgres, что упрощает диагностику при развёртывании.

Инструмент EthSync является частью открытого проекта ADAMANT и доступен бесплатно. Полная документация, инструкции по установке и примеры использования находятся в [Readme](https://github.com/Adamant-im/ETH-transactions-storage#indexer-for-ethereum-to-get-transaction-list-by-eth-address) проекта.
