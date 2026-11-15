---
title: "ADAMANT Messenger v4.12.1 : CSP strict, pagination déterministe de l'indexeur, interface RTL et builds vérifiables"
slug: "discussion-83-adamant-messenger-v4-12-1-strict-csp-deterministic-indexer-pagination-8-language-rtl-ui-an-11310133"
description: "ADAMANT Messenger PWA v4.12.1 est déployé depuis master (074db965) sur la base de la v4.12.0 (dfe094d3), incluant 69 commits, 12 pull requests et 14 jalons fermés."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/83"
publishedAt: "2026-11-14T17:50:00Z"
author: "dev-adamant-im"
authorUrl: "https://github.com/dev-adamant-im"
discussionCategory: "Messenger apps"
cardSpan: "half"
originalId: "github-discussion:11310133"
locale: "fr"
placeholder: false
---

La PWA ADAMANT Messenger `v4.12.1` est déployée depuis `master` (`074db965`) sur la base de la `v4.12.0` (`dfe094d3`), totalisant 69 commits, 12 pull requests fusionnées et 14 jalons fermés. Au-delà des simples améliorations d'interface, cette version se concentre sur la sécurisation du transport et de l'exécution, la pagination déterministe des nœuds et des indexeurs dans une infrastructure multi-opérateur décentralisée, une parité complète sur huit langues avec prise en charge de l'arabe (RTL), et une provenance transparente des builds pour le web, le bureau et Android.

## CSP strict, validation Web3 sans eval et en-têtes de sécurité partagés

Un contrat d'en-tête de sécurité unifié (`PWA_SECURITY_HEADERS` dans `vite-config/plugins/cspHardeningPlugin.ts`) définit désormais la source de vérité unique appliquée à tous les builds — `frame-ancestors 'none'`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: no-referrer` et `X-XSS-Protection: 0` — reflétés par les en-têtes catch-all de `vercel.json` et les fichiers de configuration nginx. L'ABI Web3 et la validation passent à Zod 4 avec `config({ jitless: true })` pour `web3-validator` et `abitype` pour `web3-eth-abi`, supprimant les points d'entrée du compilateur, tandis que le plugin de durcissement CSP renforce le bundle de production contre les alias `eval` et `Function` à l'exécution.

Le durcissement de la chaîne d'approvisionnement inclut un `.npmrc` avec une ancienneté minimale de sept jours pour les versions, un script de vérification de l'âge des dépendances, des délais de sécurité pour Dependabot, le nettoyage des builds Electron et l'exclusion des identifiants et artefacts Playwright. Des sondes de vérification de déploiement en direct (`cspDeployments.env.spec.ts`, `tests/e2e/production-csp.live.spec.ts`) valident la présence des en-têtes et l'application des scripts sur l'écran de connexion sans aucune violation CSP en production, en développement, sur GitHub Pages ou Surge.

## Seuils de nœuds, requêtes PostgREST bornées et affinité de pagination par nœud unique

La version minimale de l'API ADM passe à `0.10.0` sur le mainnet, le testnet et Tor. La version minimale du nœud IPFS est désormais lue explicitement depuis `ipfsService.minVersion` (`0.1.0`) au lieu d'utiliser le seuil général des services. Les IP de secours des nœuds déplacés sont synchronisées via le registre `adamant-wallets`.

Les transferts ADM directs en temps réel sont améliorés : le schéma remplace `withoutDirectTransfers` par des énumérations entières, les connexions WebSocket s'établissent immédiatement au déverrouillage en s'abonnant aux types de transactions de chat `[0, 8]`, et le statut des transferts reste synchronisé entre l'aperçu du chat, la liste des transactions et les composants de carte de transfert.

Les requêtes de l'indexeur ETH via `EthIndexerClient.ts` imposent désormais une `limit` sur chaque requête `/ethtxs` (25 par défaut), divisent les recherches ETH natives en deux requêtes indexées bornées, fusionnées et dédoublonnées côté client par `txhash`, et introduisent `getTimestampGroup` pour la résolution des limites de timestamps identiques. Les protections de pagination inter-chaînes pour BTC, DOGE et DASH maintiennent la pagination active sur un seul indexeur plutôt que de disperser une adresse entre plusieurs opérateurs. L'état persistant du module supprime les transactions mises en cache et réinitialise les curseurs de session de pagination lors de la sauvegarde, évitant ainsi la dérive des curseurs obsolètes.

![Seuils de version des nœuds ADM et IPFS et actions des paramètres sur mobile](/images/engineering-notes/github/discussions/11310133/001-bcf4ca3db8.webp)

