# ARCES Journal Development Guide

asdsadasd
This guide is for teammates who just pulled the repository and want to run it locally as fast as possible.

## 1) Prerequisites

- Node.js version 20.9.0 or newer (recommended: latest Node 20 LTS)
- pnpm version 9 or 10
- Git

Check versions:

- node -v
- pnpm -v

## 2) Clone and Install

- git clone https://github.com/swimmingfishes/arces-journal.git
- cd arces-journal
- pnpm install

## 3) Environment Setup

Create local env file from example:

- cp .env.example .env

Important: this project currently uses sqliteAdapter in src/payload.config.ts, so update DATABASE_URL in .env to sqlite format.

Recommended local value:

- DATABASE_URL=file:./dev.db

Keep these variables set:

- PAYLOAD_SECRET=your_long_random_secret
- NEXT_PUBLIC_SERVER_URL=http://localhost:3000
- PREVIEW_SECRET=your_preview_secret
- CRON_SECRET=your_cron_secret

Note:

- .env.example still contains old Mongo/Postgres examples. Use sqlite URL for current setup unless the DB adapter is changed in src/payload.config.ts.

## 4) First-Time Setup After Pull

Run these once after fresh install, and again after schema/component changes:

- pnpm generate:types
- pnpm generate:importmap

## 5) Run Development Server

- pnpm dev

Open:

- Frontend: http://localhost:3000
- Admin: http://localhost:3000/admin

On first run, create the first admin user from the admin UI.

## 6) Optional Seed Data

If you need sample content:

- pnpm seed

Warning:

- Seed can be destructive depending on script behavior and environment. Do not run on production data.

## 7) Daily Development Commands

- Start dev server: pnpm dev
- Lint: pnpm lint
- Auto-fix lint: pnpm lint:fix
- Generate types: pnpm generate:types
- Generate import map: pnpm generate:importmap
- Run integration tests: pnpm test:int
- Run e2e tests: pnpm test:e2e
- Run all tests: pnpm test

## 8) Build and Run Production Locally

- pnpm build
- pnpm start

## 9) Payload Schema Change Checklist

Whenever you add or change collections, globals, fields, or custom admin components:

1. Update code.
2. Run pnpm generate:types.
3. Run pnpm generate:importmap.
4. Run pnpm lint.
5. Restart pnpm dev if needed.

## 10) Common Issues

### App fails at startup due to DATABASE_URL

Cause:

- Wrong DB URL format for active adapter.

Fix:

- Ensure sqlite adapter is active in src/payload.config.ts.
- Ensure .env has DATABASE_URL=file:./dev.db.

### Type errors after schema edits

Fix:

- pnpm generate:types

### Admin component path/import errors

Fix:

- pnpm generate:importmap

### Port 3000 already in use

Fix:

- Stop the other process, or run with a different port:
- PORT=3001 pnpm dev

## 11) Notes About Docker (Current Repo State)

The existing docker-compose.yml currently references:

- yarn install && yarn dev
- mongo service

But the app config is currently sqliteAdapter in src/payload.config.ts.

So for now, prefer local non-Docker setup above unless docker-compose.yml is updated to match the current adapter strategy.

## 12) Quick Onboarding (Copy/Paste)

- git clone https://github.com/swimmingfishes/arces-journal.git
- cd arces-journal
- pnpm install
- cp .env.example .env
- update .env DATABASE_URL to file:./dev.db
- pnpm generate:types
- pnpm generate:importmap
- pnpm dev

Then open http://localhost:3000 and http://localhost:3000/admin.
