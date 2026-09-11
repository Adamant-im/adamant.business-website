---
title: "Una superficie de control más clara para la creación de mercado: ADAMANT WebUI Escenario A-3"
slug: "a-clearer-command-surface-for-market-making-adamant-webui-scenario-a-3-867a0d568e69"
description: "La infraestructura de creación de mercado suele ser capaz técnicamente pero opaca operativamente. El estado, los parámetros y las alertas están dispersos; el Escenario A-3 lo unifica."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/a-clearer-command-surface-for-market-making-adamant-webui-scenario-a-3-867a0d568e69"
publishedAt: "2026-09-10T20:23:38.199Z"
author: "ADAMANT Messenger"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:867a0d568e69"
coverImage: "/images/engineering-notes/medium/867a0d568e69/001-880955b2e4.webp"
locale: "es"
placeholder: false
---

La infraestructura de creación de mercado suele ser capaz técnicamente pero opaca operativamente. El estado reside en un comando, los parámetros en otro, y la razón de una parada de seguridad puede estar enterrada en los registros. El tercer incremento del MVP del Escenario A, la interfaz web privada y autohospedada ADAMANT Market-Making WebUI, transforma el navegador de una colección de controles aislados a una superficie operativa más clara para los operadores que gestionan la liquidez de tokens día tras día.

El nuevo panel de control (Dashboard) por bot es la vista principal. Reúne el contexto del par y del exchange, el estado de creación de mercado desde la API /status del bot, una insignia de edición de funciones, un gráfico de precios compacto de 15 minutos, módulos activos e inactivos, un resumen legible de parámetros, saldos y órdenes abiertas agrupadas por propósito. La insignia de edición —desde Basic hasta Full— se deriva de las capacidades instaladas del bot, no de qué módulos estén habilitados en ese instante. Esto evita que un operador identifique erróneamente el bot que está gestionando si un módulo se desactiva temporalmente.

![Una superficie de control más clara para la creación de mercado: ADAMANT WebUI Escenario A-3](/images/engineering-notes/medium/867a0d568e69/002-57c6753fc6.webp)

La acción de inicio (Start) se ha hecho intencionalmente menos prescriptiva. Iniciar la creación de mercado ya no envía una anulación de estrategia; el bot mantiene la política actual ya configurada en sí mismo. Esto evita que un clic en la interfaz de usuario cambie silenciosamente el modelo operativo de una estrategia en vivo. A nivel de mercado, los operadores pueden ver una vela en formación en el gráfico OHLC, marcadores de órdenes del bot en el libro de órdenes y operaciones recientes, superposiciones de órdenes abiertas, contexto de spread, saldos y la superficie de entrada de órdenes. Cancelar una orden envía una solicitud precisa { id, market, side }; una orden que ya ha desaparecido se maneja como un resultado exitoso en lugar de un falso error alarmante. Esto distingue una excepción operativa real de la carrera normal entre un clic humano y una orden ya completada o cancelada.

El Escenario A-3 conecta la ruta de seguridad con la WebUI. Cuando el bot detiene automáticamente la creación de mercado o pausa una escalera (ladder) por seguridad, el navegador muestra el texto de notificación del bot en un cuadro de diálogo y refleja el estado de emergencia en los Parámetros. Los eventos de seguridad aparecen en el tablero de Eventos con insignias visibles; una escalera suspendida puede reanudarse desde la fila de eventos correspondiente. El tablero de Eventos también registra los cambios de parámetros desde la WebUI frente a las fuentes del lado del bot, muestra el estado de creación de mercado y puede mostrar instantáneas de saldo y deltas en el momento de una acción. Esto crea una pista de auditoría coherente para la investigación de incidentes.

![Una superficie de control más clara para la creación de mercado: ADAMANT WebUI Escenario A-3](/images/engineering-notes/medium/867a0d568e69/003-e5260f854d.webp)

