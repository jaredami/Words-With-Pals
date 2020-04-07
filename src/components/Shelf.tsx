import React from 'react';
import styled from 'styled-components';
import Letter from './Letter';

interface LetterPiece {
  val: string;
  points: number;
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

function Shelf() {
  return (
    <StyledShelf>
      {letterPieces.map((piece: LetterPiece, index: number) =>
          <Letter value={ piece.val }
                  points={ piece.points }
                  key={ index }/>
      )}
    </StyledShelf>
  );
}

export default Shelf;
