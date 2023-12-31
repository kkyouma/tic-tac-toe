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

  const createPlayer = function (name) {
    let score = 0;
    let token = "o"
  
    const addScore = () => score++
  
    console.log({name, token}) 
  
    return {name, addScore, token}
  }

  const players = [
    { name: "P1",
      token: "x"
    }, {
      name: "P2",
      token: "o"
    }
  ];

  let activePlayer = players[0] 

  const toggleTurnPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  }
  
  function playRound(){
    
  }

  return {createPlayer, playRound}
}

const game = gameController()

// const player1 = game.createPlayer("player1")
// const player2 = game.createPlayer("player2")


