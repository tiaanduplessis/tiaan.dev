---
title: Writing a Next.js Dockerfile
date: 2020-12-16
tags: ["next", "docker"]
layout: layouts/post.njk
---


At [Full Facing](http://fullfacing.com/), Frontend engineers are responsible for maintaining the [Dockerfile](https://docs.docker.com/engine/reference/builder/) used for deploying our applications. Since we have pretty much standardized on [Next.js](https://nextjs.org/) as our meta-framework of choice, except for some SPA's and a [Sapper](https://sapper.svelte.dev/) app, we can have a standard Dockerfile for all Next.js applications, that is only slightly modified based on project requirements:

```
FROM node:14.15 AS builder

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build

# Prune all non-production dependencies prior to copy
RUN npm prune --production

FROM node:14.15 as production

ENV NODE_ENV production
ENV PORT 3000
ENV TINI_VERSION v0.19.0

ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini

WORKDIR /app

## Also copy any custom non-next code you might have e.g. server.js
# COPY --from=builder --chown=node:node /app/src ./src
COPY --chown=node:node package.json next.config.js ./
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next ./.next
COPY --from=builder --chown=node:node /app/node_modules ./node_modules

RUN groupmod -g 10001 node && usermod -u 10000 -g 10001 node

USER node
EXPOSE 3000

ENTRYPOINT ["/tini", "--"]

CMD ["node_modules/.bin/next", "start"]
# If you are running a custom server
# CMD ["node", "server.js"]
```

This file is mostly based on these excellent resources:
- [Dockerfile Best Practices](https://github.com/hexops/dockerfile)
- [Node Best Practices](https://github.com/goldbergyoni/nodebestpractices#8-docker-best-practices)
- [Docker and Node.js Best Practices](https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md)

## Breakdown

### Use an explicit image tag

An explicit node version for [major and minor](https://semver.org/) (14.15) is set to allow for deterministic installs. Using `latest` might result in the build arbitrarily breaking due to application compatibility issues with the new version. We do not specify the patch version as this would prevent us from getting the latest fixes which may include critical security updates.

### Use multi-stage builds

Multi-stage builds help to separate our build and production runtime environments. This prevents dependencies and secrets that are exclusively used when building the Next.js application from being copied to our production container.

## Add `.dockerignore`

When performing the `COPY . .` command, we want to avoid copying needless directories and potential secrets. We use the `.dockerignore` file for our Next.js applications:

```
**/node_modules/
**/.git
**/README.md
**/LICENSE
**/.vscode
**/npm-debug.log
**/.env
**/.editorconfig
**/.next
**/.prettierignore
**/.prettierrc.js
**/cypress.json
**/cypress
**/.github
**/.editorconfig
**/.eslintignore
**/.eslintrc.js
```

## Production base image

We use the full Node image for both the builder and production stages as we do not have any explicit space constraints to justify using the Alpine or Slim images. This also helps us avoid potential issues with missing packages.

## Run as non-root

By default, Docker runs a container as root. While this is fine during our build step as we need to perform operations such as writing to the filesystem when installing our dependencies, it should be avoided during production. We should switch to an unprivileged user in case someone gains access to the running container. The Node base image does provide a non-root user aptly named `node` for this use case, however, we also want to make sure we do not use a UID below 10000 as [this poses a risk on several systems](https://github.com/hexops/dockerfile#do-not-use-a-uid-below-10000).

## [Tini](https://github.com/krallin/tini) as the `ENTRYPOINT`

We use [Tini](https://github.com/krallin/tini) as the entrypoint of our Dockerfile as it gives us confidence that system signals will be handled correctly and that we don't accidentally create any zombie processes.

## Run Next.js directly

We favor running Next.js directly e.g. `node_modules/.bin/next start`. Using the `npm start` script will result in the container running an additional process and cause `npm` to swallow system signals.

## Process management

We do not do any process management within the container using tools like [PM2](https://pm2.keymetrics.io/). This is handled by Kubernetes and adding 'n intermediate process manager would only lead to confusion and containers crashing due to resource allocation issues.
