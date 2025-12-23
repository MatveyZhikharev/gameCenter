# 🎮 Video Games Catalog

Современное SPA для просмотра, поиска и редактирования каталога видеоигр с защищённой админкой и хранением данных в PostgreSQL. Фронт — React/TypeScript/Redux Toolkit, бэкенд — Express + Postgres (есть переключение на Supabase). Демо: https://matveyzhikharev.github.io/video-games-catalog/

## 📦 Как получить исходники
```bash
git clone https://github.com/MatveyZhikharev/frontendPP.git
cd frontendPP
```

## ✅ Требования
- Node.js 20+ (LTS) и npm 10+
- Docker + Docker Compose (для локальной Postgres) или установленный PostgreSQL 15+
- Git
- Опционально Supabase, если хотите использовать облачную БД

## 🚀 Запуск проекта (Unix)
1) Установить зависимости:
```bash
npm install
cd backend && npm install && cd ..
```
2) Настроить переменные окружения:
- Фронт (`.env` из `.env.example`):
```env
VITE_USE_EXPRESS_BACKEND=true
VITE_API_URL=http://localhost:3001/api
```
- Бэк (`backend/.env` из `backend/.env.example`):
```env
ADMIN_LOGIN=admin
ADMIN_PASSWORD=admin123
DB_HOST=localhost
DB_PORT=5432
DB_NAME=gamecatalog
DB_USER=postgres
DB_PASSWORD=password
```
3) Поднять базу (Docker):
```bash
cd backend
docker-compose up -d
```
4) Инициализировать схему и данные:
```bash
npm run dev   # создать таблицы, затем остановить Ctrl+C
npm run seed  # залить стартовые игры
```
5) Запустить backend:
```bash
npm run dev
```
6) Запустить frontend (в корне, новый терминал):
```bash
cd ..
npm run dev
```
7) Открыть http://localhost:5173/video-games-catalog/ (админка — /admin).

## 🔑 Основной сценарий (бизнес-кейс)
1) Открыть `/admin`, войти логином/паролем из `backend/.env`.
2) Выбрать игру, отредактировать поля (включая ссылку на обложку), сохранить.
3) На главной странице увидеть обновлённые данные, добавить игры в избранное и просмотреть favorites.

## 📂 Структура
- `src/` — фронтенд
  - `api/` — клиенты Express/Supabase
  - `app/` — store и typed hooks
  - `components/` — UI, layout и feature-компоненты
  - `features/` — Redux-слайсы игр/избранного
  - `pages/` — страницы (home, favorites, admin и др.)
  - `utils/` — хелперы (в т.ч. расчёт релевантности)
- `backend/` — Express + Postgres
  - `routes/` — games, favorites, ai, admin
  - `middleware/` — admin-auth, error handler, CORS
  - `services/` — работа с БД
  - `scripts/seed.ts` — наполнение БД играми
  - `docker-compose.yml` — локальная БД

## 🧪 Тесты
- Backend: `cd backend && npm test` (tsx, admin-auth middleware)

## ℹ️ Примечания
- Supabase: можно включить, поставив `VITE_USE_EXPRESS_BACKEND=false` и задав `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`.
