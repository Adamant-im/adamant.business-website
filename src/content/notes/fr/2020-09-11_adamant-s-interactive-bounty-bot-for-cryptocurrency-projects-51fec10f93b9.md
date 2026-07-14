---
title: "ADAMANT Bounty Bot : campagnes interactives avec paiements automatisés en crypto"
slug: "adamant-s-interactive-bounty-bot-for-cryptocurrency-projects-51fec10f93b9"
description: "Le ADAMANT Bounty Bot est un outil open source conçu pour que les projets cryptos gèrent des campagnes de bounties et des airdrops de manière interactive via le chat d'ADAMANT Messenger."
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
locale: "fr"
placeholder: false
---

Le ADAMANT Bounty Bot est un outil open source conçu pour que les projets de cryptomonnaies lancent des campagnes de bounties et des airdrops de manière interactive via le chat d’ADAMANT Messenger. Il automatise la vérification des tâches et les paiements, éliminant ainsi le besoin d’un gestionnaire dédié et supprimant les retards dans les paiements aux participants.

### Pourquoi un bot de bounties dédié

Les campagnes de bounties traditionnelles reposent sur des gestionnaires qui publient les conditions sur des forums comme Bitcointalk et vérifient manuellement la conformité des participants à la fin de la campagne. Cette approche est peu pratique pour les utilisateurs et coûteuse pour les propriétaires de projets. Le ADAMANT Bounty Bot simplifie le processus : les participants interagissent directement avec le bot dans le chat, le bot vérifie automatiquement l’accomplissement des tâches, et les récompenses sont versées immédiatement en ADM, ETH ou jetons ERC-20.

Actuellement, le bot prend en charge les campagnes Twitter (suivre des comptes, retweeter avec commentaires, mentionner des amis et utiliser des hashtags), ainsi que les campagnes de parrainage ADAMANT où les utilisateurs invitent d’autres personnes à rejoindre. Le support d’autres réseaux sociaux peut être ajouté par des contributeurs, puisque le bot est open source.

### Fonctionnement

Le bot s’exécute en continu sur un serveur. Après l’installation, vous configurez les paramètres de la campagne, comme les comptes Twitter que les participants doivent suivre, le tweet à retweeter, et le contenu requis dans le commentaire du retweet. Le bot suit les messages des utilisateurs, vérifie l’accomplissement des tâches, verse les récompenses et accumule des statistiques. Il détecte également les comptes de médias sociaux en double afin d’empêcher un utilisateur unique de percevoir deux fois une récompense.

### Prérequis

L’exécution du bot nécessite des compétences de base en Linux et Node.js. Les exigences serveur sont minimes — n’importe quel VPS sous Ubuntu convient (par exemple, Digital Ocean, Ramnode, Scaleway, Hetzner). Installer un nœud ADAMANT complet est facultatif, mais recommandé sur les machines disposant de plus de 40 Go de disque et de 1 Go de RAM, afin de soutenir la décentralisation. Vous aurez également besoin d’un portefeuille ADAMANT pour le bot, de portefeuilles cryptos approvisionnés pour les paiements (notez que les frais de transfert ERC-20 sont payés en ETH, donc le portefeuille ETH du bot doit également être approvisionné), des clés API Twitter si vous lancez des campagnes Twitter, et de MongoDB installé sur le serveur.

### Commandes

Le bot répond à plusieurs commandes utilisateur et administrateur. Les utilisateurs peuvent envoyer `/help` pour obtenir des informations sur la campagne, `/rates` pour connaître les cours des jetons, et `/calc` pour convertir entre différentes valeurs de cryptomonnaies. Les administrateurs peuvent utiliser `/balances` pour vérifier les soldes des portefeuilles du bot et `/test` pour exécuter des diagnostics comme `/test twitterapi`.

### Installation

Le bot doit être installé sous l’utilisateur `adamant`. Si vous avez déjà installé un nœud ADAMANT, cet utilisateur existe déjà. Clonez le dépôt et installez les dépendances :

