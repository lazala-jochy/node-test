export function paginate<T>(items: T[], page: number, pageSize: number): T[] {
  // TODO: implementa la funcion
  //let result = [];
  let position = (pageSize * page) / 2;

  
  /*let index = position -1
  console.log(position, " this is the position");
  for (let i = page - 1; i < pageSize; i++) {
    result.push(items[index]);
    index++;
  }*/
  //console.log(result, " this is the result");

  return  []; //result;
}

const items = [1, 2, 3, 4, 5, 6, 7];

paginate(items, 1, 3); // [1, 2, 3]
paginate(items, 2, 3); // [4, 5, 6]
paginate(items, 3, 3); // [7]
paginate(items, 4, 3); // []  (pagina fuera de rango)
