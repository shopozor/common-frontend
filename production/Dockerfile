FROM node:12.10.0-slim as builder 

ARG ENABLE_DEV_TOOLS="true"
ARG GRAPHQL_API

WORKDIR /home/node

COPY . .

RUN yarn \
  && yarn build

FROM node:12.10.0-slim

WORKDIR /home/node

COPY --from=builder /home/node/package.json ./package.json
COPY --from=builder /home/node/dist ./dist

RUN yarn global add @quasar/cli
  
CMD ["yarn", "start"]
