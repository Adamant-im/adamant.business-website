export const siteConfig = {
  site: {
    name: 'cryptofoundry',
    legalName: 'cryptofoundry',
    domain: 'adamant.business',
    url: 'https://adamant.business',
    foundedYear: 2016,
    heroTagline:
      'Self-hosted crypto software, bots, payments and infrastructure — built by engineers behind a real blockchain ecosystem since 2016',
    positioning: 'We build crypto software and maintain it in production.',
  },

  contact: {
    email: 'business@adamant.im',
    telegram: '@adamant_business',
    telegramUrl: 'https://t.me/adamant_business',
    adamantMessenger:
      'https://adm.im/?address=U8879792970017145825&label=cryptofoundry',
  },

  locales: [
    { id: 'en', path: '', label: 'English', dir: 'ltr' as const, codes: ['en'] },
    { id: 'zh', path: 'zh', label: '简体中文', dir: 'ltr' as const, codes: ['zh-CN', 'zh-Hans', 'zh'] },
    { id: 'es', path: 'es', label: 'Español', dir: 'ltr' as const, codes: ['es'] },
    { id: 'ru', path: 'ru', label: 'Русский', dir: 'ltr' as const, codes: ['ru'] },
    { id: 'ar', path: 'ar', label: 'العربية', dir: 'rtl' as const, codes: ['ar'] },
    { id: 'fr', path: 'fr', label: 'Français', dir: 'ltr' as const, codes: ['fr'] },
    { id: 'ja', path: 'ja', label: '日本語', dir: 'ltr' as const, codes: ['ja'] },
    { id: 'de', path: 'de', label: 'Deutsch', dir: 'ltr' as const, codes: ['de'] },
  ],
  defaultLocale: 'en',

  services: [
    {
      slug: 'bots-and-automation',
      title: 'Crypto Bots & Automation',
      shortDescription:
        'Self-hosted bots, monitoring, alerting, and execution tools. You keep the keys and strategy.',
      cta: 'I want a crypto bot',
    },
    {
      slug: 'crypto-payments',
      title: 'Crypto Payments & Licensing',
      shortDescription:
        'Non-custodial payments, subscriptions, license keys, and access automation for SaaS.',
      cta: 'I want to accept crypto payments',
    },
    {
      slug: 'trading-software',
      title: 'Trading Software',
      shortDescription:
        'CEX/DEX automation, treasury tools, market data pipelines — tools, not profit promises.',
      cta: 'I am interested in trading software',
    },
    {
      slug: 'infra',
      title: 'Wallets, Nodes & Infrastructure',
      shortDescription:
        'Node deployment, explorers, APIs, monitoring, wallets, and long-term maintenance.',
      cta: 'I want crypto infrastructure',
    },
    {
      slug: 'security-audits',
      title: 'Security, Review & Hardening',
      shortDescription:
        'Security audits, dependency review, API key safety, and production hardening.',
      cta: 'Order a security review',
    },
    {
      slug: 'blockchain',
      title: 'ADAMANT-powered Private Communication',
      shortDescription:
        'Private messenger, encrypted communication, and self-hosted blockchain for organizations.',
      cta: 'Build a private blockchain communication system',
    },
  ],

  openRouter: {
    models: ['z-ai/glm-5.2', 'deepseek/deepseek-v4-pro', 'qwen/qwen3.7-plus'],
    summarize: {
      maxTokens: 10000,
      temperature: 0.3,
      timeoutMs: 180_000,
      maxAttempts: 2,
      provider: {
        allow_fallbacks: true,
        preferred_max_latency: { p90: 90 },
      },
    },
    translate: {
      models: ['google/gemini-3.1-flash-lite', 'qwen/qwen3.7-plus', 'deepseek/deepseek-v4-pro'],
      maxTokens: 12000,
      temperature: 0.4,
      timeoutMs: 180_000,
      maxAttempts: 2,
      provider: {
        allow_fallbacks: true,
        preferred_max_latency: { p90: 90 },
      },
    },
  },

  github: {
    org: 'Adamant-im',
    starsRepos: [
      { repo: 'adamant', description: 'ADAMANT blockchain node' },
      { repo: 'adamant-api-jsclient', description: 'JavaScript API client' },
      { repo: 'adamant-console', description: 'ADAMANT CLI tool' },
      { repo: 'adamant-im', description: 'ADAMANT Messenger PWA' },
      { repo: 'adamant-iOS', description: 'ADAMANT Messenger for iOS' },
      { repo: 'adamant-explorer', description: 'Blockchain explorer' },
      { repo: 'pool', description: 'ADAMANT forging pool' },
      { repo: 'adamant-airdrop', description: 'Airdrop distribution tool' },
      { repo: 'currencyinfo', description: 'Self-hosted currency rates service' },
      { repo: 'ipfs-node', description: 'Distributed storage node' },
      { repo: 'ETH-transactions-storage', description: 'Ethereum transaction storage' },
      { repo: 'adamant-ns', description: 'ADAMANT naming service' },
      { repo: 'adamant-exchangebot', description: 'In-chat exchange bot' },
      { repo: 'adamant-chatgpt', description: 'AI chatbot integration' },
      { repo: 'adamant-tradebot', description: 'Trading and market-making bot' },
      { repo: 'adamant-2fa', description: 'Blockchain-based 2FA service' },
      { repo: 'docs', description: 'ADAMANT documentation' },
      { repo: 'adamant-schema', description: 'Transaction schema definitions' },
      { repo: 'AIPs', description: 'ADAMANT Improvement Proposals' },
      { repo: 'adamant-wallets', description: 'Wallet integrations and tools' },
    ],
    releaseRepos: [
      'adamant',
      'adamant-api-jsclient',
      'adamant-console',
      'adamant-im',
      'adamant-iOS',
      'adamant-explorer',
      'pool',
      'adamant-airdrop',
      'currencyinfo',
      'ipfs-node',
      'ETH-transactions-storage',
      'adamant-ns',
      'adamant-exchangebot',
      'adamant-chatgpt',
      'adamant-tradebot',
      'adamant-2fa',
    ],
    discussions: {
      org: 'Adamant-im',
      repository: '.github',
      authorsFilter: 'org-members',
      includeOnlyFirstPost: true,
    },
  },

  medium: {
    feedUrl: 'https://medium.com/feed/adamant-im',
  },

  sync: {
    contentCron: '19 6 * * *',
    starsOnDeploy: true,
    batchSize: 10,
    dedupStateFile: 'content/.sync-state.json',
  },

  seo: {
    defaultOgImage: '/og-image.png',
    references: [
      'https://github.com/Adamant-im',
      'https://medium.com/adamant-im',
      'https://x.com/adamant_im',
    ],
  },

} as const;

export type SiteConfig = typeof siteConfig;
