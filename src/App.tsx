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
  const [selectedLetter, setSelectedLetter] = useState('');
  const [choosingTile, setChoosingTile] = useState(false);

  return (
    <ThemeProvider theme={ theme }>
      <div className="App">
        <GameBoard selectedLetter={ selectedLetter }
                   choosingTile={ choosingTile }
                   setChoosingTile={ setChoosingTile }
                   theme={ theme } />
        <Shelf selectedLetter={ selectedLetter }
               setSelectedLetter={ setSelectedLetter}
               choosingTile={ choosingTile }
               setChoosingTile={ setChoosingTile }
               theme={ theme } />
      </div>
    </ThemeProvider>
  );
}

export default App;

// TODO: Pass selectedLetter to Shelf -> Letter so that when clicking a letter,
// TODO: it only gets set to active if the selectedLetter matches the value of the letter
// TODO: and all other letters get set to inactive if it selectedLetter does equal the value of the letter