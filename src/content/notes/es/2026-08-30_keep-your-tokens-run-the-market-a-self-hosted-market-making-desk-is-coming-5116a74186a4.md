---
title: "Conserve sus tokens: una mesa de market making autohospedada para ADAMANT"
slug: "keep-your-tokens-run-the-market-a-self-hosted-market-making-desk-is-coming-5116a74186a4"
description: "Si emite un token, la propuesta es conocida: un creador de mercado \"se encargará del libro\", spread ajustado y volumen impreso. Pero, ¿qué ocurre con sus activos?"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/keep-your-tokens-run-the-market-a-self-hosted-market-making-desk-is-coming-5116a74186a4"
publishedAt: "2026-08-30T07:03:02.790Z"
author: "massivedev0 (Theo Bitner)"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:5116a74186a4"
coverImage: "/images/engineering-notes/medium/5116a74186a4/001-80778e7498.webp"
locale: "es"
placeholder: false
---

Si usted emite un token, la propuesta es conocida: un creador de mercado "se encargará del libro", ofrecerá un spread ajustado y volumen impreso; solo tiene que enviarles una bolsa de tokens y otra de activos de cotización, y confiar en el acuerdo. Esa es la parte que debería hacerle dudar. Esos tokens son su capital flotante, su tesorería, la historia de su listado. Una vez que salen de su billetera, usted ya no está gestionando el market making. Está alquilando una caja negra. No puede ver qué órdenes son suyas, detener el bot a las 3 a.m. ni demostrar a un socio que el inventario sigue siendo suyo.

El market making autohospedado y bajo su propio control es el modelo opuesto: usted conserva los tokens, las claves API y el proceso. El software reside junto a su cuenta de exchange. Nada queda bajo la custodia de una mesa en otra jurisdicción.

