---
title: Carteras, nodos e infraestructura
description: Despliegue de nodos, exploradores, APIs, monitorización, carteras y mantenimiento a largo plazo para sistemas cripto en producción.
cta: Quiero infraestructura cripto
layoutStyle: timeline
proofLinks:
  - label: ipfs-node
    url: https://github.com/Adamant-im/ipfs-node
  - label: currencyinfo
    url: https://github.com/Adamant-im/currencyinfo
---

La infraestructura cripto falla de forma distinta a la infraestructura web ordinaria: un nodo detenido significa depósitos perdidos, una mala actualización puede separarle de la red, y «restauraremos desde backup» tiene consecuencias cuando hay dinero de por medio. Operamos esta clase de sistemas para nuestro propio ecosistema — así es como suele desarrollarse un proyecto de infraestructura.

## Fase 0 — Evaluación

Empezamos leyendo lo que tiene: cadenas, carteras, versiones de nodos, hosting, estrategia de backup y el fallo que más le preocupa. Recibe una evaluación escrita breve con riesgos concretos y una arquitectura objetivo propuesta — útil incluso si el proyecto termina ahí.

## Fase 1 — Despliegue

Nodos, exploradores, indexadores, backends de carteras y APIs desplegados en sus servidores o hosts dedicados que usted controla. Todo es reproducible: configuración en un repositorio, bootstrap documentado, sin servidores únicos que solo un contratista entienda.

## Fase 2 — Observabilidad

Antes de dar algo por terminado, se reporta a sí mismo: retraso de altura de bloque, recuento de peers, margen de disco, latencia de API, umbrales de saldo de cartera. Las alertas van a los canales de su equipo — Telegram, ADAMANT, correo — con runbooks para los casos habituales.

## Fase 3 — Operaciones

Actualizaciones de cadena y hard forks aplicados según calendario, dependencias parcheadas, capacidad revisada. Ofrecemos contratos de mantenimiento continuo, o entregamos limpiamente a su equipo con documentación y formación — autoalojado significa que nunca queda bloqueado.

## Construido con piezas que operamos nosotros

[ipfs-node](https://github.com/Adamant-im/ipfs-node) es nuestro nodo de almacenamiento distribuido, usado donde los archivos no pertenecen a una blockchain. [currencyinfo](https://github.com/Adamant-im/currencyinfo) es un servicio autoalojado de tipos de cambio cripto y fiat — el tipo de dependencia aburrida y crítica en la que los sistemas de producción confían en silencio. Ambos son open source y ambos corren hoy en nuestra propia infraestructura.

## El estándar que mantenemos

Mantenemos lo que construimos. Eso importa cuando sus nodos, carteras y APIs deben permanecer en línea durante años — no solo lucir bien en una presentación.
