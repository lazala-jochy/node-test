import { test, assert, summary } from "../_helpers/test";
import { groupByKey } from "./solution";

async function main() {
  const users = [
    { id: 1, role: "admin" },
    { id: 2, role: "user" },
    { id: 3, role: "admin" },
  ];

  await test("agrupa objetos por propiedad string", () => {
    const result = groupByKey(users, "role");
    assert.deepEqual(result, {
      admin: [
        { id: 1, role: "admin" },
        { id: 3, role: "admin" },
      ],
      user: [{ id: 2, role: "user" }],
    });
  });

  await test("arreglo vacio retorna objeto vacio", () => {
    assert.deepEqual(groupByKey([], "role"), {});
  });

  await test("no muta el arreglo original", () => {
    const copy = JSON.parse(JSON.stringify(users));
    groupByKey(users, "role");
    assert.deepEqual(users, copy);
  });

  summary();
}

main();
