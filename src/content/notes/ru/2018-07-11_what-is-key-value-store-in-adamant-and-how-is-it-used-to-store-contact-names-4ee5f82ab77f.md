---
title: "Хранилище «ключ-значение» в ADAMANT: хранение имён контактов в блокчейне"
slug: "what-is-key-value-store-in-adamant-and-how-is-it-used-to-store-contact-names-4ee5f82ab77f"
description: "ADAMANT внедрил механизм хранилища «ключ-значение» (KVS) для хранения контактных данных в блокчейне, реализованный в версии 0.2.0 ADAMANT Blockchain. KVS поддерживает публичные и приватные данные."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/what-is-key-value-store-in-adamant-and-how-is-it-used-to-store-contact-names-4ee5f82ab77f"
publishedAt: "2018-07-11T07:10:16.055Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/4ee5f82ab77f/001-0-tvpp-oomdjax-ek8.webp"
cardSpan: "full"
originalId: "medium:4ee5f82ab77f"
locale: "ru"
placeholder: false
---

ADAMANT внедрил механизм хранилища «ключ-значение» (KVS) для хранения контактных данных в блокчейне, реализованный в версии 0.2.0 ADAMANT Blockchain. KVS поддерживает как публичное, так и приватное хранение данных. Примеры публичных данных — адреса Ethereum, а примеры приватных — адресные книги.

Приватные транзакции KVS хранятся в цепочке вместе с другими типами транзакций, но доступны только их владельцам. Содержимое транзакции шифруется с использованием хэша приватного ключа владельца с добавлением соли для дополнительной безопасности. Полные технические детали указаны в [AIP-3](https://aips.adamant.im/AIPS/aip-3).

ADAMANT использует инкрементальное хранение данных, что означает, приложение-клиент передаёт только изменения адресной книги, а не её полную копию. Это важный аспект при хранении данных в блокчейне, где критично минимизировать объём данных в цепочке. Каждый ключ сопоставляется с определённым значением — например, адрес ADAMANT контакта (такой как `U324242353425354`) сопоставляется с отображаемым именем (например, "John").

Веб-приложение ADAMANT Messenger обновлено для поддержки этой функции. Пользователи могут переименовать контакт, нажав на заголовок с адресом ADAMANT в чате.

![Хранилище «ключ-значение» в ADAMANT](/images/engineering-notes/medium/4ee5f82ab77f/002-0-xzokd2tzoxh9eqk2.webp)

Поддержка адресных книг запланирована для приложений iOS и Android в будущих релизах.
