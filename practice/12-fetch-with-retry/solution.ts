export function fetchWithRetry<T>(
  fn: () => Promise<T>,
  retries: number,
  delayMs: number = 100
): Promise<T> {
  // TODO: implementa la funcion
  return fn();
}
