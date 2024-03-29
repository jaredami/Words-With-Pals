import React from 'react';
import styled from 'styled-components';
import { BoardTile, MyTheme } from '../App';
import Tile from './Tile';

interface GameBoardProps {
  // gameBoard: (TileTypes | '')[][];
  gameBoard: BoardTile[][];
  setGameBoard: React.Dispatch<React.SetStateAction<BoardTile[][]>>;
  selectedLetter: { val: string, id: number, points: number };
  setSelectedLetter: React.Dispatch<React.SetStateAction<{ val: string, id: number, points: number }>>;
  lettersOnBoardIds: number[];
  setLettersOnBoard: React.Dispatch<React.SetStateAction<number[]>>;
  choosingTile: boolean;
  setChoosingTile: React.Dispatch<React.SetStateAction<boolean>>;
  theme: MyTheme;
}

// const gameBoard: (TileTypes | '')[][] = [
//   ['', '', '', 'TW', '', '', 'TL', '', 'TL', '', '', 'TW', '', '', ''],
//   ['', '', 'DL', '', '', 'DW', '', '', '', 'DW', '', '', 'DL', '', ''],
//   ['', 'DL', '', '', 'DL', '', '', '', '', '', 'DL', '', '', 'DL', ''],
//   ['TW', '', '', 'TL', '', '', '', 'DW', '', '', '', 'TL', '', '', 'TW'],
//   ['', '', 'DL', '', '', '', 'DL', '', 'DL', '', '', '', 'DL', '', ''],
//   ['', 'DW', '', '', '', 'TL', '', '', '', 'TL', '', '', '', 'DW', ''],
//   ['TL', '', '', '', 'DL', '', '', '', '', '', 'DL', '', '', '', 'TL'],
//   ['', '', '', 'DW', '', '', '', 'X', '', '', '', 'DW', '', '', ''],
//   ['TL', '', '', '', 'DL', '', '', '', '', '', 'DL', '', '', '', 'TL'],
//   ['', 'DW', '', '', '', 'TL', '', '', '', 'TL', '', '', '', 'DW', ''],
//   ['', '', 'DL', '', '', '', 'DL', '', 'DL', '', '', '', 'DL', '', ''],
//   ['TW', '', '', 'TL', '', '', '', 'DW', '', '', '', 'TL', '', '', 'TW'],
//   ['', 'DL', '', '', 'DL', '', '', '', '', '', 'DL', '', '', 'DL', ''],
//   ['', '', 'DL', '', '', 'DW', '', '', '', 'DW', '', '', 'DL', '', ''],
//   ['', '', '', 'TW', '', '', 'TL', '', 'TL', '', '', 'TW', '', '', ''],
// ]

const StyledGameBoard: any = styled.div`
  border: 4px solid ${props => props.theme.gameBoard};
  display: grid;
  grid-template-columns: repeat(15, 42px);
  height: 630px;
  margin: 0 auto;
  width: 630px;
`;

function GameBoard(props: GameBoardProps) {
  let tiles: JSX.Element[][] = [];
  props.gameBoard.forEach((row: BoardTile[]) => {
    tiles.push(row.map((tile: BoardTile) =>
      <Tile
        key={ tile.tileId }
        gameBoard={ props.gameBoard }
        setGameBoard={ props.setGameBoard }
        selectedLetter={ props.selectedLetter }
        setSelectedLetter={ props.setSelectedLetter }
        setLettersOnBoard={ props.setLettersOnBoard }
        lettersOnBoardIds={ props.lettersOnBoardIds }
        theme={ props.theme }
        tile={ tile }
        choosingTile={ props.choosingTile }
        setChoosingTile={ props.setChoosingTile }/>
    ));
  });

  return (
    <StyledGameBoard>{ tiles }</StyledGameBoard>
  );
}

export default GameBoard;
