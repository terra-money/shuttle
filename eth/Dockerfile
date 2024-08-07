FROM node:21 AS build-stage

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci

FROM node:21-alpine

WORKDIR /app

COPY --from=build-stage /app ./
COPY . /app

CMD ["npm", "start"]