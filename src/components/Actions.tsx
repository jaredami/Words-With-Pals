import React from 'react';
import { IconContext } from "react-icons";
import { FaAngleDoubleRight, FaBars, FaRandom, FaRetweet, FaUndo } from "react-icons/fa";
import styled from "styled-components";
import { MyTheme } from '../App';

interface ActionsProps {
  lettersOnBoardIds: number[];
  theme: MyTheme;
  clearBoard: () => void;
}

const StyledActions = styled.div`
  background: ${props => props.theme.gameBoard};
  display: grid;
  grid-column-gap: 8px;
  grid-template-columns: repeat(5, 1fr);
  height: 90px;
  margin: 8px auto;
  place-items: stretch;
  width: 630px;
`;

const StyledActionButton = styled.button`
  align-items: center;
  background: ${props => props.theme.defaultTile};
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  place-content: center;
`;

function shuffle(): void {
  console.log('shuffle');
}

function Actions(props: ActionsProps) {
  return (
    <StyledActions>
      <StyledActionButton theme={ props.theme }>
        <IconContext.Provider value={{ style: { fontSize: '2.5rem', color: "white" }}}>
          <FaBars />
        </IconContext.Provider>
        MORE
      </StyledActionButton>
      <StyledActionButton theme={ props.theme }>
        <IconContext.Provider value={{ style: { fontSize: '3rem', color: "white" }}}>
          <FaAngleDoubleRight />
        </IconContext.Provider>
        PASS
      </StyledActionButton>
      <StyledActionButton theme={ props.theme }>
        PLAY
      </StyledActionButton>
      <StyledActionButton theme={ props.theme }>
        <IconContext.Provider value={{ style: { fontSize: '3rem', color: "white" }}}>
          <FaRetweet />
        </IconContext.Provider>
        SWAP
      </StyledActionButton>
      <StyledActionButton
        theme={ props.theme }
        onClick={ props.lettersOnBoardIds.length > 1 ? props.clearBoard : shuffle }>
        <IconContext.Provider value={{ style: { fontSize: '2.5rem', color: "white" }}}>
          { props.lettersOnBoardIds.length > 1 ? <FaUndo /> : <FaRandom /> }
        </IconContext.Provider>
        { props.lettersOnBoardIds.length > 1 ? 'RECALL' : 'SHUFFLE' }
      </StyledActionButton>
    </StyledActions>
  );
}

export default Actions;