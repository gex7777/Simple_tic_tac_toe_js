const allCells = document.querySelectorAll(".cell");
const whosTurn = document.querySelector(".turn");
const board = document.querySelector(".board");
const reset = document.querySelector(".reset");
const result = document.querySelector(".result");
const resetBtn = document.querySelector(".resetButton");
const overlay = document.querySelector(".overlay");
let player1 = [];
let player2 = [];
let turn = true;
let counter = 0;
const winCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 5, 9],
  [3, 5, 7],
  [1, 4, 7],
  [8, 5, 2],
  [9, 6, 3],
];
const theEndGame = () => {
  if (winChecker(player1) || winChecker(player2)) {
    overlay.classList.add("reveal");
    whosTurn.innerText = "";
    if (turn) {
      result.innerText = "player x wins";
      disableBoard();
      return null;
    } else {
      result.innerText = "player o wins";
      disableBoard();
      return null;
    }
  }
};
const winChecker = (player) => {
  for (let winCombo of winCombinations) {
    if (winCombo.every((v) => player.includes(v))) {
      return true;
    }
  }
};
const disableBoard = () => {
  board.classList.add("disabled");
};
const handleCellClick = (e) => {
  e.target.classList.add("clicked");
  counter = counter + 1;
  if (turn) {
    e.target.innerHTML = `<i class="fa fa-close" aria-hidden="true"></i>`;
    whosTurn.innerText = "now its o turn";
    player1.push(Number(e.target.dataset.number));
  } else {
    e.target.innerHTML = `<i class="fa fa-circle-o" aria-hidden="true"></i>`;
    whosTurn.innerText = "now its x turn";
    player2.push(Number(e.target.dataset.number));
  }
  if (counter > 4) {
    theEndGame();
  }
  turn = !turn;
  if (counter > 8) {
    whosTurn.innerText = "draw";
    console.log("this is he end");
    disableBoard;
  }
};

const handleReset = (e) => {
  for (let cell of allCells) {
    cell.textContent = "";
    cell.classList.remove("clicked");
  }
  turn = true;
  whosTurn.innerText = "now its x turn";
  board.classList.remove("disabled");
  overlay.classList.remove("reveal");
  player1 = [];
  player2 = [];
  counter = 0;
};
for (let cell of allCells) {
  console.log(cell);
  cell.addEventListener("click", handleCellClick);
}
reset.addEventListener("click", handleReset);
resetBtn.addEventListener("click", handleReset);
