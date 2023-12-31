"use strict";

const gameBoard = (function (){
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(updateCell());
    }
  }
    
  const getBoard = () => board;

  // const validCells = board.filter(row => )

  console.log(getBoard())

  return {getBoard}
})();

function updateCell(){
  let value = 0

  const addToken = (player) => {
    value = player.symbol;
  }

  const getValue = () => value;

  return {addToken, getValue};
}

///////////////////////////////////////
function gameController(){

  function createPlayer (name) {
    let score = 0;
  
    const addScore = () => score++
    const tokenSelection = (token = "x") => token
  
    console.log({name}) 
  
    return {name, addScore, tokenSelection}
  }

  
  // function playRound(){
    // }
    
    // const toggleTurnPlayer = player

    return {createPlayer}
}

const game = gameController()

const player1 = game.createPlayer("player1")
const player2 = game.createPlayer("player2")


