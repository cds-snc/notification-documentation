let baseURL = null
const publicUrl = process.env.PUBLIC_URL

if (publicUrl) {
  baseURL = publicUrl.endsWith("/") ? publicUrl : publicUrl + "/"
}

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

  title: "GC Notify | GC Notification",
  base: baseURL || null,

  locales: {
    '/en/': {
      lang: 'en-CA',
      title: "GC Notify | Documentation",
      description: 'Integrate directly with the GC Notify API'
    },
    '/fr/': {
      lang: 'fr-CA',
      title: 'GC Notification | Documentation',
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
    smoothScroll: true,
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
        sidebarDepth: 1,
        sidebar: {
          '/en/': [
            '/en/',
            '/en/start',
            '/en/send',
            '/en/status',
            '/en/testing',
            '/en/keys',
            '/en/limits',
            '/en/callbacks',
            '/en/architecture',
            '/en/clients',
    {
     title: 'Collapsible menu',
     collapsable: true,
     children: [
      '/en/start',
      '/en/send',
     ]
   }
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
        sidebarDepth: 1,
        sidebar: {
          '/fr/': [
            '/fr/',
            '/fr/start',
            '/fr/send',
            '/fr/status',
            '/fr/testing',
            '/fr/keys',
            '/fr/limits',
            '/fr/callbacks',
            '/fr/architecture',
            '/fr/clients',
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
