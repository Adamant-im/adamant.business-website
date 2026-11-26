---
title: "ADAMANT Node v0.11.1: Refuerzo de seguridad, forjado cifrado y documentación consolidada"
slug: "discussion-84-adamant-node-v0-11-1-security-hardening-encrypted-forging-and-consolidated-docs-11400159"
description: "ADAMANT Node v0.11.1 es una actualización mayor de seguridad y fiabilidad para operadores de nodos, delegados, operadores de pools, exploradores y otros servicios."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/84"
publishedAt: "2026-11-25T19:56:21Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "ADM Nodes, Delegates & Pools"
cardSpan: "half"
originalId: "github-discussion:11400159"
locale: "es"
placeholder: false
---

ADAMANT Node v0.11.1 es una actualización importante de seguridad y fiabilidad para operadores de nodos, delegados, operadores de pools, exploradores, servicios de mensajería y otros servicios que se comunican con los nodos de ADAMANT. Es la primera versión etiquetada de la línea v0.11; la v0.11.0 se fusionó en `master` pero nunca se etiquetó, por lo que los operadores que ejecuten la versión desde `master` también deben actualizar.

Se recomienda encarecidamente actualizar. No hay bifurcación de consenso ni nuevas migraciones de SQL: la serialización, las firmas, el orden de los delegados, las recompensas, las comisiones, las alturas de activación y la temporización de los bloques no han cambiado respecto a la v0.10.2. Sin embargo, debido a cambios importantes en la API HTTP y en los requisitos de tiempo de ejecución, los operadores deben leer la guía de actualización antes de proceder.

## Antes de actualizar

Ahora se requiere Node.js 22.22.2+ (en la serie 22.x) o 24.15.0+. Las APIs heredadas de forjado y control de tiempo de ejecución de DApps se han eliminado por completo (GHSA-vjhq-r5fg-85cx). El forjado ahora se configura a través de `forging.secret` en `config.json`; las APIs de DApp de solo lectura y los tipos de transacciones de DApp no se ven afectados. Los filtros en estados, chats y salas de chat ahora son estrictos: los filtros `and:` funcionan como se espera, mientras que los parámetros `or:`, mal escritos o no admitidos se rechazan en lugar de ignorarse silenciosamente. El parámetro `keysIds` ha sido renombrado a `keyIds`. Los límites de tasa están habilitados por defecto; los bloques de límite antiguos `max: 0` en `config.json` mantienen la limitación desactivada, por lo que debe eliminarlos para adoptar los nuevos valores predeterminados.

## Seguridad y refuerzo

La superficie de ejecución de DApps del lado del servidor y el control de forjado HTTP se han eliminado por completo en lugar de parchearse, lo que reduce significativamente la superficie de ataque.

Las frases de contraseña de los delegados en `forging.secret` pueden cifrarse opcionalmente con una contraseña de operador utilizando AES-256-GCM con derivación de clave scrypt. El nodo continúa sincronizando y sirviendo APIs mientras está bloqueado, y el forjado se desbloquea localmente con la CLI `adm-node`. Las configuraciones en texto plano siguen funcionando. Se incluyen plantillas de Zabbix para el estado de bloqueo y el resultado del forjado del delegado.

Se han añadido límites de tasa anti-abuso para el tráfico REST público, HTTP de pares y WebSocket, con una respuesta consistente `429`. Durante el periodo de despliegue de versiones mixtas, las solicitudes `/peer/*` sin la nueva cabecera de límite de tasa no se limitan, y cualquier llamador puede omitirla. Los operadores deben añadir un límite para `/peer/*` en su proxy inverso o firewall hasta que la aplicación dentro del nodo sea rastreada e implementada.

Los scripts de instalación y reparación son más seguros: se verifican las sumas de comprobación de las instantáneas, los ajustes de apagado de PM2 y systemd son correctos, y un nodo en sincronización no se reinicia a menos que sea forzado. Las dependencias se actualizan con una cuarentena de 7 días de antigüedad de lanzamiento aplicada en CI, sin hallazgos de auditoría de nivel moderado o superior.

## Fiabilidad y red

El nodo ahora recupera las conexiones de PostgreSQL después de un reinicio de la base de datos en lugar de quedarse bloqueado. Las comprobaciones de salud de los pares y los tamaños de respuesta están limitados, con retroceso y expulsión para pares inalcanzables. Las conexiones WebSocket salientes se han corregido tanto para la rotación de pares como para la regresión de la v0.11.0, donde no se realizaban conexiones salientes en absoluto. La liquidación de rondas está limitada por altura, y la reversión de recompensas está alineada por delegado; la reproducción y recuperación produjeron un estado idéntico en mainnet y testnet. Un problema de reversión independiente sigue abierto. Una consulta de protección de punto de control de memoria más rápida y pares semilla actualizados completan el trabajo de fiabilidad.

## API y documentación

Los filtros `and:` ahora respetan correctamente `toHeight` y las condiciones combinadas de remitente/destinatario. La documentación y la especificación OpenAPI 3.2 ahora residen en el repositorio del nodo, por lo que el código, el esquema y la documentación cambian juntos. El esquema de la API se publica en https://docs.adamant.im/schema/. Los mantenedores de clientes y herramientas de API deben tomar las fuentes de OpenAPI del directorio `openapi/` en el repositorio del nodo en el futuro.

## Cómo actualizar

Actualice Node.js a una versión compatible, luego detenga el nodo de forma segura y espere a que aparezca `Cleaned up successfully`; nunca use `kill -9`. Obtenga la versión v0.11.1 y ejecute `npm ci --omit=dev`. Revise `config.json` en busca de bloques de límite de tasa, `trustProxy` y cualquier automatización que llame a puntos finales eliminados. Inicie el nodo; con frases de contraseña cifradas, ejecute `npm run adm-node -- forging unlock` después de cada reinicio. Verifique `/api/node/status`, el progreso de sincronización, las conexiones de pares y el estado del forjado.

Antes del lanzamiento, la v0.11.0 se ejecutó en un nodo de mainnet con cuatro delegados y frases de contraseña cifradas durante más de 16 horas: 471 bloques forjados, ninguno perdido tras el reinicio. El único problema específico de la versión encontrado —la regresión de WebSocket saliente— está corregido en la v0.11.1.
