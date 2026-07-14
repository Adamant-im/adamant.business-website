---
title: "Authentification à deux facteurs sécurisée sur une blockchain"
slug: "go-to-secure-2fa-on-a-blockchain-344500a5f010"
description: "Le SMS est la méthode d'authentification à deux facteurs la plus utilisée, mais fondamentalement vulnérable. Les fraudes par vol de SIM sont en hausse, mettant en péril comptes et cryptomonnaies."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/go-to-secure-2fa-on-a-blockchain-344500a5f010"
publishedAt: "2020-01-19T10:27:29.377Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/344500a5f010/001-1-ljkbgctg0w-cqgb0tn5s6g-png.webp"
cardSpan: "full"
originalId: "medium:344500a5f010"
locale: "fr"
placeholder: false
---

Le SMS est la méthode d’authentification à deux facteurs la plus largement déployée, utilisée par les banques, les portefeuilles cryptographiques et d’innombrables services en ligne. Pourtant, elle est fondamentalement peu sûre. La fraude par vol de carte SIM — où un attaquant transfère le numéro de téléphone de la victime vers une nouvelle carte SIM — est exploitée depuis le début de l’ère mobile et ne fait que s’accélérer. La police de Londres a signalé une augmentation de 63 % des escroqueries par vol de SIM en 2019, et des cas médiatisés ont entraîné des vols de millions de dollars en cryptomonnaies. La cause profonde est structurelle : celui qui contrôle la carte SIM peut réinitialiser les mots de passe et prendre le contrôle des comptes, et les employés des opérateurs peuvent être corrompus ou trompés pour réaffecter des numéros.

