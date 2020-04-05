import React from 'react';
import styled from 'styled-components';

const StyledTile = styled.div`
  background: ${props => props.theme.tiles};
  border: 2px solid ${props => props.theme.gameBoard};
  border-radius: 6px;
  box-shadow: inset 0px 5px 10px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  height: 35px;
`

function GameBoard(props: { type: string }) {
  return (
    <StyledTile>{ props.type }</StyledTile>
  );
}

export default GameBoard;
