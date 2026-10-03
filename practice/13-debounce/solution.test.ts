import { test, assert, summary } from "../_helpers/test";
import { debounce } from "./solution";

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  await test("colapsa llamadas rapidas en una sola ejecucion", async () => {
    let callCount = 0;
    const debounced = debounce(() => {
      callCount++;
    }, 50);

    debounced();
    debounced();
    debounced();

    assert.equal(callCount, 0);
    await delay(100);
    assert.equal(callCount, 1);
  });

  await test("usa los argumentos de la ultima llamada", async () => {
    let lastValue: number | undefined;
    const debounced = debounce((value: number) => {
      lastValue = value;
    }, 30);

    debounced(1);
    debounced(2);
    debounced(3);

    await delay(60);
    assert.equal(lastValue, 3);
  });

  await test("nueva llamada reinicia el timer", async () => {
    let callCount = 0;
    const debounced = debounce(() => {
      callCount++;
    }, 50);

    debounced();
    await delay(30);
    debounced(); // reinicia el timer antes de que se cumplan los 50ms iniciales
    await delay(30);
    assert.equal(callCount, 0);
    await delay(40);
    assert.equal(callCount, 1);
  });

  summary();
}

main();
