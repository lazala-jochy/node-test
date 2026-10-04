export function isValidEmail(email: string): boolean {
  // TODO: implementa la funcion

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailRegex.test(email)
}
