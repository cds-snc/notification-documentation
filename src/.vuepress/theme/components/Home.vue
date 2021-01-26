<template>
</template>

<script>
export default {
  name: 'Home',

  mounted() {
    const browserLocales = navigator.languages === undefined ? [navigator.language] : navigator.languages;
    const lang = browserLocales[0].substring(0, 2);

    if (lang === 'fr') {
      window.location.replace(window.location.href + 'fr/');
    } else {
      window.location.replace(window.location.href + 'en/');
    }
  }
}
</script>
