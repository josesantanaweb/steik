<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Commands

| Command | Purpose |
|---|---|
| `pnpm dev` | Dev server on :3000 |
| `pnpm build` | Production build (Prisma generate + Next build) |
| `pnpm lint` | ESLint — next/core-web-vitals + typescript + prettier |
| `pnpm test` | Vitest in watch mode |
| `pnpm test:run` | Vitest, single run (unit tests) |
| `pnpm test:coverage` | Vitest with v8 coverage report |
| `pnpm prisma:db:push` | Sync Prisma schema → PostgreSQL (no migrations) |
| `pnpm prisma:migrate` | Create/apply a migration in development |

---

## Project: Steik

**Steik** is a personal betting tracker: log bets (won / lost / pending / void), follow stats and bankroll, track favourite football teams and their upcoming matches. It is a **mobile-first PWA** (installable from the browser, no app store).

Language: TypeScript 5 (strict). Package manager: **pnpm**.

---

## Architecture

### Module pattern — vertical slices (`src/modules/<name>/`)

```
src/modules/<name>/
  actions.ts          ← server-side DB logic, returns ApiResult<T>
  schema.ts           ← Zod validation schemas
  types.ts            ← domain types and const enums
  store.ts            ← Zustand store (only if the module needs client-local state)
  hooks/              ← React Query wrappers (one file per query/mutation)
  components/         ← domain components
  components/index.ts ← barrel re-export (no root index.ts in modules)
```

### Existing modules

| Module | Description |
|---|---|
| `auth` | JWT login / register / Google OAuth |
| `shared` | Generic infrastructure: UI primitives, layout (`AppLayout`, `Header`, `BottomNav`), guards, stores, utils |

Domain modules (bets, teams, matches, dashboard) are not created yet. See `TODO.md`.

### Shared infrastructure (`src/modules/shared/`)

```
shared/
  components/
    ui/         ← primitives: Button, Input, Logo, Badge, Select, Dropdown, DatePicker...
    layout/     ← AppLayout, Header, BottomNav
    *.tsx       ← AuthGuard, GuestGuard, BackButton, SearchInput, Tabs, QueryProvider
  hooks/        ← useDebounce
  stores/       ← useApp (UI flags: hideHeader, hideBottomNav)
  types/        ← ApiResult<T>
  utils/        ← cn(), formatDate, formatPrice
```

### Navigation

Defined in `src/constants/navigation.ts` (`BOTTOM_NAV_ITEMS`), rendered by `shared/components/layout/bottom-nav.tsx`.

Order: Dashboard (`/`) · Equipos (`/teams`) · **Nueva apuesta** (`/bets/new`, center diamond button) · Partidos (`/matches`) · Historial (`/history`).

Icons come from **Lucide React** only.

### Data flow

```
[Page / Server Component]
    └─ calls module actions.ts  ←→  Prisma (@/lib/db)

[Client Component]
    └─ React Query hook (modules/<name>/hooks/)
          └─ fetch wrapper (src/lib/api/)
                └─ Next.js API route (src/app/api/<name>/route.ts)
                      └─ module actions.ts  ←→  Prisma
```

- **`@/lib/db.ts`** — Prisma singleton with `@prisma/adapter-pg`. Import only from `actions.ts`.
- **Never** call `db` directly from components or hooks.
- Server-only files must begin with `import "server-only";`.

### Key directories

```
src/
  app/
    api/<name>/route.ts   ← REST endpoints (ApiResult shape)
    (main)/...            ← pages behind the bottom nav
    (auth)/...            ← login / register (no nav)
  constants/              ← routes, config, assets, navigation
  modules/                ← feature slices
  lib/
    db.ts                 ← Prisma singleton
    auth.ts               ← JWT sign/verify
    api/                  ← client-side fetch helpers
```

### Path alias

