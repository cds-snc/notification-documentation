<template>
  <div :id="domId"></div>
</template>

<script>
  import SwaggerUIBundle from 'swagger-ui-dist/swagger-ui-bundle.js';
  import SwaggerUIStandalonePreset from 'swagger-ui-dist/swagger-ui-standalone-preset.js'; // Import SwaggerUIStandalonePreset
  import 'swagger-ui-dist/swagger-ui.css';

  const styleId = 'swagger-ui-fr-after-style';
  const Translate = {
    translations: [
      {
        selector: '.swagger-ui .authorize.btn span',
        text_orig: 'Authorize',
        text_fr: 'Autoriser'
      },
      {
        selector: '.swagger-ui button.btn.authorize',
        text_orig: 'Authorize',
        text_fr: 'Autoriser'
      },
      {
        selector: 'button.btn.btn-done',
        text_orig: 'Close',
        text_fr: 'Fermer'
      },
      {
        selector: 'button.btn.cancel',
        text_orig: 'Cancel',
        text_fr: 'Annuler'
      },
      {
        selector: 'button.btn.try-out__btn',
        text_orig: 'Try it out',
        text_fr: 'Essayer',
      },
      {
        selector: 'button.btn.execute',
        text_orig: 'Execute',
        text_fr: 'Exécuter',
      },
      {
        selector: 'button.btn.btn-clear',
        text_orig: 'Clear',
        text_fr: 'Effacer',
      },
      {
        selector: 'button.tablinks',
        text_orig: 'Example Value',
        text_fr: 'Valeur d\'exemple',
      },
      {
        selector: 'button.tablinks',
        text_orig: 'Schema',
        text_fr: 'Schéma',
      },
      {
        selector: 'td.col.col_header.response-col_links',
        text_orig: 'Links',
        text_fr: 'Liens',
      },
      {
        selector: 'td.response-col_links i',
        text_orig: 'No links',
        text_fr: 'Aucun lien',
      },
      {
        selector: 'td.response-col_links i',
        text_orig: 'No links',
        text_fr: 'Aucun lien',
      },
      {
        selector: '.response-control-media-type__title',
        text_orig: 'Media type',
        text_fr: 'Type de média',
      },
      {
        selector: '.response-control-media-type__accept-message',
        text_orig: 'Controls ',
        text_fr: 'Contrôle de header <code>Accept</code>',
      },
      {
        selector: '.property.primitive',
        text_orig: 'example:',
        text_fr: 'Contrôle de header <code>Accept</code>',
      },
      
      {
        selector: '.opblock-description-wrapper p',
        text_orig: 'No parameters',
        text_fr: 'Aucun paramètre'
      },
      {
        selector: 'h4.opblock-title',
        text_orig: 'Request body',
        text_fr: 'Corps de la requête'
      },
      {
        selector: 'h4',
        text_orig: 'Request URL',
        text_fr: 'URL de la requête'
      },
      {
        selector: 'h4',
        text_orig: 'Server response',
        text_fr: 'Réponse du serveur'
      },
        {
        selector: 'h4',
        text_orig: 'Parameters',
        text_fr: 'Paramètres'
      },
      {
        selector: '.modal-ux-header h3',
        text_orig: 'Available authorizations',
        text_fr: 'Autorisations disponibles'
      },
      {
        selector: 'label[for="api_key_value"]',
        text_orig: 'Value:',
        text_fr: 'Valeur:'
      },
      {
        selector: '.wrapper p',
        text_orig: 'Name:',
        text_fr: 'Nom: <code>Authorization</code>'
      },
      {
        selector: '.wrapper p',
        text_orig: 'In:',
        text_fr: 'Dans: <code>Header</code>'
      }
      
    ],
    translateUI: () => {
      if (window.location.pathname.includes('/fr/')) {
        Translate.translations.forEach(({ selector, text_orig, text_fr }) => {
          document.querySelectorAll(selector).forEach(el => {
            if (el.textContent.trim().includes(text_orig)) {
              el.innerHTML = text_fr;
            }
          });
        });
      }

      // Handle the ::after translation for French only
      let styleTag = document.getElementById(styleId);
      if (window.location.pathname.includes('/fr/')) {
        if (!styleTag) {
          styleTag = document.createElement('style');
          styleTag.id = styleId;
          styleTag.innerHTML = `
            h4.required::after {
              content: "Requis" !important;
            }
          `;
          document.head.appendChild(styleTag);
        }
      } else {
        // Remove the style if it exists and we're not in French
        if (styleTag) {
          styleTag.remove();
        }
      }
    },
    initialize: (t) => {      
      if (window.location.pathname.includes('/fr/')) {
        setTimeout(Translate.translateUI, 500);
      }

      // Observe future DOM changes in the whole body (catches modals too)
      const observer = new MutationObserver(() => {
        Translate.translateUI();
      });
      observer.observe(document.body, { childList: true, subtree: true });
      t._swaggerObserver = observer;      
    }
  }

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

      this.$nextTick(() => {
        Translate.initialize(this);
      });
      
    },
    beforeDestroy() {
      if (this._swaggerObserver) {
        this._swaggerObserver.disconnect();
      }
    }
  };
</script>

<style>
  .swagger-ui .topbar {
    display: none;
  }

  .theme-default-content {
    max-width: 1200px !important
  }
</style>