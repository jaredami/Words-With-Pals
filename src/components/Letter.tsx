import React from 'react';
import styled from 'styled-components';

const StyledLetter = styled.div`
  background: ${props => props.theme.letters};
  border-radius: 8px;
  box-shadow: inset 0px 5px 10px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  color: #4C1900;
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 75px;
`;

function Letter(props: { value: string }) {
  return (
    <StyledLetter>{ props.value }</StyledLetter>
  );
}

export default Letter;