```
@/* → ./src/*
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript 5 — strict mode |
| Database | PostgreSQL via Prisma 7 (`@prisma/adapter-pg`) |
| Styling | Tailwind CSS v4 (PostCSS plugin) |
| State — server | @tanstack/react-query v5 |
| State — client | Zustand |
| Validation | Zod |
| Icons | Lucide React |
| Linting | ESLint (next/core-web-vitals + typescript + prettier) |
| Formatting | Prettier — semicolons, double quotes, trailing commas, tailwindcss plugin |
| Font | Outfit (`next/font/google` → `--font-sans`) |

---

## Design System

Dark theme, lime accent (mirrors the Steik app mockups).

| Token | Tailwind class | Value |
|---|---|---|
| Canvas (background) | `bg-canvas` | `#131217` |
| Surface / cards / nav bar | `bg-surface` | `#19181D` |
| Stroke / borders | `border-stroke` | `#282830` |
| Primary accent (lime) | `text-primary`, `bg-primary` | `#DEFB32` |
| Secondary accent (used in gradients) | `text-secondary`, `bg-secondary` | `#98ED20` |
| Body text (muted) | `text-body` | `#8E8E93` |
| Text primary | `text-white` / `text-foreground` | `#FFFFFF` |
| Success (win) | `text-success` | `#19EBB6` |
| Error (loss) | `text-error` | `#DB4446` |

Use `cn()` (from `@/modules/shared/utils`) for conditional class merging.

---

## Testing

- Vitest + jsdom + Testing Library (`@testing-library/react`, `jest-dom`). Setup in `src/test/setup.ts`.
- Tests are **co-located** with the code: `foo.ts` → `foo.test.ts`, `component.tsx` → `component.test.tsx`.
- Every new component, hook, util or constant with logic gets a test in the same change.
- Mock Next.js hooks with `vi.mock("next/navigation", ...)`, using `vi.hoisted` for the mock fn.
- Prefer querying by role and accessible name (`getByRole`, `getByLabelText`) over test ids or class names.

## Conventions

### General
- **User-facing text and error strings → Spanish.**
- `ApiResult<T>` shape for every API response and server action:
  ```ts
  { success: boolean; status: number; data?: T; message?: string; errors?: Record<string, string[]> }
  ```
- New features follow: `modules/<name>/` → `app/api/<name>/route.ts` → hooks → components.
- **No root `index.ts` in modules.** Use barrels only in subfolders (`components/index.ts`, `hooks/index.ts`, `utils/index.ts`).
- **Constants live in `src/constants/`** (re-exported from `@/constants`). No magic numbers or literal routes inline.
- **Utils live in their own file** under `utils/`, never in the file that uses them.

### Component file naming — kebab-case
- Files are kebab-case (`bottom-nav.tsx`, `account-header.tsx`). Exported component names stay PascalCase (`BottomNav`).

### Enum convention — UPPERCASE everywhere
Enum values are UPPERCASE in Prisma, Zod and frontend. Example for bets:

```prisma
enum BetStatus { PENDING  WON  LOST  VOID  CASHOUT }
```

```ts
export const BetStatus = {
  PENDING: "PENDING",
  WON: "WON",
  LOST: "LOST",
  VOID: "VOID",
  CASHOUT: "CASHOUT",
} as const;
export type BetStatus = (typeof BetStatus)[keyof typeof BetStatus];
```

---

## Auth

- JWT (HS256, `jose`) in the `Authorization: Bearer` header. Expiration from `AUTH_TOKEN_EXPIRATION` (default `1h`).
- Passwords hashed with `bcryptjs`.
- Google OAuth via `googleId` on `User`. Password is null for Google users.
- Client token persisted in Zustand (`steik_auth` in localStorage).
- `AuthGuard` (protected) / `GuestGuard` (login/register only).
- Pending: refresh tokens, password reset, email verification.

---

## Domain (planned, not implemented)

Entities requested for the MVP:

- **Team**: name, league, logo URL, `isFavorite`, optional external id for the football API. Loaded manually.
- **Match**: teams, kickoff date/time, league, status, result. Upcoming matches of favourite teams, cached from the football API.
- **Bet**: optional `matchId`, market, selection, odds, stake, status, `profit` (`won = stake × (odds − 1)`, `lost = −stake`, `void = 0`), notes.
- **Bankroll movement** (optional): deposits and withdrawals to compute real balance.

Bets are a record kept inside Steik. The app does not place bets with bookmakers.
