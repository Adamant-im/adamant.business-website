---
title: "ADAMANT Web App 2.1: обмен через QR, доступ к ботам и улучшения передачи токенов"
slug: "adamant-introduces-web-app-2-1-get-your-hands-on-the-latest-convenient-functions-4ffbc0ebc656"
description: "Обновление ADAMANT Web App 2.1 улучшает эффективность мессенджера и упрощает настройку. Новые аккаунты получают мгновенный доступ к двум ботам — обмена и ставок — без дополнительной настройки."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-introduces-web-app-2-1-get-your-hands-on-the-latest-convenient-functions-4ffbc0ebc656"
publishedAt: "2019-10-02T06:50:35.550Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/4ffbc0ebc656/001-1-l-nswrbv8xnsm1omxvshqg-png.webp"
cardSpan: "full"
originalId: "medium:4ffbc0ebc656"
locale: "ru"
placeholder: false
---

Обновление ADAMANT Web App 2.1 направлено на повышение эффективности мессенджера и упрощение первоначальной настройки. Теперь новые аккаунты получают немедленный доступ к двум ботам — боту обмена и боту для ставок — без дополнительной настройки.

При нажатии на адрес кошелька появляются три варианта: скопировать адрес в буфер обмена, скопировать ссылку для обмена или отобразить QR-код. Формат ссылки для обмена соответствует шаблону `https://msg.adamant.im/?address=U14236667426471084862`, что позволяет получателям немедленно начать чат. QR-коды теперь также отображаются в разделе «Информация о партнёре», когда вы нажимаете на значок контакта.

![ADAMANT Web App 2.1](/images/engineering-notes/medium/4ffbc0ebc656/002-1-ca218mdchy7u6byjnmqxha-png.webp)

Обмен через QR удобен для личного обмена контактами, поскольку не оставляет следов. Один QR-код может содержать не только адрес, но и метку контакта, количество токенов и приветственное сообщение. Приложение автоматически распознаёт ссылки из буфера обмена и заполняет соответствующие поля. Например, следующая ссылка открывает чат с помеченным контактом, предустановленным количеством токенов и сообщением:

```
https://msg.adamant.im/?address=U14236667426471084862&label=John%20Doe&amount=1.01&message=Hi%20there
```

При передаче токенов приложение поддерживает быстрые предустановки суммы, позволяя отправлять все доступные средства или часть, например треть, без ручного ввода.

![ADAMANT Web App 2.1](/images/engineering-notes/medium/4ffbc0ebc656/004-1-dmv7hxalesdxspouol49ka-png.webp)

Эти функции реализованы на основе ADAMANT Improvement Proposals (AIPs) — открытого набора предложений по улучшению приложения, размещённого в [репозитории AIPs на GitHub](https://github.com/Adamant-im/AIPs). Вместе с веб-приложением обновлены сборки для Tor, Windows и Linux, доступные в [релизе 2.1 на GitHub](https://github.com/Adamant-im/adamant-im/releases/tag/v2.1.0).

![ADAMANT Web App 2.1](/images/engineering-notes/medium/4ffbc0ebc656/003-1-2hnq5ol3qs8fauymp6vxa-png.webp)
