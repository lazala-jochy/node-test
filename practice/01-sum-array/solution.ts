export function sumArray(arr: number[]): number {
  // TODO: implementa la funcion

  return arr.reduce((previousValue, currentValue) => {

    return previousValue + currentValue
  },0)

}


sumArray([1, 2, 3]);      // 6
sumArray([]);             // 0
sumArray([-5, 5, 10]);    // 10
sumArray([1.5, 2.5]);  