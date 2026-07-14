---
title: "ADAMANT: Más allá del mensajería básica — Transferencias multi-token y privacidad"
slug: "adamant-project-is-more-ambitious-than-you-thought-bcff97b3e65f"
description: "El proyecto de código abierto ADAMANT amplía su mensajero para incluir transferencias privadas de múltiples criptomonedas y proteger la privacidad del usuario."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-project-is-more-ambitious-than-you-thought-bcff97b3e65f"
publishedAt: "2018-06-02T12:39:07.116Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/bcff97b3e65f/001-0-no5snmhgxset6lqg.webp"
cardSpan: "full"
originalId: "medium:bcff97b3e65f"
locale: "es"
placeholder: false
---

El proyecto de código abierto ADAMANT ha desarrollado un mensajero con mensajería privada instantánea y transferencias del token ADM. El equipo de desarrollo ahora se enfoca en ampliar la plataforma para admitir transferencias multi-token dentro de chats privados, con el objetivo de permitir que criptomonedas como Bitcoin, Ethereum y Lisk sean enviadas y recibidas directamente a través del mensajero.

El token ADM sustenta la economía de la plataforma. Actúa como tarifa de transferencia para mensajería y pagos, manteniendo la infraestructura de la red. Con un tiempo de bloque de 5 segundos, el ADM permite velocidades de transacción rápidas y es accesible directamente desde las pantallas de chat para pagos. El ADM opera como un sistema de tokens completamente independiente y autosuficiente.

![ADAMANT Project is more ambitious than you thought.](/images/engineering-notes/medium/bcff97b3e65f/002-0-8ofcnhmzjqjcc-p8.webp)

La incorporación de criptomonedas importantes al ecosistema de transferencias tiene como objetivo atraer usuarios de esas comunidades a la plataforma ADAMANT Messenger, generando mayores tarifas y mayor demanda del ADM.

## Arquitectura de privacidad

ADAMANT es una plataforma blockchain segura para transferencias de datos y mensajes, construida sobre una base de código Lisk. La blockchain proporciona anonimia que impide que el historial de chat de un usuario sea rastreado. A diferencia de las redes sociales centralizadas que recopilan y almacenan datos personales en servidores de terceros vulnerables a violaciones, ADAMANT solo requiere una clave privada para usar el sistema, que puede generarse con un solo clic.

Los usuarios no necesitan proporcionar nombres, direcciones de correo electrónico, números de teléfono ni información del dispositivo. La base de código de código abierto permite que cualquiera audite la autenticidad del sistema y cree implementaciones independientes.

Las principales características de privacidad incluyen la ausencia de acceso a libretas de direcciones de usuario o información de ubicación, anonimia completa sin identificaciones de usuario, y cifrado de extremo a extremo, donde los mensajes se cifran en el dispositivo del remitente y se descifran en el lado del destinatario. La aplicación cliente realiza todas las operaciones criptográficas localmente y nunca transmite la clave privada o la frase mnemónica a través de la red. El historial de mensajes se carga directamente desde la blockchain en lugar de almacenarse localmente, y, a diferencia de los mensajeros P2P, las direcciones IP de los usuarios no pueden obtenerse. Las cuentas de ADAMANT no pueden ser cerradas, bloqueadas ni limitadas por nadie, incluidos los desarrolladores.

ADAMANT demuestra que los mensajeros basados en blockchain ofrecen ventajas en apertura, protección de mensajes, distribución e infraestructura confiable, proporcionando mensajería anónima sin interrupción ni regulación por terceros.
