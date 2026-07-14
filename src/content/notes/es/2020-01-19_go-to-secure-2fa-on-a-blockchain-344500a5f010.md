---
title: "2FA Seguro en una Blockchain"
slug: "go-to-secure-2fa-on-a-blockchain-344500a5f010"
description: "El SMS es el método de autenticación de dos factores más usado, pero es inseguro. El fraude por intercambio de SIM permite a los atacantes tomar el control de cuentas."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/go-to-secure-2fa-on-a-blockchain-344500a5f010"
publishedAt: "2020-01-19T10:27:29.377Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/344500a5f010/001-1-ljkbgctg0w-cqgb0tn5s6g-png.webp"
cardSpan: "full"
originalId: "medium:344500a5f010"
locale: "es"
placeholder: false
---

El SMS es el método de autenticación de dos factores más ampliamente utilizado, empleado por bancos, billeteras cripto y numerosos servicios en línea. Sin embargo, es fundamentalmente inseguro. El fraude por intercambio de SIM—donde un atacante transfiere el número de teléfono de la víctima a una nueva tarjeta SIM—ha sido explotado desde los inicios de la telefonía móvil y solo ha acelerado su frecuencia. La policía de Londres reportó un aumento del 63 % en estafas por intercambio de SIM en 2019, y casos notorios han resultado en robos de millones de dólares en criptomonedas. La causa raíz es estructural: quien controle la tarjeta SIM puede restablecer contraseñas y tomar el control de cuentas, y empleados de telecomunicaciones pueden ser sobornados o engañados para reasignar números.

![Ir a 2FA Seguro en una Blockchain](/images/engineering-notes/medium/344500a5f010/002-0-h92gnghvvfxe0cfp.webp)

Un ataque típico de intercambio de SIM avanza en tres etapas. Primero, los estafadores recopilan datos personales—a menudo de redes sociales o mediante un cómplice dentro de una compañía de telecomunicaciones. Segundo, contactan al operador móvil, alegan que perdieron el teléfono y bloquean la SIM de la víctima. Tercero, obtienen una SIM de reemplazo, a veces usando documentos falsificados o con la ayuda de un gerente de tienda cómplice. Una vez activa la nueva SIM, la víctima pierde acceso a toda autenticación basada en SMS, mientras el atacante recibe todos los códigos de uso único y actúa rápidamente para cambiar contraseñas.

![Ir a 2FA Seguro en una Blockchain](/images/engineering-notes/medium/344500a5f010/003-0-tptrqqosbbxrb3up.webp)

*Joel Ortiz en una conferencia de prensa universitaria. Dos años después, fue detenido por fraude cibernético y condenado a 10 años por robar más de 7,5 millones de dólares en criptomonedas mediante intercambio de SIM.*

La recuperación es difícil. Las transferencias en moneda fiduciaria a veces pueden revertirse con la cooperación del banco, pero las transacciones cripto son efectivamente irreversibles y a menudo no se pueden rastrear. Ningún exchange cripto ha compensado a víctimas de robo por intercambio de SIM, y las acciones legales suelen dirigirse contra el proveedor de telecomunicaciones en lugar de recuperar fondos. Michael Terpin, por ejemplo, perdió 224 millones de dólares y está llevando una demanda contra AT&T.

Más allá del intercambio de SIM, el 2FA por SMS tiene debilidades técnicas adicionales. Los mensajes pueden interceptarse mediante vulnerabilidades en el Sistema de Señalización 7 (SS7), y el Instituto Nacional de Estándares y Tecnología de EE. UU. ha desaconsejado oficialmente el uso del SMS como segundo factor en sus Directrices de Identidad Digital. La entrega por SMS también es poco confiable—los códigos llegan tarde o no llegan—y la presencia del 2FA puede dar a los usuarios una falsa sensación de seguridad, lo que los lleva a elegir contraseñas más débiles.

## Otros métodos de 2FA y sus compensaciones

Los enfoques alternativos de 2FA incluyen listas de códigos TAN de un solo uso, autenticación biométrica, aplicaciones de autenticación basadas en tiempo como Google Authenticator y claves de seguridad físicas. Cada uno tiene inconvenientes prácticos. Los tokens físicos pueden perderse o robarse. Las aplicaciones autenticadoras complican la migración entre dispositivos—Google Authenticator, por ejemplo, no permite exportar claves, haciendo difícil la recuperación tras un teléfono roto. Un estudio de 2013 encontró que los usuarios perciben todo 2FA como incómodo, y el SMS sigue siendo popular simplemente porque es la opción menos incómoda, no porque sea la más segura.

Un método ideal de 2FA debería ser seguro, confiable, conveniente y económico. La entrega basada en blockchain cumple con estos criterios.

## 2FA mediante blockchain usando ADAMANT

