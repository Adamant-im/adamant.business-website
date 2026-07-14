---
title: "Уведомления через ADAMANT"
slug: "notify-via-adamant-e6116f7e55cc"
description: "ADAMANT подходит для уведомлений: доставка подтверждается в блокчейне, сообщения неизменяемы, хранение неограниченно, доступ не привязан к устройству."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/notify-via-adamant-e6116f7e55cc"
publishedAt: "2019-06-02T14:22:43.887Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/e6116f7e55cc/001-1-8rvans74h-cl-ux-bpeiaw-png.webp"
cardSpan: "full"
originalId: "medium:e6116f7e55cc"
locale: "ru"
placeholder: false
---

ADAMANT обладает рядом свойств, делающих его подходящим транспортом для уведомлений: каждая доставка сообщения проверяется в блокчейне, сообщения и их порядок неизменяемы, срок хранения фактически неограничен, а доступ не привязан к конкретному устройству. Проект является open source. Практический пример — операторы криптовалютных пулов, получающие уведомления о работе пула через сообщения ADAMANT.

Разработчики могут интегрировать уведомления ADAMANT через три основных интерфейса. ADAMANT Console предоставляет команду `send message` и представляет собой инструмент командной строки, независимый от языка программирования. Для JavaScript-приложений функция `send` доступна в клиентской библиотеке ADAMANT API JS. Наконец, нативный узел ADAMANT предоставляет собственное API для прямой интеграции.

Содержимое сообщений поддерживает форматирование Markdown и использование Emoji, что позволяет создавать структурированные и удобочитаемые уведомления.
