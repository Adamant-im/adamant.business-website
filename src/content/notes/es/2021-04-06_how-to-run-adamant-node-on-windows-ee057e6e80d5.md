---
title: "Cómo ejecutar un nodo ADAMANT en Windows"
slug: "how-to-run-adamant-node-on-windows-ee057e6e80d5"
description: "Desde Windows 10 versión 1903 y Windows Server 2019, Microsoft incluye WSL 2, que permite ejecutar aplicaciones Linux en Windows. Esto significa que puedes ejecutar un nodo ADAMANT en tu ordenador."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/how-to-run-adamant-node-on-windows-ee057e6e80d5"
publishedAt: "2021-04-06T13:12:12.555Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/ee057e6e80d5/001-1-uqe2ccpdkrmbxnio3cyqaq-jpeg.webp"
cardSpan: "full"
originalId: "medium:ee057e6e80d5"
locale: "es"
placeholder: false
---

A partir de la versión 1903 de Windows 10 y Windows Server 2019, Microsoft incluye WSL 2 (Subsistema Windows para Linux), que permite ejecutar aplicaciones Linux en Windows. Esto significa que puedes ejecutar un nodo ADAMANT en tu ordenador doméstico, incluyendo actuar como delegado o ejecutar un grupo de minería.

### Requisitos del sistema

Necesitas Windows 10 x64 (versión 1903 / compilación 18362 o superior) o Windows Server 2019, al menos 4 GB de RAM y 50 GB de espacio en disco. La Tecnología de Virtualización debe estar habilitada en la BIOS de tu ordenador antes de la instalación.

### Configuración de WSL 2

Sigue la [guía oficial de instalación de WSL 2](https://docs.microsoft.com/en-us/windows/wsl/install-win10#manual-installation-steps). Si no usas Microsoft Store, puedes [descargar Ubuntu manualmente](https://docs.microsoft.com/en-us/windows/wsl/install-manual); Ubuntu 16, 18 o 20 son todas adecuadas.

![Cómo ejecutar un nodo ADAMANT en Windows](/images/engineering-notes/medium/ee057e6e80d5/002-0-d3n4-16cc9epoa-d.webp)

Después de la instalación, crea un nombre de usuario y contraseña UNIX para la distribución Ubuntu. Por ejemplo, establece el nombre de usuario como *ubuntu*.

### Instalar el nodo ADAMANT

Ahora tienes un subsistema Ubuntu ejecutándose en Windows, que se comporta como una máquina virtual. Instala el nodo ADAMANT siguiendo las instrucciones estándar para [Ubuntu](https://medium.com/adamant-im/how-to-run-your-adamant-node-on-ubuntu-990e391e8fcc).

![Cómo ejecutar un nodo ADAMANT en Windows](/images/engineering-notes/medium/ee057e6e80d5/003-0-jj5gjxvimq-cagrf.webp)

Inmediatamente después de la instalación, el proceso *Vmmem* (WSL 2) puede consumir mucha RAM porque el script de configuración descarga una imagen nueva de la blockchain y el subsistema Linux la almacena en caché en memoria. El consumo de memoria disminuye considerablemente tras un reinicio del ordenador.

### Ejecutar el nodo tras un reinicio

Cerrar la ventana de Ubuntu no detiene el nodo; el subsistema Linux continúa ejecutándose en segundo plano. Si el ordenador entra en suspensión, el nodo se reanuda al despertar y se pone al día con la altura de la blockchain. Sin embargo, tras un reinicio completo del ordenador, debes iniciar el nodo manualmente.

Abre el terminal de Ubuntu, o conéctate desde PowerShell:

```
wsl
```

Si tienes varias distribuciones Linux instaladas, especifica la versión:

```
wsl -d Ubuntu-18.04
```

Una vez conectado, inicia PostgreSQL, cambia al usuario *adamant* y lanza el nodo:

```
sudo service postgresql start
su - adamant
cd /home/adamant/adamant && pm2 start --name adamant app.js
```

Verifica que el nodo esté en ejecución y aumentando su altura:

```
curl http://localhost:36666/api/blocks/getHeight
```

Tarda un tiempo en que el nodo se ponga al día con la altura actual de la blockchain. Puedes configurar el inicio automático al reiniciar si tienes conocimientos de administración del sistema; consulta [esta respuesta de Ask Ubuntu](https://askubuntu.com/a/1166012) para obtener orientación.

### Acceder a la API

Tanto desde el terminal de Ubuntu como desde Windows, puedes acceder a la API del nodo a través de *localhost*. Abre un navegador en `http://localhost:36666/api/blocks/getHeight`. Acceder a la API desde otro ordenador requiere una configuración de red adicional.
