import { test, assert, summary } from "../_helpers/test";
import { safeParseJSON } from "./solution";

async function main() {
  await test("parsea un objeto valido", () => {
    assert.deepEqual(safeParseJSON('{"a": 1}'), { a: 1 });
  });

  await test("string invalido retorna null sin lanzar", () => {
    assert.equal(safeParseJSON("not json"), null);
  });

  await test("string vacio retorna null", () => {
    assert.equal(safeParseJSON(""), null);
  });

  await test("parsea primitivos JSON validos", () => {
    assert.equal(safeParseJSON("42"), 42);
  });

  summary();
}

main();
