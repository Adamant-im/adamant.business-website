---
title: "Configurar Blockchain como proveedor de OTP 2FA"
slug: "set-up-blockchain-as-an-otp-2fa-provider-f87575c27175"
description: "ADAMANT es una infraestructura descentralizada de mensajería que incluye blockchain, explorador, aplicaciones con billeteras cripto, exchange, software de pool de forjado, bot de recompensas y más."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/set-up-blockchain-as-an-otp-2fa-provider-f87575c27175"
publishedAt: "2022-12-18T15:14:19.999Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/f87575c27175/001-1-g0bpvqabqrk2sobncqoicw-png.webp"
cardSpan: "full"
originalId: "medium:f87575c27175"
locale: "es"
placeholder: false
---

ADAMANT es una infraestructura descentralizada de mensajería que incluye una blockchain, un explorador, aplicaciones de mensajería con billeteras cripto, un exchange, software de pool de forjado, un bot de recompensas y un proveedor de servicio de OTP 2FA. OTP 2FA utiliza contraseñas de un solo uso como capa adicional de seguridad para iniciar sesión en sitios web y servicios como exchanges de criptomonedas, proveedores de correo electrónico, billeteras custodias y cuentas sociales. ADAMANT es el primer proveedor de 2FA que entrega contraseñas de un solo uso a través de blockchain.

La ventaja principal del 2FA basado en blockchain es la descentralización. Los proveedores tradicionales de OTP dependen de servidores centralizados o pasarelas SMS, ambos susceptibles de ser comprometidos o desconectados. En cambio, el servicio de 2FA de ADAMANT entrega códigos a través de su propia red blockchain, lo que significa que no hay un único punto de fallo ni intermediario de terceros que pueda interceptar o retrasar los mensajes de autenticación.

Para probar el servicio, primero cree una cuenta en ADAMANT Messenger, donde recibirá los códigos de 2FA. Luego, ejecute la aplicación de demostración de 2FA y regístrese para una nueva cuenta utilizando cualquier inicio de sesión y contraseña habituales. Después de iniciar sesión, toque "Habilitar 2FA" e ingrese su dirección ADAMANT. Presione el botón "Obtener código 2FA" y un código 2FA será entregado a su ADAMANT Messenger. Ingrese este código y presione "Verificar". Una vez habilitado, cerrar la sesión e iniciarla nuevamente requerirá un código 2FA, demostrando así el flujo completo de autenticación.

Los proveedores de servicios web pueden integrar el 2FA de ADAMANT para mejorar la seguridad de las cuentas de usuario. El servicio es de código abierto y está diseñado para integrarse en flujos de autenticación existentes donde se requiera un segundo factor.
