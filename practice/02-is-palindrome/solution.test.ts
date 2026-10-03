import { test, assert, summary } from "../_helpers/test";
import { isPalindrome } from "./solution";

async function main() {
  await test("Anna es palindromo ignorando case", () => {
    assert.equal(isPalindrome("Anna"), true);
  });

  await test("anita no es palindromo", () => {
    assert.equal(isPalindrome("anita"), false);
  });

  await test("Level es palindromo", () => {
    assert.equal(isPalindrome("Level"), true);
  });

  await test("string vacio es palindromo", () => {
    assert.equal(isPalindrome(""), true);
  });

  summary();
}

main();
