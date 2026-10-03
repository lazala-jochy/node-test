import { test, assert, summary } from "../_helpers/test";
import { sumArray } from "./solution";

async function main() {
  await test("suma numeros positivos", () => {
    assert.equal(sumArray([1, 2, 3]), 6);
  });

  await test("arreglo vacio retorna 0", () => {
    assert.equal(sumArray([]), 0);
  });

  await test("mezcla de positivos y negativos", () => {
    assert.equal(sumArray([-5, 5, 10]), 10);
  });

  await test("numeros decimales", () => {
    assert.equal(sumArray([1.5, 2.5]), 4);
  });

  await test("no muta el arreglo original", () => {
    const arr = [1, 2, 3];
    sumArray(arr);
    assert.deepEqual(arr, [1, 2, 3]);
  });

  summary();
}

main();
