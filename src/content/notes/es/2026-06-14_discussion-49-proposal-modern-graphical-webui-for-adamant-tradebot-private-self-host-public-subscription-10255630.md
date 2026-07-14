---
title: "Propuesta: Interfaz gráfica moderna para ADAMANT TradeBot"
slug: "discussion-49-proposal-modern-graphical-webui-for-adamant-tradebot-private-self-host-public-subscription-10255630"
description: "La interfaz web actual es principalmente de texto. Esta propuesta describe una interfaz gráfica moderna con gráficos, libros de órdenes, saldos y más."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/49"
publishedAt: "2026-06-14T12:09:51Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "MarketMaking.app"
cardSpan: "half"
originalId: "github-discussion:10255630"
locale: "es"
placeholder: false
---

## Contexto

La experiencia actual de la WebUI es principalmente de texto, basándose en respuestas a comandos en estilo mensajería. Esta propuesta describe una interfaz gráfica moderna con gráficos, libros de órdenes, saldos, órdenes abiertas, formularios de parámetros de trading y paneles de control con conocimiento de módulos. Una regla arquitectónica crítica es que la WebUI nunca se conecta directamente a exchanges; todos los datos deben fluir desde la API del bot.

## Modelos de despliegue

Se proponen dos modelos de despliegue. El primero es una WebUI privada autohospedada ofrecida como compra única. En este modelo, el operador ejecuta la WebUI tras HTTPS mediante un proxy inverso. La WebUI mantiene un registro de bots, usando una `private_webui_secret_key` compartida para firmar Tokens Web JSON (JWT) tras el inicio de sesión del operador, incluyendo usuarios locales y autenticación de dos factores. El servidor WebUI se comunica con cada bot mediante solicitudes HTTP directas a los puntos de acceso `/api/v1/*`, permitiendo que una única dirección WebUI gestione múltiples bots mediante pestañas.

El segundo modelo es una WebUI pública por suscripción. Los usuarios se autentican a través de un servicio externo de pago y autenticación, y luego colocan un token de licencia en la configuración de su bot. El bot establece una conexión saliente hacia un relay público, eliminando la necesidad de un puerto entrante en el bot. Las solicitudes del navegador se enrutan a través de la WebUI pública y el relay hacia el bot mediante un túnel API uno-a-uno. El alcance de la licencia se limita a un exchange y un par por licencia.

## Alcance del producto mínimo viable (MVP)

El producto mínimo viable prioriza el escenario privado autohospedado. Incluye la construcción de una nueva pila usando Vite y React 18, sin dar soporte a la WebUI heredada. La implementación incluye una capa de abstracción de transporte, comenzando con `DirectHttpTransport` y seguida por `RelayWsTransport`. La interfaz se inicializa mediante una solicitud `GET /bot`, donde las capacidades del bot determinan los bloques de interfaz visibles. Los parámetros se gestionan mediante eventos WebSocket `params:updated` junto con REST. Los datos de mercado y de cuenta dependen de sondeos REST con un intervalo inicial de aproximadamente 10 segundos, con la intención de enviar datos desde la caché del bot en el futuro.

## No objetivos

Esta discusión excluye explícitamente los detalles de implementación de pagos y facturación, así como el diseño de la API del bot, que se aborda en una discusión complementaria. Se abrirá un problema de seguimiento en el repositorio `adamant-tradebot-webui` haciendo referencia a esta propuesta.
