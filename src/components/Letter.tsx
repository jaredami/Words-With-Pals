import React from 'react';
import styled from 'styled-components';

const StyledLetter = styled.div`
  background: #fbb24e;
  border-radius: 8px;
  box-shadow: inset 0px 5px 10px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
`;

function Letter(props: { value: string }) {
  return (
    <StyledLetter>{ props.value }</StyledLetter>
  );
}

export default Letter;
