# TradeTideUK - Project Documentation

## Overview

The platform is built using Next.js App Router, Prisma, and PostgreSQL, with a touch of a modern UI powered by ShadCN components.

## Features

- **User Authentication**: Users sign in using Google.
- **Book Search**: Users can search for book portfolios.
- **Portfolio Management**:
  - Signed-up users can create book portfolios.
  - Users can edit or delete portfolios they created.

## Tech Stack

- **Frontend**: Next.js (App Router), TypeScript, React, TailwindCSS, shadcn components
- **Backend**: Next.js Server Actions, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js with Google OAuth
- **Security**: Argon2 for password hashing, Dompurify for XSS protection
- **Form Handling**: React Hook Form with Zod validation
- **Development**: Docker, Docker-Compose

## Dependencies

```json
"@hookform/resolvers": "^3.10.0",
"@next-auth/prisma-adapter": "^1.0.7",
"@prisma/client": "^6.3.1",
"argon2": "^0.41.1",
"class-variance-authority": "^0.7.1",
"clsx": "^2.1.1",
"dompurify": "^3.2.4",
"lucide-react": "^0.474.0",
"next": "14.2.23",
"next-auth": "5.0.0-beta.25",
"next-themes": "^0.4.4",
"prettier": "^3.4.2",
"prisma": "^6.3.1",
"react": "^18",
"react-dom": "^18",
"react-hook-form": "^7.54.2",
"react-quill": "^2.0.0",
"sonner": "^1.7.4",
"tailwind-merge": "^3.0.1",
"tailwindcss-animate": "^1.0.7",
"uuid": "^11.0.5",
"zod": "^3.24.1"
```

## Setup Instructions

### 1. Clone the Repository

```sh
git clone https://github.com/eddie2111/TradeTideUK.git
cd TradeTideUK
```

### 2.1 Run using scripted docker environment (Not required if require less setup and less core dev control)

```sh
./setup.sh
```

### 2.2 Install Dependencies (Not required if using docker, but allows more control)

```sh
yarn install
# or
pnpm install
```

- pnpm has been used initially

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and configure the following variables:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/test2?sslmode=disable"
AUTH_SECRET="YOUR_AUTH_SECRET=" # Added by `npx auth`. Read more: https://cli.authjs.dev
GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"
```

A `.env.example` file is provided for reference.

### 4. Set Up Prisma

```sh
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Run with Docker

Ensure you have Docker installed, then build and start the container:

```sh
docker-compose up --build
```

This will start the application along with a PostgreSQL database.

### 6. Running the Development Server

```sh
yarn dev
# or
pnpm run dev
```

The app will be available at `http://localhost:3000`.

## License

MIT License

## Contributors

- Tareq Mahmood (@[Eddie2111](https://github.com/Eddie2111/TradeTideUK))
- Sajid Mahmud (@[sajiiid09])
