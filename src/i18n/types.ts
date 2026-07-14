import type { siteConfig } from '../../config/site.ts';

export type LocaleId = (typeof siteConfig.locales)[number]['id'];

export interface FaqItem {
  question: string;
  answer: string;
}

export interface UiStrings {
  meta: {
    homeTitle: string;
    homeDescription: string;
  };
  header: {
    contact: string;
  };
  contact: {
    title: string;
    subtitle: string;
    email: string;
    adamant: string;
    openAdamant: string;
    telegram: string;
    close: string;
    primaryCta: string;
  };
  home: {
    heroTitle: string;
    heroBody: string;
    seeServices: string;
    statYears: string;
    statRepos: string;
    statKeys: string;
    whyEyebrow: string;
    whyTitle: string;
    whyBody: string;
    trustOperatorsTitle: string;
    trustOperatorsBody: string;
    trustSelfHostedTitle: string;
    trustSelfHostedBody: string;
    trustNoHypeTitle: string;
    trustNoHypeBody: string;
    servicesEyebrow: string;
    servicesTitle: string;
    servicesBody: string;
    learnMore: string;
    processEyebrow: string;
    processTitle: string;
    processScopeTitle: string;
    processScopeBody: string;
    processForgeTitle: string;
    processForgeBody: string;
    processTemperTitle: string;
    processTemperBody: string;
    processRunTitle: string;
    processRunBody: string;
    ossEyebrow: string;
    ossTitle: string;
    ossBody: string;
    notesEyebrow: string;
    notesTitle: string;
    notesBody: string;
    ctaEyebrow: string;
    ctaTitle: string;
    ctaBody: string;
    faqEyebrow: string;
    faqTitle: string;
  };
  engineeringNotes: {
    eyebrow: string;
    title: string;
    intro: string;
    article: string;
    release: string;
    released: string;
    discussion: string;
    latestTitle: string;
    viewAll: string;
    previous: string;
    next: string;
    original: string;
    placeholder: string;
    github: string;
    empty: string;
    pageTitle: string;
  };
  footer: {
    tagline: string;
    services: string;
    contact: string;
    telegramPrefix: string;
    adamant: string;
    github: string;
    motto: string;
  };
  servicePage: {
    eyebrow: string;
    shippedEyebrow: string;
    openSourceRef: string;
    overview: string;
    openSourceExamples: string;
    startEyebrow: string;
    startBody: string;
    otherDirections: string;
  };
  language: {
    switcherLabel: string;
    keepEnglish: string;
    promptPrefix: string;
    versionLink: string;
  };
  faq: FaqItem[];
}
