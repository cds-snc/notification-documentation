<script setup>
import { onMounted } from 'vue'
import { withBase } from 'vuepress/client'

// The root page has no content of its own: it forwards visitors to the English
// or French documentation based on their browser language. Runs on the client
// only; the static build renders the no-script fallback links below.
onMounted(() => {
  const browserLocales =
    navigator.languages === undefined ? [navigator.language] : navigator.languages
  const lang = (browserLocales[0] || 'en').substring(0, 2)
  window.location.replace(withBase(lang === 'fr' ? 'fr/' : 'en/'))
})
</script>

<template>
  <main class="redirect-fallback">
    <noscript>
      <p>
        <a :href="withBase('en/')">English</a> &middot;
        <a :href="withBase('fr/')">Français</a>
      </p>
    </noscript>
  </main>
</template>
