---
title: "ADAMANT Market-Making Bot: Un Soporte de Spreads Más Seguro e Inteligente"
slug: "adamant-market-making-bot-a-safer-smarter-spread-support-aef80292b22c"
description: "Las órdenes de liquidez de Soporte de Spread (SS) son una de las funciones más potentes del bot ADAMANT, pero también la más delicada. Mantienen el libro saludable…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-market-making-bot-a-safer-smarter-spread-support-aef80292b22c"
publishedAt: "2026-03-31T18:05:33.126Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/aef80292b22c/001-1-yjio7wtzsgsnwh-gu1vzpa-png.webp"
cardSpan: "full"
originalId: "medium:aef80292b22c"
locale: "es"
placeholder: false
---

Las órdenes de liquidez de Soporte de Spread (SS) son una de las funciones más potentes del ADAMANT Market-Making Bot, pero también la más delicada. Mantienen los spreads ajustados y los libros saludables, pero una lógica ingenua de reabastecimiento puede volverse explotable: los bucles de relleno recrean exposición, las condiciones volátiles distorsionan la colocación, y los movimientos unilaterales transforman un mecanismo útil en una fuente de riesgo evitable.

Esta actualización aborda esto con una mejora en tres fases: una herramienta de simulación dedicada, la separación del Soporte de Spread y la Liquidez Segura en submódulos opcionales, y el reemplazo de la antigua lógica de relleno repetible por una estrategia de espejo acotada que mantiene spreads ajustados sin abrir bucles de pérdidas ilimitadas.

### Por qué esta actualización es importante

La lógica de liquidez debe comportarse de forma predecible bajo estrés. A diferencia de la liquidez basada en profundidad, que respeta naturalmente los precios medios de compra y venta, las órdenes SS existen para apoyar al propio spread. Esto las hace sensibles a ejecuciones hostiles, movimientos direccionales repentinos y reglas de colocación que funcionan en condiciones tranquilas pero fallan en entornos volátiles. Esta versión se centra en mantener el Soporte de Spread útil sin convertirlo en una fuente de riesgo ilimitado.

### Fase 1: Herramienta de simulación y visualización

Antes de cambiar la lógica principal, se creó una herramienta independiente para inspeccionar el comportamiento de SS en un entorno controlado. El entorno consta de `trade/tests/liquidity_test.js` y `trade/tests/liquidity_test.html`, ejecutándose como una aplicación Express + Socket.io.

![ADAMANT Market-making bot: A Safer, Smarter Spread Support](/images/engineering-notes/medium/aef80292b22c/002-1-idogwktarx9lftmrmbspow-png.webp)

En **modo papel**, la herramienta mantiene una instantánea única del libro de órdenes en memoria. Las iteraciones de SS se pueden activar manualmente, y hacer clic en un nivel de precio simula la ejecución completa de todas las órdenes hasta ese nivel, facilitando la reproducción de casos límite e inspección de reacciones.

En **modo en vivo**, la herramienta actualiza continuamente el libro de órdenes desde el exchange y trabaja con registros reales de `ordersDb`. Las iteraciones aún se activan manualmente, pero el entorno refleja condiciones de mercado reales.

La interfaz HTML incluye una tabla del libro de órdenes con codificación por colores que distingue órdenes externas, liquidez de profundidad, órdenes SS y órdenes reflejadas. Un panel de estadísticas muestra cantidades de SS abiertas, ejecutadas y canceladas por lado, valores VWAP de compra y venta, y deltas por iteración. Un panel de `tradeParams` de solo lectura muestra el estado actual en tiempo de ejecución, mientras que controles manuales permiten a los operadores activar iteraciones de SS, inspeccionar cambios de estado y copiar valores de celdas. Cada iteración resalta lo que cambió, transformando el comportamiento de liquidez de algo inferido de registros a algo directamente observable.

### Fase 2: Extracción de Liquidez Segura y Soporte de Spread en módulos opcionales

Anteriormente, el estado principal de Liquidez Segura y la lógica de colocación SS vivían dentro de `mm_liquidity_provider`, acoplando estrechamente varios aspectos distintos. Esta versión los separa en dos módulos dedicados: `trade/mm_liquidity_safe.js` y `trade/mm_liquidity_ss.js`.

El módulo de Liquidez Segura encapsula el estado `liqLimits` y todos los ayudantes relacionados (`updateLiqLimits`, `loadLiqLimits`, `storeLiqLimits`, `resetLiqLimits`, `getLiqLimits`, `getVwapRangeString`). Procesa únicamente ejecuciones de profundidad usando un filtro estricto `subPurpose === 'depth'`, manteniéndose enfocado en el historial de ejecución basado en profundidad y en los límites derivados.

