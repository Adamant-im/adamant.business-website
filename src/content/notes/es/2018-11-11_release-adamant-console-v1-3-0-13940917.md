---
title: "ADAMANT Console v1.3.0"
slug: "release-adamant-console-v1-3-0-13940917"
description: "Esta versión introduce dos nuevos comandos: account new y get transactions. También agrega soporte para la opción passPhrase, permitiendo a los usuarios proporcionar una frase de acceso directamente al ejecutar un comando."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-console/releases/tag/v1.3.0"
publishedAt: "2018-11-11T16:19:44Z"
author: "zyuhel"
authorUrl: "https://github.com/zyuhel"
repo: "adamant-console"
tag: "v1.3.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-console:13940917"
locale: "es"
placeholder: false
---

Esta versión introduce dos nuevos comandos: `account new` y `get transactions`. También agrega soporte para la opción `--passPhrase`, permitiendo a los usuarios proporcionar una frase de acceso directamente al ejecutar un comando.

Varias correcciones se incluyen en esta versión. Las llamadas obsoletas a `new Buffer()` han sido reemplazadas, y se ha resuelto un error que provocaba una carga incorrecta de la configuración. Se ha aplicado una actualización temporal de dependencias a la espera de la fusión de dthree/vorpal#322.
