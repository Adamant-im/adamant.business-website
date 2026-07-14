---
title: "Включение push-уведомлений в ADAMANT Messenger на iOS"
slug: "enable-push-notifications-in-the-decentralized-messenger-on-ios-5a77ecffeb32"
description: "ADAMANT Messenger для iOS может уведомлять о новых сообщениях даже при закрытом приложении с помощью ADAMANT Notification Service (ANS)."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/enable-push-notifications-in-the-decentralized-messenger-on-ios-5a77ecffeb32"
publishedAt: "2021-09-02T20:37:14.112Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/5a77ecffeb32/001-0-gssgbcsz1xeu5gpg.webp"
cardSpan: "full"
originalId: "medium:5a77ecffeb32"
locale: "ru"
placeholder: false
---

ADAMANT Messenger для iOS может уведомлять пользователей о новых сообщениях, даже когда приложение не запущено, благодаря службе уведомлений ADAMANT (ANS). Работа начинается, когда пользователь отправляет зашифрованное сигнальное сообщение, содержащее уникальный токен, на ноду блокчейна ADAMANT, указывая в качестве получателя адрес ADAMANT для ANS. ANS опрашивает блокчейн, чтобы расшифровать токен пользователя, и фильтрует транзакции, в которых адрес ADM пользователя указан как получатель. Затем ANS запрашивает у APNS доставку этих транзакций, содержащих зашифрованные сообщения, на устройство пользователя, определяемое по уникальному токену. В конце APNS уведомляет устройство, и приложение Messenger использует свой секретный ключ (парольную фразу) для расшифровки сообщений.

Эта архитектура гарантирует, что устройство пользователя никогда не взаимодействует напрямую с ANS, что означает, что ANS не узнаёт IP-адрес устройства или другие идентификаторы. Их взаимодействие происходит исключительно через ноды блокчейна. Чтобы включить push-уведомления в приложении, пользователи должны активировать опцию «Оставаться в системе» и выбрать тип push-уведомлений.
