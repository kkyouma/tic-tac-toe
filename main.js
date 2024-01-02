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
    const validCell = board[row][column] === 0;

    if (!validCell) {
      console.log("No valid cell")
    } else {
      board[row][column] = value;
    }
  }
  
  const printBoard = () => console.log(getBoard())

  return {getBoard, dropToken, printBoard}
};



function Cell(){
  let value = 0

  const addToken = (player) => {
    value = player.token;

    let {row, column} = player;

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
    return line.every((cell) => cell === line[0] && cell !== 0);
  }

  function checkTie () {
    const currentBoard = board.getBoard();
      return currentBoard.every(row => row.every(cell => cell !== 0));
  }


  function evaluateWinCondition(currentBoard) {
    //rows
    for (let i = 0; i < currentBoard.length; i++) {
      if (checkLine(currentBoard[i])) {
        return true
      }
    }

    // columns
    for (let j = 0; j < currentBoard.length; j++) {
      if (checkLine([currentBoard[0][j], currentBoard[1][j], currentBoard[2][j]])) {
        return true
      }
    }
    // diagonals
    if (checkLine([currentBoard[0][0], currentBoard[1][1], currentBoard[2][2]]) ||
        checkLine([currentBoard[0][2], currentBoard[1][1], currentBoard[2][0]])) {
      return true
    }

    return false
  }


  let round = 0;
  function playRound(){

    const currentBoard = board.getBoard()
    const hasWinner = evaluateWinCondition(currentBoard);
    const hasDraw = checkTie(currentBoard);

    if (hasWinner) {
      console.log(`The winner is ${activePlayer.name}`)
      return

    } else if (hasDraw) {
      console.log('The game is a Tie')
      return
    }

    console.log(`Turn: ${round + 1}`)
    console.log(`Current player: ${activePlayer.name}`)
    board.printBoard();

    function pickCell (){
      const rowInput = prompt(`Select the row (0, 1, 2) for ${activePlayer.name}`);
      const columnInput = prompt(`Select the column (0, 1, 2) for ${activePlayer.name}`, 1);

      if (rowInput.toLowerCase() === "exit" || columnInput.toLowerCase() === "exit") {
        console.log("Exit from the game")
        return null;
      }
      
      const row = Number.parseInt(rowInput)
      const column = Number.parseInt(columnInput)

      if (Number.isNaN(row) || Number.isNaN(column) || 0 > row || row >= 3 || 0 > column || column >= 3 || currentBoard[row][column] !== 0) {
        console.log("Invalid movement. Try again.");
        return pickCell();
      }


      return {row, column}
    }
    
    if (pickCell() !== null) {
      const {row, column} = pickCell()

      const playerSelection = {
        value: activePlayer.token,
        row: row,
        column: column,
      }
      
      board.dropToken(playerSelection);
      
      toggleTurnPlayer();
      playRound();
    }
  }
  return {playRound, getActivePlayer}
}


const game = GameController();