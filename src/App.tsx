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
    
    // Get indexes for all letters on board from shelf.
    gameBoard.forEach((row: BoardTile[], rowIndex: number) => row.forEach((tile: BoardTile, tileIndex: number) => {
      if (tile.val.letterId && tile.val.points) {
        if (lettersOnBoardIds.includes(tile.val.letterId)) {
          // TODO: add check that letter is from shelf?
          lettersOnBoardIndexes.push([rowIndex, tileIndex]);
        };
      }
    }));

    if (allLettersFromShelfInStraightLine(lettersOnBoardIndexes)) {
      if (allCurrentLettersInSameWord(lettersOnBoardIndexes)) {
        const points = getAllWordsInColumn(lettersOnBoardIndexes)
          .filter((word: BoardTile[]) => {
            return word.some(letter => getLetterIdsForShelf().indexOf(letter.val.letterId as number) >= 0)
          })[0]
          .map((letter: BoardTile) => letter.val.points as number)
          .reduce((prev: number, cur: number) => {
            return prev + cur
          }, 0);

        console.log('points', points);
      } else {
        console.log('Can only play one word at a time!');
      }
    } else {
      console.log('Tiles must be in a straight line!');
    }
  };

  // Returns true if all letters are in a straight line.
  function allLettersFromShelfInStraightLine(lettersOnBoardIndexes: number[][]): boolean {
    const allInRowOrColumn: boolean = lettersOnBoardIndexes.every(arr => {
      return arr[0] === lettersOnBoardIndexes[0][0]
    }) || lettersOnBoardIndexes.every(arr => {
      return arr[1] === lettersOnBoardIndexes[0][1];
    });

    return allInRowOrColumn;
  }

  // function allInSameRow(): boolean {

  // }

  // Returns true if all of the ids that are included in shelfLetters are in the same word.
  function allCurrentLettersInSameWord(lettersOnBoardIndexes: number[][]): boolean {
    const columnWords: BoardTile[][] = getAllWordsInColumn(lettersOnBoardIndexes);

    // Create array of letterIds from shelfLetters.
    const shelfIds: any[] = shelfLetters.map(letter => letter.letterId);

    // Get number of words that have a letter from the shelf in them.
    let wordsWithLetterFromShelfCount: number = 0;
    getLetterIdsForWords(columnWords).forEach((arr: BoardTile['val']['letterId'][]) => {
      if (arr.some((id: BoardTile['val']['letterId']) => shelfIds.includes(id))) {
        wordsWithLetterFromShelfCount++;
      }
    });

    return wordsWithLetterFromShelfCount === 1;
  }

  function getAllWordsInColumn(lettersOnBoardIndexes: number[][]): BoardTile[][] {
    let word: BoardTile[] = lettersOnBoardIndexes.length ?
      [gameBoard[lettersOnBoardIndexes[0][0]][lettersOnBoardIndexes[0][1]]] :
      [];
    const wordsArr: BoardTile[][] = [];

    for (let i = 0; i < lettersOnBoardIndexes.length; i++) {
      
      if (i > 0) {
        // If tile has letter directly above it, add it to word.
        if (lettersOnBoardIndexes[i][0] === (lettersOnBoardIndexes[i - 1][0] + 1)) {
          const tile: BoardTile = gameBoard[lettersOnBoardIndexes[i][0]][lettersOnBoardIndexes[i][1]];
          word.push(tile);
        // If not, add word to wordsArr and start new word with this tile.
        } else {
          // But only add to wordsArr if word is more than one letter long.
          if (word.length > 1) {
            wordsArr.push(word);
          }
          word = [gameBoard[lettersOnBoardIndexes[i][0]][lettersOnBoardIndexes[i][1]]];
        }

        // If this is the last tile in the column, go ahead and add word to wordsArr.
        if (i === (lettersOnBoardIndexes.length - 1)) {
          // But only if word is more than one letter long.
          if (word.length > 1) {
            wordsArr.push(word);
          }
        }
      }
    }

    return wordsArr;
  }

  function getLetterIdsForWords(wordsArr: BoardTile[][]): BoardTile['val']['letterId'][][] {
    const wordsIds: BoardTile['val']['letterId'][][] = [];

    for (let i = 0; i < wordsArr.length; i++) {
      wordsIds[i] = [];
      wordsArr[i].forEach((letter: BoardTile) => {
        wordsIds[i].push(letter.val.letterId);
      });
    }

    console.log('wordsIds', wordsIds);
    return wordsIds;
  }

  function getLetterIdsForShelf(): ShelfLetter['letterId'][] {
    return shelfLetters.map(letter => letter.letterId);
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
