---
title: "¿Quién es responsable de los datos? Y qué cambia al ponerlos en una cadena de bloques"
slug: "who-is-responsible-for-data-and-what-changes-when-we-put-it-on-a-blockchain-515660f258cb"
description: "Todo producto digital comienza registrando datos. A medida que estos se mueven, la responsabilidad parece diluirse, pero una cadena de bloques no elimina la rendición de cuentas."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/who-is-responsible-for-data-and-what-changes-when-we-put-it-on-a-blockchain-515660f258cb"
publishedAt: "2026-08-17T14:11:55.973Z"
author: "ADAMANT Messenger"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:515660f258cb"
coverImage: "/images/engineering-notes/medium/515660f258cb/001-2915e505dd.webp"
locale: "es"
placeholder: false
---

Todo producto digital comienza registrando datos sobre alguien o algo. A medida que los datos se desplazan a través de aplicaciones, proveedores, bases de datos y, en ocasiones, una cadena de bloques (blockchain), la responsabilidad parece diluirse. Sin embargo, aunque una cadena de bloques puede distribuir la custodia, no puede hacer desaparecer la rendición de cuentas.

La ausencia de un administrador central de bases de datos no implica la ausencia de decisiones, deberes o consecuencias. Alguien sigue eligiendo qué entra en el sistema, por qué es necesario, cuánto tiempo debe permanecer y qué sucede cuando la información es incorrecta.

### Los datos nunca quedan sin dueño

La propiedad es solo una metáfora legal. Una pregunta más práctica es: ¿quién tiene qué responsabilidad en cada etapa del ciclo de vida de los datos? La persona descrita por los datos tiene derechos. La parte que decide por qué y cómo se utilizan los datos establece las reglas. Los proveedores de servicios implementan el almacenamiento y la seguridad. Los ingenieros traducen las políticas en esquemas y permisos. Los operadores de infraestructura mantienen los sistemas disponibles. Los auditores y reguladores proporcionan supervisión.

Bajo el RGPD, un controlador determina los fines y los medios del tratamiento, mientras que un encargado actúa en nombre del controlador. El controlador debe demostrar el cumplimiento de principios como la limitación de la finalidad, la minimización de datos, la exactitud y la limitación del almacenamiento. Esta estructura trasciende las jurisdicciones: ¿era necesaria la recopilación? ¿Se informó a la persona? ¿Se puede corregir un error? ¿Existe una parte real capaz de responder a una reclamación?

### Lo que cambia la cadena de bloques y lo que no

Una aplicación convencional otorga a un operador un amplio control técnico para editar, revocar o eliminar registros. Ese mismo control permite la corrección, pero también la censura y la manipulación. Una cadena de bloques cambia esto: múltiples nodos reproducen un historial ordenado, validan los cambios bajo reglas compartidas y dificultan la reescritura unilateral. El NIST describe las cadenas de bloques como resistentes a la manipulación y capaces de evidenciarla, no como mágicamente inmutables.

Esto crea un nuevo equilibrio: cuanto más difícil es cambiar un registro sin permiso, más difícil es corregirlo cuando el cambio es legítimo. La responsabilidad se traslada en lugar de desaparecer. Los diseñadores de aplicaciones deciden qué enviar. Los desarrolladores de protocolos definen las transiciones de estado válidas. Los validadores hacen cumplir las reglas. Los operadores de nodos replican el historial. La gobernanza decide la evolución del software. La CNIL de Francia llegó a una conclusión similar: el participante que decide registrar datos puede ser considerado un controlador. "El protocolo lo hizo" no es un modelo de rendición de cuentas serio.

### Cuándo escribir datos en la cadena (on-chain)

La cadena de bloques se justifica cuando múltiples partes necesitan un estado compartido, no confían plenamente entre sí, requieren orden y procedencia, valoran la verificación independiente y cuando el registro puede permanecer legítimamente duradero. Esto hace que el almacenamiento en la cadena sea atractivo para estados críticos de consenso (saldos, transferencias), compromisos públicos (hashes con marca de tiempo), registros de estado y revocación, eventos de auditoría compartidos y estados de comunicación resistentes a la censura. La permanencia es parte del producto, no un efecto secundario.

### Cuándo mantener los datos fuera de la cadena (off-chain)

La mayoría de los datos de las aplicaciones no cumplen con ese criterio. Los perfiles personales sin procesar, historiales médicos, documentos privados, preferencias mutables y archivos multimedia grandes son malos candidatos para la replicación permanente. Cifrar un registro protege el contenido hoy, pero el texto cifrado puede seguir disponible durante décadas. Las claves se filtran, los algoritmos envejecen y los metadatos revelan relaciones. "Eliminar la clave" (crypto-shredding) no es idéntico a eliminar cada copia. Los hashes no son automáticamente anónimos; si se vinculan a una persona o se comparan con conjuntos de datos pequeños, pueden funcionar como datos personales seudónimos.

