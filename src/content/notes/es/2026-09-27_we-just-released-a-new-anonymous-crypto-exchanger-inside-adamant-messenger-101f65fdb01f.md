---
title: "ADAMANT Exchange Bot v3.0.0: Un intercambiador de criptomonedas anónimo autohospedado dentro de ADAMANT Messenger"
slug: "we-just-released-a-new-anonymous-crypto-exchanger-inside-adamant-messenger-101f65fdb01f"
description: "ADAMANT Exchange Bot v3.0.0 convierte un chat en un intercambiador instantáneo de criptomonedas autohospedado con controles de seguridad de fondos, runtime moderno y mejor experiencia."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/we-just-released-a-new-anonymous-crypto-exchanger-inside-adamant-messenger-101f65fdb01f"
publishedAt: "2026-09-27T13:54:25.207Z"
author: "Alex Web3"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:101f65fdb01f"
coverImage: "/images/engineering-notes/medium/101f65fdb01f/001-91e1d37743.webp"
locale: "es"
placeholder: false
---

ADAMANT Exchange Bot v3.0.0 convierte un chat en un intercambiador instantáneo de criptomonedas autohospedado, ofreciendo controles de seguridad de fondos más estrictos, un entorno de ejecución modernizado y una experiencia de operador más fluida. El intercambio de criptomonedas no tiene por qué implicar cuentas, paneles de control, sesiones de navegador o ceder la custodia a terceros. Con ADAMANT Exchange Bot, el proceso de intercambio ocurre directamente dentro de ADAMANT Messenger: el usuario envía un activo en el chat, especifica el activo que desea recibir, y el bot cotiza, verifica y realiza el pago.

Esta es una modernización completa del motor de intercambio, con un fuerte enfoque en la seguridad, la fiabilidad y la usabilidad real para el operador.

### Qué hace diferente a este intercambiador

La mayoría de los productos de intercambio comienzan en la web: cuentas, formularios, sesiones, huella digital del navegador y una gran superficie de ataque. ADAMANT Exchange Bot, en cambio, funciona dentro de los chats de mensajería. No hay interfaz web, ni registro de usuarios, ni superficie de KYC integrada en el flujo del producto. El operador ejecuta el bot en su propia infraestructura y controla sus propias hot wallets.

Las solicitudes de intercambio ocurren directamente en el chat, la interfaz es sencilla y familiar, los operadores mantienen el control de la infraestructura y los fondos, y la superficie de ataque es drásticamente menor que la de un intercambiador web convencional. Para las comunidades que valoran la privacidad, la simplicidad y el autohospedaje, este modelo tiene mucho sentido.

### Novedades en la v3.0.0

Desde la perspectiva del usuario, el bot es ahora más flexible y práctico para el uso diario. Un comando `/cancel` permite a los usuarios cancelar un intercambio pendiente cuando el bot aún espera aclaraciones, recibiendo un reembolso automático menos la comisión de red. También se ha mejorado el manejo de flujos de intercambio abandonados o interrumpidos, por lo que es menos probable que los depósitos estancados dejen a usuarios y operadores en el limbo.

Para el operador, la configuración es más estricta, las comprobaciones de inicio son más claras y la resiliencia es mayor. El bot valida su configuración de forma más agresiva y se detiene inmediatamente si detecta una configuración que no puede servir de forma segura. Además, gestiona la conectividad de los nodos de manera más robusta con conmutación por error automática entre múltiples endpoints RPC o REST.

### Diseñado para fondos reales, no para demostraciones

Cuando el software mueve criptomonedas, un funcionamiento "aproximado" no es suficiente. Pequeñas condiciones de carrera o reglas de propiedad de transacciones poco claras pueden convertirse en pérdidas reales. Una parte importante de la v3.0.0 se centra en la seguridad de los fondos.

Esta versión introduce un modelo de seguimiento de depósitos y reclamaciones más defensivo, que incluye monitorización consciente del mempool y gestión de disputas. El bloqueo por UTXO para cadenas similares a Bitcoin evita gastos concurrentes, y la serialización de solicitudes por remitente elimina las condiciones de carrera a nivel de chat en torno a las solicitudes de intercambio y cancelación. Para Dash, el bot ahora admite el manejo de InstantSend, lo que permite un reconocimiento más rápido de las transferencias elegibles. Salvaguardas más explícitas para escenarios de monedas no compatibles y fallos a nivel de transporte significan que el sistema falla de una manera más controlada y auditable.

### Una base técnica modernizada

La v3.0.0 es una actualización tecnológica importante. El proyecto migró a una base actual de Node.js y actualizó bibliotecas clave de blockchain e infraestructura: Node.js 22.13+, ethers v6 para el manejo de Ethereum y ERC-20, bitcoinjs-lib v7 con PSBT para la construcción de transacciones de Bitcoin, Dash y Dogecoin, MongoDB Driver 7 y adamant-api 3.x. También se modernizaron las herramientas de linting, formateo y pruebas. Se eliminaron componentes heredados que ya no encajaban en la dirección del proyecto, incluido el soporte antiguo relacionado con Lisk.

Esto es importante porque la infraestructura cripto de larga duración necesita una base que los desarrolladores puedan mantener, auditar y ampliar sin arrastrar años de deuda técnica.

### Activos compatibles y flujo de intercambio

ADAMANT Exchange Bot admite intercambios que involucran ADM, BTC, ETH, DASH, DOGE, USDT, USDC, DAI y tokens ERC-20.

El flujo de intercambio es intencionalmente directo: el usuario interactúa con el bot en ADAMANT Messenger, envía el activo de origen, especifica el activo de destino y el bot procesa el resto: cotización, validación, seguimiento de confirmación, pago o reembolso si algo impide una finalización segura. Esa simplicidad en la superficie está respaldada por una tubería de procesamiento modular subyacente: análisis de mensajes, generación de cotizaciones, validación profunda de blockchain, seguimiento de confirmaciones, gestión de pagos, gestión de reembolsos y comprobaciones finales de liquidación.

### Mejor probado, mejor documentado

La v3.0.0 se entrega con un conjunto de pruebas automatizadas sustancialmente ampliado que cubre la tubería de intercambio, adaptadores cripto, validación de configuración y lógica auxiliar. El proyecto cuenta ahora con cientos de pruebas unitarias en docenas de suites de prueba, sin dependencia de blockchains en vivo o una base de datos real durante las ejecuciones. La documentación y la guía para colaboradores también se actualizaron para que los operadores y desarrolladores puedan entender el sistema más rápidamente y trabajar con él de forma más segura.

Lanzamiento: [https://github.com/Adamant-im/adamant-exchangebot/releases/tag/v3.0.0](https://github.com/Adamant-im/adamant-exchangebot/releases/tag/v3.0.0)
ADAMANT Messenger: [https://adamant.im](https://adamant.im)
