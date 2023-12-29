"use strict";

const gameBoard = (function (){
  const rows = 3;
  const columns = 3;
  const board = [];

  const createCell = () => {
  };

  const displayBoard = () => {
    for (let i = 0; i < rows; i++){
      board[i] = [];
      for (let j = 0; j < columns; j++){
        board[i].push(createCell());
      }
    }
  };

  return {
    displayBoard: displayBoard,
    getboard: () => board
  };

})();

gameBoard.displayBoard();

const table = gameBoard.getboard();
console.log(table);
