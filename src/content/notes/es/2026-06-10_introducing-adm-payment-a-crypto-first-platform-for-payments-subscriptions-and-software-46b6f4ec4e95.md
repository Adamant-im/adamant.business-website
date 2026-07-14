---
title: "Presentamos ADM-Payment: Una plataforma cripto-first para pagos, suscripciones y licencias de software"
slug: "introducing-adm-payment-a-crypto-first-platform-for-payments-subscriptions-and-software-46b6f4ec4e95"
description: "ADM-Payment es una plataforma universal autohospedada para monetizar software mediante criptomonedas, suscripciones y gestión de licencias."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/introducing-a-payment-a-crypto-first-platform-for-payments-subscriptions-and-software-licensing-46b6f4ec4e95"
publishedAt: "2026-06-10T16:33:29.168Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/46b6f4ec4e95/001-1-ikwbquslxdsnxlvmcfgy5a-png.webp"
cardSpan: "full"
originalId: "medium:46b6f4ec4e95"
locale: "es"
placeholder: false
---

### Presentamos ADM-Payment

Monetizar software no debería requerir una cadena frágil de servicios desconectados. Para muchos productos—especialmente en Web3, trading, SaaS, automatización e infraestructura autohospedada—el verdadero desafío no es solo aceptar un pago, sino gestionar todo el flujo comercial: autenticación, checkout, lógica de facturación, suscripciones, entrega de licencias, validación de licencias, operaciones de administración, gestión de usuarios, renovaciones, pruebas y acceso al producto.

ADAMANT Payment (*ADM-Payment*) es una plataforma universal autohospedada con enfoque cripto-first para pagos, suscripciones y gestión de licencias de software. Actualmente se lanza como un trabajo en curso con una versión beta disponible. La plataforma está diseñada como un producto independiente, sin vinculación a ADAMANT Messenger ni a ninguna aplicación específica. La primera integración interna es para las suscripciones de ADAMANT Tradebot WebUI, pero la plataforma está construida para un rango mucho más amplio de productos, incluyendo bots, plataformas SaaS, aplicaciones de escritorio, servicios Web3, herramientas privadas, APIs comerciales y software autohospedado.

### Por qué fue creada

La mayoría de las soluciones modernas de monetización de software fueron diseñadas inicialmente para pagos en moneda fiduciaria. Esto funciona para muchos negocios, pero se vuelve limitante cuando el producto es nativo de criptomonedas, global, autohospedado, consciente de la privacidad o se vende a usuarios que prefieren no depender de sistemas bancarios tradicionales. Una configuración típica puede requerir servicios separados para autenticación, pagos, suscripciones y claves de licencia, además de scripts personalizados para acceso al producto, un panel de administración construido desde cero, webhooks, callbacks, integración de bases de datos y flujos de soporte manual.

ADM-Payment integra todas estas partes en una única plataforma coherente. Un propietario de producto puede definir planes, aceptar pagos en criptomonedas, emitir licencias, gestionar usuarios y permitir que software externo valide el acceso mediante una API—sin tener que reconstruir repetidamente toda la capa de monetización.

### Módulos principales

La plataforma combina autenticación, facturación, pagos en criptomonedas, pruebas y licencias pagadas, suscripciones, licencias promocionales y manuales, un portal web para usuarios, un panel de administración, una API de validación de licencias, marca personalizada, internacionalización y funciones de seguridad operativa en una solución autohospedable.

Los pagos son cripto-first por diseño, no una adición posterior. El alcance actual incluye pagos en Bitcoin mediante BTCPay Server autohospedado, pagos nativos ADAMANT con direcciones de depósito únicas y monitoreo en cadena, y un proveedor de desarrollo para probar flujos. La arquitectura está diseñada para que se puedan añadir más adelante nuevos proveedores de pago (Ethereum, ERC20, stablecoins y otros) y cadenas sin necesidad de reescribir el núcleo de facturación.

![Iniciar sesión con billetera Ethereum](/images/engineering-notes/medium/46b6f4ec4e95/002-1-uvvnwb38hzdf94wtr5rkra-png.webp)

![Aceptar pagos en criptomonedas](/images/engineering-notes/medium/46b6f4ec4e95/003-1-18j1i2bwffpurrfyebeoqg-png.webp)

Para los usuarios, ADM-Payment ofrece una interfaz web clara para iniciar sesión, navegar por el catálogo, realizar el checkout y gestionar licencias. Para los propietarios de productos, proporciona un panel de administración para gestionar cuentas, licencias, facturas, billeteras, planes y permisos de acceso. Para software externo, ofrece una API de validación de licencias, de modo que un bot, backend SaaS, relay, aplicación de escritorio u otro producto pueda verificar programáticamente si un usuario tiene acceso activo.

### Casos de uso objetivo

ADM-Payment es una capa de monetización, no solo una página de pago. Es especialmente útil para bots de trading y herramientas de automatización que necesitan acceso basado en licencias, planes de suscripción, restricciones por mercado o por exchange, y despliegues privados. Un desarrollador de bots de trading puede crear planes como Básico, Pro o Enterprise; los usuarios pagan en criptomonedas, reciben licencias y el bot valida el acceso mediante la API. Las licencias pueden estar limitadas por parámetros específicos del producto, como exchange y par de trading, permitiendo un control de acceso preciso más allá del simple modelo pagado/no pagado.

