---
title: "Indexeur pour Ethereum afin d'obtenir les listes de transactions par adresse"
slug: "indexer-for-ethereum-to-get-transaction-list-by-address-f5e5b38d5e8e"
description: "Les nœuds Ethereum ne permettent pas nativement de récupérer les transactions par adresse. L'ADAMANT a développé un indexeur open-source pour combler ce manque."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/indexer-for-ethereum-to-get-transaction-list-by-address-f5e5b38d5e8e"
publishedAt: "2019-12-17T09:47:40.803Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/f5e5b38d5e8e/001-1-joo929ftoejwheza0gd8ka-png.webp"
cardSpan: "full"
originalId: "medium:f5e5b38d5e8e"
locale: "fr"
placeholder: false
---

Les nœuds Ethereum ne prennent pas en charge nativement la récupération d'une liste de transactions pour une adresse donnée. La méthode `eth_listTransactions` est depuis longtemps demandée, mais elle ne figure pas sur la feuille de route d'Ethereum, ce qui oblige les développeurs d'applications — applications de messagerie, explorateurs de blocs, portefeuilles — à créer leur propre couche d'indexation.

L'équipe ADAMANT a conçu un [indexeur de transactions Ethereum](https://github.com/Adamant-im/ETH-transactions-storage) gratuit et open-source pour combler ce manque. Écrit en Python, il fonctionne en tant que service en arrière-plan qui se connecte à un nœud Ethereum (testé avec geth et parity), récupère les transactions via JSON RPC, et les stocke — y compris les transactions de contrats intelligents — dans une base de données Postgres. Une couche d'API RESTful est ensuite fournie via Postgrest, permettant des requêtes par adresse, similaires à celles proposées par Etherscan.

### Fonctionnement

L'indexeur commence à stocker les transactions à partir d'un numéro de bloc que vous spécifiez, puis interroge les nouveaux blocs toutes les 20 secondes par défaut (l'intervalle est configurable). Une fois l'index rempli, vous pouvez interroger les transactions par adresse via Postgrest. Par exemple, la requête suivante renvoie les 25 transactions les plus récentes impliquant l'adresse `0x6b924750e56a674a2ad01fbf09c7c9012f16f094`, triées par horodatage :

```
curl -k -X GET "http://localhost:3000/?and=(contract_to.eq.,or(txfrom.eq.0x6b924750e56a674a2ad01fbf09c7c9012f16f094,txto.eq.0x6b924750e56a674a2ad01fbf09c7c9012f16f094))&order=time.desc&limit=25"
```

Pour une documentation complète de l'API, consultez la [documentation Postgrest](https://postgrest.org/en/v5.2/api.html).

### Installation

L'indexeur fonctionne sur Linux (testé sur Ubuntu 16 et 18). Vous avez besoin d'un nœud geth ou parity synchronisé, ainsi que de Python, Postgresql, Postgrest et nginx. Vous pouvez exécuter l'indexeur directement ou en tant que démon :

```
python3.6 you/path/to/script/ethsync.py <yourDB>
```

L'indexation prend du temps. Pour vérifier l'avancement, interrogez le dernier bloc indexé et comparez-le au meilleur bloc de votre nœud :

```
psql -d index -c 'SELECT MAX(block) FROM ethtxs;'
```

Les instructions détaillées d'installation et de configuration sont disponibles dans le [dépôt](https://github.com/Adamant-im/ETH-transactions-storage).

### API publique

Postgrest publie l'API sur un port local. Pour l'exposer publiquement, configurez nginx afin de rediriger les requêtes vers Postgrest :

```
location /ethtxs {
    proxy_pass http://127.0.0.1:3000;
}

location /aval {
    proxy_pass http://127.0.0.1:3000;
}
```

Cela fournit deux points de terminaison : `/ethtxs` pour récupérer les transactions Ethereum par adresse, et `/aval` pour le statut du service.

### Exemple en direct

Une instance opérationnelle est disponible sur le nœud ADAMANT. L'ouverture de l'URL suivante dans un navigateur renvoie les transactions récentes pour l'adresse exemple :

```
https://ethnode1.adamant.im/ethtxs?and=(contract_to.eq.,or(txfrom.eq.0x6b924750e56a674a2ad01fbf09c7c9012f16f094,txto.eq.0x6b924750e56a674a2ad01fbf09c7c9012f16f094))&order=time.desc&limit=25
```
