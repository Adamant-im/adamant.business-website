---
title: "ADAMANT IPFS Node v0.1.0: Una malla de entrega de archivos autohospedada"
slug: "adamant-ipfs-node-v0-1-0-a-file-delivery-mesh-you-can-run-yourself-f2d20fc9af5a"
description: "ADAMANT IPFS Node v0.1.0 es la primera versión etiquetada y la imagen de contenedor publicada del servicio de entrega de archivos autohospedado de ADAMANT."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-ipfs-node-v0-1-0-a-file-delivery-mesh-you-can-run-yourself-f2d20fc9af5a"
publishedAt: "2026-09-30T18:36:13.519Z"
author: "ADAMANT Messenger"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:f2d20fc9af5a"
coverImage: "/images/engineering-notes/medium/f2d20fc9af5a/001-275d9701d0.webp"
locale: "es"
placeholder: false
---

ADAMANT IPFS Node v0.1.0 es la primera versión etiquetada y la imagen de contenedor publicada del servicio de entrega de archivos autohospedado de ADAMANT. Integra direccionamiento de contenido, una API REST, entrega entre pares controlada, políticas de almacenamiento, replicación, reparación y puntos de control de estado en una única aplicación Node.js. ADAMANT Messenger ya utiliza esta infraestructura para los archivos adjuntos; este lanzamiento facilita que otros desarrolladores puedan evaluarla, implementarla y adaptarla.

## Archivos propiedad de la aplicación

La integración comienza con dos acciones: cargar un archivo mediante `POST /api/file/upload` y luego recuperarlo mediante `GET /api/file/:cid`. El identificador de contenido (CID) devuelto se deriva del contenido en lugar de la dirección del servidor, por lo que una aplicación puede pasar ese identificador a un destinatario sin decidir qué máquina debe servir el archivo. Un nodo puede transmitir su copia local o recuperar contenido de pares configurados que deberían almacenarlo.

Esto es ideal para archivos adjuntos de mensajería, medios de aplicación inmutables y servicios cuyos clientes ya intercambian identificadores de contenido. En ADAMANT Messenger, el cliente carga un archivo adjunto cifrado, lleva su CID dentro de un mensaje y el destinatario lo obtiene a través de su nodo. El cifrado pertenece al protocolo del cliente; el servicio de almacenamiento solo gestiona los bytes que recibe.

## Una malla con reglas de operación explícitas

El nodo está construido directamente con Helia y libp2p. Ejecuta una pila IPFS integrada junto con su API HTTP, utilizando transporte TCP, cifrado Noise para las conexiones entre pares y multiplexación de flujo Yamux.

Los operadores configuran el conjunto de pares. El hash de encuentro (rendezvous hashing) clasifica a los poseedores de cada CID, de modo que los nodos con la misma membresía derivan la misma ubicación. Los niveles basados en la antigüedad permiten que una implementación reduzca el número objetivo de copias a medida que un archivo envejece. Un ciclo de reparación reanudable verifica si faltan copias e intenta restaurar la ubicación prevista cuando el contenido sigue siendo recuperable. Esto combina la ubicación y la reparación con el servicio que recibe y entrega archivos, eliminando la necesidad de un servicio de orquestación de pines separado al construir sobre un conjunto conocido y configurado mutuamente de nodos.

![ADAMANT IPFS Node v0.1.0: Una malla de entrega de archivos que puede ejecutar usted mismo](/images/engineering-notes/medium/f2d20fc9af5a/002-1f2c5c003f.webp)

El ciclo de vida de la v0.1.0 de un vistazo: ingesta, ubicación determinista, reparación y recuperación, con límites de almacenamiento e informes de estado en todo momento.

## Los discos finitos merecen una política real

Los controles de almacenamiento son parte de la ruta de ingesta. Las reservas de disco, los límites de solicitud agregados, los límites de archivos y la admisión de transferencias concurrentes ayudan al nodo a rechazar el trabajo que no puede aceptar de forma segura. Las cargas temporales opcionales pueden expirar después de un TTL; la recolección de basura utiliza marcas de agua y el registro del ciclo de vida para recuperar datos elegibles.

El contenido confirmado permanece protegido. Cuando los archivos confirmados ocupan la capacidad disponible, los límites de admisión son importantes: un almacenamiento limitado no significa eliminar silenciosamente archivos que la política indica que deben permanecer duraderos. Los operadores eligen la política de retención y replicación, aprovisionan la capacidad y supervisan los resultados. El comportamiento del almacenamiento se puede inspeccionar y configurar, incluido lo que sucede cuando a una implementación le queda poco espacio.

