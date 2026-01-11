const board = document.getElementById("board");
const statusText = document.getElementById("status");

let cells = [];
let currentPlayer = "X";
let gameOver = false;

let mode = "human";
let botLevel = "easy";

const HUMAN = "X";
const BOT = "O";

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function startHuman() {
  mode = "human";
  resetGame();
}

function startBot(level) {
  mode = "bot";
  botLevel = level;
  resetGame();
}

function resetGame() {
  board.innerHTML = "";
  cells = [];
  currentPlayer = "X";
  gameOver = false;
  statusText.innerText = "Sıra: X";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";

    cell.onclick = () => handleClick(i);

    board.appendChild(cell);
    cells.push(cell);
  }
}

function handleClick(index) {
  if (cells[index].innerText || gameOver) return;

  cells[index].innerText = currentPlayer;
  cells[index].classList.add(currentPlayer);

  if (checkWin(currentPlayer)) return;
  if (checkDraw()) return;

  if (mode === "bot" && currentPlayer === HUMAN) {
    currentPlayer = BOT;
    statusText.innerText = "Bot düşünür...";
    setTimeout(botMove, 450);
  } else {
    switchPlayer();
  }
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.innerText = "Sıra: " + currentPlayer;
}

function botMove() {
  let move;
  if (botLevel === "easy") move = randomMove();
  else if (botLevel === "normal") move = smartMove() ?? randomMove();
  else move = bestMove();

  if (move !== null) {
    cells[move].innerText = BOT;
    cells[move].classList.add(BOT);
  }

  if (!checkWin(BOT) && !checkDraw()) {
    currentPlayer = HUMAN;
    statusText.innerText = "Sıra: X";
  }
}

function randomMove() {
  const empty = cells.map((c,i)=>c.innerText===""?i:null).filter(i=>i!==null);
  return empty.length ? empty[Math.floor(Math.random()*empty.length)] : null;
}

function smartMove() {
  return findWinningMove(BOT) ?? findWinningMove(HUMAN);
}

function bestMove() {
  let bestScore = -Infinity, move = null;
  for (let i=0;i<9;i++){
    if (!cells[i].innerText){
      cells[i].innerText = BOT;
      let score = minimax(0,false);
      cells[i].innerText = "";
      if (score > bestScore){
        bestScore = score;
        move = i;
      }
    }
  }
  return move;
}

function minimax(depth,isMax){
  if (checkWinner(BOT)) return 10-depth;
  if (checkWinner(HUMAN)) return depth-10;
  if (cells.every(c=>c.innerText)) return 0;

  let best = isMax ? -Infinity : Infinity;
  for (let i=0;i<9;i++){
    if (!cells[i].innerText){
      cells[i].innerText = isMax ? BOT : HUMAN;
      let score = minimax(depth+1,!isMax);
      cells[i].innerText = "";
      best = isMax ? Math.max(best,score) : Math.min(best,score);
    }
  }
  return best;
}

function checkWin(player){
  for (let p of winPatterns){
    if (p.every(i=>cells[i].innerText===player)){
      p.forEach(i=>cells[i].classList.add("win"));
      statusText.innerText = `🏆 Qalib: ${player}`;
      gameOver = true;
      return true;
    }
  }
  return false;
}

function checkWinner(player){
  return winPatterns.some(p=>p.every(i=>cells[i].innerText===player));
}

function checkDraw(){
  if (cells.every(c=>c.innerText)){
    statusText.innerText = "Heç-heçə";
    gameOver = true;
    return true;
  }
  return false;
}