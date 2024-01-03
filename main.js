"use strict";

function GameBoard (){
  const rows = 3;
  const columns = 3;
  const board = [];

  const initialBoard = function (){
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push(cell.getValue());
      }
    }
  };
  initialBoard()
  
  const getBoard = () => board;

  const dropToken = (player) => {
    const {value, column, row} = player;
    const validCell = board[row][column] === 0;

    if (!validCell) {
      throw new Error("No valid cell")
    } else {
      board[row][column] = value;
    }
  }
  
  const printBoard = () => console.log(getBoard())

  return {getBoard, dropToken, printBoard, initialBoard}
};



function Cell(){
  let value = 0

  const setValue = (player) => {
    value = player.token;
    return {value}
  }
  
  const getValue = () => value;

  return {setValue, getValue};
}
const cell = Cell();


function GameController(){
  const board = GameBoard();
  const players = [
    { name: "P1", token: "x", score: 0},
    { name: "P2", token: "o", score: 0},
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


  function checkWin(currentBoard) {
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

  function newGame() {
    board.initialBoard();
  
    return {
      round: 0,
      activePlayer: players[0],
    };
  }


  let round = 0;
  function playRound(cell){

    let currentBoard = board.getBoard()
    const hasWinner = checkWin(currentBoard);
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

      const newBoard = board.getBoard();
      const newHasWinner = checkWin(newBoard);
      const newHasTie = checkTie(newBoard)

      if (newHasWinner) {
        console.log(`The winner is ${activePlayer.name}`);
        return;
      } else if (newHasTie) {
        console.log('The game is a Tie');
        return
      }
      toggleTurnPlayer()
    }
  }
  return {playRound, getActivePlayer, getBoard: board.getBoard, newGame }
}

function ScreenController () {
  const boardContainer = document.getElementById('game-container');
  const newGame = document.getElementById('new-game-btn');
  const player1Score = document.getElementById('player1-score');
  const player2Score = document.getElementById('player2-score');
  const game = GameController()

  newGame.addEventListener('click', startNewGame)

  function startNewGame () {
    game.newGame()
    renderBoard()
  }

  function handleCellClick (e) {

    const selectedCell = {
      row: e.target.dataset.row,
      column: e.target.dataset.column,
    };

    game.playRound(selectedCell)
    renderBoard()
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
        
        cellButton.addEventListener('click', handleCellClick);
        boardContainer.appendChild(cellButton);
      });
    });
  }
  renderBoard();
}
ScreenController()