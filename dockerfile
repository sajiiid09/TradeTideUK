FROM node:20-alpine AS base

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install
RUN npx prisma migrate dev --schema=./prisma/schema.prisma

COPY . .

EXPOSE 3000

CMD ["pnpm", "run", "dev"]