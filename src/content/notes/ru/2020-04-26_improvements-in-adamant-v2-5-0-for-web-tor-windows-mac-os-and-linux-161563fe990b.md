---
title: "Улучшения в ADAMANT v2.5.0 для Web, Tor, Windows, Mac OS и Linux"
slug: "improvements-in-adamant-v2-5-0-for-web-tor-windows-mac-os-and-linux-161563fe990b"
description: "ADAMANT v2.5.0 включает улучшения и исправления для Web, Tor и десктопных приложений. Обновления касаются узлов, обменников, Markdown и безопасности."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/improvements-in-adamant-v2-5-0-for-web-tor-windows-mac-os-linux-161563fe990b"
publishedAt: "2020-04-26T17:21:28.135Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/161563fe990b/001-0-rzxpq8psh7gjckqp.webp"
cardSpan: "full"
originalId: "medium:161563fe990b"
locale: "ru"
placeholder: false
---

ADAMANT v2.5.0 включает ряд улучшений и исправлений для веб-, Tor- и десктоп-приложений. Как мессенджер на блокчейне, ADAMANT выигрывает от увеличения числа сетевых узлов, что способствует лучшей децентрализации. Веб-приложение теперь включает девять узлов: три типа HTTP и шесть — HTTPS. При использовании HTTPS-соединения доступны только узлы HTTPS, тогда как десктоп-приложения для Windows, macOS и Linux могут обращаться ко всем девяти узлам.

Обновление также обновило список бирж для покупки и продажи ADM: удалена IDCM, добавлена CoinDeal, а также обновлены ссылки для Resfinex и Bit-Z. Поддержка Markdown в ADAMANT улучшена — теперь моноширинные шрифты в блоках `code` отображаются корректно.

![Улучшения в ADAMANT v2.5.0 для Web, Tor, Windows, Mac OS и Linux](/images/engineering-notes/medium/161563fe990b/002-0-sqpbhli5aps7yqjd.webp)

В версии мессенджера для Tor устранена проблема с WebSocket-соединениями, что обеспечивает более быструю доставку сообщений.

![Улучшения в ADAMANT v2.5.0 для Web, Tor, Windows, Mac OS и Linux](/images/engineering-notes/medium/161563fe990b/003-0-fblaod14ec32orwh.webp)

Дополнительные технические улучшения в этом выпуске включают обновление зависимостей, проверку протокола узлов, исправления статусов узлов и подключений сокетов на HTTP-хостах. Также устранены проблемы со статичными именами чатов, проверкой вставленных адресов в потоке «Создать новый чат», а также генерацией QR-кодов для ADM-адресов в Windows и других приложениях. Улучшена локализация сообщений об ошибках «no public key» и «no hash».
