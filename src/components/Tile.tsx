import React, { useState } from "react";
import styled from "styled-components";
import { MyTheme, TileTypes } from "../App";

export interface TileProps {
  selectedLetter: { val: string, id: number };
  setSelectedLetter: React.Dispatch<React.SetStateAction<{ val: string, id: number }>>;
  choosingTile: boolean;
  setChoosingTile: React.Dispatch<React.SetStateAction<boolean>>;
  text?: string;
  theme: MyTheme;
  type: TileTypes | '';
}

const StyledTile: any = styled.button<TileProps>`
  background: ${(props: TileProps): string => {
      if (props.text) {
        return props.theme.letters
      } else if (props.type === '') {
        return '#eeecea'
      }
      return props.theme.tileTypes[props.type];
    }};
  border: 2px solid ${props => props.theme.gameBoard};
  border-radius: 6px;
  box-shadow: inset 0px 5px 10px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  color: ${(props: TileProps): string => props.text ? 'black' : 'white' };
  font-weight: 600;
  height: 35px;
  line-height: 30px;
  &:hover {
    cursor: pointer;
    filter: brightness(90%);
    border-color: gray;
  }
`

function tileClicked(
  selectedLetter: { val: string, id: number },
  setSelectedLetter: React.Dispatch<React.SetStateAction<{ val: string, id: number }>>,
  setText: React.Dispatch<React.SetStateAction<string>>,
  choosingTile: boolean,
  setChoosingTile: React.Dispatch<React.SetStateAction<boolean>>
): void {
  if (choosingTile && selectedLetter) {
    setText(selectedLetter.val);
    setChoosingTile(false);
    setSelectedLetter({ val: '', id: 0 });
  } else {
    setText('');
  }
}

function Tile(props: TileProps) {
  const [text, setText] = useState('');
  
  return (
    <StyledTile
      text={ text }
      type={ props.type }
      theme={ props.theme }
      onClick={() => tileClicked(
        props.selectedLetter,
        props.setSelectedLetter,
        setText,
        props.choosingTile,
        props.setChoosingTile
      )}>
      { text ? text : props.type }
    </StyledTile>
  );
}

export default Tile;