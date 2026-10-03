# 12 — fetchWithRetry

**Dificultad:** Medium · **Tiempo sugerido:** 15 min

## Enunciado

Escribe una función `fetchWithRetry(fn, retries, delayMs)` que ejecute una función asíncrona `fn` y, si lanza un error, la reintente hasta `retries` veces con un pequeño delay entre intentos. Si todos los intentos fallan, debe propagar el último error.

## Firma

```ts
function fetchWithRetry<T>(
  fn: () => Promise<T>,
  retries: number,
  delayMs?: number
): Promise<T>;
```

## Ejemplos

```ts
let attempts = 0;
const flaky = async () => {
  attempts++;
  if (attempts < 3) throw new Error("fail");
  return "success";
};

await fetchWithRetry(flaky, 3); // "success" (fallo 2 veces, exito en el 3er intento)
```

```ts
const alwaysFails = async () => {
  throw new Error("boom");
};

await fetchWithRetry(alwaysFails, 2); // lanza Error("boom") tras agotar los 2 reintentos
```

## Edge cases a considerar

- Si `fn` tiene éxito al primer intento, no debe esperar ningún delay.
- Si se agotan todos los reintentos, debe propagar el **último** error (no un error genérico).
- `retries = 0` → solo un intento, sin reintentos.

## Cómo trabajar este ejercicio

1. Implementa en `solution.ts`.
2. `npx ts-node practice/12-fetch-with-retry/solution.test.ts`
