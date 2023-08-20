FROM node:latest as builder

RUN mkdir -p /bot
WORKDIR /bot

COPY package.json /bot
RUN yarn install

COPY . /bot

RUN yarn build
