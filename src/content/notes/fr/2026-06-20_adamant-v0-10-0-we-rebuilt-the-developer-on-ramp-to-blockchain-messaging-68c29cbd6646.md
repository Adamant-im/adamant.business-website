---
title: "ADAMANT v0.10.0 : Une nouvelle rampe d'accès pour les développeurs vers la messagerie blockchain"
slug: "adamant-v0-10-0-we-rebuilt-the-developer-on-ramp-to-blockchain-messaging-68c29cbd6646"
description: "Avec ADAMANT Node v0.10.0, l'expérience développeur est repensée : nouvelle spécification API, documentation, réseau local, testnet redémarré."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/adamant-v0-10-0-we-rebuilt-the-developer-on-ramp-to-blockchain-messaging-68c29cbd6646"
publishedAt: "2026-06-20T16:19:49.523Z"
author: "massivedev0 (Theo Bitner)"
authorUrl: "https://medium.com/@vr.dev0"
sourceAccount: "massive"
coverImage: "/images/engineering-notes/medium/68c29cbd6646/001-1-ujeffbtelp0ew-8wechc8g-png.webp"
cardSpan: "full"
originalId: "medium:68c29cbd6646"
locale: "fr"
placeholder: false
---

La messagerie décentralisée n’a d’intérêt que si les développeurs peuvent effectivement en tirer parti. Aux côtés d’ADAMANT Node **v0.10.0**, l’ensemble de l’expérience développeur a été repensé : une nouvelle spécification d’API, une documentation réécrite, un réseau local que vous pouvez déployer en quelques minutes, et un testnet fraîchement redémarré. L’objectif est de rendre l’intégration à l’écosystème de messagerie sur blockchain ADAMANT rapide, prévisible et agréable — que vous développiez un portefeuille, un bot, un service de notification ou quelque chose de totalement nouveau.

### Une spécification d’API moderne et interactive

