import { gql } from '@apollo/client';

export const GET_DEALS_QUERY = gql`
    query GetDeals { history { price, quantity, id, createdAt } }
`

export const DEALS_SUBSCRIPTION = gql`
    subscription OnDeal { deals { id, price, quantity, createdAt } }
`;