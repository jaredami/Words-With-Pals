import React from 'react';
import Tile from './Tile';

const gameBoardStyles = {
  'border': '4px solid #ffffff',
  'height': '525px',
  'width': '525px',
  'margin': '0 auto',
  'display': 'grid',
  'grid-template-columns': 'repeat(15, 35px)',
}

function GameBoard() {
  return (
    <div style={ gameBoardStyles }>
      {Array(225).fill(<Tile />)}
    </div>
  );
}

export default GameBoard;
