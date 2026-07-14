---
title: "Los mensajes descentralizados necesitan tiempo"
slug: "decentralized-messaging-needs-a-time-d5af2289041c"
description: "por Aleksei Lebedev, fundador de ADAMANT Messenger. La invasión de la privacidad es habitual mientras la tecnología permea la vida diaria. Los mensajes son una de las formas más comunes de comunicación en línea…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/decentralized-messaging-needs-a-time-d5af2289041c"
publishedAt: "2020-04-06T10:21:32.885Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/d5af2289041c/001-0-cubdo3cy7xzrqg2m.webp"
cardSpan: "full"
originalId: "medium:d5af2289041c"
locale: "es"
placeholder: false
---

*por Aleksei Lebedev, fundador de ADAMANT Messenger*

La invasión de la privacidad se ha vuelto rutina a medida que la tecnología penetra en la vida diaria. Los mensajes son una de las formas más comunes de comunicación en línea, sin embargo pocos usuarios reflexionan sobre dónde van sus datos tras pulsar enviar. Los mensajeros populares pertenecen a grandes corporaciones que recopilan la mayor cantidad posible de información personal: conexiones, uso de la aplicación, transacciones e incluso datos que otros proporcionan sobre ti. Esta información se almacena en servidores centralizados que son objeto de violaciones con frecuencia, demostrando que ni siquiera las empresas más grandes pueden garantizar la seguridad.

### ¿En quién confiar?

La respuesta corta: no confíes en nadie. Signal, a menudo citado como mensajero seguro, aún identifica a los usuarios por número de teléfono. Precisamente por eso existen Bitcoin y las aplicaciones descentralizadas: para operar en un entorno sin confianza. La tecnología blockchain introduce un diseño en el que la seguridad y confiabilidad pueden verificarse sin necesidad de comprender el código subyacente.

Tras tres años de desarrollo, ADAMANT ha confirmado su concepto de mensajero blockchain descentralizado, con aplicaciones disponibles para iOS, Web PWA, Windows, GNU/Linux, macOS y Android.

### El prototipo

La blockchain permite crear cuentas en segundos sin credenciales como números de teléfono o correos electrónicos. Los usuarios pueden cambiar de cuenta libremente, sin dejar rastro de que las cuentas les pertenecieron. Las direcciones IP están ocultas y las ubicaciones son irreastreables porque todos los datos se enrutan a través de nodos distribuidos, y las aplicaciones no tienen acceso a la libreta de contactos. No existe una autoridad central que verifique la autenticidad de los mensajes: esto lo gestiona un sistema distribuido basado en consenso, propiedad de los usuarios. La censura es imposible: las cuentas no pueden bloquearse y los mensajes no pueden eliminarse.

![Los mensajes descentralizados necesitan tiempo](/images/engineering-notes/medium/d5af2289041c/002-1-jrg9wiqqat22kbcwkhyaag-png.webp)

ADAMANT trata los mensajes como transacciones. Cada mensaje se firma con Ed25519 EdDSA, eliminando ataques de intermediario. Los mensajes entran en bloques, y como la secuencia de bloques y las marcas de tiempo son inmutables, se garantiza el orden de los mensajes: la frase "yo no dije eso" no funciona con mensajes almacenados en blockchain. Todos los mensajes están cifrados de extremo a extremo, y el código de ADAMANT es completamente de código abierto.

Dado que los diálogos se almacenan en la blockchain, no se requiere almacenamiento local, lo que mejora la seguridad y permite acceder a las conversaciones desde cualquier dispositivo o ubicación.

![Los mensajes descentralizados necesitan tiempo](/images/engineering-notes/medium/d5af2289041c/003-0-iccadzxqtzq4ocze.webp)

La mensajería blockchain también abre nuevas oportunidades. La confirmación de entrega de mensajes es útil para notificaciones críticas. La integración con Ethereum, Dogecoin, Lisk, Dash y Bitcoin permite transferencias cripto dentro del chat, y ADAMANT incluye un intercambiador cripto integrado. El 2FA de ADAMANT ofrece una alternativa basada en blockchain a la autenticación en dos pasos basada en SMS, que tiene debilidades de seguridad conocidas.

### Los cambios no son asuntos triviales

Desarrollar un verdadero mensajero blockchain requiere mucho más esfuerzo que un mensajero tradicional: no hay precedentes. Más allá de los desafíos técnicos, la adopción masiva enfrenta un obstáculo más profundo: primero las personas deben cambiar su mentalidad.

### Cambio de paradigma

El problema central es la responsabilidad. A las personas les gusta evitarla. Cuando una cuenta bancaria es comprometida, hay buenas posibilidades de que el banco recupere los fondos perdidos. Cuando una billetera de Bitcoin es comprometida, no hay nadie a quien reclamar. Los valores de las monedas fiduciarias están garantizados por los gobiernos; nadie garantiza el valor de Bitcoin.

La mensajería descentralizada es aún más difícil de aceptar para los usuarios. Preguntan: "¿Y si pierdo mi clave privada? ¡Todas mis conversaciones serán robadas!" — y no les gusta la respuesta: mantén tu clave privada a salvo. Con Facebook, los usuarios pueden culpar a la empresa por fallos de seguridad. Con un mensajero descentralizado, no hay nadie a quien culpar. Eso se llama responsabilidad.

### Preferencia por pagar costos ocultos

Los usuarios tienden a evitar pagos directos, prefiriendo costos ocultos —incluso cuando esos costos implican entregar sus datos personales y conversaciones. No existe el almuerzo gratis.

Con ADAMANT, el precio es explícito. Cada acción, incluido el envío de mensajes o guardar contactos, tiene una tarifa de red de 0.001 ADM. Los críticos preguntan si la gente pagará por enviar mensajes cuando existen alternativas gratuitas, pero malinterpretan el modelo: las tarifas van a los operadores de nodos, no a los desarrolladores, al igual que las tarifas de transacción de Bitcoin no van a los desarrolladores de Bitcoin.

### El tiempo pone a prueba la verdad

La blockchain es solo un intento de crear un mensajero descentralizado. Si tendrá éxito, el tiempo lo dirá. Pero eventualmente un mensajero revolucionario logrará una adopción masiva a escala de Facebook.

ADAMANT ha demostrado que puede existir un mensajero blockchain. El único intento previo fue Bitmessage en 2012, que fracasó debido a largos tiempos de entrega de mensajes, carga de CPU y falta de aplicaciones móviles.

El escepticismo actual proviene del hecho de que los mensajeros blockchain están por delante de su tiempo. Las personas aún no están preparadas para asumir la responsabilidad de sus cuentas, la propiedad de la información personal aún no está de moda, y la tecnología blockchain actual no ofrece altas velocidades. Si no es ADAMANT, en el futuro aparecerán análogos más avanzados.
