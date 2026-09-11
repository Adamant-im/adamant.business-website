---
title: "Currencyinfo 4.2.0: Sin claves por defecto, capa de origen reconstruida y consultas de historial 2850 veces más rápidas"
slug: "discussion-78-currencyinfo-4-2-0-keyless-by-default-a-rebuilt-source-layer-and-history-queries-2850-fast-10783310"
description: "Descubra las novedades de Currencyinfo 4.2.0, que incluye autenticación sin claves, una arquitectura de datos optimizada y mejoras masivas en el rendimiento de las consultas."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/78"
publishedAt: "2026-09-09T17:15:27Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "Currencyinfo"
cardSpan: "half"
originalId: "github-discussion:10783310"
locale: "es"
placeholder: false
---

Nos complace anunciar el lanzamiento de **Currencyinfo 4.2.0**. Esta actualización introduce cambios fundamentales en la arquitectura de datos y mejoras significativas en el rendimiento, diseñadas para optimizar la integración con el ecosistema de cryptofoundry y los servicios de ADAMANT.

## Principales novedades

### Autenticación sin claves (Keyless) por defecto
Para mejorar la seguridad y simplificar la configuración inicial, la autenticación ahora es "sin claves" de forma predeterminada. Esto reduce la fricción al implementar el bot en entornos de producción y minimiza la exposición de credenciales sensibles.

### Reconstrucción de la capa de origen
Hemos rediseñado completamente la capa de origen (source layer) para mejorar la modularidad. Esto facilita el mantenimiento y permite una integración más fluida con nuevos exchanges como FameEX, NonKYC y Coinstore. La estructura interna ahora es más robusta frente a cambios en las APIs externas.

### Optimización del rendimiento: consultas 2850× más rápidas
Gracias a una reestructuración profunda de los índices en MongoDB, hemos logrado una mejora drástica en la velocidad de las consultas de historial. Lo que antes requería tiempos de espera considerables ahora se ejecuta casi instantáneamente, permitiendo que `adamant-tradebot` tome decisiones basadas en datos históricos con una latencia mínima.

## Notas técnicas y actualización

* **Configuración:** Asegúrese de revisar su archivo `config.default.jsonc` tras la actualización, ya que algunos parámetros de conexión han sido ajustados para soportar el nuevo modelo de autenticación.
* **Despliegue:** Si utiliza Docker o GitHub Actions, la imagen actualizada ya está disponible en GHCR. Se recomienda ejecutar `mm doctor` después de la actualización para verificar la integridad de la configuración.
* **Compatibilidad:** Esta versión mantiene la compatibilidad con los comandos CLI (`mm`, `mm init`, `mm on`, `mm off`, `mm status`, `mm logs`), asegurando una transición sin interrupciones para los usuarios actuales.

Para obtener soporte técnico o reportar incidencias, puede contactar a nuestro equipo a través de @adamant_business en Telegram o consultar nuestra documentación en marketmaking.app.

¡Gracias por seguir construyendo con la tecnología de ADAMANT!
