---
title: "Algorithme de contrôle de santé pour les nœuds et services ADAMANT"
slug: "discussion-17-health-check-algorithm-general-description-8923107"
description: "L'algorithme de contrôle de santé vise à faire d'ADAMANT le portefeuille crypto le plus fiable. Il s'applique à tous les nœuds, y compris ADM et les nœuds de cryptomonnaies, ainsi qu'aux services comme le service d'information et IPFS."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/17"
publishedAt: "2025-09-20T15:11:05Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:8923107"
locale: "fr"
placeholder: false
---

L'algorithme de contrôle de santé vise à faire d'ADAMANT le portefeuille crypto le plus fiable. Il s'applique à tous les nœuds, y compris les nœuds ADM et les nœuds de cryptomonnaies, ainsi qu'aux services comme `info-service` et IPFS. L'algorithme évalue la hauteur du nœud, la version minimale prise en charge, et utilise le point de terminaison le plus informatif disponible, comme `/api/node/status` pour ADM. Il ignore les nœuds désactivés par l'utilisateur et stocke la liste des nœuds localement, indépendamment du paramètre « Rester connecté ».

Les statuts des nœuds incluent Désactivé par l'utilisateur, Non pris en charge (en raison de la version ou d'un nœud HTTP via PWA-HTTPS), et Indisponible. Si un nœud est indisponible, l'algorithme vérifie d'abord le domaine, puis un `alt_ip` si le domaine échoue. Une fois le domaine disponible, `alt_ip` n'est plus jamais vérifié afin d'éviter des requêtes supplémentaires. Si les deux sont indisponibles, l'algorithme effectue une nouvelle tentative lors de la prochaine requête.

La détection des nœuds disponibles et synchronisés repose sur des seuils de hauteur de nœud (`HEIGHT_EPSILON`). Le seul nœud qui répond est marqué comme Disponible. Un groupe de nœuds situés dans le seuil est considéré comme Actif, tandis que les nœuds en dehors du seuil sont en synchronisation (ou « tricheurs »). Les seuils varient selon la cryptomonnaie : ADM est 10, BTC est 2, ETH est 5, DOGE est 3, DASH est 3, et LSK est 5. Par exemple, les nœuds BTC à 815 000 et 815 001 sont tous deux actifs, mais un nœud à 815 010 serait en synchronisation.

Pendant le contrôle de santé initial ou après une coupure de connexion, la première réponse d'un nœud peut être marquée comme Active au lieu de En synchronisation. Attendre une vérification complète de 10 secondes figerait l'application. Pour résoudre cela, les statuts sont mis à jour en Actif ou En synchronisation uniquement après que 30 % des nœuds ont répondu ; sinon, les statuts précédents sont conservés. Cela est indiqué comme un contrôle initial. Pour les contrôles suivants, les statuts ne sont mis à jour qu'après que 100 % des nœuds ont répondu, afin d'éviter que des nœuds en attente avec d'anciennes données soient marqués par erreur comme En synchronisation.

Pour éviter de confondre les utilisateurs, un statut visuel « Mise à jour… » est affiché pendant un contrôle initial en cours pour les nœuds ayant un statut Indéfini ou Indisponible. Il apparaît sous forme d'un point gris avec un texte atténué.

![Discussion screenshot 1](/images/engineering-notes/github/discussions/8923107/001-bfb8d9fa.webp)

Chaque requête de contrôle de santé mesure le Ping, et le nœud avec le ping le plus faible est le plus rapide. Le paramètre « Préférer le nœud le plus rapide » est défini par défaut sur Non pour ADM et sur Oui pour les nœuds de cryptomonnaies, fonctionnant séparément pour les nœuds de cryptomonnaies et les indexeurs.

Les contrôles de santé s'exécutent indépendamment du statut de connexion Internet, car le statut « Pas de connexion Internet » signalé par le système d'exploitation n'est pas fiable. S'il n'y a pas de connexion, le résultat sera simplement l'absence de nœuds disponibles. Les états `hasEnabledNodes` et `hasAvailableNodes` sont mis à jour lorsqu'au moins trois nœuds répondent ou lorsqu'un contrôle est terminé, améliorant ainsi l'expérience utilisateur au démarrage en évitant des blocages de 10 secondes. Les contrôles superposés sont évités ; un bogue utilisant `setInterval()` au lieu de `setTimeout()` provoquait précédemment une tempête de requêtes lors de la restauration de l'application depuis l'arrière-plan.

Les contrôles de santé sont déclenchés au démarrage de l'application, lors de la restauration de la connexion, lorsqu'un écran de nœud est ouvert, ou lorsque les listes de nœuds sont mises à jour. Les intervalles réguliers (`normalUpdateInterval`) varient selon le type de nœud, allant de 3 à 8 minutes. Si tous les nœuds actifs échouent, un contrôle de santé supplémentaire est effectué.

Lors de l'envoi de requêtes HTTP, l'algorithme ignore le statut « Pas de connexion Internet » et n'attend pas la fin d'un contrôle de santé complet. Il choisit le nœud le plus rapide ou un nœud actif aléatoire. Si une requête échoue en raison d'un timeout, il essaie le nœud suivant et marque celui ayant échoué comme Indisponible. Les erreurs HTTP comme 404 ne sont pas considérées comme des échecs. Les requêtes en attente sont toujours complétées après la restauration de la connexion, garantissant que des opérations comme l'enregistrement d'une liste de contacts ne soient pas interrompues.
