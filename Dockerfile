FROM nginx:alpine@sha256:a45ee5d042aaa9e81e013f97ae40c3dda26fbe98f22b6251acdf28e579560d55

RUN apk add --no-cache bash nodejs npm && rm -rf /var/cache/apk/*

RUN rm -rf /usr/share/nginx/html/*

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm install

COPY src ./src
RUN set -ex && npm run build

RUN mv src/.vuepress/dist/* /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
