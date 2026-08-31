---
title: "ETH-transactions-storage : filtre d'adresse optionnel, index plus légers et API publique sécurisée"
slug: "discussion-76-eth-transactions-storage-optional-address-filter-lighter-indexes-and-a-safer-public-api-10716438"
description: "ETH-transactions-storage est un indexeur Ethereum auto-hébergé qui suit un nœud, stocke les transferts natifs et ERC-20 dans PostgreSQL et expose une API REST en lecture seule."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/76"
publishedAt: "2026-08-30T20:51:54Z"
author: "adamant-al"
authorUrl: "https://github.com/adamant-al"
discussionCategory: "Ecosystem & Integrations"
cardSpan: "half"
originalId: "github-discussion:10716438"
locale: "fr"
placeholder: false
---

[ETH-transactions-storage](https://github.com/Adamant-im/ETH-transactions-storage) est un indexeur Ethereum auto-hébergé qui suit un nœud Ethereum, stocke l'activité native ETH et ERC-20 `transfer(address,uint256)` dans PostgreSQL, et l'expose via une API REST en lecture seule grâce à PostgREST. Comme les nœuds Ethereum ne peuvent pas répondre directement aux requêtes d'historique par adresse, les portefeuilles, dapps, trésoreries et opérateurs dépendent généralement d'un explorateur tiers. Ce projet est l'alternative que vous gérez vous-même : aucun fournisseur de clé API, aucun suivi, aucune télémétrie.

La branche `dev` inclut désormais un **filtre d'adresse optionnel**, fusionné dans la [PR #29](https://github.com/Adamant-im/ETH-transactions-storage/pull/29). L'indexation complète de la chaîne reste la valeur par défaut et est celle utilisée par les portefeuilles ADAMANT. Le mode filtré s'adresse aux opérateurs qui n'ont besoin que d'un ensemble connu d'adresses et ne souhaitent pas stocker le reste de la chaîne.

## Pourquoi ce filtre existe-t-il ?

Un indexeur Ethereum public est une base de données volumineuse. Sur un jeu de données mainnet d'un an d'environ 490 millions de lignes, l'ancien index complet consommait des centaines de gigaoctets. De nombreux opérateurs n'ont pas besoin d'une telle échelle : un portefeuille ou un backend de garde ne servant que ses propres utilisateurs, une trésorerie de projet surveillant quelques adresses opérationnelles, un explorateur auto-hébergé pour un ensemble d'adresses spécifique à une application, ou un environnement de laboratoire et CI qui doit rester léger bénéficient tous d'un stockage sélectif. Le filtre préserve le contrat API existant : les clients continuent d'interroger `/ethtxs`, `/max_block` et `/aval`. Les opérateurs modifient ce qui est stocké, pas la manière dont c'est lu.

## Comportement du filtre d'adresse

Le filtre est désactivé par défaut (`ADDRESS_FILTER_ENABLED=false`). L'activer pointe `ADDRESS_FILTER_FILE` vers une liste privée (par défaut `filter/addresses.txt`, ignorée par git et non copiée dans l'image Docker). La liste accepte une adresse de 40 caractères hexadécimaux préfixée par `0x` par ligne, les lignes vides et les commentaires `#` sont ignorés, et la correspondance est insensible à la casse. Les transferts natifs correspondent à `txfrom` ou `txto`. Les appels ERC-20 `transfer(address,uint256)` pris en charge correspondent à l'expéditeur (`txfrom`), au contrat de jeton (`txto`) et au destinataire encodé ABI (`contract_to`).

La liste est rechargée avant chaque cycle de synchronisation, de sorte que les ajouts et suppressions valides prennent effet sans redémarrer l'indexeur. Les listes invalides, vides ou manquantes échouent par sécurité : l'indexation s'arrête jusqu'à ce que le fichier soit corrigé plutôt que de tout stocker silencieusement. Le RPC de réception est ignoré pour les transactions rejetées par le filtre.

