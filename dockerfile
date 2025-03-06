# Stage 1: Dependencies and Build
FROM node:20-alpine AS deps

WORKDIR /app

# Installing pnpm as a dependency manager
RUN npm install -g pnpm

# Copy dependency files
COPY package*.json pnpm-lock.yaml ./

# Install dependencies
# RUN pnpm install

# Stage 2: Development Environment
FROM node:20-alpine AS dev

WORKDIR /app

RUN npm install -g pnpm
# Copy dependencies from the deps stage
# COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/package*.json ./
COPY --from=deps /app/pnpm-lock.yaml ./

# Copy application code
COPY . .

# Expose the development server port
EXPOSE 3000

RUN pnpm i
# Start the development server
CMD ["npm", "run", "dev"]