import { test, assert, summary } from "../_helpers/test";
import { promiseAllLimit } from "./solution";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  await test("mantiene el orden de los resultados", async () => {
    const tasks = [1, 2, 3, 4, 5].map((n) => async () => {
      await delay(Math.random() * 20);
      return n * 10;
    });
    const results = await promiseAllLimit(tasks, 2);
    assert.deepEqual(results, [10, 20, 30, 40, 50]);
  });

  await test("nunca corre mas de `limit` tareas a la vez", async () => {
    let active = 0;
    let maxActive = 0;

    const tasks = Array.from({ length: 6 }, () => async () => {
      active++;
      maxActive = Math.max(maxActive, active);
      await delay(20);
      active--;
      return true;
    });

    await promiseAllLimit(tasks, 2);
    assert.ok(maxActive <= 2, `maxActive fue ${maxActive}, esperado <=2`);
  });

  await test("tasks vacio retorna vacio", async () => {
    const results = await promiseAllLimit([], 3);
    assert.deepEqual(results, []);
  });

  await test("limit mayor o igual al numero de tasks equivale a Promise.all", async () => {
    const tasks = [1, 2, 3].map((n) => async () => n);
    const results = await promiseAllLimit(tasks, 10);
    assert.deepEqual(results, [1, 2, 3]);
  });

  await test("propaga el error si una tarea rechaza", async () => {
    const tasks = [
      async () => 1,
      async () => {
        throw new Error("task failed");
      },
      async () => 3,
    ];
    await assert.rejects(() => promiseAllLimit(tasks, 2), /task failed/);
  });

  summary();
}

main();
