import React, { CSSProperties } from 'react';

const tileStyles: CSSProperties = {
  'background': '#eeecea',
  'border': '2px solid #ffffff',
  'borderRadius': '6px',
  'boxShadow': 'inset 0px 5px 10px rgba(0, 0, 0, 0.2)',
  'boxSizing': 'border-box',
  'height': '35px',
}

function GameBoard(props: { type: string }) {
  return (
    <div style={ tileStyles }>
      { props.type }
    </div>
  );
}

export default GameBoard;
