const gameArea = document.getElementById("gameArea");
const heart = document.getElementById("heart");
const message = document.getElementById("message");

const targetName = ["N", "U", "R", "A", "N", "Ə"];
let progressIndex = 0;
let scale = 1;
let gameOver = false;

// ===== SÜRÜKLƏMƏ =====
let isDragging = false;

heart.addEventListener("pointerdown", () => {
  isDragging = true;
});

document.addEventListener("pointerup", () => {
  isDragging = false;
});

document.addEventListener("pointermove", (e) => {
  if (!isDragging || gameOver) return;

  let x = e.clientX - heart.offsetWidth / 2;
  x = Math.max(0, Math.min(window.innerWidth - heart.offsetWidth, x));
  heart.style.left = x + "px";
});

// ===== HƏRF YARAT =====
function spawnLetter() {
  if (gameOver) return;

  const letter = document.createElement("div");
  const randomChar = targetName[Math.floor(Math.random() * targetName.length)];

  letter.className = "letter";
  letter.textContent = randomChar;
  letter.style.left = Math.random() * (window.innerWidth - 50) + "px";
  letter.style.animationDuration = (3 + Math.random() * 2) + "s";

  gameArea.appendChild(letter);

  const check = setInterval(() => {
    if (gameOver) {
      letter.remove();
      clearInterval(check);
      return;
    }

    const l = letter.getBoundingClientRect();
    const h = heart.getBoundingClientRect();

    if (
      l.bottom >= h.top &&
      l.left < h.right &&
      l.right > h.left
    ) {
      collectLetter();
      letter.remove();
      clearInterval(check);
    }

    if (l.top > window.innerHeight) {
      letter.remove();
      clearInterval(check);
    }
  }, 40);
}

// ===== TOPLA =====
function collectLetter() {
  const currentChar = targetName[progressIndex];
  message.textContent = targetName.slice(0, progressIndex + 1).join("");

  scale += 0.15;
  heart.style.transform = `translateX(-50%) scale(${scale})`;

  progressIndex++;

  if (progressIndex === targetName.length) {
    endGame();
  }
}

// ===== OYUN BİTİŞ =====
function endGame() {
  gameOver = true;
  clearInterval(spawnTimer);

  heart.style.transition = "0.5s";
  heart.style.transform += " scale(2) rotate(720deg)";
  message.textContent = "❤️ N U R A N Ə ❤️";
}

// START
const spawnTimer = setInterval(spawnLetter, 800);