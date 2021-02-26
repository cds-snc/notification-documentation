# GC Notify documentation

This is the repository holding the technical documentation for GC Notify, https://notification.canada.ca.

## Content sources 
Content is largely based on [GOV.UK's Notify REST API Documentation](https://github.com/alphagov/notifications-tech-docs/tree/master/source/documentation) and [Australia's Notify Documentation by the Digital Transformation Agency](https://github.com/govau/notify/tree/master/docs/src/content). It is being adapted to the Canadian context.

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
## Local deployment using VuePress
For quick editing and hot reload a light-weight solution is to use VuePress. Listed below are instructions to run a local server for viewing the documentation content. 
1. Download packages and their dependencies
```commandline
npm install
```
2. Run the VuePress
```commandline
npm run dev
```

## Local deployment using Docker
A [`Dockerfile`](Dockerfile) is provided to anyone that wants to leverage Docker for deploying a webserver `nginx` for serving the documentation content.

**Prerequisites**
- Install Docker from https://www.docker.com

**Instructions**
1. Launch a terminal and navigate to the notification-documentation project root directory
2. Build the container with a tag, an example is listed below
```commandline
docker build -t cds/notification-documentation:0.1 .
```
3. Check that the image has been built successfully
```commandline
docker images
```
4. Launch the image on your local machine, the example below serves the pages at port 8000
```commandline
docker run -p 8000:80 cds/notification-documentation:0.1
```
5. Open up a web browser and navigate to http://localhost:8000 to view the content
