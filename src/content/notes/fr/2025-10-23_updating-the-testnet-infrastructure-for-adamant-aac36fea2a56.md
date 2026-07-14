---
title: "Mise à jour de l'infrastructure du Testnet pour ADAMANT"
slug: "updating-the-testnet-infrastructure-for-adamant-aac36fea2a56"
description: "Pourquoi le testnet est important : son infrastructure nécessite des mises à jour et une stabilisation pour mieux soutenir le développement, les tests et les contributions communautaires."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/updating-the-testnet-infrastructure-for-adamant-aac36fea2a56"
publishedAt: "2025-10-23T15:31:46.542Z"
author: "Alex Web3"
authorUrl: "https://medium.com/@al.onyxprotocol"
sourceAccount: "al-onyx"
coverImage: "/images/engineering-notes/medium/aac36fea2a56/001-1-gpu744hucponr8ep2jojwa-png.webp"
cardSpan: "full"
originalId: "medium:aac36fea2a56"
locale: "fr"
placeholder: false
---

### Pourquoi le testnet est important

L'infrastructure du testnet d'ADAMANT a été signalée dans [l'issue #148](https://github.com/Adamant-im/adamant/issues/148) comme nécessitant des mises à jour et une stabilisation afin de mieux soutenir le développement, les tests et les contributions communautaires. Deux priorités sont ressorties de la discussion : l'accessibilité, pour que les nouveaux contributeurs puissent déployer un nœud sans configuration complexe, et la stabilité, pour que les nœuds de test reflètent de manière fiable des conditions proches de la production.

### Image de démarrage rapide pour le testnet ADM

Une sauvegarde de la base de données du testnet est disponible au téléchargement, ce qui vous permet d'initialiser un nouveau nœud déjà synchronisé avec l'état actuel du testnet, réduisant ainsi considérablement le temps de configuration.

Après avoir installé un nœud de testnet, téléchargez la sauvegarde :

```bash
wget https://testnet.adamant.im/db_test_backup.sql.gz
```

Décompressez-la :

```bash
gunzip db_test_backup.sql.gz
```

Chargez l'image dans la base de données du nœud de testnet :

```bash
psql adamant_test < db_test_backup.sql
```

### Nœuds publics du testnet

Le testnet ADAMANT fournit une liste prédéfinie de nœuds publics pour la découverte des pairs, la synchronisation du réseau et l'accès à l'API. La source officielle est le [fichier de configuration](https://github.com/Adamant-im/adamant/blob/dev/test/config.default.json) dans le dépôt. Au moment de la rédaction, la liste contient trois nœuds, tous sur le port 36667 :

```json
"list": [
  {
    "ip": "162.55.32.80",
    "port": 36667
  },
  {
    "ip": "81.0.247.181",
    "port": 36667
  },
  {
    "ip": "95.217.19.144",
    "port": 36667
  }
]
```

Le premier nœud (`testnode1.adamant.im`) héberge également l'explorateur du testnet. Le second n'a pas de domaine et l'API publique est désactivée. Le troisième (`testnode3.adm.im`) expose une API publique ; par exemple, `https://testnode3.adm.im/api/node/status` renvoie le statut du nœud.

### Exécution des tests

Les contributeurs et validateurs doivent exécuter les tests unitaires et les tests d'API sur leur nœud, conformément aux [directives de contribution](https://github.com/Adamant-im/adamant/blob/dev/.github/CONTRIBUTING.md) du projet.

### Demande de testnet ADM et accès aux applications

Vous pouvez demander 3500 ADM de test via le même distributeur utilisé pour le réseau principal : [https://adamant.im/free-adm-tokens](https://adamant.im/free-adm-tokens/). L'application de messagerie de test est disponible à l'adresse [https://dev-adamant-testnet.surge.sh](https://dev-adamant-testnet.surge.sh), construite automatiquement depuis la branche dev. L'explorateur du testnet est accessible à l'adresse [https://testnet.adamant.im](https://testnet.adamant.im/).
