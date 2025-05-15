<template>
  <div :id="domId"></div>
</template>

<script>
import SwaggerUIBundle from 'swagger-ui-dist/swagger-ui-bundle.js';
import SwaggerUIStandalonePreset from 'swagger-ui-dist/swagger-ui-standalone-preset.js'; // Import SwaggerUIStandalonePreset
import 'swagger-ui-dist/swagger-ui.css';

export default {
  name: 'SwaggerUI',
  props: {
    url: {
      type: String,
      required: false,
      default: 'https://petstore.swagger.io/v2/swagger.json' // Default example
    },
    spec: {
      type: Object,
      required: false
    },
    domIdSuffix: { // To allow multiple instances on the same page
      type: String,
      default: ''
    }
  },
  computed: {
    domId() {
      return `swagger-ui-${this.domIdSuffix || Math.random().toString(36).substring(7)}`;
    }
  },
  mounted() {
    const config = {
      dom_id: `#${this.domId}`,
      deepLinking: true,
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset // Use the imported preset directly
      ],
      layout: "StandaloneLayout"
    };

    if (this.spec) {
      config.spec = this.spec;
    } else {
      config.url = this.url;
    }

    SwaggerUIBundle(config);
  }
};
</script>

<style>
/* You might need to adjust styles depending on your VuePress theme */
.swagger-ui .topbar {
  display: none; /* Example: hide the default top bar if not needed */
}

.theme-default-content {
  max-width: 1200px !important
}
</style>