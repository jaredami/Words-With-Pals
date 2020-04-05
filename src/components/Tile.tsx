import React from 'react';

const tileStyles = {
  'box-sizing': 'border-box',
  'border': '2px solid #ffffff',
  'border-radius': '6px',
  'height': '35px',
  'box-shadow': 'inset 0px 5px 10px rgba(0, 0, 0, 0.2)',
  'background': '#eeecea',
}

function GameBoard() {
  return (
    <div style={ tileStyles }>
    </div>
  );
}

export default GameBoard;
