import React, { useState } from "react";
import styled from "styled-components";
import { MyTheme, TileTypes } from "../App";

export interface TileProps {
  selectedLetter: { val: string, id: number };
  setSelectedLetter: React.Dispatch<React.SetStateAction<{ val: string, id: number }>>;
  lettersOnBoard: number[];
  setLettersOnBoard: React.Dispatch<React.SetStateAction<number[]>>;
  choosingTile: boolean;
  setChoosingTile: React.Dispatch<React.SetStateAction<boolean>>;
  theme: MyTheme;
  type: TileTypes | '';
}

interface StyledTileProps extends TileProps {
  tileLetter: { val: string, id: number };
}

const StyledTile: any = styled.button<StyledTileProps>`
  background: ${(props: StyledTileProps): string => {
      if (props.tileLetter.val) {
        return props.theme.letters
      } else if (props.type === '') {
        return props.theme.defaultTile
      }
      return props.theme.tileTypes[props.type];
    }};
  border: 2px solid ${props => props.theme.gameBoard};
  border-radius: 6px;
  box-shadow: inset 0px 5px 10px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  color: ${(props: StyledTileProps): string => props.tileLetter.val ? 'black' : 'white'};
  font-weight: 600;
  line-height: 30px;
  &:hover {
    cursor: pointer;
    filter: brightness(90%);
    border-color: gray;
  }
`;

function tileClicked(
  selectedLetter: { val: string, id: number },
  setSelectedLetter: React.Dispatch<React.SetStateAction<{ val: string, id: number }>>,
  setLettersOnBoard: React.Dispatch<React.SetStateAction<number[]>>,
  tileLetter: { val: string, id: number },
  setTileLetter: React.Dispatch<React.SetStateAction<{ val: string, id: number }>>,
  choosingTile: boolean,
  setChoosingTile: React.Dispatch<React.SetStateAction<boolean>>
): void {
  if (choosingTile && selectedLetter) {
    setTileLetter({ val: selectedLetter.val, id: selectedLetter.id });
    setLettersOnBoard(prevArray => [...prevArray, selectedLetter.id])
    setChoosingTile(false);
    setSelectedLetter({ val: '', id: 0 });
  } else {
    setTileLetter({ val: '', id: 0 });
    setLettersOnBoard(prevArray => prevArray.filter(id => id !== tileLetter.id));
  }
}

function Tile(props: TileProps) {
  const [tileLetter, setTileLetter] = useState({ val: '', id: 0 });
  
  return (
    <StyledTile
      tileLetter={ tileLetter }
      type={ props.type }
      theme={ props.theme }
      onClick={() => tileClicked(
        props.selectedLetter,
        props.setSelectedLetter,
        props.setLettersOnBoard,
        tileLetter,
        setTileLetter,
        props.choosingTile,
        props.setChoosingTile
      )}>
      { tileLetter.val ? tileLetter.val : props.type }
    </StyledTile>
  );
}

export default Tile;