export function promiseAllLimit<T>(
  tasks: (() => Promise<T>)[],
  limit: number
): Promise<T[]> {
  // TODO: implementa la funcion
  return Promise.all(tasks.map((task) => task()));
}
