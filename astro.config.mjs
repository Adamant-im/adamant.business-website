// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import { siteConfig } from './config/site.ts';

/** @type {import('astro').AstroUserConfig} */
export default defineConfig({
  site: siteConfig.site.url,
  output: 'static',
  i18n: {
    // Locale paths and codes are defined in config/site.ts (Phase 2 pages)
    locales: ['en', 'zh', 'es', 'ru', 'ar', 'fr', 'ja', 'de'],
    defaultLocale: 'en',
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), sitemap()],
});
