# Dockerfile

# base image
FROM node:alpine

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY --chown=node:node . /usr/src

COPY package*.json ./

RUN npm install --silent
RUN npm i -g nodemon

EXPOSE 4000
CMD npm run dev