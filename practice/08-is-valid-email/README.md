# 08 — isValidEmail

**Dificultad:** Easy · **Tiempo sugerido:** 8 min

## Enunciado

Escribe una función `isValidEmail(email)` que valide si un string tiene formato de email usando una expresión regular simple (no necesitas cubrir el 100% del RFC 5322, solo casos razonables).

## Firma

```ts
function isValidEmail(email: string): boolean;
```

## Ejemplos

```ts
isValidEmail("user@example.com");     // true
isValidEmail("user.name+tag@sub.example.com"); // true
isValidEmail("invalid-email");        // false
isValidEmail("user@");                // false
isValidEmail("@example.com");         // false
isValidEmail("user@example");         // false (sin TLD)
```

## Edge cases a considerar

- Debe exigir al menos un `.` después del `@` (dominio con TLD).
- No debe permitir espacios.
- String vacío → `false`.

## Cómo trabajar este ejercicio

1. Implementa en `solution.ts`.
2. `npx ts-node practice/08-is-valid-email/solution.test.ts`
