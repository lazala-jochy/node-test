import { test, assert, summary } from "../_helpers/test";
import { createRateLimiter } from "./solution";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  await test("permite hasta maxRequests y luego bloquea", () => {
    const isAllowed = createRateLimiter(3, 1000);
    assert.equal(isAllowed("u1"), true);
    assert.equal(isAllowed("u1"), true);
    assert.equal(isAllowed("u1"), true);
    assert.equal(isAllowed("u1"), false);
  });

  await test("usuarios distintos tienen contadores independientes", () => {
    const isAllowed = createRateLimiter(1, 1000);
    assert.equal(isAllowed("u1"), true);
    assert.equal(isAllowed("u2"), true);
    assert.equal(isAllowed("u1"), false);
    assert.equal(isAllowed("u2"), false);
  });

  await test("reinicia el contador tras pasar la ventana", async () => {
    const isAllowed = createRateLimiter(1, 100);
    assert.equal(isAllowed("u1"), true);
    assert.equal(isAllowed("u1"), false);
    await delay(150);
    assert.equal(isAllowed("u1"), true);
  });

  summary();
}

main();
