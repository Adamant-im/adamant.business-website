---
title: "ADAMANT JavaScript API v1.1.0: Dash-Schlüsselerzeugung"
slug: "updated-adamant-javascript-api-v1-1-0-58a3e37d2ac2"
description: "Die ADAMANT JavaScript API v1.1.0 kann Dash-öffentliche und private Schlüsselpaare direkt aus einem ADAMANT-Account-Passwort erstellen."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/updated-adamant-javascript-api-v1-1-0-58a3e37d2ac2"
publishedAt: "2021-07-12T13:40:09.723Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/58a3e37d2ac2/001-1-8sz81txq44zqzikay5wamw-png.webp"
cardSpan: "full"
originalId: "medium:58a3e37d2ac2"
locale: "de"
placeholder: false
---

Die ADAMANT JavaScript API v1.1.0 kann Dash-öffentliche und private Schlüsselpaare direkt aus einem ADAMANT-Account-Passwort (Passphrase) erzeugen. Dies vereinfacht Cross-Chain-Operationen, indem Dash-Schlüssel aus demselben Mnemonik-Passwort abgeleitet werden, das auch für den ADAMANT-Account verwendet wird.

```js
const dashKeys = api.dash.keys(config.passPhrase);
```

Der `passPhrase`-Parameter ist das mit einem ADAMANT-Account verknüpfte mnemonische Passwort. Das zurückgegebene Schlüsselpaar kann direkt mit der Dash-API verwendet werden.
