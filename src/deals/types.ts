interface DealBrand {
  _type: "Deal";
}

export type DealId = string & DealBrand;

export interface ApiDeal {
  price: string;
  quantity: number;
  id: DealId;
  createdAt: string;
}

export interface Deal {
  price: BigInt;
  quantity: number;
  id: DealId;
  createdAt: Date;
}