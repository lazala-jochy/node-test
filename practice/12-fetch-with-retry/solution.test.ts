import { test, assert, summary } from "../_helpers/test";
import { fetchWithRetry } from "./solution";

async function main() {
  await test("exito al primer intento no reintenta", async () => {
    let calls = 0;
    const fn = async () => {
      calls++;
      return "ok";
    };
    const result = await fetchWithRetry(fn, 3, 1);
    assert.equal(result, "ok");
    assert.equal(calls, 1);
  });

  await test("reintenta hasta tener exito", async () => {
    let attempts = 0;
    const flaky = async () => {
      attempts++;
      if (attempts < 3) throw new Error("fail");
      return "success";
    };
    const result = await fetchWithRetry(flaky, 3, 1);
    assert.equal(result, "success");
    assert.equal(attempts, 3);
  });

  await test("propaga el ultimo error si se agotan los reintentos", async () => {
    const alwaysFails = async () => {
      throw new Error("boom");
    };

    await assert.rejects(() => fetchWithRetry(alwaysFails, 2, 1), /boom/);
  });

  await test("retries=0 hace solo un intento", async () => {
    let calls = 0;
    const fn = async () => {
      calls++;
      throw new Error("fail");
    };
    await assert.rejects(() => fetchWithRetry(fn, 0, 1));
    assert.equal(calls, 1);
  });

  summary();
}

main();
