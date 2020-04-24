import React from 'react';
import styled from "styled-components";

interface ActionsProps {
  
}

const StyledActions = styled.div`
  background: white;
  display: grid;
  grid-column-gap: 8px;
  grid-template-columns: repeat(5, 1fr);
  height: 90px;
  margin: 1rem auto;
  place-items: center;
  width: 630px;
`;

function Actions(props: ActionsProps) {
  return (
    <StyledActions>
      <button>MORE</button>
      <button>PASS</button>
      <div>3</div>
      <button>SWAP</button>
      <button>SHUFFLE</button>
    </StyledActions>
  );
}

export default Actions;