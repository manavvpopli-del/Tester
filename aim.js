const target = document.getElementById("target");

function randomPosition() {
  const x = Math.random() * (window.innerWidth - 60);
  const y = Math.random() * (window.innerHeight - 60);
  target.style.left = x + "px";
  target.style.top = y + "px";
}

target.addEventListener("click", () => {
  randomPosition();
});

randomPosition();