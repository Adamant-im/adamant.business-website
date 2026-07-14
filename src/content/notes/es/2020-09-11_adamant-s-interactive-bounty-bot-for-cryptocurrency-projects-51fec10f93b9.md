---
title: "ADAMANT Bounty Bot: Campañas Interactivas con Pagos Automatizados en Criptomonedas"
slug: "adamant-s-interactive-bounty-bot-for-cryptocurrency-projects-51fec10f93b9"
description: "El ADAMANT Bounty Bot es una herramienta de código abierto para que proyectos de criptomonedas realicen campañas de recompensas y airdrops interactivamente mediante chat en ADAMANT Messenger."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamants-interactive-bounty-bot-for-cryptocurrency-projects-51fec10f93b9"
publishedAt: "2020-09-11T08:11:44.041Z"
author: "Nick Barton"
authorUrl: "https://medium.com/@adamant.messenger"
sourceAccount: "nick-barton"
coverImage: "/images/engineering-notes/medium/51fec10f93b9/001-1-gjb4fgnplpza3buymtpy6w-png.webp"
cardSpan: "full"
originalId: "medium:51fec10f93b9"
locale: "es"
placeholder: false
---

El ADAMANT Bounty Bot es una herramienta de código abierto diseñada para que proyectos de criptomonedas realicen campañas de recompensas y airdrops interactivamente mediante chat en ADAMANT Messenger. Automatiza la verificación de tareas y los pagos, eliminando la necesidad de un gestor de recompensas dedicado y evitando retrasos en los pagos a los participantes.

### Por qué un bot de recompensas dedicado

Las campañas de recompensas tradicionales dependen de gestores que publican los términos en foros como Bitcointalk y verifican manualmente el cumplimiento de los participantes al final de la campaña. Este enfoque es incómodo para los usuarios y costoso para los propietarios de proyectos. El ADAMANT Bounty Bot simplifica el proceso: los participantes interactúan directamente con el bot en el chat, el bot verifica automáticamente las tareas completadas y las recompensas se pagan inmediatamente en ADM, ETH o tokens ERC-20.

Actualmente, el bot admite campañas en Twitter (seguir cuentas, retuitear con comentarios, mencionar amigos y usar hashtags), así como campañas de referidos en ADAMANT donde los usuarios invitan a otros a unirse. Dado que el bot es de código abierto, los colaboradores pueden añadir soporte para otras redes sociales.

### Cómo funciona

El bot se ejecuta continuamente en un servidor. Después de la instalación, configuras los parámetros de la campaña, como las cuentas de Twitter que los participantes deben seguir, el tweet que deben retuitear y qué debe contener el comentario del retuit. El bot rastrea los mensajes de los usuarios, verifica el cumplimiento de las tareas, paga las recompensas y acumula estadísticas. También detecta cuentas duplicadas en redes sociales para evitar que un mismo usuario reclame la recompensa más de una vez.

### Requisitos

Ejecutar el bot requiere conocimientos básicos de Linux y Node.js. Los requisitos del servidor son mínimos: cualquier VPS con Ubuntu es suficiente (por ejemplo, Digital Ocean, Ramnode, Scaleway, Hetzner). Instalar un nodo ADAMANT completo es opcional, pero recomendado en máquinas con más de 40 GB de disco y 1 GB de RAM para apoyar la descentralización. También necesitarás una billetera ADAMANT para el bot, billeteras de criptomonedas financiadas para los pagos (ten en cuenta que las comisiones de transferencia ERC-20 se pagan en ETH, por lo que la billetera ETH del bot también debe estar cargada), claves de la API de Twitter si ejecutas campañas en Twitter, y MongoDB instalado en el servidor.

### Comandos

El bot responde a varios comandos de usuario y administrador. Los usuarios pueden enviar `/help` para obtener información sobre la campaña, `/rates` para ver los precios de mercado de los tokens y `/calc` para convertir entre valores de criptomonedas. Los administradores pueden usar `/balances` para verificar los saldos de las billeteras del bot y `/test` para ejecutar diagnósticos como `/test twitterapi`.

### Instalación

El bot debe instalarse bajo el usuario `adamant`. Si previamente instalaste un nodo ADAMANT, este usuario ya existe. Clona el repositorio e instala las dependencias:

