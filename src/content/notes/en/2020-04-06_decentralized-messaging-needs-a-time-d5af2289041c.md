---
title: "Decentralized messaging needs time"
slug: "decentralized-messaging-needs-a-time-d5af2289041c"
description: "by Aleksei Lebedev, Founder of ADAMANT Messenger Privacy invasion has become routine as technology permeates daily life. Messaging is one of the most common forms of online comm…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/decentralized-messaging-needs-a-time-d5af2289041c"
publishedAt: "2020-04-06T10:21:32.885Z"
author: "ADAMANT Messenger"
authorUrl: "https://medium.com/@adamant.im"
sourceAccount: "adamant.msg"
coverImage: "/images/engineering-notes/medium/d5af2289041c/001-0-cubdo3cy7xzrqg2m.webp"
cardSpan: "full"
originalId: "medium:d5af2289041c"
locale: "en"
placeholder: false
---

*by Aleksei Lebedev, Founder of ADAMANT Messenger*

Privacy invasion has become routine as technology permeates daily life. Messaging is one of the most common forms of online communication, yet few users think critically about where their data goes after they hit send. Popular messengers are owned by large corporations that collect as much personal information as possible — connections, app usage, transactions, and even data others provide about you. This data is stored on centralized servers that are routinely breached, proving that even the largest companies cannot guarantee security.

### Whom to trust

The short answer: trust nobody. Signal, often cited as a secure messenger, still identifies users by phone number. This is precisely why Bitcoin and decentralized applications exist — to operate in a trustless environment. Blockchain technology introduces a design where security and trustworthiness can be verified without needing to understand the underlying code.

After three years of development, ADAMANT has confirmed its concept of a decentralized blockchain messenger, with apps available on iOS, Web PWA, Windows, GNU/Linux, macOS, and Android.

### The prototype

Blockchain enables account creation in seconds with no credentials such as phone numbers or emails. Users can switch accounts freely, leaving no trace that the accounts were theirs. IP addresses are hidden and locations are untraceable because all data routes through distributed nodes, and apps have no access to the contact book. There is no central authority performing message authenticity checks — this is handled by a distributed, consensus-based host system owned by users. Censorship is impossible: accounts cannot be blocked and messages cannot be deleted.

![Decentralized messaging needs a time](/images/engineering-notes/medium/d5af2289041c/002-1-jrg9wiqqat22kbcwkhyaag-png.webp)

ADAMANT treats messages as transactions. Each message is signed with Ed25519 EdDSA, excluding man-in-the-middle attacks. Messages go into blocks, and since block sequence and timestamps are immutable, the order of messages is guaranteed — "I didn't say that" does not work with blockchain-stored messages. All messages are end-to-end encrypted, and ADAMANT's code is fully open source.

Because dialogs are stored on the blockchain, there is no need for local storage, which improves security and allows access to chats from any device or location.

![Decentralized messaging needs a time](/images/engineering-notes/medium/d5af2289041c/003-0-iccadzxqtzq4ocze.webp)

Blockchain messaging also opens new opportunities. Message delivery confirmation is useful for critical notifications. Integration with Ethereum, Dogecoin, Lisk, Dash, and Bitcoin enables in-chat crypto transfers, and ADAMANT includes a built-in crypto exchanger. ADAMANT 2FA offers a blockchain-based alternative to SMS-based two-factor authentication, which has known security weaknesses.

### Changes are not a trifling matter

Developing a true blockchain messenger requires significantly more effort than a traditional messenger — there are no precedents. Beyond technical challenges, mass adoption faces a deeper obstacle: people must change their mindset first.

### Paradigm shift

The core issue is responsibility. People avoid it. When a bank account is compromised, there is a good chance the bank will recover lost funds. When a Bitcoin wallet is compromised, there is no one to complain to. Fiat currency values are guaranteed by governments; no one guarantees the value of Bitcoin.

Decentralized messaging is even harder for users to accept. They ask, "What if I lose my private key? All my conversations will be stolen!" — and they dislike the answer: keep your private key safe. With Facebook, users can blame the company for security flaws. With a decentralized messenger, there is no one to blame. That is called responsibility.

### Prefer to pay hidden costs

Users tend to avoid straightforward payment, preferring hidden costs — even when those costs mean surrendering personal data and conversations. There is no such thing as a free lunch.

With ADAMANT, the price is explicit. Every action, including messaging or saving contacts, has a network fee of 0.001 ADM. Critics ask whether people will pay to message when free alternatives exist, but they misunderstand the model: fees go to node operators, not developers, just as Bitcoin transaction fees do not go to Bitcoin developers.

### Time tries the truth

Blockchain is only an attempt to create a decentralized messenger. Whether it succeeds, time will tell. But a game-changing messenger will eventually achieve mass adoption on the scale of Facebook.

ADAMANT has proven that a blockchain messenger can exist. The only prior attempt was Bitmessage in 2012, which failed due to long message delivery times, CPU load, and lack of mobile apps.

Current skepticism stems from the fact that blockchain messengers are ahead of their time. People are not ready to take responsibility for their accounts, ownership of personal information is not yet in vogue, and current blockchain technology does not provide high speeds. If not ADAMANT, more advanced analogues will appear in the future.
