---
title: "Une interface de commande plus claire pour le market making : ADAMANT WebUI Scénario A-3"
slug: "a-clearer-command-surface-for-market-making-adamant-webui-scenario-a-3-867a0d568e69"
description: "L'infrastructure de market making est souvent performante mais opaque. Le Scénario A-3 de l'ADAMANT WebUI centralise l'état, les paramètres et l'historique de sécurité."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/a-clearer-command-surface-for-market-making-adamant-webui-scenario-a-3-867a0d568e69"
publishedAt: "2026-09-10T20:23:38.199Z"
author: "ADAMANT Messenger"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:867a0d568e69"
coverImage: "/images/engineering-notes/medium/867a0d568e69/001-880955b2e4.webp"
locale: "fr"
placeholder: false
---

L'infrastructure de market making est souvent techniquement performante mais opérationnellement opaque. Le statut se trouve dans une commande, les paramètres dans une autre, et la raison d'un arrêt de protection peut être enfouie dans les journaux. Le troisième incrément MVP du Scénario A, l'ADAMANT Market-Making WebUI privé et auto-hébergé, transforme le navigateur : il passe d'une collection de contrôles isolés à une surface d'exploitation plus claire pour les opérateurs qui gèrent quotidiennement la liquidité d'un jeton.

Le nouveau tableau de bord par bot est la vue d'accueil principale. Il regroupe le contexte de la paire et de l'échange, l'état du market making provenant de l'API /status du bot, un badge d'édition de fonctionnalité, un graphique de prix compact sur 15 minutes, les modules actifs et inactifs, un résumé lisible des paramètres, les soldes et les ordres ouverts regroupés par objectif. Le badge d'édition — de Basic à Full — est dérivé des capacités installées du bot, et non des modules activés à cet instant précis. Cela évite à un opérateur de mal identifier le bot qu'il gère si un module est temporairement désactivé.

![Une interface de commande plus claire pour le market making : ADAMANT WebUI Scénario A-3](/images/engineering-notes/medium/867a0d568e69/002-57c6753fc6.webp)

L'action Démarrer (Start) a été rendue intentionnellement moins directive. Le lancement du market making n'envoie plus de remplacement de stratégie ; le bot conserve la politique actuelle déjà configurée sur lui-même. Cela empêche un clic sur l'interface utilisateur de modifier silencieusement le modèle opérationnel d'une stratégie en direct. Au niveau du marché, les opérateurs peuvent voir une bougie en formation sur le graphique OHLC, des marqueurs d'ordres du bot dans le carnet d'ordres et les transactions récentes, des superpositions d'ordres ouverts, le contexte du spread, les soldes et la surface de saisie des ordres. L'annulation d'un ordre envoie une requête précise { id, market, side } ; un ordre déjà disparu est traité comme un résultat réussi plutôt que comme une fausse erreur alarmante. Cela distingue une exception opérationnelle réelle de la course normale entre un clic humain et un ordre déjà exécuté ou annulé.

Le Scénario A-3 connecte le chemin de sécurité à l'interface WebUI. Lorsque le bot arrête automatiquement le market making ou suspend une échelle (ladder) par mesure de sécurité, le navigateur affiche le texte de notification du bot dans une boîte de dialogue et reflète l'état d'urgence dans les Paramètres. Les événements de sécurité apparaissent dans le tableau des Événements avec des badges visibles ; une échelle suspendue peut être reprise depuis la ligne d'événement correspondante. Le tableau des Événements enregistre également les changements de paramètres provenant de l'interface WebUI par rapport aux sources côté bot, affiche l'état du market making, et peut afficher des instantanés de solde et des deltas au moment d'une action. Cela crée une piste d'audit cohérente pour l'enquête sur les incidents.

![Une interface de commande plus claire pour le market making : ADAMANT WebUI Scénario A-3](/images/engineering-notes/medium/867a0d568e69/003-e5260f854d.webp)

