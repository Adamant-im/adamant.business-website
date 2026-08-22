---
title: "Money for Machines: Why AI Agents Are Learning Two Ways to Pay"
slug: "money-for-machines-why-ai-agents-are-learning-two-ways-to-pay-fe2808213899"
description: "As autonomous agents start shopping, subscribing, and settling invoices on behalf of people and companies, the payments industry is relearning an old argument — permissioned tru…"
category: "article"
source: "medium"
sourceUrl: "https://news.adamant.im/money-for-machines-why-ai-agents-are-learning-two-ways-to-pay-fe2808213899"
publishedAt: "2026-08-21T12:22:57.019Z"
author: "Kandinsky"
sourceAccount: "adamant-im"
cardSpan: "full"
originalId: "medium:fe2808213899"
coverImage: "/images/engineering-notes/medium/fe2808213899/001-ead7aeb52d.webp"
locale: "en"
placeholder: false
---

As autonomous agents start shopping, subscribing, and settling invoices on behalf of people and companies, the payments industry is relearning an old argument — permissioned trust versus permissionless code — one transaction at a time.

Sometime in the last eighteen months, a strange new customer showed up at checkout. It has no face, no card in a physical wallet, and no patience for a CAPTCHA. It's an AI agent — software acting on behalf of a person or a company — and it wants to pay for something: an API call, a dataset, a subscription renewal, a flight it was asked to rebook. McKinsey estimates agents could be responsible for as much as $1 trillion in U.S. transactions alone by 2030. The question nobody had fully answered until recently was mundane and enormous at the same time: *how, exactly, does a piece of software pay?*

Two industries answered at once, from opposite directions. The card networks and fintech incumbents rebuilt checkout around agents without touching the underlying rails. The crypto industry built new rails specifically because the old ones don't fit software well. Both approaches are live today, both are growing, and neither has "won." What's emerged instead is a quiet division of labor that says more about the real economics of machine payments than any single company's roadmap.

### The New Buyer in the Room

Agentic commerce stopped being a thought experiment around late 2025, when OpenAI, Stripe and Meta published the Agentic Commerce Protocol (ACP) as an open standard, and PayPal followed with an integration letting ChatGPT users check out without leaving the chat. Visa answered with Trusted Agent, Mastercard with Agent Pay — both frameworks for letting a verified AI agent transact on a consumer's behalf using tokenized, scoped credentials rather than a raw card number. Commercial rollout began in early 2026, first in a handful of Asian markets for Mastercard, then more broadly.

At the infrastructure layer, Google proposed a complementary piece: AP2, the Agent Payments Protocol. AP2 doesn't move money at all — it standardizes *proof*. Its mandates are W3C Verifiable Credentials: cryptographically signed records of what a human actually authorized an agent to spend, on what, up to which amount, until when. It's less a payment rail than a permission slip that any rail can check.

Meanwhile, a parallel stack was assembling itself in public view on the blockchain side. Coinbase's x402 protocol — named for the long-dormant HTTP 402 "Payment Required" status code — lets an agent pay for an API response inline, in a single HTTP round-trip, settling in stablecoins on low-fee networks like Base and Solana. Stripe answered with its own Machine Payments Protocol (MPP) for session-based machine spending. Startups like Skyfire, backed by Coinbase Ventures and a16z, gave agents their own wallets outright — some funded in USDC, some bridged to traditional banking.

By mid-2026, four protocols had effectively specialized into four jobs: AP2 for *authorization* ("did a human really approve this?"), ACP for *checkout* ("negotiate the cart with the merchant"), and x402 or MPP for *settlement* ("actually move the money"). An agent buying something today may touch all three in the space of one purchase.

### Path One: Teach the Old Rails to Trust a Robot

The traditional-finance approach is, structurally, conservative — and that's the point. Visa, Mastercard, PayPal and Stripe are not trying to reinvent money for agents; they're trying to extend eighty years of accumulated trust infrastructure — chargebacks, fraud liability shifts, KYC, dispute resolution, consumer-protection law — to a new class of non-human account holder. An agent authorized under ACP or Agent Pay ultimately spends through the same rails a human's card would: interchange, network rules, the works. A Stripe-issued token might authorize a purchase, but it still charges through Visa, Mastercard, or a card on file, carrying the standard 1.5–3.5% interchange cost.

That inheritance is the whole value proposition. If an agent goes rogue, overspends, or gets tricked by a prompt-injected merchant page, there is a known process for making the human whole — because the rail was built, from day one, around the assumption that money movement is sometimes wrong and needs to be reversible. PayPal's agentic offering pairs its API toolkit with its own regulated stablecoin, PYUSD, and a seat in the sixty-company AP2 standards group — hedging, notably, in both directions at once.

> The traditional rail's entire pitch to an agent economy is one sentence: we already know what to do when something goes wrong.

### Path Two: Build Money That Was Never Shaped for Humans

The Web3 answer starts from a different observation: most of what an agent actually needs to pay for doesn't look like a human purchase at all. It looks like a toll. A model calling another model's API, a scraper paying per page, a research agent paying fractions of a cent for each dataset query — these are high-frequency, low-value, machine-speed transactions, and the card system's economics were never built for them. A fixed 30-cent processing floor makes no sense when the item being purchased costs two cents.

