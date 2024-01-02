"use strict";

function GameBoard (){
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(cell.getValue());
    }
  }
  const getBoard = () => board;

  const dropToken = (value, column, row) => {
    const validCell = board[column][row] === 0;

    if (!validCell) {
      return console.log("No valid cell")
    } else {
      board[column][row] = value;
    }

    
  }
  
  const printBoard = () => console.log(getBoard())

  return {getBoard, dropToken, printBoard}
};



function Cell(){
  let value = 0

  const addToken = (player) => {
    value = player.token;

    let column = prompt("column", [0])
    let row = prompt("row", [0])

    return {value, column, row}
  }
  
  const getValue = () => value;

  return {addToken, getValue};
}
const cell = Cell()


function GameController(){

  const board = GameBoard();

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

  const getActivePlayer = () => activePlayer
  
  let round = 0
  function playRound(){
    round++
    let playerSelection = cell.addToken(activePlayer);
    
    board.dropToken(activePlayer.value, playerSelection.column, playerSelection.row)
    
    toggleTurnPlayer()
    board.printBoard()
    
    console.log(`ronda: ${round}`)
  }

  return {playRound, getActivePlayer, players}
}
const game = GameController()

const player1 = game.players[0]
const player2 = game.players[1]