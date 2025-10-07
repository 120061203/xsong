// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
	site: 'https://xsong.us',
	base: process.env.NODE_ENV === 'development' ? '/' : '/blog',
	integrations: [mdx(), sitemap()],
	outDir: '../public/blog',
	server: {
		port: 4321,
		host: true
	},

  vite: {
    plugins: [tailwindcss()],
  },

  image: {
    // Astro 5.x 的圖片優化配置
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    // 啟用自動格式轉換
    domains: [],
    remotePatterns: []
  },
});