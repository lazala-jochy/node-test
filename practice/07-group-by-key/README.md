# 07 — groupByKey

**Dificultad:** Easy · **Tiempo sugerido:** 10 min

## Enunciado

Escribe una función `groupByKey(items, key)` que agrupe un arreglo de objetos según el valor de una propiedad dada.

## Firma

```ts
function groupByKey<T extends Record<string, any>>(
  items: T[],
  key: keyof T
): Record<string, T[]>;
```

## Ejemplos

```ts
const users = [
  { id: 1, role: "admin" },
  { id: 2, role: "user" },
  { id: 3, role: "admin" },
];

groupByKey(users, "role");
// {
//   admin: [{ id: 1, role: "admin" }, { id: 3, role: "admin" }],
//   user: [{ id: 2, role: "user" }]
// }
```

## Edge cases a considerar

- Arreglo vacío → `{}`.
- El valor de la propiedad se usa como string (ej. si la key es numérica, conviértela a string para la clave del objeto resultado).
- No debe mutar el arreglo original ni los objetos dentro.

## Cómo trabajar este ejercicio

1. Implementa en `solution.ts`.
2. `npx ts-node practice/07-group-by-key/solution.test.ts`
