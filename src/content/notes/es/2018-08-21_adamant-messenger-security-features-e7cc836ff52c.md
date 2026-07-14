---
title: "Características de seguridad de ADAMANT Messenger"
slug: "adamant-messenger-security-features-e7cc836ff52c"
description: "ADAMANT es un mensajero privado que opera completamente en una blockchain. Almacenando cada mensaje como una transacción en cadena, resuelve fallos de seguridad típicos de mensajeros centralizados y punto a punto."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-security-features-e7cc836ff52c"
publishedAt: "2018-08-21T13:14:09.919Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/e7cc836ff52c/001-0-ed-frrpe89f-d93u.webp"
cardSpan: "full"
originalId: "medium:e7cc836ff52c"
locale: "es"
placeholder: false
---

ADAMANT es un mensajero privado que opera completamente en una blockchain. Al almacenar cada mensaje como una transacción en cadena, aborda las vulnerabilidades de seguridad típicas tanto de los mensajeros punto a punto como de los centralizados, ofreciendo un modelo de confianza diferente para las comunicaciones privadas.

## Cifrado y firma

Cada mensaje es una transacción en la blockchain, cifrada y firmada utilizando Ed25519 EdDSA, Curve25519, Salsa20 y Poly1305. Los mensajes se cifran en el dispositivo del remitente y se descifran en el dispositivo del destinatario. La aplicación cliente nunca transmite la clave privada o la frase mnemónica del usuario a través de la red; todas las operaciones criptográficas se realizan localmente.

Dado que cada cuenta se identifica por su clave pública en la cadena, la autenticidad del remitente y del destinatario es verificable. Los ataques de tipo man-in-the-middle son detectables: si un atacante intercepta y retransmite mensajes, el identificador del remitente no coincidirá con la clave pública esperada, revelando así la interceptación.

## La blockchain como almacenamiento de mensajes

La blockchain actúa como una capa de almacenamiento redundante y confiable para el historial de mensajes. Los mensajes no pueden ser fechados en el pasado ni alterados después de su confirmación, y la entrega está tanto firmada como confirmada por la red. El historial de mensajes nunca se almacena en la máquina local del usuario; se carga directamente desde la blockchain bajo demanda. Esto significa también que un usuario puede acceder a su historial completo de mensajes desde cualquier dispositivo, de forma similar a un modelo de almacenamiento centralizado, pero sin una autoridad central que controle los datos.

## Arquitectura descentralizada

ADAMANT funciona sobre una red descentralizada de nodos blockchain operados por usuarios. Ninguna autoridad central puede desactivar, pausar o bloquear el servicio. Las cuentas no pueden ser cerradas ni limitadas por nadie, incluidos los desarrolladores del proyecto. Los desarrolladores no controlan las acciones de los usuarios en la red.

## Privacidad y anonimato

A diferencia de los mensajeros P2P, donde la dirección IP de un par puede ser visible, todas las comunicaciones de ADAMANT se enrutan a través de nodos blockchain, lo que hace imposible obtener directamente la dirección IP de un usuario. Conceptualmente, esto es similar a enrutar el tráfico a través de una red Tor.

El mensajero no solicita acceso a la libreta de direcciones, ubicación u otros datos del dispositivo del usuario. No se requiere ningún número de teléfono para la creación de cuentas ni para la recuperación del acceso, eliminando así la interceptación por SMS como vector de ataque. Las cuentas pueden crearse en segundos, y los usuarios pueden cambiar tanto su UID como sus claves de cifrado cuando lo deseen. No se requiere ninguna identificación personal.

## Código abierto

ADAMANT es completamente de código abierto, lo que permite la revisión independiente de las aplicaciones cliente y del software de los nodos.

![Características de seguridad de ADAMANT Messenger](/images/engineering-notes/medium/e7cc836ff52c/002-0-qtvvnsefdgux9haq.webp)
