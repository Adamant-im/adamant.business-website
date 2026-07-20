---
title: "Una visión más clara de ADAMANT: Explorador de blockchain rediseñado"
slug: "a-clearer-view-of-adamant-redesigned-blockchain-explorer-f97501b0dc55"
description: "Un explorador de blockchain debe hacer más que mostrar transacciones y bloques. Debe ayudar a las personas a comprender lo que sucede en la red: de forma rápida, precisa y con confianza."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/a-clearer-view-of-adamant-redesigned-blockchain-explorer-f97501b0dc55"
publishedAt: "2026-07-19T11:11:20.263Z"
author: "massivedev0 (Theo Bitner)"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:f97501b0dc55"
coverImage: "/images/engineering-notes/medium/f97501b0dc55/001-00d120d06c.webp"
locale: "es"
placeholder: false
---

Un explorador de blockchain debe hacer más que mostrar transacciones y bloques. Debe ayudar a las personas a comprender lo que sucede en la red: de forma rápida, precisa y con confianza. El Explorador de Blockchain de ADAMANT ha sido completamente rediseñado con este principio en mente.

El rediseño no es meramente cosmético. Replantea cómo se estructura la información, cómo se explican las transacciones, cómo se comunica el estado de la red y cómo funciona el Explorador en dispositivos de escritorio y móviles.

### La confianza comienza con la claridad

Un explorador de blockchain es una de las herramientas de verificación más importantes en cualquier ecosistema de blockchain. Los usuarios lo abren para confirmar que una transacción fue incluida en el ledger, inspeccionar una dirección, verificar la actividad de un delegado o comprender el estado actual de la red. Si la interfaz es confusa, inconsistente o visualmente genérica, genera incertidumbre precisamente donde los usuarios esperan transparencia.

El Explorador rediseñado establece una jerarquía visual más clara para los datos de blockchain. Los IDs de transacción, direcciones, montos, confirmaciones, marcas de tiempo y tipos de operación ahora son más fáciles de identificar y comparar. El estado de la red se basa en datos significativos de forjado en lugar de un indicador puramente decorativo de "en línea". El Explorador distingue entre los estados en vivo, degradado, crítico, retrasado y conectando, utilizando la actividad de los delegados de ADAMANT y la frescura de las actualizaciones de la red. El diseño en sí se convierte así en parte del modelo de confianza: los usuarios pueden comprender no solo qué sucedió, sino también qué tan actual y confiable es la información mostrada.

### Responsivo por diseño

Los exploradores a menudo se diseñan como tablas densas de escritorio y se tratan como herramientas técnicas para una audiencia reducida. En realidad, las personas consultan transacciones desde dispositivos móviles, monitorean delegados durante sesiones prolongadas y se mueven frecuentemente entre páginas de resumen y registros detallados.

El nuevo Explorador es responsivo por diseño. Las tablas se convierten en diseños móviles legibles en lugar de obligar a los usuarios a navegar por columnas comprimidas. Las cuentas y delegados conocidos muestran tanto sus nombres como sus direcciones subyacentes. Las acciones de copiar copian consistentemente el valor real de blockchain. Los montos son compactos donde el escaneo rápido importa y permanecen completamente precisos en las páginas de detalle.

Se ha introducido un tema oscuro completo como una experiencia de primera clase en lugar de una simple inversión de colores. Mejora la comodidad durante sesiones prolongadas de monitoreo mientras preserva el contraste para los estados de la red, las direcciones de transacciones, los nodos del mapa, los gráficos y los indicadores de estado.

![Una visión más clara de ADAMANT: Explorador de blockchain rediseñado](/images/engineering-notes/medium/f97501b0dc55/002-216920b6f7.webp)

Hacer que los datos de blockchain sean cómodos de usar en cualquier pantalla reduce la barrera entre los usuarios y la red misma.

### Una nueva identidad visual

La interfaz está diseñada para sentirse profesional y sobria sin parecerse a un panel de administración genérico. El diseño actualizado utiliza un sistema semántico de superficies, tipografía, espaciado, bordes y colores de estado. Los temas claro y oscuro comparten la misma jerarquía de información mientras adaptan su contraste y énfasis al entorno.

El rediseño cubre todo el Explorador: página principal y últimas operaciones públicas, bloques y detalles de bloques, transacciones y detalles de transacciones, páginas de direcciones y delegados, Cuentas Principales, Monitor de Delegados, Monitor de Red, Gráfico de Actividad y todos los componentes auxiliares como encabezado, navegación, búsqueda, tooltips, tablas y pie de página. El área de contenido ahora tiene un ancho máximo cómodo en pantallas grandes, mientras que las secciones de monitoreo seleccionadas aún pueden usar la ventana gráfica completa donde el espacio adicional mejora la comprensión.

### Las transacciones ahora explican más

Los tipos de transacción crudos del protocolo son útiles para las máquinas, pero no siempre describen la operación desde la perspectiva del usuario. El Explorador ahora deriva tipos de transacción más significativos a partir de su contexto. Junto con las transferencias regulares, puede identificar operaciones como depósito, retiro, bono de bienvenida, voto, desvoto, voto y desvoto, crear delegado, depósito y retiro de DApp, y transacciones de mensaje y estado.

Las billeteras de exchanges conocidas se identifican a través del libro de direcciones compartido de ADAMANT. Esto permite que el Explorador describa las transferencias hacia y desde exchanges sin mantener una lista duplicada separada en el frontend. La semántica de las transacciones ahora se define en un registro compartido utilizado tanto por el backend como por el frontend, lo que hace que el comportamiento sea más consistente y simplifica la adición de futuros tipos de protocolo.

### Datos en vivo más estables y precisos

El rediseño también brindó la oportunidad de mejorar varios flujos de datos subyacentes. La página principal ahora muestra las 20 últimas operaciones públicas. Las transacciones con marcas de tiempo idénticas se ordenan de manera determinista usando su altura e ID, evitando que las filas parezcan saltar o desaparecer entre actualizaciones. Las confirmaciones y el estado del ledger se actualizan a medida que llegan nuevos bloques. El Monitor de Delegados espera una instantánea de forjado fresca y coherente cuando se conecta el primer cliente, en lugar de exponer brevemente datos restantes de una sesión anterior.

![Una visión más clara de ADAMANT: Explorador de blockchain rediseñado](/images/engineering-notes/medium/f97501b0dc55/003-0b5168c513.webp)

Se han reducido las búsquedas de cuentas innecesarias, se han añadido la coalescencia de solicitudes y el almacenamiento en caché, y la interfaz ahora está protegida contra fallos temporales de nodos y navegadores donde el almacenamiento persistente no está disponible. Estos cambios son mayormente invisibles, y ese es exactamente el punto. Un buen Explorador debe sentirse estable sin requerir que los usuarios piensen en la complejidad que hay detrás.

### Precisión sin ruido visual

Los valores de blockchain requieren precisión, pero mostrar cada dígito decimal en todas partes hace que las tablas sean más difíciles de escanear. La nueva interfaz adapta el formato al contexto. Las tablas de resumen enfatizan cuatro dígitos significativos, los valores enteros usan separadores de miles y los valores completos permanecen disponibles en tooltips. Las páginas de detalle preservan cada decimal significativo en la cadena, se eliminan los ceros finales insignificantes y las marcas de tiempo usan un formato consistente con la hora UTC y una edad relativa concisa. El mismo principio se aplica en todo el Explorador: proporcionar información completa mientras se enfatiza lo que más importa en cada momento.

El nuevo Explorador está disponible actualmente en el repositorio de desarrollo, con un lanzamiento planificado próximamente.
