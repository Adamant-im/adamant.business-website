---
title: "Имена контактов и комментарии в списке транзакций — в обновлённом приложении"
slug: "contact-names-and-comments-in-the-transaction-list-in-the-updated-application-bf6de06943b0"
description: "Обновление ADAMANT web messenger v2.6.0 делает список транзакций информативнее: видны комментарии, имена контактов и ярлык для чата."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/contact-names-and-comments-in-the-transaction-list-in-the-updated-application-bf6de06943b0"
publishedAt: "2020-06-10T06:44:48.139Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/bf6de06943b0/001-0-q5zuwj-pur7a9hdb.webp"
cardSpan: "full"
originalId: "medium:bf6de06943b0"
locale: "ru"
placeholder: false
---

Обновление ADAMANT web messenger v2.6.0 делает список транзакций более информативным. Комментарии к переводам теперь отображаются непосредственно в списке, имена контактов показываются вместе с адресами, а каждая запись содержит ярлык для открытия соответствующего чата. Представление деталей транзакции также обновлено: теперь в нём отображаются комментарии и имена контактов, а собственный адрес пользователя помечен как «Мне» для ясности. Для транзакций с участием других криптовалют в списке отображаются адреса ADM и имена контактов, а также доступен тот же ярлык для чата.

![Имена контактов и комментарии в списке транзакций — в обновлённом приложении](/images/engineering-notes/medium/bf6de06943b0/002-0-nu76kd5rli905hye.webp)

Настройка сохранения сеанса входа уточнена: прежнее поведение «выход при закрытии вкладки» заменено более понятным параметром «Оставаться в системе». Темная тема теперь используется по умолчанию. С точки зрения безопасности, ссылки в сообщениях и ссылка на документацию по паролю пользователя открываются в новых окнах с атрибутом `noopener`, чтобы предотвратить атаку tab-nabbing. В этом выпуске также устранена ошибка с push-уведомлениями.

Полный список изменений доступен на [странице релиза ADAMANT на GitHub](https://github.com/Adamant-im/adamant-im/releases/tag/v2.6.0).
