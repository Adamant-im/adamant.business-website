---
title: "Desarrolla aplicaciones y servicios en la blockchain ADAMANT con la API de JavaScript v1.0.0"
slug: "develop-apps-and-services-upon-messenger-s-blockchain-adamant-javascript-api-v1-0-0-f00922f5b00d"
description: "ADAMANT es una blockchain pública diseñada para mensajería anónima. Lo que la hace única son los servicios construidos sobre ella. Cualquier desarrollador puede escribir programas que aprovechen sus capacidades."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/develop-apps-and-services-upon-messengers-blockchain-adamant-javascript-api-v1-0-0-f00922f5b00d"
publishedAt: "2021-05-28T20:22:13.112Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/f00922f5b00d/001-0-fghvl6xn-ahzkh9m.webp"
cardSpan: "full"
originalId: "medium:f00922f5b00d"
locale: "es"
placeholder: false
---

ADAMANT es una blockchain pública diseñada para mensajería anónima. Lo que la hace única no es la blockchain en sí, sino los servicios construidos sobre ella. Cualquier desarrollador puede escribir programas que aprovechen sus capacidades, incluyendo la transferencia anónima de mensajes y señales, almacenamiento cifrado eterno, acceso a datos entre dispositivos, cuentas temporales rápidas y alta confiabilidad.

Varias aplicaciones ya funcionan en la blockchain ADAMANT. Estas incluyen un mensajero y billetera cripto, un bot intercambiador de criptomonedas, un servicio de autenticación en dos factores basado en blockchain y un bot de recompensas.

![Desarrolla aplicaciones y servicios sobre la blockchain del mensajero — ADAMANT JavaScript API v1.0.0](/images/engineering-notes/medium/f00922f5b00d/002-0-dtmatfmf-pnkc0hj.webp)

![Desarrolla aplicaciones y servicios sobre la blockchain del mensajero — ADAMANT JavaScript API v1.0.0](/images/engineering-notes/medium/f00922f5b00d/003-0-45fiuq9gnu-tgiot.webp)

![Desarrolla aplicaciones y servicios sobre la blockchain del mensajero — ADAMANT JavaScript API v1.0.0](/images/engineering-notes/medium/f00922f5b00d/004-0-oyzmxof2phgcsl2c.webp)

### ADAMANT JavaScript API v1.0.0

La API de JavaScript de ADAMANT se ha actualizado a [v1.0.0](https://www.npmjs.com/package/adamant-api). En comparación con la versión anterior, la biblioteca es más confiable al realizar solicitudes a la blockchain y más fácil de usar. Demuestra la descentralización en la práctica: si un nodo de la red no puede cumplir una solicitud, la biblioteca redirige automáticamente a otro nodo, reintentando varias veces hasta que se obtiene un resultado. El desarrollador no necesita gestionar manualmente el cambio de nodo.

Un ejemplo básico de consulta a la blockchain:

```javascript
api.get('blocks').then(response => {
  console.log(response.data)
})
```

La biblioteca fue completamente reestructurada con dependencias actualizadas y eliminadas, y funciones internas reescritas. La versión 1.0.0 no es compatible con la anterior v0.5.3, pero la migración es sencilla. La documentación completa está disponible en el [wiki de adamant-api-jsclient](https://github.com/Adamant-im/adamant-api-jsclient/wiki).
