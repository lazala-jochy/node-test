import { test, assert, summary } from "../_helpers/test";
import { mergeDeep } from "./solution";

async function main() {
  await test("combina objetos anidados recursivamente", () => {
    const result = mergeDeep(
      { user: { name: "Jose", age: 30 }, active: true },
      { user: { age: 31, city: "SD" } }
    );
    assert.deepEqual(result, {
      user: { name: "Jose", age: 31, city: "SD" },
      active: true,
    });
  });

  await test("obj2 gana si cambia el tipo", () => {
    assert.deepEqual(mergeDeep({ a: 1 }, { a: { b: 2 } }), { a: { b: 2 } });
  });

  await test("arreglos se reemplazan, no se combinan", () => {
    assert.deepEqual(mergeDeep({ tags: [1, 2] }, { tags: [3] }), {
      tags: [3],
    });
  });

  await test("no muta obj1 ni obj2", () => {
    const obj1 = { user: { name: "Jose" } };
    const obj2 = { user: { age: 31 } };
    const obj1Copy = JSON.parse(JSON.stringify(obj1));
    const obj2Copy = JSON.parse(JSON.stringify(obj2));

    mergeDeep(obj1, obj2);

    assert.deepEqual(obj1, obj1Copy);
    assert.deepEqual(obj2, obj2Copy);
  });

  summary();
}

main();
