export function countOccurrences<T>(arr: T[], value: T): number {
  // TODO: implementa la funcion
  let result: number = 0;
  for(let i = 0; i <= arr.length; i++){
    if(arr[i] === value) result++;
  }
  return result;
}

countOccurrences([1, 2, 2, 3, 2], 2);     // 3
countOccurrences(["a", "b", "a"], "a");   // 2
countOccurrences([1, 2, 3], 5);           // 0
countOccurrences([], "x");                // 0