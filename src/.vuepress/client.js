import { defineClientConfig } from 'vuepress/client'
import Layout from './theme/layouts/Layout.vue'
import Redirect from './theme/layouts/Redirect.vue'

export default defineClientConfig({
  // Override the default-theme `Layout` and register a `Redirect` layout used by
  // the root page to send visitors to their preferred language.
  layouts: {
    Layout,
    Redirect,
  },
})
