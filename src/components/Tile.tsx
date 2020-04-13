import React, { useState } from "react";
import styled from "styled-components";
import { MyTheme, TileTypes } from "../App";

export interface TileProps {
  selectedLetter: string;
  selecting: boolean;
  setSelecting: React.Dispatch<React.SetStateAction<boolean>>
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
  }
`

function tileClicked(
  selectedLetter: string,
  setText: React.Dispatch<React.SetStateAction<string>>,
  selecting: boolean,
  setSelecting: React.Dispatch<React.SetStateAction<boolean>>
): void {
  if (selecting && selectedLetter) {
    setText(selectedLetter);
    setSelecting(false);
  } else {
    setText('');
  }
}

function Tile(props: TileProps) {
  const [text, setText] = useState('');
  
  return (
    <StyledTile text={ text }
                type={ props.type }
                theme={ props.theme }
                onClick={() => tileClicked(
                  props.selectedLetter,
                  setText,
                  props.selecting,
                  props.setSelecting
                )}>
      { text ? text : props.type }
    </StyledTile>
  );
}

export default Tile;