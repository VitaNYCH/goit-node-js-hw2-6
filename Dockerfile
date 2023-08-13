FROM node:18.16.1

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3000

CMD [ "node", "server.js" ]