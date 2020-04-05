import React from 'react';
import styled from 'styled-components';
import Letter from './Letter';

const StyledShelf = styled.div`
  display: grid;
  grid-column-gap: 8px;
  grid-template-columns: repeat(7, 1fr);
  height: 70px;
  margin: 0 auto;
  width: 525px;
`;

const letters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

function Shelf() {
  return (
    <StyledShelf>
      { letters.map((value: string, index: number) => <Letter value={ value } key={ index }/> )}
    </StyledShelf>
  );
}

export default Shelf;
