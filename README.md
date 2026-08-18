# devboard — server

Backend for devboard, a project management app for asynchronous developer/manager collaboration. Built deliberately from primitives rather than frameworks-on-faith — the goal of this codebase is to understand every layer, not just ship one.

## Stack

| Layer            | Choice                                       | Why                                                                                |
| ---------------- | -------------------------------------------- | ---------------------------------------------------------------------------------- |
| Runtime          | Node 24 LTS                                  | Native TypeScript type stripping (amaro/SWC) — no `ts-node`, no build step for dev |
| Web framework    | Express 5.x                                  | Thin routing layer; business logic deliberately kept out of it                     |
| Database         | PostgreSQL 18 (Docker)                       | Accessed via `pg` for queries                                                      |
| Migrations       | [dbmate](https://github.com/amacneil/dbmate) | Standalone CLI, plain SQL migrations, atomic by default                            |
| Validation       | Zod                                          | Transport-layer validation only, in the routing layer                              |
| Password hashing | `argon2` (argon2id)                          | Current OWASP-recommended default                                                  |
| Frontend         | React 19 + Vite                              | Separate process, intentionally — see root-level README for the frontend           |

No `nodemon` (Node's built-in `--watch`), no `dotenv` for the app itself (Node's built-in `--env-file`), no ORM (raw SQL via `pg`, schema evolution via dbmate). Each omission is a deliberate choice to keep the underlying mechanism visible — dbmate is the one exception: migrations are useful to learn by hand-rolling once (which is how this project started; see **Migrations** below) but not worth maintaining indefinitely once the concepts — atomicity, ordering, drift between schema and history — are understood.

## Prerequisites

- Docker (Postgres runs in a container — see `docker-compose.yml`)
- Node 24 LTS

## Getting started

```bash
cp .env.example .env          # fill in DATABASE_URL, SESSION_TTL, etc.
docker compose up -d          # starts Postgres 18
npm install
npx dbmate up                 # creates the DB (if needed) and applies pending migrations
npm run dev                   # starts the API with --watch
```

## Folder structure

```
devboard/
├── README.md
├── package.json
├── tsconfig.json              # used for type-checking only (tsc --noEmit) — not a build step
├── .env.example
├── .gitignore
├── docker-compose.yml         # Postgres 18 service definition
│
├── db/
│   ├── schema.sql              # auto-written by dbmate after up/migrate/rollback — never hand-edited
│   └── migrations/
│       ├── 20250601120000_create_projects_table.sql
│       ├── 20250601120500_create_tasks_table.sql
│       ├── 20250601121000_create_activity_events_table.sql
│       ├── 20250701090000_create_users_table.sql        # Phase 3
│       └── 20250701090500_create_sessions_table.sql     # Phase 3
│
└── src/
    ├── server.ts               # entry point — creates the HTTP listener
    ├── app.ts                  # Express app assembly: middleware, CORS, route mounting
    │
    ├── db/
    │   └── pool.ts              # single shared `pg.Pool` instance
    │
    ├── lib/
    │   ├── with-transaction.ts  # atomicity helper: wraps mutation + activity_events insert
    │   └── cookies.ts           # hand-rolled Cookie header parsing (no cookie-parser)
    │
    ├── middleware/
    │   └── require-auth.ts      # reads session cookie, resolves req.userId
    │
    ├── users/
    │   └── users.repository.ts  # UserRow ↔ User mapping, insertUser / findUserByEmail
    │
    ├── auth/
    │   ├── auth.routes.ts       # POST /register, /login, /logout — translators only
    │   ├── auth.service.ts      # register / login / logout business logic
    │   └── auth.repository.ts   # SessionRow ↔ Session mapping, session CRUD
    │
    ├── projects/
    │   ├── projects.routes.ts
    │   ├── projects.service.ts
    │   └── projects.repository.ts   # ProjectRow ↔ Project mapping
    │
    └── tasks/
        ├── tasks.routes.ts
        ├── tasks.service.ts
        └── tasks.repository.ts
```

Every feature folder (`projects/`, `tasks/`, `auth/`) follows the same three-file shape: `.routes.ts` (HTTP translation), `.service.ts` (business rules), `.repository.ts` (persistence). `users/` currently only needs a repository — there's no independent "user" business logic yet; that lives in `auth.service.ts` until it grows enough to warrant its own service.

## Architecture conventions

- **Vertical slices, not horizontal layers.** Each feature folder is self-contained rather than splitting the app into a global `routes/`, global `services/`, global `models/`.
- **Routes are translators only.** Extract the request, validate with Zod, call exactly one service function, map the result to a response. No business rules, no direct DB access, no transactions in a route handler.
- **`Row` / domain type split.** Every repository defines a `*Row` interface matching the raw `pg` result (snake_case, `bigint` columns as `string`) and an explicit mapper to a camelCase domain type. Nothing outside the repository ever sees a `Row`.
- **`withTransaction` for atomicity.** Any mutation that must stay in sync with the `activity_events` audit log goes through this helper — it's not optional per-call discipline, it's the only path that writes those two things together. This is application-level atomicity (multiple statements within one request); it's a different concern from migration atomicity below.
- **Migrations are the single source of truth.** `db/schema.sql` is a generated artifact — dbmate rewrites it automatically after `up`/`migrate`/`rollback` (equivalent to `pg_dump --schema-only`, requires `pg_dump` on `PATH`). It is never hand-edited — divergence between it and the migration history is a bug.
- **`CREATE INDEX CONCURRENTLY` can't run inside a transaction.** dbmate wraps every migration in a transaction by default; migrations that need to skip this use dbmate's `-- migrate:up transaction:false` directive on that migration block.

## Environment variables

| Variable         | Purpose                                                                                                                                              |
| ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DATABASE_URL`   | Postgres connection string — used by both the app and dbmate. For local Docker Postgres, include `?sslmode=disable` (dbmate requires TLS by default) |
| `PORT`           | API listen port                                                                                                                                      |
| `NODE_ENV`       | Gates cookie `Secure` flag (`production` only) and CORS origin                                                                                       |
| `CORS_ORIGIN`    | Vite dev server origin (`http://localhost:5173`) in development                                                                                      |
| `SESSION_TTL_MS` | Session lifetime (currently 7 days)                                                                                                                  |

The app loads `.env` via `node --env-file=.env` (not `dotenv`). dbmate loads the same `.env` file independently and automatically — no flag needed — so one file serves both.

## Migrations

[dbmate](https://github.com/amacneil/dbmate) — a standalone, language-agnostic CLI, not a Node library. Plain SQL migration files, atomic by default, no ORM tying migrations to application models.

```bash
npx dbmate new create_users_table   # scaffolds db/migrations/<timestamp>_create_users_table.sql
npx dbmate up                       # creates the DB (if needed) + applies pending migrations + rewrites schema.sql
npx dbmate migrate                  # applies pending migrations without creating the DB
npx dbmate rollback                 # rolls back the most recent migration
npx dbmate status                   # shows applied vs. pending
npx dbmate dump                     # rewrites db/schema.sql on demand (requires `pg_dump` on PATH)
```

Each migration file has `-- migrate:up` and `-- migrate:down` sections in one file, and dbmate tracks applied versions in its own `schema_migrations` table:

```sql
-- migrate:up
CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- migrate:down
DROP TABLE users;
```

Migrations are named by timestamp (not sequential numbers like `0001_`), so two developers branching at the same time can't collide on a migration number — this is the concrete problem dbmate's naming convention solves that the earlier hand-rolled numbering scheme didn't.

## Scripts

| Script                  | Does                                                      |
| ----------------------- | --------------------------------------------------------- |
| `npm run dev`           | `node --watch --env-file=.env src/server.ts`              |
| `npx dbmate up`         | Creates the DB (if needed) and applies pending migrations |
| `npx dbmate new <name>` | Scaffolds a new timestamped migration file                |
| `npm run typecheck`     | `tsc --noEmit` — type-checking only, no build output      |
| `npm test`              | (Phase 8) Vitest + Supertest                              |
