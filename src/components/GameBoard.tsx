import React from 'react';
import styled from 'styled-components';
import { MyTheme, TileTypes } from '../App';
import Tile from './Tile';

interface GameBoardProps {
  selectedLetter: { val: string, id: number };
  setSelectedLetter: React.Dispatch<React.SetStateAction<{ val: string, id: number }>>;
  lettersOnBoard: number[];
  setLettersOnBoard: React.Dispatch<React.SetStateAction<number[]>>;
  choosingTile: boolean;
  setChoosingTile: React.Dispatch<React.SetStateAction<boolean>>;
  theme: MyTheme;
}

const gameBoard: (TileTypes | '')[][] = [
  ['', '', '', 'TW', '', '', 'TL', '', 'TL', '', '', 'TW', '', '', ''],
  ['', '', 'DL', '', '', 'DW', '', '', '', 'DW', '', '', 'DL', '', ''],
  ['', 'DL', '', '', 'DL', '', '', '', '', '', 'DL', '', '', 'DL', ''],
  ['TW', '', '', 'TL', '', '', '', 'DW', '', '', '', 'TL', '', '', 'TW'],
  ['', '', 'DL', '', '', '', 'DL', '', 'DL', '', '', '', 'DL', '', ''],
  ['', 'DW', '', '', '', 'TL', '', '', '', 'TL', '', '', '', 'DW', ''],
  ['TL', '', '', '', 'DL', '', '', '', '', '', 'DL', '', '', '', 'TL'],
  ['', '', '', 'DW', '', '', '', 'X', '', '', '', 'DW', '', '', ''],
  ['TL', '', '', '', 'DL', '', '', '', '', '', 'DL', '', '', '', 'TL'],
  ['', 'DW', '', '', '', 'TL', '', '', '', 'TL', '', '', '', 'DW', ''],
  ['', '', 'DL', '', '', '', 'DL', '', 'DL', '', '', '', 'DL', '', ''],
  ['TW', '', '', 'TL', '', '', '', 'DW', '', '', '', 'TL', '', '', 'TW'],
  ['', 'DL', '', '', 'DL', '', '', '', '', '', 'DL', '', '', 'DL', ''],
  ['', '', 'DL', '', '', 'DW', '', '', '', 'DW', '', '', 'DL', '', ''],
  ['', '', '', 'TW', '', '', 'TL', '', 'TL', '', '', 'TW', '', '', ''],
]

const StyledGameBoard: any = styled.div`
  border: 4px solid ${props => props.theme.gameBoard};
  display: grid;
  grid-template-columns: repeat(15, 35px);
  height: 525px;
  margin: 0 auto;
  width: 525px;
`;

function GameBoard(props: GameBoardProps) {
  let tiles: JSX.Element[][] = [];
  gameBoard.forEach((rowArr: (TileTypes | '')[]) => {
    tiles.push(
      rowArr.map((tileType: (TileTypes | ''), index: number) =>
        <Tile
          key={ index }
          selectedLetter={ props.selectedLetter }
          setSelectedLetter={ props.setSelectedLetter }
          setLettersOnBoard={ props.setLettersOnBoard }
          lettersOnBoard={ props.lettersOnBoard }
          theme={ props.theme }
          type={ tileType }
          choosingTile={ props.choosingTile }
          setChoosingTile={ props.setChoosingTile }/>
      )
    );
  });

  return (
    <StyledGameBoard>{ tiles }</StyledGameBoard>
  );
}

export default GameBoard;