Ese modelo ya existe en el [Software de Market-Making de ADAMANT](https://marketmaking.app), liquidez autohospedada para listados en CEX. Coloca y gestiona el flujo de creadores en su cuenta: spread, profundidad, escaleras, volumen y bandas de precio. Usted lo instala, lo apunta a sus claves API y las monedas nunca abandonan la billetera del exchange que usted posee. El control hoy es real, pero sigue siendo un bucle para usuarios avanzados: ADAMANT Messenger, Telegram, CLI. Un comando, una respuesta de texto. Está bien para un solo par con el que convive; es incómodo para una flota, y difícil cuando necesita ver el libro, las velas, el inventario y las últimas doce horas de un vistazo.

Esa es la brecha que cryptofoundry ha estado cerrando.

## Un escritorio web para un software que nunca toma sus tokens

El proyecto está construyendo una interfaz web (WebUI) privada y autohospedada: una dirección en el navegador, muchos bots en pestañas. Usted inicia sesión como operador, elige un par y obtiene una pantalla de mercado, formularios de parámetros, comandos y registros, sin que el navegador se comunique nunca con el exchange. La arquitectura es deliberadamente sencilla. La WebUI no almacena secretos del exchange ni coloca órdenes en la nube. Cada gráfico, saldo y cancelación pasa a través de la API de su bot. El bot sigue siendo el único proceso que conoce el exchange.

El inicio de sesión reside en su consola, no en el exchange, ni en un creador de mercado externo. Cada bot solo verifica un token firmado. Este es el Escenario A: usted ejecuta la consola (típicamente detrás de HTTPS en una máquina que usted controla), añade cada bot por URL y comparte un secreto HMAC con la flota. Una WebUI, muchas instancias: Binance, Bybit, Gate, BiFinance, o cualquier plataforma donde realmente cotice. Una suscripción alojada (Escenario B: relé saliente, licencia en la configuración del bot, sin puerto de entrada para el bot) es un producto posterior. La regla no cambia: los tokens permanecen en su cuenta de exchange.

## El mercado, no un registro de chat

Abra la pestaña de un bot y estará en una mesa de mercado: velas con sus órdenes dibujadas en el gráfico, un libro en vivo con spread, rango y volumen de 24 horas, inventario de base y cotización en moneda y USD, y límites manuales si necesita ajustar. Haga clic en el libro y el lado, el precio y el tamaño se completarán. La cancelación envía el ID de la orden, el mercado y el lado; la fila desaparece de la tabla. Usted está observando su cuenta, a través de su bot.

![Vista de mercado](/images/engineering-notes/medium/5116a74186a4/002-a2f1096b3e.webp)

*Vista de mercado. Velas, libro de órdenes, inventario en USD y colocación de órdenes: una pestaña en una flota de múltiples bots. Sigue siendo su clave API y su billetera en el exchange.*

## Parámetros que puede leer a las 2 a.m.

El market making no es un simple interruptor. Se trata de bandas de liquidez, seguimiento de precios, escaleras, volumen y notificaciones. La WebUI convierte eso en formularios agrupados. Si un módulo no está en esta compilación del bot, el grupo permanece bloqueado; así no tendrá que adivinar qué código `/enable` corresponde a qué tarjeta.

La situación en vivo es una franja para operadores que se niegan a cuidar un terminal: doce horas de inventario (base + cotización en USD) y una mezcla de órdenes abiertas. Las barras se completan en el navegador mientras usted está conectado. Una hora en amarillo significa que la calidad se degradó; en gris significa que el market making estaba desactivado. Usted ve la noche, no una instantánea única.

![Parámetros](/images/engineering-notes/medium/5116a74186a4/003-5c8d7d7f51.webp)

*Parámetros. Interruptor maestro de market making, situación en vivo de 12 horas, liquidez, seguimiento de precios, escaleras. Los grupos siguen lo que este bot tiene realmente instalado.*

Una nota sobre la mecánica, porque importa cuando algo sale mal: el bot registra cuándo se inició el MM por última vez y cuándo se reinició el proceso con el MM ya activado. Tiempos iguales significan un inicio limpio. Si el inicio es anterior al reinicio, significa que la caja se reinició. La disponibilidad del proceso público (`/health`) se mantiene como un pequeño `{ status, transport }` para que un puerto accesible no revele la calidad del libro. La calidad es un estado `/status` separado y autenticado.

## Los mismos comandos, en un escritorio

Fill, close, make-price, TWAP, transfer, withdraw y consultas: los mismos manejadores que en Messenger y CLI, con confirmaciones en llamadas destructivas y una consola en vivo a la derecha.

![Comandos](/images/engineering-notes/medium/5116a74186a4/004-18e42a4cf7.webp)

*Comandos. El conjunto para usuarios avanzados, dispuesto para un escritorio: llenar el libro, cerrar una porción, establecer un precio, ver al bot responder en la consola.*

Debido a que "¿quién desactivó el MM?" es una pregunta real, Eventos es una pista de auditoría en la WebUI: operador vs bot, parámetros vs comandos, con búsqueda y exportación.

![Eventos](/images/engineering-notes/medium/5116a74186a4/005-0c6f4d12d6.webp)

*Eventos. Qué cambió, cuándo y quién: usted, un colega o el propio bot.*

## Por qué esto no es solo otro MM SaaS

La mayoría de las ofertas de "haremos su mercado" optimizan para sus propias operaciones: necesitan sus tokens en sus cuentas para que sus bots puedan operar. Este modelo optimiza para sus operaciones. La custodia permanece en el exchange bajo claves que usted emitió. El bot se ejecuta donde usted elija: su VPS, su rack. La WebUI es una ventana hacia ese proceso, no un nuevo custodio. Una consola cubre cada par que realmente le importa.

Si un listado necesita una segunda clave API para reglas de auto-trading, sigue siendo su segunda cuenta. Si detiene el software, las órdenes son suyas para cancelarlas. Si despide al proveedor, no está esperando la devolución de tokens que ya se fueron.

## Estado

La ruta privada autohospedada (Escenario A) está en integración activa: mercado, parámetros, situación en vivo, comandos, eventos y salud del MM autenticada. Los paneles de control de la flota y la configuración se están puliendo para que los primeros operadores puedan ejecutarlo como un escritorio diario, no como una demostración.

El Software de Market-Making de ADAMANT es autohospedado. Usted conserva la cuenta del exchange, las claves API, los fondos y la ejecución. La WebUI descrita aquí es la consola de operador para ese software, no un lugar que tome inventario.
