import { test, assert, summary } from "../_helpers/test";
import { flattenOneLevel } from "./solution";

async function main() {
  await test("aplana un nivel simple", () => {
    assert.deepEqual(flattenOneLevel([1, [2, 3], 4]), [1, 2, 3, 4]);
  });

  await test("multiples subarreglos", () => {
    assert.deepEqual(flattenOneLevel([[1, 2], [3, 4]]), [1, 2, 3, 4]);
  });

  await test("sin anidacion queda igual", () => {
    assert.deepEqual(flattenOneLevel([1, 2, 3]), [1, 2, 3]);
  });

  await test("arreglo vacio", () => {
    assert.deepEqual(flattenOneLevel([]), []);
  });

  await test("solo aplana un nivel, no recursivo", () => {
    assert.deepEqual(flattenOneLevel([1, [2, [3, 4]]]), [1, 2, [3, 4]]);
  });

  summary();
}

main();
