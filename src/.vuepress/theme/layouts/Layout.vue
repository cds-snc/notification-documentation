<template>
  <ParentLayout>
    <template #sidebar-top>
      <div class="back-to-notify">
        <NavLink :item='{"link": backToLink, "text": backToText}' />
      </div>
    </template>
  </ParentLayout>
</template>

<script>
import ParentLayout from '@parent-theme/layouts/Layout.vue'
import NavLink from '@parent-theme/components/NavLink.vue'

export default {
  name: 'Layout',
  components: {
    ParentLayout,
    NavLink,
  },
  computed: {
    backToLink() {
      return this.$themeLocaleConfig.backToNotifyLink
    },
    backToText() {
      return this.$themeLocaleConfig.backToNotifyText
    }
  }
}
</script>
<style lang="stylus">
.back-to-notify
  padding 1em 0 1em 1.5em
  border-bottom 1px solid $borderColor
  a
    color $textColor
</style>
