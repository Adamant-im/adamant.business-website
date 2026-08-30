---
title: "Un mensajero no es suficiente: elegir el canal adecuado para cada conversación"
slug: "one-messenger-is-not-enough-choosing-the-right-channel-for-every-conversation-0dd0cf0ff85b"
description: "Las conversaciones cotidianas, contraseñas, identidades temporales, trabajo y crisis requieren distintos niveles de privacidad. No todos los mensajeros son iguales."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/one-messenger-is-not-enough-choosing-the-right-channel-for-every-conversation-0dd0cf0ff85b"
publishedAt: "2026-08-30T06:59:07.684Z"
author: "ADAMANT Messenger"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:0dd0cf0ff85b"
coverImage: "/images/engineering-notes/medium/0dd0cf0ff85b/001-27ddbc6fe7.webp"
locale: "es"
placeholder: false
---

Las conversaciones cotidianas, las contraseñas, las identidades temporales, el trabajo y la comunicación en situaciones de crisis no requieren el mismo tipo de privacidad. Hablamos de los mensajeros como si fueran contenedores intercambiables: elegimos el que tiene el cifrado más robusto, trasladamos allí todas las conversaciones y el problema queda resuelto. Sin embargo, la comunicación real es menos ordenada.

Un grupo familiar necesita fiabilidad y un descubrimiento de contactos sencillo. Un equipo de soporte necesita funciones de búsqueda, retención y administradores responsables. Un periodista que se reúne con una fuente puede preferir no usar número de teléfono, ni identificadores reutilizables, ni metadatos de relación. Una persona que transfiere un token de API no debería crear un registro de chat permanente en absoluto. Durante un apagón de internet, el mejor servicio en la nube es aquel al que no puedes acceder.

> El mejor mensajero no es el que tiene la lista de verificación de seguridad más larga, sino aquel cuyos modos de fallo se ajustan a la conversación.

Este artículo no es una clasificación universal, sino un mapa basado en la investigación sobre casos de uso de comunicación, decisiones arquitectónicas y compromisos, incluyendo aquellos momentos en los que un mensajero es la herramienta equivocada.

### La seguridad no es una tabla de clasificación

El término "seguro" puede describir varias propiedades distintas que es fácil confundir. La **confidencialidad del contenido** se refiere a si el servicio o un observador de la red puede leer el mensaje. La **privacidad de la identidad** trata sobre si debes revelar un número de teléfono, correo electrónico, dominio o identificador público estable. La **resistencia a los metadatos** mide quién puede deducir que dos personas se comunicaron, cuándo y desde qué red. La **autenticidad** determina si puedes verificar que el destinatario es la persona o el dispositivo que pretendías. La **disponibilidad** cuestiona si la comunicación sobrevive a una caída del servidor, censura, suspensión de cuenta o pérdida de acceso a internet. La **recuperación** se refiere a qué sucede cuando se pierde un dispositivo o se añade uno nuevo. La **gobernanza** pregunta si una organización puede retener, exportar, moderar o revocar el acceso a los registros comerciales.

Ninguna arquitectura maximiza todas las propiedades. Una recuperación sencilla puede requerir copias de seguridad cifradas y duraderas. El descubrimiento de contactos puede exponer un identificador estable. Una supervisión organizativa estricta es casi lo opuesto al anonimato personal. La resiliencia sin conexión a menudo implica menos comodidades y más decisiones de confianza manuales. Por tanto, la pregunta práctica no es "¿Qué mensajero es el más seguro?", sino "¿Qué consecuencia estamos tratando de evitar a toda costa?".

### La comunicación cotidiana recompensa los valores predeterminados sólidos

Para las conversaciones diarias, la adopción es parte de la seguridad. Un mensajero técnicamente excelente que amigos, familiares o clientes no utilizarán simplemente los empuja de vuelta a los SMS, el correo electrónico o las capturas de pantalla.

Los mensajes y llamadas privados de WhatsApp utilizan cifrado de extremo a extremo de forma predeterminada. Signal también hace del cifrado de extremo a extremo el modo normal, añade la verificación de números de seguridad y permite iniciar contactos con nombres de usuario manteniendo los números de teléfono fuera de los detalles del perfil. iMessage de Apple proporciona cifrado de extremo a extremo dentro del ecosistema de dispositivos Apple. Estos productos son opciones sólidas cuando la prioridad es una conversación privada que se sienta natural.

