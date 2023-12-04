FROM node:18.18.0-alpine AS build

ENV NODE_OPTIONS=--max_old_space-size=512

WORKDIR /srv

COPY package*.json /srv/

COPY tsconfig.json /srv/

COPY src /srv/src/

COPY prisma /srv/prisma/

RUN npm ci && npm i -g typescript

RUN tsc

RUN npm ci --omit-dev

FROM alpine:latest

RUN apk add nodejs --no-cache

WORKDIR /app

COPY --from=build /srv/node_modules /app/node_modules/

COPY --from=build /srv/build /app/build/

CMD ["node", "build/index.js"]