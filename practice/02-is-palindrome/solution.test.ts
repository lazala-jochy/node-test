import { test, assert, summary } from "../_helpers/test";
import { isPalindrome, isPalindromeLoose } from "./solution";

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

  await test("bonus: ignora espacios y puntuacion", () => {
    assert.equal(isPalindromeLoose("A man a plan a canal Panama"), true);
  });

  summary();
}

main();
