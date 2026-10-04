export function pick<T extends object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  // TODO: implementa la funcion

  if(keys.length === 0) return {} as Pick<T, K>;

  let result: Record<string, any> = {};


  for(let i = 0; i <= keys.length - 1; i++){
    for(const property in obj){
      if(property.toString() == keys[i]){
        result[property] = obj[property];
        
      }
  
      
    }
  }




  return result as Pick<T, K>;
}


pick({ id: 1, name: "Jose", email: "j@x.com" }, ["id", "name"]);
// { id: 1, name: "Jose" }

pick({ a: 1, b: 2 }, []);
// {}

pick({ a: 1 }, ["a", "b" as any]);
// { a: 1 }  (ignora keys que no existen en el objeto)