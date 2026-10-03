import { test, assert, summary } from "../_helpers/test";
import { pick } from "./solution";

async function main() {
  await test("selecciona solo las keys pedidas", () => {
    const result = pick({ id: 1, name: "Jose", email: "j@x.com" }, [
      "id",
      "name",
    ]);
    assert.deepEqual(result, { id: 1, name: "Jose" });
  });

  await test("keys vacio retorna objeto vacio", () => {
    assert.deepEqual(pick({ a: 1, b: 2 }, []), {});
  });

  await test("ignora keys que no existen en el objeto", () => {
    const result = pick({ a: 1 } as any, ["a", "b"]);
    assert.deepEqual(result, { a: 1 });
  });

  await test("no muta el objeto original", () => {
    const obj = { a: 1, b: 2 };
    pick(obj, ["a"]);
    assert.deepEqual(obj, { a: 1, b: 2 });
  });

  summary();
}

main();
