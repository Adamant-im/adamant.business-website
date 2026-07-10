import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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
          url: z.string().url(),
        }),
      )
      .optional(),
  }),
});

export const collections = { services };
