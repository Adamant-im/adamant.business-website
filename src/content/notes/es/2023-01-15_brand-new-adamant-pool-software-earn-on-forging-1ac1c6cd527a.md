---
title: "ADAMANT Pool v3.0.0 — Actualización del software de pool de forjado"
slug: "brand-new-adamant-pool-software-earn-on-forging-1ac1c6cd527a"
description: "Una actualización del software de pool de forjado permite a los usuarios combinar su peso de voto y compartir recompensas ADM automáticamente en la blockchain ADAMANT."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/brand-new-adamant-pool-software-earn-on-forging-1ac1c6cd527a"
publishedAt: "2023-01-15T15:59:48.033Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/1ac1c6cd527a/001-0-rvpkdxtavqcrrn3p.webp"
cardSpan: "full"
originalId: "medium:1ac1c6cd527a"
locale: "es"
placeholder: false
---

Un pool de forjado permite a los usuarios combinar su peso de voto para forjar bloques en la blockchain ADAMANT y compartir recompensas ADM automáticamente. El programa del pool gestiona el cálculo y la distribución de recompensas sin intervención manual.

La versión 3.0.0 del pool de forjado ADAMANT ya está disponible como [código abierto](https://github.com/Adamant-im/pool). La base de código ha sido completamente revisada en un nuevo repositorio, dejando obsoleto el anterior. La reescritura incluye dependencias de bibliotecas actualizadas, mejor rendimiento y menor uso de recursos. El formato de configuración permanece sin cambios, y se proporciona un script de migración para los operadores que actualizan desde la v2.

El cambio más notable para los votantes es una nueva interfaz web desarrollada con el framework `svelte`, que ofrece una experiencia receptiva tanto en dispositivos de escritorio como móviles.

![Interfaz web de ADAMANT Pool](/images/engineering-notes/medium/1ac1c6cd527a/002-0-eus0ye-v8djitrru.webp)

![Interfaz web móvil de ADAMANT Pool](/images/engineering-notes/medium/1ac1c6cd527a/003-0-cdfhik804ra3jq2w.webp)

La versión v3.0.0 actualiza todas las dependencias, reescribe el panel de control en `svelte` y rediseña y optimiza toda la base de código, corrigiendo al mismo tiempo errores conocidos.

Hay dos cambios incompatibles que deben tenerse en cuenta. Primero, ahora se requiere Node.js 18.12.1 o posterior (LTS actual); ya no se admiten versiones anteriores. Segundo, el pool ahora utiliza `lowdb` como base de datos. Los operadores que actualicen desde la v2 deben consultar la sección de migración en el archivo README.

Votar por un pool apoya la red descentralizada ADAMANT y genera ingresos pasivos en forma de recompensas de forjado. Una lista de pools ADAMANT activos está disponible en la [documentación de ADAMANT](https://medium.com/adamant-im/hodl-list-of-adamant-pools-join-in-and-get-rewards-491a98610f4b).