L'écran Paramètres inclut désormais une bande de situation en direct sur 12 heures dans le fuseau horaire de l'opérateur. Il résume la valeur de l'inventaire et le notionnel des ordres ouverts par objectif, donnant à l'opérateur une idée compacte de l'évolution de l'exposition et du placement de la liquidité. L'historique de santé est affiché par tranches horaires : une heure dégradée est jaune, tandis qu'une heure avec le market making arrêté est grise. Après une opération de démarrage, le modèle de qualité inclut une période de grâce de 10 minutes afin qu'un bot nouvellement démarré ne soit pas immédiatement jugé sur des données qu'il n'a pas eu le temps de produire. La visibilité doit exprimer l'incertitude honnêtement ; « en cours », « dégradé » et « arrêté » sont plus utiles qu'un tableau de bord toujours vert.

![Une interface de commande plus claire pour le market making : ADAMANT WebUI Scénario A-3](/images/engineering-notes/medium/867a0d568e69/004-4f86597efd.webp)

La nouvelle vue Config, réservée aux administrateurs, maintient le contexte opérationnel ensemble : Runtime, Paire et une arborescence en direct des valeurs tradeParams_*.js sont côte à côte, suivis d'un résumé structuré config.json et d'une vue JSON brute. L'instantané de configuration est assaini ; les champs de socket indiquent *Not included* lorsque le bot ne les rapporte pas, et un échange qui omet les valeurs minimales de transaction est représenté comme *Not provided*, plutôt que comme un zéro trompeur.

![Une interface de commande plus claire pour le market making : ADAMANT WebUI Scénario A-3](/images/engineering-notes/medium/867a0d568e69/005-913c132505.webp)

L'exécution de plusieurs bots introduit des frictions lorsque le changement d'onglet efface la position de l'opérateur. Le Scénario A-3 ajoute un shell de flotte et un registre plus clairs. Chaque bot reçoit une étiquette et un compte modifiables, avec des valeurs par défaut utiles dérivées de l'ID du bot et de sa configuration. Le transport, la version, la branche et le solde de la paire sont visibles au niveau de la flotte. Les lignes hors ligne ou inconnues sont grisées, tandis que les bots connectés qui sont simplement arrêtés restent lisibles. Derrière l'interface, des panneaux « keep-alive » préservent le défilement vertical et l'état de la page lors du basculement entre les bots et les sections. Les panneaux masqués lisent un instantané Redux figé au lieu de se réduire à un état vide, permettant aux opérateurs de comparer un marché, d'inspecter la configuration et de revenir sans perdre le fil.

L'interface WebUI reste un déploiement privé auto-hébergé. Elle utilise DirectHttpTransport pour communiquer avec la surface /api/v1 du bot ; le navigateur et le backend WebUI ne se connectent pas aux échanges, et les clés API des échanges n'ont pas leur place dans l'interface WebUI. La double authentification (2FA) obligatoire pour l'opérateur prend en charge la vérification par e-mail, ADAMANT ou portefeuille Ethereum. La pile utilise Vite, React 18, Chakra UI, un BFF Fastify et un journal d'événements SQLite. La fonctionnalité est additive, avec une solution de repli vers la route /health existante pour les anciens bots qui n'exposent pas encore /status. Une version moderne correspondante du bot est nécessaire pour le comportement de démarrage sans stratégie.

Le Scénario A, le MVP privé auto-hébergé, est complet pour le périmètre défini. Le prochain modèle de déploiement, le Scénario B, reste séparé : un relais sortant, une WebUI d'abonnement public, une portée de jeton de licence et des données de marché push ne sont pas inclus dans cette version. L'interface WebUI continue d'interroger les API REST pour les données de marché. Cette séparation rend le flux de travail existant de l'opérateur privé plus clair et plus vérifiable avant d'étendre le modèle de confiance. Pour les équipes exploitant un bot de market making de jetons, le résultat est une réponse plus sereine à un besoin opérationnel fondamental : un seul écran qui connecte l'état en direct, les contrôles, l'historique, la configuration et le contexte de sécurité, tout en gardant la frontière de l'échange à l'intérieur du bot.
