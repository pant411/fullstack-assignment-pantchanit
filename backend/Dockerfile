FROM node:21-alpine

WORKDIR /app/backend

COPY ./backend/package*.json ./

RUN npm install

COPY ./backend ./

COPY ./backend/.env.docker .env

RUN npm run build

CMD [ "npm", "run", "start:prod"]