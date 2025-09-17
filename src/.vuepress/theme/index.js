const path = require('path')

module.exports = {
  extend: '@vuepress/theme-default',
  alias: {
    '@SearchBox': path.resolve(__dirname, 'components/SearchBox.vue'),
  }
}
