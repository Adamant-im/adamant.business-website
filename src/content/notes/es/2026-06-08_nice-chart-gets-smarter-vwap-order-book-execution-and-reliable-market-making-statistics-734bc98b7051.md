---
title: "Nice Chart se vuelve más inteligente: VWAP, ejecución en libro de órdenes y estadísticas confiables de market making"
slug: "nice-chart-gets-smarter-vwap-order-book-execution-and-reliable-market-making-statistics-734bc98b7051"
description: "La última actualización del adamant tradebot (versión 23.0.0) mejora significativamente Nice Chart, el modo premium de market making de ADAMANT. Más allá de generar actividad comercial, el motor ahora rastrea más contexto por operación, evalúa con mayor precisión el spread proyectado de VWAP y reporta estadísticas detalladas sobre el comportamiento del trader y órdenes recientemente cerradas. Esto ayuda a los operadores a entender no solo qué ocurrió, sino por qué."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/nice-chart-gets-smarter-vwap-order-book-execution-and-reliable-market-making-statistics-734bc98b7051"
publishedAt: "2026-06-08T13:31:06.952Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/734bc98b7051/001-1-m2zzlsbbi-isnuqvz3kn9q-png.webp"
cardSpan: "full"
originalId: "medium:734bc98b7051"
locale: "es"
placeholder: false
---

La última actualización de `adamant-tradebot` (versión 23.0.0) mejora significativamente Nice Chart, el modo premium de market making de ADAMANT. Más allá de simplemente generar actividad comercial, el motor de ejecución ahora rastrea más contexto alrededor de cada operación, evalúa con mayor precisión el spread proyectado de VWAP y reporta estadísticas detalladas sobre el comportamiento del trader y órdenes recientemente cerradas. Esto ayuda a los operadores a entender no solo qué ocurrió, sino por qué.

## Mejor seguimiento del spread de VWAP

VWAP (Precio Promedio Ponderado por Volumen) es uno de los indicadores más importantes para la calidad de ejecución. La actualización mejora el manejo de VWAP de tres formas. Primero, se corrigió la precisión en la visualización del spread: el formato de porcentaje anterior podía ser engañoso, y la nueva visualización está adaptada para análisis a nivel de puntos base. Segundo, el umbral permitido de spread de VWAP se ajustó al 0.6%, otorgando a la estrategia mayor flexibilidad práctica al emparejar órdenes en condiciones reales. Tercero, el motor ahora maneja con mayor cuidado los escenarios con spread de VWAP proyectado negativo, ya que ciertas situaciones en el libro de órdenes pueden parecer aceptables a primera vista, aunque la ejecución proyectada distorsionaría la lógica de operación deseada.

## Ejecución más inteligente en el libro de órdenes

![Nice Chart se vuelve más inteligente: VWAP, ejecución en libro de órdenes y estadísticas confiables de market making](/images/engineering-notes/medium/734bc98b7051/002-1-flqt3yboi63ap-dbqbejq-png.webp)

El motor actualizado introduce un enrutamiento de ejecución más explícito, facilitando el razonamiento, depuración y operación de la estrategia. Un nuevo parámetro de configuración, `executeInOrderBookPercent`, controla qué porción de una operación puede ejecutarse directamente a través del libro de órdenes. Esto evita el consumo excesivamente agresivo de liquidez visible y es especialmente útil en mercados donde el libro de órdenes es poco profundo, desigual o parcialmente controlado por operadores externos. En lugar de ejecutar ciegamente el monto completo, Nice Chart ahora puede aplicar límites de monto y tomar decisiones más cuidadosas.

## Seguimiento de ejecución más transparente

El bot ahora proporciona registros más claros sobre las acciones en el libro de órdenes, decisiones de enrutamiento, limitación de montos y comportamiento de ejecución de operaciones. Cuando ocurre algo inesperado —un relleno parcial, reemplazo, omisión o coincidencia inesperada—, los registros ofrecen más contexto. Para los sistemas de trading, buenos registros son parte de la seguridad operativa, no solo una conveniencia para desarrolladores.

## Estadísticas de traders mejoradas

El comando `/orders t full` se ha mejorado con más contexto sobre órdenes cerradas recientemente, estadísticas acumuladas, volumen de operaciones y seguimiento por épocas. Los operadores ahora pueden responder preguntas como cuánto volumen se ha generado desde el inicio de la época actual, cuántas órdenes recientes se han cerrado y si la actividad actual se alinea con el comportamiento histórico.

![Nice Chart se vuelve más inteligente: VWAP, ejecución en libro de órdenes y estadísticas confiables de market making](/images/engineering-notes/medium/734bc98b7051/003-1-go7ssfwyfsy0gje-f72-yg-png.webp)

## Mejor atribución de rellenos

Una nueva función, `attributeThirdPartyFillFromMatchPlan`, mejora cómo el motor de rellenos atribuye los rellenos de terceros cuando está involucrada la ejecución en el libro de órdenes. Esto hace que las estadísticas sean más precisas y ayuda a separar el comportamiento interno de la estrategia de la interacción con el mercado externo.

## PnL MTM y flujo de efectivo en USD

Los cálculos de PnL por valoración de mercado (Mark-to-Market) se han mejorado con propiedades de flujo de efectivo en USD. Esto hace que los informes sean más claros para pares en los que los operadores necesitan entender el rendimiento en términos de USD, no solo en activos base o cotizados.

## Sistema de tipos y pruebas

Se añadieron definiciones de tipos nuevas y actualizadas para datos de gráficos de velas, información del libro de órdenes, configuración de ejecución, solicitudes de precios, configuraciones del trader y configuración de Nice Chart. Aunque el proyecto sigue basado en JavaScript con anotaciones JSDoc, mejores definiciones de tipos detectan errores antes y reducen el riesgo de errores sutiles en la ejecución. La cobertura de pruebas también se amplió para acciones en el libro de órdenes, limitación de montos, procesamiento de rellenos, comportamiento de VWAP y funciones de utilidad, con datos simulados que cubren situaciones del libro de órdenes más realistas.

## Configuración y compatibilidad

![Nice Chart se vuelve más inteligente: VWAP, ejecución en libro de órdenes y estadísticas confiables de market making](/images/engineering-notes/medium/734bc98b7051/004-1-4imanifwledhlg5xklk-ow-png.webp)

La configuración predeterminada se ha ampliado con nuevas opciones de ejecución de Nice Chart, facilitando el ajuste del comportamiento de ejecución en el libro de órdenes sin necesidad de modificar código. La actualización es compatible con datos de órdenes existentes: no se requiere migración de base de datos, y los nuevos parámetros tienen valores predeterminados razonables. La ejecución en el libro de órdenes de Nice Chart también puede desactivarse o revertirse mientras el resto del sistema sigue operativo.

## Qué deben monitorear los operadores

Después de actualizar, los operadores deben monitorear el comportamiento del spread de VWAP (el nuevo umbral del 0.6% puede afectar la lógica de emparejamiento en spreads estrechos o inestables), la frecuencia de ejecución en el libro de órdenes (la lógica de enrutamiento y los límites de monto pueden cambiar con qué frecuencia las operaciones impactan la liquidez existente), la atribución de rellenos (los rellenos de terceros deben compararse con los registros de la exchange) y las estadísticas del trader (verificar que el volumen, órdenes cerradas recientemente, métricas por época y estadísticas acumuladas se muestren correctamente).
