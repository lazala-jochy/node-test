export async function batchProcess<T, R>(
  items: T[],
  batchSize: number,
  asyncFn: (item: T) => Promise<R>
): Promise<R[]> {
  // TODO: implementa la funcion
  return [];
}
