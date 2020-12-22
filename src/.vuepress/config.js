const { description } = require('../../package')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: description,

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  base: '/notification-documentation/',

  locales: {
    // The key is the path for the locale to be nested under.
    // As a special case, the default locale can use '/' as its path.
    '/en/': {
      lang: 'en-CA', // this will be set as the lang attribute on <html>
      title: "GC Notify's documentation",
      description: 'Vue-powered Static Site Generator'
    },
    '/fr/': {
      lang: 'fr-CA',
      title: 'Documentation de GC Notification',
      description: 'Vue 驱动的静态网站生成器'
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
    locales: {
      '/en/': {
        selectText: 'Languages',
        // label for this locale in the language dropdown
        label: 'English',
        // Aria Label for locale in the dropdown
        ariaLabel: 'Languages',
        // text for the edit-on-github link
        editLinkText: 'Edit this page on GitHub',
        // config for Service Worker
        title: 'GC Notify',
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
        nav: [
          { text: "GC Notify's website", link: 'https://notification.canada.ca' },
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
        // label for this locale in the language dropdown
        label: 'Français',
        // Aria Label for locale in the dropdown
        ariaLabel: 'Langues',
        // text for the edit-on-github link
        editLinkText: 'Modifier cette page sur GitHub',
        // config for Service Worker
        title: 'Documentation de GC Notification',
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
