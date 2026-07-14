---
title: "How to Become an ADAMANT Delegate"
slug: "how-to-become-an-adamant-delegate-745f01d032f"
description: "ADAMANT achieves blockchain consensus using an improved Delegated Proof of Stake (dPoS) algorithm known as Fair dPoS. To become a delegate and forge blocks, you must run a node,…"
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
locale: "en"
placeholder: false
---

ADAMANT achieves blockchain consensus using an improved Delegated Proof of Stake (dPoS) algorithm known as Fair dPoS. To become a delegate and forge blocks, you must run a node, pay a 3,000 ADM registration fee, and accumulate enough votes to rank within the top 101 delegates.

Begin by installing and running an ADAMANT node. Once the node is operational, switch to the `adamant` system user and install the `adamant-console` tool from the npm repositories.

```bash
su - adamant
npm i -g adamant-console
```

![How to Become an ADAMANT Delegate](/images/engineering-notes/medium/745f01d032f/002-0-55iagwoakrbgkahj.webp)

Next, create a configuration directory and copy the default config file into it.

```bash
mkdir ~/.adm && cp /home/adamant/.nvm/versions/node/$(node -v)/lib/node_modules/adamant-console/config.default.json ~/.adm/config.json
```

![How to Become an ADAMANT Delegate](/images/engineering-notes/medium/745f01d032f/003-1-5n-ejpboh-pf5plf-85-ug-png.webp)

Edit the copied `~/.adm/config.json` file using a text editor. Change the `network` parameter from `testnet` to `mainnet` and add your delegate's passphrase. Keep your passphrase secret and ensure your server remains secure. Alternatively, you can omit the passphrase from the config and pass it via a command-line flag during registration.

![How to Become an ADAMANT Delegate](/images/engineering-notes/medium/745f01d032f/004-1-zwh5ys2uf2nnz04woxe3zw-png.webp)

Launch the console by running `adm`. Register your delegate by executing the following command, replacing `<new delegate name>` with your preferred name. The wallet associated with your passphrase must hold at least 3,000 ADM to cover the registration fee, which is distributed to other forging delegates.

```bash
delegate new <new delegate name>
```

![How to Become an ADAMANT Delegate](/images/engineering-notes/medium/745f01d032f/005-0-khyxu9qp9tk9nbzg.webp)

If you did not specify the passphrase in the config file, include it directly in the command:

```bash
delegate new <new delegate name> --passPhrase "passphrase here"
```

![How to Become an ADAMANT Delegate](/images/engineering-notes/medium/745f01d032f/006-0-fojjd-jrkr-jmvje.webp)

After successful registration, exit the console by pressing `Ctrl+C` twice. To start forging, update your node's configuration file at `~/adamant/config.json`. Set the `forging/secret` parameter to your twelve-word passphrase enclosed in quotes, then restart the node.

```bash
nano ~/adamant/config.json
pm2 restart adamant
```

![How to Become an ADAMANT Delegate](/images/engineering-notes/medium/745f01d032f/007-1-53boguojm1wx6sexqoa6yq-png.webp)

You can validate your delegate status by visiting the ADAMANT Delegate Monitor and searching for your delegate name. This will redirect you to a details page confirming your registration.

![How to Become an ADAMANT Delegate](/images/engineering-notes/medium/745f01d032f/008-1-sq6rao5bjro6dpbpbiwqlq-png.webp)

![How to Become an ADAMANT Delegate](/images/engineering-notes/medium/745f01d032f/009-1-xutdvsnjzh06yedz6uq1jg-png.webp)

Registration alone does not enable forging; you must receive votes from ADAMANT users via the Messenger apps. Once your delegate accumulates enough vote power to enter the top 101, monitor its performance in the Delegate Monitor. A green circle indicates successful block forging, while grey, yellow, or red circles suggest configuration issues—typically an incorrect passphrase in the node's config—or node downtime. Keep your node active, track your delegate's rank, and apply major updates as needed.

![How to Become an ADAMANT Delegate](/images/engineering-notes/medium/745f01d032f/010-1-imaqsih3o-uz-q2rggmia-png.webp)
