import React from 'react';
import styled from 'styled-components';
import { MyTheme } from '../App';

interface LetterProps {
  value: string;
  points: number;
  selectLetter: any;
  theme: MyTheme;
}

const StyledLetter = styled.button`
  background: ${props => props.theme.letters};
  border-radius: 8px;
  box-shadow: inset 0px 5px 10px rgba(0, 0, 0, 0.2), 0px 5px 5px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  color: #4C1900;
  font-size: 3.5rem;
  font-weight: 700;
  display: flex;
	justify-content: center;
	align-items: center;
  position: relative;
  transition: filter 100ms ease;

  &:hover {
    cursor: pointer;
    filter: brightness(110%);
  }

  .points {
    font-size: 0.8rem;
    position: absolute;
    top: 5%;
    right: 10%;
  }
`;

function Letter(props: LetterProps) {
  return (
    <StyledLetter onClick={() => props.selectLetter(props.value)}>
      { props.value }
      <span className="points">
        { props.points }
      </span>
    </StyledLetter>
  );
}

export default Letter;
