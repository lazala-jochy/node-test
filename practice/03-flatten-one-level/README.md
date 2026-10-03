# 03 — flattenOneLevel

**Dificultad:** Easy · **Tiempo sugerido:** 5-10 min

## Enunciado

Escribe una función `flattenOneLevel(arr)` que aplane un arreglo con un solo nivel de anidación.

## Firma

```ts
function flattenOneLevel<T>(arr: (T | T[])[]): T[];
```

## Ejemplos

```ts
flattenOneLevel([1, [2, 3], 4]);        // [1, 2, 3, 4]
flattenOneLevel([[1, 2], [3, 4]]);      // [1, 2, 3, 4]
flattenOneLevel([1, 2, 3]);             // [1, 2, 3]
flattenOneLevel([]);                    // []
```

## Edge cases a considerar

- Arreglo vacío → `[]`.
- Arreglo sin ningún nivel de anidación (debe quedar igual).
- Solo un nivel de anidación: `[1, [2, [3, 4]]]` → `[1, 2, [3, 4]]` (el nivel interno **no** se aplana).

## Cómo trabajar este ejercicio

1. Implementa en `solution.ts`.
2. `npx ts-node practice/03-flatten-one-level/solution.test.ts`
