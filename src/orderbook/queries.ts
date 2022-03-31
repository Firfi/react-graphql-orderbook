import { gql } from '@apollo/client';

export const GET_ORDERBOOK_QUERY = gql`
    query GetOrderbook { orderbook { bids { id, kind, data { quantity, price } }, asks { id, kind, data { quantity, price } } }}
`;
export const ORDER_ADDED_SUBSCRIPTION = gql`
    subscription OrderAdded {newOrders {order {id, kind, data {quantity, price}}} }
`;
export const ORDER_REMOVED_SUBSCRIPTION = gql`
    subscription OrderRemoved { removedOrders { order { id, kind } } }
`;