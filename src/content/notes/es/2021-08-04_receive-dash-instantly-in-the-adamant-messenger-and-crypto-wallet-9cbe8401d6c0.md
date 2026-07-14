---
title: "Recibe DASH instantáneamente en ADAMANT Messenger y la billetera cripto"
slug: "receive-dash-instantly-in-the-adamant-messenger-and-crypto-wallet-9cbe8401d6c0"
description: "ADAMANT Messenger 2.12.0 añade soporte para Dash InstantSend, permitiendo recibir transferencias DASH al instante sin esperar confirmaciones de red. Mejoras adicionales incluyen velocidad en actualizaciones de estado y un bot de recompensas."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/receive-dash-instantly-in-the-adamant-messenger-and-crypto-wallet-9cbe8401d6c0"
publishedAt: "2021-08-04T13:23:12.613Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/9cbe8401d6c0/001-0-omadd6rxri1q0dfd.webp"
cardSpan: "full"
originalId: "medium:9cbe8401d6c0"
locale: "es"
placeholder: false
---

ADAMANT Messenger versión 2.12.0 introduce soporte para Dash InstantSend, lo que permite recibir transferencias de DASH al instante sin tener que esperar confirmaciones de red. Normalmente, las transferencias de criptomonedas requieren esperar confirmaciones de bloques, pero Dash InstantSend utiliza nodos maestros para verificar transacciones y garantizar su inclusión en bloques posteriores. Junto con esto, la actualización mejora la velocidad en las actualizaciones del estado de las transacciones para otras criptomonedas compatibles.

El lanzamiento también integra directamente en los chats un bot de recompensas ADM. Este bot paga automáticamente e instantáneamente recompensas por tareas completadas y actualmente soporta campañas en Twitter. Los usuarios pueden enviar el comando `/help` al bot para conocer las reglas de la campaña.

![Recibe DASH instantáneamente en ADAMANT Messenger y la billetera cripto](/images/engineering-notes/medium/9cbe8401d6c0/002-0-hofe2-yqoknm1e74.webp)

Para garantizar la confiabilidad y seguridad del código, la actualización eleva las dependencias a versiones sin vulnerabilidades conocidas. La huella de la aplicación se ha reducido eliminando listas bip39 no utilizadas en idiomas no ingleses. Además, se ha optimizado la generación de claves criptográficas para las billeteras cripto integradas, haciendo que el inicio de sesión en una nueva cuenta sea aproximadamente seis veces más rápido gracias al almacenamiento en caché de la semilla. Otras tareas de mantenimiento incluyen la actualización de bibliotecas de Ethereum, la eliminación del enlace al exchange Atomars (obsoleto) y varias correcciones de errores.