El módulo de Soporte de Spread encapsula el comportamiento SS, incluyendo `updateSsLiquidity(liquidityOrders, orderBookInfo)`, `updateSsVwap()`, lógica de precios SS, límites de cantidad de órdenes SS y lógica de colocación por espejo. También se trasladaron aquí constantes como el número mínimo y máximo de órdenes SS por lado.

El `mm_liquidity_provider.js` principal ahora carga ambos módulos mediante `utils.softRequire()`. Estos módulos son opcionales: si falta alguno, el bot sigue funcionando correctamente. La liquidez de profundidad continúa operando. Si falta `mm_liquidity_safe`, los límites de Liquidez Segura simplemente están inactivos. Si falta `mm_liquidity_ss`, el Soporte de Spread está inactivo. Sin bloqueos, sin flujo roto, sin necesidad de ramas de código separadas.

El proveedor también delega reglas de cierre específicas de SS al módulo SS cuando está presente, reemplaza el bucle de colocación SS en línea con `ss.updateSsLiquidity()`, y actualiza el libro de órdenes tras la colocación SS para que las órdenes de profundidad puedan usar un punto medio actualizado, mejorando la coherencia de la colocación.

### Fase 3: Reemplazo de bucles de relleno por una estrategia de espejo acotada

Este es el cambio conductual principal. El antiguo patrón de relleno repetible podía seguir recreando exposición de formas indeseables bajo ciertos escenarios de ejecución.

![ADAMANT Market-making bot: A Safer, Smarter Spread Support](/images/engineering-notes/medium/aef80292b22c/003-1-747lh26q3v79vk3xcekrvq-png.webp)

#### La regla central de espejo

Cuando se ejecuta una orden SS regular, el bot coloca una **orden espejo** en el lado opuesto al precio reflejado y con el mismo tamaño. **No** coloca una sustitución en el mismo lado.

![ADAMANT Market-making bot: A Safer, Smarter Spread Support](/images/engineering-notes/medium/aef80292b22c/004-1-fwgdzzeu-axrb9noqz-o2q-png.webp)

En lugar de rellenar indefinidamente donde acaba de consumirse liquidez, el sistema reconoce la ejecución y responde con un contrapunto acotado al otro lado del spread. Esto mantiene el mercado más ajustado sin crear un bucle de retroalimentación ilimitado de reposición en el mismo lado.

#### Propiedades de las órdenes espejo

Las órdenes espejo están marcadas explícitamente con `subType: 'mirrored'`, `subTypeString: ' (ss mirrored)'`, y `priceCorrected: true`. El campo `priceCorrected` permite que la lógica existente de `closeLiquidityOrders` omita órdenes espejo válidas incluso cuando están fuera de la ventana normal del spread SS, de modo que los espejos sobrevivan donde deben sin necesidad de una ruta de cancelación separada.

#### Prevención de cascadas

Un peligro importante en la lógica de espejo es el comportamiento recursivo: un espejo se ejecuta, luego se vuelve a espejar, y así sucesivamente. Esto está explícitamente bloqueado. Las órdenes espejo ejecutadas no se espejan más. El módulo verifica `subType`, y una vez creado un espejo, la orden original se marca como fuente de espejo, evitando cadenas en cascada y manteniendo el mecanismo acotado.

#### Controles de riesgo

**Límite de distancia del espejo.** Si el precio espejo «verdadero» según el cálculo cayera demasiado lejos del punto medio, el bot recurre a un precio acotado cerca del borde del spread SS en lugar de colocarlo ciegamente allí. Esto evita que los espejos se desvinculen del comportamiento de liquidez significativo.

**Protección por relevancia del VWAP.** SS ahora mantiene sus propias estadísticas de ejecución mediante una época dedicada de `fillsEngine` identificada con `subPurpose: 'ss'`, rastreando el `buyVWAP` y `sellVWAP` de SS por separado de la liquidez de profundidad. Si el VWAP de SS se desvía más del 2% del punto medio actual, se considera obsoleto e ignorado para restricciones de colocación. Esto es importante tras fuertes inversiones direccionales, donde un VWAP antiguo podría mantener atrapada la lógica SS en un lado del mercado.

**Relajación en spreads amplios.** En mercados volátiles, el spread externo puede crecer temporalmente mucho más que la zona SS prevista. Cuando esto ocurre por un multiplicador definido, las verificaciones de ocupación del espejo se relajan para que el Soporte de Spread pueda seguir operando en lugar de congelarse debido a suposiciones estrictas de colocación que ya no se ajustan al mercado.

**Colocación acotada de nuevas órdenes SS regulares.** La colocación de nuevas órdenes SS ahora respeta el VWAP de SS cuando es relevante. Las nuevas compras regulares se colocan por debajo del `buyVWAP` de SS, y las nuevas ventas regulares por encima del `sellVWAP` de SS, reduciendo la posibilidad de añadir repetidamente exposición fresca en niveles cada vez más desfavorables.