```bash
su - adamant
git clone https://github.com/Adamant-im/adamant-bountybot.git
cd ./adamant-bountybot
npm i
```

### Configuration

Ouvrez `config.json` dans un éditeur de texte. Les principaux paramètres à définir sont décrits ci-dessous.

**`passPhrase`** — la phrase de récupération (seed phrase) du compte ADM du bot. Créez toujours un nouveau compte pour le bot, plutôt que de réutiliser un compte existant.

```json
"passPhrase": "scatter tomato doctor also stay tell success pause gift clip hungry october",
```

**`twitter_follow`** — les comptes Twitter que les participants doivent suivre pour gagner des récompenses. Définissez un tableau vide pour désactiver.

```json
"twitter_follow": [
  "@adamant_im",
  "@BitZ_Group"
],
```

**`twitter_retweet_w_comment`** — définit le tweet à retweeter avec un commentaire. `min_mentions` indique combien d’amis doivent être mentionnés ; `hashtags` précise les hashtags requis. Définissez un tableau vide pour désactiver.

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

**`adamant_campaign`** — définit le nombre d’utilisateurs nouveaux qu’un participant doit inviter sur ADAMANT (`min_contacts`). Un utilisateur parrainé est comptabilisé si son premier message n’est pas antérieur à trois jours et est envoyé à un participant de la campagne. Définissez la valeur sur `0` pour désactiver.

```json
"adamant_campaign": {
  "min_contacts": 3
},
```

**`rewards`** — spécifie les montants et devises de paiement pour chaque utilisateur ayant accompli toutes les tâches.

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

**`twitter_api`** — vos identifiants API Twitter provenant du portail développeur Twitter. Laissez vide si vous ne lancez pas de campagne Twitter.

```json
"twitter_api": {
  "consumer_key": "jsoQSRzVYWTUE88t",
  "consumer_secret": "6l7w0vqHCEIkmjbdR8ubTxzhJZRk1JUlSUonu5",
  "access_token_key": "86823450088-il17SnfGmxQCYW9bAGAnFB2aW4",
  "access_token_secret": "W0k1armrFUL8ATzJwAJ2x9yuxojKIEtRaphT"
},
```

**`admin_accounts`** — votre adresse ADM personnelle pour que le bot accepte les commandes administrateur de votre part. Elle doit être différente de l’adresse du bot lui-même.

```json
"admin_accounts": [
  "U14818108337685946763"
],
```

**`welcome_string`** et **`help_message`** — le message de bienvenue et le texte d’aide affichés aux utilisateurs. Les deux prennent en charge Markdown et peuvent faire référence à des variables de configuration (par exemple, `${config.rewards_list}`, `${config.twitter_follow_list}`).

**`adamant_notify`** et **`slack`** — canaux de notification optionnels mais recommandés. Si vous utilisez les notifications ADAMANT, spécifiez une adresse différente de `admin_accounts`.

```json
"adamant_notify": "U48110833768594688888",
"slack": "https://hooks.slack.com/services/T7YUJW/LKHHD/rDKFJZ94FOhbkn49eOfq",
```

### Exécution du bot

Utilisez le gestionnaire de processus pm2 pour démarrer le bot. Si vous avez installé un nœud ADAMANT, pm2 est déjà disponible ; sinon, installez-le avec `sudo npm install -g pm2`.

```bash
pm2 start --name bountybot app.js
```

Vérifiez les journaux si le bot ne répond pas aux messages :

```bash
pm2 logs bountybot
```

Pour garantir que le bot redémarre après un redémarrage de la machine, ajoutez une entrée cron :

```bash
crontab -e
```

Ajoutez la ligne suivante et enregistrez :

```
@reboot cd /home/adamant/adamant-bountybot && pm2 start --name bountybot app.js
```

![ADAMANT's interactive Bounty bot for cryptocurrency projects](/images/engineering-notes/medium/51fec10f93b9/002-0-turkg-jxhihlqu39.webp)