Le contrat d’API est désormais une spécification **OpenAPI 3.2** propre, publiée sous forme d’interface Swagger UI interactive à l’adresse [schema.adamant.im](https://schema.adamant.im/). Le schéma a été vérifié de bout en bout par rapport au nœud en production, donc ce que vous lisez correspond exactement à ce que le réseau renvoie réellement — comptes, transactions, discussions, délégués, blocs, stockage clé-valeur et points de terminaison du nœud, le tout réuni dans une référence exploitable.

Les développeurs peuvent tester des requêtes directement depuis le navigateur. La spécification inclut une sélection dynamique de serveur : l’interface interroge chaque nœud public, affiche sa version d’API actuelle et sélectionne automatiquement un nœud mainnet sain, de sorte que les appels « essayez par vous-même » fonctionnent immédiatement. Vous pouvez rechercher parmi toutes les opérations selon le chemin, la méthode, le nom ou le résumé, et comme la source de vérité est un véritable document OpenAPI, vous pouvez en générer des clients typés (par exemple en TypeScript). Le client [adamant-api-jsclient](https://github.com/Adamant-im/adamant-api-jsclient) d’ADAMANT lui-même utilise précisément cette méthode.

### Des informations plus profondes sur le nœud

Plusieurs ajouts dans la version v0.10.0 sont de petits champs aux retombées ergonomiques importantes. Les transactions incluent désormais un champ `timestampMs` fournissant des horodatages précis à la milliseconde, en complément du `timestamp` existant au niveau de la seconde. Pour un messager où l’ordre des messages est crucial, cela permet aux clients de trier les messages et transferts avec une précision inférieure à la seconde. Les clients doivent privilégier ce champ lorsqu’il est présent, et sinon revenir à `timestamp * 1000`.

La réponse du statut du nœud expose désormais `nodeTimestampMs`, `unixTimestampMs`, ainsi qu’un objet `loader` indiquant la progression de la synchronisation (`syncing`, `consensus`, `blocks`, `blocksCount`), permettant aux opérateurs et aux outils de comprendre instantanément la santé et l’état de synchronisation d’un nœud. Un nouvel endpoint `GET /peers/get` permet de rechercher un pair spécifique par son IP et son port, utile pour créer des outils de surveillance du réseau et de diagnostic de connectivité. Les requêtes de discussion et de transaction sont plus claires grâce aux nouveaux paramètres `returnUnconfirmed` et `includeDirectTransfers`, qui donnent aux clients un contrôle précis sur les données retournées. Ces ajouts sont compatibles avec les versions antérieures : les intégrations existantes continuent de fonctionner, tandis que les nouvelles bénéficient de fonctionnalités supplémentaires.

### Une documentation à partir de laquelle on peut réellement développer

L’API ne représente qu’une moitié du travail. La documentation disponible à l’adresse [docs.adamant.im](https://docs.adamant.im/) a été réécrite et étendue, avec des versions associées à chaque publication du nœud afin que guides et réseau ne divergent jamais. Les nouveaux contenus et les sections élargies couvrent le consensus et la validation des transactions — comment les blocs sont validés et ce qui rend une transaction valide — ainsi que la synchronisation et les endpoints loader/status, afin que vous compreniez exactement ce qu’un nœud fait pendant sa mise à jour. Des guides d’installation (y compris pour macOS), de configuration, de démarrage automatique, de bootstrapping et de récupération de nœud sont disponibles pour exécuter votre propre nœud, ainsi qu’une documentation complète des sémantiques de `timestampMs` pour gérer correctement le temps dès le premier jour.

### Déployez un réseau en quelques minutes : localnet + testnet

Vous pouvez désormais installer un réseau ADAMANT complet sur votre propre machine grâce à **localnet**. Développez et testez sur une blockchain réelle sans toucher à l’infrastructure publique, sans attendre les confirmations d’un réseau occupé, et sans dépenser de vrais ADM. Itérez rapidement, réinitialisez librement. Lorsque vous êtes prêt à aller au-delà de votre ordinateur portable, le **testnet** public a été fraîchement redémarré et aligné avec la version v0.10.0 — un environnement partagé et sécurisé pour valider vos intégrations dans des conditions réelles avant de passer en production. Le passage local → testnet → mainnet est désormais un parcours fluide et bien documenté, et non une rupture.

### Ce que vous pouvez construire

Avec une API typée, des réseaux exécutables et une documentation réelle, de nombreux scénarios pratiques deviennent accessibles rapidement. ADAMANT est un messager entièrement décentralisé, chiffré de bout en bout, fonctionnant sur sa propre blockchain, ce qui permet aux portefeuilles et messagers d’envoyer des messages chiffrés et des valeurs dans un même protocole. Les services de notification et d’alerte peuvent transmettre des événements on-chain (paiements, messages) vers vos propres applications. Les intégrations d’échanges et de trading bénéficient d’une gestion programmable des comptes, soldes et transferts, avec un ordre précis à la milliseconde. Les bots et automatisations — bots de discussion, bots de paiement, bots de surveillance — utilisent tous cette API, et l’écosystème ADAMANT inclut déjà des trade bots et bien d’autres. La messagerie machine-à-machine et IoT gagne un canal résistant à la censure et anonyme, permettant aux appareils de coordonner leurs actions et de se payer entre eux, tandis que la communication anonyme et sans serveur devient possible là où aucun serveur central n’existe pour être saisi, fuité ou arrêté.

Puisque messages et paiements partagent un même protocole, de nombreuses combinaisons deviennent possibles : un portefeuille qui discute, un bot qui paie, un appareil qui envoie des messages et règle des transactions — le tout sur la même infrastructure.

### Références

- **Référence API :** [schema.adamant.im](https://schema.adamant.im/)
- **Documentation :** [docs.adamant.im](https://docs.adamant.im/)
- **Code source du nœud :** [github.com/Adamant-im/adamant](https://github.com/Adamant-im/adamant)
- **Client JS :** [github.com/Adamant-im/adamant-api-jsclient](https://github.com/Adamant-im/adamant-api-jsclient)
