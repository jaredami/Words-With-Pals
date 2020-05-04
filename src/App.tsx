import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import './App.scss';
import Actions from './components/Actions';
import GameBoard from './components/GameBoard';
import Shelf from './components/Shelf';

export type TileTypes = string;
// export type TileTypes = 'TW' | 'DW' | 'TL' | 'DL' | 'X';

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

const boardInitFull: any = boardInit.map((row, rowIndex) => {
  return row.map((tileText, tileIndex) => (
    {
      val: {
        text: tileText,
        letterId: undefined
      },
      id: `${rowIndex}-${tileIndex}`
    }
  ));
});


function App() {
  const [gameBoard, setGameBoard] = useState(JSON.parse(JSON.stringify(boardInitFull)));
  const [selectedLetter, setSelectedLetter] = useState({ val: '', id: 0 });
  const [lettersOnBoard, setLettersOnBoard] = useState([0]);
  const [choosingTile, setChoosingTile] = useState(false);

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
          lettersOnBoard={ lettersOnBoard }
          setLettersOnBoard={ setLettersOnBoard }
          choosingTile={ choosingTile }
          setChoosingTile={ setChoosingTile }
          theme={ theme }/>
        <button onClick={clearBoard}>TEST</button>
        <Shelf
          selectedLetter={ selectedLetter }
          setSelectedLetter={ setSelectedLetter }
          lettersOnBoard={ lettersOnBoard }
          setChoosingTile={ setChoosingTile }
          theme={ theme }/>
        <Actions
          lettersOnBoard={ lettersOnBoard }
          theme={ theme }/>
      </div>
    </ThemeProvider>
  );
}

export default App;

// Might need to track the overall state of the game board rather than keeping track of
// which Tiles have letters placed on them in the Tiles themselves. 
// This will make it easier to clear the GameBoard when pressing the RECALL button, and
// will probably be better when I start calculating points based on Tile placements.

// const boardInit: (TileTypes | { val: '', id: ''})[][] = [
//   [{ val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}, 'TW', { val: '', id: ''}, { val: '', id: ''}, { val: 'TL', id: ''}, { val: '', id: ''}, { val: 'TL', id: ''}, { val: '', id: ''}, { val: '', id: ''}, 'TW', { val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}],
//   [{ val: '', id: ''}, { val: '', id: ''}, { val: 'DL', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: 'DW', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: 'DW', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: 'DL', id: ''}, { val: '', id: ''}, { val: '', id: ''}],
//   [{ val: '', id: ''}, { val: 'DL', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: 'DL', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: 'DL', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: 'DL', id: ''}, { val: '', id: ''}],
//   ['TW', { val: '', id: ''}, { val: '', id: ''}, { val: 'TL', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: 'DW', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: 'TL', id: ''}, { val: '', id: ''}, { val: '', id: ''}, 'TW'],
//   [{ val: '', id: ''}, { val: '', id: ''}, { val: 'DL', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: 'DL', id: ''}, { val: '', id: ''}, { val: 'DL', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: 'DL', id: ''}, { val: '', id: ''}, { val: '', id: ''}],
//   [{ val: '', id: ''}, { val: 'DW', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: 'TL', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: 'TL', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: 'DW', id: ''}, { val: '', id: ''}],
//   [{ val: 'TL', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: 'DL', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: 'DL', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: 'TL', id: ''}],
//   [{ val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: 'DW', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}, 'X', { val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: 'DW', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}],
//   [{ val: 'TL', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: 'DL', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: 'DL', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: 'TL', id: ''}],
//   [{ val: '', id: ''}, { val: 'DW', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: 'TL', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: 'TL', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: 'DW', id: ''}, { val: '', id: ''}],
//   [{ val: '', id: ''}, { val: '', id: ''}, { val: 'DL', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: 'DL', id: ''}, { val: '', id: ''}, { val: 'DL', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: 'DL', id: ''}, { val: '', id: ''}, { val: '', id: ''}],
//   ['TW', { val: '', id: ''}, { val: '', id: ''}, { val: 'TL', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: 'DW', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: 'TL', id: ''}, { val: '', id: ''}, { val: '', id: ''}, 'TW'],
//   [{ val: '', id: ''}, { val: 'DL', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: 'DL', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: 'DL', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: 'DL', id: ''}, { val: '', id: ''}],
//   [{ val: '', id: ''}, { val: '', id: ''}, { val: 'DL', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: 'DW', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: 'DW', id: ''}, { val: '', id: ''}, { val: '', id: ''}, { val: 'DL', id: ''}, { val: '', id: ''}, { val: '', id: ''}],
//   [{ val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}, 'TW', { val: '', id: ''}, { val: '', id: ''}, { val: 'TL', id: ''}, { val: '', id: ''}, { val: 'TL', id: ''}, { val: '', id: ''}, { val: '', id: ''}, 'TW', { val: '', id: ''}, { val: '', id: ''}, { val: '', id: ''}],
// ];