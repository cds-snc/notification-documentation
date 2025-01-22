<template>
  <ParentLayout>
    <template #sidebar-top>
      <div class="back-to-notify">
        <ParentNavLink :item="{ link: backToLink, text: backToText }" v-if="backToText" />
      </div>
      <div class="back-to-notify">
        <ParentNavLink :item="{ link: anotherLink, text: anotherText }" v-if="anotherText" />
      </div>
    </template>
  </ParentLayout>
</template>

<script>
import ParentLayout from '@parent-theme/layouts/Layout.vue'
import ParentNavLink from '@parent-theme/components/NavLink.vue'

export default {
  name: 'Layout',
  components: {
    ParentLayout,
    ParentNavLink,
  },
  computed: {
    backToLink() {
      return this.$themeLocaleConfig.backToNotifyLink
    },
    backToText() {
      return this.$themeLocaleConfig.backToNotifyText
    },
    anotherLink() {
      return this.$themeLocaleConfig.backToGuidanceLink
    },
    anotherText() {
      return this.$themeLocaleConfig.backToGuidanceText
    }
  }
}
</script>
<style lang="stylus">
.back-to-notify
  margin-top 1rem
  padding 1em 0 1em 1.5em
  border-bottom 1px solid $borderColor
  a
    color $textColor
@media (max-width: $MQMobile)
  .back-to-notify
    margin-top 0
</style>