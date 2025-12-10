FROM nginx:alpine@sha256:289decab414250121a93c3f1b8316b9c69906de3a4993757c424cb964169ad42

RUN apk add --no-cache bash nodejs npm && rm -rf /var/cache/apk/*

RUN rm -rf /usr/share/nginx/html/*

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm install

COPY src ./src
RUN set -ex && npm run build

RUN mv src/.vuepress/dist/* /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
