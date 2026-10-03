# 15 — validateUser

**Dificultad:** Medium · **Tiempo sugerido:** 15 min

## Enunciado

Escribe una función `validateUser(user)` que simule la validación del body de un request `POST /users`. Debe retornar un arreglo de mensajes de error (en vez de lanzar excepciones) para que sea fácil de usar en un controlador/middleware.

## Firma

```ts
interface UserInput {
  name?: string;
  email?: string;
  age?: number;
}

function validateUser(user: UserInput): string[];
```

## Reglas de validación

- `name` es requerido y debe tener al menos 2 caracteres.
- `email` es requerido y debe tener formato de email válido.
- `age`, si se envía, debe ser un número entero positivo (no es obligatorio).

## Ejemplos

```ts
validateUser({ name: "Jo", email: "jo@example.com" });
// []  (valido, sin errores)

validateUser({ name: "J", email: "not-an-email" });
// ["name must be at least 2 characters", "email is invalid"]

validateUser({});
// ["name is required", "email is required"]

validateUser({ name: "Jose", email: "j@x.com", age: -5 });
// ["age must be a positive integer"]
```

## Edge cases a considerar

- Si no se envía `name`, el mensaje debe ser `"name is required"` (distinto del mensaje de longitud).
- `age` es opcional: si no viene, no debe generar error.
- El orden de los mensajes debe ser: `name`, luego `email`, luego `age`.

## Cómo trabajar este ejercicio

1. Implementa en `solution.ts`.
2. `npx ts-node practice/15-validate-user/solution.test.ts`
