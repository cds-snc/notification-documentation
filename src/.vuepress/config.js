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
    ['meta', { charset: 'utf-8' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: "shortcut icon", href: "https://notification.canada.ca/static/images/favicon.ico" }],
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
  title: "GC Notify | Notification GC",
  base: baseURL || null,
  locales: {
    '/en/': {
      lang: 'en-CA',
      title: "GC Notify",
      description: 'Integrate directly with the GC Notify API'
    },
    '/fr/': {
      lang: 'fr-CA',
      title: 'Notification GC',
      description: 'Intégration directe à l`API Notification GC'
    }
  },
  markdown: {
    anchor: {
      permalink: true,
      permalinkSymbol: '#',
      permalinkAttrs: (slug, state) => ({ 'aria-hidden': 'true', 'tabindex': -1 })
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
    docsRepo: 'cds-snc/notification-documentation',
    docsDir: 'src',
    docsBranch: 'main',
    smoothScroll: true,
    locales: {
      '/en/': {
        logo: 'https://assets.notification.canada.ca/static/gov-canada-en.svg',
        selectText: 'Languages',
        label: 'English',
        ariaLabel: 'Languages',
        siteSubtitle: 'API documentation',
        backToNotifyLink: 'https://notification.canada.ca',
        backToNotifyText: 'Back to GC Notify',
        backToGuidanceLink: 'https://notification.canada.ca/guidance',
        backToGuidanceText: 'Visit Guidance',
        editLinkText: 'Edit this page on GitHub (opens in a new tab)',
        lastUpdated: 'Last updated',
        serviceWorker: {
          updatePopup: {
            message: "New content is available.",
            buttonText: "Refresh"
          }
        },
        nav: [
          { text: "Français", link: '/fr/' },
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
            '/en/apispec'
          ]
        }
      },
      '/fr/': {
        logo: 'https://assets.notification.canada.ca/static/gov-canada-fr.svg',
        selectText: 'Langues',
        label: 'Français',
        ariaLabel: 'Langues',
        siteSubtitle: 'Documentation API',
        backToNotifyLink: 'https://notification.canada.ca?lang=fr',
        backToNotifyText: 'Retour à Notification GC',
        backToGuidanceLink: 'https://notification.canada.ca/guides-reference',
        backToGuidanceText: 'Guides de référence',
        editLinkText: 'Modifier cette page sur GitHub (ouvre dans un nouvel onglet)',
        lastUpdated: 'Dernière mise à jour ',
        serviceWorker: {
          updatePopup: {
            message: "Du nouveau contenu est disponible.",
            buttonText: "Actualiser"
          }
        },
        nav: [
          { text: "English", link: '/en/' },
        ],
        sidebarDepth: 1,
        sidebar: {
          '/fr/': [
            '/fr/',
            '/fr/commencer',
            '/fr/envoyer',
            '/fr/etat',
            '/fr/essai',
            '/fr/cles',
            '/fr/limites',
            '/fr/rappel',
            '/fr/architecture',
            '/fr/clients',
            '/fr/apispec'
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
    ''
  ],
  chainWebpack: (config, isServer) => {
    const jsRule = config.module.rule('js');

    // Clear the existing exclude condition(s)
    jsRule.exclude.clear();

    // Add a new exclude function
    jsRule.exclude.add(filepath => {
      // Transpile .vue.js files (standard VuePress behavior)
      if (/\.vue\.js$/.test(filepath)) {
        return false;
      }

      // Transpile 'swagger-ui-dist' from node_modules
      if (/[\\/]node_modules[\\/]swagger-ui-dist/.test(filepath)) {
        return false; // Do not exclude: transpile this
      }

      // If you were also transpiling swagger-editor, you'd keep its rule:
      // if (/[\\/]node_modules[\\/]swagger-editor/.test(filepath)) {
      //   return false;
      // }

      // Exclude other node_modules
      if (/[\\/]node_modules/.test(filepath)) {
        return true; // Exclude these
      }

      // Do not exclude project source files (or other files not in node_modules)
      return false;
    });

    // If you still need the 'global' definition (e.g., if swagger-ui-dist or another dep needs it)
    // keep this part. If not, you might be able to remove it.
    if (config.plugins.has('vuepress-defines')) {
      config.plugin('vuepress-defines').tap(args => {
        args[0] = typeof args[0] === 'object' && args[0] !== null ? args[0] : {};
        args[0]['global'] = 'window';
        return args;
      });
    }
  }
}
