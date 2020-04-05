import React, { CSSProperties } from 'react';
import Letter from './Letter';

const shelfStyles: CSSProperties = {
  'display': 'grid',
  'gridColumnGap': '8px',
  'gridTemplateColumns': 'repeat(7, 1fr)',
  'height': '70px',
  'margin': '0 auto',
  'width': '525px',
}

const letters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

function Shelf() {
  return (
    <div style={ shelfStyles }>
      {/* { Array(7).fill(<Letter />) } */}
      { letters.map((value: string, index: number) => <Letter value={ value } key={ index }/> )}
    </div>
  );
}

export default Shelf;
