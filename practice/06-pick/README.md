# 06 — pick

**Dificultad:** Easy · **Tiempo sugerido:** 8 min

## Enunciado

Escribe una función `pick(obj, keys)` que retorne un nuevo objeto conteniendo solo las propiedades especificadas en `keys`.

## Firma

```ts
function pick<T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K>;
```

## Ejemplos

```ts
pick({ id: 1, name: "Jose", email: "j@x.com" }, ["id", "name"]);
// { id: 1, name: "Jose" }

pick({ a: 1, b: 2 }, []);
// {}

pick({ a: 1 }, ["a", "b" as any]);
// { a: 1 }  (ignora keys que no existen en el objeto)
```

## Edge cases a considerar

- `keys` vacío → objeto vacío `{}`.
- Keys que no existen en `obj` se ignoran silenciosamente (no deben aparecer como `undefined`).
- No debe mutar el objeto original.

## Cómo trabajar este ejercicio

1. Implementa en `solution.ts`.
2. `npx ts-node practice/06-pick/solution.test.ts`
