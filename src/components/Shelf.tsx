import React from 'react';
import styled from 'styled-components';
import { MyTheme } from '../App';
import Letter from './Letter';

const letterPieces: LetterPiece[] = [
  { val: 'A', points: 1, letterId: 1 },
  { val: 'B', points: 4, letterId: 2 },
  { val: 'C', points: 4, letterId: 3 },
  { val: 'D', points: 2, letterId: 4 },
  { val: 'E', points: 1, letterId: 5 },
  { val: 'F', points: 4, letterId: 6 },
  { val: 'G', points: 3, letterId: 7 },
];

interface LetterPiece {
  points: number;
  val: string;
  letterId: number;
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
        .filter(piece => !props.lettersOnBoard.includes(piece.letterId))
        .map((piece: LetterPiece) =>
            <Letter
              key={ piece.letterId }
              id={ piece.letterId }
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
