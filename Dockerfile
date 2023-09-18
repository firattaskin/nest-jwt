FROM node:latest

WORKDIR /var/www/html

COPY package*.json ./

RUN npm i -g @nestjs/cli typescript

RUN npm install

COPY . .

ENTRYPOINT [ "/bin/sh" , "-c", "npm install && npm run start:dev"]