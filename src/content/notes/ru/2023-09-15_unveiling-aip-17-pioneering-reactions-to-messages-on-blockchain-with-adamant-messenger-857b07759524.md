---
title: "AIP-17: Реакции на сообщения в блокчейне с ADAMANT Messenger"
slug: "unveiling-aip-17-pioneering-reactions-to-messages-on-blockchain-with-adamant-messenger-857b07759524"
description: "AIP-17 предлагает добавить реакции в виде эмодзи к сообщениям в ADAMANT Messenger — функцию, ранее недоступную в приложениях блокчейн-мессенджеров."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/unveiling-aip-17-pioneering-reactions-to-messages-on-blockchain-with-adamant-messenger-857b07759524"
publishedAt: "2023-09-15T10:09:07.924Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/857b07759524/001-0-tn1uulgukvtmgwym.webp"
cardSpan: "full"
originalId: "medium:857b07759524"
locale: "ru"
placeholder: false
---

ADAMANT Improvement Proposal 17 (AIP-17) предлагает добавить реакции в виде эмодзи к сообщениям в ADAMANT Messenger — функцию, ранее недоступную в приложениях блокчейн-мессенджеров. В предложении определена стандартизированная структура реакций, которая интегрируется с существующей инфраструктурой сообщений.

## Как это работает

Реакции передаются как rich-сообщения ADM, следуя соглашениям, установленным в AIP-5 (Rich Content Messages). Новое обязательное поле `reactto_id` указывает ID транзакции того сообщения, на которое поставлена реакция. Второе поле, `react_message`, содержит выбранный пользователем эмодзи. Реакции можно редактировать или удалять после создания.

Пример полезной нагрузки реакции:

```json
{
  "reactto_id": "Transaction_ID",
  "react_message": "👍"
}
```

Поскольку каждая реакция сама является транзакцией в блокчейне, ссылающейся на другую транзакцию по ID, этот подход сохраняет существующую модель аудита и децентрализации ADAMANT, добавляя при этом легковесный выразительный слой поверх стандартных чат-сообщений.

Ожидается, что реализация появится во всех приложениях ADAMANT на всех платформах. Техническое обсуждение и полный текст предложения доступны на [странице предложения AIP-17](https://github.com/Adamant-im/AIPs/issues/52).

![AIP-17: Реакции на сообщения в блокчейне с ADAMANT Messenger](/images/engineering-notes/medium/857b07759524/002-1-zslip-kei08fk54o3-u34q-png.webp)
