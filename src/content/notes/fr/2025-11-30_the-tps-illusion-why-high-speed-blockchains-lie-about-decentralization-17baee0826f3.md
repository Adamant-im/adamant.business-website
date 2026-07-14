---
title: "L'illusion des TPS : pourquoi les blockchains à haut débit mentent sur la décentralisation"
slug: "the-tps-illusion-why-high-speed-blockchains-lie-about-decentralization-17baee0826f3"
description: "La vérité crue : plus les TPS augmentent, plus la décentralisation diminue. Les blockchains rapides exigent du matériel coûteux, excluant les utilisateurs ordinaires."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/the-tps-illusion-why-high-speed-blockchains-lie-about-decentralization-17baee0826f3"
publishedAt: "2025-11-30T14:10:17.731Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/17baee0826f3/001-1-v56lizsnpjrlqz2jzw0tpw-png.webp"
cardSpan: "full"
originalId: "medium:17baee0826f3"
locale: "fr"
placeholder: false
---

### La vérité crue : les TPS tuent la décentralisation

Chaque nouvelle blockchain prétendue « prête pour l'avenir » promet 100 000 TPS, une finalité en moins d'une seconde et un consensus de nouvelle génération. Cependant, la physique, les réseaux et les contraintes matérielles détruisent immédiatement ce conte marketing. Il est impossible d'avoir à la fois un débit extrême et une décentralisation extrême : plus les TPS sont élevés, moins il y a de personnes capables d'exécuter un nœud.

Pour traiter entre 10 000 et 20 000 transactions par seconde, un nœud doit valider jusqu'à 1,2 million de transactions par minute, maintenir les mises à jour d'état en RAM, écrire d'énormes volumes de données sur un stockage NVMe, synchroniser les blocs sur le réseau en moins de 100 ms, et exécuter une machine virtuelle EVM ou personnalisée à la vitesse d'un centre de données. Cela exclut instantanément les validateurs à domicile, les serveurs VPS économiques, les nœuds amateurs, et toute personne ne disposant pas d'un matériel professionnel. La décentralisation, c'est simplement la capacité d'une personne moyenne à exécuter un nœud complet. Si la réponse est non, la chaîne est centralisée.

### Vérification de la réalité : exigences matérielles selon les réseaux

Bitcoin reste la référence en matière de décentralisation avec environ 7 TPS. Tout matériel grand public, y compris un Raspberry Pi doté de 4 à 8 Go de RAM et d'un disque dur ou SSD de 400 à 600 Go, peut exécuter un nœud. L'extraction nécessite un investissement matériel unique de 500 $ environ, plus l'électricité. Cette accessibilité maximale permet l'existence de dizaines de milliers de nœuds, maintenant le réseau décentralisé. Bitcoin est lent intentionnellement ; lent signifie accessible et décentralisé.

Ethereum représente un compromis avec 15 à 30 TPS. Les nœuds exigent un SSD de 2 To, 16 à 32 Go de RAM, un processeur multi-cœurs et une bande passante stable. La validation des blocs nécessite 32 ETH (plus de 100 000 $) ainsi qu'un matériel coûtant environ 1 500 $. Bien que techniquement semi-décentralisé grâce à des milliers de validateurs, il est centralisé sur le plan économique et trop lourd pour les utilisateurs occasionnels. Ethereum s'adapte via des rollups de niveau 2, pas par inflation du niveau 1, ce qui constitue une conception correcte.

Solana est rapide mais centralisé par défaut. Bien qu'annoncé à plus de 50 000 TPS, le débit réel se situe entre 300 et 1 500. Les nœuds exigent 256 Go de RAM, un processeur haut de gamme de 16 à 32 cœurs, 2 à 4 To de NVMe et une bande passante de 1 à 10 Gbps. Le matériel coûte entre 5 000 et 10 000 $, sans compter une connexion internet de niveau centre de données. Seuls les centres de données peuvent exécuter des validateurs, entraînant une centralisation technique et économique. Solana sacrifie délibérément la décentralisation au profit du débit.

Monad promet 10 000 à 20 000 TPS en tant qu'« EVM aux performances Solana », mais exige un matériel au niveau de Solana : 64 à 256 Go de RAM, processeur de 8 à 32 cœurs, et 2 à 4 To de NVMe. Le coût matériel dépasse 5 000 $, et l'exigence de mise sera probablement élevée en raison d'une allocation fortement axée sur les VC. Les validateurs seront exclusivement des acteurs de centres de données, entraînant une centralisation économique et technique. Monad n'est qu'une version de Solana avec Solidity — une conception valide, mais non décentralisée.

Litecoin (LTC) est stable, conservateur et suffisamment décentralisé avec environ 56 TPS. Les nœuds nécessitent un SSD léger et 4 à 8 Go de RAM, ce qui le rend compatible avec du matériel domestique. Le coût d'extraction est similaire à celui du Bitcoin. Il reste véritablement décentralisé car il est resté petit et conservateur.

ADAMANT (ADM) est petit, suffisamment rapide et véritablement décentralisé avec un TPS dans la dizaine. Un nœud validateur complet fonctionne sur un VPS à 5 $/mois avec 2 vCPU, 2 Go de RAM et un SSD de 60 à 80 Go. La création de blocs (forging) nécessite une mise d'environ 500 000 ADM (environ 7 000 $), avec des pools de forging disponibles pour une entrée quasi gratuite. N'importe qui peut exécuter un nœud sans dépendance à un centre de données, atteignant ainsi une forte décentralisation par la participation.

### Allocation du capital et fausse décentralisation

L'autre moitié de la décentralisation, rarement discutée, concerne l'allocation du capital et la domination par les VC. Un haut TPS combiné à une forte allocation aux VC crée deux couches de centralisation simultanément, entraînant une pression vendeuse future et un contrôle accru.

![L'illusion des TPS : pourquoi les blockchains à haut débit mentent sur la décentralisation](/images/engineering-notes/medium/17baee0826f3/002-1-tuy7beyom37poplwpaklag-png.webp)

De nombreuses blockchains modernes se présentent comme offrant une « décentralisation à l'échelle Web » ou un « haut TPS sans compromettre la sécurité ». En réalité, si seulement 0,01 % des utilisateurs peuvent exécuter un nœud, ce n'est pas un système décentralisé — c'est un CDN avec un jeton. Il vaut mieux avoir un système honnêtement centralisé qu'une chaîne qui prétend être décentralisée sans l'être. Une centralisation honnête offre une gouvernance prévisible et des performances fiables, tandis qu'une centralisation cachée crée des hypothèses de sécurité fausses et des pannes catastrophiques.

![L'illusion des TPS : pourquoi les blockchains à haut débit mentent sur la décentralisation](/images/engineering-notes/medium/17baee0826f3/003-1-yjn8ft-7uxsr-npfs1flyg-png.webp)

### Conclusion : les TPS sont la nouvelle métrique trompeuse

Les projets continueront de promettre des milliers de TPS et des chaînes plus rapides. La conclusion est brutale : plus une chaîne vise un TPS élevé, moins d'humains peuvent l'exécuter. Moins d'humains peuvent l'exécuter, moins elle est décentralisée et sécurisée. La vraie décentralisation n'est ni glamour, ni rapide, ni favorable aux VC. Elle est bon marché, accessible, ennuyeuse, résiliente et résistante à la censure. C'est pourquoi des systèmes comme Bitcoin, Litecoin et ADAMANT survivent aux cycles.
