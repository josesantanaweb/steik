# Steik — Roadmap

## Base
- [x] Limpiar la base copiada de Aura (e-commerce de perfumes)
- [x] Barra inferior reutilizable con Lucide y botón central
- [x] Páginas placeholder de cada pestaña
- [ ] Logo final de Steik (el actual es provisional)
- [ ] Configurar `.env`, base de datos y `prisma migrate dev --name init`

## Equipos
- [ ] Modelo `Team` en Prisma
- [ ] Alta, edición y borrado manual de equipos
- [ ] Lista con pestañas Todos / Favoritos y filtro por liga
- [ ] Marcar y desmarcar favoritos

## Partidos
- [ ] Integrar API de fútbol (API-Football) desde Route Handlers
- [ ] Cachear partidos próximos de los equipos favoritos
- [ ] Lista por día de los próximos partidos
- [ ] Detalle del partido con cuotas por mercado
- [ ] Botón "Registrar apuesta" desde el detalle

## Apuestas
- [ ] Modelo `Bet` (mercado, selección, cuota, stake, estado, notas)
- [ ] Formulario de nueva apuesta (`/bets/new`)
- [ ] Cálculo de ganancia: ganada = stake × (cuota − 1), perdida = −stake, anulada = 0
- [ ] Historial con filtros por estado, fecha y mercado
- [ ] Editar estado de una apuesta pendiente

## Dashboard
- [ ] Balance neto, ROI, yield, % de acierto y cuota media
- [ ] Gráfica de balance acumulado
- [ ] Indicador "vas bien / vas mal" según umbral configurable
- [ ] Proyección por media móvil del beneficio por apuesta

## Plataforma
- [ ] Protección de rutas con AuthGuard en las pantallas principales
- [ ] Modo offline y caché del service worker
- [ ] Notificaciones de partidos próximos (Web Push, requiere PWA instalada en iOS)
- [ ] Tests de cálculo de estadísticas
