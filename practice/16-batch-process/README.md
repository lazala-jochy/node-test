# 16 — batchProcess

**Dificultad:** Medium · **Tiempo sugerido:** 15 min

## Enunciado

Escribe una función `batchProcess(items, batchSize, asyncFn)` que procese un arreglo en lotes (batches): dentro de cada lote, las llamadas se ejecutan en **paralelo**; entre lotes, se ejecutan de forma **secuencial** (el lote 2 no arranca hasta que termine completamente el lote 1). Útil para evitar saturar una API externa o una base de datos con miles de llamadas simultáneas.

## Firma

```ts
function batchProcess<T, R>(
  items: T[],
  batchSize: number,
  asyncFn: (item: T) => Promise<R>
): Promise<R[]>;
```

## Ejemplos

```ts
const ids = [1, 2, 3, 4, 5];
const results = await batchProcess(ids, 2, async (id) => {
  return id * 10;
});
// [10, 20, 30, 40, 50]  (se mantiene el orden original)
// Internamente: [1,2] en paralelo -> luego [3,4] en paralelo -> luego [5]
```

## Edge cases a considerar

- El resultado debe mantener el **mismo orden** que `items`, sin importar qué tan rápido resuelva cada promesa dentro de un batch.
- Arreglo vacío → `[]`.
- `batchSize` mayor al tamaño del arreglo → un solo batch con todos los items en paralelo.
- Si un item del batch falla (`asyncFn` rechaza), decide y documenta cómo se comporta tu implementación.

## Cómo trabajar este ejercicio

1. Implementa en `solution.ts`.
2. `npx ts-node practice/16-batch-process/solution.test.ts`
