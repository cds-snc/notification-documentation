module.exports = {
  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'robots', content: 'noindex' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: "shortcut icon", href: "https://notification.canada.ca/static/images/favicon.ico"}],
  ],

  base: '/notification-documentation/',

  locales: {
    '/en/': {
      lang: 'en-CA',
      title: "Technical documentation",
      description: 'Integrate directly with the GC Notify API'
    },
    '/fr/': {
      lang: 'fr-CA',
      title: 'Documentation technique',
      description: 'Intégration directe à l`API GC Notification'
    }
  },

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    logo: 'https://assets.notification.canada.ca/static/gov-canada-en.svg',
    editLinks: true,
    lastUpdated: true,
    nextLinks: true,
    prevLinks: true,
    docsDir: 'src',
    docsBranch: 'main',
    locales: {
      '/en/': {
        selectText: 'Languages',
        label: 'English',
        ariaLabel: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        lastUpdated: 'Last updated',
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
        nav: [
          { text: "Back to GC Notify", link: 'https://notification.canada.ca' },
        ],
        sidebarDepth: 2,
        sidebar: {
          '/en/': [
            '/en/',
            '/en/baseurl',
            '/en/headers',
            '/en/send',
            '/en/status',
            '/en/testing',
            '/en/keys',
            '/en/limits',
            '/en/callbacks',
            '/en/architecture',
          ]
        }
      },
      '/fr/': {
        selectText: 'Langues',
        label: 'Français',
        ariaLabel: 'Langues',
        editLinkText: 'Modifier cette page sur GitHub',
        lastUpdated: 'Dernière mise à jour ',
        serviceWorker: {
          updatePopup: {
            message: "Du nouveau contenu est disponible.",
            buttonText: "Actualiser"
          }
        },
        nav: [
          { text: "Retour à GC Notification", link: 'https://notification.canada.ca?lang=fr' },
        ],
        sidebar: {
          '/fr/': [
            '/fr/',
            '/fr/baseurl',
            '/fr/headers',
            '/fr/send',
            '/fr/status',
            '/fr/testing',
            '/fr/keys',
            '/fr/limits',
            '/fr/callbacks',
            '/fr/architecture',
          ]
        }
      },
    },
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    [
      '@vuepress/last-updated',
      {
        transformer: (timestamp, lang) => {
          return new Date(timestamp).toLocaleDateString(lang)
        }
      },
    ],
    '@vuepress/back-to-top',
  ]
}
