import React, { useState } from 'react';
import styled from 'styled-components';
import { MyTheme } from '../App';

interface LetterProps {
  active?: boolean;
  points: number;
  setSelectedLetter: React.Dispatch<React.SetStateAction<string>>;
  choosingTile: boolean;
  setChoosingTile: React.Dispatch<React.SetStateAction<boolean>>;
  theme: MyTheme;
  value: string;
}

const StyledLetter: any = styled.button<LetterProps>`
  background: ${props => props.theme.letters};
  border: none;
  border-radius: 8px;
  bottom: ${props => props.active ? '4px' : '0'};
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

// TODO: don't need choosingTile?
function letterClicked(
  active: boolean,
  setActive: React.Dispatch<React.SetStateAction<boolean>>,
  value: string,
  setSelectedLetter: React.Dispatch<React.SetStateAction<string>>,
  choosingTile: boolean,
  setChoosingTile: React.Dispatch<React.SetStateAction<boolean>>
): void {
  setActive(!active)
  setSelectedLetter(value);
  setChoosingTile(!active);
}

function Letter(props: LetterProps) {
  const [active, setActive] = useState(false);

  return (
    <StyledLetter active={ active }
                  onClick={() => letterClicked(
                    active,
                    setActive,
                    props.value,
                    props.setSelectedLetter,
                    props.choosingTile,
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
