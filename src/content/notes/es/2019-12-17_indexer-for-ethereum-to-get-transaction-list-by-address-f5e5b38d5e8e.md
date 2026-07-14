---
title: "Indexador para Ethereum para Obtener Listas de Transacciones por Dirección"
slug: "indexer-for-ethereum-to-get-transaction-list-by-address-f5e5b38d5e8e"
description: "Los nodos de Ethereum no admiten nativamente obtener listas de transacciones por dirección. El equipo de ADAMANT creó un indexador de código abierto para resolverlo."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/indexer-for-ethereum-to-get-transaction-list-by-address-f5e5b38d5e8e"
publishedAt: "2019-12-17T09:47:40.803Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/f5e5b38d5e8e/001-1-joo929ftoejwheza0gd8ka-png.webp"
cardSpan: "full"
originalId: "medium:f5e5b38d5e8e"
locale: "es"
placeholder: false
---

Los nodos de Ethereum no admiten nativamente la obtención de una lista de transacciones para una dirección determinada. El método `eth_listTransactions` ha sido solicitado durante mucho tiempo, pero no forma parte de la hoja de ruta de Ethereum, lo que obliga a los desarrolladores de aplicaciones —como apps de mensajería, exploradores de bloques o billeteras— a construir su propia capa de indexación.

El equipo de ADAMANT creó un [indexador de transacciones de Ethereum](https://github.com/Adamant-im/ETH-transactions-storage) gratuito y de código abierto para cubrir esta necesidad. Escrito en Python, se ejecuta como un servicio en segundo plano que se conecta a un nodo Ethereum (probado con geth y parity), obtiene transacciones mediante JSON RPC y las almacena —incluyendo transacciones de contratos inteligentes— en una base de datos Postgres. A continuación, se proporciona una capa API RESTful a través de Postgrest, permitiendo consultas por dirección similares a las que ofrece Etherscan.

### Cómo Funciona

El indexador comienza a almacenar transacciones desde un número de bloque que usted especifique, y luego consulta nuevos bloques cada 20 segundos por defecto (el intervalo es configurable). Una vez que el índice está poblado, puede consultar transacciones por dirección a través de Postgrest. Por ejemplo, la siguiente solicitud devuelve las 25 transacciones más recientes que involucran la dirección `0x6b924750e56a674a2ad01fbf09c7c9012f16f094`, ordenadas por marca de tiempo:

```
curl -k -X GET "http://localhost:3000/?and=(contract_to.eq.,or(txfrom.eq.0x6b924750e56a674a2ad01fbf09c7c9012f16f094,txto.eq.0x6b924750e56a674a2ad01fbf09c7c9012f16f094))&order=time.desc&limit=25"
```

Para obtener una referencia completa de la API, consulte la [documentación de Postgrest](https://postgrest.org/en/v5.2/api.html).

### Configuración

El indexador se ejecuta en Linux (probado en Ubuntu 16 y 18). Necesita un nodo geth o parity sincronizado, además de Python, Postgresql, Postgrest y nginx. Puede ejecutar el indexador directamente o como un servicio en segundo plano:

```
python3.6 you/path/to/script/ethsync.py <yourDB>
```

La indexación lleva tiempo. Para verificar el progreso, consulte el último bloque indexado y compárelo con el mejor bloque de su nodo:

```
psql -d index -c 'SELECT MAX(block) FROM ethtxs;'
```

Las instrucciones detalladas de instalación y configuración están disponibles en el [repositorio](https://github.com/Adamant-im/ETH-transactions-storage).

### API Pública

Postgrest publica la API en un puerto local. Para exponerla públicamente, configure nginx para que redirija las solicitudes a Postgrest:

```
location /ethtxs {
    proxy_pass http://127.0.0.1:3000;
}

location /aval {
    proxy_pass http://127.0.0.1:3000;
}
```

Esto proporciona dos puntos finales: `/ethtxs` para obtener transacciones de Ethereum por dirección, y `/aval` para el estado del servicio.

### Ejemplo en Vivo

Una instancia en funcionamiento está disponible en el nodo de ADAMANT. Abrir la siguiente URL en un navegador devuelve las transacciones recientes para la dirección de ejemplo:

```
https://ethnode1.adamant.im/ethtxs?and=(contract_to.eq.,or(txfrom.eq.0x6b924750e56a674a2ad01fbf09c7c9012f16f094,txto.eq.0x6b924750e56a674a2ad01fbf09c7c9012f16f094))&order=time.desc&limit=25
```
