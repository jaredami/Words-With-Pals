import React from 'react';
import styled from 'styled-components';
import { MyTheme, tileTypes } from '../App';

const StyledGameBoard = styled.div`
  border: 4px solid ${props => props.theme.gameBoard};
  display: grid;
  grid-template-columns: repeat(15, 35px);
  height: 525px;
  margin: 0 auto;
  width: 525px;
`;

const StyledTile = styled.div`
  background: ${(props: {
      type: tileTypes | '',
      theme: MyTheme
    }): string => {
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
`

const gameBoard: (tileTypes | '')[][] = [
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

function GameBoard() {
  let tiles: JSX.Element[][] = [];
  gameBoard.forEach((rowArr: (tileTypes | '')[]) => {
    tiles.push(
      rowArr.map((tileType: (tileTypes | ''), index: number) =>
        <StyledTile key={ index } type={ tileType }>
          <span>
            { tileType }
          </span>
        </StyledTile>
      )
    );
  });

  return (
    <StyledGameBoard>{ tiles }</StyledGameBoard>
  );
}

export default GameBoard;
