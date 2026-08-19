# Warship Catalog

[English](#english) · [Русский](#русский)

---

## English

A Vue 3 + TypeScript + Vite app that displays the World of Warships encyclopedia. Browse and filter ships by nation, type, tier and premium status using Wargaming's public API.

**Stack:** Vue 3 (`<script setup>`), TypeScript, Vite, Pinia, i18next, SCSS.

### Requirements

- Node.js 20.19+ or 22.12+ (required by Vite 8)
- npm 10+

### Install dependencies

```bash
git clone <repository-url>
cd warshipCatalog
npm install
```

### Run in development mode

```bash
npm run dev
```

Vite starts a dev server at http://localhost:5173 with hot module replacement. Requests to `/api-wows/*` are proxied to `https://vortex.worldofwarships.eu` (configured in `server.proxy` in [vite.config.ts](vite.config.ts)), which bypasses CORS in development. Press `Ctrl+C` to stop the server.

### Run a production build

```bash
npm run build     # vue-tsc type check + bundle into dist/
npm run preview   # serve dist/ at http://localhost:4173
```

`npm run preview` only serves the already-built `dist/` folder, so run `npm run build` first.


### Environment variables

`VITE_API_BASE` sets the API base URL, defaulting to `/api-wows` (the dev proxy path). Create a `.env` file in the project root to override it:

```
VITE_API_BASE=/api-wows
```

### Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server with HMR at http://localhost:5173 |
| `npm run build` | TypeScript type check (`vue-tsc -b`) + production build into `dist/` |
| `npm run preview` | Local preview of the production build at http://localhost:4173 |

---

## Русский

Приложение на Vue 3 + TypeScript + Vite, отображающее энциклопедию World of Warships. Позволяет просматривать и фильтровать корабли по нации, типу, уровню и премиум-статусу, используя публичное API Wargaming.

**Стек:** Vue 3 (`<script setup>`), TypeScript, Vite, Pinia, i18next, SCSS.

### Требования

- Node.js 20.19+ или 22.12+ (требование Vite 8)
- npm 10+

### Установка зависимостей

```bash
git clone <ссылка-на-репозиторий>
cd warshipCatalog
npm install
```

### Запуск в режиме разработки

```bash
npm run dev
```

Vite поднимет dev-сервер на http://localhost:5173 с горячей перезагрузкой модулей. Запросы к `/api-wows/*` проксируются на `https://vortex.worldofwarships.eu` (настроено в `server.proxy` в [vite.config.ts](vite.config.ts)), что снимает проблему CORS при разработке. Остановить сервер — `Ctrl+C`.

### Запуск production-сборки

```bash
npm run build     # проверка типов vue-tsc + сборка в dist/
npm run preview   # раздача dist/ на http://localhost:4173
```

`npm run preview` только раздаёт уже собранную папку `dist/`, поэтому сначала обязательно выполните `npm run build`.

### Переменные окружения

`VITE_API_BASE` задаёт базовый URL API, по умолчанию — `/api-wows` (путь dev-прокси). Чтобы переопределить, создайте файл `.env` в корне проекта:

```
VITE_API_BASE=/api-wows
```

### Доступные скрипты

| Команда | Описание |
| --- | --- |
| `npm run dev` | Dev-сервер с HMR на http://localhost:5173 |
| `npm run build` | Проверка типов (`vue-tsc -b`) + production-сборка в `dist/` |
| `npm run preview` | Локальный просмотр production-сборки на http://localhost:4173 |
