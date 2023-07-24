FROM node:20-alpine

WORKDIR /usr/src/lib
COPY ./lib/* ./
RUN npm install

WORKDIR /usr/src/app

COPY ./inventory-service ./
RUN npm install

EXPOSE 5000

CMD [ "node", "server.js" ]