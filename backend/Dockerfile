FROM node:18.0-alpine AS builder
LABEL authors="andrew"

WORKDIR /app

COPY ./backend/package-lock.json ./
COPY ./backend/package.json ./

RUN npm install

COPY ./backend/ ./

RUN npm run build

FROM node:18.0-alpine

WORKDIR /app

COPY --from=builder /app ./

ENTRYPOINT ["npm", "start"]