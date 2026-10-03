# 20 — promiseAllLimit

**Dificultad:** Hard · **Tiempo sugerido:** 25-30 min

## Enunciado

Implementa `promiseAllLimit(tasks, limit)`, una función que se comporta como `Promise.all` pero solo ejecuta `limit` tareas en paralelo a la vez (un pool con concurrencia limitada), preservando el orden de los resultados según el orden de `tasks`, sin importar en qué orden terminen de resolver.

## Firma

```ts
function promiseAllLimit<T>(
  tasks: (() => Promise<T>)[],
  limit: number
): Promise<T[]>;
```

## Ejemplos

```ts
const tasks = [1, 2, 3, 4, 5].map((n) => () => delay(100) .then(() => n * 10));

const results = await promiseAllLimit(tasks, 2);
// [10, 20, 30, 40, 50]  -- en orden, aunque como maximo 2 corren a la vez
```

## Edge cases a considerar

- Nunca deben correr más de `limit` tareas simultáneamente (puedes verificarlo contando tareas "activas" en los tests).
- El resultado debe mantener el orden original de `tasks`, no el orden en que resuelven.
- `limit >= tasks.length` → básicamente equivale a `Promise.all`.
- Si alguna tarea rechaza, la función completa debe rechazar con ese error (igual que `Promise.all`).
- `tasks: []` → `[]`.

## Cómo trabajar este ejercicio

1. Implementa en `solution.ts`.
2. `npx ts-node practice/20-promise-all-limit/solution.test.ts`
