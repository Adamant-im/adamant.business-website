---
title: "ADAMANT Console v1.4.2"
slug: "release-adamant-console-v1-4-2-14527383"
description: "Esta versión de ADAMANT Console introduce un nuevo comando get blocks y agrega varios métodos JSON-RPC: getBlocks, getTransactionsInBlockByHeight y getTransactionsInBlockById."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-console/releases/tag/v1.4.2"
publishedAt: "2018-12-13T22:26:43Z"
author: "zyuhel"
authorUrl: "https://github.com/zyuhel"
repo: "adamant-console"
tag: "v1.4.2"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-console:14527383"
locale: "es"
placeholder: false
---

Esta versión de ADAMANT Console introduce un nuevo comando `get blocks` y agrega varios métodos JSON-RPC: `getBlocks`, `getTransactionsInBlockByHeight` y `getTransactionsInBlockById`.

Se incluyen varias correcciones. La versión corrige la extensión incorrecta de `~` en variables de entorno en algunas versiones de Ubuntu. Resuelve un problema en el que los parámetros predeterminados no se reemplazaban en archivos de configuración personalizados. Además, corrige un problema con `getTransactionsReceivedByAddress` que hacía que se omitieran transacciones recibidas con comentarios.
