---
title: "Stockage des transactions ETH v2.5.0"
slug: "release-eth-transactions-storage-v2-5-0-382952479"
description: "La version v2.5.0 transforme le projet en un indexeur de transactions Ethereum auto-hébergé et documenté, avec une API REST pour portefeuilles, explorateurs et outils comptables."
category: "release"
source: "github"
sourceUrl: "https://github.com/Adamant-im/ETH-transactions-storage/releases/tag/v2.5.0"
publishedAt: "2026-09-04T18:56:20Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
repo: "ETH-transactions-storage"
tag: "v2.5.0"
prerelease: false
cardSpan: "half"
originalId: "github-release:ETH-transactions-storage:382952479"
locale: "fr"
placeholder: false
---

La version v2.5.0 transforme le projet en un indexeur de transactions Ethereum auto-hébergé, documenté et distribuable, doté d'une API REST pour les portefeuilles, les explorateurs, les outils de comptabilité et de trésorerie, les services de surveillance et les applications personnalisées. Il conserve le contrat d'API PostgREST existant, utilisé en production par les clients ADAMANT.

Cette version ajoute des transactions et des points de contrôle fiables par bloc, une récupération au démarrage, un comportement de restauration et de nouvelle tentative de base de données, ainsi qu'une progression à travers les blocs vides ou filtrés. L'indexation optionnelle basée sur les adresses est désormais disponible avec validation, correspondance des expéditeurs, des destinataires natifs et des destinataires de jetons, rechargement de liste en direct et comportement de fermeture en cas d'échec (fail-closed). L'ensemble d'index de base de données recommandé est réduit à cinq index, les trois index précédents restant disponibles séparément pour des formes de requêtes personnalisées ; cet ensemble réduit permet d'économiser environ 90 à 110 Go sur près de 490 millions de lignes. Un schéma `sync_state` additif, un accès `web_anon` en lecture seule, une limite de 10 000 lignes pour les réponses PostgREST et des conseils pour protéger les déploiements d'API publics ont été ajoutés. La prise en charge de l'URI de connexion PostgreSQL avec masquage des identifiants, le chargement `.env`, des dépendances Python contraintes, des diagnostics mis à jour et une unité systemd révisée sont inclus. Un conteneur Python 3.11, une configuration Compose avec image publiée, une substitution pour construction locale, des métadonnées OCI et une publication multi-architecture sur GHCR pilotée par les versions ont été ajoutés. Le site de documentation VitePress est disponible sur <https://eth-indexer.docs.adamant.im>, avec des outils Node reproductibles, une CI pour la documentation, un déploiement sur Pages et des conseils aux contributeurs. Le projet est repositionné pour tout consommateur compatible tout en préservant la propriété, la provenance et les preuves de compatibilité de production d'ADAMANT.

## Exigences de mise à niveau

Arrêtez l'indexeur existant et mettez à jour l'intégralité du checkout avant de procéder à la mise à niveau. Appliquez le nouveau schéma en tant qu'administrateur PostgreSQL avant de démarrer la v2.5.0 :

```bash
sudo -u postgres psql -v ON_ERROR_STOP=1 -d index < create_tables.sql
```

Installez ensuite les dépendances Python déclarées pour les déploiements manuels ou via systemd :

```bash
pip3 install -r requirements.txt
```

Conservez toutes les valeurs et identifiants de l'environnement de production ; le modèle systemd du dépôt nécessite désormais un fichier `.env` valide. Définissez `POSTGRES_PASSWORD` avant d'utiliser Docker Compose. Migrez correctement les données PostgreSQL 12 existantes avant d'adopter l'image PostgreSQL 14 de Compose ; le simple changement de tag d'image ne constitue pas une mise à niveau. Créez et vérifiez l'ensemble d'index recommandé avant de supprimer les anciens index ; utilisez des opérations d'indexation simultanées sur une base de données active. Appliquez `create_tables.sql` avant de faire passer PostgREST à `web_anon`, sinon les requêtes API anonymes échoueront. Planifiez explicitement l'historique filtré : l'activation du filtre d'adresse ou l'ajout d'une adresse ne remplit pas les blocs précédents.

Consultez le guide de mise à niveau complet sur <https://eth-indexer.docs.adamant.im/guide/upgrading> avant de déployer cette version.

## Compatibilité et portée actuelle

Les points de terminaison `/ethtxs`, `/max_block` et `/aval`, les colonnes de base de données, la gestion des adresses insensible à la casse, les encodages de valeurs et les formes de requêtes clients établies restent compatibles. `/max_block.max` reflète désormais également les blocs traités qui n'ont stocké aucune ligne de transaction.

L'indexeur continue de stocker les transferts ETH natifs et les appels directs de haut niveau ERC-20 `transfer(address,uint256)`. Il n'indexe pas les transferts ETH internes, `transferFrom`, les flux multisig, routeurs ou par lots, les autres standards de jetons, ni les corrections automatiques de réorganisation profonde.

## Distribution

La publication de cette version stable déclenche la création d'images pour `linux/amd64` et `linux/arm64` :

```text
ghcr.io/adamant-im/eth-transactions-storage:2.5.0
ghcr.io/adamant-im/eth-transactions-storage:latest
```

Les tags d'image de version sont immuables. Utilisez `2.5.0` plutôt que `latest` en production.

## Vérification

Les 12 tests unitaires Python ont réussi. La syntaxe Python, le formatage, le linting Markdown et la construction VitePress ont été validés. La construction du conteneur, l'exclusion de l'état de l'opérateur, les métadonnées OCI, les deux configurations Compose, la progression de l'API et les tests de redémarrage des points de contrôle ont été validés sur le commit de fusion de la version. Le déploiement de la documentation a réussi et le site est servi via HTTPS forcé. Le service de production a été déployé et confirmé opérationnel par son opérateur.

Travaux inclus : #27, #28, #29, #31 et #33. Ticket de suivi : #32. Journal des modifications complet : <https://github.com/Adamant-im/ETH-transactions-storage/compare/v2.4.1...v2.5.0>.

### Changements majeurs

Le nouveau schéma `sync_state` doit être appliqué via `create_tables.sql` avant de démarrer la v2.5.0, et il doit être appliqué avant de faire passer PostgREST à `web_anon`, sinon les requêtes API anonymes échoueront. Le modèle systemd nécessite désormais un fichier `.env` valide ; les déploiements existants sans ce fichier ne démarreront pas tant qu'il n'aura pas été créé. L'activation du filtre d'adresse ou l'ajout d'une adresse ne remplit pas les blocs précédents, ce qui signifie que l'historique non indexé précédemment ne sera pas capturé rétroactivement sans action explicite de l'opérateur.
