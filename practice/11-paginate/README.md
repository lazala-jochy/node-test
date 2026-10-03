# 11 — paginate

**Dificultad:** Medium · **Tiempo sugerido:** 10 min

## Enunciado

Escribe una función `paginate(items, page, pageSize)` que retorne la porción correcta de un arreglo para una página dada. Es el patrón típico detrás de `GET /items?page=2&pageSize=10` en una API REST.

## Firma

```ts
function paginate<T>(items: T[], page: number, pageSize: number): T[];
```

## Ejemplos

```ts
const items = [1, 2, 3, 4, 5, 6, 7];

paginate(items, 1, 3);   // [1, 2, 3]
paginate(items, 2, 3);   // [4, 5, 6]
paginate(items, 3, 3);   // [7]
paginate(items, 4, 3);   // []  (pagina fuera de rango)
```

## Edge cases a considerar

- `page` asume base 1 (no base 0).
- Página fuera de rango → `[]`, no debe lanzar error.
- `pageSize <= 0` o `page <= 0` → trátalo como entrada inválida, retorna `[]`.
- No debe mutar el arreglo original.

## Cómo trabajar este ejercicio

1. Implementa en `solution.ts`.
2. `npx ts-node practice/11-paginate/solution.test.ts`
