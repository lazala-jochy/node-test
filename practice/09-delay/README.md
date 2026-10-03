# 09 — delay

**Dificultad:** Easy · **Tiempo sugerido:** 5 min

## Enunciado

Escribe una función `delay(ms)` que retorne una Promise que se resuelve después de `ms` milisegundos. Es la base para construir utilidades async más complejas (retries, rate limiters, etc. — ver ejercicios 12, 19).

## Firma

```ts
function delay(ms: number): Promise<void>;
```

## Ejemplos

```ts
await delay(100); // espera ~100ms y continua
console.log("esto se imprime despues de 100ms");
```

## Edge cases a considerar

- `delay(0)` debe seguir siendo asíncrono (no debe resolver de forma síncrona/inmediata en el mismo tick).
- No debe lanzar error con valores válidos.

## Cómo trabajar este ejercicio

1. Implementa en `solution.ts`.
2. `npx ts-node practice/09-delay/solution.test.ts`
