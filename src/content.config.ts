import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
import { siteConfig } from '../config/site.ts';

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    cta: z.string(),
    layoutStyle: z.enum([
      'accordion',
      'cards',
      'split',
      'timeline',
      'checklist',
      'narrative',
    ]),
    proofLinks: z
      .array(
        z.object({
          label: z.string(),
          url: z.url(),
        }),
      )
      .optional(),
  }),
});

const localeIds = siteConfig.locales.map((locale) => locale.id) as [
  (typeof siteConfig.locales)[number]['id'],
  ...(typeof siteConfig.locales)[number]['id'][],
];

const notes = defineCollection({
  loader: glob({
    pattern: '**/*.md',
    base: './src/content/notes',
    generateId: ({ entry }) => entry.replace(/\.md$/, ''),
  }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    locale: z.enum(localeIds),
    category: z.enum(['article', 'release', 'discussion']),
    source: z.enum(['medium', 'github']),
    sourceUrl: z.url(),
    publishedAt: z.coerce.date(),
    author: z.string(),
    authorUrl: z.url().optional(),
    sourceAccount: z.string().optional(),
    repo: z.string().optional(),
    tag: z.string().optional(),
    prerelease: z.boolean().optional(),
    discussionCategory: z.string().optional(),
    coverImage: z.string().startsWith('/').optional(),
    cardSpan: z.enum(['full', 'half']),
    originalId: z.string(),
    placeholder: z.boolean(),
  }),
});

export const collections = { services, notes };
