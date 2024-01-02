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

  const dropToken = (player) => {

    const {value, column, row} = player;

    const validCell = board[column][row] === 0;

    if (!validCell) {
      console.log("No valid cell")
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

    let {row, column} = player

    return {value, column, row}
  }
  
  const getValue = () => value;

  return {addToken, getValue};
}
const cell = Cell();


function GameController(){
  const board = GameBoard();
  const players = [
    { name: "P1", token: "x" },
    { name: "P2", token: "o" }
  ];
  let activePlayer = players[0];

  const toggleTurnPlayer = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => activePlayer;

  function checkLine (line) {
    return line.every(cell => cell === line[0] && cell !== 0);
  }

  function evaluateWinCondition() {
    const currentBoard = board.getBoard()

    //rows
    for (let i = 0; i < currentBoard.length; i++) {
      if (checkLine(currentBoard[i])) {
        return true
      }
    }

    // columns
    for (let j = 0; j < currentBoard.length; j++) {
      if (checkLine(currentBoard[0][i], currentBoard[1][i], currentBoard[2][i])) {
        return true
      }
    }

    if (checkLine(currentBoard[0][0], currentBoard[1][1], currentBoard[2][2]) ||
        checkLine(currentBoard[0][2], currentBoard[1][1], currentBoard[2][0])) {
      return true
    }
    

  }

  
  let initRound = 0;
  function playRound(){
    const hasWinner = evaluateWinCondition()
    const hasDraw = 
    let round = initRound
    
    if (hasWinner) {
      round = initRound
      return console.log(`The winner is ${activePlayer.name}`)

    } else if (hasDraw) {
      round = initRound
      return console.log(`The winner is ${activePlayer.name}`)

    } else if (!hasWinner){
      round++
      console.log({round, activePlayer});
      const playerSelection = cell.addToken(activePlayer);
    
      board.dropToken(playerSelection);
      
      toggleTurnPlayer();
      board.printBoard();
      playRound()
  
    }
  }
  return {playRound, getActivePlayer}
}


const game = GameController();