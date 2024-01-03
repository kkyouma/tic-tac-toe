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
    { name: "P1", token: "x", score: 0},
    { name: "P2", token: "o", score: 0}
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
  function playRound(cell){

    const currentBoard = board.getBoard()
    const hasWinner = evaluateWinCondition(currentBoard);
    const hasDraw = checkTie(currentBoard);

    if (hasWinner) {
      console.log(`The winner is ${activePlayer.name}`);
      return

    } else if (hasDraw) {
      console.log('The game is a Tie');
      return
    }

    console.log(`Turn: ${round + 1}`)
    console.log(`Current player: ${activePlayer.name}`)
    board.printBoard();
    
    if (cell) {
      const {row, column} = cell

      const playerSelection = {
        value: activePlayer.token,
        row: row,
        column: column,
      }
      
      board.dropToken(playerSelection);

            
      toggleTurnPlayer();
    }
  }
  return {playRound, getActivePlayer, getBoard: board.getBoard }
}

function ScreenController () {
  const boardContainer = document.getElementById('game-container');
  const startBtn = document.getElementById('new-game');
  const player1Score = document.getElementById('player1-score');
  const player2Score = document.getElementById('player2-score');
  const game = GameController()

  function handleCellClick (e) {
    const row = e.target.dataset.row;
    const column = e.target.dataset.column;

    const selectedCell = {
      row: parseInt(row),
      column: parseInt(column),
    };

    game.playRound(selectedCell)
  }

  function renderBoard() {
    boardContainer.textContent = '';

    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    board.forEach((row, rowIndex) => {
      row.forEach ((cell, columnIndex) => {
        const cellButton = document.createElement('button');
        cellButton.classList.add('cell');
        cellButton.dataset.row = rowIndex;
        cellButton.dataset.column = columnIndex;
        cellButton.textContent = cell;
        

        boardContainer.appendChild(cellButton);
        cellButton.addEventListener('click', handleCellClick);
      });
    });
  }
  renderBoard()
}
ScreenController()