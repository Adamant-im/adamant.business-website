---
title: "ADAMANT JS API 库 v1.7.0 更新"
slug: "adamant-js-api-library-v1-7-0-update-f362227cae9"
description: "ADAMANT JavaScript API 库 v1.7.0 引入了对初始化后逻辑的回调支持。本次发布包含两项变更：新的 api.setStartupCallback() 方法和构造函数中的可选回调参数。"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-js-api-library-v1-7-0-update-f362227cae9"
publishedAt: "2023-01-08T14:33:18.085Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/f362227cae9/001-1-fyo9k3w-4-kerjuoncf9fw-png.webp"
cardSpan: "full"
originalId: "medium:f362227cae9"
locale: "zh"
placeholder: false
---

ADAMANT JavaScript API 库 v1.7.0 引入了对初始化后逻辑的回调支持。本次发布包含两项变更：新的 `api.setStartupCallback()` 方法，以及作为 `api` 构造函数第三个参数接受的可选回调。这两种机制都允许你在库完成初始化后运行自定义代码，适用于依赖已就绪 API 实例的设置任务。

完整的 API 文档请参阅 [ADAMANT API 客户端 wiki](https://github.com/Adamant-im/adamant-api-jsclient/wiki/API-Specification)。发布详情请见 [v1.7.0 发布说明](https://github.com/Adamant-im/adamant-api-jsclient/releases/tag/v1.7.0)。
