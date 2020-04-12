import React from 'react';
import styled from 'styled-components';
import Letter from './Letter';

interface LetterPiece {
  points: number;
  val: string;
}

const StyledShelf = styled.div`
  display: grid;
  grid-column-gap: 8px;
  grid-template-columns: repeat(7, 1fr);
  height: 70px;
  margin: 0 auto;
  width: 525px;
`;

const letterPieces: LetterPiece[] = [
  { val: 'A', points: 1 },
  { val: 'B', points: 4 },
  { val: 'C', points: 4 },
  { val: 'D', points: 2 },
  { val: 'E', points: 1 },
  { val: 'F', points: 4 },
  { val: 'G', points: 3 },
];

function Shelf(props: any) {
  return (
    <StyledShelf>
      {letterPieces.map((piece: LetterPiece, index: number) =>
          <Letter key={ index }
                  points={ piece.points }
                  selectLetter={ props.selectLetter }
                  theme= { props.theme }
                  value={ piece.val } />
      )}
    </StyledShelf>
  );
}

export default Shelf;
