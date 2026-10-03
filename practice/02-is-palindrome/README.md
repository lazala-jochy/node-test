# 02 — isPalindrome

**Dificultad:** Easy · **Tiempo sugerido:** 5-10 min

## Enunciado

Escribe una función `isPalindrome(str)` que determine si un string se lee igual al derecho y al revés, ignorando mayúsculas/minúsculas.

## Firma

```ts
function isPalindrome(str: string): boolean;
```

## Ejemplos

```ts
isPalindrome("Anna");       // true
isPalindrome("anita");      // false
isPalindrome("Level");      // true
isPalindrome("");           // true
```

## Edge cases a considerar

- String vacío → `true`.
- Solo importa ignorar mayúsculas/minúsculas (no necesitas quitar espacios ni signos de puntuación para la versión base).
- **Bonus:** agrega una variante que también ignore espacios y caracteres no alfanuméricos (ej. `"A man a plan a canal Panama"` → `true`).

## Cómo trabajar este ejercicio

1. Implementa en `solution.ts`.
2. `npx ts-node practice/02-is-palindrome/solution.test.ts`
