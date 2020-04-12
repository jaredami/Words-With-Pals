import React from 'react';
import { ThemeProvider } from 'styled-components';
import './App.scss';
import GameBoard from './components/GameBoard';
import Shelf from './components/Shelf';

export type TileTypes = 'TW' | 'DW' | 'TL' | 'DL' | 'X';

export interface MyTheme {
  gameBoard: string,
  tileTypes: { [k in TileTypes]: string }
  letters: string
}

const theme: MyTheme = {
  gameBoard: '#ffffff',
  tileTypes: {
    TW: '#E79F45',
    DW: '#C86058',
    TL: '#6EA055',
    DL: '#138CCE',
    X: '#353535'
  },
  letters: '#fbb24e'
}

function App() {
  return (
    <ThemeProvider theme={ theme }>
    <div className="App">
      <GameBoard letter="Z"/>
      <Shelf />
    </div>
    </ThemeProvider>
  );
}

export default App;
