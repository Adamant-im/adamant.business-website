---
title: "DPoS explicado — sencillamente"
slug: "dpos-explained-simply-15a407ec7ebe"
description: "La blockchain es una tecnología distribuida. A diferencia de los sistemas centralizados, ninguna persona tiene control total sobre la red; solo la comunidad conectada en su conjunto tiene esa influencia."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/dpos-explained-simply-15a407ec7ebe"
publishedAt: "2018-06-20T13:44:33.120Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/15a407ec7ebe/001-0-boc7uxzeiy2c0lhm.webp"
cardSpan: "full"
originalId: "medium:15a407ec7ebe"
locale: "es"
placeholder: false
---

La blockchain es una tecnología distribuida. A diferencia de los sistemas centralizados clásicos, ninguna persona individual tiene un poder extenso sobre la red; solo la comunidad conectada en su totalidad posee dicha influencia. Para que el sistema sea verdaderamente distribuido, el método **Proof-of-Work (PoW)** se implementó mediante un proceso conocido como minería (por ejemplo, Bitcoin, Litecoin). Si la computadora de Bob es más rápida que la de Alice, él tiene más influencia en la red.

La minería tiene un inconveniente importante, sin embargo: altos costos de electricidad. Un método alternativo, el **Proof-of-Stake (PoS)** (por ejemplo, PeerCoin, NXT), fue creado para abordar esto. En PoS, la influencia de un usuario depende de su participación activa en la red. Supongamos que Bob tiene 100 monedas de la red y Alice tiene 90. Bob tiene más influencia, pero si vende 20 monedas, queda en 80 y Alice adquiere mayor influencia.

La siguiente mejora es el **Delegated Proof-of-Stake (dPoS)** y sus variaciones, utilizado por proyectos como BitShares, Lisk y ADAMANT Messenger. Este método funciona de forma similar al PoS, pero con una característica distintiva importante: puedes transferir (delegar) tu influencia en la red a otros usuarios.

Supongamos que Bob tiene 100 monedas y Alice tiene 80. Bob vota (delega influencia) por Bill y Helen, y Alice vota por Mark. En el caso del dPoS de Lisk, Bill y Helen son más influyentes (100) que Mark (80), lo cual es considerado injusto según algunas valoraciones.

> ADAMANT mejoró este sistema dPoS al reducir el peso del voto según el número de votos. Dado que Bob vota por dos delegados, su voto se divide en 100/2 = 50. Así, Bill y Helen tienen cada uno un impacto de 50, mientras que Mark tiene 80. La influencia de Mark se vuelve mayor que la de Bill y Helen.

El dPoS mejorado de ADAMANT también considera la **productividad del nodo**. Los nodos más rápidos y exitosos, que no omiten bloques, reciben un mayor peso de voto. Este enfoque se denomina **Fair dPoS**.

Fair dPoS permite que los participantes más importantes de la red aseguren que todo funcione como debe. Los delegados no solo son responsables del correcto funcionamiento de la red, sino que también reciben una recompensa en monedas por su función.

Para convertirse en delegado en la red ADAMANT, debes instalar un nodo, registrarte como delegado y obtener los votos de usuarios que confíen en ti. Debes acumular suficientes votos para que la suma de las monedas de tus votantes te posicione dentro de la lista de los 101 principales delegados.
