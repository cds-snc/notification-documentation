<script setup>
import { computed } from 'vue'
import { useData } from '@vuepress/theme-default/client'

const { themeLocale } = useData()

const backToNotifyLink = computed(() => themeLocale.value.backToNotifyLink)
const backToNotifyText = computed(() => themeLocale.value.backToNotifyText)
const backToGuidanceLink = computed(() => themeLocale.value.backToGuidanceLink)
const backToGuidanceText = computed(() => themeLocale.value.backToGuidanceText)
</script>

<template>
  <div class="back-to-notify" v-if="backToNotifyText">
    <a :href="backToNotifyLink">{{ backToNotifyText }}</a>
  </div>
  <div class="back-to-notify" v-if="backToGuidanceText">
    <a :href="backToGuidanceLink">{{ backToGuidanceText }}</a>
  </div>
</template>

<style lang="scss">
.back-to-notify {
  margin-top: 1rem;
  padding: 1em 0 1em 1.5em;
  border-bottom: 1px solid var(--vp-c-divider);

  a {
    color: var(--vp-c-text);
  }

  @media (max-width: 719px) {
    margin-top: 0;
  }
}
</style>