Les limites existantes de l'indexeur restent inchangées : le filtre ne capture pas les transferts ETH internes, les flux ERC-20 qui ne sont pas un `transfer(address,uint256)` direct (comme `transferFrom`, les routeurs, les multisigs ou les appels par lots/agrégateurs), ni le remplissage historique automatique lorsqu'une adresse est ajoutée. Activer le filtre ne supprime pas les lignes déjà stockées. La reconstruction est une étape manuelle pour l'opérateur : arrêter l'indexeur, tronquer `ethtxs` et `sync_state` dans une seule transaction (ou revenir en arrière sur les deux jusqu'au bloc `N`), définir `START_BLOCK` et redémarrer. Tronquer uniquement `ethtxs` ne relancera pas l'analyse car le point de contrôle indique toujours que la chaîne est traitée.

## Progression de synchronisation durable

Les blocs filtrés et vides semblaient auparavant indiquer qu'« il ne s'est rien passé », de sorte que l'indexeur pouvait les analyser à nouveau. La branche `dev` conserve désormais un point de contrôle `public.sync_state` d'une seule ligne, mis à jour dans la même transaction PostgreSQL que les insertions pour ce bloc. Le point de terminaison `/max_block` renvoie toujours `{ max, version }`, où `max` est `GREATEST(MAX(ethtxs.block), sync_state.last_block)`. Le démarrage revient toujours au dernier bloc traité, désormais de manière atomique avec le point de contrôle. Le script `create_tables.sql` est idempotent : il crée `sync_state`, l'initialise à partir du bloc de transaction le plus élevé existant et accorde les droits DML à `api_user` et `app_user` lorsque ces rôles existent. Le rôle `web_anon` ne peut pas lire ou écrire directement `sync_state`.

## Index, renforcement de l'API et opérations

Le filtre d'adresse s'appuie sur d'autres travaux de la branche `dev` issus de la [PR #28](https://github.com/Adamant-im/ETH-transactions-storage/pull/28), qui ne fait pas encore l'objet d'une version GitHub (la dernière étiquette reste [v2.4.1](https://github.com/Adamant-im/ETH-transactions-storage/releases/tag/v2.4.1)). Un ensemble minimal de cinq index couvre les formes de requête d'ADAMANT Web et iOS, économisant environ 90 à 110 Go par jeu de données annuel par rapport à l'ancien ensemble de huit index. Le rôle anonyme PostgREST `web_anon` est désormais limité à `SELECT` sur `ethtxs`, `aval` et `max_block`, et `db-max-rows = 10000` plafonne la taille du résultat sérialisé afin qu'un `GET /ethtxs` illimité ne provoque pas d'erreur OOM sur l'API.

Les déploiements publics bénéficient de protections nginx : une liste autorisée de méthodes (`GET`/`HEAD`/`OPTIONS`), une exigence pour `txfrom` ou `txto` sur `/ethtxs`, et le rejet de `Prefer: count=exact` et des décalages énormes. Le flux de travail `.env` est désormais documenté avec un modèle, les secrets restent hors de Git, et Compose ne fournit plus de mot de passe de base de données codé en dur. Les diagnostics de base de données sont plus sûrs : les URI de connexion fonctionnent correctement et les mots de passe sont masqués dans les journaux. Un fichier `AGENTS.md` définit le contrat entre contributeurs et opérateurs pour le dépôt.

Les hôtes systemd existants doivent conserver leur unité actuelle pendant la mise à niveau du code et du schéma. Appliquez `create_tables.sql` avec `ON_ERROR_STOP` avant de démarrer le nouvel indexeur, et ne copiez pas le fichier `ethsync.service` du dépôt tant qu'un `.env` de production avec des valeurs équivalentes n'existe pas.

## À qui cela s'adresse-t-il ?

ADAMANT utilise cet indexeur afin que [adamant-im](https://github.com/Adamant-im/adamant-im) et [adamant-iOS](https://github.com/Adamant-im/adamant-iOS) puissent afficher l'historique Ethereum et ERC-20 sans explorateur centralisé. Le même binaire est un service open-source polyvalent pour les portefeuilles, les processeurs de paiement, les émetteurs de jetons et toute personne souhaitant un historique Ethereum indexé par adresse sous sa propre politique PostgreSQL et d'accès. Auto-hébergez-le, conservez le mode chaîne complète pour une API publique, ou activez le filtre et ne stockez que les adresses que vous servez réellement.
