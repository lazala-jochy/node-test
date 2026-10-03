import { test, assert, summary } from "../_helpers/test";
import { paginate } from "./solution";

async function main() {
  const items = [1, 2, 3, 4, 5, 6, 7];

  await test("primera pagina", () => {
    assert.deepEqual(paginate(items, 1, 3), [1, 2, 3]);
  });

  await test("segunda pagina", () => {
    assert.deepEqual(paginate(items, 2, 3), [4, 5, 6]);
  });

  await test("ultima pagina incompleta", () => {
    assert.deepEqual(paginate(items, 3, 3), [7]);
  });

  await test("pagina fuera de rango retorna vacio", () => {
    assert.deepEqual(paginate(items, 4, 3), []);
  });

  await test("page invalido retorna vacio", () => {
    assert.deepEqual(paginate(items, 0, 3), []);
  });

  await test("pageSize invalido retorna vacio", () => {
    assert.deepEqual(paginate(items, 1, 0), []);
  });

  await test("no muta el arreglo original", () => {
    const copy = [...items];
    paginate(items, 2, 3);
    assert.deepEqual(items, copy);
  });

  summary();
}

main();
