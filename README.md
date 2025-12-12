# Metafar Challenge – Implementación y Mejoras

## Resumen de Cambios
- **React Query** integrado con `QueryClient` global, keys tipados y hooks por dominio (`useStockList`, `useStockMeta`, `useTimeSeries`, `useStockSearch`). Lista cacheada en localStorage con `staleTime: Infinity`; prefetch de meta y serie (15min, últimos 2 días) en hover con delay de 250ms; `keepPreviousData`, `refetchInterval` dinámico en detalle.
- **Arquitectura de datos**: Axios client con interceptors (`src/api/client.ts`), endpoints tipados, servicios en `src/services/stockService.ts`, tipos centralizados en `src/api/types` (alias en `src/types.ts`).
- **UI/UX**: Tabla virtualizada (`react-window` + `react-virtualized-auto-sizer`), cards/fila enlazan a detail, pills de tipo usando helper, filtros con ícono de búsqueda y botón de limpiar, loading skeletons para lista y gráfico, error boundary estilizado, fallback de rutas lazy con loader. DetailPage con chip “Actualizando…”, alerts de error, rango configurable y auto-refresh.
- **Performance**: Code splitting de rutas y Highcharts; gráfico samplea a 500 pts máx., dataGrouping, boost opcional, eje datetime, tooltips formateados. Prefetch diferido (delay) para reducir llamadas. Contenedor de tabla ancho sin scroll horizontal interno.
- **Testing**: Vitest + Testing Library + jest-dom configurados (jsdom). Tests de hooks (`useStockList`, `useTimeSeries`) y componentes básicos (`HomePage`, `DetailPage` loading). Alias/inline de MUI en Vite para evitar errores ESM.
- **Higiene**: API key movida a `.env` (ignorado); `.env.example` añadido. ErrorBoundary mejorado. Documentos de cambio/contexto (`CAMBIOS_REALIZADOS.md`, `PROJECT_CONTEXT.md`, `MEJORAS_A_REALIZAR.md`).

## Stack y Dependencias Relevantes
- React 18 + TypeScript + Vite.
- UI: MUI 5, Emotion; Icons MUI.
- Datos: Axios + React Query 5.
- Virtualización: `react-window`, `react-virtualized-auto-sizer`.
- Charts: Highcharts + HighchartsReact (optimizado).
- Testing: Vitest, @testing-library/react, jest-dom, user-event.

## Estructura Clave
- `src/api/`: `client.ts`, `endpoints.ts`, `types.ts`.
- `src/services/`: `stockService.ts`.
- `src/hooks/queries/`: `useStockList`, `useStockMeta`, `useTimeSeries`, `useStockSearch`, `queryKeys.ts`.
- `src/components/templates/StockTable.tsx`: tabla virtualizada + filtros.
- `src/components/pages/DetailPage.tsx`: detalle con filtros/auto-refresh + lazy chart.
- `src/components/molecules/StockChart.tsx`: gráfico optimizado (sampling, dataGrouping, boost).
- `src/components/molecules/skeletons/`: `StockListSkeleton`, `StockChartSkeleton`.
- `src/errorBoundary.tsx`: UI de error con acciones.
- `src/test/`: `setupTests.ts`, `testUtils.tsx`.

## Configuración y Entorno
1) Instalar dependencias:
```bash
yarn install
```
2) Variables de entorno (`.env`):
```
VITE_TWELVE_DATA_API_KEY=tu_api_key
VITE_TWELVE_DATA_API_URL=https://api.twelvedata.com
```
(.env está ignorado; usa `.env.example` como referencia).

## Scripts
- `yarn dev` — servidor de desarrollo.
- `yarn build` — tsc + vite build.
- `yarn preview` — previsualizar build.
- `yarn lint` — ESLint.
- `yarn test` / `yarn test:watch` — Vitest (jsdom, Testing Library).

## Estrategia de Datos (React Query)
- Lista de acciones: `staleTime: Infinity`, `gcTime` 24h, persistida en localStorage; key `["stocks","list",exchange]`.
- Meta por símbolo: `staleTime` 5 min; prefetch al hover; key `["stocks","meta",symbol]`.
- Series: `staleTime` 5 min, `keepPreviousData`; `refetchInterval` dinámico en detalle según intervalo cuando auto-refresh está activo; prefetch diferido (250ms) en hover con rango default (últimos 2 días, 15min).
- Búsqueda: `staleTime` 1 min, habilitada con término >1 char; key `["stocks","search",term]`.
- DevTools habilitado en desarrollo (en `main.tsx`).

## Performance y UX
- Virtualización con `react-window`; overscan para scroll suave; prefetch en hover con delay.
- Code splitting: rutas (`HomePage`, `DetailPage`) y gráfico lazy; fallback con loader MUI.
- Highcharts: sampleo, `dataGrouping` (promedio), boost opcional, eje datetime, tooltips.
- Skeletons: lista (mobile/desktop) y gráfico; alerts de error en tabla/detalle; chip “Actualizando…” en detalle.
- Filtros: ícono de lupa y botón “limpiar”.
- Links: filas y cards completas son clicables; pill de tipo coloreada vía helper.

## Testing
- Setup: jsdom, jest-dom, Testing Library, helpers de render con QueryClient + MemoryRouter.
- Cobertura actual:
  - Hooks: `useStockList` (mock servicio, cache), `useTimeSeries` (params, cache key).
  - Componentes: `HomePage` (render encabezados), `DetailPage` (estado loading de meta).
- Ejecutar: `yarn test` o `yarn test:watch`.

## Pendientes / Notas
- Medir y documentar métricas (Lighthouse, bundle size, profiler) para el challenge.
- Decidir sobre limpieza de componentes legacy marcados como borrados en git (antiguos atomics/StockPreferenceForm).
- Alinear la tabla clásica (`atoms/TableRow`) si se quiere la misma UI/pill y link completo que la virtual.
- Mejorar mensajes de error en modo dev (opcional) y agregar tests de UI adicionales si se requiere más confianza.
