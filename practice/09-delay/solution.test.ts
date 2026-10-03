import { test, assert, summary } from "../_helpers/test";
import { delay } from "./solution";

async function main() {
  await test("resuelve despues de aproximadamente el tiempo indicado", async () => {
    const start = Date.now();
    await delay(50);
    const elapsed = Date.now() - start;
    assert.ok(elapsed >= 45, `esperado >=45ms, obtuvo ${elapsed}ms`);
  });

  await test("retorna una instancia de Promise", () => {
    const result = delay(0);
    assert.ok(result instanceof Promise);
  });

  await test("delay(0) sigue siendo asincrono", () => {
    let resolved = false;
    delay(0).then(() => {
      resolved = true;
    });
    assert.equal(resolved, false);
  });

  summary();
}

main();
