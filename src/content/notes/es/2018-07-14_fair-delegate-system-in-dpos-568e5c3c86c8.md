---
title: "Sistema Justo de Delegados en dPoS"
slug: "fair-delegate-system-in-dpos-568e5c3c86c8"
description: "La descentralización es un atributo crítico de ADAMANT, y el equipo ha evaluado mejoras posibles al ecosistema analizando lecciones de otras redes dPoS como Lisk."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/fair-delegate-system-in-dpos-568e5c3c86c8"
publishedAt: "2018-07-14T10:22:15.269Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/568e5c3c86c8/001-0-b1b6dbg3hvdjf9i4.webp"
cardSpan: "full"
originalId: "medium:568e5c3c86c8"
locale: "es"
placeholder: false
---

La descentralización es un atributo crítico de ADAMANT, y el equipo ha evaluado mejoras posibles al ecosistema analizando lecciones de otras redes dPoS como Lisk.

En Lisk, convertirse en delegado activo requiere aproximadamente 29 millones de LSK en votos, y más de 1.600 delegados han sido relegados permanentemente al modo de Espera. El delegado activo con el rango más bajo posee un peso de voto de casi 28,7 millones de LSK, lo que representa una barrera de entrada extremadamente alta.

![Sistema Justo de Delegados en dPoS](/images/engineering-notes/medium/568e5c3c86c8/002-0-gyx2cakh6c0w-8a.webp)

El problema principal es que en un sistema dPoS convencional, una sola billetera "gruesa" puede distribuir votos igualmente gruesos a una larga lista de delegados de una sola vez. Una billetera que vota por 101 delegados puede efectivamente someter a toda la red a su control.

ADAMANT aborda esto **dividiendo el peso del voto de cada billetera por el número de delegados por los que vota**:

> *Peso del voto = ADM / Votos*

Por ejemplo, si Bob tiene 100 ADM y vota por dos delegados, mientras que Alice tiene 80 ADM y vota por uno solo, el voto de Bob se divide en 50 por delegado. El único delegado de Alice recibe los 80 completos. Bajo el modelo de Lisk, cada delegado de Bob recibiría 100, más que el de Alice, lo cual es injusto. Bajo el modelo de ADAMANT, el delegado de Alice tiene mayor influencia, reflejando una distribución más equitativa.

Un segundo parámetro, **Productividad**, refina aún más el peso del voto. La red requiere delegados diligentes que no omitan bloques, asegurando que los mensajes en ADAMANT Messenger se entreguen sin demora. La productividad varía entre 0,05 % y 100 %, reduciendo el peso del voto para delegados que no mantienen nodos confiables. Cuando un delegado comienza a forjar, la productividad no se cuenta durante los primeros 200 bloques (producidos más perdidos).

La fórmula final es:

> *Peso del voto = ADM / Votos × Productividad*

Este enfoque se denomina **dPoS Justo**. Reduce la influencia de las billeteras gruesas a niveles razonables y baja la barrera de entrada para forjar. El factor de productividad motiva a los delegados a ejecutar nodos en hardware más potente en lugar de configuraciones mínimas. Dado que tanto la distribución de tokens como la productividad de los delegados cambian con el tiempo, la lista de 101 delegados que forjan se reconstruye regularmente, dando a los delegados en Espera una oportunidad realista de regresar al forjado.

Los usuarios con saldos pequeños de ADM también pueden participar formando grupos. Estos cambios entraron en vigor a partir de la versión 0.4.0, desde el bloque 4359464.
