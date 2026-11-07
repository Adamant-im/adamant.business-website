---
title: "ADAMANT ComServer 2.0: Gestión de flota para creadores de mercado de criptomonedas autohospedados"
slug: "effortless-fleet-management-for-crypto-market-makers-introducing-adamant-comserver-2-0-58c1f88a6b7e"
description: "ADAMANT ComServer 2.0 centraliza la gestión de múltiples bots de trading, ofreciendo control unificado, seguridad mejorada con AES-256-GCM y una arquitectura optimizada."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/effortless-fleet-management-for-crypto-market-makers-introducing-adamant-comserver-2-0-58c1f88a6b7e"
publishedAt: "2026-11-07T10:12:13.811Z"
author: "ADAMANT Messenger"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:58c1f88a6b7e"
coverImage: "/images/engineering-notes/medium/58c1f88a6b7e/001-5aba38788d.webp"
locale: "es"
placeholder: false
---

A medida que los proyectos de tokens y los proveedores de liquidez crecen, mantener libros de órdenes profundos, spreads ajustados y un volumen de trading saludable rara vez es posible en un solo exchange centralizado. Una operación seria de creación de mercado suele requerir múltiples instancias de bots distribuidas entre varios exchanges. ADAMANT Trade Bot Communication Server (ComServer) v2.0.0 resuelve la fricción operativa de gestionar dicha flota, reemplazando las sesiones SSH manuales, la inspección de registros y los scripts ad-hoc por un centro de mando unificado y autenticado.

## Orquestación de toda la flota

ComServer es un demonio de retransmisión autohospedado que conecta los bots de trading de ADAMANT a través de un canal Socket.IO autenticado. Los operadores gestionan toda su flota desde un único centro de comunicación en lugar de interactuar con cada bot de forma aislada.

Para obtener una visión general rápida de los saldos en todos los exchanges conectados, basta con un solo comando:

```
/remote balances all
```

ComServer enruta la solicitud a un bot por cada cuenta de exchange, recopila las respuestas y devuelve un resumen ordenado de forma determinista de los activos por exchange y prioridad de moneda de cotización.

Los ajustes de estrategia sincronizados son igual de concisos. La volatilidad del mercado o los anuncios importantes a menudo exigen cambios rápidos de parámetros en todos los bots. Comandos como `/remote make price 1.1 USDT in 5 days -all` coordinan todos los bots hacia un precio objetivo, `/remote enable pw 1.00–1.10 USDT -all` aplica corredores de spread más ajustados en todos los libros, y `/remote make volume +25% -all` escala la profundidad de liquidez en toda la flota. Para un control quirúrgico, los operadores pueden dirigirse a bots específicos mediante un identificador único o un ID parcial inequívoco en lugar de realizar una difusión general.

## Novedades en la versión 2.0.0

La versión 2.0.0 ha sido reescrita desde cero centrándose en la seguridad del transporte, la resiliencia operativa y el minimalismo del software.

### Seguridad del transporte

Dado que ComServer retransmite comandos operativos sensibles (colocación de órdenes, consulta de saldos), la seguridad del transporte es crítica. El protocolo de red utiliza ahora cifrado autenticado **AES-256-GCM**, una mejora respecto al modo heredado AES-256-CTR. Cada trama se cifra con un nonce efímero de 96 bits y se valida contra ataques de manipulación, falsificación y alteración de bits.

Las claves de comunicación se derivan dinámicamente de la `SECRET_KEY` compartida mediante HKDF, lo que garantiza una estricta separación de roles entre el servidor y el bot. Los datos adicionales autenticados (AAD) vinculan criptográficamente la identidad del remitente, el rol y las marcas de tiempo en milisegundos a cada carga útil, evitando reflexiones de tramas entre bots. Un `ReplayCache` de alto rendimiento y segmentado rastrea los nonces de un solo uso hasta una capacidad de 100 000 tramas; si la caché alcanza su capacidad bajo ataque, rechaza de forma segura las nuevas tramas en lugar de desalojar las antiguas, eliminando cualquier ventana de repetición. La autenticación del cliente se verifica dentro del middleware de Socket.IO antes de la admisión del socket: los apretones de manos no autorizados o malformados se terminan antes de que se establezca una conexión de socket.

### Reducción de dependencias

El árbol de dependencias se ha simplificado radicalmente. El número total de paquetes se redujo de 615 a 141, eliminando 32 avisos de seguridad históricos (incluyendo 2 vulnerabilidades críticas y 19 altas) hasta llegar a cero.

### Ingeniería y operaciones

El entorno de ejecución apunta a Node.js 22.13+ con módulos ES nativos puros, inyección de dependencias y sin estado global. Cuando un bot activo se reconecta tras una interrupción de la red, ComServer elimina inmediatamente los sockets "zombis" persistentes para que los comandos nunca se enruten a conexiones muertas. Las colas de comandos pendientes están limitadas a 1000 solicitudes concurrentes para evitar el agotamiento de la memoria bajo carga. El manejo del ciclo de vida de PM2 está preconfigurado a través de `ecosystem.config.cjs` para un manejo elegante de señales (SIGINT, SIGTERM) con una desactivación limpia del temporizador de comandos. El código base incluye 182 pruebas que abarcan etapas de unidad, integración y ciclo de vida del proceso utilizando el ejecutor de pruebas de Node.js con JSDoc verificado por TypeScript.

## Soberanía autohospedada

El software de creación de mercado de ADAMANT y ComServer se ejecutan completamente en el hardware del operador o en su nube privada. Ningún dato de trading, clave secreta o instrucción operativa llega a un servidor de terceros. ComServer proporciona el control de flota unificado de una mesa de trading institucional mientras preserva el modelo de seguridad del software de código abierto y autohospedado: tus claves, tus tokens, tu infraestructura.

ADAMANT ComServer v2.0.0 está disponible para usuarios que ejecutan la versión premium de ADAMANT Trade Bot.
