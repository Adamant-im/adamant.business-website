---
title: "Liquidez y mantenimiento del spread con el bot de market making ADAMANT v2.7.0"
slug: "liquidity-and-spread-maintenance-price-setting-for-every-crypto-project-e248058d3770"
description: "La liquidez y el spread son clave para evaluar un proyecto cripto. Con el bot ADAMANT v2.7.0, incluso proyectos pequeños pueden mantener ambos de forma automática."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/liquidity-spread-maintenance-price-setting-for-every-crypto-project-e248058d3770"
publishedAt: "2020-11-22T19:34:30.866Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/e248058d3770/001-1-3lizhhkkfifjduf5z4zxtq-png.webp"
cardSpan: "full"
originalId: "medium:e248058d3770"
locale: "es"
placeholder: false
---

Cuando los inversores evalúan un proyecto de criptomonedas, analizan la liquidez y el spread en las exchanges. La liquidez indica cuántos tokens los usuarios pueden comprar o vender, mientras que el spread refleja la diferencia de precio entre compra y venta. Incluso los proyectos pequeños ahora pueden mantener liquidez en tiempo real y spreads competitivos utilizando el bot de marketmaking.adamant.

La versión 2.7.0 introduce el mantenimiento de liquidez y spread como funciones principales. Los usuarios pueden configurar estos parámetros mediante el comando `/enable liq`, que establece objetivos de liquidez y spread para que el bot los mantenga en las exchanges compatibles.

La versión también añade funcionalidad de seguimiento de precios. Los comandos `/make price` y `/enable pw` permiten a los operadores establecer y monitorear precios objetivo, otorgando a los proyectos mayor control sobre la valoración del token en el mercado.

Varias mejoras operativas completan la actualización. El comando `/balances` ahora proporciona información más detallada, y los registros (logs) se han actualizado para mejorar la observabilidad. El bot ahora maneja los tiempos de espera de las solicitudes de forma más eficiente, y se ha añadido análisis de tendencias para market making, ayudando al bot a tomar decisiones de trading más informadas.

El ADAMANT tradebot es un proyecto de código abierto. Las notas de la versión y las descargas están disponibles en GitHub.
