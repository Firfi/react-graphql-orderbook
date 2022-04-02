import { OrderKind } from './orderbook/types';

export const orderKindColors: {[k in OrderKind]: string} = {
  BUY: '#00b300',
  SELL: '#ff0000',
} as const;