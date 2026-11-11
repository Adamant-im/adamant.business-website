---
title: "ADAMANT mm Bot v10.0 : Market making souverain et auto-hébergé pour les projets de jetons"
slug: "adamant-mm-bot-v10-0-launch-self-hosted-sovereign-market-making-for-your-token-in-5-minute-440f435ebf95"
description: "Le problème de liquidité des jetons : pour les fondateurs, une liquidité insuffisante rend un jeton inopérant. ADAMANT TradeBot v10.0 offre une solution autonome et sécurisée."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-mm-bot-v10-0-launch-self-hosted-sovereign-market-making-for-your-token-in-5-minutes-440f435ebf95"
publishedAt: "2026-11-11T07:09:05.209Z"
author: "Quantum Trader"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:440f435ebf95"
coverImage: "/images/engineering-notes/medium/440f435ebf95/001-9e1cee5966.webp"
locale: "fr"
placeholder: false
---

## Le problème de la liquidité des jetons

Pour les fondateurs de projets, l'inscription sur un échange centralisé révèle une réalité brutale : un jeton sans liquidité est virtuellement mort. Sans liquidité continue et volume d'échange visible, les projets perdent leur classement sur les agrégateurs, les bots d'arbitrage creusent les spreads et les acheteurs particuliers désertent en raison du slippage. La réponse traditionnelle consiste à engager une agence de market making, payer des honoraires mensuels de 5 000 à 30 000 $ ou plus, et confier la garde des jetons et stablecoins à des comptes tiers. Trop de projets ont vu leurs jetons de trésorerie être liquidés ou leurs market makers disparaître lors de périodes de tension sur le marché.

L'alternative est le market making souverain et auto-hébergé. Avec ADAMANT TradeBot v10.0.0, vous pouvez exécuter un market maker automatisé de qualité institutionnelle sur un VPS à 5 $/mois ou un conteneur Docker en moins de cinq minutes, sans jamais transférer la garde de vos jetons à quiconque.

## Conception non-custodiale

La philosophie fondamentale est la souveraineté financière totale. ADAMANT TradeBot fonctionne entièrement dans votre propre environnement à locataire unique. Le bot ne nécessite que des permissions d'API de lecture et de trading de base ; les permissions de retrait sont strictement désactivées et interdites. Vous n'envoyez jamais de jetons ou de stablecoins à ADAMANT, à une agence ou à un contrat intelligent. Les jetons ne quittent jamais votre compte d'échange, et tous les calculs d'ordres, spreads algorithmiques et réconciliations de soldes sont exécutés localement. Vous pouvez modifier les spreads, les objectifs de volume et les corridors de prix à la volée via l'interface ADAMANT Messenger ou l'API WebUI.

```
┌─────────────────────────────────────────────────────────────┐
│                    YOUR INFRASTRUCTURE                      │
│            ($5/mo VPS, Private Server, or Docker)           │
│                                                             │
│   ┌─────────────────────────────────────────────────────┐   │
│   │                 ADAMANT mm bot                      │   │
│   │  [ Trader ]   [ OrderBook ]  [ Liquidity ]  [ Watcher]│ │
│   └──────────────────────────┬──────────────────────────┘   │
└──────────────────────────────┼──────────────────────────────┘
                               │ API Keys
                               │ (Trade Permissions ONLY)
                               │ ❌ No Withdrawal Access
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                     CENTRALIZED EXCHANGE                    │
│     (Gate, Coinstore, XT, NonKYC, MEXC, etc.)               │
│                                                             │
│  🔒 Tokens never leave your exchange account                │
│  📊 Orders placed directly via signed REST / WebSocket      │
└─────────────────────────────────────────────────────────────┘
```

## Quatre moteurs algorithmiques

L'édition open-source est fournie avec quatre moteurs synchronisés qui gèrent ensemble chaque dimension du market making.

Le moteur **Trader** génère un volume cohérent et naturel en exécutant des transactions auto-appariées au sein du spread ou de la profondeur du carnet d'ordres, maintenant le projet actif sur des agrégateurs tels que CoinMarketCap et CoinGecko sans gaspiller de capital.

