export function flattenOneLevel<T>(arr: (T | T[])[]): T[] {
  // TODO: implementa la funcion
  if(arr.length === 0) return [];

  const result:any = arr.flat()
  return result
}


flattenOneLevel([1, [2, 3], 4]);        // [1, 2, 3, 4]
flattenOneLevel([[1, 2], [3, 4]]);      // [1, 2, 3, 4]
flattenOneLevel([1, 2, 3]);             // [1, 2, 3]
flattenOneLevel([]);  