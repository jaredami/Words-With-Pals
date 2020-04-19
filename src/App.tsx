import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import './App.scss';
import GameBoard from './components/GameBoard';
import Shelf from './components/Shelf';

export type TileTypes = 'TW' | 'DW' | 'TL' | 'DL' | 'X';

export interface MyTheme {
  gameBoard: string;
  letters: string;
  tileTypes: { [k in TileTypes]: string };
}

const theme: MyTheme = {
  gameBoard: '#ffffff',
  letters: '#fbb24e',
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
          setLettersOnBoard={ setLettersOnBoard }
          choosingTile={ choosingTile }
          setChoosingTile={ setChoosingTile }
          theme={ theme }/>
        <Shelf
          selectedLetter={ selectedLetter }
          setSelectedLetter={ setSelectedLetter}
          setChoosingTile={ setChoosingTile }
          theme={ theme }/>
      </div>
    </ThemeProvider>
  );
}

export default App;

// Every Letter should have a unique id
// When a letter is added to the board, add the id for that letter to lettersOnBoard
// In Shelf, only display letters which aren't included in lettersOnBoard


// lettersOnBoard, setLettersOnBoard