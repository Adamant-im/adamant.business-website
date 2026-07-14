import {
  isMainModule,
  mapLimit,
} from './lib/content-utils.mjs';
import {
  findEnglishNoteBySlug,
  translateNoteToLocale,
  writeTranslatedNote,
} from './lib/translate-content.mjs';
import { siteConfig } from '../config/site.ts';

const TARGET_LOCALES = siteConfig.locales
  .map((locale) => locale.id)
  .filter((id) => id !== siteConfig.defaultLocale);

const TEST_SLUGS = [
  'your-token-deserves-a-real-market-not-a-loan-to-a-black-box-market-maker-42fcfb71beb3',
  'release-adamant-tradebot-v9-0-0-347857922',
  'discussion-56-marketmaking-app-update-6-new-languages-content-refresh-and-pricing-changes-10333867',
];

export async function translateContent({
  slugs = TEST_SLUGS,
  locales = TARGET_LOCALES,
  force = false,
} = {}) {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error('OPENROUTER_API_KEY is required');
  }

  const jobs = [];
  for (const slug of slugs) {
    const english = await findEnglishNoteBySlug(slug);
    for (const localeId of locales) {
      jobs.push({ slug, localeId, english });
    }
  }

  console.log(`Translating ${slugs.length} notes to ${locales.length} locales (${jobs.length} tasks)`);

  let changed = 0;
  let processed = 0;
  let errors = 0;

  const results = await mapLimit(jobs, 2, async ({ slug, localeId, english }) => {
    try {
      const translated = await translateNoteToLocale(english.frontmatter, english.body, localeId);
      const didChange = await writeTranslatedNote(english.fileName, localeId, translated);
      return { slug, localeId, changed: didChange };
    } catch (error) {
      console.error(`Failed ${slug} → ${localeId}: ${error.message}`);
      return { slug, localeId, error: error.message };
    }
  });

  for (const result of results) {
    if (result.error) {
      errors += 1;
      continue;
    }
    processed += 1;
    if (result.changed) changed += 1;
  }

  console.log(`Done: processed=${processed}, changed=${changed}, errors=${errors}`);
  return { processed, changed, errors };
}

if (isMainModule(import.meta.url)) {
  const args = new Set(process.argv.slice(2));
  const slugArg = process.argv.find((arg) => arg.startsWith('--slug='));
  const localeArg = process.argv.find((arg) => arg.startsWith('--locale='));

  const slugs = slugArg
    ? [slugArg.split('=')[1]]
    : args.has('--all')
      ? undefined
      : TEST_SLUGS;

  const locales = localeArg
    ? [localeArg.split('=')[1]]
    : TARGET_LOCALES;

  await translateContent({
    slugs,
    locales,
    force: args.has('--force'),
  });
}
