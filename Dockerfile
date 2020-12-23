FROM nginx:alpine

RUN apk add --no-cache bash nodejs npm && rm -rf /var/cache/apk/*

RUN set -ex && mkdir /app

WORKDIR /app
COPY . /app

RUN npm install
RUN set -ex && npm run build

RUN rm -rf /usr/share/nginx/html/*

RUN mv src/.vuepress/dist/* /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
