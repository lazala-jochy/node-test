import { test, assert, summary } from "../_helpers/test";
import { countOccurrences } from "./solution";

async function main() {
  await test("cuenta ocurrencias de numeros", () => {
    assert.equal(countOccurrences([1, 2, 2, 3, 2], 2), 3);
  });

  await test("cuenta ocurrencias de strings", () => {
    assert.equal(countOccurrences(["a", "b", "a"], "a"), 2);
  });

  await test("valor no existe retorna 0", () => {
    assert.equal(countOccurrences([1, 2, 3], 5), 0);
  });

  await test("arreglo vacio retorna 0", () => {
    assert.equal(countOccurrences([], "x"), 0);
  });

  summary();
}

main();
