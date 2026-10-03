# 04 — countOccurrences

**Dificultad:** Easy · **Tiempo sugerido:** 5 min

## Enunciado

Escribe una función `countOccurrences(arr, value)` que cuente cuántas veces aparece `value` dentro de `arr`.

## Firma

```ts
function countOccurrences<T>(arr: T[], value: T): number;
```

## Ejemplos

```ts
countOccurrences([1, 2, 2, 3, 2], 2);     // 3
countOccurrences(["a", "b", "a"], "a");   // 2
countOccurrences([1, 2, 3], 5);           // 0
countOccurrences([], "x");                // 0
```

## Edge cases a considerar

- `value` no existe en el arreglo → `0`.
- Arreglo vacío → `0`.
- Comparación estricta (`===`), no uses `==`.

## Cómo trabajar este ejercicio

1. Implementa en `solution.ts`.
2. `npx ts-node practice/04-count-occurrences/solution.test.ts`
