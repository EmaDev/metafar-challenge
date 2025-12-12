# Contexto del Proyecto: metafar-fe (Challenge: Mercado de Valores)

## Stack Tecnológico
- Frontend: React 18 + TypeScript sobre Vite (bundler).
- UI: MUI 5 (Emotion) y react-spinners; gráficos con Highcharts/HighchartsReact.
- Routing: React Router v6; HTTP client: Axios.
- Tooling: ESLint (script `lint`), TypeScript `strict` activado, Vite plugin React.
- Backend/DB: No hay backend ni base de datos; consumo directo de la API Twelve Data.
- CI/CD: No se detectan pipelines configurados.

## Estructura Principal
- src/
  - api/index.ts: cliente Axios con llamadas a Twelve Data (API key hardcodeada).
  - components/
    - atoms/ (Button, DateInput, IntervalSelect, RadioButton, SelectInput, TableHeader, TableRow, TextField, index.ts).
    - molecules/ y templates/ (sin archivos).
    - pages/ (HomePage.tsx, DetailPage.tsx).
    - StockTable.tsx, StockPreferenceForm.tsx, StockChart.tsx, Detail.tsx, index.ts.
  - hooks/useDebounce.ts.
  - helpers.ts.
  - errorBoundary.tsx.
  - App.tsx, main.tsx, App.css.
  - types.ts.
- public/ (assets estáticos).
- index.html.
- vite.config.ts (puertos 8080 para dev/preview, host: true).
- tsconfig.json y tsconfig.node.json (TypeScript estricto, moduleResolution bundler).

## Comandos Críticos
- Dev: `yarn dev` (o `npm run dev`).
- Build: `yarn build` (TypeScript + `vite build`).
- Preview: `yarn preview`.
- Lint: `yarn lint`.

## Convenciones de Código
- Naming: componentes y tipos en PascalCase; funciones/variables en camelCase.
- Imports: rutas relativas; módulos ES `type: module`.
- Exports: principalmente `default` por archivo de componente/hook.
- Estilo: JSX con `react-jsx`; TypeScript con `strict`, `noUnusedLocals`, `noUnusedParameters`.
- UI distribuida con patrón atomic design básico (`atoms/`; carpetas `molecules/` y `templates/` vacías).

## Puntos Críticos
- Configuración en `vite.config.ts` (puerto 8080 fijo, host habilitado) y `tsconfig*.json` (modo estricto).
- API key expuesta en `src/api/index.ts`; mover a `.env` (`VITE_TWELVE_DATA_API_KEY`) y leer vía `import.meta.env`.
- No existe archivo `.env.example` ni manejo centralizado de configuración.
- No hay suite de tests configurada.

## Patrones Arquitectónicos
- SPA con React Router y componentes funcionales.
- Capa de datos acoplada directamente a componentes (llamadas Axios sin caching ni capa de servicios separada).
- Estructura UI orientada a atomic design; estado manejado con hooks locales, sin React Query ni store global.
- ErrorBoundary simple alrededor de la app.
