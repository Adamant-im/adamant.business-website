---
title: "ADAMANT Localnet y anulaciones de configuración: desarrollo más rápido, pruebas más fáciles y mejor automatización"
slug: "adamant-localnet-and-config-overrides-faster-development-easier-testing-better-automation-c6756a10f6bd"
description: "El desarrollo en ADAMANT es ahora más fácil y rápido. Además de la Testnet pública, los desarrolladores pueden ejecutar una red local ligera directamente en su máquina."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-localnet-and-config-overrides-faster-development-easier-testing-better-automation-c6756a10f6bd"
publishedAt: "2026-06-06T13:20:25.670Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/c6756a10f6bd/001-1-50jddzsw9tlqqlt95tevlg-png.webp"
cardSpan: "full"
originalId: "medium:c6756a10f6bd"
locale: "es"
placeholder: false
---

El desarrollo en ADAMANT se ha vuelto más fácil y rápido para operadores de nodos, colaboradores y desarrolladores de aplicaciones. Además de la Testnet pública de ADAMANT, ahora los desarrolladores pueden ejecutar una red ADAMANT ligera directamente en su propia máquina. Esta configuración de Localnet está diseñada para experimentos rápidos, verificaciones automatizadas, pruebas de escenarios y flujos de trabajo de desarrollo que no requieren una red pública ni infraestructura pesada. Al mismo tiempo, ADAMANT Node ahora admite anulaciones flexibles de configuración, lo que permite a los operadores y scripts de automatización de pruebas cambiar la configuración del nodo al inicio sin necesidad de editar manualmente `config.json` o `test/config.json`.

### De Testnet a Localnet

La Testnet sigue siendo importante porque ofrece a los desarrolladores un entorno público compartido más cercano a las condiciones reales de red. Es útil para probar integraciones, verificar el comportamiento de aplicaciones, validar la compatibilidad de nodos y experimentar con funciones antes de que lleguen a Mainnet. Sin embargo, no todas las tareas de desarrollo necesitan una red pública. A veces los desarrolladores necesitan algo más pequeño y rápido: iniciar varios nodos localmente, probar cambios relacionados con el consenso, verificar el descubrimiento y sincronización de pares, reproducir un error, ejecutar pruebas automatizadas de escenarios o validar el comportamiento del nodo antes de abrir una solicitud de extracción. Aquí es donde entra en juego Localnet.

### ¿Qué es ADAMANT Localnet?

ADAMANT Localnet es una red ADAMANT multi-nodo gestionada que se ejecuta localmente en una sola máquina. En lugar de conectarse a nodos públicos de Testnet, Localnet inicia varios nodos ADAMANT aislados localmente. Cada nodo tiene sus propios puertos, estado de ejecución, registros, metadatos del proceso y configuración de base de datos.

El flujo de trabajo básico es sencillo:

```bash
npm run start:localnet -- --nodes 3
npm run status:localnet
npm run stop:localnet
```

Cuando se necesita una limpieza completa, las bases de datos locales persistentes se pueden eliminar con `npm run drop:localnet` o usando `npm run stop:localnet -- --dropOnStop`.

Localnet es intencionadamente ligero. No requiere un servidor público, un VPS ni una larga sincronización desde la red. Se ejecuta localmente, utiliza una configuración de prueba controlada y es adecuado para máquinas de desarrollo. Esto lo hace útil para colaboradores que prueban cambios en nodos antes de enviarlos, mantenedores que necesitan verificaciones rápidas de versiones, desarrolladores que construyen aplicaciones sobre las API de ADAMANT y scripts de automatización o entornos similares a CI.

### Qué crea Localnet en segundo plano

Cuando Localnet se inicia, genera datos de ejecución aislados para cada nodo, incluyendo archivos de configuración por nodo, estado de ejecución, archivos PID, un manifiesto, datos locales de cadena y carpetas de registro por nodo. Los registros están separados por nodo, por ejemplo en `logs-localnet/node-1/`, `logs-localnet/node-2/`, etc. Esto es importante porque los problemas multi-nodo a menudo requieren comparar el comportamiento entre diferentes pares: un solo archivo de registro no es suficiente al depurar problemas de propagación, reconexiones, bloques perdidos, situaciones de split-brain, comportamiento de forjado o consenso de broadhash. Las herramientas de Localnet también producen metadatos legibles por máquina que luego pueden ser utilizados por herramientas de prueba de escenarios.

El script de estado informa información por nodo, como estado de la API, conteo de delegados, última hora de forjado, nethash y consenso de broadhash en tiempo real. El consenso de broadhash es especialmente útil para verificar si los nodos locales están realmente alineados entre sí después del inicio. En una prueba rápida local, se inició una Localnet de 3 nodos, se consultó el estado, el consenso de broadhash alcanzó el 100 % en todos los nodos y luego la Localnet se detuvo y eliminó correctamente.

Localnet no se detiene simplemente matando procesos. El script `stop:localnet` utiliza la ruta de apagado ordenado normal del nodo, lo que ayuda a evitar problemas innecesarios en la base de datos o en el estado de ejecución, manteniendo las pruebas locales más cercanas al comportamiento operativo real. Por defecto, las bases de datos locales de PostgreSQL son persistentes. La creación automática de bases de datos depende de que el rol local de PostgreSQL tenga permiso `CREATEDB`; si esto no está disponible, los desarrolladores pueden usar una configuración de base de datos existente o las opciones documentadas de omisión/creación.

