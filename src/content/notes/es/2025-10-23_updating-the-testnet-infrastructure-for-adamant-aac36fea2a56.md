---
title: "Actualización de la infraestructura de Testnet para ADAMANT"
slug: "updating-the-testnet-infrastructure-for-adamant-aac36fea2a56"
description: "Por qué la Testnet es importante: su infraestructura necesita actualizaciones para mejorar desarrollo, pruebas y contribuciones comunitarias."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/updating-the-testnet-infrastructure-for-adamant-aac36fea2a56"
publishedAt: "2025-10-23T15:31:46.542Z"
author: "Alex Web3"
authorUrl: "https://medium.com/@al.onyxprotocol"
sourceAccount: "al-onyx"
coverImage: "/images/engineering-notes/medium/aac36fea2a56/001-1-gpu744hucponr8ep2jojwa-png.webp"
cardSpan: "full"
originalId: "medium:aac36fea2a56"
locale: "es"
placeholder: false
---

### Por qué la Testnet es importante

La infraestructura de testnet de ADAMANT fue señalada en [Issue #148](https://github.com/Adamant-im/adamant/issues/148) como necesitada de actualizaciones y estabilización para apoyar mejor el desarrollo, las pruebas y las contribuciones comunitarias. Surgieron dos prioridades clave: accesibilidad, para que nuevos colaboradores puedan desplegar un nodo sin configuraciones complejas, y estabilidad, para que los nodos de prueba reflejen de forma confiable condiciones similares a producción.

### Imagen de arranque para la Testnet ADM

Una instantánea de la base de datos de la testnet está disponible para descargar, permitiéndote inicializar un nodo nuevo ya sincronizado con el estado actual de la testnet y reduciendo significativamente el tiempo de configuración.

Después de instalar un nodo de testnet, descarga la instantánea:

```bash
wget https://testnet.adamant.im/db_test_backup.sql.gz
```

Descomprímela:

```bash
gunzip db_test_backup.sql.gz
```

Carga la imagen en la base de datos del nodo de testnet:

```bash
psql adamant_test < db_test_backup.sql
```

### Nodos públicos de Testnet

La testnet de ADAMANT proporciona una lista predefinida de nodos públicos para descubrimiento de pares, sincronización de red y acceso a la API. La fuente autorizada es el [archivo de configuración oficial](https://github.com/Adamant-im/adamant/blob/dev/test/config.default.json) en el repositorio. En el momento de redactar este documento, la lista contiene tres nodos, todos en el puerto 36667:

```json
"list": [
  {
    "ip": "162.55.32.80",
    "port": 36667
  },
  {
    "ip": "81.0.247.181",
    "port": 36667
  },
  {
    "ip": "95.217.19.144",
    "port": 36667
  }
]
```

El primer nodo (`testnode1.adamant.im`) también aloja el explorador de testnet. El segundo no tiene dominio y tiene la API pública desactivada. El tercero (`testnode3.adm.im`) expone una API pública; por ejemplo, `https://testnode3.adm.im/api/node/status` devuelve el estado del nodo.

### Ejecución de pruebas

Los colaboradores y validadores deben ejecutar las pruebas unitarias y de API en su nodo siguiendo las [pautas de contribución del proyecto](https://github.com/Adamant-im/adamant/blob/dev/.github/CONTRIBUTING.md).

### Solicitud de ADM de Testnet y acceso a aplicaciones

Puedes solicitar 3500 ADM de testnet a través del mismo grifo usado para mainnet: [https://adamant.im/free-adm-tokens](https://adamant.im/free-adm-tokens/). La aplicación de mensajería de testnet está disponible en [https://dev-adamant-testnet.surge.sh](https://dev-adamant-testnet.surge.sh), construida automáticamente desde la rama dev. El explorador de testnet se encuentra en [https://testnet.adamant.im](https://testnet.adamant.im/).
