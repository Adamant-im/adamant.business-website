---
title: "Escenario A-3: Panel del operador, eventos de seguridad y mejoras en la flota de la WebUI privada"
slug: "discussion-77-progress-scenario-a-3-operator-dashboard-safety-events-config-and-fleet-polish-in-the-priv-10761303"
description: "Actualización de progreso para el escenario A (WebUI privada autohospedada, transporte directHttp) del ADAMANT TradeBot. La WebUI no se conecta a exchanges."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/77"
publishedAt: "2026-09-06T18:53:34Z"
author: "massivedev0"
authorUrl: "https://github.com/massivedev0"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10761303"
locale: "es"
placeholder: false
---

Esta es una actualización de progreso para el escenario A (WebUI privada autohospedada, transporte `directHttp`) del ADAMANT TradeBot. La WebUI nunca se conecta a los exchanges; todos los datos de mercado, cuentas y parámetros fluyen desde la API `/api/v1` del bot.

El panel de control (Dashboard) por bot es ahora la vista principal al seleccionar la pestaña de un bot. Proporciona una visión general del par, el exchange y el estado del market-making a partir de `GET /api/v1/status`, junto con el precio y el volumen de las últimas 24 horas. La insignia de edición de funcionalidades se deriva de las capacidades instaladas del bot y no de los módulos activos. El panel incluye un gráfico de precios compacto con una vela en formación, una cuadrícula de módulos codificada por colores, un resumen de parámetros de trading y saldos estructurados con órdenes abiertas. Iniciar el MM ya no envía una anulación de estrategia, lo que permite al bot mantener su política actual.

![Panel del operador: estado del MM, edición de funcionalidades, cuadrícula de módulos, resumen de parámetros y gráfico compacto](/images/engineering-notes/github/discussions/10761303/001-32674fae63.webp)

Las vistas de mercado han recibido mejoras, incluyendo velas en formación en el gráfico OHLC, marcadores de órdenes del bot en el libro de órdenes y superposiciones de órdenes abiertas. Las acciones de cancelación envían `{ id, market, side }`, y las órdenes que ya no existen se consideran un éxito para el operador.

![Pestaña de mercado: órdenes abiertas, libro de órdenes con spread, formularios de compra/venta, saldos](/images/engineering-notes/github/discussions/10761303/002-47dd4a54b7.webp)

La vista de Parámetros ahora incluye una franja de situación en vivo de 12 horas que muestra la mezcla de inventario en USD y el valor nocional de las órdenes abiertas por propósito en la zona horaria del operador. Los marcos horarios del historial de salud local indican las horas degradadas o detenidas. Cuando el bot detiene automáticamente el MM o pausa una estrategia de escalera (ladder) por seguridad, la WebUI muestra un diálogo basado en el texto de notificación del bot y refleja el estado de emergencia.

![Parámetros: interruptor maestro de MM, situación en vivo de 12h, grupos de liquidez y seguimiento de precios](/images/engineering-notes/github/discussions/10761303/003-bfb5b261fd.webp)

Un panel de Eventos proporciona un registro de auditoría de cambios de parámetros con instantáneas de saldo en el momento del cambio, insignias de seguridad y una acción para reanudar la escalera directamente desde las filas de eventos de seguridad.

![Eventos: registro de auditoría de parámetros con parada automática de seguridad y contexto de saldo](/images/engineering-notes/github/discussions/10761303/004-241365a624.webp)

La vista de Configuración de administrador muestra la salud en tiempo de ejecución, los metadatos del par y un árbol de parámetros de trading en vivo a la misma altura. Ofrece pestañas con un resumen de `config.json` saneado y JSON sin procesar sin exponer secretos.

![Configuración: salud en tiempo de ejecución, metadatos del par, árbol de parámetros de trading en vivo, resumen de configuración](/images/engineering-notes/github/discussions/10761303/005-271ca78365.webp)

Las mejoras en el shell de la flota incluyen campos de registro editables para la Etiqueta (Label) y la Cuenta (Account), con pestañas de encabezado que muestran esta información. Los paneles de mantenimiento de conexión (keep-alive) ahora persisten al cambiar de pestaña de bot, leyendo una instantánea congelada de Redux en lugar de colapsar a un estado vacío.

Este incremento transforma la WebUI de una interfaz estilo mensajero a un panel de control persistente con gráficos, módulos y parámetros. Los eventos de seguridad ahora incluyen contexto de saldo y acciones de reanudación, reemplazando las conjeturas anteriores sobre por qué se detuvo el MM. Las pestañas de múltiples bots con paneles persistentes y una vista general de la flota evitan la pérdida de contexto al cambiar entre bots. La vista de Configuración de administrador muestra la salud en tiempo de ejecución y una instantánea de configuración saneada. Los puntos de calidad del MM (`working`, `degraded`, `stopped`) se derivan de `/status` con un período de gracia de 10 minutos tras el inicio. El sistema permanece totalmente autohospedado: la WebUI se sitúa detrás de un proxy inverso, los bots se ejecutan en la infraestructura del operador, no se almacenan claves API de exchange en la WebUI y la autenticación de dos factores (2FA) es obligatoria.

La pila tecnológica consiste en WebUI v0.2.0 construida con Vite, React 18, Chakra UI, Fastify BFF y un registro de eventos en SQLite. El bot expone endpoints como `GET /api/v1/bot`, `/status`, `/params` y `/account/*`, junto con un WebSocket `params:updated`. El transporte está limitado a `DirectHttpTransport`. El escenario A de autohospedaje privado está completo en cuanto a funcionalidades para el alcance del MVP. El trabajo futuro se centrará en el Escenario B, una WebUI de suscripción pública a través de un relé de salida y un token de licencia.
