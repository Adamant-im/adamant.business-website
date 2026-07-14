---
title: "ADAMANT JS API Library v1.7.0 Update"
slug: "adamant-js-api-library-v1-7-0-update-f362227cae9"
description: "The ADAMANT JavaScript API library v1.7.0 introduces callback support for post initialization logic. Two changes ship in this release: a new api.setStartupCallback() method and…"
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
locale: "en"
placeholder: false
---

The ADAMANT JavaScript API library v1.7.0 introduces callback support for post-initialization logic. Two changes ship in this release: a new `api.setStartupCallback()` method and an optional callback accepted as the third parameter to the `api` constructor. Both mechanisms let you run custom code after the library finishes initializing, which is useful for setup tasks that depend on a ready API instance.

Full API documentation is available in the [ADAMANT API client wiki](https://github.com/Adamant-im/adamant-api-jsclient/wiki/API-Specification). Release details are in the [v1.7.0 release notes](https://github.com/Adamant-im/adamant-api-jsclient/releases/tag/v1.7.0).
