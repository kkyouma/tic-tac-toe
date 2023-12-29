"use strict";

const gameBoard = (function (){
  const rows = 3;
  const columns = 3;
  const board = [];

  const createCell = () => {
    return {}
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
// 


function createPlayer (name) {
  let score = 0;
  let level = 0;

  const addScore = () => score++
  const addLevel = () => level++

  const displayName = () => console.log(name) 
  const displayScore = () => console.log(score)
  const displayLevel = () => console.log(level)

  return {name, addScore, addLevel, displayName, displayLevel, displayScore}
}
const player1 = createPlayer("player1")
