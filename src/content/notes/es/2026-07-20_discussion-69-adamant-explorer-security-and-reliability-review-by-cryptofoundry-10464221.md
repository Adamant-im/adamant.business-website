---
title: "Revisión de seguridad y fiabilidad de ADAMANT Explorer"
slug: "discussion-69-adamant-explorer-security-and-reliability-review-by-cryptofoundry-10464221"
description: "ADAMANT Explorer completó una revisión enfocada de seguridad y fiabilidad de su superficie HTTP pública, límite de ADAMANT Node, caché de Redis, ciclo de vida de Socket.IO, confianza de proxy inverso y renderizado en el navegador."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/69"
publishedAt: "2026-07-20T20:32:14Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10464221"
locale: "es"
placeholder: false
---

ADAMANT Explorer ha completado una revisión enfocada de seguridad y fiabilidad de su superficie HTTP pública, el límite de ADAMANT Node, el comportamiento de la caché de Redis, el ciclo de vida de Socket.IO, la confianza del proxy inverso y el renderizado en el navegador. Las mejoras de seguridad se fusionaron en [adamant-explorer#37](https://github.com/Adamant-im/adamant-explorer/pull/37) y cierran los issues [#23](https://github.com/Adamant-im/adamant-explorer/issues/23), [#25](https://github.com/Adamant-im/adamant-explorer/issues/25) y [#33](https://github.com/Adamant-im/adamant-explorer/issues/33). La revisión cubrió el orden de middleware de Express, la exposición de la API pública, la validación, la limitación de tasa, la confianza del proxy inverso, las respuestas de ADAMANT Node como un límite de datos no confiables, la corrección de la caché de Redis y su comportamiento ante fallos, el sondeo y las reconexiones de Socket.IO, el renderizado en el navegador de valores controlados por Node y pares, fallos de dependencias opcionales, la continuidad de las tasas de cambio, los informes de salud operativa y el modelado de amenazas del repositorio.

## Límite HTTP público y de API

Explorer ahora expone solo las 12 rutas de API del mismo origen requeridas por su interfaz, más `GET /api/networkHealth`. Se eliminaron dieciséis registros de rutas heredadas y el CORS con comodines. Las solicitudes se verifican contra una superficie de API exacta antes de la consulta a Redis o las verificaciones de preparación de ADAMANT, evitando que los endpoints eliminados se reactiven a través de entradas de caché obsoletas. Los parámetros de consulta públicos ahora usan validación estricta y paginación acotada. La aplicación aplica un límite de ventana fija en proceso, consciente del proxy, de 300 solicitudes de API por minuto por cliente, con almacenamiento de identidad acotado y un cubo de desbordamiento con cierre por fallo. La confianza del proxy inverso es explícita y validada. Los encabezados de seguridad, una Content Security Policy restringida, respuestas de error estables, tiempos de espera HTTP y un registro de solicitudes con datos minimizados reducen aún más la superficie de ataque expuesta.

## Disponibilidad y corrección de estado

`GET /api/networkHealth` reporta estados coherentes `live`, `degraded`, `critical` o `unavailable`, devolviendo HTTP `503` solo cuando no se puede producir una instantánea coherente del Node. Los fallos de Redis y de servicios externos opcionales ya no tumban el HTTP principal ni el servicio de archivos estáticos. La identidad de la caché es sensible al bloque donde se requiere, y la ruta de actualización de tasas de cambio preserva los últimos valores conocidos utilizables mientras evita actualizaciones superpuestas. El sondeo de Socket.IO está serializado, es consciente del ciclo de vida y está acotado durante fallos upstream. El seguimiento de generación, la propiedad explícita de temporizadores y la supresión de callbacks obsoletos evitan que espacios de nombres desconectados o reiniciados continúen trabajo obsoleto.

## Datos no confiables y seguridad del navegador

Las cargas útiles de ADAMANT Node y de pares permanecen como no confiables hasta que se normalizan o validan. Los valores de Network Monitor se renderizan como texto, mientras que los objetivos de ruta, los valores derivados de CSS y las coordenadas se restringen antes de su uso. Las rutas de API del frontend y del backend ahora comparten una única fuente de verdad para evitar la deriva del contrato.

## Impacto en compatibilidad e integración

La API retenida de Explorer es un detalle de implementación de la interfaz web, no una API de integración de propósito general. Las aplicaciones externas deben usar [adamant-api-jsclient](https://github.com/Adamant-im/adamant-api-jsclient) para la integración directa con ADAMANT Node. Los operadores pueden usar `GET /api/networkHealth` para el monitoreo de Explorer. Las rutas de frontend existentes y los enlaces profundos permanecen compatibles. Los despliegues detrás de un proxy inverso deben configurar `trustedProxies` para que coincidan con la topología real. Se prefieren los Nodes HTTPS; permanece una alternativa heredada de HTTP en texto plano para compatibilidad.

## Alcance y seguimiento

Esta fue una auditoría de código de repositorio y arquitectura de Explorer y sus límites de confianza en tiempo de ejecución, no una auditoría de protocolo criptográfico ni de consenso de blockchain. El limitador de tasa es intencionalmente por proceso, por lo que los despliegues con múltiples réplicas también deben aplicar un límite agregado en el borde. Un [modelo de amenazas del repositorio](https://github.com/Adamant-im/adamant-explorer/blob/dev/adamant-explorer-threat-model.md) y la [revisión completa de seguridad y fiabilidad](https://github.com/Adamant-im/adamant-explorer/blob/dev/security_best_practices_report.md) están disponibles. Los items abiertos de seguimiento incluyen [controles opcionales de privacidad de IP de pares](https://github.com/Adamant-im/adamant-explorer/issues/20), [actualizaciones mayores de dependencias del frontend](https://github.com/Adamant-im/adamant-explorer/issues/34), [validación del esquema de respuesta de ADAMANT Node](https://github.com/Adamant-im/adamant-explorer/issues/35) y [reintentos ante caídas y coalescencia de logs](https://github.com/Adamant-im/adamant-explorer/issues/36).
