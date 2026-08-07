<script setup>
import { computed } from 'vue'
import { RouteLink } from 'vuepress/client'
import { useData } from '@vuepress/theme-default/client'

const { page, routeLocale } = useData()

// English and French pages use different slugs, so the built-in language switch
// (which only swaps the locale prefix) cannot map between them. This table pairs
// each English page with its French equivalent.
const mappings = [
  { en: '/en/', fr: '/fr/' },
  { en: '/en/start', fr: '/fr/commencer' },
  { en: '/en/send', fr: '/fr/envoyer' },
  { en: '/en/manage-template', fr: '/fr/gerer-gabarits' },
  { en: '/en/template-categories', fr: '/fr/categories-gabarits' },
  { en: '/en/status', fr: '/fr/etat' },
  { en: '/en/testing', fr: '/fr/essai' },
  { en: '/en/keys', fr: '/fr/cles' },
  { en: '/en/limits', fr: '/fr/limites' },
  { en: '/en/callbacks', fr: '/fr/rappel' },
  { en: '/en/architecture', fr: '/fr/architecture' },
  { en: '/en/clients', fr: '/fr/clients' },
  { en: '/en/apispec', fr: '/fr/apispec' },
]

const normalize = (p) => (p.endsWith('/') ? p : `${p}.html`)

const lang = computed(() => {
  if (routeLocale.value === '/fr/') return 'fr'
  if (routeLocale.value === '/en/') return 'en'
  return ''
})

const target = computed(() => {
  const current = page.value.path.replace(/\.html$/, '')
  const from = lang.value
  const to = from === 'fr' ? 'en' : 'fr'
  const match = mappings.find((m) => m[from] === current)
  return normalize(match ? match[to] : `/${to}/`)
})

const text = computed(() => (lang.value === 'fr' ? 'English' : 'Français'))
</script>

<template>
  <RouteLink v-if="lang" :to="target" class="language-link">
    {{ text }}
  </RouteLink>
</template>

<style lang="scss">
.language-link {
  display: inline-block;
  margin-inline-start: 1.5rem;
  line-height: var(--navbar-line-height);
  color: inherit;

  &:hover,
  &.route-link-active {
    color: var(--vp-c-accent);
  }

  @media (max-width: 719px) {
    margin-inline-start: 0;
  }
}
</style>
