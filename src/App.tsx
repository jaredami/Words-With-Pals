import React from 'react';
import { ThemeProvider } from 'styled-components';
import './App.scss';
import GameBoard from './components/GameBoard';
import Shelf from './components/Shelf';

const theme = {
  tiles: '#eeecea',
  gameBoard: '#ffffff',
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