El compromiso radica en la identidad y el acoplamiento al ecosistema. Signal sigue requiriendo un número de teléfono para registrarse, aunque los nombres de usuario pueden reducir la información compartida con nuevos contactos. WhatsApp está construido en torno a la identidad basada en números de teléfono y un alcance a gran escala. iMessage funciona mejor cuando todos utilizan dispositivos Apple compatibles.

La recuperación también es importante. El acceso multidispositivo y las copias de seguridad cifradas pueden proteger el historial de una familia ante la pérdida de un teléfono, pero aumentan la cantidad de dispositivos, credenciales y mecanismos de recuperación que deben protegerse. El cifrado de extremo a extremo protege la ruta entre los puntos finales; no protege un punto final desbloqueado, un sistema operativo comprometido, una exportación copiada o un destinatario que fotografía la pantalla.

Para la vida normal, el objetivo correcto no suele ser el anonimato, sino un cifrado predeterminado sólido, una verificación de identidad comprensible, dispositivos protegidos y un modelo de recuperación que los participantes puedan gestionar realmente.

### La comodidad en la nube, las comunidades y el trabajo requieren una confianza diferente

Las grandes comunidades y las conversaciones en el lugar de trabajo priorizan la continuidad, la moderación, la búsqueda, las integraciones y el contexto compartido. Esas necesidades cambian el modelo de seguridad.

Telegram hace esta distinción explícita. Los Chats en la nube están cifrados entre el cliente y el servidor y se almacenan en la nube de Telegram para sincronizarse entre dispositivos. Los Chats secretos añaden cifrado de extremo a extremo, son específicos de cada dispositivo y no forman parte de la nube. El producto ofrece dos respuestas diferentes porque el historial duradero multidispositivo y el secreto vinculado al dispositivo son casos de uso distintos.

Matrix adopta un enfoque federado: los usuarios y las salas pueden abarcar servidores domésticos operados de forma independiente, mientras que las salas cifradas utilizan claves de dispositivo y la familia de protocolos criptográficos Olm/Megolm. Esto otorga a las comunidades y organizaciones capacidad de elección de infraestructura, pero también genera un trabajo real de verificación de dispositivos y recuperación de claves. La federación elimina a un operador global, pero no elimina la administración del servidor ni el riesgo de los puntos finales.

Slack representa otro modelo legítimo. Sus materiales oficiales enfatizan el cifrado en reposo y en tránsito, las políticas de retención, las exportaciones de datos, las retenciones legales, la prevención de pérdida de datos (DLP) y la gestión opcional de claves empresariales. Se trata de una seguridad orientada a la gobernanza. Una empresa puede necesitar preservar la cronología de un incidente o cumplir con una retención legal. Los empleados no deben confundir ese control organizativo con un canal privado fuera del alcance de los administradores y las políticas.

Una regla útil es la siguiente: el chat de trabajo es un registro empresarial a menos que la política indique claramente lo contrario. Úselo para decisiones que deban perdurar; evite tratarlo como un espacio anónimo o donde se pueda negar la autoría.

### Las contraseñas y claves privadas no son mensajes

Una contraseña, un código de recuperación, un token de API, una clave privada de billetera o una frase semilla no son contenido conversacional común. Son una capacidad: cualquiera que los obtenga puede actuar en su nombre.

Esto cambia el flujo de trabajo preferido. En lugar de pegar un secreto de larga duración en un historial de chat, utilice un mecanismo de intercambio cifrado diseñado específicamente para ello, con fecha de caducidad, límites de acceso y revocación. Bitwarden Send, por ejemplo, cifra el contenido en el lado del cliente, mantiene la clave de cifrado fuera de las solicitudes al servidor, admite controles de eliminación y caducidad, y puede requerir una contraseña. Su documentación recomienda compartir esa contraseña a través de un canal independiente.

Una buena secuencia de transferencia de secretos es la siguiente: primero, verifique al destinatario a través de un canal de confianza existente o en persona. Segundo, cree un enlace secreto cifrado de corta duración con el menor número de usos posible. Tercero, envíe el enlace a través de un canal y la contraseña de acceso o el fragmento de clave faltante a través de otro. Cuarto, confirme la recepción sin repetir el secreto en la conversación. Finalmente, elimine o revoque el recurso compartido y, si la exposición fuera costosa, rote la credencial.

