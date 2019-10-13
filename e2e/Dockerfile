FROM node:12.10.0-slim as builder 

ARG ENABLE_DEV_TOOLS="true"
ARG GRAPHQL_API

WORKDIR /home/node

COPY . .

RUN yarn \
  && yarn build

FROM cypress/base:11.13.0

WORKDIR /home/node

COPY --from=builder /home/node/cypress ./cypress
COPY --from=builder /home/node/common/cypress ./common/cypress
COPY --from=builder /home/node/common/cypress/config/e2e.json ./cypress.json
COPY --from=builder /home/node/package.json .
COPY --from=builder /home/node/common/types ./common/types
COPY --from=builder /home/node/dist ./dist

RUN yarn global add @quasar/cli \
  && yarn
