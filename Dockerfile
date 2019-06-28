
FROM node:10.16.0-alpine AS build

RUN apk update && \
    apk add git && \
    mkdir -p /app/public/spellchecker

WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm install
ENV NODE_ENV production

# Everything above should be cached by docker. The below should run on every build

COPY . /app/
RUN rm -rf node-modules && \
    npm run compile && \
    npm install --no-optional --production && \
    rm -rf /app/.npm /app/.git

FROM node:8.9-alpine
MAINTAINER Quintype Developers <dev-core@quintype.com>

RUN apk update && \
    apk add curl tini && \
    addgroup -S app && \
    adduser -S -g app app

ENV NODE_ENV production
WORKDIR /app
COPY --from=build --chown=app:app /app /app

USER app
CMD ["node", "start.js"]

