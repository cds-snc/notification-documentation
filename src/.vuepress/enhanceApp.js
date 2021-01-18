/**
 * Client app enhancement file.
 *
 * https://v1.vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
 */

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  // ...apply enhancements for the site.
}

// Temporary fix for code blocks not showing up after
// a reload
// https://github.com/vuejs/vuepress/issues/2711
import Vue from 'vue'
import CodeBlock from "@parent-theme/global-components/CodeBlock"
import CodeGroup from "@parent-theme/global-components/CodeGroup"

// Register the Vue global component
Vue.component(CodeBlock)
Vue.component(CodeGroup)
