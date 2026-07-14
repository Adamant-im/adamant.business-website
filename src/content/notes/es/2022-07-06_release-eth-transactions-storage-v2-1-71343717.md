---
title: "ADAMANT ETH Transactions Storage v2.1"
slug: "release-eth-transactions-storage-v2-1-71343717"
description: "Esta versión de mantenimiento reduce las solicitudes al nodo Ethereum y mejora la conexión IPC y de base de datos con más registros."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/ETH-transactions-storage/releases/tag/v2.1"
publishedAt: "2022-07-06T08:00:44Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "ETH-transactions-storage"
tag: "v2.1"
prerelease: false
cardSpan: "half"
originalId: "github-release:ETH-transactions-storage:71343717"
locale: "es"
placeholder: false
---

Esta versión de mantenimiento para la herramienta ETH-transactions-storage reduce el número de solicitudes realizadas al nodo Ethereum y añade más registros en toda la aplicación. Corrige la conexión IPC al nodo Ethereum así como la conexión a la base de datos, mejorando la confiabilidad general.

Se ha introducido una nueva variable de entorno `LOG_FILE`, que permite a los operadores configurar dónde se escribe la salida de los registros. Ahora se incluyen dos scripts auxiliares: `ethtest.py` para probar la conexión al nodo Ethereum y `pgtest.py` para probar la conexión a la base de datos PostgreSQL. Estos scripts facilitan el diagnóstico de problemas de conectividad durante la implementación.
