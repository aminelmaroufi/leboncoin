FROM node:latest as build

ENV DOCKER_LOGIN test

WORKDIR /app

COPY package.json /app/

RUN npm install

COPY ./ /app/

RUN npm run build
