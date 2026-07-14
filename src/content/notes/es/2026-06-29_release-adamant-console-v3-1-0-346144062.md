---
title: "ADAMANT Console v3.1.0"
slug: "release-adamant-console-v3-1-0-346144062"
description: "ADAMANT Console v3.1.0 actualiza la consola para ADAMANT Node v0.10.0 y mejora CLI, JSON-RPC, envoltorio JavaScript, documentación y cadena de herramientas de validación."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/adamant-console/releases/tag/v3.1.0"
publishedAt: "2026-06-29T08:31:56Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
repo: "adamant-console"
tag: "v3.1.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:adamant-console:346144062"
locale: "es"
placeholder: false
---

ADAMANT Console v3.1.0 actualiza la consola para ADAMANT Node v0.10.0 y mejora el CLI, JSON-RPC, el envoltorio JavaScript, la documentación y la cadena de herramientas de validación. Esta versión añade compatibilidad con respuestas y consultas de ADAMANT Node v0.10.0 a través de `adamant-api` v3. También introduce actualizaciones en el estado del nodo, salas/mensajes de chat, transacciones de chat, manejo de consultas de transacciones con `returnUnconfirmed`, búsqueda de delegados y transferencias directas. Se han actualizado los metadatos y dependencias del paquete, junto con un nuevo sitio de documentación con VitePress, una referencia API generada con TypeDoc y despliegue en GitHub Pages al realizar una versión. Mejoras adicionales incluyen ejemplos en la ayuda del CLI, cobertura ampliada de JSON-RPC, JSDoc para la API pública, resaltado de sintaxis en la salida JSON formateada y mayor cobertura de pruebas para envoltorios de API, comportamiento de ayuda del CLI, metadatos de configuración/cliente, historial de prompts y registro.

La verificación puede realizarse usando los siguientes comandos:
@@CODEBLOCK1@@
### Cambios importantes
Ahora se requiere Node.js 22.13.0 o superior para ejecutar ADAMANT Console.
