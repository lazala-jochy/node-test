# 17 — aggregateOrders

**Dificultad:** Medium · **Tiempo sugerido:** 10 min

## Enunciado

Escribe una función `aggregateOrders(orders)` que, dado un arreglo de órdenes `{ userId, total }`, retorne un objeto que mapea `userId` → suma total gastada por ese usuario. Este patrón aparece seguido en reportes de backoffice/e-commerce.

## Firma

```ts
interface Order {
  userId: string;
  total: number;
}

function aggregateOrders(orders: Order[]): Record<string, number>;
```

## Ejemplos

```ts
const orders = [
  { userId: "u1", total: 50 },
  { userId: "u2", total: 20 },
  { userId: "u1", total: 15.5 },
];

aggregateOrders(orders);
// { u1: 65.5, u2: 20 }
```

## Edge cases a considerar

- Arreglo vacío → `{}`.
- `total` puede venir como `null`/`undefined` en datos reales — trátalo como `0`, no lo dejes romper la suma (`NaN`).
- Redondea el resultado a 2 decimales para evitar errores de punto flotante (`0.1 + 0.2 !== 0.3`).
- No debe mutar el arreglo de entrada.

## Cómo trabajar este ejercicio

1. Implementa en `solution.ts`.
2. `npx ts-node practice/17-aggregate-orders/solution.test.ts`
