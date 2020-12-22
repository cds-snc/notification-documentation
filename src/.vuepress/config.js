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
      description: 'Documentation for learning how to integrate directly with the GC Notify API'
    },
    '/fr/': {
      lang: 'fr-CA',
      title: 'Documentation technique',
      description: 'Documentation pour en savoir plus sur comment intégrer directement l`API GC Notification'
    }
  },

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    logo: 'https://assets.notification.canada.ca/static/gov-canada-en.svg',
    repo: 'cds-snc/notification-documentation',
    editLinks: true,
    lastUpdated: false,
    nextLinks: false,
    prevLinks: false,
    docsDir: 'src',
    docsBranch: false,
    locales: {
      '/en/': {
        selectText: 'Languages',
        label: 'English',
        ariaLabel: 'Languages',
        editLinkText: 'Edit this page on GitHub',	
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
        nav: [
          { text: "GC Notify", link: 'https://notification.canada.ca' },
          { text: "Contact us", link: 'https://notification.canada.ca/contact' },
        ],
        sidebarDepth: 2,
        sidebar: {
          '/en/': [
            '/en/',
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
        serviceWorker: {
          updatePopup: {
            message: "Du nouveau contenu est disponible.",
            buttonText: "Actualiser"
          }
        },
        nav: [
          { text: "GC Notification", link: 'https://notification.canada.ca?lang=fr' },
          { text: "Nous joindre", link: 'https://notification.canada.ca/contact?lang=fr' },
        ],
        sidebar: {
          '/fr/': [
            '/fr/',
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
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
  ]
}
