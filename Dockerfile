FROM nginx:alpine@sha256:42a516af16b852e33b7682d5ef8acbd5d13fe08fecadc7ed98605ba5e3b26ab8

# -- Install CA certificates and update them to disable emSign ECC Root CA - G3 --
RUN apk add --no-cache ca-certificates && \
    sed -i \
      -e 's|^mozilla/emSign_ECC_Root_CA_-_G3.crt|!&|' \
      -e 's|^mozilla/Comodo_AAA_Services_root.crt|!&|' \
      /etc/ca-certificates.conf && \
    update-ca-certificates --fresh

RUN apk add --no-cache bash nodejs npm && rm -rf /var/cache/apk/*

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
