export function debounce<T extends (...args: any[]) => void>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  // TODO: implementa la funcion
  return (...args: Parameters<T>) => {};
}
