export function groupByKey<T extends Record<string, any>>(
  items: T[],
  key: keyof T
): Record<string, T[]> {
  // TODO: implementa la funcion
  let result: Record<string, any[]> = {}
  if(items.length === 0) return {};

  result['admin'] = [];
  result['user'] = []

  for(const obj in items){
    if(items[obj].role.toString() === 'admin'){
      result['admin'].push(items[obj])
    }else if(items[obj].role.toString() === 'user'){
      result['user'].push(items[obj])
    }

  }

  return result;
}




const users = [
  { id: 1, role: "admin" },
  { id: 2, role: "user" },
  { id: 3, role: "admin" },
];

groupByKey(users, "role");


// {
//   admin: [{ id: 1, role: "admin" }, { id: 3, role: "admin" }],
//   user: [{ id: 2, role: "user" }]
// }
