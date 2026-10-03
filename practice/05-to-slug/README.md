# 05 — toSlug

**Dificultad:** Easy · **Tiempo sugerido:** 10 min

## Enunciado

Escribe una función `toSlug(title)` que convierta un título en un "slug" apto para URLs: minúsculas, espacios reemplazados por guiones, sin caracteres especiales.

## Firma

```ts
function toSlug(title: string): string;
```

## Ejemplos

```ts
toSlug("Hello World!");            // "hello-world"
toSlug("  Multiple   Spaces  ");   // "multiple-spaces"
toSlug("Node.js & TypeScript");    // "nodejs-typescript"
toSlug("");                        // ""
```

## Edge cases a considerar

- Espacios múltiples o al inicio/final deben colapsar en un solo guion (sin guiones sobrantes al inicio/fin).
- Caracteres especiales (`!`, `&`, `.`, etc.) se eliminan, no se reemplazan por guion.
- String vacío → `""`.

## Cómo trabajar este ejercicio

1. Implementa en `solution.ts`.
2. `npx ts-node practice/05-to-slug/solution.test.ts`
