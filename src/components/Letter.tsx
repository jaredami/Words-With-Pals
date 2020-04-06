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
  display: flex;
	justify-content: center;
	align-items: center;
  position: relative;
  .points {
    font-size: 0.8rem;
    position: absolute;
    top: 5%;
    right: 10%;
  }
`;

function Letter(props: { value: string, points: number }) {
  return (
    <StyledLetter>
      { props.value }
      <span className="points">
        { props.points }
      </span>
    </StyledLetter>
  );
}

export default Letter;
