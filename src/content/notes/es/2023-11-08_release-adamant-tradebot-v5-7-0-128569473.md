---
title: "ADAMANT Tradebot v5.7.0"
slug: "release-adamant-tradebot-v5-7-0-128569473"
description: "Esta versión del ADAMANT Tradebot incluye varias mejoras y actualizaciones de mantenimiento. Las órdenes de market making ahora se limpian tras su colocación, y el Price Watcher ha sido mejorado para mayor fiabilidad."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v5.7.0"
publishedAt: "2023-11-08T16:48:40Z"
author: "just-software-dev"
authorUrl: "https://github.com/just-software-dev"
repo: "adamant-tradebot"
tag: "v5.7.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:128569473"
locale: "es"
placeholder: false
---

Esta versión del ADAMANT Tradebot introduce varias mejoras y actualizaciones de mantenimiento. Las órdenes de marketmaking ahora se limpian tras su colocación, y el Price Watcher ha sido mejorado para una mayor fiabilidad. El bot ahora detecta cambios externos en el archivo de configuración de trading, lo que permite una gestión de configuración más dinámica sin necesidad de reinicios. El registro (logging) ha sido mejorado para ofrecer una mejor observabilidad durante la operación. Las dependencias han sido actualizadas a sus últimas versiones compatibles, se han añadido reglas de linter para mejorar la calidad del código y se han aplicado varias correcciones menores.

### Cambios importantes

Si aún estás utilizando un archivo `config.json`, renómbralo a `config.jsonc`.
