# Steik

Registro personal de apuestas deportivas. Web app mobile-first e instalable (PWA), sin tienda de aplicaciones.

## Funcionalidades previstas

- Registro de apuestas (ganadas, perdidas, pendientes, anuladas) sin ejecutarlas en ninguna casa de apuestas.
- Dashboard con balance, ROI, rendimiento y proyecciones.
- Equipos de fútbol cargados manualmente, con pestaña de favoritos.
- Próximos partidos de los equipos favoritos, con cuotas por mercado.
- Historial de apuestas.

## Requisitos

- Node.js 20+
- pnpm
- PostgreSQL

## Configuración

Crea un archivo `.env` con al menos:

```bash
DATABASE_URL="postgresql://..."
AUTH_SECRET="cambia-esto"
```

## Comandos

```bash
pnpm dev
pnpm build
pnpm lint
pnpm test:run
pnpm prisma:db:push
pnpm prisma:migrate
```

## Estructura

Ver `AGENTS.md` (arquitectura, convenciones y diseño) y `docs/overview.md`.
