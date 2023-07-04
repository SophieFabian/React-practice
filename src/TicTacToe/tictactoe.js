let playerOneActive = true;
let gameOver = false;
const gameHeading = document.getElementById("game-heading");
const restartButton = document.getElementById("restart-button");
const board = document.getElementById("board");
const squares = document.getElementsByClassName("game-square");
for (let index in squares) {
  squares[index].id = index;
}
const xValues = new Set();
const oValues = new Set();
const validTrios = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const handleClick = (event) => {
  if (gameOver) {
    return;
  }
  const square = event.target;
  if (square.innerHTML == "") {
    if (playerOneActive) {
      square.innerHTML = "X";
      square.setAttribute("disabled", true);
      playerOneActive = !playerOneActive;
      gameHeading.innerHTML = "Player 2's Turn";
      xValues.add(Number(square.id));
    } else {
      square.innerHTML = "O";
      square.setAttribute("disabled", true);
      playerOneActive = !playerOneActive;
      gameHeading.innerHTML = "Player 1's Turn";
      oValues.add(Number(square.id));
    }
  }

  const xWon = validTrios.some((trio) => {
    return trio.every((index) => xValues.has(index));
  });

  const oWon = validTrios.some((trio) => {
    return trio.every((index) => oValues.has(index));
  });

  if (xWon) {
    restartButton.style.display = "block";
    gameHeading.innerHTML = "Player 1 Won!";
    gameOver = true;
    for (let square of squares) {
      square.setAttribute("disabled", true);
    }
  }
  if (oWon) {
    restartButton.style.display = "block";
    gameHeading.innerHTML = "Player 2 Won!";
    gameOver = true;
    for (let square of squares) {
      square.setAttribute("disabled", true);
    }
  }
  if (!oWon && !xWon && xValues.size + oValues.size > 8) {
    restartButton.style.display = "block";
    gameHeading.innerHTML = "Tie Game!";
    gameOver = true;
    for (let square of squares) {
      square.setAttribute("disabled", true);
    }
  }
};

const handleRestart = () => {
  for (let square of squares) {
    square.innerHTML = "";
    square.removeAttribute("disabled");
  }
  xValues.clear();
  oValues.clear();
  restartButton.style.display = "none";
  gameHeading.innerHTML = "Player 1's Turn";
  gameOver = false;
  playerOneActive = true;
};

board.addEventListener("click", handleClick);
restartButton.addEventListener("click", handleRestart);
