# 01 — sumArray

**Dificultad:** Easy · **Tiempo sugerido:** 5-10 min

## Enunciado

Escribe una función `sumArray(arr)` que reciba un arreglo de números y retorne la suma de todos sus elementos.

## Firma

```ts
function sumArray(arr: number[]): number;
```

## Ejemplos

```ts
sumArray([1, 2, 3]);      // 6
sumArray([]);             // 0
sumArray([-5, 5, 10]);    // 10
sumArray([1.5, 2.5]);     // 4
```

## Edge cases a considerar

- Arreglo vacío → `0`.
- Números negativos y decimales.
- No debe mutar el arreglo original.

## Cómo trabajar este ejercicio

1. Implementa tu solución en `solution.ts` (reemplaza el `TODO`).
2. Corre los tests: `npx ts-node practice/01-sum-array/solution.test.ts`
