import { test, assert, summary } from "../_helpers/test";
import { toSlug } from "./solution";

async function main() {
  await test("caso basico con signo de exclamacion", () => {
    assert.equal(toSlug("Hello World!"), "hello-world");
  });

  await test("colapsa espacios multiples y trim", () => {
    assert.equal(toSlug("  Multiple   Spaces  "), "multiple-spaces");
  });

  await test("elimina caracteres especiales sin dejar guion extra", () => {
    assert.equal(toSlug("Node.js & TypeScript"), "nodejs-typescript");
  });

  await test("string vacio retorna string vacio", () => {
    assert.equal(toSlug(""), "");
  });

  summary();
}

main();
