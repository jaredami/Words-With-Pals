import React from 'react';
import styled from 'styled-components';
import { MyTheme } from '../App';

interface LetterProps {
  points: number;
  selectedLetter: string;
  setSelectedLetter: React.Dispatch<React.SetStateAction<string>>;
  setChoosingTile: React.Dispatch<React.SetStateAction<boolean>>;
  theme: MyTheme;
  value: string;
}

const StyledLetter: any = styled.button<LetterProps>`
  background: ${props => props.theme.letters};
  border: none;
  border-radius: 8px;
  bottom: ${props => (props.selectedLetter === props.value) ? '4px' : '0'};
  box-shadow: inset 0px 5px 10px rgba(0, 0, 0, 0.2), 0px 5px 5px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  color: #4C1900;
  font-size: 3.5rem;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all 100ms ease;

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

function letterClicked(
  value: string,
  selectedLetter: string,
  setSelectedLetter: React.Dispatch<React.SetStateAction<string>>,
  setChoosingTile: React.Dispatch<React.SetStateAction<boolean>>
): void {
  if (selectedLetter === value) {
    setSelectedLetter('');
    setChoosingTile(false);
  } else {
    setSelectedLetter(value);
    setChoosingTile(true);
  }
}

function Letter(props: LetterProps) {
  return (
    <StyledLetter
      selectedLetter={ props.selectedLetter }
      value={ props.value }
      onClick={() => letterClicked(
        props.value,
        props.selectedLetter,
        props.setSelectedLetter,
        props.setChoosingTile
      )}>
      { props.value }
      <span className="points">
        { props.points }
      </span>
    </StyledLetter>
  );
}

export default Letter;
