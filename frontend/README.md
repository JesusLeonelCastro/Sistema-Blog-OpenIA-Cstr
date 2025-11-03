# Frontend · Sistema Blog CSTR

Aplicación Angular (standalone + SSR) para el panel del blog.

## Requisitos

- Node.js 20+
- Angular CLI `npm install -g @angular/cli`
- Backend corriendo en `http://localhost:3907`

## Scripts

```bash
ng serve          # Dev + Hot Reload (http://localhost:4200)
ng build          # Build producción (dist/frontend)
ng test           # Unit tests con Karma
ng e2e            # E2E tests (si se configura)
```

## Estructura destacada

- `src/app/components/*` componentes standalone (login, create, home, header, footer…)
- `src/app/service/user.service.ts` llamadas HTTP al backend (`/api/user/...`)
- `src/app/guards/auth.guard.ts` protege rutas (requiere token en `localStorage`)
- `src/app/app.routes.ts` rutas + guard
- `src/styles.css` Tailwind + Flowbite

## Autenticación y rutas

1. Login guarda `token` y `user` en `localStorage`.
2. Guard revisa el token y redirige al `/login` si no existe.
3. Botón “Cerrar sesión” limpia el almacenamiento y redirige.

## Tema claro/oscuro

- Tailwind `darkMode: 'class'`
- Botón en el header alterna clase `dark` en `<html>` y persiste en `localStorage`.

## Backend esperado

Endpoints:

- `POST /api/user/login`
- `POST /api/user/register`
- `GET /api/user/list` (u otros usados en `UserService`)

Mantén el backend sincronizado para evitar errores de autenticación.# Frontend · Sistema Blog CSTR

Aplicación Angular (standalone + SSR) para el panel del blog.

## Requisitos

- Node.js 20+
- Angular CLI `npm install -g @angular/cli`
- Backend corriendo en `http://localhost:3907`

## Scripts

```bash
ng serve          # Dev + Hot Reload (http://localhost:4200)
ng build          # Build producción (dist/frontend)
ng test           # Unit tests con Karma
ng e2e            # E2E tests (si se configura)
```

## Estructura destacada

- `src/app/components/*` componentes standalone (login, create, home, header, footer…)
- `src/app/service/user.service.ts` llamadas HTTP al backend (`/api/user/...`)
- `src/app/guards/auth.guard.ts` protege rutas (requiere token en `localStorage`)
- `src/app/app.routes.ts` rutas + guard
- `src/styles.css` Tailwind + Flowbite

## Autenticación y rutas

1. Login guarda `token` y `user` en `localStorage`.
2. Guard revisa el token y redirige al `/login` si no existe.
3. Botón “Cerrar sesión” limpia el almacenamiento y redirige.

## Tema claro/oscuro

- Tailwind `darkMode: 'class'`
- Botón en el header alterna clase `dark` en `<html>` y persiste en `localStorage`.

## Backend esperado

Endpoints:

- `POST /api/user/login`
- `POST /api/user/register`
- `GET /api/user/list` (u otros usados en `UserService`)

Mantén el backend sincronizado para evitar errores de autenticación.