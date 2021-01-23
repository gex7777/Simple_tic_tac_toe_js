const allCells = document.querySelectorAll(".cell");
const whosTurn = document.querySelector(".turn");
const board = document.querySelector(".board");
const reset = document.querySelector(".reset");
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

const checker = (player) => {
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
  counter = counter + 1;
  e.target.innerHTML = turn
    ? `<i class="fa fa-close" aria-hidden="true"></i>`
    : `<i class="fa fa-circle-o" aria-hidden="true"></i>`;
  turn
    ? (whosTurn.innerText = "now its o turn")
    : (whosTurn.innerText = "now its x turn");
  turn
    ? player1.push(Number(e.target.dataset.number))
    : player2.push(Number(e.target.dataset.number));
  if (turn ? checker(player1) : checker(player2)) {
    whosTurn.innerText = turn ? "player x wins" : "player o wins";
    disableBoard();
  }
  turn = !turn;
  e.target.classList.add("clicked");
  if (counter > 8) {
    whosTurn.innerText = "draw";
    console.log("this is he end");
    disableBoard;
  }
};
for (let cell of allCells) {
  console.log(cell);
  cell.addEventListener("click", handleCellClick);
}
const handleReset = (e) => {
  for (let cell of allCells) {
    cell.textContent = "";
    cell.classList.remove("clicked");
  }
  turn = true;
  whosTurn.innerText = "now its x turn";
  board.classList.remove("disabled");
  player1 = [];
  player2 = [];
  counter = 0;
};
reset.addEventListener("click", handleReset);
