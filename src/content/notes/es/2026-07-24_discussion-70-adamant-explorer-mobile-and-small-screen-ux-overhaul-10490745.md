---
title: "ADAMANT Explorer: Optimización de la experiencia de usuario en móviles y pantallas pequeñas"
slug: "discussion-70-adamant-explorer-mobile-and-small-screen-ux-overhaul-10490745"
description: "ADAMANT Explorer ha optimizado su interfaz para móviles, asegurando que los datos complejos de la blockchain sigan siendo legibles y funcionales en pantallas estrechas."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/70"
publishedAt: "2026-07-24T15:52:32Z"
author: "metalisk"
authorUrl: "https://github.com/metalisk"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10490745"
locale: "es"
placeholder: false
---

ADAMANT Explorer ha completado una revisión exhaustiva de su comportamiento en dispositivos móviles y pantallas pequeñas, garantizando que los datos complejos de la blockchain —tablas, direcciones, monitores, el mapa de nodos y el gráfico de red— permanezcan legibles y utilizables en teléfonos y ventanas de visualización estrechas tras el rediseño con Vue. El trabajo se integró en la rama `dev` en Adamant-im/adamant-explorer#42, cerrando incidencias relacionadas con la interfaz móvil, el ruido en las confirmaciones de bloques por WebSocket y una corrección adicional para el zoom de enfoque en iOS.

![Inicio — últimas operaciones](/images/engineering-notes/github/discussions/10490745/001-7b8f5a7ef4.webp)

![Detalles de la transacción](/images/engineering-notes/github/discussions/10490745/002-95436bddca.webp)

![Resumen de dirección](/images/engineering-notes/github/discussions/10490745/003-7f8d8ca009.webp)

![Detalles del bloque](/images/engineering-notes/github/discussions/10490745/004-b4abc82ab8.webp)

![Monitor de delegados](/images/engineering-notes/github/discussions/10490745/005-d25c6a646f.webp)

![Monitor de red](/images/engineering-notes/github/discussions/10490745/006-864cc5422f.webp)

## Cambios por superficie

La búsqueda universal se trasladó fuera del menú contraído a la barra superior, situándose entre el logotipo y el interruptor del menú; se compacta en pantallas pequeñas mientras la barra de red mantiene un recuadro de estado cómodo. En la página de inicio, el formato de tabla ajustada ha sido sustituido por tarjetas de operaciones. Las páginas de bloques, transacciones y direcciones ahora utilizan tablas de transacciones compactas y desplazables en móviles; la lista de bloques muestra una columna de conteo `TXS` y la página de transacciones oculta la fila duplicada del libro mayor. El Monitor de delegados, los nodos del Monitor de red, las Cuentas principales y las Carteras reservadas ahora cuentan con alternativas de tarjetas `.table-mobile`, controles de ordenación móvil y ARIA refinado. Los tooltips personalizados se cierran al tocar la pantalla para evitar que se queden bloqueados en dispositivos táctiles, y el campo de búsqueda ya no activa el zoom y desplazamiento automático de Safari al recibir el foco.

## Notas de implementación

Dos puntos de interrupción estructurales definen el diseño. Con un ancho `<=720px`, las tablas de datos se colapsan en tarjetas o tablas compactas desplazables; con `<=420px`, dichas tarjetas se reordenan verticalmente. Los diseños de escritorio y tableta superiores a `720px` permanecen sin cambios.

Cada fila de inicio es una tarjeta CSS-grid. Con `<=720px`, la ruta se muestra en una línea como `remitente -> destinatario  cantidad  abrir`; con `<=420px`, se reordena con una flecha hacia abajo centrada y la cantidad al lado, con el remitente y el destinatario centrados horizontalmente. La navegación y el tooltip están vinculados únicamente al control de apertura explícito, no a toda la tarjeta.

Las listas de transacciones de bloques y direcciones siguen siendo tablas reales en móviles: desplazables horizontalmente dentro de su contenedor con un conjunto de columnas compactas fijas (Tipo, ID, Remitente, Destinatario, Cantidad; además de Fecha en la página de direcciones) y sin botones de copia por fila. La lista de bloques elimina la ordenación en móviles.

Un sutil error de ajuste afectaba a los valores de resumen: las direcciones y los IDs de transacciones se cortaban dejando un carácter huérfano incluso con espacio disponible. La causa principal era un elemento `flex` con `min-width: 0` y `overflow-wrap: anywhere` que se colapsaba a su contribución de contenido mínimo de 1 carácter, por lo que el ancho del botón de copia forzaba un salto de línea. El valor ahora se expande para llenar la celda (`flex: 1`), manteniendo las direcciones y los IDs de transacciones en una sola línea, mientras que las claves públicas siguen ajustándose correctamente.

El tooltip único a nivel de cuerpo solo es interactivo con el puntero mientras está visible y se oculta al realizar un `pointerdown`, garantizando su cierre en pantallas táctiles donde el temporizador de ocultación automática no siempre es fiable. En iOS, Mobile Safari aplica zoom a cualquier entrada enfocada cuya fuente sea inferior a 16px, lo que desplaza la página; el campo de búsqueda se ha fijado a 16px, mientras que el meta viewport mantiene el zoom de usuario habilitado por accesibilidad.

## Confirmación de bloques mediante WebSocket de nodo

Las notificaciones compactas de bloques por WebSocket se hidratan a través de la API REST del nodo con un único reintento limitado para gestionar el retraso de visibilidad SQL entre nodos (`Block not found`). Un respaldo de altura debe confirmar el ID y la altura del bloque anunciado. El primer error se registra en nivel `debug` y solo se emite un `warn` cuando la confirmación se agota realmente, evitando así el ruido de errores por sincronización rutinaria entre nodos. Las pruebas unitarias exclusivas del nodo cubren las rutas de reintento, respaldo, validación y registro.

## Validación

`npm run lint`, `npm run format:check` y `npm run test:unit` (225 pruebas, incluyendo la hidratación de bloques por WebSocket) se ejecutan correctamente. `git diff --check` está limpio, y los diseños de escritorio y tableta superiores a 720px permanecen sin cambios ni regresiones.
