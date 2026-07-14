---
title: "Descripción general de la encriptación en ADAMANT Messenger"
slug: "encryption-overview-in-adamant-messenger-878ecec1ff78"
description: "ADAMANT utiliza algoritmos criptográficos consolidados como Bitcoin, Ethereum y Signal. La cadena de bloques garantiza descentralización, anonimato e integridad de mensajes."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/encryption-overview-in-adamant-messenger-878ecec1ff78"
publishedAt: "2021-02-20T08:36:23.523Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/878ecec1ff78/001-1-z7yxhckijxqq1g7m-pnbq-png.webp"
cardSpan: "full"
originalId: "medium:878ecec1ff78"
locale: "es"
placeholder: false
---

ADAMANT se basa en los mismos algoritmos criptográficos bien establecidos que utilizan Bitcoin, Ethereum, Signal, Tor, OpenSSH y muchos otros. La criptografía es conservadora por naturaleza, y cada cifrado debe resistir la prueba del tiempo. Lo que distingue a ADAMANT es que la propia blockchain garantiza la descentralización, el anonimato mediante seudonimia, la integridad y el orden de los mensajes, el almacenamiento permanente, la entrega confiable y la resistencia a los ataques de intermediario (Man-in-the-Middle). Cada nodo de la red verifica los mensajes y transacciones, no el destinatario ni una autoridad central. El costo de esta descentralización son las tarifas de transacción que compensan a los operadores de nodos.

### Cuenta y par de claves

Una cuenta de ADAMANT comienza con una frase mnemotécnica BIP39 de 12 palabras, que proporciona aproximadamente 132 bits de entropía a través de unas 2048¹² combinaciones posibles. La semilla BIP39 se hashea con SHA-256 para producir un valor de 256 bits, a partir del cual se derivan las claves de firma digital Ed25519: una clave pública de 256 bits y una clave privada de 512 bits. Esto ofrece una seguridad comparable a RSA con claves de ~3000 bits o cifrados simétricos fuertes de 128 bits. La dirección ADM que ve el usuario es una 'U' seguida de 8 bytes del hash SHA-256 de la clave pública, lo que da como resultado un identificador de 64 bits. La clave pública Ed25519 se publica en la blockchain con la primera transacción saliente del usuario.

### Encriptación de mensajes

Para mensajería encriptada, las claves de firma Ed25519 del usuario se convierten en claves Diffie-Hellman Curve25519 —una clave pública de 256 bits y una clave secreta de 256 bits—, lo que permite el cifrado asimétrico entre las partes. Los mensajes se cifran con el cifrado Curve25519-XSalsa20-Poly1305 (NaCl.box), que utiliza XSalsa20 con un nonce de 192 bits y Poly1305 para cifrado autenticado, verificando tanto la integridad de los datos como la autenticidad del mensaje.

### Almacenamiento clave-valor (KVS)

Para el almacenamiento clave-valor, las claves de firma Ed25519 del usuario se utilizan para derivar una clave secreta XSalsa20-Poly1305. Los datos se serializan en un objeto JSON con ruido agregado, luego se cifran con NaCl.secretbox, utilizando nuevamente XSalsa20 con un nonce de 192 bits y Poly1305 para verificación de integridad y autenticidad.

### Firmas de transacciones

Los datos de la transacción —incluyendo la marca de tiempo y cualquier mensaje encriptado— se hashean con SHA-256. El remitente firma este hash con Ed25519 utilizando su clave pública de 256 bits y su clave privada de 512 bits. El ID de la transacción son 8 bytes del hash SHA-256 de la firma resultante.

Referencias técnicas detalladas sobre generación de claves, encriptación/desencriptación de mensajes y firma de transacciones están disponibles en la wiki del proyecto ADAMANT en GitHub.

### Almacenamiento en blockchain y computadoras cuánticas

Algunos usuarios temen que el almacenamiento permanente en cadena de mensajes encriptados cree una vulnerabilidad futura: cuando las computadoras cuánticas maduren, ¿podría descifrarse retrospectivamente toda la correspondencia almacenada?

Esta preocupación no es exclusiva de ADAMANT. La criptoanálisis cuántico amenaza a toda la infraestructura de TI —secretos de estado, tráfico de internet, datos almacenados— porque prácticamente todos los sistemas modernos dependen de las mismas familias de primitivas criptográficas. Programas de vigilancia masiva como PRISM ya capturan y retienen tráfico, por lo que los datos encriptados interceptados hoy podrían ser objetivo de avances criptoanalíticos futuros, independientemente de la plataforma utilizada.

El criptoanálisis cuántico no es una varita mágica. Ofrece aceleraciones teóricas para ciertos problemas, pero los cifrados actuales tienen márgenes de seguridad significativos que podrían hacer que estas aceleraciones sean ineficaces en la práctica. Además, un atacante no puede descifrar masivamente una blockchain entera; cada cuenta utiliza claves de cifrado distintas, por lo que el esfuerzo debe invertirse por cuenta. Dado que las cuentas de ADAMANT son anónimas, un adversario primero tendría que identificar qué cuentas merecen ser atacadas.

Es probable que el criptoanálisis cuántico práctico esté a décadas de distancia, y la amenaza dominante para la criptografía durante ese tiempo podría ser algo distinto a las computadoras cuánticas. Si los algoritmos poscuánticos se vuelven necesarios, ADAMANT puede adaptar su criptografía, al igual que otros mensajeros y protocolos.

Para la seguridad operacional, ADAMANT es mejor usarlo para correspondencia de un solo uso o a corto plazo con cambios frecuentes de cuenta. Crear una nueva cuenta toma aproximadamente un segundo, lo que hace práctico rotar identidades y limita el valor de cualquier cuenta comprometida individualmente.
