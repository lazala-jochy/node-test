# 14 — mergeDeep

**Dificultad:** Medium · **Tiempo sugerido:** 15 min

## Enunciado

Escribe una función `mergeDeep(obj1, obj2)` que combine dos objetos planos de forma profunda: los objetos anidados se combinan recursivamente (no se sobrescriben por completo); los valores primitivos y arreglos de `obj2` sobrescriben a los de `obj1`.

## Firma

```ts
function mergeDeep(
  obj1: Record<string, any>,
  obj2: Record<string, any>
): Record<string, any>;
```

## Ejemplos

```ts
mergeDeep(
  { user: { name: "Jose", age: 30 }, active: true },
  { user: { age: 31, city: "SD" } }
);
// {
//   user: { name: "Jose", age: 31, city: "SD" },
//   active: true
// }
```

```ts
mergeDeep({ a: 1 }, { a: { b: 2 } });
// { a: { b: 2 } }  (si obj2 cambia el tipo, obj2 gana)

mergeDeep({ tags: [1, 2] }, { tags: [3] });
// { tags: [3] }  (los arreglos NO se combinan, se reemplazan completos)
```

## Edge cases a considerar

- Si una clave existe en ambos y ambos valores son objetos planos (no arreglos), se combinan recursivamente.
- Si una clave existe en ambos pero al menos uno no es un objeto plano (es primitivo, array, `null`), el valor de `obj2` reemplaza por completo al de `obj1`.
- No debe mutar `obj1` ni `obj2` — debe retornar un objeto nuevo.

## Cómo trabajar este ejercicio

1. Implementa en `solution.ts`.
2. `npx ts-node practice/14-merge-deep/solution.test.ts`
