---
title: "Comment devenir délégué ADAMANT"
slug: "how-to-become-an-adamant-delegate-745f01d032f"
description: "Pour devenir délégué ADAMANT et forger des blocs, exécutez un nœud, payez 3 000 ADM et obtenez suffisamment de votes pour figurer parmi les 101 premiers."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/how-to-become-an-adamant-delegate-745f01d032f"
publishedAt: "2018-06-30T10:11:25.366Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/745f01d032f/001-1-rprsczpnpydvk1y6ko-hzg-png.webp"
cardSpan: "full"
originalId: "medium:745f01d032f"
locale: "fr"
placeholder: false
---

ADAMANT atteint le consensus blockchain en utilisant un algorithme Delegated Proof of Stake (dPoS) amélioré appelé Fair dPoS. Pour devenir un délégué et forger des blocs, vous devez exécuter un nœud, payer des frais d’inscription de 3 000 ADM et accumuler suffisamment de votes pour figurer parmi les 101 premiers délégués.

Commencez par installer et exécuter un nœud ADAMANT. Une fois le nœud opérationnel, passez à l’utilisateur système `adamant` et installez l’outil `adamant-console` depuis les dépôts npm.

```bash
su - adamant
npm i -g adamant-console
```

![Comment devenir délégué ADAMANT](/images/engineering-notes/medium/745f01d032f/002-0-55iagwoakrbgkahj.webp)

Ensuite, créez un répertoire de configuration et copiez-y le fichier de configuration par défaut.

```bash
mkdir ~/.adm && cp /home/adamant/.nvm/versions/node/$(node -v)/lib/node_modules/adamant-console/config.default.json ~/.adm/config.json
```

![Comment devenir délégué ADAMANT](/images/engineering-notes/medium/745f01d032f/003-1-5n-ejpboh-pf5plf-85-ug-png.webp)

Modifiez le fichier copié `~/.adm/config.json` à l’aide d’un éditeur de texte. Remplacez le paramètre `network` de `testnet` à `mainnet` et ajoutez la phrase secrète de votre délégué. Gardez cette phrase secrète et assurez-vous que votre serveur reste sécurisé. Vous pouvez aussi omettre la phrase secrète du fichier de configuration et la transmettre via un indicateur en ligne de commande lors de l’inscription.

![Comment devenir délégué ADAMANT](/images/engineering-notes/medium/745f01d032f/004-1-zwh5ys2uf2nnz04woxe3zw-png.webp)

Lancez la console en exécutant `adm`. Inscrivez votre délégué en exécutant la commande suivante, en remplaçant `<new delegate name>` par le nom de votre choix. Le portefeuille associé à votre phrase secrète doit contenir au moins 3 000 ADM pour couvrir les frais d’inscription, qui sont redistribués aux autres délégués forgeant des blocs.

```bash
delegate new <new delegate name>
```

![Comment devenir délégué ADAMANT](/images/engineering-notes/medium/745f01d032f/005-0-khyxu9qp9tk9nbzg.webp)

Si vous n’avez pas indiqué la phrase secrète dans le fichier de configuration, incluez-la directement dans la commande :

```bash
delegate new <new delegate name> --passPhrase "passphrase here"
```

![Comment devenir délégué ADAMANT](/images/engineering-notes/medium/745f01d032f/006-0-fojjd-jrkr-jmvje.webp)

Après une inscription réussie, quittez la console en appuyant deux fois sur `Ctrl+C`. Pour commencer le forging, mettez à jour le fichier de configuration de votre nœud situé à `~/adamant/config.json`. Définissez le paramètre `forging/secret` avec votre phrase secrète de douze mots entourée de guillemets, puis redémarrez le nœud.

```bash
nano ~/adamant/config.json
pm2 restart adamant
```

![Comment devenir délégué ADAMANT](/images/engineering-notes/medium/745f01d032f/007-1-53boguojm1wx6sexqoa6yq-png.webp)

Vous pouvez vérifier le statut de votre délégué en visitant le moniteur des délégués ADAMANT et en recherchant le nom de votre délégué. Cela vous redirigera vers une page de détails confirmant votre inscription.

![Comment devenir délégué ADAMANT](/images/engineering-notes/medium/745f01d032f/008-1-sq6rao5bjro6dpbpbiwqlq-png.webp)

![Comment devenir délégué ADAMANT](/images/engineering-notes/medium/745f01d032f/009-1-xutdvsnjzh06yedz6uq1jg-png.webp)

L’inscription seule n’active pas le forging : vous devez recevoir des votes des utilisateurs ADAMANT via les applications Messenger. Une fois que votre délégué accumule suffisamment de pouvoir de vote pour entrer dans le top 101, surveillez ses performances via le moniteur des délégués. Un cercle vert indique un forging réussi, tandis que des cercles gris, jaune ou rouge indiquent des problèmes de configuration — généralement une mauvaise phrase secrète dans la configuration du nœud — ou une interruption du nœud. Gardez votre nœud actif, suivez le classement de votre délégué et appliquez les mises à jour majeures selon les besoins.

![Comment devenir délégué ADAMANT](/images/engineering-notes/medium/745f01d032f/010-1-imaqsih3o-uz-q2rggmia-png.webp)
