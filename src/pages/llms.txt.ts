import { getEntry } from 'astro:content';

import { siteConfig } from '../../config/site.ts';
import { getUiStrings, localePath } from '../i18n';

export const prerender = true;

function absoluteUrl(pathname: string): string {
  return new URL(pathname, siteConfig.site.url).href;
}

export async function GET() {
  const lines = [
    `# ${siteConfig.site.name}`,
    '',
    `> ${siteConfig.site.heroTagline}.`,
    '',
    'cryptofoundry is an independent engineering organization that builds and maintains self-hosted crypto software, bots, payments, trading tools, wallets, nodes, and private communication infrastructure.',
    '',
    'Clients keep custody of their keys, funds, data, and infrastructure. cryptofoundry does not promise trading profits or artificial market activity.',
    '',
    'Its engineers have contributed to the separate ADAMANT open-source blockchain ecosystem since 2016.',
    '',
    '## Language editions',
    '',
  ];

  for (const locale of siteConfig.locales) {
    const ui = getUiStrings(locale.id);
    lines.push(`### ${locale.label} (${locale.codes[0]})`, '');
    lines.push(`- [${ui.meta.homeTitle}](${absoluteUrl(localePath(locale.id, '/'))}): ${ui.meta.homeDescription}`);

    for (const service of siteConfig.services) {
      const entry = await getEntry('services', `${locale.id}/${service.slug}`);
      if (!entry) throw new Error(`Service content not found: ${locale.id}/${service.slug}`);
      lines.push(
        `- [${entry.data.title}](${absoluteUrl(localePath(locale.id, `/${service.slug}`))}): ${entry.data.description}`,
      );
    }

    lines.push(
      `- [${ui.engineeringNotes.title}](${absoluteUrl(localePath(locale.id, '/engineering-notes'))}): ${ui.engineeringNotes.intro}`,
      '',
    );
  }

  lines.push(
    '## Contact',
    '',
    `- [Open contact options](${absoluteUrl('/#contact')})`,
    `- Email: ${siteConfig.contact.email}`,
    `- Telegram: ${siteConfig.contact.telegramUrl}`,
    `- ADAMANT Messenger: ${siteConfig.contact.adamantMessenger}`,
    '',
    '## Discovery',
    '',
    `- [XML sitemap](${absoluteUrl('/sitemap-index.xml')})`,
    ...siteConfig.seo.references.map((url) => `- ${url}`),
    '',
  );

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
