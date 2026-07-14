---
title: "Cómo ejecutar tu nodo ADAMANT en Docker (Windows o Mac)"
slug: "how-to-run-your-adamant-node-on-docker-windows-or-mac-9a927cf7875a"
description: "Nota: La imagen de Docker puede estar desactualizada; se recomienda ejecutar un nodo ADAMANT en un servidor Ubuntu. ADAMANT usa Prueba de Participación Delegada (dPoS) para el consenso de la blockchain..."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/how-to-run-your-adamant-node-on-docker-windows-or-mac-9a927cf7875a"
publishedAt: "2018-06-22T15:46:46.729Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/9a927cf7875a/001-0-fg4w7kswcdb2l5b0.webp"
cardSpan: "full"
originalId: "medium:9a927cf7875a"
locale: "es"
placeholder: false
---

Nota: La imagen de Docker puede estar desactualizada; se recomienda ejecutar un nodo ADAMANT en un servidor Ubuntu. ADAMANT utiliza Prueba de Participación Delegada (dPoS) para el consenso de la blockchain, y ejecutar tu propio nodo mejora la descentralización de la red.

Esta guía explica cómo instalar, ejecutar y actualizar un nodo ADAMANT en Windows, macOS o Linux usando Docker. El ejemplo utiliza Windows 10, que requiere una versión de 64 bits de Windows 10 Pro, Enterprise o Education (Build 14393 o posterior). La máquina anfitriona debe tener al menos 4 GB de RAM y 50 GB de espacio libre en disco, dependiendo de la altura actual del bloque.

Para instalar Docker, descarga la edición gratuita Docker Community Edition y ejecuta el instalador. Sigue el asistente para aceptar la licencia y autorizar el instalador con tu contraseña de sistema, necesaria para los componentes de red y las máquinas virtuales Hyper-V. Después de la instalación, inicia Docker desde el menú Inicio. Una vez que el icono de ballena en la barra de estado se vuelva estable, Docker está funcionando. También debes compartir tu unidad local con Docker haciendo clic derecho en el icono de la barra de estado, seleccionando Configuración, marcando la casilla de la unidad compartida y aplicando los cambios.

![Cómo ejecutar tu nodo ADAMANT en Docker (Windows o Mac)](/images/engineering-notes/medium/9a927cf7875a/002-0-lyckrpled-5lr7hl.webp)

![Cómo ejecutar tu nodo ADAMANT en Docker (Windows o Mac)](/images/engineering-notes/medium/9a927cf7875a/003-0-6akvfvvlkcfe7829.webp)

![Cómo ejecutar tu nodo ADAMANT en Docker (Windows o Mac)](/images/engineering-notes/medium/9a927cf7875a/004-0-a86t6y8gjz9oxrpc.webp)

Para instalar el nodo ADAMANT, primero instala un cliente Git usando las opciones predeterminadas. Abre Microsoft PowerShell y clona el repositorio:

```bash
git clone https://github.com/Adamant-im/adamant-docker
cd adamant-docker
```

![Cómo ejecutar tu nodo ADAMANT en Docker (Windows o Mac)](/images/engineering-notes/medium/9a927cf7875a/005-0-fgfme0jdbid9yncf.webp)

Para ejecutar el nodo, descarga las imágenes de Docker necesarias:

```bash
docker-compose pull
```

![Cómo ejecutar tu nodo ADAMANT en Docker (Windows o Mac)](/images/engineering-notes/medium/9a927cf7875a/006-0-aivqroqzrjyhguqd.webp)

Inicia el servicio de base de datos y verifica que se haya lanzado correctamente:

```bash
docker-compose up -d db
docker-compose logs
```

![Cómo ejecutar tu nodo ADAMANT en Docker (Windows o Mac)](/images/engineering-notes/medium/9a927cf7875a/007-0-papyajoh0cxgai9i.webp)

A continuación, inicia el servicio adamant-node y verifica los registros para confirmar un inicio exitoso:

```bash
docker-compose up -d adamant-node
```

![Cómo ejecutar tu nodo ADAMANT en Docker (Windows o Mac)](/images/engineering-notes/medium/9a927cf7875a/008-0-5juodmupmzrre2n1.webp)

Puedes detener todos los servicios en ejecución con `docker-compose stop` y reiniciarlos más tarde usando `docker-compose start`.

![Cómo ejecutar tu nodo ADAMANT en Docker (Windows o Mac)](/images/engineering-notes/medium/9a927cf7875a/009-0-hrzlp4aniigch2fc.webp)

Valida la instalación verificando el registro de la aplicación del nodo:

```bash
docker-compose logs --tail=10 adamant-node
```

![Cómo ejecutar tu nodo ADAMANT en Docker (Windows o Mac)](/images/engineering-notes/medium/9a927cf7875a/010-0-v8ofli8bjy-hqo2b.webp)

El argumento `--tail=10` limita la salida a las últimas 10 líneas del registro. Para verificar que el nodo esté conectado a la blockchain ADAMANT, visita el monitor de red ADAMANT y encuentra tu nodo por su dirección IP. Puede tardar unos minutos en aparecer. Un nodo recién instalado mostrará una altura de bloque de 1 mientras se sincroniza, lo cual puede tardar hasta un día dependiendo de tu conexión y CPU.

![Cómo ejecutar tu nodo ADAMANT en Docker (Windows o Mac)](/images/engineering-notes/medium/9a927cf7875a/011-0-74skpvuswckotzf6.webp)

Para verificar la altura directamente, obtén el ID del contenedor usando `docker ps`, luego consulta la API del nodo:

```bash
docker ps
docker exec <container_id> curl -k -X GET http://localhost:36666/api/blocks/getHeight
```

![Cómo ejecutar tu nodo ADAMANT en Docker (Windows o Mac)](/images/engineering-notes/medium/9a927cf7875a/012-0-osgtdu-u6daibuqi.webp)

Cuando la sincronización finalice, la altura coincidirá con otros nodos en la red. Para actualizar el nodo ADAMANT, abre PowerShell y ejecuta los siguientes comandos:

```bash
cd adamant-docker
docker-compose stop
docker-compose pull
docker-compose down
docker-compose up -d db
docker-compose up -d adamant-node
```

![Cómo ejecutar tu nodo ADAMANT en Docker (Windows o Mac)](/images/engineering-notes/medium/9a927cf7875a/013-0-l5hbgju9qlgr65sw.webp)
