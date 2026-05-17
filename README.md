# Next.js Dynamic Portfolio

A premium, high-performance portfolio website built with Next.js, Prisma, and SQLite.

## Features
- **Dynamic Content**: Powered by a local SQLite database and Prisma ORM.
- **Admin Dashboard**: Effortlessly update Projects, Experiences, and Education using Prisma Studio.
- **Live Stats Integration**: Fetches real-time competitive programming stats from LeetCode.
- **Modern Design**: Custom dark-mode aesthetic with glassmorphism, smooth gradients, and micro-animations.

## Tech Stack
- Next.js (App Router)
- React
- Vanilla CSS Modules
- Prisma (ORM)
- SQLite (Database)

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Initialize the database:**
   ```bash
   npx prisma generate
   npx prisma db push
   npx tsx prisma/seed.ts
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Admin Dashboard
To update your portfolio content (Experiences, Projects, etc.) without writing code, start the Prisma Studio admin interface:
```bash
npm run admin
```
This will open `http://localhost:5555`, where you can safely edit your database content in a spreadsheet-like GUI.
