---
title: "Currencyinfo 4.2.0: Tasas de referencia autohospedadas para cripto y fiat"
slug: "currencyinfo-4-2-0-reliable-reference-rates-now-built-for-everyone-953c0ea815f7"
description: "Currencyinfo 4.2.0 ofrece un servicio de tasas de referencia de código abierto y autohospedado para consolidar datos de mercado de múltiples fuentes de forma fiable y transparente."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/currencyinfo-4-2-0-reliable-reference-rates-now-built-for-everyone-953c0ea815f7"
publishedAt: "2026-09-10T20:41:57.667Z"
author: "ADAMANT Messenger"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:953c0ea815f7"
coverImage: "/images/engineering-notes/medium/953c0ea815f7/001-b82653a311.webp"
locale: "es"
placeholder: false
---

Toda billetera, explorador, servicio de pago, herramienta de contabilidad y aplicación de portafolio termina planteándose la misma pregunta: ¿cuánto vale este activo en este momento? Lo difícil no es realizar una llamada a una API. Lo complicado es decidir qué fuente es de confianza, normalizar mercados dispares, sobrevivir a cuotas e interrupciones, rechazar datos erróneos, preservar el historial y explicar por qué cambió una cifra. Currencyinfo está diseñado para realizar ese trabajo y, con la versión 4.2.0, ya no se presenta como un componente interno de ADAMANT. Es un servicio de tasas de referencia universal, de código abierto y autohospedado para cualquiera que trabaje con datos de criptomonedas y dinero fiat.

Una tasa de referencia no debería ser un número misterioso tomado de un único proveedor. Debería ser un resultado observable producido por reglas que usted controla.

## Agregación de múltiples fuentes

La fijación de precios basada en una sola fuente es conveniente hasta que esa fuente limita las solicitudes, abandona un mercado, cambia su formato, deja de estar disponible en su región o informa de un valor atípico. Currencyinfo 4.2.0 puede contrastar hasta diez proveedores independientes y convertir sus cotizaciones en una tasa de referencia configurable.

Esta versión añade cuatro conectores sin necesidad de clave: CoinPaprika, CoinLore, Binance y ExchangeRate-API. Junto con Currency API, la configuración predeterminada cuenta ahora con cinco fuentes que funcionan sin credenciales de API. CoinGecko sigue disponible con una clave de demostración; CoinMarketCap y ExchangeRate.host admiten configuraciones autenticadas; MOEX ofrece otra opción especializada. CryptoCompare se mantiene por compatibilidad, pero ahora está obsoleto y deshabilitado por defecto, ya que el nuevo acceso requiere una suscripción.

Los proveedores difieren en cobertura de activos, frecuencia de actualización, disponibilidad regional, cuotas y supuestos de mercado. Currencyinfo hace explícitas esas diferencias y ofrece a los operadores los controles necesarios para decidir cómo deben afectar a la tasa final.

## De las cotizaciones a una tasa defendible

El proceso sigue cinco etapas. Las fuentes se consultan según sus propios calendarios. La validación normaliza los pares y rechaza las tasas cruzadas nulas o no finitas. La agregación detecta divergencias, aplica grupos y ponderaciones, y utiliza `minSources` para decidir si un par tiene suficiente respaldo para publicarse. El historial almacena instantáneas en la propia base de datos MongoDB del operador. Finalmente, una API REST expone las tasas actuales e históricas a través de puntos de conexión específicos.

![Currencyinfo 4.2.0: Tasas de referencia fiables, ahora creadas para todos](/images/engineering-notes/medium/953c0ea815f7/002-5f5d5df734.webp)

Esa breve descripción oculta varios controles útiles. Los grupos de fuentes autorizadas pueden separarse de los grupos de respaldo. Las ponderaciones y estrategias de fusión pueden expresar cómo deben combinarse los proveedores. La triangulación determinista de la moneda base puede derivar un par cuando no hay una cotización directa disponible. La gestión de frescura mediante `rateLifetime` evita que las observaciones obsoletas parezcan actuales.