```bash
su - adamant
git clone https://github.com/Adamant-im/adamant-bountybot.git
cd ./adamant-bountybot
npm i
```

### Configuración

Abre `config.json` en un editor de texto. Los parámetros clave que debes configurar se describen a continuación.

**`passPhrase`** — la frase semilla para la cuenta ADM del bot. Siempre crea una cuenta nueva para el bot, en lugar de reutilizar una existente.

```json
"passPhrase": "scatter tomato doctor also stay tell success pause gift clip hungry october",
```

**`twitter_follow`** — cuentas de Twitter que los participantes deben seguir para obtener recompensas. Establécelo como un array vacío para desactivarlo.

```json
"twitter_follow": [
  "@adamant_im",
  "@BitZ_Group"
],
```

**`twitter_retweet_w_comment`** — define el tweet que debe retuitearse con un comentario. `min_mentions` establece cuántos amigos deben mencionarse; `hashtags` especifica los hashtags requeridos. Establécelo como un array vacío para desactivarlo.

```json
"twitter_retweet_w_comment": [
  {
    "tweet": "https://twitter.com/adamant_im/status/1272945640574722048",
    "min_mentions": 3,
    "hashtags": [
      "#privacy",
      "#decentralization"
    ]
  }
],
```

**`adamant_campaign`** — establece el número mínimo de usuarios nuevos que un participante debe invitar a ADAMANT (`min_contacts`). Un usuario referido cuenta si su primer mensaje no tiene más de tres días y se envía a un participante de la campaña. Establécelo en `0` para desactivarlo.

```json
"adamant_campaign": {
  "min_contacts": 3
},
```

**`rewards`** — especifica las cantidades y monedas de pago para cada usuario que complete todas las tareas.

```json
"rewards": [
  {
    "currency": "ADM",
    "amount": 100
  },
  {
    "currency": "ETH",
    "amount": 0.01
  }
],
```

**`twitter_api`** — tus credenciales de la API de Twitter desde el portal para desarrolladores de Twitter. Déjalo en blanco si no ejecutas una campaña en Twitter.

```json
"twitter_api": {
  "consumer_key": "jsoQSRzVYWTUE88t",
  "consumer_secret": "6l7w0vqHCEIkmjbdR8ubTxzhJZRk1JUlSUonu5",
  "access_token_key": "86823450088-il17SnfGmxQCYW9bAGAnFB2aW4",
  "access_token_secret": "W0k1armrFUL8ATzJwAJ2x9yuxojKIEtRaphT"
},
```

**`admin_accounts`** — tu dirección ADM personal para que el bot acepte comandos de administrador de ti. Esta debe ser diferente de la dirección del propio bot.

```json
"admin_accounts": [
  "U14818108337685946763"
],
```

**`welcome_string`** y **`help_message`** — el mensaje de bienvenida y el texto de ayuda que se muestran a los usuarios. Ambos admiten Markdown y pueden hacer referencia a variables de configuración (por ejemplo, `${config.rewards_list}`, `${config.twitter_follow_list}`).

**`adamant_notify`** y **`slack`** — canales de notificación opcionales pero recomendados. Si usas notificaciones ADAMANT, especifica una dirección diferente de `admin_accounts`.

```json
"adamant_notify": "U48110833768594688888",
"slack": "https://hooks.slack.com/services/T7YUJW/LKHHD/rDKFJZ94FOhbkn49eOfq",
```

### Ejecutar el bot

Usa el gestor de procesos pm2 para iniciar el bot. Si instalaste un nodo ADAMANT, pm2 ya está disponible; de lo contrario, instálalo con `sudo npm install -g pm2`.

```bash
pm2 start --name bountybot app.js
```

Revisa los registros si el bot no responde a los mensajes:

```bash
pm2 logs bountybot
```

Para asegurarte de que el bot se reinicie tras un reinicio del sistema, añade una entrada en cron:

```bash
crontab -e
```

Añade la siguiente línea y guarda:

```
@reboot cd /home/adamant/adamant-bountybot && pm2 start --name bountybot app.js
```

![ADAMANT's interactive Bounty bot for cryptocurrency projects](/images/engineering-notes/medium/51fec10f93b9/002-0-turkg-jxhihlqu39.webp)
