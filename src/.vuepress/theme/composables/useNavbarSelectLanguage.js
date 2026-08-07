import { computed } from 'vue'

// Disables the default-theme language dropdown. The EN/FR toggle is provided by
// the custom LanguageLink component because the English and French pages use
// different slugs and cannot be mapped by swapping the locale prefix alone.
export const useNavbarSelectLanguage = () => computed(() => [])
