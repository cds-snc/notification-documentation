<script setup>
import ParentLayout from '@vuepress/theme-default/layouts/Layout.vue'
import BackLinks from '../components/BackLinks.vue'
import LanguageLink from '../components/LanguageLink.vue'
</script>

<template>
  <ParentLayout>
    <template #sidebar-top>
      <BackLinks />
    </template>
    <template #navbar-after>
      <LanguageLink />
    </template>
  </ParentLayout>
</template>
