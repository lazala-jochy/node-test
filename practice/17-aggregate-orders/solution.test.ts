import { test, assert, summary } from "../_helpers/test";
import { aggregateOrders } from "./solution";

async function main() {
  await test("suma totales por usuario", () => {
    const orders = [
      { userId: "u1", total: 50 },
      { userId: "u2", total: 20 },
      { userId: "u1", total: 15.5 },
    ];
    assert.deepEqual(aggregateOrders(orders), { u1: 65.5, u2: 20 });
  });

  await test("arreglo vacio retorna objeto vacio", () => {
    assert.deepEqual(aggregateOrders([]), {});
  });

  await test("trata total null/undefined como 0", () => {
    const orders = [
      { userId: "u1", total: 10 },
      { userId: "u1", total: null },
      { userId: "u1", total: undefined },
    ];
    assert.deepEqual(aggregateOrders(orders), { u1: 10 });
  });

  await test("redondea a 2 decimales", () => {
    const orders = [
      { userId: "u1", total: 0.1 },
      { userId: "u1", total: 0.2 },
    ];
    assert.deepEqual(aggregateOrders(orders), { u1: 0.3 });
  });

  await test("no muta el arreglo original", () => {
    const orders = [{ userId: "u1", total: 10 }];
    const copy = JSON.parse(JSON.stringify(orders));
    aggregateOrders(orders);
    assert.deepEqual(orders, copy);
  });

  summary();
}

main();
