FROM nginx:alpine@sha256:516475cc129da42866742567714ddc681e5eed7b9ee0b9e9c015e464b4221a00

RUN apk add --no-cache bash nodejs npm && rm -rf /var/cache/apk/*

RUN rm -rf /usr/share/nginx/html/*

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm install

COPY src ./src
RUN set -ex && npm run build

RUN mv src/.vuepress/dist/* /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
