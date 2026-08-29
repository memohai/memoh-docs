import { defineConfig } from 'vitepress'
import { en } from './en'
import { zh } from './zh'

// https://vitepress.vuejs.org/config/app-configs
export default defineConfig({
  title: 'Memoh Documentation',
  description: 'Multi-member long-memory AI agent platform with desktop and server deploy modes.',

  head: [
    ['link', { rel: 'icon', href: '/logo.svg' }]
  ],

  base: '/',

  locales: {
    root: {
      label: 'English',
      lang: 'en',
      themeConfig: {
        nav: [
          { text: 'Guides', link: '/guides/' },
          { text: 'Integrations', link: '/integrations/' },
          { text: 'Self-hosted', link: '/self-hosted/' },
        ],
      },
    },
    zh: {
      label: '简体中文',
      lang: 'zh',
      themeConfig: {
        nav: [
          { text: '教程', link: '/zh/guides/' },
          { text: '集成', link: '/zh/integrations/' },
          { text: '自托管', link: '/zh/self-hosted/' },
        ],
      },
    }
  },

  themeConfig: {
    siteTitle: 'Memoh',
    sidebar: {
      ...en,
      ...zh,
    },

    nav: [
      { text: 'Guides', link: '/guides/' },
      { text: 'Integrations', link: '/integrations/' },
      { text: 'Self-hosted', link: '/self-hosted/' },
    ],

    logo: {
      src: '/logo.svg',
      alt: 'Memoh'
    },
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/felinics/Memoh' }
    ],
    
    footer: {
      message: 'Published under AGPLv3',
      copyright: 'Copyright © 2024-present Memoh'
    },
    
    search: {
      provider: 'local'
    },
    
    editLink: {
      pattern: 'https://github.com/felinics/memoh-docs/edit/main/docs/:path',
      text: 'Edit on GitHub'
    },
    
    lastUpdated: {
      text: 'Last Updated',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    }
  },

  ignoreDeadLinks: true,
})
