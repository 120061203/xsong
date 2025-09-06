// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	site: 'https://xsong.us',
	base: '/blog',
	integrations: [mdx(), sitemap()],
	outDir: '../public/blog',
	server: {
		port: 4321,
		host: true
	},

  vite: {
    plugins: [tailwindcss()],
  },
});