*Nœuds ADM inférieurs à `0.10.0` et points de terminaison HTTP simples signalés comme non pris en charge ; nœuds IPFS vérifiés par rapport à `ipfsNode.minVersion` (`0.1.0`).*

![Chat en écran divisé sur bureau avec statut de transfert ADM synchronisé et assainissement XSS du texte brut](/images/engineering-notes/github/discussions/11310133/002-4dc1da2b89.webp)

*Espacement de l'aperçu du chat et coches de livraison synchronisés avec les transferts ADM de type 0 ; aperçus de charges utiles non assainies rendus en toute sécurité sous forme de texte inerte.*

![Liste des transactions du portefeuille ADM sur bureau](/images/engineering-notes/github/discussions/11310133/003-a42684a993.webp)

*Flux de transactions mainnet en direct associé à l'architecture de pagination par nœud unique pour ADM, ETH/ERC-20, BTC et DOGE.*

## Identité de build, repli multihash IPFS HTTP et configurations réseau isolées

Un plugin d'informations de build (`virtual:adamant-build-info`) expose les versions `version`, `branch`, `commit`, `prNumber`, `author`, `buildDate` et `isTestnet` assainies dans une boîte de dialogue, ainsi qu'une action « Forcer le rafraîchissement » du Service Worker qui vide le CacheStorage tout en préservant les identifiants utilisateur et l'état chiffré d'IndexedDB. Les builds de testnet affichent des badges `TESTNET` explicites.

Pour les contextes HTTP simples tels que les miroirs `.onion` où `crypto.subtle` n'est pas disponible, le repli des pièces jointes IPFS utilise la dérivation multihash SHA-256 de `@noble/hashes`. Les configurations réseau sont unifiées dans `src/config/mainnet.json` et exposées via un module virtuel, afin que les modes Vite non pris en charge ou les fuites de configuration inter-réseaux échouent au moment du build.

![BuildInfoDialog avec Forcer le rafraîchissement, sélecteur de 8 langues et indicateur de connexion Testnet](/images/engineering-notes/github/discussions/11310133/004-4f8da5e80c.webp)

*Boîte de dialogue de connexion avec Forcer le rafraîchissement, menu déroulant complet de 8 langues et marqueurs TESTNET distincts sur les déploiements de testnet.*

## Parité sur huit langues et prise en charge complète de l'arabe RTL

Cette version ajoute les traductions en espagnol, français, japonais et arabe, termine les audits pour l'allemand, le russe et le chinois simplifié, et aligne les huit fichiers de langue sur une parité exacte des clés (418 clés feuilles par langue). La fonction `applyLocale()` synchronise `vue-i18n`, `dayjs`, les locales Vuetify, `dir` et `lang`, ajoute des règles de pluriel précises pour l'arabe, le français et les cas russes après 100, sélectionne les chiffres `ar-u-nu-latn` pour les dates arabes et détecte la langue initiale localement à partir de `navigator.languages`.

La mise en page RTL complète pour l'arabe est activée via `rtl: { ar: true }` de Vuetify, avec des flèches de navigation inversées via un composant d'icône directionnel, des propriétés logiques CSS dans toutes les vues, et `dir="auto"` sur les messages rédigés par les utilisateurs tout en forçant le LTR pour les phrases secrètes. Des tests de régression (`RtlUiContract.spec.js`, `chat-rtl-layout-regression.spec.ts`) verrouillent la mise en page contre toute rupture future.

![Vues mobiles arabes RTL : Chats, chat actif avec transfert ADM et paramètres](/images/engineering-notes/github/discussions/11310133/005-94937d5ba6.webp)

*Liste de chat alignée à droite avec chiffres latins, carte de transfert actif dans la vue chat RTL avec icônes directionnelles inversées et hiérarchie des paramètres inversée.*

![Écrans de paramètres en espagnol, français et japonais](/images/engineering-notes/github/discussions/11310133/006-867e6e8b17.webp)

*Espagnol, français et japonais correspondant aux 418 chaînes d'interface utilisateur sur le déploiement en direct.*

## Notes sur le packaging et les plateformes

Les cibles Android sont mises à niveau vers `compileSdkVersion` et `targetSdkVersion` 36, avec `minSdkVersion` relevé à 24 (Android 7.0+), AGP 8.13.0, Gradle 8.14.3 et Cordova Android 14.0.1 (`versionCode` 41201).

Sur macOS, Apple ayant bloqué le compte développeur, la notarisation CI est actuellement désactivée. Les installateurs de bureau `.dmg` (x64, arm64, universel) restent signés avec l'identifiant développeur et peuvent être installés via Réglages Système → Confidentialité et sécurité → Ouvrir quand même après la première tentative de lancement. Le bouton iOS App Store sur adamant.im est temporairement non cliquable avec une notification correspondante.
