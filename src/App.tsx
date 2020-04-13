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
  const [selecting, setSelecting] = useState(false);

  return (
    <ThemeProvider theme={ theme }>
      <div className="App">
        <GameBoard selectedLetter={ selectedLetter }
                   selecting={ selecting }
                   setSelecting={ setSelecting }
                   theme={ theme } />
        <Shelf setSelectedLetter={ setSelectedLetter}
               selecting={ selecting }
               setSelecting={ setSelecting }
               theme={ theme } />
      </div>
    </ThemeProvider>
  );
}

export default App;
