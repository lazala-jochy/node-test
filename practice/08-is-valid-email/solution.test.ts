import { test, assert, summary } from "../_helpers/test";
import { isValidEmail } from "./solution";

async function main() {
  await test("email simple valido", () => {
    assert.equal(isValidEmail("user@example.com"), true);
  });

  await test("email con tag y subdominio valido", () => {
    assert.equal(isValidEmail("user.name+tag@sub.example.com"), true);
  });

  await test("sin arroba es invalido", () => {
    assert.equal(isValidEmail("invalid-email"), false);
  });

  await test("sin dominio es invalido", () => {
    assert.equal(isValidEmail("user@"), false);
  });

  await test("sin usuario es invalido", () => {
    assert.equal(isValidEmail("@example.com"), false);
  });

  await test("sin TLD es invalido", () => {
    assert.equal(isValidEmail("user@example"), false);
  });

  await test("string vacio es invalido", () => {
    assert.equal(isValidEmail(""), false);
  });

  summary();
}

main();
