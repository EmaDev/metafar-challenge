# Mejoras a Realizar (Plan Ejecutable)

## Prioridad 0: Higiene y Configuración
- Mover API key de Twelve Data a `.env` (`VITE_TWELVE_DATA_API_KEY`) y agregar `.env.example`; leer con `import.meta.env` en la capa API.
- Añadir `PROJECT_CONTEXT.md` (ya creado) y mantenerlo actualizado tras cambios relevantes.

## React Query (TanStack Query)
- Instalar `@tanstack/react-query` y `@tanstack/react-query-devtools`; crear `src/queryClient.ts` con `QueryClient` y `defaultOptions` (staleTime/cacheTime por tipo de dato, retry con backoff, refetchOnWindowFocus configurable).
- Envolver la app con `QueryClientProvider` y DevTools solo en desarrollo.
- Definir esquema de `queryKey` tipado (e.g. `["stocks"]`, `["stock", symbol]`, `["quote", { symbol, interval, startDate, endDate }]`, `["search", query]`).
- Crear hooks en `src/hooks/queries/`: `useStockList`, `useStockData`, `useStockQuote`, `useStockSearch` con `keepPreviousData`, `placeholderData` y `enabled`/`select` según corresponda.
- Prefetch: al hover de filas de tabla (`useQueryClient().prefetchQuery`) y al entrar a la ruta de detalle.
- Invalidación: exponer helpers para invalidar `quote` al cambiar intervalo/fechas y cancelar queries en unmount (React Query ya deduplica).

## Capa de Datos y Tipos
- Reorganizar `src/api/` en `client.ts` (Axios con interceptors), `endpoints.ts`, `types.ts`.
- Crear `src/services/` por dominio (stocks, quotes, search) que usen el cliente configurado.
- Tipar respuestas de Twelve Data (time_series, quote, search, stocks) y parámetros; evitar `any` implícitos.
- (Opcional) Validación con Zod para respuestas críticas; fallback a type guards.

## Arquitectura de Presentación
- Refactorizar rutas con `React.lazy` + `Suspense` para `Detail` y componentes pesados (Highcharts).
- Ajustar `StockTable` para consumir `useStockList` (caché estático: `staleTime: Infinity`, persistencia localStorage opcional).
- Ajustar `Detail` para usar `useStockQuote` y `useStockData`; soporte `keepPreviousData` en cambio de intervalo/fechas.
- Centralizar estado de preferencia de intervalo/fechas con React Query en lugar de `setState` local donde aplique.

## Performance
- Virtualizar tabla con `react-window` o `@tanstack/react-virtual`; mantener búsqueda y paginación o migrar a scroll virtual con control de filas visibles.
- Code splitting: Highcharts y página de detalle en chunks separados; prefetch de chunk al hover de link.
- Memoización: `React.memo` para filas de tabla y componentes atómicos que reciben props estables; `useMemo` para filtrado y transformación de datos de gráfico; `useCallback` en handlers.
- Highcharts: limitar puntos (sampling), `dataGrouping` y `boost` para datasets grandes; lazy load del gráfico.

## UX y Estados
- Estados de carga: usar `isLoading`/`isFetching`/`isError` de React Query; skeletons para tabla y gráfico.
- Modo tiempo real: `refetchInterval` dinámico según intervalo seleccionado; botón pausar/reanudar; indicador visual de actualización en background.
- Errores: mensajes amigables por sección; mejorar `ErrorBoundary` (opcionalmente con `react-error-boundary`).
- Responsividad mínima en al menos una pantalla clave; considerar toasts para notificaciones de error/éxito.

## TypeScript y Calidad
- Mantener `strict` (ya activo); eliminar implícitos; compartir tipos comunes (e.g. `Pagination`, `IntervalOption`).
- Tipar `queryKey` y resultados; evitar casts innecesarios.
- Añadir ESLint config más estricta (reglas para hooks, exhaustive-deps, no-floating-promises) y (opcional) Prettier.

## Testing (Valorable)
- Configurar Vitest + React Testing Library; utilidades para envolver en `QueryClientProvider` en tests.
- Tests de hooks (`useStockList`, `useStockQuote`) con mocks de servicios; tests de componentes críticos (tabla y detalle) para estados loading/error/success.

## DX y CI (Opcional)
- Husky + lint-staged para lint/test en pre-commit.
- Bundle analyzer (`rollup-plugin-visualizer`) para medir impacto de code splitting.
- Scripts de métricas: Lighthouse y reportes de React Profiler (documentar antes/después).

## Documentación y Entregables
- Actualizar README con nueva arquitectura, comandos y estructura de carpetas.
- Documento técnico resumido: estrategia de caché por tipo de dato, trade-offs, optimizaciones de performance con métricas.
- Registrar métricas: Lighthouse (Performance, FCP, TTI), tamaño de bundle, re-renders en React Profiler.
