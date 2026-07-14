---
title: "La ilusión de TPS: Por qué las blockchains de alta velocidad mienten sobre la descentralización"
slug: "the-tps-illusion-why-high-speed-blockchains-lie-about-decentralization-17baee0826f3"
description: "La cruda verdad: el TPS destruye la descentralización. Cada nueva cadena promete 100.000 TPS y finalidad subsegundo, pero la física y la red lo impiden."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/the-tps-illusion-why-high-speed-blockchains-lie-about-decentralization-17baee0826f3"
publishedAt: "2025-11-30T14:10:17.731Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/17baee0826f3/001-1-v56lizsnpjrlqz2jzw0tpw-png.webp"
cardSpan: "full"
originalId: "medium:17baee0826f3"
locale: "es"
placeholder: false
---

### La cruda verdad: el TPS destruye la descentralización

Cada nueva cadena "a prueba de futuro" promete 100.000 TPS, finalidad subsegundo y consenso de próxima generación. Sin embargo, la física, las redes y la realidad del hardware destruyen inmediatamente este cuento de marketing. No se puede tener un rendimiento extremo y una descentralización extrema al mismo tiempo; cuanto mayor sea el TPS, menos personas podrán ejecutar un nodo.

Para procesar entre 10.000 y 20.000 transacciones por segundo, un nodo debe validar hasta 1,2 millones de transacciones por minuto, mantener actualizaciones de estado en RAM, escribir grandes volúmenes de datos en NVMe, sincronizar bloques en la red en menos de 100 ms y ejecutar EVM o una VM personalizada a velocidades de centro de datos. Esto elimina instantáneamente a los validadores domésticos, servidores VPS económicos, nodos de aficionado y a cualquier persona sin hardware de nivel empresarial. La descentralización es simplemente la capacidad de una persona promedio para ejecutar un nodo completo. Si la respuesta es no, la cadena está centralizada.

### Realidad: Requisitos de hardware en distintas redes

Bitcoin sigue siendo el estándar oro de la descentralización con un TPS de aproximadamente 7. Cualquier hardware de consumo, incluyendo una Raspberry Pi con 4 a 8 GB de RAM y un disco HDD o SSD de 400 a 600 GB, puede ejecutar un nodo. La minería requiere una inversión única de $500 en hardware más electricidad. Esta máxima accesibilidad significa que existen decenas de miles de nodos, manteniendo la red descentralizada. Bitcoin es lento a propósito; lo lento significa accesible y descentralizado.

Ethereum representa un punto intermedio con 15 a 30 TPS. Los nodos requieren un SSD de 2 TB, 16 a 32 GB de RAM, una CPU multi-núcleo y ancho de banda estable. Validar bloques requiere 32 ETH (más de $100.000) además de costos de hardware cercanos a $1.500. Aunque técnicamente es semi-descentralizado con miles de validadores, es centralizado económicamente y demasiado pesado para usuarios casuales. Ethereum escala mediante rollups en capa 2, no mediante inflación en capa 1, lo cual es un diseño correcto.

Solana es rápida pero centralizada por defecto. Aunque anuncia más de 50.000 TPS, el rendimiento real es de 300 a 1.500. Los nodos exigen 256 GB de RAM, una CPU de gama alta de 16 a 32 núcleos, 2 a 4 TB de NVMe y ancho de banda de 1 a 10 Gbps. El hardware cuesta entre $5.000 y $10.000, además de una conexión a internet de nivel centro de datos. Solo los centros de datos pueden ejecutar validadores, lo que lleva a una centralización técnica y económica. Solana sacrifica conscientemente la descentralización por rendimiento.

Monad promete 10.000 a 20.000 TPS como una "EVM de rendimiento Solana", pero requiere hardware al nivel de Solana: 64 a 256 GB de RAM, CPU de 8 a 32 núcleos y 2 a 4 TB de NVMe. El costo del hardware supera los $5.000, y el requisito de participación probablemente sea alto debido a la asignación dominada por capital riesgo (VC). Los validadores serán exclusivamente actores de centros de datos, resultando en centralización técnica y económica. Monad es simplemente Solana con Solidity: un diseño válido, pero no descentralizado.

Litecoin (LTC) es estable, conservador y suficientemente descentralizado con aproximadamente 56 TPS. Los nodos necesitan un SSD ligero y 4 a 8 GB de RAM, lo que lo hace compatible con hardware doméstico. Los costos de minería son similares a los de Bitcoin. Sigue siendo verdaderamente descentralizado porque se mantuvo pequeño y conservador.

ADAMANT (ADM) es pequeño, lo suficientemente rápido y genuinamente descentralizado con un TPS en las decenas. Un nodo validador completo se ejecuta en un VPS de $5/mes con 2 vCPU, 2 GB de RAM y un SSD de 60 a 80 GB. La creación de bloques requiere una participación de alrededor de 500.000 ADM (aproximadamente $7.000), con pools de creación disponibles para entrada casi sin costo. Cualquiera puede ejecutar un nodo sin dependencia de centros de datos, logrando una alta descentralización por participación.

### Asignación de capital y falsa descentralización

La otra mitad de la descentralización que nadie discute es la asignación de capital y el dominio de capital riesgo (VC). Un alto TPS combinado con una alta asignación a VC crea dos capas de centralización simultáneamente, lo que lleva a una futura presión de venta y control.

![La ilusión de TPS: Por qué las blockchains de alta velocidad mienten sobre la descentralización](/images/engineering-notes/medium/17baee0826f3/002-1-tuy7beyom37poplwpaklag-png.webp)

Muchas cadenas modernas se promocionan ofreciendo "descentralización a escala web" o "alto TPS sin sacrificar seguridad". En realidad, si solo el 0,01 % de los usuarios puede ejecutar un nodo, no es un sistema descentralizado, sino una CDN con un token. Es mejor tener un sistema honestamente centralizado que una cadena que finge ser descentralizada pero no lo es. La centralización honesta ofrece gobernanza predecible y rendimiento confiable, mientras que la centralización oculta crea suposiciones falsas de seguridad y fallos catastróficos.

![La ilusión de TPS: Por qué las blockchains de alta velocidad mienten sobre la descentralización](/images/engineering-notes/medium/17baee0826f3/003-1-yjn8ft-7uxsr-npfs1flyg-png.webp)

### Conclusión: el TPS es la nueva métrica fraudulenta

Los proyectos seguirán prometiendo miles de TPS y cadenas más rápidas. La conclusión es brutalmente simple: cuanto más TPS apunte una cadena, menos personas podrán ejecutarla. Cuantas menos personas puedan ejecutarla, menos descentralizada y menos segura será. La verdadera descentralización no es glamorosa, rápida ni amigable con el capital riesgo. Es económica, accesible, aburrida, resistente y resistente a la censura. Por eso sistemas como Bitcoin, Litecoin y ADAMANT sobreviven a los ciclos.
