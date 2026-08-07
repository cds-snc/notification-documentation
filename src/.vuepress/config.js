import process from 'node:process'
import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'
import { searchPlugin } from '@vuepress/plugin-search'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { markdownIncludePlugin } from '@vuepress/plugin-markdown-include'
import { getDirname, path } from 'vuepress/utils'
import dotenv from 'dotenv'

dotenv.config()

const __dirname = getDirname(import.meta.url)

const apiBaseUrl = process.env.API_BASE_URL || 'https://api.notification.canada.ca'

let base = '/'
const publicUrl = process.env.PUBLIC_URL
if (publicUrl) {
  base = publicUrl.endsWith('/') ? publicUrl : publicUrl + '/'
}

export default defineUserConfig({
  base,
  lang: 'en-CA',
  title: 'GC Notify | Notification GC',

  head: [
    // Build-time default. Preserved for static builds (GitHub Pages) and local
    // development where the value comes from process.env.API_BASE_URL / .env.
    ['script', {}, `window.__API_BASE_URL__ = ${JSON.stringify(apiBaseUrl)};`],
    // Runtime override. In containerised deployments this file is regenerated at
    // container startup from the API_BASE_URL env var (see docker-entrypoint.sh),
    // which lets a single image serve staging and production against the correct API.
    ['script', { src: `${base}env-config.js` }],
    ['meta', { charset: 'utf-8' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'shortcut icon', href: 'https://notification.canada.ca/static/images/favicon.ico' }],
    // Google Tag Manager
    ['script', {}, `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-KRKRZQV');
    `],
    // Google Analytics 4
    ['script', { async: true, src: 'https://www.googletagmanager.com/gtag/js?id=G-R04KFLQCVQ' }],
    ['script', {}, `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-R04KFLQCVQ', {anonymize_ip: true});
    `],
  ],

  locales: {
    '/en/': {
      lang: 'en-CA',
      title: 'GC Notify',
      description: 'Integrate directly with the GC Notify API',
    },
    '/fr/': {
      lang: 'fr-CA',
      title: 'Notification GC',
      description: 'Intégration directe à l`API Notification GC',
    },
  },

  // Underscore-prefixed markdown files are partials injected into other pages via
  // `@include`, so they must not be rendered as standalone pages.
  pagePatterns: ['**/*.md', '!.vuepress', '!node_modules', '!**/_*.md'],

  // Override default-theme internals:
  // - VPNavbarBrand: renders the localized site subtitle beside the site name.
  // - useNavbarSelectLanguage: disables the built-in language dropdown because the
  //   English and French pages use different slugs; the EN/FR toggle is provided
  //   by the custom LanguageLink component instead.
  alias: {
    '@theme/VPNavbarBrand.vue': path.resolve(__dirname, 'theme/components/VPNavbarBrand.vue'),
    '@theme/useNavbarSelectLanguage': path.resolve(__dirname, 'theme/composables/useNavbarSelectLanguage.js'),
  },

  theme: defaultTheme({
    logo: 'https://assets.notification.canada.ca/static/gov-canada-en.svg',
    editLink: true,
    docsRepo: 'cds-snc/notification-documentation',
    docsDir: 'src',
    docsBranch: 'main',
    lastUpdated: true,
    contributors: false,
    locales: {
      '/en/': {
        logo: 'https://assets.notification.canada.ca/static/gov-canada-en.svg',
        siteSubtitle: 'API documentation',
        backToNotifyLink: 'https://notification.canada.ca',
        backToNotifyText: 'Back to GC Notify',
        backToGuidanceLink: 'https://notification.canada.ca/guidance',
        backToGuidanceText: 'Visit Guidance',
        editLinkText: 'Edit this page on GitHub (opens in a new tab)',
        lastUpdatedText: 'Last updated',
        navbar: [],
        sidebarDepth: 1,
        sidebar: [
          '/en/',
          '/en/start.md',
          '/en/send.md',
          '/en/manage-template.md',
          '/en/template-categories.md',
          '/en/status.md',
          '/en/testing.md',
          '/en/keys.md',
          '/en/limits.md',
          '/en/callbacks.md',
          '/en/architecture.md',
          '/en/clients.md',
          '/en/apispec.md',
        ],
      },
      '/fr/': {
        logo: 'https://assets.notification.canada.ca/static/gov-canada-fr.svg',
        siteSubtitle: 'Documentation API',
        backToNotifyLink: 'https://notification.canada.ca?lang=fr',
        backToNotifyText: 'Retour à Notification GC',
        backToGuidanceLink: 'https://notification.canada.ca/guides-reference',
        backToGuidanceText: 'Guides de référence',
        editLinkText: 'Modifier cette page sur GitHub (ouvre dans un nouvel onglet)',
        lastUpdatedText: 'Dernière mise à jour',
        navbar: [],
        sidebarDepth: 1,
        sidebar: [
          '/fr/',
          '/fr/commencer.md',
          '/fr/envoyer.md',
          '/fr/gerer-gabarits.md',
          '/fr/categories-gabarits.md',
          '/fr/etat.md',
          '/fr/essai.md',
          '/fr/cles.md',
          '/fr/limites.md',
          '/fr/rappel.md',
          '/fr/architecture.md',
          '/fr/clients.md',
          '/fr/apispec.md',
        ],
      },
    },
  }),

  plugins: [
    searchPlugin({
      maxSuggestions: 10,
    }),
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, 'components'),
    }),
    markdownIncludePlugin(),
  ],

  bundler: viteBundler({
    viteOptions: {
      server: {
        proxy: {
          '/v2': {
            target: apiBaseUrl,
            changeOrigin: true,
          },
        },
      },
    },
  }),
})
