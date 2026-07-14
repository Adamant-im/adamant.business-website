---
title: "Solo tú eres dueño de las claves privadas"
slug: "only-you-own-the-private-keys-b97da4ed012d"
description: "La diferencia fundamental entre criptomonedas y cuentas bancarias es la propiedad: no posees tu cuenta bancaria, pero las criptomonedas son completamente tuyas."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/only-you-own-the-private-keys-b97da4ed012d"
publishedAt: "2020-07-14T20:41:58.005Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/b97da4ed012d/001-1-vwww-ippgzj9jadeo82tzw-png.webp"
cardSpan: "full"
originalId: "medium:b97da4ed012d"
locale: "es"
placeholder: false
---

La diferencia fundamental entre las criptomonedas y las cuentas bancarias es la propiedad: no eres dueño de una cuenta bancaria, pero las criptomonedas son completamente tuyas. Este es el fundamento de la descentralización. ADAMANT ha soportado la exportación de claves privadas en su aplicación iOS durante un año, y ahora esta función está disponible en todas las plataformas.

### ¿Qué es una clave privada?

Una dirección de billetera cripto es pública, como un número de cuenta bancaria. Una dirección ADAMANT tiene un aspecto como `U4193701161843143990`, mientras que una dirección de Ethereum se parece a `0x8edbf571D2973ce211ad561299419238dcC69f43`. Pero solo el propietario de la clave privada puede gestionar la cuenta. Una clave privada es un código único que permite el acceso completo a una billetera específica.

Esta clave puede adoptar diferentes formas. En ADAMANT y Lisk, es una frase de recuperación de doce palabras. En Ethereum y Bitcoin, es un conjunto de caracteres.

![Solo tú eres dueño de las claves privadas!](/images/engineering-notes/medium/b97da4ed012d/002-1-gia0n-uqgriaoa-ezm6-aa-png.webp)

Si no tienes la clave privada, no eres dueño de la billetera. Por ejemplo, no tienes claves para las billeteras en exchanges de criptomonedas, y no puedes retirar monedas sin el permiso del exchange. Transferir criptomonedas a un exchange implica confiar en una tercera parte. Guarda todas tus claves privadas en un lugar seguro. Si alguien descubre tu clave privada, podrá disponer de tus fondos. Nadie devolverá monedas robadas — este es el precio de la libertad y la descentralización.

### Billeteras en ADAMANT

Para iniciar sesión en ADAMANT, introduces una frase de recuperación de doce palabras. A partir de esa frase, diferentes algoritmos generan las claves privadas para todas las demás billeteras de la cuenta, incluyendo Ethereum y Bitcoin. ADAMANT no transfiere claves privadas a través de la red, por lo que el titular de la billetera mantiene el control total sobre su cuenta. Al usar las billeteras integradas, no necesitas conocer todas sus claves individuales porque todas derivan de la frase de recuperación. Pero si deseas acceder a estas billeteras desde otra aplicación, necesitas exportar las claves privadas.

### Exportación de claves privadas

La aplicación ADAMANT permite a los usuarios exportar sus claves privadas para usarlas fuera del sistema del mensajero. Por ejemplo, puedes acceder a tus billeteras de Ethereum y ERC-20 a través de MyEtherWallet, o almacenar las claves exportadas como copia de seguridad. La función de exportación está disponible en Ajustes.

![Solo tú eres dueño de las claves privadas!](/images/engineering-notes/medium/b97da4ed012d/003-0-gzswtnmhue8pesiw.webp)

Solo tú eres responsable de tu cuenta y billeteras. Solo tú conoces las claves privadas. Si una clave privada se ve comprometida, terceros podrían apropiarse de los fondos asociados. En ese caso, crea una nueva cuenta ADAMANT para que el sistema genere una nueva frase de recuperación y, por tanto, nuevas claves.

### Preguntas frecuentes sobre seguridad

**¿Conocen los desarrolladores de ADAMANT mi frase de recuperación y claves privadas?** No. La cuenta ADAMANT, la frase de recuperación y las claves privadas se crean en tu dispositivo. Si usas la aplicación en una PC, se crean en la PC; en un teléfono móvil, en el teléfono. Las claves privadas nunca abandonan tu dispositivo. Cuando realizas un pago o envías un mensaje, solo se envía una transacción firmada al nodo. Esto aplica a todas las criptomonedas integradas en ADAMANT.

**¿Cómo puedo verificar que ADAMANT no envía claves privadas a través de la red?** El código fuente es completamente abierto y está disponible en GitHub.

**¿Es imposible que roben mi frase de recuperación y claves privadas?** No. Si tu dispositivo está comprometido, alguien podría robar las claves. Ejemplos incluyen una extensión de navegador que envía datos a terceros, un keylogger que registra todas las pulsaciones, un virus que escanea la memoria, o el uso de una aplicación de mensajería falsa (por ejemplo, `msg.adamant.io` en lugar de `msg.adamant.im`).

**¿Es necesario exportar las claves privadas?** No. Las claves almacenadas aumentan el riesgo de que otra persona las vea y robe las monedas.

**Si alguien roba mis claves privadas para las billeteras integradas, ¿tendrá también acceso a mis mensajes de ADAMANT?** No. Las claves privadas exportadas dan acceso únicamente a las billeteras cripto integradas. Además, si un atacante roba la clave de una criptomoneda (por ejemplo, Doge), no podrá acceder a las billeteras de Ethereum o Dash.

**Si alguien roba mi frase de recuperación de ADAMANT, ¿tendrá acceso a todas las billeteras cripto integradas?** Sí. Obtendrá acceso tanto a los mensajes como a las billeteras, por eso es fundamental mantener la frase de recuperación en secreto.

**¿Qué hacer si mi frase de recuperación o claves privadas fueron robadas?** Crea una nueva cuenta. Si hay monedas en la antigua, transfórelas a la nueva cuenta.

**¿Dónde puedo usar las claves privadas exportadas?** Las claves exportadas de ADAMANT son compatibles con varias aplicaciones de terceros. Para Bitcoin, funcionan Electrum, Blockchain.com y cualquier billetera que soporte el formato de clave WIF. Para Ethereum, se soporta MyEtherWallet. Para Doge, MultiDoge. Para Dash, Dash Electrum. Para Lisk, se requiere un nodo API; no hay aplicaciones conocidas que permitan importar directamente la clave privada, ya que no es posible generar una frase de recuperación a partir de una clave.
