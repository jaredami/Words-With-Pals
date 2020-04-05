import React, { CSSProperties } from 'react';

const letterStyles: CSSProperties = {
  'background': '#fbb24e',
  'borderRadius': '8px',
  'boxShadow': 'inset 0px 5px 10px rgba(0, 0, 0, 0.2)',
  'boxSizing': 'border-box',
}

function Letter(props: { value: string }) {
  return (
    <div style={ letterStyles }>
      { props.value }
    </div>
  );
}

export default Letter;
