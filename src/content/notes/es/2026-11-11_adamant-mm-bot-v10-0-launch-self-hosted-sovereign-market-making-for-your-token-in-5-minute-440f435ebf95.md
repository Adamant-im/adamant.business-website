---
title: "ADAMANT mm Bot v10.0: Market Making soberano y autohospedado para proyectos de tokens"
slug: "adamant-mm-bot-v10-0-launch-self-hosted-sovereign-market-making-for-your-token-in-5-minute-440f435ebf95"
description: "El problema de la liquidez de tokens: para los fundadores, listar en un exchange centralizado revela una dura realidad: un token sin liquidez está efectivamente muerto."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-mm-bot-v10-0-launch-self-hosted-sovereign-market-making-for-your-token-in-5-minutes-440f435ebf95"
publishedAt: "2026-11-11T07:09:05.209Z"
author: "Quantum Trader"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:440f435ebf95"
coverImage: "/images/engineering-notes/medium/440f435ebf95/001-9e1cee5966.webp"
locale: "es"
placeholder: false
---

## El problema de la liquidez de tokens

Para los fundadores de proyectos, listar en un exchange centralizado revela una dura realidad: un token sin liquidez está efectivamente muerto. Sin una liquidez continua y un volumen de trading visible, los proyectos pierden posiciones en los agregadores, los bots de arbitraje amplían los spreads y los compradores minoristas se marchan debido al slippage. La respuesta tradicional es contratar a una agencia de market making, pagar cuotas mensuales de $5,000 a $30,000 o más, y ceder la custodia de los tokens y stablecoins a cuentas de terceros. Demasiados proyectos han visto cómo sus tokens de tesorería son vendidos masivamente o cómo los market makers desaparecen durante periodos de tensión en el mercado.

La alternativa es el market making soberano y autohospedado. Con ADAMANT TradeBot v10.0.0, puede ejecutar un market maker totalmente automatizado de nivel institucional en un VPS de $5/mes o en un contenedor Docker en menos de cinco minutos, sin transferir la custodia de sus tokens a nadie.

## Diseño sin custodia

La filosofía central es la soberanía financiera total. ADAMANT TradeBot se ejecuta completamente en su propio entorno de inquilino único. El bot solo requiere permisos básicos de lectura y trading en la API; los permisos de retiro están estrictamente deshabilitados y prohibidos. Usted nunca envía tokens o stablecoins a ADAMANT, a una agencia o a un contrato inteligente. Los tokens nunca abandonan su cuenta de exchange, y todos los cálculos de órdenes, spreads algorítmicos y conciliaciones de saldo se ejecutan localmente. Puede modificar los spreads, los objetivos de volumen y los corredores de precios sobre la marcha a través de la interfaz de ADAMANT Messenger o la API WebUI.

```
┌─────────────────────────────────────────────────────────────┐
│                    YOUR INFRASTRUCTURE                      │
│            ($5/mo VPS, Private Server, or Docker)           │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                 ADAMANT mm bot                      │   │
│   │  [ Trader ]   [ OrderBook ]  [ Liquidity ]  [ Watcher]│ │
│   └──────────────────────────┬──────────────────────────┘   │
└──────────────────────────────┼──────────────────────────────┘
                               │ API Keys
                               │ (Trade Permissions ONLY)
                               │ ❌ No Withdrawal Access
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     CENTRALIZED EXCHANGE                    │
│     (Gate, Coinstore, XT, NonKYC, MEXC, etc.)               │
│                                                             │
│  🔒 Tokens never leave your exchange account                │
│  📊 Orders placed directly via signed REST / WebSocket      │
└─────────────────────────────────────────────────────────────┘
```

## Cuatro motores algorítmicos

La edición de código abierto incluye cuatro motores sincronizados que, en conjunto, gestionan todas las dimensiones del market making.

