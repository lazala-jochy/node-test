# 19 — createRateLimiter

**Dificultad:** Hard · **Tiempo sugerido:** 25 min

## Enunciado

Implementa un rate limiter en memoria `createRateLimiter(maxRequests, windowMs)` que retorne una función `isAllowed(userId)` que indique si el usuario puede hacer una request más, según una ventana de tiempo fija (fixed window).

## Firma

```ts
function createRateLimiter(
  maxRequests: number,
  windowMs: number
): (userId: string) => boolean;
```

## Ejemplos

```ts
const isAllowed = createRateLimiter(3, 1000); // max 3 requests por segundo

isAllowed("u1"); // true  (1ra request)
isAllowed("u1"); // true  (2da)
isAllowed("u1"); // true  (3ra)
isAllowed("u1"); // false (4ta, excede el limite dentro de la ventana)

isAllowed("u2"); // true  (usuario distinto, contador independiente)
```

```ts
// Despues de que pase windowMs, el contador se reinicia para ese usuario
await delay(1100);
isAllowed("u1"); // true de nuevo
```

## Edge cases a considerar

- Cada `userId` tiene su propio contador independiente.
- Al terminar la ventana de tiempo, el contador de ese usuario se reinicia (fixed window: no es necesario implementar sliding window, aunque es un buen bonus si te sobra tiempo).
- No debe crecer en memoria indefinidamente con usuarios viejos inactivos (bonus: limpieza perezosa).

## Cómo trabajar este ejercicio

1. Implementa en `solution.ts`.
2. `npx ts-node practice/19-rate-limiter/solution.test.ts`
