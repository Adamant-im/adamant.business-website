---
title: "Nice Chart: Formación Premium de Precios para Market-Making"
slug: "introducing-nice-chart-how-premium-market-making-turns-raw-volume-into-a-chart-people-trus-83160e6678e3"
description: "El módulo mejorado Nice Chart de ADAMANT da forma a la acción del precio al contado para que un token parezca vivo, líquido e intencional, no como si un bot hubiera olvidado la estética."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/introducing-nice-chart-how-premium-market-making-turns-raw-volume-into-a-chart-people-trust-83160e6678e3"
publishedAt: "2026-06-01T08:42:48.686Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/83160e6678e3/001-1-2ebag0oqbrqff72gxpcsbw-png.webp"
cardSpan: "full"
originalId: "medium:83160e6678e3"
locale: "es"
placeholder: false
---

El módulo mejorado Nice Chart de ADAMANT da forma a la acción del precio al contado para que un token parezca vivo, líquido e intencional — no como si un bot hubiera dejado el volumen activo y olvidado la estética. Se incluye en la edición Premium del [ADAMANT Trading & Market-making bot](https://github.com/Adamant-im/adamant-tradebot) y está diseñado para equipos que valoran la percepción tanto como la ejecución.

### El gráfico es tu escaparate

En un exchange centralizado, un token no empieza con un pitch deck ni una página web. Empieza con un gráfico de velas. Traders, market makers, socios de listado y miembros de la comunidad juzgan la salud en segundos: ¿Las mechas son naturales? ¿El precio se desplaza suavemente o salta en pasos? ¿El volumen parece un mercado real — o como si un software estuviera golpeando el spread? Tener un bot de market-making es lo mínimo esperado; cómo se siente el gráfico es lo que marca la diferencia.

Los bots clásicos de volumen dentro del spread hacen su trabajo — colocan órdenes, rotan inventario y generan operaciones. Pero sin una formación deliberada del precio, los gráficos a menudo cuentan la historia equivocada: velas desiguales, saltos bruscos que indican "algoritmo" en lugar de "mercado", artefactos tras reinicios y memoria corta debido a que las APIs de historial de operaciones del exchange solo retroceden un tiempo limitado. El resultado no siempre es un trading roto; es una confianza rota.

Nice Chart no reemplaza los controles de riesgo, el mantenimiento del spread ni los módulos de liquidez. Añade una capa de estética intencional del precio sobre las mismas salvaguardias operativas en las que ya confías.

### Qué hace Nice Chart

Nice Chart es un cerebro dedicado a dar forma al precio dentro del módulo Trader. Mientras el bot sigue respetando el spread, los límites del Price Watcher, la política de MM y la seguridad del libro de órdenes, Nice Chart se pregunta continuamente: dado dónde estamos en la vela y qué historial conocemos, ¿cuál es la siguiente operación más natural — sin salir del corredor seguro?

En la práctica, esto significa velas más suaves y creíbles, con menos discontinuidades bruscas; continuidad tras reinicios, recordando el historial en lugar de reinventarlo en cada despliegue; degradación elegante cuando los datos nuevos del exchange son escasos, apoyándose en el historial acumulado y mostrando advertencias claras en lugar de adivinar ciegamente; y cierres de vela con el mejor esfuerzo posible, donde el bot puede orientar hacia un cierre más coherente cuando los controles de seguridad lo permiten — nunca ignorando las reglas de riesgo.

### Bajo el capó

Nice Chart vive en su propio módulo `trade/mm_nice_chart.js` y se conecta a `mm_trader` mediante carga de dependencia suave. Si el módulo no está presente en una compilación personalizada, Trader mantiene el comportamiento heredado. Si Nice Chart devuelve una salida no válida, Trader retrocede — sin bloqueos duros, sin anulación silenciosa de la seguridad. Esta arquitectura es importante para las ediciones Premium frente a las básicas: la formación avanzada de gráficos se entrega donde corresponde, sin obligar a que cada despliegue cargue la misma superficie.

Los puntos finales de operaciones del exchange son de corta duración, por lo que Nice Chart se combina con una capa compartida de historial de mercado que mantiene un estado funcional en memoria para el mercado activo, persiste las velas en la base de datos, conserva aproximadamente 90 días de historial y toma decisiones de formación basadas en una ventana de análisis de ~30 días, además de desduplicar operaciones usando identidad estable (ID de operación, marca de tiempo, respaldo por lado/precio). El bot extrae de una cinta duradera que sobrevive a los reinicios — crucial para emisores que despliegan con frecuencia.

Las velas se construyen de forma independiente del marco temporal a partir del mismo flujo de operaciones, ya sea en vivo o al revisar un informe, reduciendo el riesgo clásico de divergencia entre simulador y producción. Los equipos Premium obtienen un simulador HTML interactivo `trade/tests/nice_chart.test.js` que muestra vistas de gráficos ligeros en múltiples marcos temporales, compara las trayectorias base frente a Nice Chart con entradas idénticas, y soporta modos `snapshot` (semilla de exchange en vivo) y `db` (historial acumulado) para pruebas cualitativas antes de asignar capital real al par.

La seguridad sigue estando en la etapa anterior. Nice Chart propone un rango objetivo restringido, no un precio libre. `mm_trader` intersecta ese rango con los límites de spread, restricciones del watcher, reglas específicas del libro de órdenes según la política y verificaciones de liquidez antes de colocar órdenes. La corrección del cierre de vela es de mejor esfuerzo y sin bypass — la estética nunca gana sobre la seguridad de ejecución.

### Para quién es esto

Los emisores de tokens y proyectos cripto se benefician porque un gráfico es prueba social; Nice Chart ayuda a que las velas diarias cuenten una historia de actividad orgánica en lugar de ruido mecánico, especialmente en pares donde la confianza visual impulsa el sentimiento de los tenedores. Los exchanges y mesas de market-making se benefician porque los socios comparan gráficos entre plataformas, y una cinta pulida reduce las conversaciones del tipo "explica esta mecha". Los usuarios avanzados en compilaciones Premium obtienen una capa estética — el toque final en una pila ya ajustada para operaciones.

El bot básico de código abierto continúa con la ruta estándar de Trader. Nice Chart es una funcionalidad Premium para equipos que pagan por una presentación avanzada del mercado.

![Introducción a Nice Chart: Cómo el market-making Premium convierte el volumen crudo en un gráfico en el que la gente confía](/images/engineering-notes/medium/83160e6678e3/002-1-rhpseh8d6qk4rkb0slsxuq-png.webp)

El objetivo no es un gráfico de BTC falso en un microcap — es un gráfico que no distrae de la historia real del token.

### Uso práctico

Conceptualmente, activa Trader en una configuración Premium al contado con Nice Chart activado, observa el estrechamiento del corredor y el comportamiento de las velas durante una sesión, luego reinicia el bot y confirma la continuidad en lugar del olvido. Visualmente, ejecuta el simulador de Nice Chart con tu configuración — el modo `trader` con semilla `db` es el más cercano a lo que recuerda la producción, mientras que el modo `snapshot` prueba el comportamiento en arranque en frío. Operativamente, ajusta `mm_minInterval` con atención; el bot advierte cuando el ritmo de tu Trader empuja a Nice Chart hacia un ritmo degradado solo de cierre, lo cual es una transparencia intencional en lugar de una degradación oculta.

Seguimiento de la implementación: [Issue de la función #94](https://github.com/Adamant-im/adamant-tradebot/issues/94).

Cualquier proyecto serio puede comprar u operar market-making. Pocos invierten en cómo se ve su mercado hora a hora en el gráfico que todos capturan. Nice Chart es la respuesta de ADAMANT para clientes Premium que quieren que la salida del bot se sienta pensada — velas más suaves, continuidad más estable, respaldos honestos y herramientas para ver la diferencia antes de que el capital lo haga.
