---
title: "ADAMANT Market-making Software Actualizado a la v6.1.0"
slug: "open-source-market-making-software-for-cryptocurrency-projects-updated-to-v6-1-0-8b8ed9a261c8"
description: "La aplicación de market making de código abierto de ADAMANT recibe mejoras funcionales y de estabilidad en la versión 6.1.0"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/open-source-market-making-software-for-cryptocurrency-projects-updated-to-v6-1-0-8b8ed9a261c8"
publishedAt: "2024-08-17T10:04:57.129Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/8b8ed9a261c8/001-0-3n-a6wrdfj1fhgin.webp"
cardSpan: "full"
originalId: "medium:8b8ed9a261c8"
locale: "es"
placeholder: false
---

La aplicación de market making de código abierto de ADAMANT es una herramienta autohospedada para proyectos de criptomonedas y exchanges, diseñada para generar volumen comercial, mantener el spread y la liquidez, y construir un libro de órdenes dinámico. La versión básica es gratuita, con funciones avanzadas disponibles como módulos de pago. El proyecto lanzó recientemente la versión 6.1.0, que incluye varias mejoras funcionales y de estabilidad.

![Software de market making de código abierto para proyectos de criptomonedas actualizado a la v6.1.0](/images/engineering-notes/medium/8b8ed9a261c8/002-0-1vbp44c85yvdelg.webp)

Una actualización clave en este lanzamiento es la mejora del módulo Price Watcher. Ahora incluye un mecanismo para verificar si el precio de un token está actualizado, lo que ayuda a evitar decisiones de market making basadas en datos obsoletos. La base de código también ha sido significativamente refactorizada para mejorar la estabilidad general, el rendimiento y la mantenibilidad a medida que los proyectos crecen.

Se han introducido nuevas configuraciones `dev` y `clear_db`. La configuración `dev` simplifica las pruebas y el desarrollo, mientras que `clear_db` ofrece una forma rápida de limpiar la base de datos, útil para restablecer entornos. Las dependencias se han actualizado para garantizar compatibilidad con las últimas bibliotecas, mejorando la seguridad y el rendimiento.

Otras mejoras incluyen correcciones menores de errores, nuevas pruebas manuales integradas para verificar las instalaciones antes del despliegue, y un README completamente revisado con guías actualizadas de instalación y uso. El lanzamiento y el registro de cambios están disponibles en el repositorio de GitHub de ADAMANT.
