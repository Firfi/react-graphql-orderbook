import { useQuery } from '@apollo/client';
import { ApiOrder, Order, OrderId, OrderKind } from './types';
import { useEffect, useState } from 'react';
import sortedIndexBy from 'lodash/sortedIndexBy';
import { GET_ORDERBOOK_QUERY, ORDER_ADDED_SUBSCRIPTION, ORDER_REMOVED_SUBSCRIPTION } from './queries';

interface OrderbookResponse {
  orderbook: {
    bids: ApiOrder[],
    asks: ApiOrder[],
  }
}

interface OrderAddedSubscriptionResponse {
  newOrders: {
    order: ApiOrder & {kind: OrderKind},
  },
}

interface OrderRemovedSubscriptionResponse {
  removedOrders: {
    order: {id: OrderId, kind: OrderKind},
  }
}

const parseApiOrder = (apiOrder: ApiOrder): Order => ({
  ...apiOrder,
  data: {
    ...apiOrder.data,
    price: BigInt(apiOrder.data.price),
  }
});

export const useOrderbook = () => {
  const { data, subscribeToMore, ...rest } = useQuery<OrderbookResponse>(GET_ORDERBOOK_QUERY);
  useEffect(() => {
    const unsubscribe1 = subscribeToMore<OrderAddedSubscriptionResponse>({
      document: ORDER_ADDED_SUBSCRIPTION,
      updateQuery: (prev: OrderbookResponse, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.newOrders.order;
        const orderbookKind = newFeedItem.kind === 'SELL' ? 'asks' : 'bids';
        const dupe = !!prev.orderbook[orderbookKind].find(({ id }) => id === newFeedItem.id);
        if (dupe) return prev;
        const orderList = (prev.orderbook[orderbookKind] || []).slice();
        const indexToInsert = sortedIndexBy(orderList, newFeedItem, (item: ApiOrder) => (orderbookKind === 'bids' ? -1 : 1) * parseInt(item.data.price, 10));

        orderList.splice(indexToInsert, 0, newFeedItem);
        return {...prev, orderbook: {...prev.orderbook, [orderbookKind]: orderList } };
      },
    });
    const unsubscribe2 = subscribeToMore<OrderRemovedSubscriptionResponse>({
      document: ORDER_REMOVED_SUBSCRIPTION,
      updateQuery: (prev: OrderbookResponse, { subscriptionData }) => {
        const removedOrder = subscriptionData.data.removedOrders!.order;
        const orderbookKind = removedOrder.kind === 'SELL' ? 'asks' : 'bids';
        return {...prev, orderbook: {...prev.orderbook, [orderbookKind]: (prev.orderbook[orderbookKind] || []).filter(o => o.id !== removedOrder.id) } };
      }
    })
    return () => {
      unsubscribe1();
      unsubscribe2();
    };
  }, [subscribeToMore]);
  return { ...rest, data: {
    asks: data?.orderbook?.asks.map(parseApiOrder),
    bids: data?.orderbook?.bids.map(parseApiOrder),
    }
  };
}