Los mensajes que desaparecen pueden reducir el historial rutinario, pero no son una garantía de eliminación frente a un adversario. Signal lo dice claramente: un destinatario que desee conservar un registro puede fotografiar la pantalla. Los temporizadores tampoco borran las vistas previas de notificaciones, el texto copiado, las capturas de pantalla, las exportaciones, las capturas de malware o un secreto ya utilizado en otro lugar.

> Utilice un mensajero para coordinar la transferencia. Utilice una herramienta dedicada de intercambio de secretos para transferir el secreto.

Para las frases semilla de billeteras y las claves maestras de recuperación, la opción más segura es aún más estricta: no las transmita a través de ningún mensajero. Prefiera una entrega verificada sin conexión o un proceso de recuperación o multifirma cuidadosamente diseñado.

### La "comunicación temporal" significa cuatro cosas distintas

La gente suele pedir una cuenta temporal cuando en realidad necesita una de estas cuatro propiedades: una identidad temporal no vinculada a la cuenta cotidiana; una accesibilidad temporal donde una invitación o dirección deja de aceptar nuevos contactos; contenido temporal donde los mensajes desaparecen de los dispositivos participantes tras un temporizador; o metadatos temporales donde la infraestructura no puede conectar fácilmente a los participantes a lo largo del tiempo. Estas propiedades no son equivalentes.

Los nombres de usuario de Signal mejoran la privacidad de la accesibilidad: pueden cambiarse y un nombre de usuario puede iniciar contacto sin revelar el número de teléfono. Pero la cuenta sigue requiriendo un número de teléfono en el registro, y cambiar un nombre de usuario no crea una nueva identidad criptográfica ni borra los chats existentes.

Session elimina el requisito de número de teléfono y correo electrónico, y envía mensajes a través de solicitudes onion descentralizadas para que ningún nodo de enrutamiento conozca tanto el origen como el destino. Esto lo hace atractivo cuando la identidad civil estable y el origen de red deben separarse de la conversación, aunque el alcance, la recuperación y las funciones en tiempo real pueden no igualar a las plataformas convencionales.

SimpleX va más allá en la capa de direccionamiento: no asigna un identificador de usuario para toda la red. Los contactos se conectan a través de enlaces temporales o de un solo uso, y los servidores de retransmisión mantienen los mensajes cifrados solo hasta su entrega. Esto reduce la correlación entre contactos, pero también significa que el descubrimiento depende de una invitación fuera de banda y que la gestión de datos locales se vuelve importante.

ADAMANT puede generar una cuenta localmente a partir de una frase mnemotécnica BIP39 sin necesidad de número de teléfono o correo electrónico. Esto facilita la creación de identidades compartimentadas. Sin embargo, las transacciones de mensajes cifrados de la cuenta se escriben en una cadena de bloques. La identidad puede ser desechable, pero el historial de transacciones aceptado es deliberadamente duradero.

> Una cuenta temporal puede reducir la vinculación de identidad. No puede borrar un registro que ya haya sido copiado, respaldado o registrado en un libro mayor.

Antes de crear una cuenta "desechable", decida qué forma de temporalidad es la que importa. De lo contrario, el sistema podría estar resolviendo el problema equivocado.

### La comunicación de alto riesgo y sin conexión prioriza la resiliencia

Cuando la amenaza incluye una vigilancia de red generalizada, censura o un apagón de internet, las suposiciones convencionales de la nube pueden fallar.

Briar se sincroniza directamente entre los dispositivos de los usuarios. Con acceso a internet puede usar Tor; sin internet puede intercambiar datos a través de Bluetooth o Wi-Fi. Las listas de contactos permanecen cifradas en el dispositivo y no hay un servidor de mensajería central que bloquear. Esta es una opción sólida para periodistas, activistas, respuesta ante desastres y coordinación local bajo interrupciones.

Los compromisos son considerables: redes de usuarios más pequeñas, una introducción de contactos más cuidadosa, estado local en el dispositivo, alcance de plataforma limitado y menos comodidades convencionales. Estos no son defectos del producto, sino el coste de optimizar para un fallo más grave.

### Dónde encaja ADAMANT

ADAMANT aborda la mensajería como una capa de confianza descentralizada. Las cuentas se generan localmente a partir de una frase mnemotécnica; el par de claves resultante firma las transacciones y ninguna autoridad de registro necesita un número de teléfono, dirección de correo electrónico o libreta de contactos.

Los activos de los mensajes se cifran antes de ser empaquetados en transacciones. La documentación de ADAMANT describe el cifrado de caja NaCl utilizando Curve25519 para el acuerdo de claves, Salsa20 para el cifrado y Poly1305 para la autenticación. La transacción cifrada se firma y se transmite a la red, donde nodos independientes pueden validar su orden y autenticidad.

