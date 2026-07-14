// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import rehypeSanitize from 'rehype-sanitize';
import { siteConfig } from './config/site.ts';

/** @type {import('astro').AstroUserConfig} */
export default defineConfig({
  site: siteConfig.site.url,
  output: 'static',
  trailingSlash: 'ignore',
  i18n: {
    locales: siteConfig.locales.map((locale) => locale.id),
    defaultLocale: siteConfig.defaultLocale,
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), sitemap()],
  markdown: {
    processor: unified({ rehypePlugins: [rehypeSanitize] }),
  },
});
