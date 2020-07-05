import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import './App.scss';
import Actions from './components/Actions';
import GameBoard from './components/GameBoard';
import Shelf from './components/Shelf';
import { title } from 'process';

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

export interface ShelfLetter {
  points: number;
  val: string;
  letterId: number;
}

const shelfLettersInit: ShelfLetter[] = [
  { val: 'A', points: 1, letterId: 1 },
  { val: 'B', points: 4, letterId: 2 },
  { val: 'C', points: 4, letterId: 3 },
  { val: 'D', points: 2, letterId: 4 },
  { val: 'E', points: 1, letterId: 5 },
  { val: 'F', points: 4, letterId: 6 },
  { val: 'G', points: 3, letterId: 7 },
];

function App() {
  const [gameBoard, setGameBoard] = useState(() => JSON.parse(JSON.stringify(boardInitFull)));
  const [shelfLetters, setShelfLetters] = useState(shelfLettersInit);
  const [selectedLetter, setSelectedLetter] = useState({ val: '', id: 0, points: 0 });
  const [lettersOnBoardIds, setLettersOnBoard] = useState([0]);
  const [choosingTile, setChoosingTile] = useState(false);

  useEffect(() => {
    calculatePoints(gameBoard);
  });

  function calculatePoints(gameBoard: BoardTile[][]) {
    const lettersOnBoardIndexes: number[][] = [];
    
    // get indexes for all letters on board from shelf
    // (search board for tile with id from lettersOnBoardIds (&& shelf?))
    gameBoard.forEach((row: BoardTile[], rowIndex: number) => row.forEach((tile: BoardTile, tileIndex: number) => {
      if (tile.val.letterId && tile.val.points) {
        if (lettersOnBoardIds.includes(tile.val.letterId)) {
          // TODO: add check that letter is from shelf?
          lettersOnBoardIndexes.push([rowIndex, tileIndex]);
        };
      }
    }));

    if (allCurrentLettersInStraightLine(lettersOnBoardIndexes)) {
      allLettersInSameWord(lettersOnBoardIndexes);
    }
  };

  // Returns true if all letters are in a straight line
  function allCurrentLettersInStraightLine(lettersOnBoardIndexes: number[][]): boolean {
    const allInRowOrColumn: boolean = lettersOnBoardIndexes.every(arr => {
      return arr[0] === lettersOnBoardIndexes[0][0]
    }) || lettersOnBoardIndexes.every(arr => {
      return arr[1] === lettersOnBoardIndexes[0][1];
    });

    return allInRowOrColumn;
  }

  // function allInSameRow(): boolean {

  // }

  // Returns true if all letters in same word
  function allLettersInSameWord(lettersOnBoardIndexes: number[][]): void {
    // Separate out each word
    // Check if all of the ids that are included in shelfLetters are in the same word

    // const words = lettersOnBoardIndexes.map(indexArr => {
    //   const tile = gameBoard[indexArr[0]][indexArr[1]];
    //   return tile;
    // })
    // console.log('words', words);

    // If next previous greater, concat to word
    // if not, push word into array and reset word
    let word: string = lettersOnBoardIndexes.length ?
      gameBoard[lettersOnBoardIndexes[0][0]][lettersOnBoardIndexes[0][1]].val.text : 
      '';
    const wordsArr = [];

    for (let i = 0; i < lettersOnBoardIndexes.length; i++) {
      
      if (i > 0) {
        if (lettersOnBoardIndexes[i][0] === (lettersOnBoardIndexes[i - 1][0] + 1)) {
          const letter: string = gameBoard[lettersOnBoardIndexes[i][0]][lettersOnBoardIndexes[i][1]].val.text;
          word = word.concat(letter);
        } else {
          wordsArr.push(word);
          word = gameBoard[lettersOnBoardIndexes[i][0]][lettersOnBoardIndexes[i][1]].val.text;
        }
      }
      console.log('word', word);
      console.log('wordsArr', wordsArr);
    }

    // Returns true if all letters in column are consecutive
    // const yes: boolean = lettersOnBoardIndexes.every((arr, arrIndex) => {
    //   if (arrIndex > 0) {
    //     return arr[0] === lettersOnBoardIndexes[arrIndex - 1][0];
    //   }
    //   return true;
    // });
    // console.log('yes', yes);
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
          shelfLetters={ shelfLetters }
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
