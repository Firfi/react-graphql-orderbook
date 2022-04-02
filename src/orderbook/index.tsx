import { useOrderbook } from './api';
import styled from 'styled-components';
import { orderKindColors } from '../colors';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const BidsOrAsks = styled.div`
  display: flex;
`;

const Bids = styled(BidsOrAsks)`
  flex-direction: column-reverse;
`;

const Asks = styled(BidsOrAsks)`
  flex-direction: column;
`;

const BidOrAsk = styled.div`
  height: 1em;
`;

const Bid = styled(BidOrAsk)`
  color: ${orderKindColors.BUY};
`;

const Ask = styled(BidOrAsk)`
  color: ${orderKindColors.SELL};
`;

export const Orderbook = () => {
  const {data, loading, error} = useOrderbook();
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error {JSON.stringify(error)}</p>;
  return <Wrapper>
    <h2>Orderbook</h2>
    <Bids>
      {data.bids!.map(bid => <Bid><p key={bid.id}>${bid.data.price.toString()}: {bid.data.quantity}</p></Bid>)}
    </Bids>
    <Asks>
      {data.asks!.map(ask => <Ask><p key={ask.id}>${ask.data.price.toString()}: {ask.data.quantity}</p></Ask>)}
    </Asks>
  </Wrapper>;
}