La pantalla de Parámetros ahora incluye una franja de situación en vivo de 12 horas en la zona horaria del operador. Resume el valor del inventario y el valor nominal de las órdenes abiertas por propósito, dando al operador una idea compacta de cómo evolucionaron la exposición y la colocación de liquidez. El historial de salud se muestra en marcos horarios: una hora degradada se marca en amarillo, mientras que una hora con la creación de mercado detenida aparece en gris. Después de una operación de inicio, el modelo de calidad incluye un período de gracia de 10 minutos para que un bot recién iniciado no sea juzgado inmediatamente con datos que no ha tenido tiempo de producir. La visibilidad debe expresar la incertidumbre con honestidad; "en funcionamiento", "degradado" y "detenido" son más útiles que un panel permanentemente verde.

![Una superficie de control más clara para la creación de mercado: ADAMANT WebUI Escenario A-3](/images/engineering-notes/medium/867a0d568e69/004-4f86597efd.webp)

La nueva vista de Configuración, solo para administradores, mantiene el contexto operativo unido: el tiempo de ejecución (Runtime), el par y un árbol en vivo de valores tradeParams_*.js se sitúan uno al lado del otro, seguidos por un resumen estructurado de config.json y una vista JSON sin formato. La instantánea de configuración está saneada; los campos de socket dicen *Not included* cuando el bot no los reporta, y un exchange que omite los valores mínimos de operación se representa como *Not provided*, en lugar de un cero engañoso.

![Una superficie de control más clara para la creación de mercado: ADAMANT WebUI Escenario A-3](/images/engineering-notes/medium/867a0d568e69/005-913c132505.webp)

Ejecutar más de un bot introduce fricción cuando el cambio de pestañas borra la posición del operador. El Escenario A-3 añade un shell de flota y un registro más claros. Cada bot obtiene una etiqueta (Label) y una cuenta editables, con valores predeterminados útiles derivados del ID del bot y la configuración. El transporte, la versión, la rama y el saldo del par son visibles a nivel de flota. Las filas desconectadas o desconocidas aparecen atenuadas, mientras que los bots conectados que simplemente están detenidos permanecen legibles. Detrás de la interfaz, los paneles de keep-alive preservan el desplazamiento vertical y el estado dentro de la página al cambiar de bot o de sección. Los paneles ocultos leen una instantánea congelada de Redux en lugar de colapsar a un estado vacío, lo que permite a los operadores comparar un mercado, inspeccionar la configuración y regresar sin perder el hilo.

La WebUI sigue siendo una implementación privada autohospedada. Utiliza DirectHttpTransport para comunicarse con la superficie /api/v1 del bot; el navegador y el backend de la WebUI no se conectan a los exchanges, y las claves API de los exchanges no pertenecen a la WebUI. La autenticación de doble factor (2FA) obligatoria para el operador admite verificación por correo electrónico, ADAMANT o billetera Ethereum. El stack utiliza Vite, React 18, Chakra UI, un BFF Fastify y un registro de eventos SQLite. La función es aditiva, con respaldo a la ruta /health existente para bots más antiguos que aún no exponen /status. Se necesita una compilación moderna del bot para el comportamiento de inicio sin estrategia.

El Escenario A, el MVP privado autohospedado, tiene todas las funciones para su alcance establecido. El siguiente modelo de implementación, el Escenario B, permanece separado: un relé de salida, WebUI de suscripción pública, alcance de token de licencia y datos de mercado push no están incluidos en esta versión. La WebUI sigue consultando APIs REST para obtener datos de mercado. Esta separación hace que el flujo de trabajo del operador privado existente sea más claro y auditable antes de expandir el modelo de confianza. Para los equipos que ejecutan un bot de creación de mercado de tokens, el resultado es una respuesta más tranquila a una necesidad operativa básica: una pantalla que conecta el estado en vivo, los controles, el historial, la configuración y el contexto de seguridad, manteniendo el límite del exchange dentro del bot.
