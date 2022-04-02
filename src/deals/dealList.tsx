import styled from 'styled-components';
import { useDeals } from './api';
import { OrderKind } from '../orderbook/types';
import { orderKindColors } from '../colors';

const Deal = styled.div<{kind: OrderKind}>`
  color: ${({kind}) => kind === 'BUY' ? orderKindColors.BUY : orderKindColors.SELL};
`;

export const DealList = () => {
  const { data: deals, loading, error } = useDeals();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;
  return (
    <div className="latest-deals">
      <h2>Latest Deals</h2>
      <div className="deals-list">
        {deals!.slice(0, 20).map((deal) => (
          <Deal kind={deal.kind} key={deal.id}>{deal.quantity} {deal.kind === "BUY" ? "bought" : "sold"} for ${deal.price.toString()}</Deal>
        ))}
      </div>
    </div>
  );
};