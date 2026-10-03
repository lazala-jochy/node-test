import { test, assert, summary } from "../_helpers/test";
import { batchProcess } from "./solution";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  await test("procesa en batches y mantiene el orden", async () => {
    const ids = [1, 2, 3, 4, 5];
    const results = await batchProcess(ids, 2, async (id) => id * 10);
    assert.deepEqual(results, [10, 20, 30, 40, 50]);
  });

  await test("arreglo vacio retorna vacio", async () => {
    const results = await batchProcess<number, number>(
      [],
      2,
      async (id) => id
    );
    assert.deepEqual(results, []);
  });

  await test("batchSize mayor al arreglo procesa todo en un batch", async () => {
    const results = await batchProcess([1, 2, 3], 10, async (id) => id + 1);
    assert.deepEqual(results, [2, 3, 4]);
  });

  await test("mantiene orden aunque items mas lentos esten primero", async () => {
    const order: number[] = [];
    const items = [
      { id: 1, ms: 30 },
      { id: 2, ms: 5 },
    ];
    const results = await batchProcess(items, 2, async (item) => {
      await delay(item.ms);
      order.push(item.id);
      return item.id;
    });
    // id=2 termina primero internamente, pero el resultado respeta el orden de entrada
    assert.deepEqual(results, [1, 2]);
    assert.deepEqual(order, [2, 1]);
  });

  summary();
}

main();
