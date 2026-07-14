---
title: "Vérification de santé : Points de terminaison"
slug: "discussion-19-health-check-endpoints-8923217"
description: "Voir aussi : Vérification de santé : Algorithme, Description générale. Pour la vérification de santé, nous recevons la hauteur actuelle du nœud ou le timestamp de mise à jour d'un service."
category: "discussion"
source: "github"
sourceUrl: "https://github.com/orgs/Adamant-im/discussions/19"
publishedAt: "2025-09-20T16:14:17Z"
author: "adamantmm"
authorUrl: "https://github.com/adamantmm"
discussionCategory: "Dev Guidelines & Docs"
cardSpan: "half"
originalId: "github-discussion:8923217"
locale: "fr"
placeholder: false
---

Voir aussi : [Vérification de santé : Algorithme, Description générale](https://github.com/orgs/Adamant-im/discussions/17)

Pour la vérification de santé, nous recevons la hauteur actuelle du nœud ou le timestamp de mise à jour d'un service. La réception de la version du nœud est facultative et n'est effectuée que s'il n'est pas nécessaire d'envoyer des requêtes supplémentaires.

## Points de terminaison de vérification de santé des nœuds et services

| **Nœud ou service** | **Point de terminaison de vérification de santé** | **Commentaires** |
|---|---|---|
| **adm-node** (pas de service/indexer) | `https://endless.adamant.im/api/node/status` | Inclut la version du nœud |
| **Service Currencyinfo** | `https://info.adamant.im/status` | Inclut la version du logiciel |
| **btc-node** | Requête RPC unique combinant `getblockchaininfo` et `getnetworkinfo` | Inclut la version du nœud |
| **btc-indexer** | `https://btcnode2.adamant.im/blocks/tip/height` | Aucun point de terminaison pour obtenir la version de l'indexeur |
| **eth-node** | Requête RPC unique combinant `eth_blockNumber` et `web3_clientVersion` | Inclut la version du nœud |
| **eth-indexer** | `https://ethnode3.adamant.im/max_block` | Inclut la version du logiciel |
| **doge-node** | Requête RPC unique combinant `getblockchaininfo` et `getnetworkinfo` | Inclut la version du nœud |
| **doge-indexer** | `https://dogenode1.adamant.im/api/status` | Inclut la version du nœud (pas celle du service/indexer) |
| **dash-node** (pas de service/indexer) | Requête RPC `getStatus` (combine `getnetworkinfo` pour la version + `getblockchaininfo` pour la hauteur) | Inclut la version du nœud |
| **lsk-node** (kly-node) | Requête RPC `system_getNodeInfo` | Inclut la version du nœud |
| **lsk-service** (kly-service) | `https://klyservice2.adamant.im/api/v3/network/status` | Inclut la version du nœud (pas celle du service/indexer) |
| **ipfs-node** | `https://ipfs4.adm.im/api/node/info` | Inclut la version du nœud ; informations supplémentaires IPFS pour la vérification de santé en cours |

Pour les nœuds BTC et Doge, une seule requête RPC groupée permet d'obtenir à la fois les informations sur la blockchain et sur le réseau, évitant ainsi un aller-retour supplémentaire. Exemple de requête BTC :

```
curl --data-binary '[{"jsonrpc":"1.0","id":"curltext1","method":"getblockchaininfo","params":[]}, {"jsonrpc":"1.0","id":"curltext2","method":"getnetworkinfo","params":[]}]' -H 'content-type:text/plain;' https://dogenode1.adamant.im
```

Pour les nœuds ETH, l'appel groupé équivalent combine `eth_blockNumber` et `web3_clientVersion` :

```
curl --data '[{"method":"eth_blockNumber","params":[],"id":1,"jsonrpc":"2.0"}, {"method":"web3_clientVersion","params":[],"id":2,"jsonrpc":"2.0"}]' -H "Content-Type: application/json" -X POST localhost:8545
```

La réponse ETH renvoie le numéro de bloc en valeur hexadécimale et la chaîne de version du client, par exemple `Geth/v1.13.5-stable-916d6a44/linux-amd64/go1.21.4`. Les noms des clients suivent généralement le modèle `Geth/v1.13.5` ou `Nethermind/v1.22.0`.

Notez que certains indexeurs exposent uniquement la hauteur ou le statut sans point de terminaison de version, et dans le cas des services Doge et LSK, la version retournée correspond au nœud sous-jacent et non au logiciel de l'indexeur ou du service lui-même.
