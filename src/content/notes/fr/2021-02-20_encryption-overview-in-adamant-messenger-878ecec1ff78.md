---
title: "Aperçu de la cryptographie dans ADAMANT Messenger"
slug: "encryption-overview-in-adamant-messenger-878ecec1ff78"
description: "ADAMANT utilise les mêmes algorithmes cryptographiques éprouvés que Bitcoin, Ethereum, Signal, Tor et OpenSSH. La cryptographie est par nature conservatrice, chaque chiffrement devant résister à l'épreuve du temps."
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/encryption-overview-in-adamant-messenger-878ecec1ff78"
publishedAt: "2021-02-20T08:36:23.523Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/878ecec1ff78/001-1-z7yxhckijxqq1g7m-pnbq-png.webp"
cardSpan: "full"
originalId: "medium:878ecec1ff78"
locale: "fr"
placeholder: false
---

ADAMANT s'appuie sur les mêmes algorithmes cryptographiques bien établis utilisés par Bitcoin, Ethereum, Signal, Tor, OpenSSH et bien d'autres. La cryptographie est par nature conservatrice, et chaque algorithme de chiffrement doit résister à l'épreuve du temps. Ce qui distingue ADAMANT, c'est que la blockchain elle-même garantit la décentralisation, l'anonymat via la pseudonymat, l'intégrité et l'ordre des messages, le stockage permanent, la remise fiable et la résistance aux attaques de type Man-in-the-Middle. Chaque message et transaction est vérifié par tous les nœuds du réseau, et non par le destinataire ou une autorité centrale. Le coût de cette décentralisation se traduit par des frais de transaction qui rémunèrent les opérateurs de nœuds.

### Compte et paire de clés

Un compte ADAMANT commence par une phrase secrète mnémonique BIP39 de 12 mots, offrant environ 132 bits d'entropie parmi environ 2048¹² combinaisons possibles. La graine BIP39 est hachée avec SHA-256 pour produire une valeur de 256 bits, à partir de laquelle sont dérivées les clés de signature numérique Ed25519 : une clé publique de 256 bits et une clé privée de 512 bits. Cela offre une sécurité comparable à celle de RSA avec des clés de ~3000 bits ou à des chiffrements symétriques robustes de 128 bits. L'adresse ADM affichée à l'utilisateur est un 'U' suivi de 8 octets du hachage SHA-256 de la clé publique, produisant un identifiant de 64 bits. La clé publique Ed25519 est publiée sur la blockchain lors de la première transaction sortante de l'utilisateur.

### Chiffrement des messages

Pour la messagerie chiffrée, les clés de signature Ed25519 de l'utilisateur sont converties en clés de type Diffie-Hellman Curve25519 — une clé publique de 256 bits et une clé secrète de 256 bits — permettant ainsi le chiffrement asymétrique entre les parties. Les messages sont chiffrés avec le chiffrement Curve25519-XSalsa20-Poly1305 (NaCl.box), qui utilise XSalsa20 avec un nonce de 192 bits et Poly1305 pour l'authentification, vérifiant à la fois l'intégrité des données et l'authenticité du message.

### Stockage clé-valeur (KVS)

Pour le stockage clé-valeur, les clés de signature Ed25519 de l'utilisateur sont utilisées pour dériver une clé secrète XSalsa20-Poly1305. Les données sont sérialisées en un objet JSON auquel du bruit est ajouté, puis chiffrées avec NaCl.secretbox, utilisant à nouveau XSalsa20 avec un nonce de 192 bits et Poly1305 pour vérifier l'intégrité et l'authenticité.

### Signatures de transaction

Les données de transaction — y compris l'horodatage et tout message chiffré — sont hachées avec SHA-256. L'expéditeur signe ce hachage avec Ed25519 en utilisant sa clé publique de 256 bits et sa clé privée de 512 bits. L'ID de transaction correspond à 8 octets du hachage SHA-256 de la signature résultante.

Des références techniques détaillées sur la génération de clés, le chiffrement/déchiffrement de messages et la signature de transactions sont disponibles dans le wiki du projet ADAMANT sur GitHub.

### Stockage blockchain et ordinateurs quantiques

Certains utilisateurs craignent que le stockage permanent des messages chiffrés sur la blockchain crée une vulnérabilité future : une fois les ordinateurs quantiques matures, l'ensemble des correspondances stockées pourrait-il être déchiffré rétroactivement ?

Cette préoccupation n'est pas propre à ADAMANT. La cryptanalyse quantique menace l'ensemble du paysage informatique — secrets d'État, trafic internet, données stockées — car pratiquement tous les systèmes modernes reposent sur les mêmes familles de primitives cryptographiques. Des programmes de surveillance de masse comme PRISM capturent déjà et conservent les communications, de sorte que les données chiffrées interceptées aujourd'hui pourraient être ciblées par des progrès futurs en cryptanalyse, quel que soit le protocole utilisé.

La cryptanalyse quantique n'est pas une baguette magique. Elle offre des gains théoriques de vitesse pour certains problèmes, mais les chiffrements actuels comportent des marges de sécurité importantes qui pourraient rendre ces gains inefficaces en pratique. De plus, un attaquant ne peut pas déchiffrer massivement une blockchain entière ; chaque compte utilise des clés de chiffrement distinctes, ce qui impose un effort spécifique par compte. Étant donné que les comptes ADAMANT sont anonymes, un adversaire devrait d'abord identifier quels comptes valent la peine d'être ciblés.

La cryptanalyse quantique pratique est probablement éloignée de plusieurs décennies, et la menace dominante pour la cryptographie durant cette période pourrait s'avérer être autre chose que les ordinateurs quantiques. Si des algorithmes post-quantiques devenaient nécessaires, ADAMANT pourrait adapter sa cryptographie, comme d'autres messagers et protocoles le pourraient également.

Pour la sécurité opérationnelle, ADAMANT est mieux utilisé pour des échanges ponctuels ou à court terme, avec des changements fréquents de compte. La création d'un nouveau compte prend environ une seconde, ce qui rend la rotation des identités pratique et limite la valeur de tout compte unique compromis.
