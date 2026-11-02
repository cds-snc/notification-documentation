FROM nginx:alpine@sha256:785835ea65db4bba6f021acc0f3be91b0fef76a53fe41f8588c6698d2aed0606

RUN apk add --no-cache bash nodejs npm && \
  apk upgrade --no-cache brotli-libs && \
  rm -rf /var/cache/apk/*

RUN rm -rf /usr/share/nginx/html/*

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm install

COPY src ./src
RUN set -ex && npm run build

RUN mv src/.vuepress/dist/* /usr/share/nginx/html

COPY docker-entrypoint.sh /docker-entrypoint-notify.sh
RUN chmod +x /docker-entrypoint-notify.sh

ENTRYPOINT ["/docker-entrypoint-notify.sh"]