![Aller à l'authentification sécurisée à deux facteurs sur une blockchain](/images/engineering-notes/medium/344500a5f010/002-0-h92gnghvvfxe0cfp.webp)

Une attaque typique par vol de SIM se déroule en trois étapes. Premièrement, les fraudeurs collectent des données personnelles — souvent via les réseaux sociaux ou un complice au sein d’un opérateur télécom. Deuxièmement, ils contactent l’opérateur mobile, prétendent que le téléphone a été perdu et bloquent la carte SIM de la victime. Troisièmement, ils obtiennent une carte SIM de remplacement, parfois à l’aide de faux documents ou d’un gestionnaire de magasin complice. Dès que la nouvelle carte SIM est active, la victime perd accès à toutes les authentifications basées sur SMS, tandis que l’attaquant reçoit chaque code à usage unique et change rapidement les mots de passe.

![Aller à l'authentification sécurisée à deux facteurs sur une blockchain](/images/engineering-notes/medium/344500a5f010/003-0-tptrqqosbbxrb3up.webp)

*Joel Ortiz lors d’une conférence de presse universitaire. Deux ans plus tard, il a été arrêté pour fraude informatique et condamné à 10 ans de prison pour avoir volé plus de 7,5 millions de dollars en cryptomonnaies via des vols de SIM.*

La récupération est difficile. Les virements en monnaie fiduciaire peuvent parfois être annulés avec la coopération de la banque, mais les transactions en cryptomonnaies sont effectivement irréversibles et souvent introuvables. Aucun exchange de cryptomonnaies n’a indemnisé les victimes de vols par vol de SIM, et les recours juridiques ciblent généralement l’opérateur télécom plutôt que la récupération des fonds. Michael Terpin, par exemple, a perdu 224 millions de dollars et poursuit AT&T en justice.

Outre le vol de SIM, l’authentification 2FA par SMS présente d’autres faiblesses techniques. Les messages peuvent être interceptés via des vulnérabilités du système de signalisation SS7 (Signaling System 7), et l’Institut national des normes et de la technologie des États-Unis a officiellement déprécié l’utilisation du SMS comme second facteur dans ses *Digital Identity Guidelines*. La remise des SMS est également peu fiable — les codes arrivent en retard ou pas du tout — et la présence d’un 2FA peut donner aux utilisateurs un faux sentiment de sécurité, les poussant à choisir des mots de passe plus faibles.

## Autres méthodes 2FA et leurs compromis

Les approches alternatives de 2FA incluent les listes de codes TAN à usage unique, l’authentification biométrique, les applications d’authentification à génération de codes basées sur le temps comme Google Authenticator, et les clés de sécurité matérielles. Chacune présente des inconvénients pratiques. Les jetons physiques peuvent être perdus ou volés. Les applications d’authentification compliquent la migration d’appareil — Google Authenticator, par exemple, n’offre aucun moyen d’exporter les clés, rendant la récupération après casse de téléphone pénible. Une étude de 2013 a révélé que les utilisateurs perçoivent tous les systèmes 2FA comme inconfortables, et le SMS reste populaire simplement parce qu’il est l’option la moins contraignante, pas parce qu’il est le plus sécurisé.

Une méthode 2FA idéale devrait être sûre, fiable, pratique et peu coûteuse. La remise par blockchain répond à ces critères.

## 2FA par blockchain via ADAMANT

Du point de vue de l’utilisateur, l’authentification 2FA par blockchain fonctionne comme la remise par SMS : le service génère un code à usage unique et l’envoie via un canal de messagerie ; l’utilisateur le lit et le saisit. La différence réside dans le transport. Au lieu du SMS, le code est transmis via le messager blockchain ADAMANT, disponible sous forme d’application web, client Tor, et applications natives pour iOS, Android, Linux, Windows et macOS.

![Aller à l'authentification sécurisée à deux facteurs sur une blockchain](/images/engineering-notes/medium/344500a5f010/004-0-l5oogpwqaljtmoab.webp)

La blockchain offre plusieurs propriétés de sécurité que le SMS ne peut pas fournir. La création de compte ne nécessite ni numéro de téléphone ni email — uniquement une phrase secrète. Tous les messages sont chiffrés de bout en bout via curve25519xsalsa20poly1305. Chaque message est une transaction blockchain signée avec Ed25519 EdDSA, rendant les attaques de type man-in-the-middle impossibles. Les messages sont enregistrés dans des blocs avec des horodatages immuables, et l’authenticité est vérifiée par un consensus distribué de nœuds plutôt que par une autorité centrale. Les comptes ne peuvent pas être bloqués et les messages ne peuvent pas être supprimés, ce qui signifie qu’il n’existe aucun équivalent à la suspension d’une carte SIM par un opérateur. Les codes sont accessibles depuis n’importe quel appareil à tout moment, et l’expéditeur reçoit une confirmation de remise — éliminant le besoin de boutons « renvoyer ».

![Aller à l'authentification sécurisée à deux facteurs sur une blockchain](/images/engineering-notes/medium/344500a5f010/005-0-prx5mhtulthutavr.webp)

Les utilisateurs se connectent à ADAMANT avec une phrase secrète uniquement, ce qui leur permet d’utiliser un seul compte pour tous les services ou de créer des comptes distincts par service. Une limitation est qu’un compte doit avoir au moins une transaction avant que sa clé publique n’apparaisse sur la blockchain, ce qui est nécessaire pour lui envoyer des messages chiffrés. Le portefeuille ADAMANT inclut un robinet (faucet) fournissant des jetons gratuits pour contourner cela, bien qu’une solution plus robuste consisterait à adresser les comptes directement par leur clé publique plutôt que par l’adresse numérique dérivée.

Le coût d’envoi d’un code 2FA via ADAMANT est d’environ 0,001 ADM (environ 0,00001 USD au prix actuel). Un service pourrait également exécuter sa propre blockchain basée sur la base de code ADAMANT et fixer les frais de transaction à zéro.

## Guide de mise en œuvre

Les étapes suivantes décrivent comment intégrer l’authentification 2FA par blockchain dans un service, en utilisant ADAMANT comme canal de remise. Une implémentation de référence est disponible sur GitHub à l’adresse `https://github.com/Adamant-im/adamant-2fa`.

### Étape 1 : Créer un compte expéditeur

Créez un compte ADAMANT qui enverra les codes 2FA. Vous pouvez le faire manuellement dans le portefeuille web, ou par programmation via l’API Node d’ADAMANT, la console ou l’API JS. La création de compte consiste à générer une phrase secrète BIP39, calculer son hachage SHA-256, dériver une paire de clés privée/publique Ed25519, puis dériver l’adresse blockchain à partir de la clé publique via un autre hachage SHA-256 avec inversion.

![Aller à l'authentification sécurisée à deux facteurs sur une blockchain](/images/engineering-notes/medium/344500a5f010/006-0-djya3mapovmiw1rz.webp)

![Aller à l'authentification sécurisée à deux facteurs sur une blockchain](/images/engineering-notes/medium/344500a5f010/007-0-wjbii6tc0qtwvpom.webp)

### Étape 2 : Générer des codes à usage unique

Générez un code HOTP pour chaque tentative de connexion. L’exemple ci-dessous utilise la bibliothèque `speakeasy` :

```js
const hotp = speakeasy.hotp({
  counter,
  secret: account.seSecretAscii,
});
```

Validation lorsque l’utilisateur soumet le code :

```js
se2faVerified = speakeasy.hotp.verify({
  counter: this.seCounter,
  secret: this.seSecretAscii,
  token: hotp,
});
```

### Étape 3 : Envoyer le code via la blockchain

Utilisez la CLI Console d’ADAMANT pour envoyer le code sous forme de message blockchain :

```js
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const command = `adm send message ${adamantAddress} "2FA code: ${hotp}"`;
let { error, stdout, stderr } = await exec(command);
```

Sinon, utilisez la méthode `send` de la bibliothèque API JS d’ADAMANT pour une approche programmée sans invoquer une CLI.

### Étape 4 : Construire l’interface utilisateur

Fournissez un champ permettant à l’utilisateur de saisir le code 2FA. L’application de démonstration utilise Vue, mais n’importe quel framework frontend fonctionnera.

![Aller à l'authentification sécurisée à deux facteurs sur une blockchain](/images/engineering-notes/medium/344500a5f010/008-0-uvflqyj6wavxcmsl.webp)

Le code source complet de la démonstration est disponible sur GitHub à l’adresse `https://github.com/Adamant-im/adamant-2fa`, y compris les instructions de configuration et un lien vers une démonstration en direct.
