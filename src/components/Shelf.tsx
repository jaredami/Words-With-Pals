import React from 'react';
import Letter from './Letter';

const shelfStyles = {
  'width': '525px',
  'height': '70px',
  'margin': '0 auto',
  'display': 'grid',
  'grid-template-columns': 'repeat(7, 1fr)',
  'grid-column-gap': '8px',
}

function Shelf() {
  return (
    <div style={ shelfStyles }>
      {Array(7).fill(<Letter />)}
    </div>
  );
}

export default Shelf;