## Fiabilidad más allá de una conexión abierta

El lanzamiento incluye correcciones para un fallo sutil de la malla: una conexión TCP puede permanecer presente mientras los flujos de la aplicación dejan de funcionar. La lógica de emparejamiento anterior podía ver un par conectado y dejar intacta una sesión bloqueada. El PR #40 añade comprobaciones de actividad y recuperación de sesión reactiva. El PR #42 fortalece aún más esa ruta: las operaciones de recuperación concurrentes se fusionan, los flujos fallidos pueden activar un reinicio sin ser vetados por un ping exitoso, y la ubicación puede reintentarse una vez en una conexión nueva.

Los informes de estado siguen el mismo principio. `GET /api/node/health` expone estados de inicio, listo, obsoleto o degradado, junto con una altura de punto de control persistente e información de membresía. La altura avanza cuando se superan las comprobaciones requeridas y se congela cuando fallan; las alturas solo son comparables dentro de la misma versión de membresía. Los operadores deben leer ese estado, no solo confiar en el HTTP 200. La gracia opcional para la acumulación de reparaciones puede tolerar un número configurado de ciclos de reparación fallidos, mientras que la acumulación y los resultados del ciclo permanecen visibles para la supervisión. El valor predeterminado no otorga gracia.

## Integración con clientes de escritorio y Tor

v0.1.0 incluye mejoras de CORS que permiten a los operadores permitir explícitamente el origen `app://.` del escritorio y los orígenes onion apropiados, incluido el origen nulo opaco que envían algunas solicitudes del navegador Tor. Los fallos de carga y admisión ahora incluyen códigos de error estables legibles por máquina, lo que permite a los clientes distinguir entre limitación de tasa, límites de concurrencia, almacenamiento insuficiente, fallos de quórum de replicación y tiempos de espera sin analizar prosa. CORS sigue siendo un control de compatibilidad del navegador; las implementaciones aún necesitan la política de autorización y exposición adecuada para su aplicación.

## Implementación

El contenedor público está disponible para linux/amd64 y linux/arm64:

```
docker pull ghcr.io/adamant-im/ipfs-node:0.1.0
```

La imagen se ejecuta como un usuario sin privilegios y contiene un SBOM y una certificación de procedencia de compilación. La configuración se monta por separado en `/app/config.json5`. Un único volumen `/data` contiene el almacén de bloques, el almacén de datos, la identidad del par, el conjunto de pines, el registro del ciclo de vida, el cursor de reparación y el punto de control de estado, manteniendo el estado persistente junto durante el reemplazo del contenedor. La canalización de lanzamiento vuelve a extraer y prueba ambas arquitecturas, ejercitando el inicio, la preparación, la carga y descarga, el apagado limpio y la preservación del contenido y la identidad del par durante el reemplazo.

Para la evaluación, comience con `docker/config.example.json5`, que no se une a ninguna red. La plantilla de producción contiene la lista de pares de ADAMANT; su propia implementación debe definir sus propios pares y orígenes de navegador. Mantenga el servicio HTTP detrás de un proxy inverso HTTPS configurado correctamente.

## Límites arquitectónicos

La topología configurada evita los anuncios públicos de DHT y el enrutamiento de puerta de enlace pública, reduciendo la exposición pública de los metadatos de enrutamiento de contenido. No hace que una implementación sea anónima o confidencial por sí sola. El servicio no cifra los archivos almacenados; las cargas y descargas no están autenticadas por diseño. Las aplicaciones que requieren confidencialidad o acceso autenticado deben proporcionar esos controles por encima de la capa de almacenamiento.

No hay interoperabilidad pública de IPFS, IPNS, puerta de enlace pública o API compatible con Kubo en esta versión. El contenido almacenado aquí no se anuncia a la red pública, y el contenido retenido solo por pares públicos no se puede recuperar a través de este nodo. La eliminación firmada por el cargador, el descubrimiento dinámico de pares y la contabilidad de tráfico siguen siendo trabajo pendiente.

Para un conjunto de pares conocido y una entrega de aplicaciones direccionada por contenido, estas opciones forman un modelo operativo enfocado. Para la participación pública en IPFS, una flota dinámica o controles de identidad y acceso al estilo S3, consulte la guía de comparación antes de elegir una arquitectura de almacenamiento.
