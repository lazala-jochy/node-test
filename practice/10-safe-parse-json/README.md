# 10 — safeParseJSON

**Dificultad:** Easy · **Tiempo sugerido:** 5 min

## Enunciado

Escribe una función `safeParseJSON(str)` que retorne el objeto parseado, o `null` si el string no es JSON válido (sin lanzar excepción).

## Firma

```ts
function safeParseJSON<T = unknown>(str: string): T | null;
```

## Ejemplos

```ts
safeParseJSON('{"a": 1}');   // { a: 1 }
safeParseJSON("not json");   // null
safeParseJSON("");           // null
safeParseJSON("42");         // 42 (JSON valido, aunque no sea objeto)
```

## Edge cases a considerar

- JSON inválido → `null`, nunca debe lanzar (`throw`).
- String vacío → `null`.
- Valores JSON primitivos válidos (`"42"`, `"true"`, `'"texto"'`) deben parsear correctamente, no solo objetos.

## Cómo trabajar este ejercicio

1. Implementa en `solution.ts`.
2. `npx ts-node practice/10-safe-parse-json/solution.test.ts`
