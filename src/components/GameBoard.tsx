import React from 'react';
import styled from 'styled-components';
import Tile from './Tile';

const StyledGameBoard = styled.div`
  border: 4px solid ${props => props.theme.gameBoard};
  display: grid;
  grid-template-columns: repeat(15, 35px);
  height: 525px;
  margin: 0 auto;
  width: 525px;
`;

const gameBoard: string[][] = [
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
  gameBoard.forEach((rowArr: string[]) => {
    tiles.push(
      rowArr.map((tileType: string, index: number) =>
        <Tile key={ index } type={ tileType } />
      )
    );
  });

  return (
    <StyledGameBoard>{ tiles }</StyledGameBoard>
  );
}

export default GameBoard;
