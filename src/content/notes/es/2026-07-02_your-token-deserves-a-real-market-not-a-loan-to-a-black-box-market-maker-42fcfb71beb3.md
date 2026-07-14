---
title: "Market Making Autogestionado para Tokens Listados en CEX con ADAMANT v9.0.0"
slug: "your-token-deserves-a-real-market-not-a-loan-to-a-black-box-market-maker-42fcfb71beb3"
description: "Después de un listado en CEX, los emisores de tokens enfrentan libros de órdenes débiles. ADAMANT ofrece una solución autogestionada sin entregar custodia ni claves API"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/your-token-deserves-a-real-market-not-a-loan-to-a-black-box-market-maker-42fcfb71beb3"
publishedAt: "2026-07-02T07:55:48.528Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/42fcfb71beb3/001-1-abbad98f8omjn6vedmkhag-png.webp"
cardSpan: "full"
originalId: "medium:42fcfb71beb3"
locale: "es"
placeholder: false
---

Después de un listado en CEX, los emisores de tokens a menudo enfrentan un libro de órdenes delgado, spreads amplios y un gráfico que castiga operaciones pequeñas. La solución convencional consiste en prestar tokens y compartir claves API con un creador de mercado externo que opera en infraestructura opaca. El Software de Market Making ADAMANT v9.0.0 ofrece una alternativa: una pila de market making autogestionada y bajo su propio control que instala como software normal, sin necesidad de `git clone` ni entrega de custodia.

### El modelo: autogestionado y bajo control propio

El market making tradicional normalmente implica enviar tokens a un tercero, compartir claves API con una caja negra y esperar que el libro luzca saludable, y que pueda recuperar sus activos. ADAMANT invierte este modelo, permitiéndole ejecutar la pila de market making en su propio servidor, con su propia cuenta de exchange y sus propias claves.

![Su token merece un mercado real, no un préstamo a un creador de mercado de caja negra](/images/engineering-notes/medium/42fcfb71beb3/002-1-ej9ccmio-dhslxvzftc6xw-png.webp)

Comparación entre Custody MM y el Software de Market Making de ADAMANT

### Lo que v9 hace por su gráfico

La edición gratuita de código abierto se enfoca en los problemas clave tras un listado. Construye el libro de órdenes rellenando huecos para que no luzca abandonado, mantiene spreads de compra/venta más estrechos para evitar una primera impresión tóxica, y proporciona profundidad para que operaciones pequeñas no distorsionen el precio. Supervisa rangos de precio que usted define y aplica políticas de volumen en modos de spread, libro de órdenes, profundidad y óptimo. El monitoreo es transparente: saldos, órdenes y estadísticas están disponibles mediante comandos a través de ADAMANT Messenger, sin panel administrativo público expuesto por defecto.

Los conectores CEX compatibles en la versión OSS incluyen Azbit, P2PB2B, StakeCube, Coinstore, FameEX y NonKYC. Existen opciones premium y personalizadas para otros exchanges.

### Primeros pasos (ruta npm)

Necesita un servidor Linux o Mac (o cualquier máquina con npm), Node.js 22+, MongoDB y una clave API de CEX para su propia cuenta.

![Su token merece un mercado real, no un préstamo a un creador de mercado de caja negra](/images/engineering-notes/medium/42fcfb71beb3/003-1-duiackkmcteg8he9ccmqdq-png.webp)

Registro oficial de npm

Instale el paquete globalmente y cree un directorio de trabajo:

```bash
npm install -g adamant-tradebot
mkdir my-mm && cd my-mm
```

El comando CLI es `mm`. Configure el bot con un asistente interactivo y luego ejecute una verificación de estado:

```bash
mm init    # interactive wizard - exchange, pair, API keys
mm doctor  # checks config, MongoDB, exchange API
```

Ningún token sale de su exchange para financiar a un creador de mercado. Solo conecta sus credenciales API a su bot en su propia máquina. Inicie y verifique el estado:

```bash
mm on
mm status
```

Envíe `/balances` a su bot desde su cuenta ADM administradora y ya estará activo. Deténgalo en cualquier momento con `mm off`, y lea los registros con `mm logs`.

### Alternativa con Docker

También puede extraer la imagen publicada del Registro de Contenedores de GitHub:

```bash
docker pull ghcr.io/adamant-im/adamant-tradebot:9.0.0
```

MongoDB se ejecuta en Compose junto con la aplicación, con la configuración y los registros almacenados en volúmenes locales bajo su control.

### Por qué v9 es un hito

Antes de v9, comenzar implicaba clonar un repositorio y configurar dependencias manualmente: adecuado para desarrolladores, pero un obstáculo para fundadores que solo quieren un libro más sólido. v9.0.0 ofrece una distribución adecuada mediante npm y GHCR, un CLI `mm` con comandos `init`, `on`, `off`, `doctor`, `status`, `logs` y `config`, publicación CI para npm y Docker en cada lanzamiento en GitHub, un motor reestructurado que incluye al trader, constructor del libro de órdenes, proveedor de liquidez y vigilante de precios, además de suites de pruebas con Jest y documentación completa.

ADAMANT es un proyecto cripto de código abierto con una década de desarrollo público.

### Para quién es esto

Este software está dirigido a emisores de tokens con un libro débil o vacío tras un listado en CEX, equipos que no pueden permitirse honorarios de seis cifras más préstamos de tokens, fundadores que no confían en entregar claves a terceros opacos, y proyectos que desean transparencia: la capacidad de leer el código, supervisar los registros y poseer el botón de apagado. Existen módulos premium para estrategias avanzadas, una interfaz web, exchanges adicionales o asistencia en la configuración. La versión OSS gratuita es útil por sí sola.

### Una nota sobre la responsabilidad

El market making debe cumplir con las reglas del exchange y las leyes aplicables. ADAMANT proporciona software, no custodia ni ejecución en su nombre. Usted lo configura, lo ejecuta y sigue siendo responsable de su uso.