Le moteur **Order Book Builder** place, déplace et remplace continuellement des ordres d'achat et de vente étagés, produisant un carnet d'ordres dense et réaliste avec une variation de prix organique, évitant ainsi l'aspect « échelle vide » courant sur les échanges secondaires.

Le moteur **Liquidity Provider** défend le carnet d'ordres contre le slippage, calculant la distribution optimale de liquidité à partir des soldes disponibles et plaçant des ordres de profondeur dans votre pourcentage de spread défini afin que les acheteurs et vendeurs de la communauté bénéficient d'une exécution équitable.

Le moteur **Price Watcher** surveille les prix des jetons sur les marchés de référence tels que Binance, les DEX ou les principales paires de trading. Si les prix externes évoluent, il ajuste automatiquement les limites de prix locales et les corridors d'ordres pour éviter que votre liquidité ne soit drainée par de l'arbitrage prédateur entre échanges.

## Nouveautés de la version v10.0.0

La version 10.0.0 est la mise à jour architecturale la plus importante de l'histoire du projet, axée sur la fiabilité en entreprise, la sécurité et l'intégrité de la chaîne d'approvisionnement.

Le **verrouillage d'itération sécurisé pour la concurrence** résout la cause la plus fréquente des ordres en double et des états désynchronisés dans les bots à haute fréquence : les ticks d'exécution qui se chevauchent. La v10.0 introduit `helpers/moduleIteration.js`, qui implémente un verrouillage strict. Si une itération attend déjà une réponse de l'API d'échange, le tick suivant est proprement reporté plutôt qu'exécuté simultanément, et les itérations sont reprogrammées en toute sécurité à partir des blocs `finally` afin que le bot ne se bloque jamais ou ne plante pas lors de déconnexions réseau transitoires.

Le **connecteur Azbit** a été entièrement réécrit. Il utilise désormais la génération de signature native HMAC-SHA256 avec des horodatages à la microseconde, un alignement décimal précis conforme aux spécifications de lot et de tick d'Azbit, ainsi qu'une invalidation instantanée du cache des soldes avec une récupération d'erreur robuste sur les requêtes HTTP limitées.

Une **protection contre l'inactivité** prévient le scénario où le serveur hôte redémarre ou perd la connectivité alors que le marché évolue de manière significative pendant que le bot est hors ligne. Au démarrage, il vérifie les horodatages de battement de cœur ; si le temps d'arrêt dépasse votre seuil de sécurité, il déclenche le mode sécurisé pour éviter d'exécuter des ordres obsolètes.

La **rotation structurée des logs** utilise la rotation quotidienne Winston avec archivage gzip automatique, des politiques de rétention configurables et une journalisation assainie pour garantir que les secrets d'API ne fuient jamais dans les fichiers journaux.

La **sécurité de la chaîne d'approvisionnement de bout en bout** complète cette version. Les images Docker publiées sur le GitHub Container Registry incluent des attestations de provenance Sigstore, et les paquets npm sont publiés via une publication de confiance OpenID Connect avec une provenance de build complète sur npmjs.com.

## Déploiement

Le déploiement est simple, via l'interface CLI npm globale ou Docker.

Pour l'approche CLI, assurez-vous que Node.js 22+ est installé, puis exécutez les commandes d'installation, d'initialisation et de démarrage :

```
# 1. Install the bot globally
npm install -g adamant-tradebot

# 2. Initialize your configuration
mm init

# 3. Configure your exchange API keys & token pair
nano config/config.default.jsonc

# 4. Start the market maker
mm start

# 5. Check live status
mm status
```

Pour Docker, récupérez et exécutez le conteneur à provenance vérifiée :

```
docker run -d \
  --name adamant-tradebot \
  --restart unless-stopped \
  -v $(pwd)/config:/app/config \
  -v $(pwd)/logs:/app/logs \
  ghcr.io/adamant-im/adamant-tradebot:10.0.0
```
