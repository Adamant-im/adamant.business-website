---
title: "Indexer (outil EthSync) pour Ethereum mis à jour avec des index supplémentaires"
slug: "indexer-ethsync-tool-for-ethereum-updated-with-additional-indexes-f828f2b7fdf6"
description: "Le nœud Ethereum fournit des API RPC, mais pas de méthode native pour récupérer facilement les transactions par adresse. Découvrez la solution ADAMANT."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/indexer-ethsync-tool-for-ethereum-updated-with-additional-indexes-f828f2b7fdf6"
publishedAt: "2023-09-22T14:36:48.398Z"
author: "Kandinsky"
authorUrl: "https://medium.com/@jmobiles.rus"
sourceAccount: "jmob-kandinsky"
coverImage: "/images/engineering-notes/medium/f828f2b7fdf6/001-0-2atpoq1jvo6rdiry.webp"
cardSpan: "full"
originalId: "medium:f828f2b7fdf6"
locale: "fr"
placeholder: false
---

Les nœuds Ethereum fournissent des API RPC pour de nombreuses opérations, mais ne disposent pas d'un moyen natif permettant de récupérer facilement une liste de transactions par adresse, une fonctionnalité couramment attendue des explorateurs de blocs comme Etherscan. Pour pallier cela, ADAMANT maintient un Indexer spécialisé basé sur Python, appelé l'outil EthSync, qui permet d'interroger efficacement les transactions ETH et ERC20 par adresse.

L'Indexer fonctionne en tant que service en arrière-plan se connectant aux nœuds Ethereum via les API HTTP, WS ou IPC, et est compatible avec des clients populaires tels que Geth et Nethermind. Les données de transaction collectées sont stockées dans une base de données Postgres pour garantir la durabilité et un accès rapide, tandis qu'une API PostgREST expose ces données aux applications clientes.

![Indexer (outil EthSync) pour Ethereum mis à jour avec des index supplémentaires](/images/engineering-notes/medium/f828f2b7fdf6/002-0-9zuzrclpitfvpafs.webp)

Une amélioration majeure de cette version est l'ajout d'index supplémentaires dans la base de données. Ces index améliorent considérablement les performances des requêtes complexes, comme le filtrage des transactions Ethereum uniquement ou de jetons spécifiques associés à une adresse. Par exemple, récupérer les 25 dernières transactions USDT pour une adresse spécifique peut être réalisé à l'aide de la requête API suivante :

```bash
curl -k -X GET “http://localhost:3000/ethtxs?and=(txto.eq.0xdac17f958d2ee523a2206206994597c13d831ec7,or(txfrom.eq.0xabfDF505fFd5587D9E7707dFB47F45AF1f03E275,contract_to.eq.000000000000000000000000abfDF505fFd5587D9E7707dFB47F45AF1f03E275))&order=time.desc&limit=25"
```

Lors des tests, la plupart des requêtes utilisant ces nouveaux index s'exécutent en moins de 100 millisecondes, une amélioration significative par rapport aux dizaines de secondes nécessaires sans eux.