Lo más importante es que `minSources` ahora tiene en cuenta la frescura de los datos. Un proveedor configurado que ha dejado de entregar datos utilizables ya no cuenta simplemente porque exista en la configuración. El servicio publica cuando existe suficiente evidencia *actual* y se degrada de forma predecible cuando no es así. La resiliencia no consiste en fingir que todos los proveedores están siempre en buen estado, sino en saber qué evidencia es actual, cuál falta y qué debe hacer su sistema a continuación.

## Mejoras centradas en el operador

Currencyinfo 4.2.0 también refuerza los componentes internos. Tres índices de cotizaciones ordenados por fecha hacen que las consultas históricas sean más prácticas a gran escala. En el conjunto de datos de validación de la versión, de aproximadamente 238 millones de documentos, una consulta representativa de par y rango mejoró de 22,8 segundos a 8 milisegundos. Los resultados reales dependen del hardware, la distribución de datos, el estado de la caché y la forma de la consulta, pero la dirección es clara: el historial acumulado es ahora mucho más fácil de usar a nivel operativo.

El servicio ha migrado a Node.js 22.12 o superior y actualiza su plataforma a NestJS 12, Mongoose 9, Zod 4, TypeScript 6 y Jest 30. El conjunto de pruebas completado abarca 28 suites y 266 pruebas.

La distribución en contenedores es ahora una superficie de lanzamiento de primer nivel. Las imágenes se publican para linux/amd64 y linux/arm64 con metadatos OCI, un SBOM y procedencia de compilación. El tiempo de ejecución no es root, los gestores de paquetes se eliminan de la imagen de producción, los registros utilizan permisos restrictivos, los valores con formato de secreto se redactan y la canalización de CI incluye escaneo de vulnerabilidades.

Para una nueva implementación, el camino más corto es la imagen pública:

```
docker pull ghcr.io/adamant-im/currencyinfo:4.2.0
```

![Currencyinfo 4.2.0: Tasas de referencia fiables, ahora creadas para todos](/images/engineering-notes/medium/953c0ea815f7/003-4f3ec4075a.webp)

## Límites claros

Currencyinfo produce tasas de referencia. No es un feed de ejecución de intercambio, un terminal de datos de mercado de alta frecuencia ni una API alojada con un SLA garantizado. El autohospedaje le otorga control sobre la configuración, el historial, la privacidad y la disponibilidad; también le hace responsable de supervisar su implementación y respetar los términos, límites y reglas de redistribución de cada proveedor externo.

La actualización desde la versión 4.1.2 requiere planificación. Las configuraciones antiguas pueden habilitar proveedores que ahora requieren credenciales, por lo que los operadores deben deshabilitar esas fuentes, añadir claves o adoptar los nuevos valores predeterminados sin claves antes de iniciar la versión 4.2.0. Las bases de datos históricas grandes también deberían crear los tres nuevos índices fuera de línea: las mediciones de la versión tardaron unos 17 minutos en almacenamiento NVMe y 50 minutos en SATA. Los formatos de documentos almacenados siguen siendo compatibles, lo que facilita la reversión.

Una corrección de comportamiento a tener en cuenta: los filtros de historial utilizan ahora el orden de par BASE/QUOTE documentado. Los clientes que anteriormente compensaban invirtiendo los pares deben eliminar esa solución alternativa. Los parámetros de consulta desconocidos también se rechazan con un error HTTP 400 en lugar de ser ignorados silenciosamente.

ADAMANT sigue presente porque utiliza Currencyinfo en producción y continúa supervisando su desarrollo. Pero el proyecto no se limita a ADAMANT. Es igualmente relevante para una billetera independiente, un explorador de bloques, un backend de pagos, un sistema de contabilidad o un operador de infraestructura que desee un servicio de tasas que pueda ser inspeccionado, configurado y ejecutado localmente.
