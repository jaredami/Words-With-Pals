import React from 'react';
import styled from 'styled-components';
import { MyTheme } from '../App';

interface LetterProps {
  points: number;
  setSelectedLetter: React.Dispatch<React.SetStateAction<string>>;
  selecting: boolean;
  setSelecting: React.Dispatch<React.SetStateAction<boolean>>;
  theme: MyTheme;
  value: string;
}

const StyledLetter = styled.button`
  background: ${props => props.theme.letters};
  border: none;
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

// TODO: don't need selecting?
function letterClicked(
  value: string,
  setSelectedLetter: React.Dispatch<React.SetStateAction<string>>,
  selecting: boolean,
  setSelecting: React.Dispatch<React.SetStateAction<boolean>>
): void {
  setSelectedLetter(value);
  setSelecting(true);
}

function Letter(props: LetterProps) {
  return (
    <StyledLetter onClick={() => letterClicked(
      props.value,
      props.setSelectedLetter,
      props.selecting,
      props.setSelecting
    )}>
      { props.value }
      <span className="points">
        { props.points }
      </span>
    </StyledLetter>
  );
}

export default Letter;
