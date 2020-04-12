import React, { useState } from 'react';
import styled from 'styled-components';
import { MyTheme, TileTypes } from '../App';

const StyledGameBoard: any = styled.div`
  border: 4px solid ${props => props.theme.gameBoard};
  display: grid;
  grid-template-columns: repeat(15, 35px);
  height: 525px;
  margin: 0 auto;
  width: 525px;
`;

interface TileProps {
  theme: MyTheme,
  type: TileTypes | '',
  letter: string
}

const StyledTile: any = styled.button<TileProps>`
  background: ${(props: TileProps): string => {
      if (props.type === '') {
        return '#eeecea'
      }
      return props.theme.tileTypes[props.type];
    }};
  border: 2px solid ${props => props.theme.gameBoard};
  border-radius: 6px;
  box-shadow: inset 0px 5px 10px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  color: #f5f5f5;
  font-weight: 600;
  height: 35px;
  line-height: 30px;
  &:hover {
    cursor: pointer;
    filter: brightness(90%);
  }
`

function Tile(props: TileProps) {
  const [text, setText] = useState('');
  
  return (
    <StyledTile type={ props.type } theme={ props.theme } onClick={() => setText(props.letter ? props.letter : '')}>
    { text ? text : props.type }
    </StyledTile>
  );
}
  

const gameBoard: (TileTypes | '')[][] = [
  ['', '', '', 'TW', '', '', 'TL', '', 'TL', '', '', 'TW', '', '', ''],
  ['', '', 'DL', '', '', 'DW', '', '', '', 'DW', '', '', 'DL', '', ''],
  ['', 'DL', '', '', 'DL', '', '', '', '', '', 'DL', '', '', 'DL', ''],
  ['TW', '', '', 'TL', '', '', '', 'DW', '', '', '', 'TL', '', '', 'TW'],
  ['', '', 'DL', '', '', '', 'DL', '', 'DL', '', '', '', 'DL', '', ''],
  ['', 'DW', '', '', '', 'TL', '', '', '', 'TL', '', '', '', 'DW', ''],
  ['TL', '', '', '', 'DL', '', '', '', '', '', 'DL', '', '', '', 'TL'],
  ['', '', '', 'DW', '', '', '', 'X', '', '', '', 'DW', '', '', ''],
  ['TL', '', '', '', 'DL', '', '', '', '', '', 'DL', '', '', '', 'TL'],
  ['', 'DW', '', '', '', 'TL', '', '', '', 'TL', '', '', '', 'DW', ''],
  ['', '', 'DL', '', '', '', 'DL', '', 'DL', '', '', '', 'DL', '', ''],
  ['TW', '', '', 'TL', '', '', '', 'DW', '', '', '', 'TL', '', '', 'TW'],
  ['', 'DL', '', '', 'DL', '', '', '', '', '', 'DL', '', '', 'DL', ''],
  ['', '', 'DL', '', '', 'DW', '', '', '', 'DW', '', '', 'DL', '', ''],
  ['', '', '', 'TW', '', '', 'TL', '', 'TL', '', '', 'TW', '', '', ''],
]

function GameBoard(props: any) {
  let tiles: JSX.Element[][] = [];
  gameBoard.forEach((rowArr: (TileTypes | '')[]) => {
    tiles.push(
      rowArr.map((tileType: (TileTypes | ''), index: number) =>
        <Tile key={ index } type={ tileType } theme={ props.theme } letter={ props.letter }></Tile>
      )
    );
  });

  return (
    <StyledGameBoard>{ tiles }</StyledGameBoard>
  );
}

export default GameBoard;
