---
title: "ADAMANT JavaScript API v1.1.0 : Génération de clés Dash"
slug: "updated-adamant-javascript-api-v1-1-0-58a3e37d2ac2"
description: "L'API JavaScript ADAMANT v1.1.0 peut générer des paires de clés publiques et privées Dash directement à partir de la phrase de passe d'un compte ADAMANT. Cela simplifie les opérations inter-chaînes."
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
locale: "fr"
placeholder: false
---

L'API JavaScript ADAMANT v1.1.0 peut générer des paires de clés publiques et privées Dash directement à partir de la phrase de passe d'un compte ADAMANT. Cela simplifie les opérations inter-chaînes en dérivant les clés Dash à partir de la même mnémonique utilisée pour le compte ADAMANT.

```js
const dashKeys = api.dash.keys(config.passPhrase);
```

Le paramètre `passPhrase` est la phrase secrète mnémonique associée à un compte ADAMANT. La paire de clés retournée est prête à être utilisée avec l'API Dash.
