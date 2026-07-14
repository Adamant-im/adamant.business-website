---
title: "ADAMANT Tradebot v6.1.0"
slug: "release-adamant-tradebot-v6-1-0-170709710"
description: "Esta versión incluye mejoras en el Price Watcher y en la confiabilidad general. Los módulos ahora verifican la actualidad del precio de un token antes de actuar."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-tradebot/releases/tag/v6.1.0"
publishedAt: "2024-08-17T09:45:28Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-tradebot"
tag: "v6.1.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-tradebot:170709710"
locale: "es"
placeholder: false
---

Esta versión incluye mejoras en el Price Watcher junto con mejoras más amplias en confiabilidad. Los módulos ahora verifican si el precio de un token es actual antes de continuar, lo que ayuda a evitar que datos obsoletos o incorrectos influyan en las decisiones de trading. Se ha realizado trabajo adicional de refactorización para mejorar la estabilidad general.

Se han añadido nuevas configuraciones `dev` y `clear_db`, lo que brinda a los operadores mayor control sobre los flujos de trabajo de desarrollo y gestión de bases de datos. Las dependencias se han actualizado a sus últimas versiones compatibles, y se han corregido varios errores menores. Se han añadido pruebas manuales para complementar la cobertura de pruebas existente, y el README se ha actualizado con el nuevo enlace del sitio web junto con guías de instalación y uso renovadas.
