interface OrderBrand {
  _type: "Order";
}

export type OrderId = number & OrderBrand;

export type OrderKind = "BUY" | "SELL";

export interface ApiOrder {
  id: OrderId;
  data: { quantity: number, price: string };
  kind: OrderKind;
}

export interface Order {
  id: OrderId;
  data: { quantity: number, price: BigInt };
  kind: OrderKind;
}