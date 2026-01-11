let selectedGame = null;
const music = document.getElementById("bgMusic");

function startGame(game) {
  selectedGame = game;
  document.getElementById("continueBox").classList.remove("hidden");
}

function continueGame() {
  music.play();
  window.location.href = selectedGame;
}