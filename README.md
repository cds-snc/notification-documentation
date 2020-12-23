# GC Notify technical documentation

This is the repository holding the technical documentation for GC Notify, https://notification.canada.ca.

## Content 
Content is based on [GOV.UK's Notify REST API Documentation](https://github.com/alphagov/notifications-tech-docs/tree/master/source/documentation) and [the Digital Transformation Agency in Australia's Notify Documentation](https://github.com/govau/notify/tree/master/docs/src/content).

## Documentation files
This repository holds documentation in various Markdown files:
- in English in [`src/en`](src/en)
- in French in [`src/fr`](src/fr)

## VuePress theme
The VuePress configuration is in [`src/.vuepress/config.js`](src/.vuepress/config.js). We use the default theme and the associated documentation [can be seen online](https://vuepress.vuejs.org/theme/default-theme-config.html).

## Sidebar
The sidebar is defined in [`src/.vuepress/config.js`](src/.vuepress/config.js). It's different in English and in French.

If you want to add pages or groups of pages, you should tweak the `sidebar` object.

This example sidebar defines a menu for 3 pages: `callbacks.md`, `limits.md` and then `api.md` in the `en` folder. If you created a new Markdown file and want to see it in the menu, it should be added in this object.

This example code also defines a group of pages, under the name "Clients" that is collapsable. The order of pages and their name works the same way.

```js
sidebar: {
  '/en/': [
    '/en/',
    '/en/callbacks',
    '/en/limits',
    '/en/api',
    {
     title: 'Clients',
     collapsable: true,
     children: [
      '/en/python',
      '/en/java',
     ]
   }
  ]
}
```
