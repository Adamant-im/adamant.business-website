---
title: "ADAMANT Payment v1.0 — Plataforma Crypto-First para Pagos, Suscripciones y Gestión de Licencias"
slug: "discussion-47-adamant-payment-v1-0-universal-crypto-first-platform-for-payments-subscriptions-and-licens-10234312"
description: "ADAMANT Payment es una nueva infraestructura para el ecosistema ADAMANT y cualquier producto que necesite monetización cripto nativa sin integrar múltiples servicios externos."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/47"
publishedAt: "2026-06-10T14:30:29Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10234312"
locale: "es"
placeholder: false
---

**ADAMANT Payment** (`adamant-payment`) es un nuevo componente de infraestructura para el ecosistema ADAMANT y para cualquier producto que necesite monetización cripto nativa sin tener que integrar múltiples servicios de terceros. Reemplaza el enfoque heredado `adamant-client-auth` con una plataforma moderna y neutral respecto al producto: autenticación, facturación, pagos en criptomonedas, suscripciones, gestión de licencias, un portal de usuario y una consola de administración en una solución autohospedable.

La primera integración prevista es la suscripción a la interfaz web del ADAMANT Tradebot (escenario B): los usuarios compran una suscripción o prueba en adamant-payment, reciben un token de licencia con alcance limitado, y el bot se conecta de forma saliente al relay público de la interfaz web. La plataforma no está ligada al Tradebot — está diseñada como un producto independiente para bots, SaaS, aplicaciones de escritorio y servicios Web3.

## Arquitectura y Fortalezas Clave

La plataforma está construida desde cero para pagos en criptomonedas, no como una funcionalidad añadida. Es ideal para proyectos Web3, bots de trading, productos SaaS y software destinado a una audiencia global. El soporte inicial de pagos incluye Bitcoin (mediante BTCPay Server) y ADM (nativo, usando direcciones de depósito únicas con observadores en cadena), además de un proveedor de desarrollo para pruebas. Los webhooks son idempotentes, y los valores únicos `externalId`/txid garantizan la corrección del pago — las licencias pagadas se emiten o amplían tras la liquidación.

Autenticación, facturación, pagos en cripto, suscripciones, gestión de licencias, el portal de usuario y el panel de administración están integrados en una única solución, eliminando la necesidad de combinar múltiples servicios de terceros. La plataforma puede emitir licencias automáticamente tras el pago, gestionar fechas de caducidad, suscripciones, planes y acceso a productos. Las aplicaciones externas validan licencias mediante la API REST en `/v1/...`, lo que permite a los productos comprobar el estado de la licencia, validez de la suscripción y acceso del usuario de forma programática.

Los usuarios pueden iniciar sesión con una cuenta de correo tradicional o mediante autenticación criptográfica usando una billetera ADM o ETH (SIWE). Esto es especialmente útil para usuarios Web3, ya que la plataforma puede operar sin requerir una identidad basada en correo electrónico. Las sesiones JWT con cookies de actualización soportan aplicaciones basadas en navegador.

La solución incluye una interfaz para usuarios y un panel de administración. Los clientes gestionan pagos, licencias y suscripciones; los propietarios del producto gestionan usuarios, pedidos, planes y permisos de acceso. El panel de administración soporta 2FA con ADM y ETH, captcha Turnstile, bloqueo por IP y huella digital, y registro de auditoría. En producción, el panel de administración se ejecuta en un origen separado.

`adamant-payment` no está ligado a ADAMANT Messenger ni a ninguna aplicación específica. El marca blanca está disponible mediante variables de entorno `BRAND_*`, y el modelo de datos utiliza slugs de productos genéricos. A diferencia de Stripe, Paddle, Lemon Squeezy o soluciones tradicionales de licencias SaaS, puede adaptarse a tus propias reglas, flujos de pago en cripto, modelos de precios y productos. Se despliega en tu propia infraestructura (PostgreSQL, Node.js) con control total sobre usuarios, lógica de pagos, licencias y datos comerciales. Se proporciona Docker Compose para Postgres, sin dependencias obligatorias en servicios SaaS en la nube.

## Alcance de v1.0

El lanzamiento v1.0 cubre el flujo central de monetización: registro de usuarios, pago, entrega de acceso, renovación de suscripciones, administración e integración con productos. La autenticación soporta código por mensaje ADM, Ethereum (SIWE) y correo electrónico más contraseña. La facturación incluye un catálogo, prueba de 14 días (una vez por exchange y par a nivel global), licencias pagadas, promocionales y manuales, con recarga en caliente de `config/` para planes y códigos promocionales. El panel de administración ofrece estadísticas, gestión de cuentas, licencias, facturas y vistas de billeteras ADM/BTC, con autenticación por clave API y 2FA opcional. La internacionalización incluye inglés y ruso al lanzamiento, con i18n extensible en `packages/shared`.

La pila tecnológica utiliza pnpm con Turborepo, Fastify 5, Prisma, PostgreSQL y React 18 (Vite). La integración continua se ejecuta en GitHub Actions, cubriendo instalación, generación de Prisma, compilación, lint y verificación de tipos.

## Requisitos del Producto e Integración

La neutralidad del producto es un requisito fundamental: no existen marcas de Tradebot o ADAMANT codificadas en las enumeraciones de la base de datos; todo es configurable por despliegue. El alcance de la licencia es una licencia por exchange y par, con prueba única por alcance a nivel global. La autenticación multi-identidad asegura que ADM, ETH y correo electrónico coexistan. La seguridad del operador exige que el panel de administración se ejecute en un origen separado en producción, con clave API, 2FA opcional, captcha, bloqueo y registro de auditoría.

Para la integración con el ecosistema, el relay de la interfaz web del Tradebot (escenario B) valida licencias mediante la API de adamant-payment, con el bot utilizando un modelo de conexión saliente. La API del Tradebot en la rama `refactor/new-webui-api` consume la validación de licencias, y la interfaz web del Tradebot en la rama `refactor/new-stack` proporciona la interfaz web pública y el relay. Se pueden añadir nuevas implementaciones de `PaymentProvider` (por ejemplo, cadenas adicionales) sin reescribir el núcleo de facturación.

## Criterios de Lanzamiento

El lanzamiento v1.0.0 se publicará y etiquetará como una versión oficial en GitHub. La integración continua debe estar en verde en `dev` y en la solicitud de incorporación (PR) a `main`. La documentación cubre autenticación, facturación, pagos, seguridad del panel de administración, marca, base de datos y configuración de BTCPay. Las pruebas básicas cubren flujos de autenticación, reclamación de prueba, proceso de pago a licencia, paneles de administración y el punto final de validación de licencias.

## Hoja de Ruta Post-v1

El trabajo previsto incluye automatización de renovación de suscripciones (BTCPay solo crea facturas; la lógica de renovación reside en adamant-payment), proveedores de pago adicionales y cadenas, documentación OpenAPI para la API pública e integraciones con productos de terceros más allá del Tradebot.

Seguimiento del lanzamiento: [Adamant-im/adamant-payment#1](https://github.com/Adamant-im/adamant-payment/issues/1).
