export interface Order {
  userId: string;
  total: number | null | undefined;
}

export function aggregateOrders(orders: Order[]): Record<string, number> {
  // TODO: implementa la funcion
  return {};
}
