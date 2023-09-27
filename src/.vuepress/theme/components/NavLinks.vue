<!--
This file has been modified to remove the "locales" dropdown.
The change has been done on the "nav" computed property
-->
<template>
  <nav
    v-if="userLinks.length || repoLink"
    class="nav-links"
  >
    <!-- user links -->
    <div
      v-for="item in userLinks"
      :key="item.link"
      class="nav-item"
    >
      <DropdownLink
        v-if="item.type === 'links'"
        :item="item"
      />
      <NavLink
        v-else
        :item="item"
      />
    </div>

    <!-- repo link -->
    <a
      v-if="repoLink"
      :href="repoLink"
      class="repo-link"
      target="_blank"
      rel="noopener noreferrer"
    >
      {{ repoLabel }}
      <OutboundLink />
    </a>
  </nav>
</template>

<script>
import DropdownLink from '@parent-theme/components/DropdownLink.vue'
import { resolveNavLinkItem } from '@parent-theme/util'
import NavLink from '@parent-theme/components/NavLink.vue'

export default {
  name: 'NavLinks',

  components: {
    NavLink,
    DropdownLink
  },

  computed: {
    userNav () {
      const mappings = [
        {"en": "/", "fr": "/"},
        {"en": "/en/", "fr": "/fr/"},
        {"en": "/en/start", "fr": "/fr/commencer"},
        {"en": "/en/send", "fr": "/fr/envoyer"},
        {"en": "/en/status", "fr": "/fr/etat"},
        {"en": "/en/testing", "fr": "/fr/essai"},
        {"en": "/en/keys", "fr": "/fr/cles"},
        {"en": "/en/limits", "fr": "/fr/limites"},
        {"en": "/en/callbacks", "fr": "/fr/rappel"},
        {"en": "/en/architecture", "fr": "/fr/architecture"},
        {"en": "/en/clients", "fr": "/fr/clients"},
        {"en": "/en/_api_endpoints", "fr": "/fr/clients"},
        {"en": "/en/_arg_template_id", "fr": "/fr/_arg_template_id"},
      ]
      const currentUrl = this.$page.path.split(".html")[0]
      const lang = currentUrl.split('/')[1]
      // Workaround: During building, VuePress checks NavLinks against known routes
      // In this method we depend on /en/ or /fr/ to exist in the url. This is not the case
      // for the root "/". Once the app is running, "/" redirects to either '/en/' or '/fr/'
      // this "context" isn't available during the build process, similar to how the window object
      // is not available during a build and hence will fail if we used it here to get the current url.
      if (lang == '') return this.$themeLocaleConfig.nav || this.$site.themeConfig.nav || []
      const otherLang = {"en": "fr", "fr": "en"}[lang]
      const url = mappings.find(url => url[lang] == currentUrl)
      const txt = lang == 'fr' ? "English" : "Français"
      const link = url[otherLang]
      return [{"text": txt, "link": link, "type": "link", "items": []}]
    },

    nav () {
      return this.userNav
    },

    userLinks () {
      return (this.nav || []).map(link => {
        return Object.assign(resolveNavLinkItem(link), {
          items: (link.items || []).map(resolveNavLinkItem)
        })
      })
    },

    repoLink () {
      const { repo } = this.$site.themeConfig
      if (repo) {
        return /^https?:/.test(repo)
          ? repo
          : `https://github.com/${repo}`
      }
      return null
    },

    repoLabel () {
      if (!this.repoLink) return
      if (this.$site.themeConfig.repoLabel) {
        return this.$site.themeConfig.repoLabel
      }

      const repoHost = this.repoLink.match(/^https?:\/\/[^/]+/)[0]
      const platforms = ['GitHub', 'GitLab', 'Bitbucket']
      for (let i = 0; i < platforms.length; i++) {
        const platform = platforms[i]
        if (new RegExp(platform, 'i').test(repoHost)) {
          return platform
        }
      }

      return 'Source'
    }
  }
}
</script>

<style lang="stylus">
.nav-links
  display inline-block
  a
    line-height 1.4rem
    color inherit
    &:hover, &.router-link-active
      color $accentColor
  .nav-item
    position relative
    display inline-block
    margin-left 1.5rem
    line-height 2rem
    &:first-child
      margin-left 0
  .repo-link
    margin-left 1.5rem

@media (max-width: $MQMobile)
  .nav-links
    .nav-item, .repo-link
      margin-left 0

@media (min-width: $MQMobile)
  .nav-links a
    &:hover, &.router-link-active
      color $textColor
  .nav-item > a:not(.external)
    &:hover, &.router-link-active
      margin-bottom -2px
      border-bottom 2px solid lighten($accentColor, 8%)
</style>
