import { OrderKind } from '../orderbook/types';

interface DealBrand {
  _type: "Deal";
}

export type DealId = string & DealBrand;

export interface ApiDeal {
  price: string;
  quantity: number;
  id: DealId;
  createdAt: string;
  kind: OrderKind;
}

export interface Deal {
  price: BigInt;
  quantity: number;
  id: DealId;
  createdAt: Date;
  kind: OrderKind;
}