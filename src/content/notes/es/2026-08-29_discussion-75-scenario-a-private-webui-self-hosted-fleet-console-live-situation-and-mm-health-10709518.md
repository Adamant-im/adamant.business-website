---
title: "WebUI privada: Consola autohospedada de flota para el software de market-making de ADAMANT"
slug: "discussion-75-scenario-a-private-webui-self-hosted-fleet-console-live-situation-and-mm-health-10709518"
description: "Actualización sobre el Escenario A de la WebUI privada autohospedada: una consola de operador para gestionar una flota de instancias de ADAMANT Market-Making Software."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/75"
publishedAt: "2026-08-29T09:35:34Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10709518"
locale: "es"
placeholder: false
---

## Contexto

Esta es una actualización sobre el **Escenario A** de la WebUI privada autohospedada: una consola de operador única para una flota de instancias de ADAMANT Market-Making Software. El Escenario B (WebUI de suscripción pública, relé de salida, token de licencia) no se trata aquí.

Una regla arquitectónica clave para los operadores: el navegador y el backend de la WebUI nunca se comunican directamente con los exchanges. Los gráficos, libros de órdenes, saldos, parámetros y comandos fluyen a través del `/api/v1` de cada bot. Las claves API de los exchanges permanecen en el bot.

## Qué puede ejecutar hoy

Un proceso local de WebUI (Vite UI + Fastify BFF) se conecta a uno o más bots que se ejecutan con `private_webui` habilitado y un secreto HMAC compartido. Usted añade cada bot mediante su URL. La WebUI almacena el registro de la flota; el bot no. Las cuentas de operador, la 2FA y los roles residen en la WebUI, mientras que el bot solo verifica un JWT firmado que contiene `{ login, role }`.

![Inicio de sesión en WebUI](/images/engineering-notes/github/discussions/10709518/001-65a9054569.webp)

*Inicio de sesión. Las credenciales del operador residen en la WebUI (correo electrónico / ADM / ETH + 2FA obligatorio). Cada bot solo verifica el JWT firmado; no existe un endpoint de inicio de sesión en el bot.*

## Pestañas de flota y mesa de mercado

Las pestañas del encabezado representan un bot cada una. Los puntos de estado provienen del endpoint `GET /api/v1/status` autenticado con JWT, que informa si el estado es `working`, `degraded` o `stopped`, no del sondeo de actividad público. El endpoint público `GET /api/v1/health` solo devuelve `{ status, transport }` para que una dirección de enlace accesible no filtre información sobre la calidad del MM.

La vista **Market** proporciona velas con las órdenes del bot superpuestas, un libro de órdenes en tiempo real con spread, rango y volumen de 24h, inventario del par tanto en moneda como en USD, y colocación manual de órdenes limitadas. Hacer clic en una fila del libro rellena el lado, el precio y la cantidad. La cancelación envía `{ id, market, side }` y elimina la fila cuando el exchange ya considera que la orden ha desaparecido.

![Mesa de mercado](/images/engineering-notes/github/discussions/10709518/002-04f3b72fdc.webp)

*Mercado. Velas, libro de órdenes, inventario en USD y colocación de órdenes para `PENGUIN/USDT` en BiFinance: una pestaña en una flota de múltiples bots.*

## Parámetros y situación en tiempo real

**Parameters** expone el formulario completo `WebUiTradeParams`: un interruptor maestro de MM más grupos que siguen las `capabilities` del bot (los módulos `trade/mm_*.js` faltantes permanecen bloqueados). La liquidez, el seguimiento de precios, las escaleras, el trader de volumen, las sugerencias analógicas y otros ajustes se editan a través de `PUT /params` y se actualizan en vivo mediante Socket.IO a través de `params:updated`.

**Live situation** muestra una franja de 12 horas en el navegador: inventario (base + cotización en USD) y nocional de órdenes abiertas por propósito. Las barras se completan mientras el bot permanece conectado. Los marcos horarios amarillos indican que esa hora estuvo `degraded`; el gris significa que el MM estaba `stopped`. El marco se ajusta a la barra en lugar de a la altura total del gráfico.

En el bot, la calidad del MM se muestrea fuera de `trade/mm_*.js`. Al llamar a `/start` (o activar el MM mediante PUT), se sellan los valores iguales de `mm_generalInitTs` y `mm_generalRestartTs`. Un reinicio del proceso mientras el MM ya está activo mantiene el inicio pero incrementa el reinicio, por lo que puede distinguir un inicio limpio de un reinicio tras un fallo.

![Parámetros y situación en tiempo real](/images/engineering-notes/github/discussions/10709518/003-5723175f10.webp)

*Parámetros. Interruptor maestro de MM, situación en tiempo real de 12 horas (inventario y órdenes abiertas en $), liquidez, seguimiento de precios y escaleras: los grupos se bloquean cuando el módulo no está en esta compilación del bot.*

## Comandos y registro de auditoría

**Commands** envuelve los mismos controladores que el messenger y la CLI: fill, close, make-price, TWAP, transfer, withdraw y consultas. Los POST destructivos requieren confirmación. La consola de la derecha muestra el feed de markdown del bot (saldos, cancelaciones, reinicios de época).

**Events** es el registro de auditoría de la WebUI almacenado en SQLite, que registra quién cambió qué (`admin@…` frente a `bot`), cubriendo tanto parámetros como comandos, con búsqueda, filtrado y exportación a JSON.

![Consola de comandos](/images/engineering-notes/github/discussions/10709518/004-2adccfacb9.webp)

*Comandos. Formularios de fill / close / make-price además de la consola en vivo: el mismo conjunto de comandos que ADAMANT Messenger y CLI, estructurado para una mesa de operaciones.*

![Auditoría de eventos](/images/engineering-notes/github/discussions/10709518/005-9665688ad1.webp)

*Eventos. Cambios de parámetros y cargas útiles de comandos con marca de tiempo, atribuidos al operador o al bot.*

## Notas de contrato para operadores

El endpoint `GET /health` no requiere JWT y solo devuelve `{ status, transport }`, vinculado a `private_webui_bind_host` y a la lista de permitidos. El `GET /status` autenticado con JWT devuelve `mmActive`, `mmState`, marcas de tiempo opcionales de inicio y reinicio, periodo de gracia y razones de degradación. `GET /params` proporciona una instantánea completa; `PUT /params` aplica solo cambios parciales para que los módulos no relacionados no se vuelvan a habilitar. `POST /commands/cancel` acepta un campo opcional `side` (`buy` o `sell`). Respecto a los roles, un JWT de `read-only` no puede escribir, mientras que los tokens sin un campo `role` conservan el acceso completo heredado. Los bots antiguos sin `/status` siguen apareciendo en la flota: la WebUI recurre a una carga útil completa de `/health`.

## No incluido en esta entrega

El Escenario B (relé, sesión de pago, alcance de licencia) está excluido. Los datos de ticker, libro y saldo siguen utilizando sondeo REST a intervalos de aproximadamente 10 segundos en lugar de push por WebSocket. El navegador y la WebUI no se comunican directamente con los exchanges.
