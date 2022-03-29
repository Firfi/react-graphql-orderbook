import { gql } from '@apollo/client';

export const GET_ORDERBOOK_QUERY = gql`
    query GetOrderbook { orderbook { bids { id, data { price, quantity } }}}
`