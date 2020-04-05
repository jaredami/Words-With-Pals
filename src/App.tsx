import React from 'react';
import './App.scss';
import GameBoard from './components/GameBoard';
import Shelf from './components/Shelf';

function App() {
  return (
    <div className="App">
      <GameBoard/>
      <Shelf />
    </div>
  );
}

export default App;
