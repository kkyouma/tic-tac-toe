"use strict";

const gameBoard = (function (){
  const rows = 3;
  const columns = 3;
  const board = [];

  const initBoard = function () {
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push(`${[i]},${[j]}`);
      }
    }
    return board;
  }

  return {
    initBoard,
    getBoard: () => board
  };

})();

///////////////////////////////////////
function playGame() {
  playRound()
}

function playRound(){
  gameBoard.initBoard()
  console.log(gameBoard.getBoard())
}

playGame()
///////////////////////////////////////

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
