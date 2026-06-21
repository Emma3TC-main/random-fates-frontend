# Fix de integración frontend-backend

## Problemas corregidos

1. **GET /v1/api/test no existe**
   - `Home.js` llamaba a `/api/test`, pero el backend real solo expone rutas bajo `/health`, `/auth`, `/raffles`, `/participants`, `/prizes`, `/executions`, `/results`, `/billing`, `/admin` y `/users`.
   - Se cambió por `GET /health` sin autenticación.

2. **Error de validación en detalle de sorteo**
   - `Raffle.js` y `useGameRaffle.js` pedían participantes con `limit: 300`.
   - El backend valida `limit <= 200` para `GET /raffles/:raffleId/participants`.
   - Se corrigió a `limit: 200` y se agregó sanitización de query params.

3. **Promesas no capturadas en minijuegos**
   - Los hooks de ruleta, selección aleatoria y slots relanzaban errores después de setear estado.
   - Eso generaba `Uncaught (in promise)` en React.
   - Ahora el error se muestra en UI y no rompe la pantalla.

4. **Botones de ejecución activos cuando el sorteo no podía ejecutarse**
   - Los minijuegos permitían presionar ejecutar aunque el sorteo ya estuviera `FINISHED` o no tuviera participantes.
   - Se agregó `disabled={!canExecute}` en ruleta, random picker y slots.

5. **Selección de sorteo incorrecta por tipo de minijuego**
   - La pantalla `/games` podía mandar un sorteo `ROULETTE` hacia `/games/slots` si era el único activo.
   - Ahora cada card busca un sorteo `ACTIVE` del mismo tipo. Si no hay, crea una demo del tipo correcto.

6. **Seeder más consistente**
   - `scripts/seed-demo-api.mjs` usa `demo@randomfates.test` por defecto.
   - Los identificadores demo quedaron fijos por sorteo (`SEED-001`, `SEED-002`, etc.).
   - Se agregó `SEED_RAFFLE_TYPE` para crear demos de `ROULETTE`, `RANDOM_PICKER` o `SLOT` sin tocar backend.

## Validación ejecutada

```bash
npm run build
```

Resultado: compilación correcta.

## Comandos útiles

Crear demo ruleta:

```cmd
node scripts\seed-demo-api.mjs
```

Crear demo random picker:

```cmd
set SEED_RAFFLE_TYPE=RANDOM_PICKER
node scripts\seed-demo-api.mjs
```

Crear demo slots:

```cmd
set SEED_RAFFLE_TYPE=SLOT
node scripts\seed-demo-api.mjs
```

Ejecutar el sorteo desde el seeder:

```cmd
set SEED_EXECUTE=true
node scripts\seed-demo-api.mjs
```

Para probar minijuegos visuales, conviene dejar `SEED_EXECUTE=false`, porque el sorteo debe quedar `ACTIVE`.
