import React from 'react';
import styled from 'styled-components';
import { MyTheme } from '../App';
import Letter from './Letter';

const letterPieces: LetterPiece[] = [
  { val: 'A', points: 1, id: 1 },
  { val: 'B', points: 4, id: 2 },
  { val: 'C', points: 4, id: 3 },
  { val: 'D', points: 2, id: 4 },
  { val: 'E', points: 1, id: 5 },
  { val: 'F', points: 4, id: 6 },
  { val: 'G', points: 3, id: 7 },
];

interface LetterPiece {
  points: number;
  val: string;
  id: number;
}

interface ShelfProps {
  selectedLetter: { val: string, id: number };
  setSelectedLetter: React.Dispatch<React.SetStateAction<{ val: string, id: number }>>;
  lettersOnBoard: number[];
  setChoosingTile: React.Dispatch<React.SetStateAction<boolean>>;
  theme: MyTheme;
}

const StyledShelf = styled.div`
  display: grid;
  grid-column-gap: 8px;
  grid-template-columns: repeat(7, 1fr);
  height: 90px;
  margin: 0 auto;
  width: 630px;
`;

function Shelf(props: ShelfProps) {
  return (
    <StyledShelf>
      {letterPieces
        .filter(piece => !props.lettersOnBoard.includes(piece.id))
        .map((piece: LetterPiece) =>
            <Letter
              key={ piece.id }
              id={ piece.id }
              points={ piece.points }
              selectedLetter={ props.selectedLetter }
              setSelectedLetter={ props.setSelectedLetter }
              setChoosingTile={ props.setChoosingTile }
              theme= { props.theme }
              value={ piece.val }/>)
      }
    </StyledShelf>
  );
}

export default Shelf;
