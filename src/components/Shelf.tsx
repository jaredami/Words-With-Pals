import React from 'react';
import styled from 'styled-components';
import { MyTheme, ShelfLetter } from '../App';
import Letter from './Letter';

interface ShelfProps {
  selectedLetter: { val: string, id: number, points: number };
  setSelectedLetter: React.Dispatch<React.SetStateAction<{ val: string, id: number, points: number }>>;
  lettersOnBoardIds: number[];
  shelfLetters: ShelfLetter[];
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
      {props.shelfLetters
        .filter((piece: ShelfLetter) => !props.lettersOnBoardIds.includes(piece.letterId))
        .map((piece: ShelfLetter) =>
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
