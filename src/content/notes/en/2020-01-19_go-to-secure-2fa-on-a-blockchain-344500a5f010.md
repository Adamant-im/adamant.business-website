---
title: "Secure 2FA on a Blockchain"
slug: "go-to-secure-2fa-on-a-blockchain-344500a5f010"
description: "SMS is the most widely deployed two factor authentication method, used by banks, crypto wallets, and countless online services. Yet it is fundamentally unsafe. SIM swap fraud—wh…"
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
locale: "en"
placeholder: false
---

SMS is the most widely deployed two-factor authentication method, used by banks, crypto wallets, and countless online services. Yet it is fundamentally unsafe. SIM swap fraud—where an attacker ports a victim's phone number to a new SIM card—has been exploited since the early mobile era and has only accelerated. London police reported a 63% increase in SIM swap scams in 2019, and high-profile cases have resulted in millions of dollars in cryptocurrency theft. The root cause is structural: whoever controls the SIM card can reset passwords and take over accounts, and telecom employees can be bribed or deceived into reassigning numbers.

![Go to secure 2FA on a Blockchain](/images/engineering-notes/medium/344500a5f010/002-0-h92gnghvvfxe0cfp.webp)

A typical SIM swap attack proceeds in three stages. First, fraudsters gather personal data—often from social media or an accomplice inside a telecom. Second, they contact the mobile operator, claim the phone was lost, and block the victim's SIM. Third, they obtain a replacement SIM, sometimes using forged documents or a complicit store manager. Once the new SIM is active, the victim loses access to all SMS-based authentication while the attacker receives every one-time code and moves quickly to change passwords.

![Go to secure 2FA on a Blockchain](/images/engineering-notes/medium/344500a5f010/003-0-tptrqqosbbxrb3up.webp)

*Joel Ortiz at a university press conference. Two years later, he was detained for cyber fraud and sentenced to 10 years for stealing over $7.5 million in cryptocurrency via SIM swapping.*

Recovery is difficult. Fiat transfers can sometimes be reversed with bank cooperation, but cryptocurrency transactions are effectively irreversible and often untraceable. No crypto exchange has compensated victims of SIM swap theft, and legal recourse typically targets the telecom provider rather than recovering funds. Michael Terpin, for example, lost $224 million and is pursuing litigation against AT&T.

Beyond SIM swapping, SMS 2FA has additional technical weaknesses. Messages can be intercepted through vulnerabilities in Signaling System 7 (SS7), and the US National Institute of Standards and Technology has officially deprecated SMS as a second factor in its Digital Identity Guidelines. SMS delivery is also unreliable—codes arrive late or not at all—and the presence of 2FA can give users a false sense of security, leading them to choose weaker passwords.

## Other 2FA methods and their trade-offs

Alternative 2FA approaches include one-time TAN code lists, biometric authentication, time-based authenticator apps like Google Authenticator, and hardware security keys. Each has practical drawbacks. Physical tokens can be lost or stolen. Authenticator apps complicate device migration—Google Authenticator, for instance, offers no key export, making recovery from a broken phone painful. A study from 2013 found that users perceive all 2FA as inconvenient, and SMS remains popular simply because it is the least inconvenient option, not because it is the most secure.

An ideal 2FA method should be safe, reliable, convenient, and inexpensive. Blockchain-based delivery meets these criteria.

## 2FA via blockchain using ADAMANT

From the user's perspective, blockchain 2FA works the same as SMS-based delivery: the service generates a one-time code and sends it through a messaging channel; the user reads and enters it. The difference is the transport. Instead of SMS, the code is delivered through the ADAMANT blockchain messenger, which is available as a web app, Tor client, and native apps for iOS, Android, Linux, Windows, and macOS.

![Go to secure 2FA on a Blockchain](/images/engineering-notes/medium/344500a5f010/004-0-l5oogpwqaljtmoab.webp)

The blockchain provides several security properties that SMS cannot. Account creation requires no phone number or email—only a passphrase. All messages are end-to-end encrypted using curve25519xsalsa20poly1305. Each message is a blockchain transaction signed with Ed25519 EdDSA, making man-in-the-middle attacks impossible. Messages are committed to blocks with immutable timestamps, and authenticity is verified by a distributed consensus of nodes rather than any central authority. Accounts cannot be blocked and messages cannot be deleted, which means there is no equivalent of a carrier suspending a SIM card. Codes are accessible from any device at any time, and the sender receives a delivery confirmation—eliminating the need for "resend" buttons.

![Go to secure 2FA on a Blockchain](/images/engineering-notes/medium/344500a5f010/005-0-prx5mhtulthutavr.webp)

Users log in to ADAMANT with only a passphrase, so they can use a single account for all services or create separate accounts per service. One limitation is that an account must have at least one transaction before its public key appears on-chain, which is required to send encrypted messages to it. The ADAMANT wallet includes a faucet for free tokens to work around this, though a more robust solution would be to address accounts directly by public key rather than by the derived numeric address.

The cost of sending a 2FA code via ADAMANT is approximately 0.001 ADM (roughly $0.00001 USD at current prices). A service could also run its own blockchain based on the ADAMANT codebase and set the transaction fee to zero.

## Implementation guide

The following steps describe how to integrate blockchain 2FA into a service, using ADAMANT as the delivery channel. A reference implementation is available on GitHub at `https://github.com/Adamant-im/adamant-2fa`.

### Step 1: Create a sender account

Create an ADAMANT account that will send 2FA codes. You can do this manually in the web wallet, or programmatically via the ADAMANT Node API, Console, or JS API. Account creation involves generating a BIP39 passphrase, computing its SHA-256 hash, deriving an Ed25519 private and public key pair, and then deriving the blockchain address from the public key via another SHA-256 hash with inversion.

![Go to secure 2FA on a Blockchain](/images/engineering-notes/medium/344500a5f010/006-0-djya3mapovmiw1rz.webp)

![Go to secure 2FA on a Blockchain](/images/engineering-notes/medium/344500a5f010/007-0-wjbii6tc0qtwvpom.webp)

### Step 2: Generate one-time codes

Generate a HOTP code for each login attempt. The example below uses the `speakeasy` library:

```js
const hotp = speakeasy.hotp({
  counter,
  secret: account.seSecretAscii,
});
```

Validation when the user submits the code:

```js
se2faVerified = speakeasy.hotp.verify({
  counter: this.seCounter,
  secret: this.seSecretAscii,
  token: hotp,
});
```

### Step 3: Send the code via blockchain

Use the ADAMANT Console CLI to send the code as a blockchain message:

```js
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const command = `adm send message ${adamantAddress} "2FA code: ${hotp}"`;
let { error, stdout, stderr } = await exec(command);
```

Alternatively, use the ADAMANT JS API library's `send` method for a programmatic approach without shelling out to a CLI.

### Step 4: Build the user interface

Provide a field for the user to enter the 2FA code. The demo application uses Vue, but any frontend framework will work.

![Go to secure 2FA on a Blockchain](/images/engineering-notes/medium/344500a5f010/008-0-uvflqyj6wavxcmsl.webp)

The full source code for the demo is on GitHub at `https://github.com/Adamant-im/adamant-2fa`, including setup instructions and a live demo link.