### Anulaciones de configuración: ya no es necesario editar manualmente la configuración

Anteriormente, ADAMANT Node permitía seleccionar un archivo de configuración con `--config` y tenía varios anulaciones CLI codificadas como `--port`, `--address`, `--peers`, `--log` y `--snapshot`. Esto funcionaba para casos simples, pero no escalaba bien. Los operadores y scripts de automatización a menudo necesitan cambiar valores de configuración anidados: puertos, configuración de Redis, configuración de base de datos, listas de pares, opciones de registro, configuración de API, configuración de forjado, alturas de activación o parámetros específicos de pruebas. Editar manualmente archivos de configuración copiados es propenso a errores, agregar una bandera CLI por cada clave de configuración no escala, y reemplazar todo el archivo de configuración es a menudo demasiado pesado para cambios pequeños específicos del entorno.

Ahora los desarrolladores pueden pasar valores individuales de configuración directamente al inicio usando claves con formato de ruta por puntos que coinciden con la estructura del objeto de configuración existente:

```bash
node app.js \
  --config test/config.json \
  --genesis test/genesisBlock.json \
  --config-set consensusActivationHeights.fairSystem=4359465 \
  --config-set redis='{ "url": "redis://127.0.0.1:6379/1", "password": null }'
```

Esto permite a los scripts anular un solo valor escalar anidado o un valor completo de objeto. Los valores se analizan como valores compatibles con JSON cuando es posible, por lo que números, booleanos, null, arrays y objetos se representan correctamente en lugar de tratarse como cadenas simples.

Las anulaciones de configuración también admiten archivos. Un archivo de anulación en formato env puede contener entradas como:

```ini
consensusActivationHeights.fairSystem=4359465
redis='{ "url": "redis://127.0.0.1:6379/1", "password": null }'
```

La implementación también admite archivos JSON de anulación parcial. Esto es útil para entornos locales, automatización de pruebas, flujos de trabajo similares a CI y mantenedores que desean un conjunto repetible de cambios sin modificar archivos de configuración rastreados. Localnet utiliza este mecanismo por defecto a través de `test/config.localnet.json`, manteniendo la configuración base estable mientras las diferencias específicas de Localnet se aplican mediante el mismo flujo validado de anulaciones.

### Validación y seguridad

La configuración final resuelta sigue siendo validada contra el esquema de configuración existente de ADAMANT después de que se resuelven los valores predeterminados, archivos de anulación, anulaciones directas y atajos CLI heredados. Se espera que rutas inválidas, tipos de valor inválidos, JSON mal formado y claves inseguras fallen antes del inicio, en lugar de producir un comportamiento impredecible en tiempo de ejecución. Los valores sensibles se ocultan en los registros de anulación de configuración, incluyendo contraseñas, frases de acceso, secretos y tokens. Los atajos heredados de inicio se enrutan a través del mismo flujo validado de anulaciones y mantienen la máxima precedencia, por lo que los flujos de trabajo existentes siguen funcionando mientras que los nuevos flujos obtienen un mecanismo de configuración más genérico y consistente.

Algunos valores de configuración son sensibles al consenso. Anular claves como `consensusActivationHeights.*` puede ser útil para escenarios locales o de prueba, pero usar alturas de activación incompatibles con la red frente a una cadena incorrecta puede hacer que un nodo se desvíe de la red. Las anulaciones de configuración están diseñadas para ser explícitas y visibles. Son útiles para Localnet, Testnet, automatización y escenarios operativos controlados, pero deben usarse con cuidado en nodos Mainnet de producción. Esta función solo cambia la resolución de la configuración al inicio: no cambia directamente la lógica de bloques, serialización de transacciones, lógica de recompensas, lógica de tarifas, orden de delegados, verificaciones de firmas o reglas de consenso.

### Localnet y Testnet trabajan juntos

Localnet no reemplaza a Testnet; resuelven problemas diferentes. Localnet es ideal para desarrollo rápido, privado y repetible en una sola máquina, donde los desarrolladores necesitan control total, inicio rápido y experimentos aislados. Testnet es ideal para pruebas públicas, compartidas y a nivel de red, donde los desarrolladores necesitan un entorno persistente, pares públicos, monedas ADM de prueba, acceso al explorador y verificaciones a nivel de aplicación contra una red compartida. Juntos, ofrecen a los colaboradores de ADAMANT una canalización de desarrollo más sólida: prueba localmente con Localnet, valida contra la Testnet pública y luego prepara versiones Mainnet más seguras.

La gestión del ciclo de vida de Localnet se separó intencionalmente de la ejecución de pruebas de escenarios. Los scripts de Localnet son responsables de iniciar, detener, inspeccionar y limpiar la red local. Luego, los ejecutores de escenarios pueden apuntar a una Localnet o Testnet ya disponible y generar informes. Esta separación mantiene las responsabilidades claras y facilita la creación de herramientas futuras.
