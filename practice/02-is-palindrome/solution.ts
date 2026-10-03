export function isPalindrome(str: string): boolean {
  // TODO: implementa la funcion
  if(str.length === 0) return true;

  let last:number = str.length - 1;

  for(let i: number = 0; i < last; i++){
    if(str[i].toLowerCase() !== str[last].toLowerCase() ) return false
    last--;
  }


  return true;
}

isPalindrome("Anna");       // true
isPalindrome("anita");      // false
isPalindrome("Level");      // true
isPalindrome("");
