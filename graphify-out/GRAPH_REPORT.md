# Graph Report - steik  (2026-11-15)

## Corpus Check
- Corpus is ~21,086 words - fits in a single context window. You may not need a graph.

## Summary
- 426 nodes · 836 edges · 20 communities (12 shown, 1 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 13 edges (avg confidence: 0.74)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Shared UI primitives
- Teams module and tests
- Project documentation
- Next.js app shell
- Auth pages and navigation
- Main layout and header
- ESLint and tooling
- Dev dependencies
- TypeScript configuration
- Runtime dependencies
- Package scripts
- Pagination and API results
- PostCSS configuration

## God Nodes (most connected - your core abstractions)
1. `cn()` - 46 edges
2. `react` - 35 edges
3. `vitest` - 27 edges
4. `lucide-react` - 16 edges
5. `@testing-library/react` - 16 edges
6. `compilerOptions` - 16 edges
7. `scripts` - 13 edges
8. `Team` - 11 edges
9. `ROUTES` - 9 edges
10. `TeamsTab` - 9 edges

## Surprising Connections (you probably didn't know these)
- `Data flow page -> actions -> Prisma / hook -> API route` --conceptually_related_to--> `getTeams()`  [INFERRED]
  AGENTS.md → src/lib/api/teams.ts
- `Bottom navigation tabs` --conceptually_related_to--> `TeamsPage()`  [INFERRED]
  docs/overview.md → src/app/(main)/teams/page.tsx
- `Steik roadmap` --conceptually_related_to--> `Bottom navigation tabs`  [INFERRED]
  TODO.md → docs/overview.md
- `Bets domain (planned)` --conceptually_related_to--> `Vertical slice module pattern`  [INFERRED]
  TODO.md → AGENTS.md
- `Bets domain (planned)` --conceptually_related_to--> `Data flow page -> actions -> Prisma / hook -> API route`  [INFERRED]
  TODO.md → AGENTS.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Steik MVP domain slices** — todo_bets_domain, todo_matches_domain, todo_dashboard_domain [INFERRED 0.75]

## Communities (20 total, 1 thin omitted)

### Community 0 - "Shared UI primitives"
Cohesion: 0.06
Nodes (47): class-variance-authority, clsx, lucide-react, react, react-day-picker, tailwind-merge, BottomNavItem, CenterButton() (+39 more)

### Community 1 - "Teams module and tests"
Cohesion: 0.08
Nodes (36): Co-located Vitest tests, @testing-library/react, vitest, normalizeText(), TeamCard(), TeamCardProps, team, TeamFormBars() (+28 more)

### Community 2 - "Project documentation"
Cohesion: 0.08
Nodes (32): Steik architecture (App Router + Prisma), JWT auth with Google OAuth, Data flow page -> actions -> Prisma / hook -> API route, Dark design system with lime accent, Vertical slice module pattern, CLAUDE.md includes AGENTS.md, Steik tech stack, Installable mobile-first PWA (+24 more)

### Community 3 - "Next.js app shell"
Cohesion: 0.08
Nodes (23): Bottom navigation tabs, nextConfig, next, @tanstack/react-query, metadata, outfit, viewport, TeamsPage() (+15 more)

### Community 4 - "Auth pages and navigation"
Cohesion: 0.10
Nodes (23): zod, BOTTOM_NAV_ITEMS, API_ROUTES, ROUTES, completeGoogleLogin(), initialize(), login(), loginWithGoogle() (+15 more)

### Community 5 - "Main layout and header"
Cohesion: 0.09
Nodes (16): zustand, AppLayout(), Balance(), BalanceProps, BottomNav(), { usePathnameMock }, Header(), HeaderProps (+8 more)

### Community 6 - "ESLint and tooling"
Cohesion: 0.06
Nodes (28): eslintConfig, name, private, version, dotenv, eslint, eslint-config-next, eslint-config-prettier (+20 more)

### Community 7 - "Dev dependencies"
Cohesion: 0.09
Nodes (23): devDependencies, dotenv, eslint, eslint-config-next, eslint-config-prettier, @ianvs/prettier-plugin-sort-imports, jsdom, prettier (+15 more)

### Community 8 - "TypeScript configuration"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 9 - "Runtime dependencies"
Cohesion: 0.12
Nodes (16): dependencies, bcryptjs, class-variance-authority, clsx, jose, lucide-react, next, @prisma/adapter-pg (+8 more)

### Community 10 - "Package scripts"
Cohesion: 0.15
Nodes (13): scripts, build, dev, lint, prisma:db:push, prisma:generate, prisma:migrate, prisma:migrate:deploy (+5 more)

### Community 11 - "Pagination and API results"
Cohesion: 0.23
Nodes (8): parseNonNegativeInt(), parsePaginationParams(), parsePositiveInt(), ApiError, ApiResult, ApiSuccess, PaginatedResult, PaginationParams

## Knowledge Gaps
- **143 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+138 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 174 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Shared UI primitives` to `Teams module and tests`, `Next.js app shell`, `Auth pages and navigation`, `Main layout and header`, `ESLint and tooling`?**
  _High betweenness centrality (0.245) - this node is a cross-community bridge._
- **Why does `vitest` connect `Teams module and tests` to `Shared UI primitives`, `Next.js app shell`, `Auth pages and navigation`, `Main layout and header`, `ESLint and tooling`, `Pagination and API results`?**
  _High betweenness centrality (0.124) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Dev dependencies` to `ESLint and tooling`?**
  _High betweenness centrality (0.093) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _143 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Shared UI primitives` be split into smaller, more focused modules?**
  _Cohesion score 0.055534987041836355 - nodes in this community are weakly interconnected._
- **Should `Teams module and tests` be split into smaller, more focused modules?**
  _Cohesion score 0.08035714285714286 - nodes in this community are weakly interconnected._
- **Should `Project documentation` be split into smaller, more focused modules?**
  _Cohesion score 0.08013937282229965 - nodes in this community are weakly interconnected._