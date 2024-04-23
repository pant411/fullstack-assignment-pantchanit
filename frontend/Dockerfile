FROM node:21.7.3-alpine

WORKDIR /app/frontend

COPY ./frontend/package*.json ./

RUN npm install

COPY ./frontend ./

COPY ./frontend/.env.docker .env

RUN npm run build

CMD [ "npm", "run", "start" ]