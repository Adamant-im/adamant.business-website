---
title: "Propuesta: API HTTP opcional de terceros para TradeBot"
slug: "discussion-48-proposal-optional-third-party-http-api-for-tradebot-webui-and-similar-clients-10255629"
description: "Esta propuesta presenta una API Bot v1 opcional que permite a clientes externos monitorear y controlar un bot de trading sin depender de ADAMANT Messenger o Telegram."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/48"
publishedAt: "2026-06-14T12:09:43Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10255629"
locale: "es"
placeholder: false
---

Esta propuesta introduce una API Bot v1 opcional, que permite a clientes externos—como una interfaz web gráfica—monitorear y controlar un bot de trading sin depender de ADAMANT Messenger o Telegram. En esta arquitectura, la interfaz web se comunica exclusivamente con la API del bot, asegurando que el bot siga siendo la única fuente de verdad para los datos del mercado (ticker, libro de órdenes, operaciones, OHLC), estado de la cuenta, parámetros de trading y ejecución de comandos.

La API tiene como objetivo proporcionar una interfaz HTTP y WebSocket entrante opcional en el bot, utilizando un puerto `private_webui` en la configuración. La autenticación se gestionará mediante JWT verificado en el bot usando una `private_webui_secret_key`, mientras que las cuentas de usuario residirán en el cliente externo. La API expondrá puntos finales JSON estructurados para datos de mercado, cuenta y parámetros, junto con envoltorios de comandos. Un punto final `GET /bot` servirá como arranque, devolviendo capacidades como los módulos `mm_*.js` instalados y las banderas de características de intercambio. Para cambios en tiempo real de los parámetros de trading, estará disponible un evento WebSocket `params:updated`. Los modos de transporte inicialmente soportarán `directHttp` para clientes autohospedados, con `relayWs` para alojamiento por suscripción planeado para una versión posterior.

Esta discusión excluye la interfaz de usuario de pagos, facturación o licencias, así como detalles específicos de implementación de la interfaz web. Se invita a la comunidad a dar su opinión sobre si esta API debería estar en el repositorio de código abierto `adamant-tradebot` como un módulo opcional, qué puntos finales son necesarios para un cliente mínimamente útil más allá de los comandos del mensajero, y si se prefiere la consulta (polling) o la notificación (push) para los datos de mercado y de cuenta en la versión v1. Se abrirá un problema de seguimiento en `adamant-tradebot` haciendo referencia a esta discusión. Una implementación de referencia premium ya está en desarrollo en la rama `refactor/new-webui-api` del repositorio `adamant-tradebot-me`.
