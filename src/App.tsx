import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import './App.scss';
import Actions from './components/Actions';
import GameBoard from './components/GameBoard';
import Shelf from './components/Shelf';

export type TileTypes = 'TW' | 'DW' | 'TL' | 'DL' | 'X';

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
const themeLight: MyTheme = {
  gameBoard: '#ffffff',
  letters: '#fbb24e',
  defaultTile: '#eeecea',
  tileTypes: {
    TW: '#E79F45',
    DW: '#C86058',
    TL: '#6EA055',
    DL: '#138CCE',
    X: '#353535'
  },
}

function App() {
  const [selectedLetter, setSelectedLetter] = useState({ val: '', id: 0 });
  const [lettersOnBoard, setLettersOnBoard] = useState([0]);
  const [choosingTile, setChoosingTile] = useState(false);

  return (
    <ThemeProvider theme={ theme }>
      <div className="App">
        <GameBoard
          selectedLetter={ selectedLetter }
          setSelectedLetter={ setSelectedLetter }
          lettersOnBoard={ lettersOnBoard }
          setLettersOnBoard={ setLettersOnBoard }
          choosingTile={ choosingTile }
          setChoosingTile={ setChoosingTile }
          theme={ theme }/>
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
