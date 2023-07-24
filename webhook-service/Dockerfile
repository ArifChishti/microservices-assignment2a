FROM node:20-alpine

WORKDIR /usr/src/lib
COPY ./lib/* ./
RUN npm install

WORKDIR /usr/src/app

COPY ./webhook-service ./
RUN npm install


CMD [ "node", "server.js" ]