import React from 'react'
import './App.css'
import { Deals } from './deals';
import { Orderbook } from './orderbook';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
`;

const OrderbookWrapper = styled.div`

`;

const DealsWrapper = styled.div`

`;

function App() {
  return (
    <Wrapper className="App">
      <OrderbookWrapper><Orderbook /></OrderbookWrapper>
      <DealsWrapper><Deals /></DealsWrapper>
    </Wrapper>
  )
}

export default App
