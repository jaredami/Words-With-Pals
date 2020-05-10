import React from "react";
import styled from "styled-components";
import { MyTheme, BoardTile } from "../App";

export interface TileProps {
  gameBoard: BoardTile[][];
  setGameBoard: React.Dispatch<React.SetStateAction<BoardTile[][]>>;
  selectedLetter: { val: string, id: number };
  setSelectedLetter: React.Dispatch<React.SetStateAction<{ val: string, id: number }>>;
  lettersOnBoard: number[];
  setLettersOnBoard: React.Dispatch<React.SetStateAction<number[]>>;
  choosingTile: boolean;
  setChoosingTile: React.Dispatch<React.SetStateAction<boolean>>;
  theme: MyTheme;
  tile: BoardTile;
}

const StyledTile: any = styled.button<TileProps>`
  background: ${(props: TileProps): string => {
      if (props.tile.val.letterId) {
        return props.theme.letters
      } else if (props.tile.val.text === '') {
        return props.theme.defaultTile
      }
      return props.theme.tileTypes[props.tile.val.text];
    }};
  border: 2px solid ${props => props.theme.gameBoard};
  border-radius: 6px;
  box-shadow: inset 0px 5px 10px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  color: #040914;
  font-weight: 600;
  line-height: 30px;

  &:hover {
    cursor: pointer;
    filter: brightness(150%);
  }
`;

function tileClicked(
  gameboard: BoardTile[][],
  setGameBoard: React.Dispatch<React.SetStateAction<BoardTile[][]>>,
  selectedLetter: { val: string, id: number },
  setSelectedLetter: React.Dispatch<React.SetStateAction<{ val: string, id: number }>>,
  setLettersOnBoard: React.Dispatch<React.SetStateAction<number[]>>,
  choosingTile: boolean,
  setChoosingTile: React.Dispatch<React.SetStateAction<boolean>>,
  tileClicked: BoardTile
): void {
  // Store the row and tile index of the tile that was clicked
  let tileToUpdate: [number, number];
  gameboard.forEach((row: BoardTile[], rowIndex: number) => {
    row.forEach((tile: BoardTile, tileIndex: number) => {
      if (tile.tileId === tileClicked.tileId) {
        tileToUpdate = [rowIndex, tileIndex];
      }
    });
  });

  // If placing a letter on an empty tile, add it to the GameBoard
  if (choosingTile && selectedLetter) {
    setGameBoard((prevBoard: BoardTile[][]) => {
      prevBoard[tileToUpdate[0]][tileToUpdate[1]].val = { text: selectedLetter.val, letterId: selectedLetter.id };
      return prevBoard;
    });

    setLettersOnBoard(prevArray => [...prevArray, selectedLetter.id])
    setChoosingTile(false);
    setSelectedLetter({ val: '', id: 0 });
  } else {
    const letterId = tileClicked.val.letterId;

    // If tile has a letter on it already, remove it from the board
    if (letterId) {
      setLettersOnBoard(prevArray => {
        return prevArray.filter(id => id !== letterId);
      });

      setGameBoard((prevBoard: BoardTile[][]) => {
        prevBoard[tileToUpdate[0]][tileToUpdate[1]].val = { text: '' };
        return prevBoard;
      });
    }
  }
}

function Tile(props: TileProps) {
  return (
    <StyledTile
      tile={ props.tile }
      theme={ props.theme }
      onClick={() => tileClicked(
        props.gameBoard,
        props.setGameBoard,
        props.selectedLetter,
        props.setSelectedLetter,
        props.setLettersOnBoard,
        props.choosingTile,
        props.setChoosingTile,
        props.tile
      )}>
      { props.tile.val.text }
    </StyledTile>
  );
}

export default Tile;