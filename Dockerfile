# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/go/dockerfile-reference/

ARG NODE_VERSION=18.17.1

FROM node:${NODE_VERSION}-alpine AS node_builder

WORKDIR /usr/src/app

# install and cache app dependencies
COPY package*.json ./
COPY angular.json /usr/src/app/angular.json
COPY tsconfig*.json ./

RUN npm install
RUN npm install -g @angular/cli@17.0.7
