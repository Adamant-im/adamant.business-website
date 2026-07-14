---
title: "ADAMANT Pool v2.0.0 lanzado"
slug: "new-version-of-the-forging-pool-software-adamant-pool-v2-0-0-aca713a5a3d6"
description: "ADAMANT Pool v2.0.0 presenta una reescritura completa del código centrada en confiabilidad y rendimiento. Ahora usa la API JS v1.0.0 para garantizar que los votantes reciban sus recompensas correctamente y a tiempo."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/new-version-of-the-forging-pool-software-adamant-pool-v2-0-0-aca713a5a3d6"
publishedAt: "2021-06-19T14:05:48.039Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/aca713a5a3d6/001-0-nfjyvf39o49caqs7.webp"
cardSpan: "full"
originalId: "medium:aca713a5a3d6"
locale: "es"
placeholder: false
---

ADAMANT Pool v2.0.0 introduce una reescritura completa del código centrada en la confiabilidad y el rendimiento. Ahora el pool utiliza la API JS de ADAMANT v1.0.0, asegurando que los votantes reciban sus recompensas correctamente y a tiempo. Los requisitos de recursos se han reducido significativamente; el pool ahora puede ejecutarse en una máquina virtual con 1 vCPU y 512 MB de RAM. Esta eficiencia se logró eliminando dependencias innecesarias, actualizando las restantes y reemplazando la biblioteca `request` por `axios`.

Se han realizado varios cambios en la configuración. El puerto predeterminado ahora es 36667 en lugar de 36668. El archivo de configuración incluye una nueva opción `log_level` y un parámetro `donatewallet` para compartir un porcentaje de las recompensas con la Fundación ADAMANT. Los períodos de pago ahora pueden programarse usando una opción de día de la semana para `payoutperiod`. Además, la tarifa de transacción de votación ahora es pagada por los votantes, lo que resulta en 0.5 ADM menos por recompensa. Los operadores deben ajustar el parámetro `minpayout` para asegurar que los pagos sigan siendo razonables en relación con la tarifa. La productividad del delegado ahora se cuenta durante la distribución de recompensas.

Otras actualizaciones incluyen refactorización del código, eliminación del modo de solo lectura y funciones Markdown adicionales para el notificador. También se ha actualizado el diseño del panel de información del dashboard del pool.

![Nueva versión del software de pool de forjado ADAMANT Pool v2.0.0](/images/engineering-notes/medium/aca713a5a3d6/002-0-vrmyfc6ou3ue0xnb.webp)

Al actualizar un pool existente, se recomienda eliminar la instalación anterior y realizar una instalación limpia. Sin embargo, se debe conservar el archivo `/db/transactions` que contiene el historial de transacciones.
