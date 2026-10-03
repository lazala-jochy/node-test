export interface Req {
  body: Record<string, any>;
}
export interface Res {
  status(code: number): Res;
  json(body: any): void;
}
export type Next = () => void;

export function requireFields(fields: string[]) {
  // TODO: implementa la funcion y retorna el middleware
  return (req: Req, res: Res, next: Next): void => {
    next();
  };
}