El trabajo del NIST sobre libros de contabilidad distribuidos que mejoran la privacidad parte de la observación de que la inmutabilidad convencional puede entrar en conflicto con las reglas de privacidad que exigen revisión o eliminación. Los investigadores han explorado estructuras de libros de contabilidad redactables que mantienen la integridad mientras permiten el borrado controlado. La cadena de bloques es un espacio de diseño, no una estructura de datos sagrada.

### La opción práctica por defecto: probar en la cadena, almacenar fuera

Para muchos productos, la arquitectura más sólida es la híbrida: mantener los registros sensibles en sistemas cifrados y con control de acceso, y colocar solo la prueba más pequeña en la cadena. Almacene un documento fuera de la cadena y ancle un hash en ella. Emita credenciales verificables con divulgación selectiva. Publique entradas de revocación sin contenido privado. Utilice el control de versiones para reconocer estados corregidos. Cifre con claves rotativas y defina políticas de retención.

El modelo de Credenciales Verificables del W3C separa al emisor, al titular, al sujeto y al verificador. Una persona puede probar un hecho sin exponer todo un registro de identidad. El objetivo es hacer que la confianza sea portátil mientras se comparte menos información.

A veces, no necesita una cadena de bloques en absoluto. Una base de datos bien gobernada proporciona cifrado, control de acceso, eventos de auditoría firmados y corrección rápida. Un registro de transparencia que utiliza árboles de Merkle (como Certificate Transparency, RFC 9162) proporciona pruebas de inclusión sin consenso distribuido. La pregunta decisiva no es "¿podemos usar blockchain?", sino "¿qué fallo estamos tratando de prevenir?"

### Una prueba de siete preguntas antes de la primera transacción

Antes de hacer que los datos sean permanentes, un proyecto debe responder a estas preguntas en lenguaje sencillo: ¿Qué afirmación exacta debe verificarse? ¿Quién debe estar de acuerdo sobre el estado? ¿Sería aceptable un único operador responsable? ¿Podrían los datos volverse incorrectos, dañinos o legalmente eliminables? ¿Puede una prueba reemplazar la carga útil? ¿Quién maneja la corrección y la reparación? ¿Qué sucede en veinte años con respecto al compromiso de claves y el envejecimiento criptográfico?

### ADAMANT: Permanencia para el transporte, privacidad para el contenido

ADAMANT ofrece un ejemplo concreto de equilibrio deliberado. La red utiliza una cadena de bloques de Prueba de Participación Delegada (DPoS) como capa de confianza descentralizada para la comunicación. Los clientes no necesitan confiar en el servidor de una sola empresa para preservar el historial de transacciones compartido.

Pero la cadena de bloques no es una excusa para publicar texto plano. Según la documentación de ADAMANT, los activos de las transacciones de mensajes se cifran antes de ser empaquetados en transacciones, firmados y transmitidos. El chat básico utiliza cifrado de clave pública autenticado basado en NaCl box; los registros de clave-valor utilizan NaCl secretbox. El cliente realiza el trabajo criptográfico localmente.

El cuerpo del mensaje cifrado permanece privado, mientras que la red necesita metadatos de la transacción (remitente, destinatario, marca de tiempo, tarifa, firma) para validar y enrutar la actividad. El cifrado protege el contenido; no hace que cada relación sea invisible. La arquitectura de ADAMANT muestra el caso legítimo de la cadena de bloques: la comunicación no debería desaparecer porque una empresa cierre una cuenta, pero el sistema minimiza lo que los nodos públicos necesitan entender sobre el mensaje privado en sí.

### La responsabilidad es una característica

Los productos dignos de confianza no ganarán recopilando la mayor cantidad de datos o declarando que toda base de datos es inmutable. Ganarán haciendo que la responsabilidad sea legible. Los usuarios deben saber qué se registra y qué permanece privado. Los desarrolladores deben explicar por qué existe cada campo. Los operadores deben conocer sus deberes de seguridad. La gobernanza debe proporcionar vías de corrección. La descentralización es más fuerte cuando elimina el control innecesario sin eliminar la rendición de cuentas. La cadena de bloques es más fuerte cuando transporta la prueba, no toda la historia.

![¿Quién es responsable de los datos? Y qué cambia al ponerlos en una cadena de bloques](/images/engineering-notes/medium/515660f258cb/002-87fcd750d8.webp)

Un mapa de decisiones práctico para elegir entre datos fuera de la cadena, híbridos y en la cadena.
