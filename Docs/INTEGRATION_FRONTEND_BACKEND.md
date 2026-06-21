# RandomFates Frontend conectado al backend

Este frontend ya consume el backend en `http://localhost:3000/v1` usando los endpoints y JSON schemas generados.

## Variables

Crear o mantener `.env`:

```env
REACT_APP_API_URL=http://localhost:3000/v1
PORT=5173
BROWSER=none
```

## Flujo de prueba recomendado

1. Levantar backend:

```bash
cd randomfates-backend
npm run dev
```

2. Levantar frontend:

```bash
cd random-fates-frontend
npm install
npm start
```

3. Entrar con el seed:

```txt
Email: demo@randomfates.test
Password: Password123
```

Si el usuario no existe, créalo desde `/register` o ejecuta:

```bash
node scripts/seed-demo-api.mjs
```

Por defecto el seeder deja un sorteo `ACTIVE` para poder ejecutarlo desde los minijuegos. Si quieres que el script también ejecute el sorteo:

```cmd
set SEED_EXECUTE=true
node scripts\seed-demo-api.mjs
```

En PowerShell:

```powershell
$env:SEED_EXECUTE="true"
node scripts/seed-demo-api.mjs
```

## Pantallas ya integradas

- `/login`: usa `POST /auth/login`.
- `/register`: usa `POST /auth/register`.
- `/dashboard`: usa `GET /raffles` y datos reales.
- `/raffles`: crea sorteos, premios, participantes, publica y ejecuta.
- `/games`: lista sorteos `ACTIVE` disponibles.
- `/games/roulette?raffleId=ID`: ejecuta por backend y anima la ruleta.
- `/games/random-selection?raffleId=ID`: ejecuta por backend y anima selección.
- `/games/slots?raffleId=ID`: ejecuta por backend y muestra jackpot.
- `/admin/login`: usa `POST /auth/login` y exige rol `ADMIN`.
- `/admin/dashboard`, `/admin/games`, `/admin/users`: consumen endpoints admin reales.
- `/dev/backend-flow`: se mantiene como panel técnico de diagnóstico.

## Admin

Para usar el panel admin necesitas un usuario con rol `ADMIN`. Puedes promoverlo en Supabase:

```sql
UPDATE users
SET role = 'ADMIN'
WHERE email = 'admin@randomfates.test';
```

Luego entra a `/admin/login` con:

```txt
admin@randomfates.test
Password123
```

Si ese usuario no existe, créalo primero desde `/register` y luego ejecútale el `UPDATE`.

## Decisión técnica

No se modificó el backend ni el `prisma/schema.prisma`, porque los endpoints existentes ya cubren la integración estable: auth, sorteos, participantes, premios, ejecución, resultados públicos y admin. El perfil extendido queda para una siguiente iteración para no romper contratos ni migraciones mientras se valida la integración completa.
