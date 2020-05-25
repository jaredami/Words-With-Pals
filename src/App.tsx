import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import './App.scss';
import Actions from './components/Actions';
import GameBoard from './components/GameBoard';
import Shelf from './components/Shelf';

export type TileTypes = string;

export interface BoardTile {
  val: {
    text: string;
    letterId?: number;
    points?: number;
  },
  tileId: string
}

export interface MyTheme {
  gameBoard: string;
  letters: string;
  defaultTile: string;
  tileTypes: { [k in TileTypes]: string };
}

const theme: MyTheme = {
  gameBoard: '#040914',
  letters: '#e4d3ea',
  defaultTile: '#34405e',
  tileTypes: {
    TW: '#75DDDD',
    DW: '#84c7d0',
    TL: '#9297c4',
    DL: '#9368b7',
    X: '#aa3e98'
  },
}

// const themeLight: MyTheme = {
//   gameBoard: '#ffffff',
//   letters: '#fbb24e',
//   defaultTile: '#eeecea',
//   tileTypes: {
//     TW: '#E79F45',
//     DW: '#C86058',
//     TL: '#6EA055',
//     DL: '#138CCE',
//     X: '#353535'
//   },
// }

const boardInit: (TileTypes | '')[][] = [
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
];

const boardInitFull: BoardTile[][] = boardInit.map((row, rowIndex) => {
  return row.map((tileText, tileIndex) => (
    {
      val: {
        text: tileText,
        letterId: undefined
      },
      tileId: `${rowIndex}-${tileIndex}`
    }
  ));
});


function App() {
  const [gameBoard, setGameBoard] = useState(() => JSON.parse(JSON.stringify(boardInitFull)));
  const [selectedLetter, setSelectedLetter] = useState({ val: '', id: 0, points: 0 });
  const [lettersOnBoardIds, setLettersOnBoard] = useState([0]);
  const [choosingTile, setChoosingTile] = useState(false);

  useEffect(() => {
    calculatePoints(gameBoard);
  });

  let points: number = 0;
  const letterIdsInRow = [0];
  function calculatePoints(gameBoard: BoardTile[][]) {

    gameBoard.forEach((row, rowIndex) => row.forEach((tile, tileIndex) => {
      // If the current tile has a letter placed on it...
      if (tile.val.letterId && tile.val.points) {
        const tileLeft = gameBoard[rowIndex][tileIndex - 1];
        const tileAbove = gameBoard[rowIndex - 1][tileIndex];

        // If there is no letter directly to the left or above, this could be the start of a word
        if (!tileLeft.val.points && !tileAbove.val.points) {
          points = points + tile.val.points;
          letterIdsInRow.push(tile.val.letterId);

          checkNextTileRight(rowIndex, tileIndex);
          checkNextTileBelow(rowIndex, tileIndex);
        } else {

        }
        console.log('letterIdsInRow', letterIdsInRow);
      }
    }));
    console.log('points', points);
    console.log('lettersOnBoardIds', lettersOnBoardIds);
  }

  // Recursively add up the points for all adjacent letters to the right.
  function checkNextTileRight(rowIndex: number, tileIndex: number) {
    const tileRight = gameBoard[rowIndex][tileIndex + 1];

    if (tileRight.val.points) {
      points = points + tileRight.val.points;
      checkNextTileRight(rowIndex, tileIndex + 1);
    }
  }

  // Recursively add up the points for all adjacent letters below.
  function checkNextTileBelow(rowIndex: number, tileIndex: number) {
    const tileBelow = gameBoard[rowIndex + 1][tileIndex];

    if (tileBelow.val.points) {
      points = points + tileBelow.val.points;
      checkNextTileRight(rowIndex + 1, tileIndex);
    }
  }

  function clearBoard(): void {
    setGameBoard(JSON.parse(JSON.stringify(boardInitFull)));
    setLettersOnBoard([0]);
  }

  return (
    <ThemeProvider theme={ theme }>
      <div className="App">
        <GameBoard
          gameBoard={ gameBoard }
          setGameBoard={ setGameBoard }
          selectedLetter={ selectedLetter }
          setSelectedLetter={ setSelectedLetter }
          lettersOnBoardIds={ lettersOnBoardIds }
          setLettersOnBoard={ setLettersOnBoard }
          choosingTile={ choosingTile }
          setChoosingTile={ setChoosingTile }
          theme={ theme }/>
        <Shelf
          selectedLetter={ selectedLetter }
          setSelectedLetter={ setSelectedLetter }
          lettersOnBoardIds={ lettersOnBoardIds }
          setChoosingTile={ setChoosingTile }
          theme={ theme }/>
        <Actions
          lettersOnBoardIds={ lettersOnBoardIds }
          theme={ theme }
          clearBoard={ clearBoard }/>
      </div>
    </ThemeProvider>
  );
}

export default App;
