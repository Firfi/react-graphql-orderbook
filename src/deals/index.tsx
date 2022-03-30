import styled from 'styled-components';

import { DealList } from './dealList';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Deals = () => {
  return (
    <Wrapper className="deals">
      <DealList />
    </Wrapper>
  );
};