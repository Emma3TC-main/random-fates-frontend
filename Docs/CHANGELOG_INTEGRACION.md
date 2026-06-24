# Cambios aplicados en frontend

- Login y registro conectados a `/auth/login` y `/auth/register`.
- Sesión JWT guardada en `localStorage` con `accessToken`, `refreshToken` y `user`.
- Refresh automático del access token cuando la API responde `401`.
- Dashboard conectado a `GET /raffles`.
- Pantalla de sorteos funcional: crear sorteo, agregar premio, cargar participantes, publicar, ejecutar y ver hash.
- Minijuegos conectados al backend: ruleta, selección aleatoria y slots usan `POST /raffles/:raffleId/executions`.
- Panel admin conectado a endpoints reales: `/admin/kpis`, `/users`, `/raffles`.
- Admin login usa el backend y exige rol `ADMIN`, ya no credenciales fake.
- Seeder por API actualizado para usar `demo@randomfates.test` y dejar por defecto un sorteo `ACTIVE` para pruebas visuales.
- Se mantiene `/dev/backend-flow` como panel técnico de validación.

# Validación

Se ejecutó:

```bash
npm ci
npm run build
```

Resultado: compilación correcta.
