# Steik — Documentación del proyecto

## Descripción

**Steik** es un registro personal de apuestas deportivas. Permite anotar cada apuesta, ver estadísticas y proyecciones de balance, gestionar equipos de fútbol favoritos y consultar sus próximos partidos. Se usa desde el móvil como PWA.

## Stack

| Categoría | Tecnología |
|---|---|
| Framework | Next.js 16 (App Router) + React 19 |
| Lenguaje | TypeScript (strict) |
| Base de datos | PostgreSQL + Prisma 7 (`@prisma/adapter-pg`) |
| Estilos | Tailwind CSS v4 |
| Datos del servidor | TanStack Query |
| Estado cliente | Zustand |
| Validación | Zod |
| Iconos | Lucide React |

## Navegación (barra inferior)

| Pestaña | Ruta | Estado |
|---|---|---|
| Dashboard | `/` | Placeholder |
| Equipos | `/teams` | Placeholder |
| Nueva apuesta (botón central) | `/bets/new` | Placeholder |
| Partidos | `/matches` | Placeholder |
| Historial | `/history` | Placeholder |

Login (`/login`) y registro (`/register`) están fuera de la barra inferior.

## Estructura

```
src/
├── app/
│   ├── (auth)/          # login, register
│   ├── (main)/          # dashboard, teams, matches, history, bets/new
│   └── api/auth/        # login, register, me, google
├── constants/           # config, rutas, assets, navegación
├── lib/                 # db (Prisma), auth (JWT), api (fetch), pagination
└── modules/
    ├── auth/            # login, registro, store, acciones
    └── shared/          # UI, layout, guards, stores, utils
prisma/schema.prisma     # modelo User (el resto del dominio aún no existe)
```

Las convenciones de módulos, nombres de archivo y diseño están en `AGENTS.md`.

## Próximos pasos

Ver `TODO.md`.
