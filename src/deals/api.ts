import { useQuery } from '@apollo/client';
import { ApiDeal, Deal } from './types';
import { DEALS_SUBSCRIPTION, GET_DEALS_QUERY } from '../queries/deals';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

interface DealsResponse {
  history: ApiDeal[];
}

interface DealsSubscriptionResponse { deals: ApiDeal }

const CACHE_LIMIT = 100000;

const parseApiDeal = (apiDeal: ApiDeal): Deal => ({
  ...apiDeal,
  price: BigInt(apiDeal.price),
  createdAt: dayjs.utc(apiDeal.createdAt).toDate(),
});

export const useDeals = () => {
  const { data, subscribeToMore, ...rest } = useQuery<DealsResponse>(GET_DEALS_QUERY);
  useEffect(() => {
    const unsubscribe = subscribeToMore<DealsSubscriptionResponse>({
      document: DEALS_SUBSCRIPTION,
      updateQuery: (prev: DealsResponse, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newFeedItem = subscriptionData.data.deals;
        // todo not performant at all
        const dupe = !!prev.history.find(({ id }) => id === newFeedItem.id);
        return {...prev, history: [...(dupe ? [] : [newFeedItem]), ...(prev.history || [])].slice(0, CACHE_LIMIT)};
      },
    });
    return () => unsubscribe();
  }, [subscribeToMore]);
  return { ...rest, data: (data?.history || []).map(parseApiDeal) };
}