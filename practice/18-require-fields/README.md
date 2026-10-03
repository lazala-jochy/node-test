# 18 — requireFields (middleware style)

**Dificultad:** Medium · **Tiempo sugerido:** 15 min

## Enunciado

Escribe una función `requireFields(fields)` que retorne un middleware estilo Express `(req, res, next)` que valide que todos los campos listados existan en `req.body`. Si falta alguno, responde `400` con la lista de campos faltantes; si están todos, llama a `next()`.

## Firma

```ts
interface Req {
  body: Record<string, any>;
}
interface Res {
  status(code: number): Res;
  json(body: any): void;
}
type Next = () => void;

function requireFields(
  fields: string[]
): (req: Req, res: Res, next: Next) => void;
```

## Ejemplos

```ts
const middleware = requireFields(["name", "email"]);

// req.body = { name: "Jose", email: "j@x.com" }
middleware(req, res, next); // llama a next(), no toca res

// req.body = { name: "Jose" }
middleware(req, res, next);
// res.status(400).json({ missingFields: ["email"] })
// next() NO se llama
```

## Edge cases a considerar

- Un campo cuenta como "faltante" si no existe, es `undefined`, o es un string vacío `""` (pero `0` y `false` sí cuentan como presentes).
- Si faltan varios campos, todos deben listarse en `missingFields` (no cortar en el primero).
- `fields: []` → siempre llama a `next()`.

## Cómo trabajar este ejercicio

1. Implementa en `solution.ts`.
2. `npx ts-node practice/18-require-fields/solution.test.ts`