El motor **Trader** genera un volumen consistente y de aspecto natural mediante la ejecución de operaciones auto-emparejadas dentro del spread o la profundidad del libro de órdenes, manteniendo el proyecto activo en agregadores como CoinMarketCap y CoinGecko sin perder capital.

El **Order Book Builder** coloca, desplaza y reemplaza continuamente órdenes de compra y venta escalonadas, produciendo un libro de órdenes denso y realista con una variación de precio orgánica, evitando la apariencia de "escalera vacía" común en los exchanges secundarios.

El **Liquidity Provider** defiende el libro de órdenes contra el slippage, calculando la distribución óptima de liquidez a partir de los saldos disponibles y colocando órdenes de profundidad dentro del porcentaje de spread definido, para que los compradores y vendedores de la comunidad obtengan una ejecución justa.

El **Price Watcher** monitorea los precios de los tokens en mercados de referencia como Binance, DEXs o pares de trading principales. Si los precios externos se mueven, ajusta automáticamente los límites de precio locales y los corredores de órdenes para evitar que su liquidez sea drenada por un arbitraje depredador entre exchanges.

## Novedades en la v10.0.0

La versión 10.0.0 es el lanzamiento arquitectónico más importante en la historia del proyecto, centrado en la fiabilidad empresarial, la seguridad y la integridad de la cadena de suministro.

El **bloqueo de iteración seguro para concurrencia** aborda la causa más común de órdenes duplicadas y estados desincronizados en bots de alta frecuencia: los ticks de ejecución superpuestos. La v10.0 introduce `helpers/moduleIteration.js`, que implementa un bloqueo estricto. Si una iteración ya está esperando una respuesta de la API del exchange, el siguiente tick se pospone limpiamente en lugar de ejecutarse simultáneamente, y las iteraciones se reprograman de forma segura desde los bloques `finally` para que el bot nunca se bloquee ni falle durante desconexiones de red transitorias.

El **conector de Azbit** ha sido completamente reescrito. Ahora utiliza la generación de firmas HMAC-SHA256 nativa con marcas de tiempo de microsegundos, alineación decimal precisa que cumple con las especificaciones de lote y tick de Azbit, y una invalidación instantánea de la caché de saldos con una recuperación de errores robusta ante solicitudes HTTP limitadas.

Un **Inactivity Guard** protege contra el escenario en el que el servidor host se reinicia o pierde la conectividad y el mercado se mueve significativamente mientras el bot está desconectado. Al arrancar, verifica las marcas de tiempo de latido (heartbeat); si el tiempo de inactividad supera su umbral de seguridad, activa el modo seguro para evitar la ejecución de órdenes obsoletas.

La **rotación de registros estructurada** utiliza la rotación diaria de Winston con archivado gzip automático, políticas de retención configurables y registro saneado para garantizar que los secretos de la API nunca se filtren en los archivos de registro.

La **seguridad de la cadena de suministro de extremo a extremo** completa el lanzamiento. Las imágenes de Docker publicadas en GitHub Container Registry incluyen atestaciones de procedencia de Sigstore, y los paquetes npm se publican a través de la publicación confiable de OpenID Connect con procedencia de compilación completa en npmjs.com.

## Despliegue

El despliegue es sencillo mediante el CLI global de npm o Docker.

Para el enfoque CLI, asegúrese de tener instalado Node.js 22+, luego ejecute los comandos de instalación, inicialización y arranque:

```
# 1. Install the bot globally
npm install -g adamant-tradebot

# 2. Initialize your configuration
mm init

# 3. Configure your exchange API keys & token pair
nano config/config.default.jsonc

# 4. Start the market maker
mm start

# 5. Check live status
mm status
```

Para Docker, extraiga y ejecute el contenedor con procedencia verificada:

```
docker run -d \
  --name adamant-tradebot \
  --restart unless-stopped \
  -v $(pwd)/config:/app/config \
  -v $(pwd)/logs:/app/logs \
  ghcr.io/adamant-im/adamant-tradebot:10.0.0
```
