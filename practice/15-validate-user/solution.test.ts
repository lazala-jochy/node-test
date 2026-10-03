import { test, assert, summary } from "../_helpers/test";
import { validateUser } from "./solution";

async function main() {
  await test("usuario valido no tiene errores", () => {
    assert.deepEqual(
      validateUser({ name: "Jo", email: "jo@example.com" }),
      []
    );
  });

  await test("name corto y email invalido", () => {
    assert.deepEqual(validateUser({ name: "J", email: "not-an-email" }), [
      "name must be at least 2 characters",
      "email is invalid",
    ]);
  });

  await test("campos requeridos faltantes", () => {
    assert.deepEqual(validateUser({}), [
      "name is required",
      "email is required",
    ]);
  });

  await test("age invalido", () => {
    assert.deepEqual(
      validateUser({ name: "Jose", email: "j@x.com", age: -5 }),
      ["age must be a positive integer"]
    );
  });

  await test("age opcional no genera error si no viene", () => {
    assert.deepEqual(
      validateUser({ name: "Jose", email: "j@x.com" }),
      []
    );
  });

  summary();
}

main();
