---
title: "ADAMANT IPFS Node v0.1.0: Almacenamiento Acotado y Replicación Determinista"
slug: "discussion-80-adamant-ipfs-node-v0-1-0-released-from-master-bounded-storage-deterministic-replication-an-10920610"
description: "Ya está disponible la primera versión etiquetada de ADAMANT IPFS Node como v0.1.0, con la imagen de contenedor en ghcr.io/adamant-im/ipfs-node:0.1.0."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/80"
publishedAt: "2026-09-30T11:31:18Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10920610"
locale: "es"
placeholder: false
---

Ya está disponible la primera versión etiquetada de ADAMANT IPFS Node como v0.1.0, con la imagen de contenedor en `ghcr.io/adamant-im/ipfs-node:0.1.0`. Esta aplicación independiente de Node.js y Helia funciona como un nodo de almacenamiento IPFS para la entrega de archivos de aplicaciones. No es un contenedor de Kubo y no expone una API compatible con Kubo. Aunque ADAMANT Messenger es el despliegue de referencia, cualquier aplicación puede alojar el nodo por su cuenta.

El tiempo de ejecución del servicio expone una API Express a través de doce rutas documentadas, que incluyen salud, detalles administrativos, carga multipart, descarga por CID y métricas de almacenamiento. Las clases de acceso se aplican de forma centralizada, la clave de administrador falla en modo cerrado y CORS es una lista de permitidos explícita. El ciclo de vida del almacenamiento cuenta con un registro de archivos respaldado por un almacén de datos con una máquina de estados duradera, reserva de disco, presupuesto de ingesta, cargas temporales con TTL y recolección de basura basada en marcas de agua. La ubicación utiliza hashing de encuentro determinista sobre el conjunto de pares configurado, con recuentos de copia que disminuyen según la antigüedad del archivo. La replicación se ejecuta sobre protocolos versionados con preparación, confirmación y reversión de etapas. Cada sesión de carga rastrea los bloques creados, asegurando que las solicitudes rechazadas o abortadas eliminen exactamente esos bloques.

Los puntos de control de salud son conscientes de la red con una altura monotónica persistente y una época de membresía explícita, aceptando atestaciones solo de pares configurados. Las mejoras en la fiabilidad de la malla incluyen comprobaciones periódicas de actividad mediante ping de libp2p con restablecimiento de sesión en caso de fallo y recuperación reactiva tras errores en el flujo de replicación obsoletos. Las actualizaciones de CORS y códigos de error introducen un origen de escritorio opcional `app://.`, valores de `code` legibles por máquina y comodines `http(s)://*.onion` limitados a formas de servicio oculto v3 para compatibilidad con Tor Browser.

El contenedor está construido sobre `node:24.13.0-bookworm-slim` utilizando un Dockerfile de múltiples etapas. Se ejecuta como un usuario `node` sin privilegios con `HOME=/data`, lo que permite que un solo volumen contenga el almacén de bloques, el almacén de datos, la identidad del par, los pines, el registro, el cursor de reparación y el punto de control de salud. La imagen se envía sin configuración; los operadores deben montar una en `/app/config.json5`. Se publica para `linux/amd64` y `linux/arm64` con SBOM y atestación de procedencia.

El nodo evita explícitamente DHT, IPNS, puertas de enlace públicas y APIs de Kubo. El contenido almacenado no se anuncia a la red IPFS pública, y el contenido de la red pública no se puede recuperar a través de este nodo. Una topología de pares controlada reduce la exposición pública de los metadatos de enrutamiento de contenido, pero no hace que un despliegue sea intrínsecamente privado, anónimo, sin confianza o resistente a la censura. La carga y descarga no están autenticadas por diseño, siendo una única clave administrativa la única credencial. El trabajo pendiente incluye la eliminación firmada por el cargador, el descubrimiento de pares, la contabilidad de tráfico, el directorio de datos absoluto y la interoperabilidad con redes públicas.

Para ejecutar el nodo, cree un volumen de datos e inicie el contenedor con la configuración y los mapeos de puertos adecuados:

```bash
docker volume create ipfs-node-data

docker run -d \
  --name ipfs-node \
  --restart unless-stopped \
  --stop-timeout 20 \
  -v ipfs-node-data:/data \
  -v "$PWD/config.json5:/app/config.json5:ro" \
  -p 127.0.0.1:4000:4000 \
  -p 4001:4001 \
  ghcr.io/adamant-im/ipfs-node:0.1.0
```

La versión fue verificada a través de CI, auditorías de seguridad y pruebas de humo del contenedor en ambas arquitecturas. El flujo de trabajo de publicación confirma que la etiqueta es un ancestro de `master`, coincide con la versión de `package.json` y se reconstruye con etiquetas OCI, SBOM y procedencia antes de una segunda prueba de humo.