Desde la perspectiva del usuario, el 2FA basado en blockchain funciona igual que la entrega por SMS: el servicio genera un código de uso único y lo envía a través de un canal de mensajería; el usuario lo lee e ingresa. La diferencia está en el transporte. En lugar de SMS, el código se entrega a través del mensajero blockchain ADAMANT, disponible como aplicación web, cliente Tor y aplicaciones nativas para iOS, Android, Linux, Windows y macOS.

![Ir a 2FA Seguro en una Blockchain](/images/engineering-notes/medium/344500a5f010/004-0-l5oogpwqaljtmoab.webp)

La blockchain ofrece varias propiedades de seguridad que el SMS no puede proporcionar. La creación de cuentas no requiere número de teléfono ni correo electrónico—solo una frase de contraseña. Todos los mensajes están cifrados de extremo a extremo usando curve25519xsalsa20poly1305. Cada mensaje es una transacción blockchain firmada con Ed25519 EdDSA, haciendo imposibles los ataques de intermediario. Los mensajes se registran en bloques con marcas de tiempo inmutables, y la autenticidad se verifica mediante un consenso distribuido de nodos, no por ninguna autoridad central. Las cuentas no pueden bloquearse y los mensajes no pueden eliminarse, lo que significa que no existe un equivalente a la suspensión de una SIM por parte del operador. Los códigos son accesibles desde cualquier dispositivo en cualquier momento, y el remitente recibe una confirmación de entrega—eliminando la necesidad de botones de "reenviar".

![Ir a 2FA Seguro en una Blockchain](/images/engineering-notes/medium/344500a5f010/005-0-prx5mhtulthutavr.webp)

Los usuarios inician sesión en ADAMANT solo con una frase de contraseña, por lo que pueden usar una única cuenta para todos los servicios o crear cuentas separadas por servicio. Una limitación es que una cuenta debe tener al menos una transacción antes de que su clave pública aparezca en la cadena, requisito necesario para enviarle mensajes cifrados. La billetera ADAMANT incluye un grifo con tokens gratuitos para sortear esto, aunque una solución más robusta sería dirigirse a las cuentas directamente por clave pública en lugar de por la dirección numérica derivada.

El costo de enviar un código 2FA mediante ADAMANT es aproximadamente 0.001 ADM (alrededor de 0.00001 USD al precio actual). Un servicio también podría ejecutar su propia blockchain basada en el códigobase de ADAMANT y establecer la tarifa de transacción en cero.

## Guía de implementación

Los siguientes pasos describen cómo integrar el 2FA basado en blockchain en un servicio, usando ADAMANT como canal de entrega. Una implementación de referencia está disponible en GitHub en `https://github.com/Adamant-im/adamant-2fa`.

### Paso 1: Crear una cuenta de remitente

Cree una cuenta ADAMANT que enviará los códigos 2FA. Puede hacerlo manualmente en la billetera web, o mediante programación a través de la API de nodo ADAMANT, la Consola o la API JS. La creación de cuenta implica generar una frase de contraseña BIP39, calcular su hash SHA-256, derivar un par de claves privada y pública Ed25519, y luego derivar la dirección blockchain a partir de la clave pública mediante otro hash SHA-256 con inversión.

![Ir a 2FA Seguro en una Blockchain](/images/engineering-notes/medium/344500a5f010/006-0-djya3mapovmiw1rz.webp)

![Ir a 2FA Seguro en una Blockchain](/images/engineering-notes/medium/344500a5f010/007-0-wjbii6tc0qtwvpom.webp)

### Paso 2: Generar códigos de un solo uso

Genere un código HOTP para cada intento de inicio de sesión. El ejemplo siguiente usa la biblioteca `speakeasy`:

```js
const hotp = speakeasy.hotp({
  counter,
  secret: account.seSecretAscii,
});
```

Validación cuando el usuario envía el código:

```js
se2faVerified = speakeasy.hotp.verify({
  counter: this.seCounter,
  secret: this.seSecretAscii,
  token: hotp,
});
```

### Paso 3: Enviar el código mediante blockchain

Use la CLI de Consola ADAMANT para enviar el código como mensaje blockchain:

```js
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const command = `adm send message ${adamantAddress} "2FA code: ${hotp}"`;
let { error, stdout, stderr } = await exec(command);
```

Alternativamente, use el método `send` de la biblioteca API JS de ADAMANT para un enfoque programático sin necesidad de invocar una CLI.

### Paso 4: Construir la interfaz de usuario

Proporcione un campo para que el usuario ingrese el código 2FA. La aplicación de demostración usa Vue, pero cualquier framework frontend funcionará.

![Ir a 2FA Seguro en una Blockchain](/images/engineering-notes/medium/344500a5f010/008-0-uvflqyj6wavxcmsl.webp)

El código fuente completo de la demostración está en GitHub en `https://github.com/Adamant-im/adamant-2fa`, incluyendo instrucciones de configuración y un enlace a una demostración en vivo.
