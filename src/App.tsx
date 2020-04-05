import React from 'react';
import { ThemeProvider } from 'styled-components';
import './App.scss';
import GameBoard from './components/GameBoard';
import Shelf from './components/Shelf';

export type tileTypes = 'TW' | 'DW' | 'TL' | 'DL' | 'X';

export interface MyTheme {
  gameBoard: string,
  tileTypes: { [k in tileTypes]: string }
  letters: string
}

const theme: MyTheme = {
  gameBoard: '#ffffff',
  tileTypes: {
    TW: 'yellow',
    DW: 'red',
    TL: 'green',
    DL: 'blue',
    X: 'black'
  },
  letters: '#fbb24e'
}

function App() {
  return (
    <ThemeProvider theme={ theme }>
    <div className="App">
      <GameBoard/>
      <Shelf />
    </div>
    </ThemeProvider>
  );
}

export default App;
