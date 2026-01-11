const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");
const clickSound = document.getElementById("clickSound");
const winSound = document.getElementById("winSound");

let board, currentPlayer, gameOver;
let mode = "pvp";
let difficulty = "easy";

function setMode(m) {
  mode = m;
  document.getElementById("difficulty").classList.toggle("hidden", m !== "bot");
  restart();
}

function setDifficulty(d) {
  difficulty = d;
  restart();
}

function createBoard() {
  boardEl.innerHTML = "";
  board = Array(9).fill("");
  gameOver = false;
  currentPlayer = "X";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.onclick = () => move(i, cell);
    boardEl.appendChild(cell);
  }
}

function move(i, cell) {
  if (board[i] || gameOver) return;

  board[i] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("filled");
  clickSound.play();

  if (checkWin()) return;
  if (board.every(c => c)) {
    statusEl.textContent = "Heç-heçə 🤝";
    gameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusEl.textContent = `Oyunçu ${currentPlayer}`;

  if (mode === "bot" && currentPlayer === "O") {
    statusEl.textContent = "🤖 Bot düşünür...";
    setTimeout(botMove, 700);
  }
}

function botMove() {
  let moveIndex;

  if (difficulty === "easy") {
    moveIndex = randomMove();
  } 
  else if (difficulty === "normal") {
    moveIndex = winOrBlock("O") ?? randomMove();
  } 
  else {
    moveIndex = winOrBlock("O") ?? winOrBlock("X") ?? randomMove();
  }

  const cell = boardEl.children[moveIndex];
  move(moveIndex, cell);
}

function randomMove() {
  const empty = board.map((v,i)=>v===""?i:null).filter(v=>v!==null);
  return empty[Math.floor(Math.random()*empty.length)];
}

function winOrBlock(player) {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let w of wins) {
    const line = w.map(i => board[i]);
    if (line.filter(v=>v===player).length===2 && line.includes("")) {
      return w[line.indexOf("")];
    }
  }
  return null;
}

function checkWin() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  for (let w of wins) {
    if (w.every(i => board[i] === currentPlayer)) {
      statusEl.textContent = `🎉 ${currentPlayer} qalib gəldi!`;
      winSound.play();
      w.forEach(i => boardEl.children[i].classList.add("win"));
      gameOver = true;
      return true;
    }
  }
  return false;
}

function restart() {
  statusEl.textContent = "Oyunçu X başlayır";
  createBoard();
}

createBoard();