Para productos SaaS con usuarios nativos de criptomonedas, ADM-Payment ofrece una forma de aceptar pagos en cripto, gestionar suscripciones y controlar el acceso sin depender completamente de procesadores de pago tradicionales. Aplicaciones de escritorio y herramientas privadas pueden usarla como backend de licencias y facturación llamando a la API de validación para comprobar si una licencia está activa. Los servicios Web3 se benefician de flujos de autenticación orientados a cripto, incluyendo inicio de sesión con billetera ADM y Ethereum junto con el inicio de sesión clásico por correo electrónico. Productos comerciales autohospedados pueden desplegar y adaptar la plataforma a sus propias reglas en lugar de depender de un SaaS de licencias cerrado.

La plataforma soporta lógica de pruebas con inscripción automática, aplicando reglas como una prueba por ámbito definido. También incluye tipos de licencia pagadas, de prueba, promocionales y manuales, dando flexibilidad a los operadores sin necesidad de editar directamente la base de datos. La marca se puede configurar mediante variables de entorno, y el modelo de datos utiliza slugs de producto genéricos en lugar de suposiciones codificadas específicas de ADAMANT, lo que la hace adecuada para despliegues white-label en múltiples productos.

### Arquitectura técnica

ADM-Payment está construida como un monorepo moderno usando `pnpm` y Turborepo. El alcance de la v1.0.0 incluye un backend API con Fastify 5, ORM Prisma, base de datos PostgreSQL, frontend con React 18 y Vite, aplicaciones web separadas para usuarios y administradores, paquetes compartidos para lógica común, sesiones JWT con cookies de actualización, autenticación por código de mensaje ADM, autenticación SIWE de Ethereum, autenticación por correo y contraseña, captcha Turnstile, integración con BTCPay Server para pagos en Bitcoin, un proveedor de pago ADAMANT nativo con direcciones de depósito únicas y watcher en cadena, webhooks idempotentes, clave API de administrador, 2FA opcional, bloqueo por IP y huella digital, registro de auditoría, localización i18n y CI con GitHub Actions para instalación, generación de Prisma, construcción, revisión de código y verificación de tipos.

La arquitectura separa las áreas orientadas al usuario y al administrador. Los productos externos interactúan con la plataforma mediante endpoints API para validar licencias o comprobar el estado de suscripción. Este enfoque API-first significa que ADM-Payment no es solo una página de checkout, sino un servicio backend en el que otro software puede confiar.

Los controles de seguridad están integrados a nivel de arquitectura: áreas separadas para usuarios y administradores, flujos de autenticación protegidos, control de acceso, APIs seguras de validación de licencias, clave API de administrador, 2FA opcional con ADM y ETH, soporte para captcha, bloqueo por IP y huella digital, y registro de auditoría. La autenticación basada en billeteras permite a los usuarios autenticarse mediante flujos de identidad cripto en lugar de verse obligados a usar cuentas solo por correo, mientras que el inicio de sesión por correo y contraseña sigue disponible para usuarios tradicionales.

### Estado actual

ADM-Payment es un trabajo en curso con una versión beta disponible. La base ya es utilizable, pero el producto sigue mejorándose con pulido continuo de flujos, expansión de documentación y recopilación de retroalimentación real de integraciones. La dirección actual del lanzamiento incluye la base de la plataforma v1.0.0, con la primera integración en producción centrada en las suscripciones de ADAMANT Tradebot WebUI. La hoja de ruta incluye más proveedores de pago, más cadenas, documentación OpenAPI, automatización de renovación de suscripciones e integraciones con productos de terceros.

### Capturas de pantalla

![Interfaz de usuario: Opciones de inicio de sesión](/images/engineering-notes/medium/46b6f4ec4e95/004-1-cqwvqqbxknkp-uvuuknxrq-png.webp)

![Interfaz de usuario: Planes de suscripción](/images/engineering-notes/medium/46b6f4ec4e95/005-1-t37cypcdhaysabgjilzivg-png.webp)

![Interfaz de usuario: Licencias](/images/engineering-notes/medium/46b6f4ec4e95/006-1-3kfx3yvszqtpokjjjvsexa-png.webp)

![Panel de administración: Cuentas](/images/engineering-notes/medium/46b6f4ec4e95/007-1-bp6rl5dl-yi5cq0-elmo1q-png.webp)

![Panel de administración: Licencias](/images/engineering-notes/medium/46b6f4ec4e95/008-1-wpdhnvtgoltez8bgcjxjyg-png.webp)

![Panel de administración: Facturas](/images/engineering-notes/medium/46b6f4ec4e95/009-1-o-3ouw6yormfxhtyk3npbw-png.webp)

![Panel de administración: Emisión manual de licencia (opción)](/images/engineering-notes/medium/46b6f4ec4e95/010-1-kg3c6muwymo6kftbchh2jg-png.webp)

![Panel de administración: Pagos ADM](/images/engineering-notes/medium/46b6f4ec4e95/011-1-ypzmklcvz81nqi7rh7fyrg-png.webp)

![Panel de administración: Pagos BTC](/images/engineering-notes/medium/46b6f4ec4e95/012-1-pygj4qnhxawlioosdttx5a-png.webp)