Esto produce un conjunto distintivo de casos de uso: una identidad soberana que no es emitida por una empresa de mensajería, un historial de comunicación que no depende de la base de datos de un proveedor, entrega resistente a la censura y ordenamiento verificable, cuentas seudónimas o compartimentadas creadas sin registro personal, y mensajería integrada con transferencias, bots y servicios de cadena de bloques.

También genera responsabilidades. La frase mnemotécnica es el secreto maestro: no hay un servicio de asistencia que pueda recuperarla y nunca debe enviarse a través de un chat. La durabilidad de la cadena de bloques significa que las cargas útiles cifradas y los metadatos de transacción requeridos pueden sobrevivir al dispositivo o a la intención detrás de una cuenta temporal. El cifrado protege el contenido; no hace que la existencia y el orden de las transacciones desaparezcan.

Es por eso que ADAMANT no es simplemente "otro chat cifrado". Es más valioso cuando la conversación necesita sobrevivir a un operador, permanecer verificable de forma independiente o comenzar sin una identidad emitida centralmente, y cuando los participantes aceptan el coste de la autocustodia y el historial duradero.

### El flujo de trabajo más seguro puede utilizar varias herramientas

La gente desea naturalmente una sola aplicación para todo. Los programas de seguridad maduros hacen lo contrario: separan los canales según las consecuencias.

Un equipo podría usar Slack o Matrix para la coordinación duradera, Signal para una llamada sensible entre personas, un gestor de contraseñas para las credenciales y un kit de recuperación sin conexión para las claves raíz. Un periodista podría usar una invitación única de SimpleX para el primer contacto, verificar la identidad en una llamada y trasladar un intercambio de larga duración resistente a la censura a ADAMANT. Un grupo de desastres podría mantener Briar instalado para el día en que la red desaparezca.

Esto no es fragmentación por el simple hecho de hacerlo. Evita que una cuenta, dispositivo, administrador o proveedor comprometido se convierta en el único punto de fallo para todo tipo de comunicación.

### Una prueba de siete preguntas para el canal

Antes de elegir un canal, pregúntese qué sucede si el contenido se filtra: ¿una leve vergüenza, una pérdida financiera, un peligro físico o una toma de control irreversible de la cuenta? Pregunte qué sucede si la relación queda expuesta: ¿son los metadatos inofensivos, comercialmente sensibles o personalmente peligrosos? Decida si la conversación debe perdurar y si la recuperación y la retención son beneficios o riesgos. Determine quién debe gobernar el registro: los participantes, un empleador, una comunidad o ninguna parte central. Planifique cómo se verificarán las identidades: un contacto telefónico familiar, un número de seguridad, un código QR, una dirección compartida o una comprobación en persona. Considere qué infraestructura puede fallar: un dispositivo, un proveedor de nube, una tienda de aplicaciones, internet o la capacidad legal para operar. Finalmente, pregunte si esto es realmente un mensaje; si es una contraseña, clave o capacidad de recuperación, muévalo a un flujo de trabajo secreto diseñado específicamente para ello.

Una vez que se responden estas preguntas, la elección se vuelve menos ideológica y más práctica.

### La privacidad es un hábito de elegir bien

El cifrado es esencial, pero es solo una capa. El diseño de la identidad, los metadatos, la seguridad del dispositivo, la recuperación, la gobernanza y la resiliencia de la infraestructura dan forma al resultado real. Los mensajeros cifrados convencionales hacen que la privacidad cotidiana sea normal. Los sistemas federados y de trabajo hacen que las comunidades sean gobernable. Las redes sin identificadores y enrutadas mediante onion reducen la vinculabilidad. Las herramientas de igual a igual sin conexión mantienen la comunicación viva bajo interrupción. ADAMANT añade una identidad generada localmente y una continuidad respaldada por la cadena de bloques. Las herramientas dedicadas de intercambio de secretos manejan las credenciales mejor de lo que nunca podrá hacerlo un historial de chat.

El futuro de la comunicación privada no es un mensajero ganador único, sino personas que comprenden la promesa que hace cada canal y eligen la promesa correcta para cada momento.

![Un mensajero no es suficiente: elegir el canal adecuado para cada conversación](/images/engineering-notes/medium/0dd0cf0ff85b/002-ecc2ec6c2e.webp)
