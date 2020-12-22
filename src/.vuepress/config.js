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
      title: "GC Notify technical documentation",
      description: 'Learn about the GC Notify API'
    },
    '/fr/': {
      lang: 'fr-CA',
      title: 'Documentation technique de GC Notification',
      description: 'En savoir plus sur l&lsquo;API GC Notification'
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
    docsBranch: 'main',
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
          { text: "Back to GC Notify", link: 'https://notification.canada.ca' },
          { text: "Contact us", link: 'https://notification.canada.ca/contact' },
        ],
        sidebarDepth: 2,
        sidebar: {
          '/en/': [
            '/en/',
            '/en/callbacks',
            '/en/limits',
            '/en/api',
            {
             title: 'Clients',
             collapsable: true,
             children: [
              '/en/python',
              '/en/java',
             ]
           }
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
            buttonText: "Rafraichir"
          }
        },
        nav: [
          { text: "GC Notification's website", link: 'https://notification.canada.ca' },
          { text: "Nous contacter", link: 'https://notification.canada.ca/contact' },
        ],
        sidebar: {
          '/fr/': [
            '/fr/',
            '/fr/api',
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
