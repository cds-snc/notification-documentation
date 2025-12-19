FROM nginx:alpine@sha256:8491795299c8e739b7fcc6285d531d9812ce2666e07bd3dd8db00020ad132295

RUN apk add --no-cache bash nodejs npm && rm -rf /var/cache/apk/*

RUN rm -rf /usr/share/nginx/html/*

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm install

COPY src ./src
RUN set -ex && npm run build

RUN mv src/.vuepress/dist/* /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
