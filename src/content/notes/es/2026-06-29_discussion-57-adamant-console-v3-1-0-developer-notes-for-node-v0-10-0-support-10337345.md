---
title: "ADAMANT Console v3.1.0: notas para desarrolladores sobre soporte para Node v0.10.0"
slug: "discussion-57-adamant-console-v3-1-0-developer-notes-for-node-v0-10-0-support-10337345"
description: "ADAMANT Console v3.1.0 añade soporte para ADAMANT Node v0.10.0 y mejora la interfaz para CLI, JSON-RPC e integraciones locales en JavaScript."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/57"
publishedAt: "2026-06-29T08:48:18Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "Developers & API"
cardSpan: "half"
originalId: "github-discussion:10337345"
locale: "es"
placeholder: false
---

ADAMANT Console v3.1.0 introduce soporte para ADAMANT Node v0.10.0 y actualiza la interfaz para desarrolladores en CLI, JSON-RPC e integraciones locales en JavaScript. Esta versión está dirigida principalmente a desarrolladores y operadores que utilizan Console como herramienta local de firma, CLI para scripts o puente ligero JSON-RPC hacia nodos ADAMANT.

Ahora Console utiliza `adamant-api` v3 y se alinea con el comportamiento de respuestas y consultas de ADAMANT Node v0.10.0. La versión mínima requerida de Node.js es la 22.13.0 o superior. Los métodos CLI, JSON-RPC y los envoltorios en JavaScript se han unificado en torno al mismo comportamiento de Console. Un nuevo comando `node status` y su envoltorio proporcionan soporte para el estado del nodo, mientras que los ayudantes de chat se han ampliado para cubrir salas de chat, mensajes de chat y transacciones de chat heredadas. Las búsquedas de transacciones ahora pasan opciones de consulta v0.10 como `returnUnconfirmed`, y las búsquedas de delegados aceptan un nombre de usuario, clave pública o dirección ADAMANT. Para los filtros de chat de transferencia directa, la API ahora prefiere `includeDirectTransfers`, aunque la entrada anterior `withoutDirectTransfers` sigue siendo normalizada por compatibilidad con versiones anteriores. Los envoltorios públicos ahora incluyen JSDoc y páginas de referencia API generadas, y el paquete npm se publica con procedencia mediante OIDC de GitHub Actions y Publicación de Confianza de npm.

Para instalar o actualizar globalmente, use npm:

```sh
npm install -g adamant-console
```

El paquete expone el binario `adm` para operaciones comunes:

```sh
adm client version
adm node status
adm get transaction 123456789 returnUnconfirmed=1
adm get chats U123456789 includeDirectTransfers=1
```

Al actualizar, los servicios que usan Console a través de JSON-RPC deben revisar la superficie expandida de métodos y el manejo de respuestas. El código que consume respuestas de transacciones o chat debe probarse con los campos de v0.10.0 de los que depende, especialmente los datos de transacciones no confirmadas, la inclusión de transferencias directas en chat y `timestampMs`. Para nuevos servicios en JavaScript, se recomienda usar directamente `adamant-api` para una cobertura completa del protocolo, reservando los envoltorios `adamant-console` cuando se necesite un comportamiento CLI/RPC compatible con Console o para scripts operativos locales.
