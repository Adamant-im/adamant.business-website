---
title: "Cómo Convertirse en un Delegado de ADAMANT"
slug: "how-to-become-an-adamant-delegate-745f01d032f"
description: "ADAMANT alcanza el consenso blockchain usando un algoritmo mejorado de Prueba de Participación Delegada (dPoS) conocido como Fair dPoS. Para ser delegado y forjar bloques, debes ejecutar un nodo, pagar una tarifa de registro de 3.000 ADM y acumular suficientes votos."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/how-to-become-an-adamant-delegate-745f01d032f"
publishedAt: "2018-06-30T10:11:25.366Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/745f01d032f/001-1-rprsczpnpydvk1y6ko-hzg-png.webp"
cardSpan: "full"
originalId: "medium:745f01d032f"
locale: "es"
placeholder: false
---

ADAMANT alcanza el consenso blockchain usando un algoritmo mejorado de Prueba de Participación Delegada (dPoS) conocido como Fair dPoS. Para convertirse en delegado y forjar bloques, debe ejecutar un nodo, pagar una tarifa de registro de 3.000 ADM y acumular suficientes votos para ubicarse entre los 101 principales delegados.

Comience instalando y ejecutando un nodo ADAMANT. Una vez que el nodo esté operativo, cambie al usuario del sistema `adamant` e instale la herramienta `adamant-console` desde los repositorios npm.

```bash
su - adamant
npm i -g adamant-console
```

![Cómo Convertirse en un Delegado de ADAMANT](/images/engineering-notes/medium/745f01d032f/002-0-55iagwoakrbgkahj.webp)

A continuación, cree un directorio de configuración y copie el archivo de configuración predeterminado en él.

```bash
mkdir ~/.adm && cp /home/adamant/.nvm/versions/node/$(node -v)/lib/node_modules/adamant-console/config.default.json ~/.adm/config.json
```

![Cómo Convertirse en un Delegado de ADAMANT](/images/engineering-notes/medium/745f01d032f/003-1-5n-ejpboh-pf5plf-85-ug-png.webp)

Edite el archivo copiado `~/.adm/config.json` usando un editor de texto. Cambie el parámetro `network` de `testnet` a `mainnet` y agregue la frase de acceso de su delegado. Mantenga su frase de acceso en secreto y asegúrese de que su servidor permanezca seguro. Alternativamente, puede omitir la frase de acceso del archivo de configuración y proporcionarla mediante una bandera en la línea de comandos durante el registro.

![Cómo Convertirse en un Delegado de ADAMANT](/images/engineering-notes/medium/745f01d032f/004-1-zwh5ys2uf2nnz04woxe3zw-png.webp)

Inicie la consola ejecutando `adm`. Registre su delegado ejecutando el siguiente comando, reemplazando `<new delegate name>` con el nombre deseado. La billetera asociada con su frase de acceso debe contener al menos 3.000 ADM para cubrir la tarifa de registro, la cual se distribuye entre otros delegados que forjan bloques.

```bash
delegate new <new delegate name>
```

![Cómo Convertirse en un Delegado de ADAMANT](/images/engineering-notes/medium/745f01d032f/005-0-khyxu9qp9tk9nbzg.webp)

Si no especificó la frase de acceso en el archivo de configuración, inclúyala directamente en el comando:

```bash
delegate new <new delegate name> --passPhrase "passphrase here"
```

![Cómo Convertirse en un Delegado de ADAMANT](/images/engineering-notes/medium/745f01d032f/006-0-fojjd-jrkr-jmvje.webp)

Después del registro exitoso, salga de la consola presionando `Ctrl+C` dos veces. Para comenzar a forjar, actualice el archivo de configuración de su nodo ubicado en `~/adamant/config.json`. Establezca el parámetro `forging/secret` con su frase de acceso de doce palabras encerrada entre comillas, luego reinicie el nodo.

```bash
nano ~/adamant/config.json
pm2 restart adamant
```

![Cómo Convertirse en un Delegado de ADAMANT](/images/engineering-notes/medium/745f01d032f/007-1-53boguojm1wx6sexqoa6yq-png.webp)

Puede verificar el estado de su delegado visitando el Monitor de Delegados de ADAMANT y buscando su nombre de delegado. Esto lo redirigirá a una página con detalles que confirman su registro.

![Cómo Convertirse en un Delegado de ADAMANT](/images/engineering-notes/medium/745f01d032f/008-1-sq6rao5bjro6dpbpbiwqlq-png.webp)

![Cómo Convertirse en un Delegado de ADAMANT](/images/engineering-notes/medium/745f01d032f/009-1-xutdvsnjzh06yedz6uq1jg-png.webp)

El registro por sí solo no habilita el forjado; debe recibir votos de usuarios de ADAMANT a través de las aplicaciones de Messenger. Una vez que su delegado acumule suficiente poder de voto para ingresar al top 101, supervise su rendimiento en el Monitor de Delegados. Un círculo verde indica forjado exitoso de bloques, mientras que círculos grises, amarillos o rojos sugieren problemas de configuración —generalmente una frase de acceso incorrecta en la configuración del nodo— o tiempos de inactividad del nodo. Mantenga su nodo activo, supervise el rango de su delegado y aplique actualizaciones importantes según sea necesario.

![Cómo Convertirse en un Delegado de ADAMANT](/images/engineering-notes/medium/745f01d032f/010-1-imaqsih3o-uz-q2rggmia-png.webp)