Stablecoins on blockchain rails close that gap almost by accident. Settlement on a rollup like Base costs a fraction of a cent — often cited around $0.0001 — with finality in seconds rather than days, and no account to open first. A May 2026 report from crypto-liquidity firm Keyrock, covered by CoinDesk, found that AI agents had already settled $73 million across 176 million transactions on crypto rails, with roughly three-quarters of those payments falling *below* the fixed-fee floor where card payments stop making economic sense — and USDC alone accounting for 98.6% of the volume. This isn't a hypothetical future market; by the numbers, it's already the default machine-payment layer for a specific, narrow, high-volume category of spend.

There's a second, less-discussed argument for the crypto rail, and it's architectural rather than economic: programmability. A stablecoin payment can carry logic — escrow conditions, multi-agent revenue splits, automatic release on delivery confirmation — natively, in the transaction itself, without a third-party platform mediating the rules. For agent-to-agent commerce, where neither party is a bank customer and neither wants to onboard the other into a proprietary platform, that composability is arguably more valuable than the cost savings.

> Card rails were built to make humans trust merchants. Stablecoin rails were built so two pieces of software don't need to trust anything but math.

### Why This Isn't Really "Web3 vs. Banks"

Framed as a rivalry, the story is unsatisfying, because the companies building the rails keep refusing to pick a side. Visa is running what it calls a dual-rail strategy — Trusted Agent tokens on the card network alongside stablecoin settlement pilots. PayPal ships both a card-based agent toolkit and PYUSD. Even Coinbase's x402, the most crypto-native of the bunch, is designed to plug into the same AP2 authorization layer that Google built for the card world, precisely so that "who approved this spend" doesn't have to be re-solved for every rail.

![Money for Machines: Why AI Agents Are Learning Two Ways to Pay](/images/engineering-notes/medium/fe2808213899/002-7e415e449d.webp)

The more accurate frame is that agents are becoming *multi-rail by default*, and the rail gets chosen per transaction rather than per agent. A one-time, high-value consumer purchase — a flight, a piece of furniture — still favors card rails, where interchange cost is a rounding error and reversibility matters because mistakes are expensive. A machine-to-machine API call repeated ten thousand times a day favors stablecoins, where reversibility isn't needed and a 2% fee would make the whole product model unviable. Buying from a known, KYC'd, brand-name merchant leans traditional, because the legal and reputational infrastructure around that merchant already exists. Paying an anonymous agent you've never transacted with before — the actual agent-to-agent economy — leans crypto, because there's no shared bank relationship to fall back on, only a protocol both sides can verify independently. And cross-border, always-on machine commerce doesn't wait for business hours or correspondent banking; stablecoins settle around the clock, while domestic, consumer-facing commerce mostly doesn't need that.

This is exactly the pattern that traditional finance itself predicts. Cards won for consumer retail because consumers needed reversibility and dispute protection more than they needed speed. Wire transfers and ACH won for large B2B payments because the parties already trusted each other and cared more about cost than instant finality. Agents are simply forcing that same segmentation to happen faster, and in public, because software makes the trade-offs explicit in a way human habit usually hides.

### The Part Nobody Has Actually Solved

Both paths are running ahead of the guardrails meant to contain them, and the industry's own risk teams are the first to say so.

On the traditional side, banking-security researchers increasingly describe agentic AI as introducing "a third actor that does not fit cleanly into existing banking models" — software making decisions and executing transactions across institutional boundaries, sometimes in ways the underlying customer never specifically authorized. Fraud losses are already climbing roughly 20% year-on-year, and synthetic identity fraud — generative AI blending real and fabricated identity data — is reportedly reaching an inflection point in 2026. Regulators haven't caught up: in the U.S., the OCC's revised Model Risk Management guidance explicitly *excludes* generative and agentic AI models from its scope, meaning the governance playbook banks have relied on for decades doesn't yet extend to the thing they're now deploying.

On the crypto side, the same immaturity shows up differently. Irreversibility, the feature that makes micropayments economically viable, is also the flaw that makes a compromised agent wallet catastrophic — there is no chargeback for a private key an attacker got hold of. Agent identity is still mostly a wallet address, not a legally accountable entity, which leaves an open question — for a merchant, a regulator, or a victim — of who exactly is liable when an autonomous agent transacts badly. And the regulatory frameworks arriving in 2026 to bring order to stablecoins — the U.S. GENIUS Act, Europe's MiCA, the EU AI Act — were all drafted with human-initiated transactions in mind. None of them directly addresses autonomous machine-to-machine payments, or assigns liability when no human clicked "buy."

Both rails, in other words, are being asked to carry a volume of autonomous decision-making they weren't originally designed to carry — one because its trust model assumes a human is ultimately accountable, the other because its settlement model assumes finality is always desirable.

### What This Means, Practically

For a business building anything an agent might one day interact with — an API, a storefront, a subscription product — the practical takeaway isn't "pick crypto" or "pick cards." It's to make sure your product can be *metered and authorized* in a rail-agnostic way: expose machine-readable pricing, support scoped, expiring authorization rather than one static API key, and don't assume the payer is a card-holding human on the other end of a browser session. The protocols will keep consolidating — nobody seriously expects four or five competing agent-payment standards to survive the decade — but the underlying requirement, a machine that can prove what it's allowed to spend and settle it cheaply at whatever size the transaction actually is, is not going away.

The more interesting long-term question isn't which rail wins. It's what happens to the *meaning* of a transaction once most of them no longer involve a human moment of decision at all — when "I bought this" quietly becomes "an agent I authorized, three steps removed, bought this for me." Payments infrastructure has spent a century optimizing for the moment a person decides to spend. It's now being rebuilt, in real time, for the moment a person merely *permits* spending — and hands the deciding to something else.