### Mejoras en observabilidad y control operativo

El comando `/stats` ahora valida pares mediante `parseCommandParams`, acepta cualquier par o ticker perpetuo (no solo el predeterminado), formatea los valores de spread de 24h en negrita, usa precisión estable para `volumeInCoin2`, muestra volumen de negociación y estadísticas de órdenes ejecutadas solo para el par predeterminado, incluye órdenes de escalera (`ld`) en las estadísticas de órdenes ejecutadas, y añade una sección de Notas.

![ADAMANT Market-making bot: A Safer, Smarter Spread Support](/images/engineering-notes/medium/aef80292b22c/005-1-h4suuocfjjiiwmrko04igq-png.webp)

Una nueva vista rica de estadísticas de liquidez está disponible mediante `/orders liq full`. Incluye un bloque de liquidez de profundidad con estado, parámetros de spread, conteo de órdenes, montos abiertos, límites de Liquidez Segura e historial de ejecuciones; un bloque de Soporte de Spread con rango de spread SS, límites de tamaño de órdenes, conteo de órdenes regulares y espejadas, estadísticas de ejecución SS, VWAP y PnL MTM; un bloque total combinado que agrega datos de ejecución de profundidad y SS; la hora de inicio de la época actual de liquidez; información de órdenes mínimas del exchange; e información del libro de órdenes actual mediante ayudantes de profundidad reutilizables. Las tablas de estadísticas de ejecución usan un diseño compacto de cuatro columnas: etiqueta, Compra, Venta y Delta.

![ADAMANT Market-making bot: A Safer, Smarter Spread Support](/images/engineering-notes/medium/aef80292b22c/006-1-bnw14f3hsjeoscgu6x3y0g-png.webp)

La lista regular `/orders liq` ahora muestra el porcentaje ejecutado para órdenes parcialmente completadas e incluye etiquetas `subPurpose` y `subType` como `ss, mirrored`. El comando `/orderbook` incluye una nueva columna **Purpose** que muestra qué módulos del bot corresponden a cada nivel de precio, derivado de registros `ordersDb` en vivo.

![ADAMANT Market-making bot: A Safer, Smarter Spread Support](/images/engineering-notes/medium/aef80292b22c/007-1-m8b7g-dtzbkcqrovk8i-0w-png.webp)

El comando `/enable liq` ahora incluye un paso de confirmación antes de cambiar los parámetros de liquidez y valida las capacidades de compilación: se rechaza la notación de rango de profundidad si falta `mm_liquidity_safe`, y se rechazan los parámetros SS si falta `mm_liquidity_ss`, con un mensaje claro. Un nuevo subcomando `/enable liq reset` reinicia `mm_liquidityInitTs` y borra `liqLimits`, reiniciando la época de VWAP tras confirmación.

Los comandos manuales `/buy` y `/sell` recibieron una mejora de seguridad: si el precio solicitado se desvía del mercado en más del 1000%, el bot se detiene y solicita confirmación con `/y`, protegiendo contra órdenes accidentales a precios extremos. El comando `/account` ahora maneja listas vacías de comisiones de las APIs del exchange de forma más robusta.

### Sin cambios que rompen compatibilidad

Tanto `mm_liquidity_safe` como `mm_liquidity_ss` son opcionales. Si falta alguno, `mm_liquidity_provider` sigue operando correctamente con la liquidez de profundidad activa. La única evolución a nivel de formato es que las claves de estadísticas de `fillsEngine` ahora pueden incluir un segmento opcional `:<subPurpose>`; los registros existentes sin ese segmento siguen siendo válidos e inafectados.

### Resumen

Esta actualización hace tres cosas. Hace visible el Soporte de Spread mediante una herramienta de simulación que convierte el comportamiento oculto de liquidez en algo inspeccionable y reproducible. Hace modular el Soporte de Spread al desentrañar la Liquidez Segura y SS de una única ruta de proveedor. Y lo más importante, hace más seguro el Soporte de Spread al reemplazar un modelo de relleno repetible por una estrategia de espejo acotada diseñada para mantener el spread ajustado sin permitir bucles de pérdidas descontroladas.

![ADAMANT Market-making bot: A Safer, Smarter Spread Support](/images/engineering-notes/medium/aef80292b22c/008-1-mnimve9mbrwsscd6m9gllq-png.webp)

Para los sistemas de market-making, esta es la dirección correcta: no más actividad por el bien de sí misma, sino un comportamiento más inteligente bajo presión de mercado real. El Soporte de Spread ahora es más comprensible, más mantenible y mucho más difícil de explotar.
